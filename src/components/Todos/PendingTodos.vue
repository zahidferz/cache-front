<script>
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxCardToDo from '@components/_Core/Cards/GxCardToDo'
import GxIcon from '@components/_Core/Icons/GxIcon'
import { LOCAL_COMPANY, TODOS, TODOS_FILTERS } from '@src/apollo/queries'
export default {
  name: 'PendingTodos',
  components: {
    GxInfiniteScrollApollo,
    GxLoader,
    GxCardToDo,
    GxIcon,
    GxCardModal,
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  props: {
    selectedBranches: {
      type: Array,
      default: null,
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      todosQuery: TODOS,
      searchTodosQuery: TODOS_FILTERS,
      company: null,
      resolvedTodo: false,
    }
  },
  computed: {
    searchPendingItems() {
      return !!this.searchTerm || this.selectedBranches.length > 0
    },
    searchPendingItemsVariables() {
      return {
        companyNumber: this.company.number,
        text: this.searchTerm,
        branches: this.selectedBranches,
      }
    },
  },
  methods: {
    filterTodosWithItems(listData) {
      return listData.filter((todo) => todo.items && todo.items.length > 0)
    },
    extractTodos(data) {
      if (data) {
        return data.myAccount.companies[0].company.pendingActions.list
      }
      return null
    },
    updateTodosDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.pendingActions.list = [
        ...dataToUpdate.myAccount.companies[0].company.pendingActions.list,
        ...newData.myAccount.companies[0].company.pendingActions.list,
      ]
      return dataToUpdate
    },
    extractSearchTodos(data) {
      if (data) {
        return data.myAccount.companies[0].company.pendingItems.list
      }
      return null
    },
    searchUpdateDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.pendingItems.list = [
        ...dataToUpdate.myAccount.companies[0].company.pendingItems.list,
        ...newData.myAccount.companies[0].company.pendingItems.list,
      ]
      return dataToUpdate
    },
    resolvedTodoHandler() {
      this.$nextTick(() => {
        this.resolvedTodo = true
      })
      this.closeModal = setTimeout(() => {
        this.resolvedTodo = false
      }, 3000)
    },
    onModalClose() {
      if (this.closeModal) {
        clearTimeout(this.closeModal)
      }
      this.resolvedTodo = false
    },
  },
}
</script>
<template>
  <div class="flex flex-col flex-grow">
    <GxInfiniteScrollApollo
      v-if="searchPendingItems"
      :key="`pending-items-${Date.now()}`"
      class="flex flex-col flex-grow"
      :query="searchTodosQuery"
      :variables="searchPendingItemsVariables"
      :extract-data-fn="extractSearchTodos"
      :update-data-fn="searchUpdateDataFn"
    >
      <template slot-scope="{ loading, listData, noMoreResults }">
        <transition-group
          v-if="listData.length > 0"
          :key="`pending-items-container-${Date.now()}`"
          name="todos-list"
          tag="ul"
          class="flex relative  flex-col justify-start w-full overflow-visible px-4 de:px-12 mt-4"
        >
          <GxCardToDo
            v-for="(todo, index) in listData"
            :id="todo.pendingItemId ? todo.pendingItemId : todo.type"
            :key="todo.pendingItemId ? todo.pendingItemId : todo.type"
            :class="{ 'mt-2': index !== 0 }"
            :type="todo.type"
            :subtitle-to-do="todo.description"
            :date="
              todo.creationDatetime ? todo.creationDatetime : todo.datetime
            "
            :gx-module="
              todo.actionableResourcesType
                ? todo.actionableResourcesType
                : todo.actionableResourceType
            "
            :users="todo.users"
            :actions="todo.actions"
            :title="todo.title"
            :references="todo.descriptionReferences"
            :search-term="searchTerm"
            :branches="selectedBranches"
            :page="1"
            :size="50"
            class="todos-list-item flex-grow"
            :items="todo.items"
            @resolvedTodo="resolvedTodoHandler"
          />
          <p
            v-if="!loading && listData.length > 0 && noMoreResults"
            key="list-end"
            class="flex todos-list-item justify-center de:gx-caption gx-caption de:mt-4"
          >
            <GxIcon class="flex items-center mr-2" icon="tag_faces" />
            <span>Estos son todos los resultados relacionados.</span>
          </p>
        </transition-group>
        <div
          v-if="loading && listData.length === 0"
          key="gx-loader-main"
          class="flex flex-grow flex-col justify-center items-center"
        >
          <GxLoader />
        </div>
        <li
          v-if="loading && listData.length > 0"
          class="w-full item-center justify-center mt-4"
        >
          <GxLoader key="GxLoader" class="m-auto" />
        </li>
        <div
          v-if="
            !loading &&
              noMoreResults &&
              listData.length === 0 &&
              searchPendingItems
          "
          key="gx-not-found"
          class="flex flex-grow flex-col justify-center de:justify-start de:pt-8 items-center px-4"
        >
          <img :src="$utils.alertImages.NoResultsFound" />
          <p class="text-center mt-8 de:mt-4  font-nunito gx-h4"
            >No encontramos nada relacionado con tu búsqueda.</p
          >
        </div>
      </template>
    </GxInfiniteScrollApollo>
    <GxInfiniteScrollApollo
      v-else
      :key="`pending-todos-${Date.now()}`"
      class="flex flex-col flex-grow"
      :query="todosQuery"
      :variables="{ companyNumber: company.number }"
      :extract-data-fn="extractTodos"
      :update-data-fn="updateTodosDataFn"
    >
      <template slot-scope="{ loading, listData, noMoreResults }">
        <transition-group
          v-if="filterTodosWithItems(listData).length > 0"
          :key="`pending-todos-container-${Date.now()}`"
          name="todos-list"
          tag="ul"
          class="flex relative  flex-col justify-start w-full overflow-visible px-4 de:px-12 mt-4"
        >
          <GxCardToDo
            v-for="(todo, index) in filterTodosWithItems(listData)"
            :id="todo.pendingItemId ? todo.pendingItemId : todo.type"
            :key="todo.pendingItemId ? todo.pendingItemId : todo.type"
            :class="{ 'mt-2': index !== 0 }"
            :type="todo.type"
            :subtitle-to-do="todo.description"
            :date="
              todo.creationDatetime ? todo.creationDatetime : todo.datetime
            "
            :gx-module="
              todo.actionableResourcesType
                ? todo.actionableResourcesType
                : todo.actionableResourceType
            "
            :users="todo.users"
            :actions="todo.actions"
            :title="todo.title"
            :references="todo.descriptionReferences"
            :search-term="searchTerm"
            :branches="selectedBranches"
            :page="1"
            :size="50"
            class="todos-list-item flex-grow"
            :items="todo.items"
            @resolvedTodo="resolvedTodoHandler"
          />
          <p
            v-if="
              !loading &&
                filterTodosWithItems(listData).length > 0 &&
                noMoreResults
            "
            key="list-end"
            class="flex todos-list-item justify-center de:gx-caption gx-caption de:mt-4"
          >
            <GxIcon class="flex items-center mr-2" icon="tag_faces" />
            <span>Estos son todos tu pendientes</span>
          </p>
        </transition-group>
        <div
          v-if="loading && filterTodosWithItems(listData).length === 0"
          key="gx-loader-main"
          class="flex flex-grow flex-col justify-center items-center"
        >
          <GxLoader />
        </div>
        <div
          v-if="!loading && noMoreResults && listData.length === 0"
          key="gx-no-todos"
          class="flex flex-grow flex-col justify-center de:justify-start  de:pt-8 items-center"
        >
          <img :src="$utils.alertImages.NoResultsFound" alt="Sin pendientes" />

          <p
            class="text-center mt-8 de:mt-4 px-8 de:px-0 font-nunito text-3xl de:text-2xl"
            >¡Sonríe! No tienes pendientes.</p
          >
        </div>
        <li
          v-if="loading && listData.length > 0"
          class="w-full item-center justify-center mt-4"
        >
          <GxLoader key="GxLoader" class="m-auto" />
        </li>
      </template>
    </GxInfiniteScrollApollo>
    <GxCardModal
      v-if="resolvedTodo"
      :delay-animation="true"
      headline="Este pendiente ya se resolvió"
      text-body="Parece que alguien de tu equipo tomó la iniciativa. Puedes conocer el detalle en la sección de resueltos"
      :card-img="$utils.alertImages.Dissapointed"
      alt="Pendiente resuelto"
      @click.stop.prevent="onModalClose"
      @close="onModalClose"
    />
  </div>
</template>
<style lang="scss" scoped>
.todos-list-item {
  will-change: transform, opacity;
  transition: transform 0.2s ease, opacity 0.2s ease;
  transform-origin: center right;
}
.todos-list-enter-active {
  transition: opacity 0.5s 0.2s ease-out;
}
.todos-list-leave-to,
.todos-list-enter {
  opacity: 0;
}
.todos-list-leave-to {
  transform: scaleX(0.5);
}
.todos-list-leave-active {
  position: absolute;
  width: 100%;
}
.todos-list-move {
  transition: transform 0.3s 0.2s ease;
}
</style>

<script>
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxListItemResolvedTodo from '@components/_Core/Lists/GxListItemResolvedTodo'
import {
  LOCAL_COMPANY,
  SOLVED_TODOS,
  SOLVED_TODOS_FILTERS,
} from '@src/apollo/queries'
export default {
  name: 'SolvedTodos',
  components: {
    GxInfiniteScrollApollo,
    GxLoader,
    GxIcon,
    GxListItemResolvedTodo,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
    selectedBranches: {
      type: Array,
      default: () => [],
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      company: null,
      searchPendingItemsDoneQuery: SOLVED_TODOS_FILTERS,
      pendingActionsDoneQuery: SOLVED_TODOS,
    }
  },
  computed: {
    searchPendingItemsDone() {
      return !!this.searchTerm || this.selectedBranches.length > 0
    },
    searchPendingItemsDoneVariables() {
      return {
        companyNumber: this.company.number,
        text: this.searchTerm,
        branches: this.selectedBranches,
      }
    },
  },
  methods: {
    extractSolvedTodos(data) {
      if (data) {
        return data.myAccount.companies[0].company.pendingActionsDone.list
      }
      return null
    },
    updateSolvedTodosDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.pendingActionsDone.list = [
        ...dataToUpdate.myAccount.companies[0].company.pendingActionsDone.list,
        ...newData.myAccount.companies[0].company.pendingActionsDone.list,
      ]
      return dataToUpdate
    },
    extractSolvedSearchTodos(data) {
      if (data) {
        return data.myAccount.companies[0].company.pendingItemsDone.list
      }
      return null
    },
    searchUpdateDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.pendingItemsDone.list = [
        ...dataToUpdate.myAccount.companies[0].company.pendingItemsDone.list,
        ...newData.myAccount.companies[0].company.pendingItemsDone.list,
      ]
      return dataToUpdate
    },
  },
}
</script>
<template>
  <div class="flex flex-col flex-grow">
    <GxInfiniteScrollApollo
      v-if="searchPendingItemsDone"
      :key="`pending-items-done-${Date.now()}`"
      class="flex flex-col flex-grow"
      :query="searchPendingItemsDoneQuery"
      :variables="searchPendingItemsDoneVariables"
      :extract-data-fn="extractSolvedSearchTodos"
      :update-data-fn="searchUpdateDataFn"
    >
      <template slot-scope="{ loading, listData, noMoreResults }">
        <transition-group
          v-if="listData.length > 0"
          :key="`pending-items-done-container-${Date.now()}`"
          name="todos-list"
          tag="ul"
          class="flex relative  flex-col justify-start w-full overflow-visible px-4 de:px-12 mt-4"
        >
          <GxListItemResolvedTodo
            v-for="solvedTodo in listData"
            :key="
              solvedTodo.pendingItemId
                ? solvedTodo.pendingItemId
                : solvedTodo.pendingActionDoneId
            "
            :description="solvedTodo.description"
            :avatar="solvedTodo.completedBy"
            :date="
              solvedTodo.completionDatetime
                ? solvedTodo.completionDatetime
                : solvedTodo.datetime
            "
            :gx-module="solvedTodo.actionedResourcesType"
            :type="solvedTodo.type"
            :description-references="solvedTodo.descriptionReferences"
            :items="solvedTodo.items"
            :search-term="searchTerm"
            class="todos-list-item"
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
          v-if="!loading && noMoreResults && listData.length === 0"
          key="gx-loader-main"
          class="flex flex-grow flex-col justify-center de:justify-start de:pt-8 items-center px-4"
        >
          <img :src="$utils.alertImages.NoResultsFound" />
          <p class="text-center mt-8 px-8 de:px-0 de:mt-4 font-nunito gx-h4"
            >No encontramos nada relacionado con tu búsqueda.</p
          >
        </div>
      </template>
    </GxInfiniteScrollApollo>
    <GxInfiniteScrollApollo
      v-else
      :key="`pending-todos-done-${Date.now()}`"
      class="flex flex-col flex-grow"
      :query="pendingActionsDoneQuery"
      :variables="{ companyNumber: company.number }"
      :extract-data-fn="extractSolvedTodos"
      :update-data-fn="updateSolvedTodosDataFn"
    >
      <template slot-scope="{ loading, listData, noMoreResults }">
        <transition-group
          v-if="listData.length > 0"
          :key="`pending-todos-done-container-${Date.now()}`"
          name="todos-list"
          tag="ul"
          class="flex relative  flex-col justify-start w-full overflow-visible px-4 de:px-12 mt-4"
        >
          <GxListItemResolvedTodo
            v-for="solvedTodo in listData"
            :key="
              solvedTodo.pendingItemId
                ? solvedTodo.pendingItemId
                : solvedTodo.pendingActionDoneId
            "
            :description="solvedTodo.description"
            :avatar="solvedTodo.completedBy"
            :date="
              solvedTodo.completionDatetime
                ? solvedTodo.completionDatetime
                : solvedTodo.datetime
            "
            :gx-module="solvedTodo.actionedResourcesType"
            :type="solvedTodo.type"
            :description-references="solvedTodo.descriptionReferences"
            :items="solvedTodo.items"
            :search-term="searchTerm"
            class="todos-list-item"
          />
          <p
            v-if="!loading && listData.length > 0 && noMoreResults"
            key="list-end"
            class="flex todos-list-item justify-center de:gx-caption gx-caption de:mt-4"
          >
            <GxIcon class="flex items-center mr-2" icon="tag_faces" />
            <span>Estos son todos tu pendientes resueltos.</span>
          </p>
        </transition-group>
        <div
          v-if="loading && listData.length === 0"
          key="gx-loader-main"
          class="flex flex-grow flex-col justify-center items-center"
        >
          <GxLoader />
        </div>
        <div
          v-if="!loading && noMoreResults && listData.length === 0"
          key="gx-loader-main"
          class="flex flex-grow flex-col justify-center de:justify-start de:pt-8 items-center px-4"
        >
          <img :src="$utils.alertImages.NoResultsFound" />
          <p
            class="text-center mt-8 de:mt-4 px-8 de:px-0 font-nunito text-3xl de:text-2xl"
            >No encontramos nada relacionado con tu búsqueda.</p
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

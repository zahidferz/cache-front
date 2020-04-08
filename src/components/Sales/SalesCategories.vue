<script>
import GxModal from '@components/_Core/Modals/GxModal'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxInput from '@components/_Core/Forms/GxInput'
import GxSwipe from '@components/_Core/Utils/GxSwipe'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import Observer from '@components/_Core/Utils/Observer'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import { CREATE_NEW_CATEGORY } from '@src/apollo//mutations'
import {
  INCOME_CATEGORIES,
  LOCAL_COMPANY,
  SEARCH_INCOME_CATEGORY,
} from '@src/apollo/queries'
export default {
  name: 'SalesCategories',
  inject: ['topBarSearch'],
  components: {
    GxDesktopHeader,
    GxLoader,
    GxModal,
    GxCardModal,
    GxCardCore,
    GxInput,
    GxSwipe,
    GxIcon,
    Observer,
    GxDivider,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
    redirectToDetail: {
      type: Boolean,
      default: false,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    categories: {
      query() {
        if (this.search) {
          return SEARCH_INCOME_CATEGORY
        }

        return INCOME_CATEGORIES
      },
      variables() {
        return {
          page: 1,
          size: this.pageSize,
          companyNumber: this.company ? this.company.number : null,
          search: this.search,
        }
      },
      update(data) {
        if (!data.myAccount || !data.myAccount.companies) return

        const categories = data.myAccount.companies[0].company.incomeCategories
        this.downloadAll = categories.length < this.pageSize
        this.dontHideSearch = false
        return categories
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      categoryName: '',
      invalidCategoryName: null,
      dontHideSearch: false,
      showNewCategoryForm: false,
      categoryCreatedTimeOut: null,
      categoryCreated: false,
      categories: null,
      createLoading: false,
      loading: false,
      error: null,
      errorAlertImg: require('@assets/images/Sales/de_007_4_nombreexistente.svg'),
      hasHover: null,
      page: 1,
      pageSize: 50,
      noMoreSearchResults: false,
      downloadAll: true,
      searchFocus: false,
      search: this.searchTerm,
      timeout: null,
    }
  },
  computed: {
    errorTextBody() {
      if (!this.error) return ''
      if (this.error === '¡Ese nombre ya existe!') {
        return 'Lo sentimos. No puedes tener dos categorías con el mismo nombre.'
      }
      return ''
    },
  },
  watch: {
    page(newVal) {
      const vm = this
      this.$apollo.queries.categories.fetchMore({
        variables: {
          page: newVal,
          size: vm.pageSize,
          search: vm.search,
        },
        updateQuery: (categories, { fetchMoreResult }) => {
          const newCategories =
            fetchMoreResult.myAccount.companies[0].company.incomeCategories
          if (newCategories.length < this.pageSize) {
            this.downloadAll = true
          }
          categories.myAccount.companies[0].company.incomeCategories = [
            ...categories.myAccount.companies[0].company.incomeCategories,
            ...newCategories,
          ]
          return categories
        },
      })
    },
    searchTerm(newVal) {
      this.page = 1
      this.categories = null
      this.search = newVal
    },
    categoryName(newVal) {
      this.invalidCategoryName = null
    },
  },
  created() {
    this.$apollo.queries.categories.setOptions({
      fetchPolicy: 'network-only',
    })
  },
  methods: {
    previous() {
      if (
        this.$route.query.list === true ||
        this.$route.query.list === 'true'
      ) {
        this.$router.push({ name: 'salesDashboard' })
      } else {
        this.$router.replace({ name: 'additionalinfo' })
      }
    },
    onErrorModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.categoryName = ''
      this.error = null
    },
    setHover(index) {
      this.hasHover = index
    },
    removeHover() {
      this.hasHover = null
    },
    goToCateogryDetail(id) {
      this.$router.replace({
        name: 'categoryDetail',
        params: { categoryId: id },
        query: { ...this.$route.query },
      })
    },
    cancelCategoryCreation() {
      this.categoryName = ''
      this.showNewCategoryForm = !this.showNewCategoryForm
    },
    categoryCreatedClose() {
      if (this.categoryCreatedTimeOut) {
        clearTimeout(this.categoryCreatedTimeOut)
      }
      this.categoryCreated = false
    },
    addCategory(selectedCategory) {
      if (selectedCategory.status === 'archived') {
        return
      }
      localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory))
      this.$router.replace({ name: 'additionalinfo' })
    },
    onClick(category) {
      if (this.redirectToDetail) {
        this.goToCateogryDetail(category.incomeCategoryId)
      } else {
        this.addCategory(category)
      }
    },
    clearSearchInput() {
      this.dontHideSearch = true
      this.search = ''
    },
    async createCategory() {
      if (this.categoryName.length === 0) {
        this.invalidCategoryName = 'Este campo es necesario'
        return
      }
      try {
        this.createLoading = true
        const data = {
          name: this.categoryName,
        }

        await this.$apollo.mutate({
          mutation: CREATE_NEW_CATEGORY,
          variables: {
            companyNumber: this.company.number,
            branchNumber: this.company.branchNumber,
            data,
          },
        })
        this.search = null
        this.categoryName = ''

        this.$apollo.queries.categories.refetch()
        // Category created
        this.createLoading = false
        this.showNewCategoryForm = false
        this.categoryCreated = true

        this.categoryCreatedTimeOut = setTimeout(() => {
          this.categoryCreatedClose()
        }, 3000)
      } catch (error) {
        this.createLoading = false
        /* eslint-disable */
        console.log(error)
        this.error = this.$utils.parseServerError(error)
        this.timeout = setTimeout(() => {
          this.onErrorModalClose()
        }, 3000)
      }
    },
  },
}
</script>
<template>
  <div class="flex flex-grow flex-col">
    <div class="px-8">
      <template>
        <GxDesktopHeader
          v-if="$mq === 'de'"
          :header="
            $route.query.list === true || $route.query.list === 'true'
              ? 'Categorías'
              : 'Selecciona una categoría'
          "
          icon="keyboard_backspace"
          :icon-click-handler="previous"
        />
        <div
          v-if="
            (categories && categories.length > 0) ||
              search ||
              searchFocus ||
              dontHideSearch
          "
          class="flex flex-grow justify-end mb-2"
        >
          <label
            v-if="$mq === 'de'"
            for="searchCategory"
            class="flex items-center pb-1 relative w-40 overflow-hidden de:gx-caption border-b"
            :class="{
              'border-primary-500': searchFocus,
              'border-gray-700': !searchFocus,
            }"
          >
            <GxIcon
              key="search"
              icon="search"
              class="gxCursor"
              :class="{
                'text-primary-500': searchFocus,
                'text-gray-700': !searchFocus,
              }"
            />
            <input
              id="searchCategory"
              v-model="search"
              class="pl-2 search-input focus:outline-none flex-grow leading-none"
              placeholder="Buscar categoría"
              label="Buscar categoría"
              type="text"
              @blur="searchFocus = false"
              @focus="searchFocus = true"
            />
            <button
              v-if="search"
              class="de:gx-caption flex  cursor-pointer z-1"
              @click.stop.prevent.exact="clearSearchInput"
            >
              <GxIcon key="close" icon="close" />
            </button>
          </label>
        </div>
      </template>
    </div>
    <div
      v-if="!categories || $apollo.queries.categories.loading"
      class="flex flex-col items-center justify-center flex-grow"
    >
      <GxLoader />
    </div>
    <!-- Sin categorías -->
    <div class="flex flex-grow flex-col" v-else>
      <div
        v-if="search && categories && categories.length === 0"
        class="flex-grow flex flex-col items-center"
        :class="{ 'justify-center': $mq === 'de' }"
      >
        <img
          :src="$utils.alertImages.NoResultsFound"
          alt="Sin resultados"
          class="mb-8"
          :class="{ 'mt-8': $mq === 'mo' }"
        />
        <p class="gx-h4  text-center px-8"
          >No encontramos categorías relacionados con tu búsqueda</p
        >
      </div>
      <template v-else-if="categories && categories.length === 0 && !search">
        <div
          class="bg-no-repeat flex-grow  flex flex-col items-center  gx-background mt-8 de:mt-0"
        >
          <p class="gx-h4 text-center bg-transparent mb-8 de:mb-0"
            >Aún no tienes categorías.<br />Crea la primera desde el +
          </p>
          <img
            src="@assets/images/Sales/mo_007_4_primercategoria.svg"
            alt=""
            class="ml-auto mr-auto de:hidden"
          />
        </div>
      </template>
      <section
        v-else-if="categories && categories.length"
        class="flex flex-col  de:px-8 pb-4"
      >
        <ul class="flex-grow">
          <li
            class="flex-grow flex flex-col "
            v-for="(category, index) in categories"
            :key="category.incomeCategoryId"
          >
            <p
              v-if="search && index === 0"
              class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
              :class="{ gxHeaders: $mq === 'de' }"
              >RESULTADOS DE LA BÚSQUEDA</p
            >
            <template v-else>
              <p
                v-if="index === 0"
                class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
                :class="{ gxHeaders: $mq === 'de' }"
                >{{ category.name.charAt(0) }}</p
              >
              <p
                v-else-if="
                  categories[index - 1].name.toLowerCase().charAt(0) !==
                    categories[index].name.toLowerCase().charAt(0)
                "
                class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
                :class="{ gxHeaders: $mq === 'de' }"
                >{{ categories[index].name.toUpperCase().charAt(0) }}</p
              >
            </template>
            <GxSwipe v-if="$mq === 'mo' && !redirectToDetail">
              <div
                @click.stop="onClick(category)"
                :class="{ 'text-gray-500': category.status === 'archived' }"
                class="flex p-4 flex  flex-grow items-center"
                >{{ category.name }}</div
              >
              <GxDivider />
              <template v-slot:right>
                <button
                  class="flex-shrink-1 justify-center bg-primary uppercase text-white text-bold px-4"
                  @click="goToCateogryDetail(category.incomeCategoryId)"
                  >Ver detalle</button
                >
              </template>
            </GxSwipe>
            <div v-else-if="$mq === 'mo' && redirectToDetail">
              <div
                @click.stop="onClick(category)"
                :class="{ 'text-gray-500': category.status === 'archived' }"
                class="flex p-4 flex  flex-grow items-center "
                >{{ category.name }}</div
              >
              <GxDivider />
            </div>
            <div
              v-else
              @mouseover="setHover(index)"
              @mouseleave="removeHover"
              :class="{
                'cursor-not-allowed':
                  category.status === 'archived' && !redirectToDetail,
                'cursor-pointer':
                  category.status === 'active' || redirectToDetail,
              }"
              class="flex p-4 flex-grow  items-center border-b de:hover:bg-gray-200"
              @click.stop="onClick(category)"
            >
              <span
                class="flex-grow"
                :class="{ 'text-gray-500': category.status === 'archived' }"
                >{{ category.name }}</span
              >
              <GxIcon
                v-if="hasHover === index && !redirectToDetail"
                class="text-gray-500"
                icon="remove_red_eye"
                @click.stop="goToCateogryDetail(category.incomeCategoryId)"
              />
            </div>
          </li>
          <Observer
            class="w-full flex justify-center my-8"
            v-if="!downloadAll"
            :loading="$apollo.queries.categories.loading"
            @load="page++"
          />
          <p
            v-if="!$apollo.queries.categories.loading"
            class="text-center p-8 flex items-center justify-center"
            ><GxIcon icon="tag_faces" class="mr-2" /> No tienes más
            categorías</p
          >
        </ul>
      </section>
    </div>
    <GxModal v-if="showNewCategoryForm" @close="$emit('close')" class="py-4">
      <GxCardCore
        class="flex-grow flex flex-col py-4 de:bg-white w-82 de:w-108 de:p-8 de:shadow-4 rounded-lg"
        v-on="$listeners"
      >
        <GxLoader v-if="createLoading" />
        <form @submit.prevent="createCategory" v-else>
          <h1 class="mb-8 text-primary gx-h4 px-4 font-bold"
            >Nueva categoría</h1
          >
          <GxInput
            v-model="categoryName"
            label="Nombre de categoría*"
            placeholder="Nombre de categoría*"
            :error="invalidCategoryName"
            class="mb-8 de:mb-8"
          />
          <div class="flex justify-end de:justify-center px-4">
            <GxButton
              :ghost="$mq === 'de'"
              :plain="$mq === 'mo'"
              class="text-alert de:text-primary de:border mr-4"
              @click.prevent="cancelCategoryCreation"
              >Cancelar</GxButton
            >
            <GxButton :plain="$mq === 'mo'" type="submit">Guardar</GxButton>
          </div>
        </form>
      </GxCardCore>
    </GxModal>
    <GxCardModal
      v-if="categoryCreated"
      headline="Categoría creada"
      :card-img="$utils.alertImages.Success"
      alt="Categoría creada"
      key="categoryCreated"
      @close="categoryCreatedClose"
    />
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Khaaa"
      :text-body="errorTextBody"
      :alt="error"
      @click="error = null"
      @close="error = null"
    />
    <GxFab
      :loading="loading"
      :mobile="$mq === 'mo'"
      :large="$mq === 'de'"
      icon="add"
      class="shadow-2 gxFabFloat"
      label="Agregar categoría"
      @click.prevent="showNewCategoryForm = !showNewCategoryForm"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxFabFloat {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
.gx-background {
  background-image: url('../../../src/assets/images/Sales/de_007_4_primercategoria.svg');
  background-position: center bottom, bottom;
  background-size: auto calc(100% - 64px - 32px), 100% calc(100% - 64px - 34px);
}

@media only screen and (max-width: 767px) {
  .gx-background {
    // background-image: url('../../../src/assets/images/Sales/mo_007_4_nuevacategoria.svg');
    background-image: none;
    // background-size: auto calc(100% - 70px), 100% calc(100% - 16px);
  }
}
.gxHeaders {
  line-height: 0.625rem;
}
</style>

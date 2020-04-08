<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import SalesCategories from '@components/Sales/SalesCategories'
import debounce from 'lodash/debounce'
import { INCOME_CATEGORIES, LOCAL_COMPANY } from '@src/apollo/queries'
export default {
  name: 'SalesCategoriesView',
  components: {
    LayoutWebMobile,
    SalesCategories,
  },
  apollo: {
    company: LOCAL_COMPANY,
    categories: {
      query: INCOME_CATEGORIES,
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          size: 50,
        }
      },
      update(data) {
        if (!data.myAccount || !data.myAccount.companies) return
        return data.myAccount.companies[0].company.incomeCategories
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      textSearch: this.$route.query.searchTerm || '',
      company: null,
      categories: null,
      textInput: this.$route.query.searchTerm || '',
      searchFocus: false,
      hasPaddingBottom: false,
      debounceUpdateSearchTerm: '',
    }
  },
  watch: {
    textSearch(newValue) {
      this.textSearch = newValue
    },
    textInput(newValue) {
      this.debounceUpdateSearchTerm(newValue)
    },
  },
  created() {
    this.debounceUpdateSearchTerm = debounce(this.updateTextSearch, 300)
  },
  methods: {
    updateTextSearch(newString) {
      this.textSearch = newString
    },
    cancelMobileSearch() {
      this.textInput = ''
      this.mobileSearch = false
    },
    focusMobileSearch() {
      this.$refs.mobileSearch && this.$refs.mobileSearch.focus()
    },
    onCloseMobileSearch() {
      this.textInput = ''
      this.mobileSearch = false
    },
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
  },
}
</script>

<template>
  <LayoutWebMobile
    ref="LayoutWebMobile"
    no-bottom-menu
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    icon="keyboard_backspace"
    :title="
      $route.query.list === true || $route.query.list === 'true'
        ? 'Categorías'
        : 'Selecciona una categoría'
    "
    placeholder="Buscar categoría"
    :has-search="!!(categories && categories.length)"
    :has-drawer="$mq === 'de'"
    has-sticky-element
    no-horizontal-padding
    :with-padding-bottom="false"
    :icon-click-handler="previous"
    @search="textInput = $event"
  >
    <SalesCategories
      :redirect-to-detail="
        $route.query.list === true || $route.query.list === 'true'
      "
      :search-term="textSearch"
    />
  </LayoutWebMobile>
</template>

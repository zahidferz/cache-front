<script>
import { LOCAL_COMPANY, COMPANY_INCOME_SUMMARY } from '@src/apollo/queries'
import SalesSummaryChart from '@components/Sales/SalesSummaryChart'
import GxCardAccountsPayableReceivable from '@components/_Core/Cards/GxCardAccountsPayableReceivable'
import GxLoader from '@components/_Core/Utils/GxLoader'
import SalesSearch from '@components/Sales/SalesSearch'
export default {
  name: 'SalesDashboard',
  components: {
    GxLoader,
    SalesSearch,
    GxCardAccountsPayableReceivable,
    SalesSummaryChart,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    companySummary: {
      query: COMPANY_INCOME_SUMMARY,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        return data.myAccount.companies[0].company
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      company: null,
      years: null,
      companySummary: null,
      selectedMonth: new Date().getMonth(),
    }
  },
  computed: {
    receivableAccounts() {
      if (!this.companySummary) {
        return null
      }
      return this.companySummary.incomeSummary.accountsReceivable
    },
  },
  activated() {
    this.$apollo.queries.companySummary.refetch()
  },
  methods: {
    refetchData() {
      this.$apollo.queries.companySummary.refetch()
    },
  },
}
</script>
<template>
  <div
    v-if="!companySummary"
    class="flex-grow  flex flex-col mt-4 de:mt-0 items-center justify-center"
  >
    <GxLoader />
  </div>
  <article v-else-if="searchTerm" class="flex-grow  flex flex-col mt-4 de:mt-0">
    <p
      class="text-gray-500 de:text-gray-400 gx-section-title font-bold ml-4 mb-4 de:ml-0 de:mb-0"
      >RESULTADOS DE BÚSQUEDA</p
    >
    <SalesSearch :search-term="searchTerm" />
  </article>
  <article v-else class="flex-grow  flex flex-col mt-4 de:mt-0">
    <section class="px-4 de:px-0">
      <h1 class="text-gray-400 font-bold gx-section-title "
        >RESUMEN DE VENTAS</h1
      >
      <SalesSummaryChart
        v-model="selectedMonth"
        class="mt-4 cursor-pointer"
        level="company"
        @refetch="refetchData"
        @click="$router.push({ name: 'mySales' })"
      />
    </section>
    <section class="mt-8 px-4 de:px-0 flex flex-wrap">
      <div :class="{ gxMaxWidth: $mq === 'de' }" class="flex-grow flex-shrink ">
        <h1 class="text-gray-400 font-bold gx-section-title "
          >CUENTAS POR COBRAR</h1
        >
        <GxCardAccountsPayableReceivable
          class="mt-4"
          :accounts="receivableAccounts"
        />
      </div>
    </section>
  </article>
</template>
<style lang="scss" scoped>
.gxMaxWidth {
  max-width: calc(50% - 0.5rem);
}
</style>

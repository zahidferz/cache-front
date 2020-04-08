<script>
import {
  LOCAL_COMPANY,
  COMPANY_SALES_SUMMARY,
  CLIENT_SALES_SUMMARY,
} from '@src/apollo/queries'
import gql from 'graphql-tag'
import { format } from 'date-fns'
import GxChartBarCard from '@components/_Core/Charts/GxChartBarCard'
import GxLoader from '@components/_Core/Utils/GxLoader'
import authService from '@src/auth/authService'
import { restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
const es = require('date-fns/locale/es')
export default {
  name: 'SalesSummaryChart',
  components: { GxChartBarCard, GxLoader },
  props: {
    level: {
      type: String /* client / company */,
      required: true,
    },
    searchedYear: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  apollo: {
    $subscribe: {
      newSale: {
        query: gql`
          subscription incomeSalesSummaryUpdated($companyNumber: Int!) {
            incomeSalesSummaryUpdated(companyNumber: $companyNumber) {
              sales {
                today {
                  total
                  currency
                  dateRangeFilterType
                  startDate
                  endDate
                }
                currentWeek {
                  total
                  currency
                  dateRangeFilterType
                  startDate
                  endDate
                }
                currentMonth {
                  total
                  currency
                  dateRangeFilterType
                  startDate
                  endDate
                }
              }
            }
          }
        `,
        variables() {
          return {
            companyNumber: this.company.number,
          }
        },
        result(result) {
          this.$apollo.queries.salesSummaryClient.refetch()
          this.$apollo.queries.salesSummary.refetch()
          this.$emit('refetch')
        },
        error(error) {
          /* eslint-disable */
          console.log('Smartsubscription', { error })
          /* eslint-enable */
          if (error.message !== 'Token caducado') return
          authService.renewTokens().then(() => {
            /* eslint-disable */
            console.log('Token vencido, reiniciando websocket')
            /* eslint-enable */
            restartWebsockets(
              this.$apollo.provider.clients.defaultClient.wsClient
            )
            /* eslint-disable */
            console.log('Token vencido, reiniciando suscripcion')
            /* eslint-enable */
            this.$apollo.subscriptions.newSale.refresh()
          })
        },
      },
    },
    company: LOCAL_COMPANY,
    salesSummaryClient: {
      query: CLIENT_SALES_SUMMARY,
      variables() {
        return {
          companyNumber: this.company.number,
          year: Number(this.innerSearchedYear),
          clientId: this.$route.params.clientId,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.clients.list[0]
      },
      skip() {
        return !this.company || this.level !== 'client'
      },
    },
    salesSummary: {
      query: COMPANY_SALES_SUMMARY,
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          companyNumber: this.company.number,
          searchedYear: Number(this.innerSearchedYear),
        }
      },
      update(data) {
        return data.myAccount.companies[0].company
      },
      skip() {
        return !this.company || this.level !== 'company'
      },
    },
  },
  data() {
    return {
      company: null,
      innerSelectedMonth: this.value,
      salesSummary: null,
      salesSummaryClient: null,
      innerSearchedYear: this.searchedYear
        ? this.searchedYear
        : String(new Date().getFullYear()),
    }
  },
  computed: {
    yearsOptions() {
      if (this.level === 'company') {
        if (
          !this.salesSummary ||
          this.salesSummary.salesSumaryExistedYears.length === 0
        ) {
          return [
            { value: this.innerSearchedYear, label: this.innerSearchedYear },
          ]
        }
        return this.parseYearsAsDropdownOptions(
          this.salesSummary.salesSumaryExistedYears
        )
      } else {
        if (
          !this.salesSummaryClient ||
          this.salesSummaryClient.salesSumaryExistedYears.length === 0
        ) {
          return [
            { value: this.innerSearchedYear, label: this.innerSearchedYear },
          ]
        }
        return this.parseYearsAsDropdownOptions(
          this.salesSummaryClient.salesSumaryExistedYears
        )
      }
    },
    chartData() {
      const data =
        this.level === 'client' ? this.salesSummaryClient : this.salesSummary
      if (data) {
        if (this.level === 'client') {
          return this.parsedSalesSummary(
            data.salesSumary.months,
            this.innerSearchedYear
          )
        }
        return this.parsedSalesSummary(
          data.salesSumaryPerMonth.months,
          this.innerSearchedYear
        )
      }
      return null
    },
    selectedValue() {
      const data =
        this.level === 'client' ? this.salesSummaryClient : this.salesSummary
      if (data) {
        return this.chartData[this.innerSearchedYear][this.innerSelectedMonth]
      }
      return null
    },
  },
  watch: {
    searchedYear(newVal) {
      this.innerSearchedYear = newVal
    },
    innerSearchedYear(newVal) {
      this.$emit('searchedYear', newVal)
      if (newVal === String(new Date().getFullYear())) {
        this.innerSelectedMonth = new Date().getMonth()
      } else {
        this.innerSelectedMonth = 11
      }
    },
    value(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this.innerSelectedMonth = this.value
    },
    innerSelectedMonth(newVal) {
      this.$emit('input', newVal)
    },
    selectedValue(newVal) {
      this.$emit('selectedValue', newVal)
    },
  },
  created() {
    this.refetchQueries()
  },
  activated() {
    this.refetchQueries()
  },
  methods: {
    refetchQueries() {
      if (this.level === 'company') {
        this.$apollo.queries.salesSummary.refetch()
      } else {
        this.$apollo.queries.salesSummaryClient.refetch()
      }
    },
    parseYearsAsDropdownOptions(years /* [year1,year2] */) {
      return years.map((year) => {
        return {
          value: String(year),
          label: String(year),
        }
      })
    },
    parsedSalesSummary(
      months /* [ { total, currency, month } ] */,
      searchedYear /* int */
    ) {
      /* current date  20/11/2019
    disabled:true for future months
    {
      '2019': [
            { label: 'ENE', amount: 80,formattedAmount:$80.00 MXN },
            { label: 'SEP', amount: 160,formattedAmount:$160.00 MXN  },
            { label: 'OCT', amount: 0,formattedAmount:$0.00 MXN  },
            { label: 'NOV', amount: 0,formattedAmount:$0.00 MXN  },
            { label: 'DIC', amount: 0,,formattedAmount:$0.00 MXN disabled: true },
          ],
    }
  */
      const createMonth = (monthNumber) => {
        return {
          currency: 'MXN',
          month: monthNumber,
          total: 0,
        }
      }

      const createChartObject = (month) => {
        /*
    returns
    {
      label:'ene',
      currency:'MXN'
      amount:1000,
      formattedAmount:"$1,000.00 MXN",
      disabled:true/false
    }
    */
        const formatAmount = (amount, currency) => {
          const money = amount.toLocaleString('en', {
            minimumFractionDigits: 2,
          })
          return `$${money} ${currency}`
        }
        const today = new Date()
        // On backend the first month starts on 1
        const monthDate = new Date(Number(searchedYear), month.month - 1, 1)
        const monthName = format(monthDate, 'MMM', { locale: es })
        return {
          label: monthName,
          amount: month.total,
          currency: month.currency,
          formattedAmount: formatAmount(month.total, month.currency),
          disabled: today < monthDate,
        }
      }
      const monthsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      let chartData
      if (months.length) {
        chartData = monthsNumbers.map((monthNumber) => {
          const defaultMonth = createMonth(monthNumber)
          const month = months.find((month) => month.month === monthNumber)
          if (month) {
            return createChartObject(month)
          }
          return createChartObject(defaultMonth)
        })
      } else {
        chartData = monthsNumbers.map(createMonth).map(createChartObject)
      }
      const result = {}
      result[searchedYear] = chartData
      return result
    },
  },
}
</script>
<template>
  <GxChartBarCard
    v-if="chartData"
    v-model="innerSearchedYear"
    :selected-bar="innerSelectedMonth"
    :dataset="chartData[innerSearchedYear]"
    :dropdown-options="yearsOptions"
    :loading="$apollo.queries.salesSummary.loading"
    @click="$emit('click')"
    @selectBar="innerSelectedMonth = $event"
  />
  <GxLoader v-else />
</template>

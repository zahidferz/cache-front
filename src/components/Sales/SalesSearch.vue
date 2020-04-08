<script>
import { LOCAL_COMPANY, SALES_SEARCH } from '@src/apollo/queries'
import { format } from 'date-fns'
import debounce from 'lodash/debounce'
import SaleListItem from '@components/Sales/SaleListItem'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo'
import GxIcon from '@components/_Core/Icons/GxIcon'
import SaleCardPlaceholder from '@components/Sales/SaleCardPlaceholder'
import SaleRowLoader from '@components/Sales/SaleRowLoader'
const es = require('date-fns/locale/es')
export default {
  name: 'SalesSearch',
  components: {
    SaleListItem,
    GxInfiniteScrollApollo,
    GxLoader,
    GxIcon,
    SaleCardPlaceholder,
    SaleRowLoader,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    invoicedStatusEnum: {
      type: Array,
      default: () => [],
    },
    paymentStatus: {
      type: Array,
      default: () => [],
    },
    searchWithFilters: {
      type: Boolean,
      default: true,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      company: null,
      searchText: '',
      sales: null,
      searchSalesQuery: SALES_SEARCH,
      debouncedUpdateSearch: null,
    }
  },
  computed: {
    searchSalesVariables() {
      if (this.company && this.company.branchNumber) {
        return {
          companyNumber: this.company.number,
          where: {
            branchNumber: this.company.branchNumber,
            searchText: this.searchText ? this.searchText.toLowerCase() : '',
            endDate: this.endDate,
            startDate: this.startDate,
            saleStatusArray: ['valid'],
            invoicedStatusArray: this.invoicedStatusEnum,
            paymentStatusArray: this.paymentStatus,
          },
        }
      }
      return null
    },
  },
  watch: {
    searchTerm: {
      handler(newVal) {
        if (this.debouncedUpdateSearch) {
          this.debouncedUpdateSearch(newVal)
        } else {
          this.updateSearchText(newVal)
        }
      },
      immediate: true,
    },
  },
  created() {
    this.debouncedUpdateSearch = debounce(this.updateSearchText, 300)
  },
  methods: {
    refetchData() {
      if (this.$mq === 'mo') {
        this.$refs.infiniteScrollApolloMo.refetchData()
      } else {
        this.$refs.infiniteScrollApolloDe.refetchData()
      }
    },
    updateSearchText(text) {
      this.searchText = text
    },
    extracSales(data) {
      if (data) {
        return data.myAccount.companies[0].company.sales.list
      }
      return null
    },
    updateDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.sales.list = [
        ...dataToUpdate.myAccount.companies[0].company.sales.list,
        ...newData.myAccount.companies[0].company.sales.list,
      ]
      return dataToUpdate
    },
    parseMonth(date) {
      return format(new Date(date), 'MMMM', { locale: es })
    },
    parseYear(date) {
      return format(new Date(date), 'YYYY', { locale: es })
    },
    differentYear(index, listData, sale) {
      if (index === 0) {
        return this.searchWithFilters
      }
      return (
        this.parseYear(sale.date) !== this.parseYear(listData[index - 1].date)
      )
    },
    differentMonth(index, listData, sale) {
      if (listData.length < 1) {
        return true
      }
      if (index === 0 && listData.length > 1) {
        return this.parseMonth(
          listData[index + 1].date !== this.parseMonth(sale.date) ||
            this.parseYear(listData[index + 1].date) !==
              this.parseYear(sale.date)
        )
      }
      return (
        index !== 0 &&
        (this.parseMonth(listData[index - 1].date) !==
          this.parseMonth(sale.date) ||
          this.parseYear(listData[index - 1].date) !==
            this.parseYear(sale.date))
      )
    },
    hasBorderBottom(index, listData, sale) {
      return (
        index === listData.length - 1 ||
        this.parseMonth(listData[index + 1].date) ===
          this.parseMonth(sale.date) ||
        this.parseYear(listData[index + 1].date) !== this.parseYear(sale.date)
      )
    },
  },
}
</script>
<template>
  <div class="flex flex-col flex-grow">
    <GxInfiniteScrollApollo
      v-if="
        searchSalesVariables &&
          $mq === 'de' &&
          (searchText || invoicedStatusEnum || paymentStatus)
      "
      ref="infiniteScrollApolloDe"
      key="GxInfiniteScrollApollo-mo"
      class="flex flex-col flex-grow"
      component="div"
      :query="searchSalesQuery"
      :variables="searchSalesVariables"
      :extract-data-fn="extracSales"
      :update-data-fn="updateDataFn"
    >
      <template slot-scope="{ loading, listData, noMoreResults }">
        <div
          v-if="loading && !listData.length"
          class="flex flex-col flex-grow justify-center items-center"
        >
          <table width="100%" class="table-auto">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <SaleRowLoader v-for="n in 20" :key="n" />
            </tbody>
          </table>
        </div>
        <template v-else>
          <table
            v-if="listData && listData.length"
            width="100%"
            class="table-auto"
          >
            <!-- https://www.w3.org/WAI/EO/Drafts/tutorials/tables/scope/ -->
            <template v-for="(sale, index) in listData">
              <tr
                v-if="differentYear(index, listData, sale)"
                :key="parseYear(sale.date)"
              >
                <th colspan="7" scope="colgroup" class="p-0">
                  <p
                    class="bg-white text-gray-400  py-4 leading-none flex items-center gx-section-title font-bold uppercase"
                  >
                    {{ parseYear(sale.date) }}
                  </p>
                </th>
              </tr>
              <tr
                v-if="differentMonth(index, listData, sale)"
                :key="`${parseYear(sale.date)}-${parseMonth(sale.date)}`"
              >
                <th colspan="7" scope="colgroup" class="p-0">
                  <p
                    class="bg-gray-100 border-b border-t border-gray-200 text-gray-400 px-4 de:py-2 leading-none flex items-center gx-caption de:gx-caption font-bold uppercase"
                  >
                    {{ parseMonth(sale.date) }}
                  </p>
                </th>
              </tr>
              <SaleListItem
                :key="sale.saleId"
                :class="{
                  'border-b border-gray-200': hasBorderBottom(
                    index,
                    listData,
                    sale
                  ),
                }"
                :search-term="searchTerm"
                :sale="sale"
              />
            </template>
          </table>

          <div
            v-if="loading && listData.length"
            class="w-full item-center justify-center mt-4"
          >
            <GxLoader key="GxLoader" class="m-auto" />
          </div>
          <div v-if="!loading && noMoreResults && listData.length" class="mt-4">
            <p class="flex items-center justify-center">
              <GxIcon icon="tag_faces" class="font-bold text-2xl mx-1" />
              Estos son todos los resultados relacionados.
            </p>
          </div>
          <div
            v-if="!loading && noMoreResults && !listData.length"
            class="flex flex-grow flex-col justify-center items-center mt-4"
          >
            <img
              class="w-44 mb-8"
              :src="$utils.alertImages.NoResultsFound"
              alt="Sin resultados"
            />
            <p class="text-center gx-h4">
              No encontramos ventas relacionadas con tu búsqueda
            </p>
          </div>
        </template>
      </template>
    </GxInfiniteScrollApollo>
    <GxInfiniteScrollApollo
      v-if="searchSalesVariables && $mq === 'mo'"
      key="GxInfiniteScrollApollo-mo"
      ref="infiniteScrollApolloMo"
      class="flex flex-col flex-grow"
      component="ul"
      :query="searchSalesQuery"
      :variables="searchSalesVariables"
      :extract-data-fn="extracSales"
      :update-data-fn="updateDataFn"
      @noResults="$emit('noResults', $event)"
    >
      <template slot-scope="{ loading, listData, noMoreResults }">
        <div
          v-if="loading && !listData.length"
          class="flex flex-col flex-grow justify-center items-center"
        >
          <SaleCardPlaceholder
            v-for="n in 10"
            :key="n"
            :class="{ 'mt-8': n === 1 }"
          />
        </div>
        <template v-else>
          <li v-for="(sale, index) in listData" :key="sale.saleId">
            <p
              v-if="differentYear(index, listData, sale)"
              key="year-start"
              :class="{ 'pb-2': index === 0, 'py-2': index > 0 }"
              class="text-gray-500 px-4 leading-none  flex items-center gx-caption font-bold uppercase"
              >{{ parseYear(sale.date) }}</p
            >
            <p
              v-if="differentMonth(index, listData, sale)"
              key="month"
              class="bg-gray-100 text-gray-500 leading-none px-4  py-2  flex items-center gx-caption  font-bold uppercase"
              >{{ parseMonth(sale.date) }}</p
            >
            <SaleListItem
              :class="{
                'border-b border-gray-200': hasBorderBottom(
                  index,
                  listData,
                  sale
                ),
              }"
              :search-term="searchTerm"
              :sale="sale"
            />
          </li>
          <li
            v-if="loading && listData.length"
            class="w-full item-center justify-center mt-4"
          >
            <GxLoader key="GxLoader" class="m-auto" />
          </li>
          <li v-if="!loading && noMoreResults && listData.length" class="mt-2">
            <p class="gx-caption flex items-center justify-center">
              <GxIcon icon="tag_faces" class="font-bold text-2xl mx-1" />
              Estos son todos los resultados relacionados.
            </p>
          </li>
          <li
            v-if="!loading && noMoreResults && !listData.length"
            class="flex flex-grow flex-col justify-center items-center mt-4"
          >
            <img
              class="w-44 mb-8"
              :src="$utils.alertImages.NoResultsFound"
              alt="Sin resultados"
            />
            <p class="text-center gx-h4 px-4">
              No encontramos ventas relacionadas con tu búsqueda
            </p>
          </li>
        </template>
      </template>
    </GxInfiniteScrollApollo>
  </div>
</template>

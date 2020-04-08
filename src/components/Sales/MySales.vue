<script>
import SalesSummaryChart from '@components/Sales/SalesSummaryChart'
import GxDeFilters from '@components/_Core/Filters/GxDeFilters'
import {
  LOCAL_COMPANY,
  COMPANY_SALES_SUMMARY,
  COMPANY_INFO,
} from '@src/apollo/queries'
import { REQUEST_SALES_BY_TIME_PERIOD } from '@src/apollo/mutations'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
import SalesSearch from '@components/Sales/SalesSearch'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxModal from '@components/_Core/Modals/GxModal'
import SalesMobileFilters from '@components/Sales/SalesMobileFilters'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import GxDisabledInput from '@components/_Core/Forms/GxDisabledInput'
import GxInput from '@components/_Core/Forms/GxInput'
export default {
  name: 'MySales',
  components: {
    GxInput,
    SalesSummaryChart,
    GxDeFilters,
    GxDesktopSearchInput,
    SalesSearch,
    GxIcon,
    GxModal,
    SalesMobileFilters,
    GxCardModal,
    GxDisabledInput,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
    },
    companySummary: {
      query: COMPANY_SALES_SUMMARY,
      variables() {
        return {
          companyNumber: this.company.number,
          searchedYear: Number(this.searchedYear),
        }
      },
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
      activatedKey: Date.now(),
      downloadSalesSuccess: null,
      downloadSalesLoading: false,
      email: '',
      company: null,
      companySummary: null,
      selectedFilters: [],
      selectedMonth: new Date().getMonth(),
      textInput: this.searchTerm,
      mobileFilters: false,
      filtersOpen: false,
      searchedYear: String(new Date().getFullYear()),
      showSalesDownloadModal: false,
      excelDownloadRange: '',
      downloadSalesError: '',
      noResults: false,
      filters: [
        {
          name: 'Estado de la venta',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Facturada',
              enum: 'fullyInvoiced',
            },
            {
              translate: 'No facturada',
              enum: 'notInvoiced',
            },
          ],
        },
        {
          name: 'Estado de cobro',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Pendientes',
              enum: 'notPaid',
            },
            {
              translate: 'Parcial',
              enum: 'partiallyPaid',
            },
            {
              translate: 'Cobrada',
              enum: 'fullyPaid',
            },
          ],
        },
        {
          typeFilter: 'range',
          name: 'Periodo de ventas',
        },
      ],
      filtersMobile: [
        {
          typeFilter: 'range',
          name: 'Periodo de ventas',
        },
        {
          name: 'Estado de la venta',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Facturada',
              enum: 'fullyInvoiced',
            },
            {
              translate: 'No facturada',
              enum: 'notInvoiced',
            },
          ],
        },
        {
          name: 'Estado de cobro',
          label: 'translate',
          trackBy: 'enum',
          options: [
            {
              translate: 'Pendiente',
              enum: 'notPaid',
            },
            {
              translate: 'Parcial',
              enum: 'partiallyPaid',
            },
            {
              translate: 'Cobrada',
              enum: 'fullyPaid',
            },
          ],
        },
      ],
      excelDownloadStartDate: '',
      excelDownloadEndDate: '',
    }
  },
  computed: {
    startDate() {
      if (this.selectedPeriod) {
        return this.selectedPeriod.startDate
      }
      if (
        this.searchedYear &&
        !this.textInput &&
        this.selectedFilters.length === 0
      ) {
        return new Date(Number(this.searchedYear), 0, 1).toISOString()
      }
      return null
    },
    selectedPeriod() {
      const filter = this.selectedFilters.find((filter) => {
        return filter.name === 'rango' || filter.name === 'Periodo de ventas'
      })
      if (filter) {
        if (filter.range) {
          this.$emit('startDate', filter.range.startDate)
          this.$emit('endDate', filter.range.endDate)
        }
        return filter.range
      }
      return null
    },
    invoicedStatusEnum() {
      const filter = this.selectedFilters.find((filter) => {
        return filter.name === 'Estado de la venta'
      })
      if (filter) {
        return filter.checked
      }
      return []
    },
    paymentStatus() {
      const filter = this.selectedFilters.find((filter) => {
        return filter.name === 'Estado de cobro'
      })
      if (filter) {
        return filter.checked
      }
      return []
    },
    endDate() {
      if (this.selectedPeriod) {
        return this.selectedPeriod.endDate
      }
      if (
        typeof this.selectedMonth === 'number' &&
        !this.textInput &&
        this.selectedFilters.length === 0
      ) {
        return new Date(
          Number(this.searchedYear),
          Number(this.selectedMonth) + 1,
          0
        ).toISOString()
      }
      if (!this.textInput) {
        return new Date(Number(this.searchedYear), 12, 0).toISOString()
      }
      return null
    },
  },
  watch: {
    searchTerm(newVal) {
      this.textInput = newVal
    },
    excelDownloadRange() {
      this.downloadSalesError = ''
    },
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          this.email = newVal.email
        }
      },
      immediate: true,
    },
    textInput(newVal) {
      if (newVal) {
        this.selectedFilters = []
      }
    },
  },
  activated() {
    this.activatedKey = Date.now()
  },
  methods: {
    refetchData() {
      this.$refs.salesSearch.refetchData()
    },
    async downloadSales() {
      if (!this.excelDownloadStartDate || !this.excelDownloadEndDate) {
        this.downloadSalesError = 'Debes ingresar un periodo válido'
        return
      }

      this.downloadSalesError = ''

      try {
        this.downloadSalesLoading = true

        let startDate = this.excelDownloadStartDate
        let endDate = this.excelDownloadEndDate

        await this.$apollo.mutate({
          mutation: REQUEST_SALES_BY_TIME_PERIOD,
          variables: {
            data: {
              companyNumber: this.company.number,
              startDate,
              endDate,
            },
          },
        })
        this.downloadSalesLoading = false
        this.downloadSalesSuccess = true
      } catch (e) {
        this.downloadSalesLoading = false
        this.downloadSalesError = e
        /* eslint-disable */
        console.log(e)
        /* eslint-enable */
      }
    },
  },
}
</script>
<template>
  <div class="flex flex-grow flex-col">
    <div v-if="selectedFilters.length === 0 && !textInput">
      <h1
        class="text-gray-500 de:text-gray-400 font-bold pl-4 de:pl-0 gx-section-title "
        >RESUMEN DE VENTAS</h1
      >
      <SalesSummaryChart
        v-model="selectedMonth"
        :searched-year="searchedYear"
        class="mt-4 mx-4 de:mx-0"
        level="company"
        @refetch="refetchData"
        @searchedYear="searchedYear = $event"
      />
    </div>
    <p
      v-if="$mq === 'de' && (selectedFilters.length > 0 || textInput)"
      class="gx-section-title font-bold leading-none text-gray-400"
      >RESULTADOS DE BÚSQUEDA</p
    >
    <MqLayout
      mq="de"
      :class="{ 'overflow-x-auto': !filtersOpen }"
      class="mt-8 flex flex-col items-center"
    >
      <div class="w-full justify-end flex">
        <GxDesktopSearchInput
          v-model="textInput"
          autofocus
          label="Buscar venta"
        />
      </div>
      <div
        class="flex justify-between w-full border-b border-gray-200 border-t mt-2"
      >
        <button
          class="w-30 p-2 cursor-pointer flex justify-center items-center hover:text-primary-500 hover:bg-secondary-50 hover:border-primary-500 border-white border-b"
          @click.stop.prevent="showSalesDownloadModal = true"
          ><GxIcon class="mr-1" icon="download" /><span class="leading-none"
            >Descargar</span
          ></button
        >
        <div class="flex items-center flex-end pl-2 py-2">
          <GxDeFilters
            v-model="selectedFilters"
            group-by-filter
            class="flex-grow"
            :filters="filters"
            @filtersOpen="filtersOpen = $event"
          />
        </div>
      </div>
    </MqLayout>
    <p
      v-if="
        $mq === 'mo' && (selectedFilters.length > 0 || textInput) && !noResults
      "
      class=" mt-4 ml-4 gx-section-title font-bold mb-4 leading-none text-gray-500"
      >RESULTADOS DE BÚSQUEDA</p
    >
    <MqLayout
      v-show="
        (!noResults && selectedFilters.length === 0) ||
          selectedFilters.length > 0
      "
      mq="mo"
      :class="{ 'mt-8': selectedFilters.length === 0 && !textInput }"
      class="w-full flex  items-center mb-2 px-4 overflow-x-auto"
    >
      <SalesMobileFilters v-model="selectedFilters" :filters="filtersMobile" />
    </MqLayout>
    <SalesSearch
      ref="salesSearch"
      :key="activatedKey"
      :payment-status="paymentStatus"
      :invoiced-status-enum="invoicedStatusEnum"
      :start-date="startDate"
      :end-date="endDate"
      :search-with-filters="selectedFilters.length > 0 || !!textInput"
      :search-term="textInput"
      @noResults="noResults = $event"
    />
    <GxModal
      v-if="showSalesDownloadModal"
      overflow-visible
      @close="showSalesDownloadModal = false"
    >
      <div
        :class="{ 'de:pb-6': $slots.actions }"
        class="flex flex-col items-center w-108 pt-8 de:shadow-3 de:rounded-lg  bg-white  pb-6 px-6"
        style="overflow: visible;"
      >
        <form
          class="flex flex-col w-full items-center"
          @submit.prevent="downloadSales"
        >
          <h3 class="gx-h5 font-bold">Descargar Excel de ventas</h3>
          <div class="flex items-center mt-8">
            <GxInput
              ref="startDate"
              v-model="excelDownloadStartDate"
              pattern="date"
              placeholder="Inicio"
              label="Inicio"
              icon="calendar_today"
              class="flex-grow"
            />
            <p class="mx-4">-</p>
            <GxInput
              ref="endDate"
              v-model="excelDownloadEndDate"
              pattern="date"
              placeholder="Final"
              label="Final"
              class="flex-grow"
              icon="calendar_today"
              :disabled="!excelDownloadStartDate"
              :min-datetime="excelDownloadStartDate"
            />
          </div>
          <GxDisabledInput
            v-if="email"
            icon="email"
            :value="email"
            class="w-full px-4"
            label="Correo Electrónico"
            name="Correo Electrónico"
          />
          <p class="text-center de:gx-caption gx-caption mb-4"
            >Tu información está protegida.
            <GxTextLink
              target-blank
              :to="{ name: 'privacypolicy' }"
              class="font-bold leading-none"
              >Conoce cómo.</GxTextLink
            ></p
          >
          <p v-if="downloadSalesError" class="text-alert mb-2 mt-2">{{
            downloadSalesError
          }}</p>
          <GxButton type="submit" :loading="downloadSalesLoading"
            >Enviar</GxButton
          >
        </form>
      </div>
    </GxModal>
    <GxCardModal
      v-if="downloadSalesSuccess"
      headline="Revisa tu correo"
      text-body="Te hemos enviado el archivo Excel con tus ventas"
      :card-img="$utils.alertImages.CheckEmail"
      @close="downloadSalesSuccess = false"
    ></GxCardModal>
  </div>
</template>

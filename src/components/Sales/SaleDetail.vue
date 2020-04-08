<script>
import {
  LOCAL_COMPANY,
  SALE_DETAIL,
  SALE_DETAIL_HISTORY,
} from '@src/apollo/queries'
import { SEND_INVOICE_BY_EMAIL } from '@src/apollo/mutations'
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxTabs from '@components/_Core/Navigation/GxTabs'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxPDFViewer from '@components/_Core/GxPDFViewer'
import { saveAs } from 'file-saver/FileSaver'
import ModalSendByEmail from '@components/_Core/Utils/ModalSendByEmail'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import SaleDetailHistoryCard from '@components/Sales/SaleDetailHistoryCard'
import { differenceInDays } from 'date-fns'
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo'
const b64toBlob = require('b64-to-blob')
export default {
  name: 'SaleDetail',
  components: {
    LayoutWebMobile,
    SaleDetailHistoryCard,
    GxTabs,
    GxLoader,
    GxDesktopHeader,
    GxIcon,
    GxPDFViewer,
    ModalSendByEmail,
    GxCardModal,
    GxInfiniteScrollApollo,
  },
  apollo: {
    company: LOCAL_COMPANY,
    sale: {
      query: SALE_DETAIL,
      variables() {
        return {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          saleId: this.saleId,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.sales.list[0]
      },
      error(error) {
        console.error('Error: ', error)
        this.error = error.message
      },
    },
  },
  props: {
    saleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      error: null,
      saleHistoryQuery: SALE_DETAIL_HISTORY,
      email: '',
      showEmailModal: false,
      activeTab: 'detail',
      sendInvoiceMutation: SEND_INVOICE_BY_EMAIL,
      tabs: [
        {
          label: 'Detalle',
          name: 'detail',
        },
        {
          label: 'Historial',
          name: 'history',
        },
      ],
    }
  },
  computed: {
    saleHistoryQueryVariables() {
      if (!this.company) {
        return null
      }
      return {
        companyNumber: this.company.number,
        branchNumber: this.company.branchNumber,
        saleId: this.saleId,
      }
    },
    mobileCurrentTab() {
      if (this.activeTab === 'detail') {
        return 0
      }
      return 1
    },
    sendInvoiceVariables() {
      if (this.company) {
        return {
          branchNumber: this.company.branchNumber,
          companyNumber: this.company.number,
          saleId: this.saleId,
        }
      }
      return null
    },
    filename() {
      return this.saleId
    },
    pdfFile() {
      if (!this.sale) return null
      return this.sale.pdfFile
    },
    parsedMissingPayment() {
      if (!this.sale) return null
      const saleTotal = this.sale.total
      let pendingAmount
      let roundedPendingAmount
      switch (this.sale.paymentStatus) {
        case 'partiallyPaid':
          pendingAmount = this.sale.receivedPayments.reduce((acc, current) => {
            return Number(acc) - Number(current.amountPaidToThisSale)
          }, Number(saleTotal))
          roundedPendingAmount = Number(pendingAmount).toLocaleString('en', {
            minimumFractionDigits: 2,
          })
          return `$${roundedPendingAmount} MXN`
        case 'notPaid':
          roundedPendingAmount = Number(this.sale.total).toLocaleString('en', {
            minimumFractionDigits: 2,
          })
          return `$${roundedPendingAmount} MXN`
        default:
          return null
      }
    },
    sortedexpectedPaymentSchedule() {
      return this.sale.expectedPaymentSchedule.map((p) => p).sort(this.sortDate)
    },
    paymentStatus() {
      if (!this.sale) return null

      let saleDate
      let expectedDate
      let formattedSaleDate
      switch (this.sale.paymentStatus) {
        case 'fullyPaid':
          saleDate = this.sale.receivedPayments[0].date
          formattedSaleDate = this.$utils.dates.getRelativeDateShort(saleDate)
          return {
            name: 'Cobrada',
            icon: 'check_circle',
            color: 'success',
          }
        case 'partiallyPaid':
          saleDate = this.sortedexpectedPaymentSchedule[0].expectedDate
          expectedDate = this.sortedexpectedPaymentSchedule[0].expectedDate
          formattedSaleDate = this.$utils.dates.formatDateLong(saleDate)
          if (differenceInDays(expectedDate, new Date()) < 0) {
            return {
              name: 'Vencida',
              datePrefix: 'Fecha de cobro: ',
              date: `${formattedSaleDate}`,
              icon: 'warning',
              color: 'alert',
              missingAmount: this.parsedMissingPayment,
            }
          } else {
            return {
              name: 'Parcial',
              datePrefix: 'Fecha de cobro: ',
              date: `${formattedSaleDate}`,
              icon: 'warning',
              color: 'pending',
              missingAmount: this.parsedMissingPayment,
            }
          }
        case 'notPaid':
          expectedDate = this.sortedexpectedPaymentSchedule[0].expectedDate
          formattedSaleDate = this.$utils.dates.formatDateLong(expectedDate)
          if (differenceInDays(expectedDate, new Date()) < 0) {
            return {
              name: 'Vencida',
              datePrefix: 'Fecha de cobro: ',
              date: `${formattedSaleDate}`,
              icon: 'warning',
              color: 'alert',
              missingAmount: this.parsedMissingPayment,
            }
          } else {
            return {
              name: 'Pendiente',
              datePrefix: 'Estimado: ',
              date: `${formattedSaleDate}`,
              icon: 'warning',
              color: 'pending',
              missingAmount: this.parsedMissingPayment,
            }
          }

        default:
          return null
      }
    },
    invoiceId() {
      if (!this.sale || this.sale.invoices.length === 0) return null
      return this.sale.invoices[0].folio
    },
  },
  methods: {
    saleHistoryExtractData(data) {
      return data.myAccount.companies[0].company.sales.list[0].saleHistory.list
    },
    salesHistoryUpdateData(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.sales.list[0].saleHistory.list = [
        ...dataToUpdate.myAccount.companies[0].company.sales.list[0].saleHistory
          .list,
        ...newData.myAccount.companies[0].company.sales.list[0].saleHistory
          .list,
      ]
      return dataToUpdate
    },
    sortDate(a, b) {
      // [oldest,...latest]
      if (new Date(a) < new Date(b)) {
        return -1
      }
      return 1
    },
    goBack() {
      if (
        this.$route.query.from === 'salesDashboard' &&
        this.$route.query.searchTerm
      ) {
        // this.$router.push({
        //   name: 'salesDashboard',
        //   query: { searchTerm: this.$route.query.searchTerm },
        // })
        this.$router.back()
        return
      }
      if (this.$route.query.from === 'mySales') {
        // this.$router.push({ name: 'mySales' })

        // Use router back to trigger keep alive and scroll to previous position
        // in the sales list from MySalesView
        this.$router.back()
        return
      }
      this.$router.push({ name: 'sales' })
    },
    downloadPDF() {
      saveAs(b64toBlob(this.sale.pdfFile), `${this.filename}.pdf`)
    },
    downloadXML() {
      saveAs(b64toBlob(this.sale.xmlFile), `${this.filename}.xml`)
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    :title="invoiceId"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <template v-if="$mq === 'mo'" slot="topbar-right">
      <GxIcon
        html-tag="button"
        class="text-h6"
        icon="email"
        @click="
          () =>
            $router.replace({
              name: 'saleDetailSendEmail',
              params: this.$route.params.saleId,
              query: {
                from: this.$route.query.from,
                folio: sale.invoices.length ? sale.invoices[0].folio : null,
              },
            })
        "
      />
    </template>
    <template v-if="!$apollo.queries.sale.loading" v-slot:header2>
      <GxTabs
        initial-tab="detail"
        :tabs="tabs"
        no-selected-black
        @activeTab="activeTab = $event"
      />
    </template>
    <div
      v-if="$apollo.queries.sale.loading"
      class="flex-grow flex flex-col items-center justify-center"
    >
      <GxLoader />
    </div>
    <div v-else class="flex-grow flex flex-col ">
      <GxDesktopHeader
        v-if="$mq === 'de'"
        :header="invoiceId"
        icon="keyboard_backspace"
        :icon-click-handler="goBack"
      />
      <div v-if="$mq === 'de'">
        <GxTabs
          initial-tab="detail"
          :tabs="tabs"
          @activeTab="activeTab = $event"
        />
      </div>
      <div
        v-show="activeTab === 'detail'"
        class="px-4 flex flex-col flex-grow mt-4 de:mt-4 de:px-0"
      >
        <article
          v-if="paymentStatus"
          class="rounded-lg p-4 shadow-2 de:shadow-2 border-l-8 leading-none"
          :class="`border-${paymentStatus.color}`"
        >
          <div class="flex items-center gx-h6 leading-none">
            <GxIcon
              :icon="paymentStatus.icon"
              :class="`text-${paymentStatus.color}`"
            />
            <p class="ml-2 font-bold text-gray-500">
              {{ paymentStatus.name }}
            </p>
            <p
              v-if="paymentStatus.date"
              class="ml-4 text-gray-500 flex flex-wrap"
            >
              <span class="mr-1">{{ paymentStatus.datePrefix }}</span>
              <span>{{ paymentStatus.date }}</span>
            </p>
          </div>
          <p
            v-if="paymentStatus.missingAmount"
            class="gx-subtitle text-gray-500 font-bold mt-4"
          >
            {{ paymentStatus.missingAmount }}
          </p>
        </article>
        <!-- Desktop actions bar -->
        <ul
          v-if="$mq === 'de'"
          class="gxDesktopActions flex justify-end de:mt-4 de:gx-caption border-b border-gray-200"
        >
          <li
            ><button
              v-if="sale.invoices.length"
              class="w-30 py-2 cursor-pointer flex justify-center items-center hover:text-primary-500 hover:bg-secondary-50 hover:border-primary-500 border-white border-b"
              @click.stop="showEmailModal = true"
              ><GxIcon class="mr-1" icon="email" /><span class="leading-none"
                >Reenviar</span
              ></button
            ></li
          >
          <li
            ><button
              class="w-30 py-2 cursor-pointer flex justify-center items-center hover:text-primary-500 hover:bg-secondary-50 hover:border-primary-500 border-white border-b"
              @click="downloadPDF"
              ><GxIcon class="mr-1" icon="picture_as_pdf" /><span
                class="leading-none"
                >Descargar PDF</span
              ></button
            ></li
          >
          <li
            ><button
              class="w-30 py-2 cursor-pointer flex justify-center items-center hover:text-primary-500 hover:bg-secondary-50 hover:border-primary-500 border-white border-b"
              @click="downloadXML"
              ><GxIcon class="mr-1" icon="post_add" /><span class="leading-none"
                >Descargar XML</span
              ></button
            ></li
          >
          <!-- <li
            ><button
              class="py-2 cursor-pointer flex items-center hover:text-primary-500 hover:bg-secondary-50 hover:border-primary-500 border-white border-b"
              ><GxIcon class="mr-1" icon="cancel" /><span class="leading-none"
                >Cancelar</span
              ></button
            ></li
          > -->
        </ul>
        <GxPDFViewer v-if="pdfFile" :blob="pdfFile" class="mt-4" />
      </div>
      <div
        v-if="activeTab === 'history'"
        class="flex flex-col flex-grow mt-4 de:mt-0 de:px-0"
      >
        <h3
          v-if="$mq === 'de'"
          class="mt-4 leading-none de:gx-caption uppercase p-2 text-gray-400 font-bold bg-gray-100"
          >Historial de la factura</h3
        >
        <GxInfiniteScrollApollo
          key="saleHistory"
          :variables="saleHistoryQueryVariables"
          :query="saleHistoryQuery"
          :extract-data-fn="saleHistoryExtractData"
          :update-data-fn="salesHistoryUpdateData"
        >
          <template slot-scope="{ loading, listData }">
            <div
              v-if="listData.length === 0 && loading"
              class="p-4 flex justify-center items-center"
            >
              <GxLoader />
            </div>
            <ul v-else>
              <SaleDetailHistoryCard
                v-for="historyItem in listData"
                :key="historyItem.creationDate"
                :sale-number="sale.saleNumber"
                :history="historyItem"
              />
              <li v-if="listData.length > 0 && loading" class="mt-4">
                <GxLoader />
              </li>
            </ul>
          </template>
        </GxInfiniteScrollApollo>
      </div>
    </div>
    <GxCardModal
      v-if="error"
      headline="Error"
      :text-body="error"
      :card-img="$utils.alertImages.Oops"
      alt="Error"
      @close="error = false"
    />
    <ModalSendByEmail
      v-if="showEmailModal"
      :mutation-variables="sendInvoiceVariables"
      :mutation="sendInvoiceMutation"
      :header="`Enviar factura ${sale.invoices[0].folio}`"
      success-message="Factura enviada"
      @close="showEmailModal = false"
    />
  </LayoutWebMobile>
</template>

<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxTag from '@components/_Core/Tags/GxTag'
import SaleDownloadFile from '@components/Sales/SaleDownloadFile'
import ModalSendByEmail from '@components/_Core/Utils/ModalSendByEmail'
import { SEND_INVOICE_BY_EMAIL } from '@src/apollo/mutations'
import { LOCAL_COMPANY, GET_SALE_PDF, GET_SALE_XML } from '@src/apollo/queries'
import SaleDeskTooltip from '@components/Sales/SaleDeskTooltip'
export default {
  name: 'SaleRowDesktop',
  components: {
    GxIcon,
    GxTag,
    ModalSendByEmail,
    SaleDownloadFile,
    SaleDeskTooltip,
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  props: {
    weekday: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    invoices: {
      type: Array,
      required: true,
    },
    saleNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    incomeCategory: {
      type: Object,
      required: true,
    },
    lastMovementDate: {
      type: String,
      default: '',
    },
    saleId: {
      type: String,
      required: true,
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      company: null,
      sendInvoiceMutation: SEND_INVOICE_BY_EMAIL,
      sendInvoiceModal: false,
      pdfQuery: GET_SALE_PDF,
      xmlQuery: GET_SALE_XML,
      pdfFile: null,
    }
  },
  computed: {
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
    fileVariables() {
      if (this.company) {
        return {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          saleId: this.saleId,
        }
      }
      return null
    },
  },
  methods: {
    extractPDF(data) {
      return data.myAccount.companies[0].company.sales.list[0].pdfFile
    },
    extractXML(data) {
      return data.myAccount.companies[0].company.sales.list[0].xmlFile
    },
  },
}
</script>
<template>
  <tr
    class="cursor-pointer hover:bg-gray-200"
    @click="
      $router.push({
        name: 'saleDetail',
        params: { saleId: saleId },
        query: { searchTerm, from: $route.name },
      })
    "
  >
    <td class="align-middle">
      <p
        class="flex flex-col pl-2 pr-4 leading-none text-center text-gray-500 de:gx-caption items-center justify-center capitalize"
      >
        <span>{{ weekday }}</span>
        <span>{{ day }} </span>
        <span>{{ month }}</span>
      </p>
    </td>
    <td
      class="py-4 border-l align-middle border-gray-200 text-right  whitespace-no-wrap"
    >
      <div
        class="flex items-center overflow-hidden flex-grow-0 flex-shrink-0 w-fit-content"
      >
        <div
          :class="`bg-avatar-${incomeCategory.color}`"
          class="w-6 h-6 rounded flex-grow-0 flex-shrink-0  gxLongTable flex justify-center items-center  ml-8"
        >
          <GxIcon class="text-white" icon="local_offer" />
        </div>
        <div class="flex flex-col ml-4 overflow-hidden">
          <p
            class="leading-none leading-none flex items-center white overflow-hidden"
          >
            <span class="truncate">{{ amount }} </span>
          </p>
        </div>
      </div>
    </td>
    <td class=" whitespace-no-wrap px-4 align-middle">
      <p class="de:gx-caption text-center">{{ status }}</p>
    </td>
    <td class=" whitespace-no-wrap px-4 align-middle">
      <p class="de:gx-caption text-gray-500 text-center">{{ saleNumber }}</p>
    </td>
    <td class="text-center  whitespace-no-wrap px-4 align-middle">
      <div class="w-full h-full flex justify-center items-center ">
        <GxTag v-if="invoices.length > 0" class="w-fit-content">
          <p class="w-20 truncate  font-bold py-1">{{ invoices[0].folio }}</p>
        </GxTag>
      </div>
    </td>
    <td class="align-middle">
      <p class="text-right de:gx-caption gxLongTable whitespace-no-wrap">{{
        lastMovementDate
      }}</p>
    </td>
    <td class="align-middle">
      <div
        v-if="invoices.length > 0"
        class="h-full flex justify-end  items-center px-2"
      >
        <SaleDeskTooltip
          transform-origin="transform-origin: top left;"
          tooltip-classes="mt-1 left-0 shadow-2 rounded-tr text-black rounded-b bg-white p-1 whitespace-no-wrap leading-none de:gx-caption"
        >
          <button
            class="flex items-center de:gx-caption cursor-pointer hover:text-primary cursor-pointer"
            @click.stop="sendInvoiceModal = true"
          >
            <GxIcon icon="email" />
          </button>
          <template v-slot:tooltip>
            <span>Reenviar</span>
          </template>
        </SaleDeskTooltip>
        <SaleDeskTooltip class="ml-4">
          <SaleDownloadFile
            :query="pdfQuery"
            :query-variables="fileVariables"
            :extract-data="extractPDF"
            :file-name="`${invoices[0].folio}.pdf`"
            class="flex items-center de:gx-caption hover:text-primary"
            icon="picture_as_pdf"
          />
          <template v-slot:tooltip>
            <span>Descargar PDF</span>
          </template>
        </SaleDeskTooltip>
        <SaleDeskTooltip class="ml-4">
          <SaleDownloadFile
            :query="xmlQuery"
            :query-variables="fileVariables"
            :extract-data="extractXML"
            :file-name="`${invoices[0].folio}.xml`"
            class="flex items-center de:gx-caption hover:text-primary"
            icon="receipt"
          />
          <template v-slot:tooltip>
            <span> Descargar XML</span>
          </template>
        </SaleDeskTooltip>
      </div>
    </td>
    <ModalSendByEmail
      v-if="sendInvoiceModal"
      :mutation-variables="sendInvoiceVariables"
      :mutation="sendInvoiceMutation"
      :header="`Enviar factura ${invoices[0].folio}`"
      success-message="Factura reenviada"
      @close="sendInvoiceModal = false"
    />
  </tr>
</template>
<style lang="scss" scoped>
.gxLongTable {
  display: flex;
}
.gxSmallTable {
  display: none;
}

@media (max-width: 950px) {
  .gxLongTable {
    display: none;
  }
  .gxSmallTable {
    display: initial;
  }
}
</style>

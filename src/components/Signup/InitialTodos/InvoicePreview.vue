<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxPDFViewer from '@components/_Core/GxPDFViewer'
import get from 'lodash/get'
import { SEND_EMAIL_UPLOAD_CSD, PREVIEW_SALE } from '@src/apollo//mutations'
import { LOCAL_COMPANY, CLIENTS_SHORT_QUERY } from '@src/apollo/queries'
import gql from 'graphql-tag'

export default {
  name: 'InvoicePreview',
  components: {
    GxCardModal,
    GxIcon,
    GxModal,
    GxPDFViewer,
  },
  apollo: {
    company: LOCAL_COMPANY,
    clients: {
      query() {
        return CLIENTS_SHORT_QUERY
      },
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.clients
      },
      skip() {
        return !this.company
      },
    },
  },
  // apollo: {
  //   myAccount: gql`
  //     {
  //       myAccount {
  //         userNumber
  //         companies {
  //           company {
  //             companyNumber
  //           }
  //         }
  //       }
  //     }
  //   `,
  // },
  data() {
    return {
      showSavedInvoiceAlert: false,
      savedInvoiceAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_7_factura.svg'),
      successTimeout: null,
      scale: 0.5,
      initialScale: 0,
      invoiceData: null,
      showUploadCSDSummary: false,
      summaryImg: require('@assets/images/Signup/InitialTodos/mo_001_7_certificados.svg'),
      alertImg: this.$utils.alertImages.retencion_de_usuario,
      showButton: false,
      showSkipCSDAlert: false,
      customError: null,
      loading: false,
      rendering: false,
      pdfFile: null,
    }
  },
  computed: {
    // companyNum() {
    //   return this.myAccount.companies[0].company.companyNumber
    // },
  },
  watch: {
    clients(newVal) {
      if (newVal && newVal.list && newVal.list[0]) {
        this.getInvoiceBase64().then((base64) => {
          this.pdfFile = base64
        })
      }
    },
  },
  methods: {
    nextPage() {
      this.$router.push({ name: 'howtouploadcsd' })
    },
    async getInvoiceBase64() {
      const data = {
        clientId: this.clients.list[0].clientId,
        date: '2019-12-17T06:00:00.000Z',
        expectedPaymentMethod: 'PUE',
        expectedPaymentMethodDescription: 'Pago en una sola exhibición',
        expectedPaymentForm: {
          code: '03',
          paymentType: 'Transferencia electrónica de fondos',
          usesBank: true,
        },
        saleAdditionalDataLocalizedInput_MEX: {
          usoCfdi: 'G03',
        },
        items: [
          {
            itemReferenceId: 'E411016A-24B2-48D4-BC26-E8367A0C3FE1',
            description: 'Concepto 1',
            additionalNotes: '',
            key: 'A',
            quantity: '1',
            unit: ' Contenedores de veinte pies',
            unitBasePrice: '32',
            currency: 'MXN',
            discountPercentage: '0',
            discountAmount: '0',
            discountDescription: '',
            unitPriceWithDiscounts: '32',
            unitTotalPrice: '37.12',
            subtotalAmount: '32',
            totalAmount: '37.12',
            position: 1,
            itemAdditionalDataLocalizedInput_MEX: {
              claveProductoServicioSAT: '60102401',
              claveProductoServicioSATDescripcion: 'Abacos',
              claveUnidadMedidaSAT: '20',
            },
            transferredTaxesPerUnit: [
              {
                rate: '16',
                amount: '5.12',
                taxName: 'IVA',
                code: 'IVA',
                isFreeTax: false,
              },
            ],
            withheldTaxesPerUnit: [],
          },
        ],
        discountPercentage: '0',
        discountAmount: '0',
        subtotal: '32',
        totalTransferredTaxes: '5.12',
        totalWithheldTaxes: '0',
        total: '37.12',
        currency: 'MXN',
        exchangeRate: '1',
        status: 'draft',
        paymentStatus: 'fullyPaid',
        expectedPaymentSchedule: [],
        receivedPayments: [
          {
            date: '2019-12-17T06:00:00.000Z',
            amountPaidToThisSale: '37.12',
          },
        ],
        incomeCategoryId: '69470585-9402-41E8-859C-613914EFBCE5',
        internalNotes: '',
        externalNotes: '',
      }
      const response = await this.$apollo.mutate({
        mutation: PREVIEW_SALE,
        variables: {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          data,
        },
      })
      this.showButton = true
      return response.data.saleInvoicePreviewCreate.saleInvoicePreviewFile
    },
    async getCompanyNumber() {
      const { data } = await this.$apollo.query({
        query: gql`
          {
            myAccount {
              companies {
                company {
                  companyNumber
                }
              }
            }
          }
        `,
      })
      const [company] = data.myAccount.companies
      return company.company.companyNumber
    },
    onSave() {
      this.showSavedInvoiceAlert = true
      this.successTimeout = setTimeout(() => {
        this.nextPage()
      }, 3000)
    },
    onShowSkipCSDAlert() {
      this.showUploadCSDSummary = false
      this.showSkipCSDAlert = true
    },
    goBack() {
      this.$router.back()
    },
    openInfo() {
      window.open(
        'http://ayuda.gestionix.com/es/articles/439200-que-es-un-certificado-de-sello-digital-y-de-donde-lo-obtengo',
        '_blank'
      )
    },
    async sendEmail() {
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: SEND_EMAIL_UPLOAD_CSD,
          variables: {
            companyNumber: this.company.number,
          },
        })
        this.loading = false
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.loading = false
        this.showSkipCSDAlert = false
        this.customError = get(error, 'response.data.message', 'Hubo un error')
        const timeout = setTimeout(() => {
          this.customError = null
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(timeout)
        })
      }
    },
  },
}
</script>
<template>
  <div
    class="flex-grow relative flex flex-col items-center"
    :class="{ 'p-4': $mq === 'mo' }"
  >
    <MqLayout
      mq="de"
      class="flex-grow w-full flex flex-col justify-start items-center"
    >
      <nav
        class="flex w-full gx-h4 font-bold justify-start items-center mt-4 mb-8"
        ><GxIcon
          icon="keyboard_backspace"
          class="cursor-pointer pr-4"
          @click="goBack"
        />
        <p class="font-bold">Así se verá tu logo en la factura</p>
      </nav>
      <!-- <canvas
        id="pdf-canvas"
        ref="pdfCanvas"
        :class="{ border: showButton }"
        @wheel.ctrl.stop.prevent="onWheel"
      ></canvas> -->
      <GxPDFViewer v-if="pdfFile" :blob="pdfFile" class="mt-4 w-full" />
      <GxButton v-if="showButton" class=" ml-auto mt-8 mb-8" @click="onSave"
        >Continuar</GxButton
      >
      <GxButton v-else :loading="true">Loading</GxButton>
      <GxCardModal
        v-if="showSavedInvoiceAlert"
        headline="Tu factura quedó perfecta"
        text-body="Ahora sube tus certificados para poder emitir facturas."
        :card-img="$utils.alertImages.Perfect"
        alt="Tu factura quedó perfecta"
        @click="nextPage"
      />
      <GxModal v-if="showUploadCSDSummary" alt="modal">
        <div
          class="flex-grow items-center flex flex-col w-108 rounded-lg px-12 py-8 shadow-2 bg-white"
        >
          <img
            :src="$utils.alertImages.Do"
            width="176"
            height="176"
            alt="alt"
            class="mb-8"
          />
          <h1 class="gx-h4 font-bold text-center mb-8"
            >Sube el Certificado de Sello Digital (CSD)</h1
          >
          <p
            >El CSD es un archivo digital emitido por el SAT que se usa
            únicamente para facturar. Recuerda que es diferente a la Fiel.
            <GxButtonCircle
              transparent
              icon="help"
              class="text-white"
              label="¿Qué es un certificado de sello digital y de dónde lo obtengo?"
              @click="openInfo"
            />
          </p>
          <p class="my-4 self-start"
            >El CSD está compuesto de tres elementos:</p
          >
          <ol class="px-2 mb-2 self-start">
            <li class="mb-4">1. Certificado de seguridad (archivo .cer)</li>
            <li class="mb-4">2. Llave privada (archivo .key)</li>
            <li>3. Contraseña de la llave privada</li>
          </ol>
          <div class="flex flex-col items-center">
            <p class="de:gx-caption mb-8"
              >Tu información está protegida.
              <GxTextLink target-blank :to="{ name: 'privacypolicy' }"
                >Conoce cómo.</GxTextLink
              ></p
            >
            <GxButton
              class="mx-auto mt-2"
              @click="$router.push({ name: 'howtouploadcsd' })"
              >Continuar</GxButton
            >
            <GxTextLink
              class="text-center de:gx-caption"
              @click="onShowSkipCSDAlert"
              >Hacerlo después</GxTextLink
            >
          </div>
        </div>
      </GxModal>
      <GxCardModal
        v-if="showSkipCSDAlert"
        :key="'CasdModal'"
        headline="¿No tienes los certificados?"
        text-body="Recibe un correo electrónico para que nos respondas con tus archivos y nosotros nos encargaremos del resto."
        :card-img="$utils.alertImages.Khaaa"
        alt="¿No tienes los certificados?"
      >
        <template v-slot:actions>
          <div class="flex justify-center de:mt-8">
            <GxButton
              ghost
              class="mr-4"
              @click="$router.push({ name: 'dashboard' })"
              >salir</GxButton
            >
            <GxButton :loading="loading" @click.stop.prevent="sendEmail"
              >Recibir mail</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxCardModal
        v-if="customError"
        :key="'ErrorModal'"
        :headline="customError"
        :card-img="$utils.alertImages.Oops"
        alt="Comprueba que tu información esté correcta y que sean archivos de tu CSD"
        text-body="Comprueba que tu información esté correcta y que sean archivos de tu CSD."
        @click="customError = !customError"
      />
    </MqLayout>
    <MqLayout
      mq="mo"
      class="flex-grow  w-full flex flex-col items-center  relative overflow-x-scroll"
    >
      <GxPDFViewer v-if="pdfFile" :blob="pdfFile" class="mt-4 w-full" />
      <GxFab
        class="gxFab"
        icon="save"
        data-testid="gxiconsaveinvoice"
        label="Guardar"
        @click="onSave"
      />
      <!-- <GxFab
        class="gxZoomDown"
        icon="zoom_out"
        data-testid="gxzoom"
        label="zoom"
        @click="zoomDown"
      />
      <GxFab
        class="gxZoomUp"
        icon="zoom_in"
        data-testid="gxzoom"
        label="zoom"
        @click="zoomUp"
      /> -->
      <GxCardModal
        v-if="showSavedInvoiceAlert"
        headline="Tu factura quedó perfecta"
        text-body="Ahora sube tus certificados para poder emitir facturas."
        :card-img="$utils.alertImages.Perfect"
        alt="Tu factura quedó perfecta"
        @click="nextPage"
      />
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
.gxFab {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
// .gxZoomUp {
//   position: fixed;
//   right: 5rem;
//   bottom: 1rem;
// }
// .gxZoomDown {
//   position: fixed;
//   right: 9rem;
//   bottom: 1rem;
// }
</style>

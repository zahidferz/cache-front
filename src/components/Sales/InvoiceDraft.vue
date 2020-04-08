<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxPDFViewer from '@components/_Core/GxPDFViewer'
import { LOCAL_COMPANY, CLIENT_INFO_SHORT } from '@src/apollo/queries'
import {
  CREATE_INVOICE_SALE,
  SEND_INVOICE_BY_EMAIL,
  CREATE_SALE,
  UPDATE_SALE,
  VALIDATE_SALE,
} from '@src/apollo/mutations'
export default {
  name: 'InvoiceDraft',
  components: {
    GxCardModal,
    GxPDFViewer,
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      companySummary: null,
      sendInvoiceModal: null,
      company: null,
      validationErrors: null,
      scale: 0.5,
      initialHeight: 400,
      initialScale: 1,
      page: 1,
      pages: null,
      rendering: false,
      saleId: null,
      loading: false,
      alertImg: require('@src/assets/images/Sales/de_007_2_factura.svg'),
      contact: '',
      errorModal: null,
      errorModalTimeOut: null,
      pdfFile: null,
      sale: null,
      dataInput: null,
      registeredSaleModal: false,
      saleDataInput: null,
    }
  },
  computed: {
    saleMonth() {
      if (this.sale && this.sale.date) {
        return new Date(this.sale.date).getMonth()
      }
      return null
    },
    saleYear() {
      if (this.sale && this.sale.date) {
        return new Date(this.sale.date).getFullYear()
      }
      return null
    },
    saleTotal() {
      if (this.saleDataInput) {
        return this.saleDataInput.data.total
      }
      return null
    },
  },
  watch: {
    page(newVal, oldValue) {
      if (newVal > this.pages || newVal < 1) {
        return
      }
      this.renderPdf(this.pdfFile, newVal, this.scale)
    },
  },
  mounted() {
    const pdfFile = localStorage.getItem('newSale--pdf')
    this.saleId = localStorage.getItem('newSale--saleId')
    const saleDataInput = JSON.parse(
      localStorage.getItem('newSale--saleDataInput')
    )
    const saleInfo = JSON.parse(localStorage.getItem('newSale--saleInfoObject'))
    if (saleDataInput && pdfFile && saleInfo) {
      this.saleDataInput = saleDataInput
      this.pdfFile = pdfFile
      this.sale = saleInfo
      // if (this.$mq === 'mo') {
      //   this.thumbnail(pdfFile)
      // }
    } else {
      this.$router.push({ name: 'newsalechooseclient' })
    }
  },
  methods: {
    onModalClose() {
      if (this.errorModalTimeOut) {
        clearTimeout(this.errorModalTimeOut)
      }
      this.errorModal = null
    },
    onSendIvoiceModalClose() {
      if (this.errorModalTimeOut) {
        clearTimeout(this.errorModalTimeOut)
      }
      this.sendInvoiceModal = null
      this.sendEmail()
    },
    // async thumbnail(fileBase64, page = 1) {
    //   try {
    //     // pdfjs.GlobalWorkerOptions.workerSrc =
    //     //   'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
    //     pdfjs.GlobalWorkerOptions.workerSrc = worker
    //     const canvas = this.$refs.pdfCanvas
    //     const fileBlob = window.atob(fileBase64)
    //     const pdf = await pdfjs.getDocument({ data: fileBlob }).promise
    //     const selectedPage = await pdf.getPage(page)
    //     this.pages = pdf.numPages
    //     const scale =
    //       (this.$el.clientWidth - 8) / selectedPage.getViewport(1).width
    //     this.scale = scale
    //     this.initialScale = scale
    //     const viewport = selectedPage.getViewport(scale)
    //     const context = canvas.getContext('2d')
    //     canvas.width = viewport.width
    //     canvas.height = viewport.height
    //     this.initialHeight = viewport.height
    //     const renderContext = {
    //       canvasContext: context,
    //       viewport: viewport,
    //     }
    //     await selectedPage.render(renderContext)
    //   } catch (error) {
    //     /* eslint-disable */
    //     console.log('thumbnail', { error })
    //     /* eslint-enable */
    //   }
    // },
    // async renderPdf(fileBase64, page = 1, scale = 1) {
    //   try {
    //     if (this.rendering) {
    //       return
    //     }
    //     this.rendering = true
    //     const canvas = this.$refs.pdfCanvas
    //     const fileBlob = window.atob(fileBase64)
    //     const pdf = await pdfjs.getDocument({ data: fileBlob }).promise
    //     const selectedPage = await pdf.getPage(page)
    //     const viewport = selectedPage.getViewport(scale)
    //     const context = canvas.getContext('2d')
    //     canvas.height = viewport.height
    //     canvas.width = viewport.width
    //     const renderContext = {
    //       canvasContext: context,
    //       viewport: viewport,
    //     }
    //     await selectedPage.render(renderContext)
    //     this.rendering = false
    //     return true
    //   } catch (error) {
    //     this.rendering = false
    //     // console.log('renderPdf',{error})
    //   }
    // },
    // zoomUp() {
    //   this.scale = this.scale + 0.2
    //   this.renderPdf(this.pdfFile, this.page, this.scale)
    // },
    // zoomDown() {
    //   this.scale = this.scale - 0.2
    //   if (this.initialScale === this.scale) {
    //     return
    //   }
    //   if (this.scale < this.initialScale) {
    //     this.renderPdf(this.pdfFile, this.page, this.initialScale)
    //     this.scale = this.initialScale
    //   } else {
    //     this.renderPdf(this.pdfFile, this.page, this.scale)
    //   }
    // },
    async sendInvoiceToClient(email) {
      try {
        await this.$apollo.mutate({
          mutation: SEND_INVOICE_BY_EMAIL,
          variables: {
            branchNumber: this.branchNumber,
            companyNumber: this.companyNumber,
            saleId: this.saleId,
            email: email,
          },
        })
        return true
      } catch (error) {
        /* eslint-disable  */
        this.sendInvoiceModal = `Error al enviar factura al correo ${email}`
        this.errorModalTimeOut = setTimeout(() => {
          this.onSendIvoiceModalClose()
        }, 3000)
        return null
        /* eslint-enable */
      }
    },
    cleanLocalStorage() {
      localStorage.removeItem('newSale--addtionalDataInfo')
      localStorage.removeItem('newSale--concepts')
      localStorage.removeItem('newSale--pdf')
      localStorage.removeItem('newSale--saleDataInput')
      localStorage.removeItem('newSale--saleInfo')
      localStorage.removeItem('newSale--saleInfoObject')
      localStorage.removeItem('newSale--saleId')
    },
    sendEmail() {
      const { saleId, branchNumber, companyNumber } = this
      this.$router.push({
        name: 'sendInvoice',
        params: { saleId, branchNumber, companyNumber },
      })
    },
    onModalCloseSuccess() {
      this.$router.push({ name: 'sales' })
    },
    async validateSale(saleDataInput) {
      const response = await this.$apollo.mutate({
        mutation: VALIDATE_SALE,
        variables: saleDataInput,
      })
      return response
    },
    errorValditationHanlder(error) {
      const defaultError = ['Error al validar la venta']
      try {
        if (error && error.graphQLErrors) {
          if (Array.isArray(error.graphQLErrors)) {
            const extensions = error.graphQLErrors.filter((err) => {
              return err.extensions
            })
            const exceptions = extensions.filter((ext) => {
              return (
                ext.extensions.exception &&
                ext.extensions.exception.detail &&
                ext.extensions.exception.detail.extServiceResponseBody &&
                ext.extensions.exception.detail.extServiceResponseBody.message
              )
            })
            if (exceptions.length) {
              return exceptions.map(
                (ext) =>
                  ext.extensions.exception.detail.extServiceResponseBody.message
              )
            }
            return defaultError
          }
        }
        return defaultError
      } catch (e) {
        return defaultError
      }
    },
    async updateSale(saleDataInput, saleId) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_SALE,
          variables: { ...saleDataInput, saleId },
        })
        return saleId
      } catch (error) {
        this.errorModal = `Error al actualizar la venta ${this.saleId}`
        return null
      }
    },
    async createSale(saleDataInput) {
      try {
        const response = await this.$apollo.mutate({
          mutation: CREATE_SALE,
          variables: saleDataInput,
        })
        return response.data.saleCreate.sale.saleId
      } catch (error) {
        this.errorModal = this.$utils.parseServerError(error)
        return null
      }
    },
    async saleInvoice(saleId, branchNumber, companyNumber) {
      try {
        const response = await this.$apollo.mutate({
          mutation: CREATE_INVOICE_SALE,
          variables: {
            saleId,
            branchNumber,
            companyNumber,
          },
          update: (store, data) => {
            const query = {
              query: CLIENT_INFO_SHORT,
              variables: {
                companyNumber,
                clientId: data.data.saleInvoiceCreate.sale.client.clientId,
              },
            }
            const oldData = store.readQuery(query)
            oldData.myAccount.companies[0].company.clients.list[0] = {
              ...oldData.myAccount.companies[0].company.clients.list[0],
              ...data.data.saleInvoiceCreate.sale.client,
            }
            store.writeQuery({
              ...query,
              data: oldData,
            })
          },
        })
        return response.data.saleInvoiceCreate.sale.client.contacts[0]
      } catch (error) {
        // this.errorModal = this.$utils.parseServerError(`Error al facturar la venta ${saleId}`)
        // this.errorModal = `Error al facturar la venta ${saleId}`
        this.validationErrors = this.errorValditationHanlder(error)
        return 'error'
      }
    },
    async saleCreatedHandler() {
      let saleId
      if (this.saleId) {
        saleId = await this.updateSale(this.saleDataInput, this.saleId)
      } else {
        saleId = await this.createSale(this.saleDataInput)
      }
      return saleId
    },
    async onSubmit() {
      try {
        this.loading = true
        const branchNumber = this.saleDataInput.branchNumber
        const companyNumber = this.company.number
        if (this.sale.invoicedSale) {
          await this.validateSale(this.saleDataInput)
          const saleId = await this.saleCreatedHandler()
          if (!saleId) {
            return
          }
          this.saleId = saleId
          localStorage.setItem('newSale--saleId', saleId)
          const clientContacts = await this.saleInvoice(
            saleId,
            branchNumber,
            companyNumber
          )
          if (clientContacts === 'error') {
            return
          }
          this.cleanLocalStorage()
          this.contact = clientContacts ? clientContacts.email : ''
          this.branchNumber = branchNumber
          this.saleId = saleId
          this.companyNumber = companyNumber
          if (clientContacts) {
            const response = await this.sendInvoiceToClient(
              clientContacts.email
            )
            if (!response) {
              return
            }
            this.registeredSaleModal = true
          } else {
            this.registeredSaleModal = true
          }
        } else {
          await this.saleCreatedHandler()
          alert('Venta creada')
          this.$router.replace({ name: 'salesDashboard' })
        }
      } catch (error) {
        /* eslint-disable */
        console.log('error', { error })
        /* eslint-enable */
        this.validationErrors = this.errorValditationHanlder(error)
      } finally {
        this.loading = false
      }
    },
    downloadFile() {
      window.open(`data:application/pdf;base64,${this.pdfFile}`, '_blank')
    },
  },
}
</script>
<template>
  <div class=" flex flex-col flex-grow de:mb-4">
    <div class="px-4  flex flex-col flex-grow mt-4  de:mt-0 de:px-0">
      <GxPDFViewer v-if="pdfFile" :blob="pdfFile" />
    </div>

    <GxButton
      v-if="pdfFile"
      class="ml-auto mt-8 mr-4 de:mr-0"
      :loading="loading"
      @click.stop="onSubmit"
      >emitir</GxButton
    >
    <GxCardModal
      v-if="registeredSaleModal"
      headline="Venta facturada correctamente"
      :text-body="
        contact ? `Tu factura también fue enviada a: ${contact}` : null
      "
      :card-img="$utils.alertImages.Done"
      alt="alertAlt"
      @close="onModalCloseSuccess"
    >
      <template v-if="contact" v-slot:actions>
        <div class="ml-auto de:mx-auto mt-8">
          <GxButton :plain="$mq === 'mo'" @click.stop="sendEmail"
            >enviar a otro correo</GxButton
          >
        </div>
      </template>
      <template v-else v-slot:actions>
        <div class="ml-auto de:mx-auto">
          <GxButton :plain="$mq === 'mo'" @click.stop="sendEmail"
            >enviar a un correo</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="errorModal"
      :headline="errorModal"
      :card-img="$utils.alertImages.Dissapointed"
      alt="Error"
      @close="errorModal = null"
    />
    <GxCardModal
      v-if="sendInvoiceModal"
      headline="Error"
      :text-body="sendInvoiceModal"
      :card-img="$utils.alertImages.Oops"
      alt="Error"
      @close="onSendIvoiceModalClose"
    />
    <GxCardModal
      v-if="validationErrors"
      headline="Error al validar la venta"
      :card-img="$utils.alertImages.Dissapointed"
      alt="Error al validar la venta"
      @click="validationErrors = null"
      @close="validationErrors = null"
    >
      <template v-slot:body>
        <ul class="flex flex-col">
          <li
            v-for="message in validationErrors"
            :key="message"
            class="mt-4 text-center break-words"
          >
            {{ message }}
          </li>
        </ul>
      </template>
    </GxCardModal>
  </div>
</template>

<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { SEND_INVOICE_BY_EMAIL } from '@src/apollo//mutations'
import { LOCAL_COMPANY, LOCAL_SALE } from '@src/apollo/queries'
export default {
  name: 'SendInvoice',
  apollo: {
    company: LOCAL_COMPANY,
    sale: LOCAL_SALE,
  },
  components: {
    GxInput,
    GxCardModal,
  },
  data() {
    return {
      company: null,
      loading: false,
      invalid: null,
      sale: null,
      mail: '',
      error: null,
      showSuccess: false,
      timeout: null,
      alertImg: require('@src/assets/images/Clients/Misclientes/mo_005_csvenviado.svg'),
      errorTodoImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      customError: false,
    }
  },
  watch: {
    mail() {
      this.customError = false
    },
  },
  methods: {
    onModalClose() {
      this.showSuccess = false
      this.resetSaleData()
      this.$router.push({ name: 'salesDashboard' })
    },
    onErrorModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.error = null
    },
    resetSaleData() {
      localStorage.removeItem('newSale--addtionalDataInfo')
      localStorage.removeItem('newSale--concepts')
    },
    async onSubmit() {
      try {
        this.loading = true
        if (!this.mail) {
          this.customError = true
          return
        }
        const companyNumber = Number(this.$route.params.companyNumber)
        const saleId = this.$route.params.saleId
        const branchNumber = Number(this.$route.params.branchNumber)
        const email = this.mail
        await this.$apollo.mutate({
          mutation: SEND_INVOICE_BY_EMAIL,
          variables: {
            saleId,
            branchNumber,
            email,
            companyNumber,
          },
        })
        this.showSuccess = true
      } catch (error) {
        this.error = this.$utils.parseServerError(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col w-screen de:w-full de:mb-4">
    <div
      class=" de:shadow-3 de:rounded-lg flex flex-col de:w-108 de:m-auto de:p-8"
    >
      <form
        action=""
        class="w-full de:pt-0 de:pb-6 flex flex-col mt-4"
        @submit.prevent="onSubmit"
      >
        <GxInput
          v-model="mail"
          placeholder="Correo Electrónico"
          label="Correo Electrónico"
          icon="email"
          pattern="email"
          @valid="invalid = $event"
        />
        <p class="mx-auto pb-8 de:gx-caption gx-caption"
          >Tu información está protegida.
          <GxTextLink
            target-blank
            :to="{ name: 'privacypolicy' }"
            class="font-bold"
            >Conoce cómo.</GxTextLink
          ></p
        >
        <p v-if="customError" class="text-alert text-center mb-2"
          >Debes ingresar un correo electrónico</p
        >
        <GxButton :loading="loading" type="submit" class="mx-auto" @click.stop
          >enviar</GxButton
        >
      </form>
    </div>
    <GxCardModal
      v-if="showSuccess"
      headline="Factura enviada"
      :text-body="`Hemos enviado tu factura a: ${mail}`"
      :card-img="$utils.alertImages.CheckEmail"
      alt="Factura enviada"
      @close="onModalClose"
    >
    </GxCardModal>
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Dissapointed"
      alt="Error"
      @close="onErrorModalClose"
    >
    </GxCardModal>
  </div>
</template>

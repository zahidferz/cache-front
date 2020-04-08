<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { SEND_INVOICE_BY_EMAIL } from '@src/apollo//mutations'
import { LOCAL_COMPANY } from '@src/apollo/queries'
import LayoutWebMobile from '@layouts/LayoutWebMobile'

export default {
  name: 'SaleDetailSendEmail',
  components: {
    GxInput,
    GxCardModal,
    LayoutWebMobile,
  },
  props: {
    saleId: {
      type: String,
      required: true,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      company: null,
      loading: false,
      invalid: null,
      email: '',
      error: null,
      showSuccess: false,
      timeout: null,
      alertImg: require('@src/assets/images/Clients/Misclientes/mo_005_csvenviado.svg'),
      errorTodoImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      customError: false,
    }
  },
  watch: {
    email() {
      this.customError = false
    },
  },
  created() {
    if (!this.$route.query.folio) {
      this.$router.push({
        name: 'salesDashboard',
      })
    }
  },
  methods: {
    goBack() {
      this.$router.replace({
        name: 'saleDetail',
        params: { saleId: this.saleId },
        query: { from: this.$route.query.from },
      })
    },
    onModalClose() {
      this.showSuccess = false
      this.goBack()
    },
    onErrorModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.error = null
    },
    async onSubmit() {
      try {
        this.loading = true
        if (!this.email) {
          this.customError = true
          return
        }
        if (this.invalid) {
          return
        }
        const companyNumber = this.company.number
        const branchNumber = this.company.branchNumber
        const saleId = this.saleId
        const email = this.email
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
  <LayoutWebMobile icon="keyboard_backspace" :icon-click-handler="goBack">
    <template v-slot:title>
      <div class="flex flex-wrap">
        <span>Enviar factura&nbsp;</span>
        <span> {{ $route.query.folio }}</span>
      </div>
    </template>
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
            v-model="email"
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
        :card-img="$utils.alertImages.CheckEmail"
        alt="Factura enviada"
        @click="onModalClose"
        @close="onModalClose"
      >
      </GxCardModal>
      <GxCardModal
        v-if="error"
        :headline="error"
        :card-img="errorTodoImg"
        alt="Error"
        @close="onErrorModalClose"
      >
      </GxCardModal>
    </div>
  </LayoutWebMobile>
</template>

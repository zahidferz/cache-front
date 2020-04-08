<script>
// import GxSwitch from '@components/_Core/Forms/GxSwitch'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxInput from '@components/_Core/Forms/GxInput'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxClientCard from '@components/_Core/Cards/GxClientCard'
import NewSaleUpdatePostalCode from '@components/Sales/NewSaleUpdatePostalCode'
import paymentTypes from '@assets/Catalogos/CAT_008_MEX_CFDI_Forma_de_pago.json'
import cfdisTypes from '@assets/Catalogos/CAT_013_MEX_CFDI_Uso_del_CFDI.json'
import {
  CLIENT_INFO_SHORT,
  COMPANY_INFO,
  LOCAL_SALE,
  HAS_CERTIFICATE,
  LOCAL_COMPANY,
} from '@src/apollo/queries'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'

export default {
  name: 'NewSaleWithClient',
  components: {
    GxDropdown,
    GxInput,
    GxCardModal,
    GxClientCard,
    GxLoader,
    NewSaleUpdatePostalCode,
  },
  apollo: {
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
    hasCertificate: {
      query: HAS_CERTIFICATE,
      variables() {
        return {
          companyNumber: this.company.number,
          clientId: this.$route.params.clientId,
        }
      },
      update(data) {
        return (
          data.myAccount.companies[0].company.companyDataLocalized.csd.length >
          0
        )
      },
      skip() {
        return !this.company
      },
    },
    company: LOCAL_COMPANY,
    sale: LOCAL_SALE,
    userInfo: {
      query: CLIENT_INFO_SHORT,
      variables() {
        return {
          companyNumber: this.company.number,
          clientId: this.$route.params.clientId,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.clients.list[0]
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      company: null,
      skipSalesPreference: false,
      paymentMethod: 'Pago en una sola exhibición-PUE',
      selectedPaymentType: 'Transferencia electrónica de fondos',
      errorDate: '',
      errorPaymentMethod: '',
      errorPaymentType: '',
      errorInvoiceSale: '',
      errorCurrency: '',
      hasCertificate: false,
      invoicedSale: false,
      saleDate: new Date().toISOString(), // Default sale date to today
      timeout: null,
      showDoItLater: false,
      hasFocus: false,
      savedDraftModal: false,
      draftSuccessImage: require('@assets/images/Signup/Alerts/mo_stepone.svg'),
      methodPayments: [
        {
          code: 'PUE',
          payment_method: 'Pago en una sola exhibición',
        },
        {
          code: 'PPD',
          payment_method: 'Pago en parcialidades o diferido',
        },
      ],
      paymentTypes: paymentTypes,
      cfdiTypes: cfdisTypes,
      currencies: ['MXN-Peso Mexicano'],
      selectedUsoCfdi: 'Gastos en general',
      currency: 'MXN-Peso Mexicano',
    }
  },
  computed: {
    /* eslint-disable  */
    paymentType() {
      if (this.selectedPaymentType && this.paymentTypes) {
        return this.paymentTypes.find(
          ({ payment_type }) => payment_type === this.selectedPaymentType
        )
      }
      /* eslint-enable */
      return null
    },
    hasPostalCode() {
      if (this.myAccount) {
        return !!this.myAccount.companies[0].company.fiscalAddress.postalCode
      }
      return true
    },
    hasTaxRegime() {
      if (this.myAccount) {
        return (
          !!this.myAccount.companies[0].company.companyDataLocalized
            .regimenFiscalCodigo ||
          !!this.myAccount.companies[0].company.companyDataLocalized
            .regimenFiscalNombre
        )
      }
      return true
    },
    usoCfdi() {
      if (this.selectedUsoCfdi && this.cfdiTypes) {
        const usoCfdi = this.cfdiTypes.find(
          ({ use }) => use === this.selectedUsoCfdi
        )
        return usoCfdi.code
      }
      return null
    },
    expectedPaymentForm() {
      if (this.paymentType && this.paymentTypes) {
        return {
          code: this.paymentType.code,
          paymentType: this.paymentType.payment_type,
          usesBank: JSON.parse(this.paymentType.uses_bank),
        }
      }
      return null
    },
    formComplete() {
      const {
        saleDate,
        paymentType,
        paymentMethod,
        usoCfdi,
        invoicedSale,
        expectedPaymentForm,
        currency,
      } = this
      if (invoicedSale) {
        return !!(
          saleDate &&
          paymentType &&
          expectedPaymentForm &&
          paymentMethod &&
          currency &&
          usoCfdi
        )
      }
      return !!(
        saleDate &&
        paymentType &&
        paymentMethod &&
        expectedPaymentForm &&
        currency
      )
    },
  },
  watch: {
    userInfo(newVal) {
      if (this.skipSalesPreference) return
      if (
        newVal.expectedPaymentMethodDescription &&
        newVal.expectedPaymentMethod
      ) {
        this.paymentMethod =
          newVal.expectedPaymentMethodDescription +
          '-' +
          newVal.expectedPaymentMethod
      }
      const clientUsoCfdi = this.cfdiTypes.find(
        ({ code }) => code === newVal.usoCfdi
      )
      this.selectedUsoCfdi = clientUsoCfdi
        ? clientUsoCfdi.use
        : 'Gastos en general'
    },
    hasCertificate(newVal) {
      if (newVal) {
        this.invoicedSale = true
      } else {
        this.invoicedSale = false
      }
    },
    saleDate(newVal) {
      this.errorDate = ''
    },
    paymentMethod(newVal) {
      if (newVal === 'Pago en parcialidades o diferido-PPD') {
        this.selectedPaymentType = 'Por definir'
      }
      this.errorPaymentMethod = ''
    },
    usoCfdi() {
      this.errorInvoiceSale = ''
    },
    paymentType() {
      this.errorPaymentType = ''
    },
    currency() {
      this.errorCurrency = ''
    },
  },
  async created() {
    this.setFormData()
  },
  beforeDestroy() {
    this.saveFormData()
  },
  methods: {
    saveFormData() {
      const {
        invoicedSale,
        paymentMethod,
        selectedPaymentType,
        saleDate,
        selectedUsoCfdi,
        currency,
      } = this
      localStorage.setItem(
        'newSale--saleInfo',
        JSON.stringify({
          invoicedSale,
          paymentMethod,
          selectedPaymentType,
          saleDate,
          selectedUsoCfdi,
          currency,
        })
      )
    },
    setFormData() {
      // newSale--saleInfoObject Object is the form data parsed in a way that is compatible with backend
      // newSale--saleInfo Object is the form data parsed in a way that is compatible with our components
      localStorage.removeItem('newSale--saleInfoObject')
      const formData = JSON.parse(localStorage.getItem('newSale--saleInfo'))
      if (formData) {
        this.skipSalesPreference = true
        Object.keys(formData).forEach((key) => {
          this[key] = formData[key]
        })
        localStorage.removeItem('newSale--saleInfo')
      } else {
        this.paymentMethod = 'Pago en una sola exhibición-PUE'
        this.selectedPaymentType = 'Transferencia electrónica de fondos'
        this.saleDate = new Date().toISOString()
        this.selectedUsoCfdi = 'Gastos en general'
        this.currency = 'MXN-Peso Mexicano'
      }
    },
    goBack() {
      this.showDoItLater = true
    },
    onModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.savedDraftModal = false
      this.showDoItLater = false
    },
    nextForm() {
      this.$router.replace({ name: 'newsaleconcept' })
    },
    goToDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
    validate() {
      if (this.formComplete) {
        this.onSubmit()
      } else {
        this.validateInputs()
      }
    },
    validateInputs() {
      if (!this.saleDate) {
        this.errorDate = 'Este campo es necesario'
      } else {
        this.erroDate = ''
      }
      if (!this.paymentType) {
        this.errorPaymentType = 'Este campo es necesario'
      } else {
        this.errorPaymentType = ''
      }
      if (!this.paymentMethod) {
        this.errorPaymentMethod = 'Este campo es necesario'
      } else {
        this.errorPaymentMethod = ''
      }
      if (this.invoicedSale && !this.usoCfdi) {
        this.errorInvoiceSale = 'Este campo es necesario'
      } else {
        this.errorInvoiceSale = ''
      }
      if (!this.currency) {
        this.errorCurrency = 'Este campo es necesario'
      } else {
        this.errorCurrency = ''
      }
    },
    async onSubmit() {
      try {
        const {
          saleDate,
          expectedPaymentForm,
          paymentMethod,
          usoCfdi,
          invoicedSale,
          currency,
        } = this
        const clientId = this.$route.params.clientId
        const [
          expectedPaymentMethodDescription,
          expectedPaymentMethod,
        ] = paymentMethod.split('-')
        /* eslint-disable  */
        let saleAdditionalDataLocalizedInput_MEX
        if (invoicedSale) {
          saleAdditionalDataLocalizedInput_MEX = this.cfdiTypes.find(
            ({ code }) => code === usoCfdi
          )
          saleAdditionalDataLocalizedInput_MEX = {
            ...saleAdditionalDataLocalizedInput_MEX,
            usoCfdi: saleAdditionalDataLocalizedInput_MEX.code,
          }
        } else {
          saleAdditionalDataLocalizedInput_MEX = {
            usoCfdi: null,
            code: null,
            use: null,
            valid_for_company: null,
            valid_for_person: null,
          }
        }
        localStorage.setItem(
          'newSale--saleInfoObject',
          JSON.stringify({
            date: saleDate,
            expectedPaymentForm,
            saleAdditionalDataLocalizedInput_MEX,
            invoicedSale,
            currency,
            clientId,
            expectedPaymentMethod,
            expectedPaymentMethodDescription,
          })
        )
        this.$router.push({ name: 'saleconcept' })
      } catch (error) {
        /* eslint-disable  */
        console.log(error)
        /* eslint-enable */
      }
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col w-screen pb-14  de:w-full de:mb-4">
    <div
      v-if="
        userInfo && methodPayments && paymentTypes && currencies && cfdiTypes
      "
      class="de:mx-auto de:shadow-3 de:rounded-lg de:w-108"
    >
      <section>
        <h1
          class="text-gray-400 gx-caption uppercase font-bold pb-2 de:pb-0 p-4 de:p-8"
          >Cliente</h1
        >
        <GxClientCard
          :commercial-name="userInfo.commercialName"
          :tax-id="userInfo.taxId"
          class="de:px-8 clientCard"
          :avatar-url="userInfo.avatarURL"
          :recient-activity-status="userInfo.lastActivityStatus"
        />
      </section>
      <section class="flex flex-col">
        <p
          class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
          :class="{ gxHeaders: $mq === 'de' }"
          >Detalle</p
        >
        <div class="flex justify-between items-center p-4 de:p-8 de:py-4">
          <label for="invoiceSwitch">Venta Facturada</label>
          <!-- <GxSwitch
            id="invoiceSwitch"
            v-model="invoicedSale"
            :disabled="!hasCertificate"
          /> -->
        </div>

        <form
          class="flex-grow flex flex-col de:p-4 de:pt-0 de:pb-6"
          @submit.prevent="validate"
        >
          <GxInput
            v-model="saleDate"
            class="pb-2"
            pattern="date"
            placeholder="Fecha de venta*"
            label="Fecha de venta*"
            icon="calendar_today"
            :error="errorDate"
          />
          <GxDropdown
            v-if="methodPayments"
            v-model="paymentMethod"
            :options="
              methodPayments.map(
                (payment) => payment.payment_method + '-' + payment.code
              )
            "
            placeholder="Selecciona uno"
            label="Método de pago*"
            watch-value
            :error="errorPaymentMethod"
            :allow-empty="false"
            @focus="hasFocus = true"
          />
          <GxDropdown
            v-if="paymentTypes"
            v-model="selectedPaymentType"
            :options="paymentTypes.map(({ payment_type }) => payment_type)"
            placeholder="Selecciona uno"
            label="Forma de pago*"
            watch-value
            :error="errorPaymentType"
            :allow-empty="false"
          />
          <GxDropdown
            v-if="currencies"
            v-model="currency"
            :options="currencies"
            label="Moneda*"
            placeholder="Selecciona uno"
            :error="errorCurrency"
            :allow-empty="false"
          />
          <!-- :initialObject="{"code":"MXN","currency":"Peso Mexicano","decimals":2}" -->
          <transition name="fade">
            <GxDropdown
              v-if="invoicedSale"
              v-model="selectedUsoCfdi"
              :options="cfdiTypes.map(({ use }) => use)"
              placeholder="Selecciona uno"
              watch-value
              label="Uso de CFDI*"
              :error="errorInvoiceSale"
              :allow-empty="false"
            />
          </transition>
          <GxButton class="self-end mt-2 mx-4" type="submit"
            >siguiente</GxButton
          >
        </form>
      </section>
      <NewSaleUpdatePostalCode v-if="!hasPostalCode || !hasTaxRegime" />
    </div>
    <GxLoader v-else />
    <GxCardModal
      v-if="showDoItLater"
      headline="¿Seguro que quieres salir?"
      text-body="Puedes guardar esta información como borrador y continuar más tarde."
      :card-img="alertImg"
      alt="alertAlt"
    >
      <template v-slot:actions>
        <div class="flex self-end">
          <GxButton
            :ghost="$mq === 'de'"
            :plain="$mq === 'mo'"
            class="text-alert de:text-white de:border mr-4"
            @click="goToDashboard"
            >salir</GxButton
          >

          <!-- <GxButton
            :dark="$mq === 'de'"
            :plain="$mq === 'mo'"
            @click="createDraft"
            >crear borrador</GxButton
          > -->
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="savedDraftModal"
      headline="Borrador guardado"
      :card-img="$utils.alertImages.Done"
      alt="Borrador Guardado"
      @close="!savedDraftModal"
    >
    </GxCardModal>
  </div>
</template>
<style lang="scss" scoped>
.gxHeaders {
  line-height: 0.75rem;
}
.clientCard:hover {
  background-color: white;
}
</style>

<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import NewConceptTaxesForm from '@components/Sales/NewConceptTaxesForm'
import GxLoader from '@components/_Core/Utils/GxLoader'
import { LOCAL_COMPANY, FREQUENT_CONCEPT_BY_ID } from '@src/apollo/queries'
import {
  CREATE_FREQUENT_CONCEPT,
  UPDATE_FREQUENT_ITEM,
} from '@src/apollo/mutations'
import ClaveSatAutoComplete from '@components/Sales/ClaveSatAutoComplete'
import UnitMeasureAutocomplete from '@components/Sales/UnitMeasureAutocomplete'
import currencies from '@src/assets/Catalogos/CAT_010_MEX_Moneda.json'
import Big from 'big.js'

const formmattedCurrencies = currencies
  // .filter(({ code }) => code === 'MXN' || code === 'USD' || code === 'EUR')
  .filter(({ code }) => code === 'MXN')
  .map(({ code, currency }) => `${code}-${currency}`)

const taxes = require('@assets/Catalogos/CAT_017_MEX_es_impuestos.json')

export default {
  name: 'NewFrequentConcept',
  components: {
    GxInput,
    GxDropdown,
    GxCardModal,
    GxLoader,
    ClaveSatAutoComplete,
    UnitMeasureAutocomplete,
    NewConceptTaxesForm,
  },
  props: {
    updateConcept: {
      type: Boolean,
      default: false,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    concept: {
      query: FREQUENT_CONCEPT_BY_ID,
      variables() {
        return {
          companyNumber: this.company.number,
          id: this.$route.params.id,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.frequentItems.list[0]
      },
      skip() {
        return this.skipConcept
      },
    },
  },
  data() {
    return {
      concept: null,
      company: null,
      name: '',
      description: '',
      key: '',
      currencies: Object.freeze(formmattedCurrencies),
      currency: 'MXN-Peso Mexicano',
      country: '',
      selectedClaveSat: {},
      selectedUnitMeasure: {},
      unitBasePrice: '0.00',
      transferredTaxes: [],
      selectedTransferredTaxes: [],
      selectedWithheldTaxes: [],
      withheldTaxes: [],
      savedConceptModal: false,
      updatedConcept: false,
      loading: false,
      timeout: null,
      errorName: null,
      errorKey: null,
      errorKeySat: null,
      errorUnitBasePrice: null,
      errorUnitMeasure: null,
      errorTransferredPercentage: null,
      errorCurrency: null,
      error: null,
      errorMsg: null,
    }
  },
  computed: {
    queryParams() {
      return {
        ...this.$route.query,
        documentItemId: this.$route.params.id,
        from: this.$route.name,
      }
    },
    frequentItemCreateInput() {
      const { key, name, unitBasePrice, currencySymbol } = this
      const itemAdditionalDataLocalized = {
        claveProductoServicioSAT: this.selectedClaveSat.c,
        descripcionProductoServicioSAT: this.selectedClaveSat.d,
        claveUnidadMedidaSAT: this.selectedUnitMeasure.code,
        descripcionUnidadMedidaSAT: this.selectedUnitMeasure.unit,
      }
      const transferredTaxesPerUnit = this.selectedTransferredTaxes.map(
        this.transferredTaxesPerUnitInsertInput
      )
      const withheldTaxesPerUnit = this.selectedWithheldTaxes.map(
        this.withheldTaxesPerUnitInsertInput
      )
      return {
        description: name,
        key,
        unitBasePrice: unitBasePrice,
        currency: currencySymbol,
        itemAdditionalDataLocalized,
        transferredTaxesPerUnit,
        withheldTaxesPerUnit,
      }
    },
    formComplete() {
      const {
        name,
        key,
        selectedClaveSat,
        selectedUnitMeasure,
        unitBasePrice,
        currency,
        errorKey,
        errorName,
      } = this
      return !!(
        name &&
        key &&
        selectedClaveSat.d &&
        selectedUnitMeasure.unit &&
        unitBasePrice &&
        currency &&
        !errorKey &&
        !errorName
      )
    },
    formEmpty() {
      const {
        name,
        key,
        selectedClaveSat,
        selectedUnitMeasure,
        unitBasePrice,
        currency,
        selectedTransferredTaxes,
        selectedWithheldTaxes,
      } = this
      return !!(
        !name &&
        !key &&
        !selectedClaveSat.description &&
        !selectedUnitMeasure.unit &&
        !unitBasePrice &&
        !currency &&
        !selectedTransferredTaxes.length &&
        !selectedWithheldTaxes.length
      )
    },
    currencySymbol() {
      if (this.currency) {
        const [symbol] = this.currency.split('-')
        return symbol
      }
      return 'MXN'
    },
    skipConcept() {
      if (this.company && this.updateConcept) {
        return false
      }
      return true
    },
  },
  watch: {
    concept(conceptToUpdate) {
      this.parseFrequentItem(conceptToUpdate)
      // fill form with local storage info
      this.fillForm()
    },
    formComplete(newVal) {
      if (newVal) {
        this.errorMsg = null
      }
    },
    name(newVal) {
      this.errorName =
        newVal.length > 1000
          ? 'Nombre de concepto debe tener máximo 1000 caracteres'
          : ''
    },
    key(newVal) {
      this.errorKey =
        newVal.length > 200
          ? 'La clave de concepto debe tener máximo 200 caracteres'
          : ''
    },
    selectedClaveSat() {
      this.errorKeySat = ''
    },
    selectedUnitMeasure() {
      this.errorUnitMeasure = ''
    },
    unitBasePrice() {
      this.errorUnitBasePrice = ''
    },
    currency() {
      this.errorCurrency = ''
    },
    frequentItemCreateInput() {
      this.errorMsg = ''
    },
  },
  async created() {
    this.transferredTaxes = taxes.filter(
      ({ taxType }) => taxType === 'transferred'
    )
    this.withheldTaxes = taxes.filter(({ taxType }) => taxType === 'withheld')
    // Usear is creating a concept.
    // If the user is updating a concept fillForm will be invoke
    // after graphql response on concept watcher
    if (!this.updateConcept) {
      this.fillForm()
    }
  },
  methods: {
    saveFormState() {
      const {
        name,
        key,
        selectedClaveSat,
        unitBasePrice,
        selectedUnitMeasure,
        currency,
        selectedTransferredTaxes,
        selectedWithheldTaxes,
        concept,
      } = this
      localStorage.setItem(
        'gx-nf-concept',
        JSON.stringify({
          name,
          key,
          selectedClaveSat,
          unitBasePrice,
          selectedUnitMeasure,
          currency,
          selectedTransferredTaxes,
          selectedWithheldTaxes,
          concept,
        })
      )
    },
    fillForm() {
      const data = JSON.parse(localStorage.getItem('gx-nf-concept'))
      const selectedSatKey = JSON.parse(localStorage.getItem('selectedSatKey'))
      const selectedUnitMeasure = JSON.parse(
        localStorage.getItem('selectedUnitMeasure')
      )
      if (data) {
        Object.keys(data).forEach((key) => {
          // concept is where back response is stored
          if (key !== 'concept') {
            this[key] = data[key]
          }
        })
        localStorage.removeItem('gx-nf-concept')
      }
      if (selectedSatKey) {
        this.selectedClaveSat = {
          c: selectedSatKey.c,
          d: selectedSatKey.d,
          customLabel: `${selectedSatKey.c} - ${selectedSatKey.d}`,
        }
        localStorage.removeItem('selectedSatKey')
      }
      if (selectedUnitMeasure) {
        this.selectedUnitMeasure = {
          code: selectedUnitMeasure.item.code,
          unit: selectedUnitMeasure.item.unit,
          customLabel: `${selectedUnitMeasure.item.code} - ${
            selectedUnitMeasure.item.unit
          }`,
        }
        localStorage.removeItem('selectedUnitMeasure')
      }
    },
    parseFrequentItem(concept) {
      this.key = concept.key
      this.name = concept.description
      this.selectedClaveSat = this.parseClaveSat(
        concept.itemAdditionalDataLocalized.claveProductoServicioSAT,
        concept.itemAdditionalDataLocalized.descripcionProductoServicioSAT
      )
      this.selectedUnitMeasure = this.parseUnitMeasure(
        concept.itemAdditionalDataLocalized.claveUnidadMedidaSAT,
        concept.itemAdditionalDataLocalized.descripcionUnidadMedidaSAT
      )
      this.currency = this.parseCurrencyCode(concept.currency)
      this.selectedTransferredTaxes = concept.transferredTaxesPerUnit.map(
        this.parseTaxes
      )
      this.selectedWithheldTaxes = concept.withheldTaxesPerUnit.map(
        this.parseTaxes
      )
      const unitBasePrice = Big(concept.unitBasePrice).valueOf()
      const decimals = unitBasePrice.split('.')[1]
      if (decimals && decimals.length > 1) {
        this.unitBasePrice = unitBasePrice
      } else {
        // No dcimals 9 => 9.00
        this.unitBasePrice = Big(unitBasePrice)
          .toFixed(2)
          .valueOf()
      }
    },
    parseTaxes(taxes) {
      return {
        amount: taxes.amount,
        taxName: taxes.name,
        rate: Big(taxes.rate).valueOf(),
      }
    },
    parseUnitMeasure(code, description) {
      return {
        unit: description,
        code,
        // Enconctre que habia unidades de medida con un espacio al inicio de la descripcion
        // en el json, y se lo quito pero puede que se hayan creado conceptos con esas unidades de medida
        customLabel: `${code} - ${description.trim()}`,
      }
    },
    parseClaveSat(code, description) {
      return {
        d: description,
        c: code,
        customLabel: `${code} - ${description}`,
      }
    },
    transferredTaxesPerUnitInsertInput(selectedTaxes) {
      return {
        code: this.transferredTaxes.find(
          (t) => t.taxName === selectedTaxes.taxName
        ).code,
        name: selectedTaxes.taxName,
        rate: selectedTaxes.rate,
        amount: selectedTaxes.amount,
      }
    },
    withheldTaxesPerUnitInsertInput(selectedTaxes) {
      return {
        code: this.withheldTaxes.find(
          (t) => t.taxName === selectedTaxes.taxName
        ).code,
        name: selectedTaxes.taxName,
        rate: selectedTaxes.rate,
        amount: selectedTaxes.amount,
      }
    },
    parseCurrencyCode(code) {
      if (code === 'MXN') {
        return 'MXN-Peso Mexicano'
      }
      if (code === 'EUR') {
        return 'EUR-Euro'
      }
      if (code === 'USD') {
        return 'USD-Dolar americano'
      }
      return code
    },
    onModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.updateConcept) {
        this.updatedConcept = false
        this.$router.replace({
          name: 'conceptdetail',
          params: { id: this.$route.params.id },
          query: { ...this.$route.query },
        })
      } else {
        this.savedConceptModal = false
        this.$router.replace({
          name: 'choosefrequentconcept',
          query: { ...this.$route.query },
        })
      }
    },
    onErrorModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.error = false
    },
    validateInputs() {
      if (!this.name) {
        this.errorName = 'Este campo es necesario'
      } else {
        this.errorName =
          this.name.length > 1000
            ? 'Nombre de concepto debe tener máximo 1000 caracteres'
            : ''
      }
      if (!this.key) {
        this.errorKey = 'Este campo es necesario'
      } else {
        this.errorKey =
          this.key.length > 100
            ? 'La clave de concepto debe tener máximo 100 caracteres'
            : ''
      }
      if (!this.selectedClaveSat.d) {
        this.errorKeySat = 'Este campo es necesario'
      } else {
        this.errorKeySat = ''
      }
      if (!this.unitBasePrice) {
        this.errorUnitBasePrice = 'Este campo es necesario'
      } else {
        this.errorUnitBasePrice = ''
      }
      if (!this.selectedUnitMeasure.unit) {
        this.errorUnitMeasure = 'Este campo es necesario'
      } else {
        this.errorUnitMeasure = ''
      }
      if (!this.currency) {
        this.errorCurrency = 'Este campo es necesario'
      } else {
        this.errorCurrency = ''
      }
    },
    isValid() {
      this.validateInputs()
      const areChildrenValid =
        this.$refs.newConceptTaxesForm.isValid() &&
        this.$refs.selectedWithheldTaxes.isValid() &&
        this.$refs.ClaveSatAutoComplete.isValid() &&
        this.$refs.UnitMeasureAutocomplete.isValid()
      return areChildrenValid && this.formComplete
    },
    validate() {
      if (this.formEmpty) {
        this.errorMsg = 'Faltan datos obligatorios'
        return
      }
      if (this.isValid()) {
        this.onSave()
      } else {
        this.$nextTick(() => {
          const element = document.querySelector('.js-error-anchor')
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        })
      }
    },
    createConcept(branchNumber, companyNumber, data) {
      return this.$apollo.mutate({
        mutation: CREATE_FREQUENT_CONCEPT,
        variables: {
          branchNumber,
          companyNumber,
          data,
        },
      })
    },
    frequentItemUpdate(branchNumber, companyNumber, documentItemId, data) {
      return this.$apollo.mutate({
        mutation: UPDATE_FREQUENT_ITEM,
        variables: {
          branchNumber,
          companyNumber,
          documentItemId,
          data,
        },
      })
    },
    async onSave() {
      try {
        this.loading = true
        const branchNumber = this.company.branchNumber
        const companyNumber = this.company.number
        const data = this.frequentItemCreateInput
        if (this.updateConcept) {
          const documentItemId = this.$route.params.id
          await this.frequentItemUpdate(
            branchNumber,
            companyNumber,
            documentItemId,
            data
          )
          this.updatedConcept = true
          this.timeout = setTimeout(() => {
            this.onModalClose()
          }, 3000)
        } else {
          await this.createConcept(branchNumber, companyNumber, data)
          this.savedConceptModal = true
          this.timeout = setTimeout(() => {
            this.savedConceptModal = false
            this.$router.replace({
              name: 'choosefrequentconcept',
              query: { ...this.$route.query },
            })
          }, 3000)
        }
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
  <div
    v-if="$apollo.queries.concept.loading"
    class="flex flex-grow flex-col justify-center items-center"
  >
    <GxLoader />
  </div>
  <div
    v-else
    class="flex-grow mt-4 flex flex-col de:items-center w-screen de:w-full  de:mb-4"
  >
    <div class="de:shadow-3  de:w-108 de:rounded-lg flex flex-col">
      <form
        class="w-full  de:pt-0 de:pb-6 flex flex-col"
        @submit.prevent="validate"
      >
        <div class="px-0  de:pt-8 flex  flex-col">
          <GxInput
            v-model="name"
            placeholder="Concepto*"
            label="Concepto*"
            class="de:px-4"
            :watch-value="updateConcept"
            :error="errorName"
          />
          <GxInput
            v-model="key"
            placeholder="Clave*"
            class="mt-2 de:px-4"
            label="Clave*"
            :watch-value="updateConcept"
            :error="errorKey"
          />
          <div class="px-4 de:px-8 mb-2 mt-4">
            <ClaveSatAutoComplete
              ref="ClaveSatAutoComplete"
              v-model="selectedClaveSat"
              :on-go-to-list="saveFormState"
              :query-params="queryParams"
              :error="errorKeySat"
            />
          </div>
          <div class="px-4 de:px-8 mb-2 mt-4">
            <UnitMeasureAutocomplete
              ref="UnitMeasureAutocomplete"
              v-model="selectedUnitMeasure"
              :on-go-to-list="saveFormState"
              :query-params="queryParams"
              :error="errorUnitMeasure"
            />
          </div>
          <div class="px-4 de:px-8 mb-2 mt-4">
            <GxTextFieldMoney
              v-model="unitBasePrice"
              :currency="currencySymbol"
              label="Precio unitario*"
            />
          </div>
          <div class="de:px-4">
            <GxDropdown
              v-model="currency"
              label="Moneda*"
              is-text-gray
              class="mt-2"
              :watch-value="updateConcept"
              placeholder=""
              :options="currencies"
              :error="errorCurrency"
            />
          </div>
        </div>
        <span
          class="text-gray-500 bg-gray-100 gx-caption de:gx-caption mt-6 font-bold uppercase py-2 p-4 de:px-8"
          >impuestos</span
        >
        <div class="de:px-8 px-4 pt-4">
          <NewConceptTaxesForm
            ref="newConceptTaxesForm"
            v-model="selectedTransferredTaxes"
            :total="unitBasePrice ? unitBasePrice : '0'"
            select-label="Impuestos trasladados"
            taxes-type="transferred"
            data-testid="Impuestos trasladados"
            :taxes="transferredTaxes.map((tax) => tax.taxName)"
          />
          <!-- impuesto retenido -->
          <NewConceptTaxesForm
            ref="selectedWithheldTaxes"
            v-model="selectedWithheldTaxes"
            :total="unitBasePrice ? unitBasePrice : '0'"
            select-label="Impuestos retenidos"
            data-testid="Impuestos retenidos"
            taxes-type="withheld"
            :taxes="withheldTaxes.map((tax) => tax.taxName)"
          />
        </div>
        <div class="my-8">
          <p
            v-if="errorMsg"
            class="text-alert  text-right ml-auto my-2 de:px-8 px-4"
            >{{ errorMsg }}</p
          >
          <GxButton
            v-if="$mq === 'de' || ($mq === 'mo' && !updateConcept)"
            class="ml-auto mr-4  de:mb-0"
            :loading="loading"
            type="submit"
            >guardar</GxButton
          >
        </div>
      </form>
      <GxCardModal
        v-if="savedConceptModal"
        headline="Concepto creado"
        :card-img="$utils.alertImages.Success"
        alt="Concepto creado"
        @close="onModalClose"
      />
      <GxCardModal
        v-if="updatedConcept"
        headline="Concepto guardado"
        :card-img="$utils.alertImages.Done"
        alt="Concepto creado"
        @close="onModalClose"
      />
      <GxCardModal
        v-if="error"
        :headline="error"
        :card-img="$utils.alertImages.Khaaa"
        :alt="error"
        @close="onErrorModalClose"
      />
    </div>
    <GxFab
      v-if="$mq === 'mo' && updateConcept"
      mini
      :loading="loading"
      icon="save"
      class="shadow-2 fixed gxFixedFab"
      label="crear nuevo concepto"
      @click="validate"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
</style>

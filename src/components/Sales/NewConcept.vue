<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxCheckbox from '@components/_Core/Forms/GxCheckbox.vue'
import GxTextArea from '@components/_Core/Forms/GxTextArea'
import GxInputPercentage from '@components/_Core/Forms/GxInputPercentage'
import GxInputMoney from '@components/_Core/Forms/GxInputMoney'
import GxSwitch from '@components/_Core/Forms/GxSwitch'
import NewConceptTaxesForm from '@components/Sales/NewConceptTaxesForm'
import Big from 'big.js'
import FrecuentConceptsAutocomplete from '@components/Sales/FrecuentConceptsAutocomplete'
import ClaveSatAutoComplete from '@components/Sales/ClaveSatAutoComplete'
import UnitMeasureAutocomplete from '@components/Sales/UnitMeasureAutocomplete'

export default {
  name: 'NewConcept',
  components: {
    GxInput,
    GxCheckbox,
    GxTextArea,
    GxInputPercentage,
    GxInputMoney,
    GxSwitch,
    NewConceptTaxesForm,
    FrecuentConceptsAutocomplete,
    ClaveSatAutoComplete,
    UnitMeasureAutocomplete,
  },
  props: {
    itemLocalId: {
      type: Number,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      sale: null,
      transferredTaxes: [],
      withheldTaxes: [],
      selectedTransferredTaxes: [],
      selectedWithheldTaxes: [],
      selectedConcept: {},
      showTextarea: false,
      additionalNotes: '',
      key: '',
      selectedClaveSat: {},
      quantity: '',
      selectedUnitMeasure: {},
      unitBasePrice: '0.00',
      hasMoneyDiscountFocus: false,
      hasDiscount: false,
      discountPercentage: '',
      discountAmount: '',
      invoicedSale: false,
      errorNameConcept: null,
      errorKey: null,
      errorKeySAT: null,
      errorQuantity: null,
      errorPrice: null,
      errorUnitMeasure: null,
      errorTransferredTaxes: null,
      errorHeldTaxes: null,
      errorModal: null,
      errorModalTimeOut: null,
      formCompleteEmitted: false,
      errorHeldPercentage: false,
      errorHeldMoney: false,
      errorTransferredPercentage: false,
      errorTransferredMoney: false,
      errorAmountDiscount: false,
      errorPercentageDiscount: false,
    }
  },
  computed: {
    saleItemInput() {
      const unitPriceWithDiscounts = this.unitPriceWithDiscounts
      const transferredTaxesPerUnit = this.transferredTaxesPerUnit
      const transferredTotalPerUnit = this.transferredTotalPerUnit
      const withheldTaxesPerUnit = this.withheldTaxesPerUnit
      const withheldTotalPerUnit = this.withheldTotalPerUnit
      const conceptTotalTransferred = this.transferredMoneyTotal
      const conceptTotalWithheld = this.withheldMoneyTotal
      const selectedTransferredTaxes = this.selectedTransferredTaxes
      const selectedWithheldTaxes = this.selectedWithheldTaxes
      const unitTotalPrice = Big(unitPriceWithDiscounts)
        .plus(transferredTotalPerUnit)
        .minus(withheldTotalPerUnit)
        .round(6)
        .valueOf()
      // Dont  use unitTotalPrice * quantity  so  you will lost decimals
      // Using big.js to get subtotalAmount here
      const subtotalAmount = this.conceptPriceWithDiscount

      let totalAmount = Big(this.conceptPriceWithDiscount)
        .plus(this.transferredMoneyTotal)
        .minus(this.withheldMoneyTotal)
        .round(6)
        .valueOf()
      const additionalNotes = this.additionalNotes
      // const discountPercentageToSixDecimals = this.unit // We're rounding down to 2 from the inputs, but we need to send back all 6 decimals
      const saleItemInput = {
        localId: this.itemLocalId,
        conceptTotalTransferred,
        conceptTotalWithheld,
        selectedWithheldTaxes,
        selectedTransferredTaxes,
        additionalNotes,
        itemReferenceId: this.selectedConcept.itemReferenceId,
        position: this.index,
        description: this.selectedConcept.description,
        key: this.key,
        itemAdditionalDataLocalizedInput_MEX: {
          claveProductoServicioSAT: this.selectedClaveSat.c || '',
          claveProductoServicioSATDescripcion: this.selectedClaveSat.d || '',
          claveUnidadMedidaSAT: this.selectedUnitMeasure.code || '',
          claveUnidadMedidaSATDescripcion: this.selectedUnitMeasure.unit || '',
        },
        quantity: this.quantity,
        unit: this.selectedUnitMeasure.unit || '',
        unitBasePrice: this.unitBasePrice,
        currency: this.currency,
        discountPercentage: this.discountPercentage,
        calculatedDiscountPercentage: this.calculatedDiscountPercentage,
        discountAmount: this.discountAmount,
        discountDescription: '',
        unitPriceWithDiscounts,
        withheldTaxesPerUnit,
        transferredTaxesPerUnit,
        unitTotalPrice,
        subtotalAmount,
        hasDiscount: this.hasDiscount,
        totalAmount,
      }
      return saleItemInput
    },
    isFormEmpty() {
      return (
        !this.description &&
        !this.key &&
        !this.itemAdditionalDataLocalizedInput_MEX &&
        !this.quantity &&
        !this.unit &&
        !this.unitBasePrice
      )
    },
    formattedTotalAfterTaxes() {
      const totalRounded = Big(this.totalAfterTaxes)
        .round(2)
        .valueOf()
      return totalRounded
        .replace(/^\d+$/, '$&.00')
        .replace(/\.\d$/, '$&0')
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    currencySymbol() {
      if (this.sale && this.sale.currency) {
        const [symbol] = this.sale.currency.split('-')
        return symbol
      }
      return 'MXN'
    },
    formComplete() {
      const {
        key,
        quantity,
        unitBasePrice,
        total,
        errorAmountDiscount,
        errorPercentageDiscount,
      } = this
      return (
        !!(key && quantity && unitBasePrice && total) &&
        !errorAmountDiscount &&
        !errorPercentageDiscount
      )
    },
    total() {
      const quantity = this.quantity || '0'
      const unitPrice = this.unitBasePrice || '0'
      return new Big(unitPrice).times(quantity).valueOf()
    },
    conceptPriceWithDiscount() {
      if (this.hasDiscount) {
        const total = this.total || '0'
        const discountAmount = this.discountAmount || '0'
        return Big(total)
          .minus(discountAmount)
          .round(6)
          .valueOf()
      }
      return Big(this.total || '0')
        .round(6)
        .valueOf()
    },
    calculatedDiscountPercentage() {
      if (
        !this.quantity ||
        Big(this.quantity).eq('0') ||
        !this.unitBasePrice ||
        Big(this.unitBasePrice).eq('0')
      )
        return '0'
      return Big(this.discountAmount || '0')
        .div(
          Big(this.quantity)
            .times(this.unitBasePrice)
            .valueOf()
        )
        .times(100)
        .round(6)
        .valueOf()
    },
    unitPriceWithDiscounts() {
      if (
        !this.quantity ||
        this.quantity === '0' ||
        !this.unitBasePrice ||
        this.unitBasePrice === '0'
      )
        return '0'
      return Big(this.unitBasePrice)
        .minus(
          Big(Big(this.calculatedDiscountPercentage).div(100)).times(
            this.unitBasePrice
          )
        )
        .round(6)
        .valueOf()
    },
    transferredTaxesPerUnit() {
      return this.selectedTransferredTaxes.map((tax) => {
        if (tax.rate) {
          return {
            rate: String(tax.rate),
            amount: Big(tax.rate)
              .times(this.unitBasePrice || '0')
              .div(100)
              .round(6)
              .valueOf(),
            taxName: tax.taxName,
            code: tax.taxName,
          }
        }
        return {
          rate: '',
          amount: '',
          taxName: tax.taxName,
          code: tax.taxName,
        }
      })
    },
    transferredTotalPerUnit() {
      return this.transferredTaxesPerUnit.length
        ? this.transferredTaxesPerUnit.reduce((total, { rate }) => {
            if (rate) {
              return Big(rate)
                .times(this.unitPriceWithDiscounts)
                .div(100)
                .round(6)
                .plus(total)
                .valueOf()
            }
            return total
          }, '0')
        : '0'
    },
    withheldTaxesPerUnit() {
      return this.selectedWithheldTaxes.map((tax) => {
        if (tax.rate) {
          return {
            rate: String(tax.rate),
            amount: Big(tax.rate)
              .times(this.unitBasePrice || '0')
              .div(100)
              .round(6)
              .valueOf(),
            taxName: tax.taxName,
            code: tax.taxName,
          }
        }
        return {
          rate: '',
          amount: '',
          taxName: tax.taxName,
          code: tax.taxName,
        }
      })
    },
    withheldTotalPerUnit() {
      return this.withheldTaxesPerUnit.length
        ? this.withheldTaxesPerUnit.reduce((total, { rate }) => {
            if (rate) {
              return Big(rate)
                .times(this.unitPriceWithDiscounts)
                .div(100)
                .round(6)
                .plus(total)
                .valueOf()
            }
            return total
          }, '0')
        : '0'
    },
    withheldMoneyTotal() {
      if (this.selectedWithheldTaxes.length) {
        let result = this.selectedWithheldTaxes.reduce(
          (total, { amount, rate }) => {
            // When first selecting taxes, the value can be empty until user enters something
            if (!amount) {
              return Big(total)
                .round(6)
                .valueOf()
            }
            return Big(total)
              .plus(amount)
              .round(6)
              .valueOf()
          },
          '0'
        )
        return Big(result)
          .round(6)
          .valueOf()
      }
      return '0'
    },
    transferredMoneyTotal() {
      if (this.selectedTransferredTaxes.length) {
        let result = this.selectedTransferredTaxes.reduce(
          (total, { amount, rate }) => {
            // When first selecting taxes, the value can be empty until user enters something
            if (!amount) {
              return Big(total)
                .round(6)
                .valueOf()
            }
            return Big(total)
              .plus(amount)
              .round(6)
              .valueOf()
          },
          '0'
        )
        return Big(result)
          .round(6)
          .valueOf()
      }
      return '0'
    },
    totalAfterTaxes() {
      if (this.conceptPriceWithDiscount) {
        const withheld = Big(this.withheldMoneyTotal).valueOf()
        const transferred = Big(this.transferredMoneyTotal).valueOf()
        return Big(this.conceptPriceWithDiscount)
          .plus(transferred)
          .minus(withheld)
          .valueOf()
      }
      return '0'
    },
  },
  watch: {
    item: {
      handler(newValue, oldValue) {
        if (
          !newValue ||
          !newValue.localId ||
          this.deepEqual(newValue, this.saleItemInput)
        ) {
          return
        }
        const keys = Object.keys(newValue)
        // keys.length > 1 means the item has been previously created
        if (keys.length > 1) {
          this.fillForm(newValue)
        }
      },
      immediate: true,
    },

    selectedConcept(newValue, oldValue) {
      const isEmpty = (obj) => Object.keys(obj).length === 0
      const isCustomConcept = (concept) => concept.itemReferenceId === ''
      const isFrecuentConcept = (concept) => !isCustomConcept(concept)
      let overWriteValues = false
      if (isEmpty(newValue)) return
      if (
        (isFrecuentConcept(newValue) &&
          isFrecuentConcept(oldValue) &&
          newValue.itemReferenceId !== oldValue.itemReferenceId) ||
        (isFrecuentConcept(newValue) && isCustomConcept(oldValue))
      ) {
        overWriteValues = true
      } else if (
        (isCustomConcept(newValue) && isFrecuentConcept(oldValue)) ||
        (isCustomConcept(newValue) && isCustomConcept(oldValue))
      ) {
        overWriteValues = false
      } else if (
        isEmpty(this.selectedClaveSat) ||
        isEmpty(this.selectedUnitMeasure)
      ) {
        overWriteValues = true
      }
      let selectedClaveSat = {}
      let selectedUnitMeasure = {}
      const c =
        newValue.itemAdditionalDataLocalizedInput_MEX.claveProductoServicioSAT
      const d =
        newValue.itemAdditionalDataLocalizedInput_MEX
          .descripcionProductoServicioSAT
      if (c && d) {
        selectedClaveSat = {
          c,
          d,
          customLabel: `${c} - ${d}`,
        }
      }
      const unit =
        newValue.itemAdditionalDataLocalizedInput_MEX.descripcionUnidadMedidaSAT
      const code =
        newValue.itemAdditionalDataLocalizedInput_MEX.claveUnidadMedidaSAT
      if (code && unit) {
        selectedUnitMeasure = {
          unit,
          code,
          // Enconctre que habia unidades de medida con un espacio al inicio de la descipcion
          // en el json, y se lo quito pero puede que se haya creado conceptos con esas unidades de memida
          customLabel: `${code} - ${unit.trim()}`,
        }
      }
      const valuesToUpdate = {
        unitBasePrice: this.unitBasePrice,
        currency: this.currency,
        selectedWithheldTaxes: this.selectedWithheldTaxes,
        selectedTransferredTaxes: this.selectedTransferredTaxes,
        selectedClaveSat: this.selectedClaveSat,
        selectedUnitMeasure: this.selectedUnitMeasure,
        key: this.key,
      }
      const selectedConceptValues = {
        unitBasePrice: newValue.unitBasePrice,
        currency: newValue.currency,
        selectedWithheldTaxes: newValue.withheldTaxesPerUnit,
        selectedTransferredTaxes: newValue.transferredTaxesPerUnit,
        selectedClaveSat,
        selectedUnitMeasure,
        key: newValue.key,
      }
      const result = overWriteValues
        ? selectedConceptValues
        : { ...selectedConceptValues, ...valuesToUpdate }
      this.unitBasePrice = result.unitBasePrice
      this.currency = result.currency
      this.key = result.key
      this.selectedClaveSat = result.selectedClaveSat
      this.selectedUnitMeasure = result.selectedUnitMeasure
      this.selectedTransferredTaxes = result.selectedTransferredTaxes
      this.selectedWithheldTaxes = result.selectedWithheldTaxes
    },
    key() {
      this.errorKey = ''
    },
    selectedClaveSat() {
      this.errorKeySAT = ''
    },
    quantity() {
      this.errorQuantity = ''
    },
    price() {
      this.errorPrice = ''
    },
    selectedUnitMeasure() {
      this.errorUnitMeasure = ''
    },
    saleItemInput(newVal) {
      this.$emit('updateItem', newVal)
    },
  },
  async created() {
    const saleObject = JSON.parse(
      localStorage.getItem('newSale--saleInfoObject')
    )
    if (!saleObject) {
      this.$router.push({ name: 'newsalechooseclient' })
      return
    }
    this.sale = saleObject
    const taxes = require('@assets/Catalogos/CAT_017_MEX_es_impuestos.json')
    this.transferredTaxes = taxes.filter(
      ({ taxType }) => taxType === 'transferred'
    )
    this.withheldTaxes = taxes.filter(({ taxType }) => taxType === 'withheld')
  },
  methods: {
    deepEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2)
    },
    isValid() {
      this.validateInputs()
      const areChildrenValid =
        this.$refs.newConceptTaxesForm.isValid() &&
        this.$refs.selectedWithheldTaxes.isValid() &&
        this.$refs.FrecuentConceptsAutocomplete.isValid()
      return areChildrenValid && this.formComplete
    },
    validateInputs() {
      if (!this.selectedConcept.description) {
        this.errorNameConcept = 'Este campo es necesario'
      } else {
        this.errorNameConcept = ''
      }
      if (!this.key) {
        this.errorKey = 'Este campo es necesario'
      } else {
        this.errorKey = ''
      }
      if (!this.selectedClaveSat.customLabel) {
        this.errorKeySAT = 'Este campo es necesario'
      } else {
        this.errorKeySAT = ''
      }
      if (!this.quantity) {
        this.errorQuantity = 'Este campo es necesario'
      } else {
        this.errorQuantity = ''
      }
      if (!this.unitBasePrice) {
        this.errorPrice = 'Este campo es necesario'
      } else {
        this.errorPrice = ''
      }
      if (!this.selectedUnitMeasure.customLabel) {
        this.errorUnitMeasure = 'Este campo es necesario'
      } else {
        this.errorUnitMeasure = ''
      }
      if (!this.transferredMoneyTotal) {
        this.errorTransferredTaxes = 'Este campo es necesario'
      } else {
        this.errorTransferredTaxes = ''
      }
      if (!this.withheldMoneyTotal) {
        this.errorHeldTaxes = 'Este campo es necesario'
      } else {
        this.errorHeldTaxes = ''
      }
      if (
        this.hasDiscount &&
        (this.discountPercentage === '0' || !this.discountPercentage)
      ) {
        this.errorPercentageDiscount = true
      } else {
        this.errorPercentageDiscount = false
      }
      if (
        this.hasDiscount &&
        (this.discountAmount === '0' || !this.discountAmount)
      ) {
        this.errorAmountDiscount = true
      } else {
        this.errorAmountDiscount = false
      }
    },
    fillForm(concept) {
      this.selectedConcept = concept
      this.currency = concept.currency || 'MXN'
      this.key = concept.key || ''
      this.discountPercentage =
        concept.discountPercentage || this.discountPercentage
      this.hasDiscount = !!concept.discountPercentage || this.hasDiscount
      /* eslint-disable */
      const { itemAdditionalDataLocalizedInput_MEX } = concept
      const c = itemAdditionalDataLocalizedInput_MEX.claveProductoServicioSAT
      const d =
        itemAdditionalDataLocalizedInput_MEX.claveProductoServicioSATDescripcion
      if (c && d) {
        this.selectedClaveSat = {
          c,
          d,
          customLabel: `${c} - ${d}`,
        }
      }
      const code = itemAdditionalDataLocalizedInput_MEX.claveUnidadMedidaSAT
      const unit =
        itemAdditionalDataLocalizedInput_MEX.claveUnidadMedidaSATDescripcion
      if (code && unit) {
        this.selectedUnitMeasure = {
          code,
          unit,
          customLabel: `${code} - ${unit}`,
        }
      }
      /* eslint-enable */
      this.unitBasePrice = concept.unitBasePrice || '0.00'
      this.quantity = concept.quantity || ''
      this.selectedTransferredTaxes = concept.selectedTransferredTaxes || []
      this.selectedWithheldTaxes = concept.selectedWithheldTaxes || []
      // Wait GxCheckbox to be rendered
      this.$nextTick(() => {
        this.showTextarea = !!concept.additionalNotes || this.showTextarea
        this.additionalNotes = concept.additionalNotes || this.additionalNotes
      })
    },
    onModalClose() {
      if (this.errorModalTimeOut) {
        clearTimeout(this.errorModalTimeOut)
      }
      this.$router.push({ name: 'newsalechooseclient' })
    },
    selectClaveSat() {
      // this.saveFormState()
      this.$router.replace({
        name: 'newsaleselectsatkey',
        query: { localId: this.item.localId },
      })
    },
    selectUnit() {
      // this.saveFormState()
      this.$router.replace({
        name: 'selectunit',
        query: { localId: this.item.localId },
      })
    },
    selectFrequentConcept() {
      // this.saveFormState()
      this.$router.replace({
        name: 'choosefrequentconcept',
        query: { localId: this.item.localId },
      })
    },
  },
}
</script>
<template>
  <form id="newConceptForm" class="w-full de:pt-0  flex flex-col">
    <div class="px-4 de:px-8 mb-2">
      <FrecuentConceptsAutocomplete
        ref="FrecuentConceptsAutocomplete"
        v-model="selectedConcept"
        :error="errorNameConcept"
        refs="FrecuentConceptsAutocomplete"
        :local-id="itemLocalId"
      />
    </div>
    <GxCheckbox
      v-model="showTextarea"
      :input-id="`checkboxInput-${_uid}`"
      :watch-value="true"
      label="Nota adicional al concepto"
      class="m-4 mt-0 de:mx-8"
    />
    <transition name="fade">
      <GxTextArea
        v-if="showTextarea"
        key="descriptionTextArea"
        v-model="additionalNotes"
        label="Descripción"
        placeholder="Escribe aquí..."
        class="px-4 de:px-8 pb-4"
      />
    </transition>
    <GxInput
      v-model="key"
      :error="errorKey"
      placeholder="Clave*"
      :watch-value="true"
      label="Clave*"
      class="de:px-4"
      :maxlength="100"
    />
    <div class="px-4 de:px-8 mb-2">
      <ClaveSatAutoComplete
        v-model="selectedClaveSat"
        :index="index"
        :local-id="itemLocalId"
        :error="errorKeySAT"
      />
    </div>
    <GxInput
      key="quantity"
      v-model="quantity"
      placeholder="Cantidad*"
      pattern="decimal"
      inputmode="decimal"
      :decimal-limit="6"
      :watch-value="true"
      class="de:px-4 mb-2 mt-2"
      :error="errorQuantity"
      label="Cantidad*"
    />
    <div class="px-4 de:px-8 mb-2">
      <UnitMeasureAutocomplete
        v-model="selectedUnitMeasure"
        :local-id="itemLocalId"
        :error="errorUnitMeasure"
      />
    </div>
    <div class="px-4 de:px-8 mb-2">
      <GxTextFieldMoney
        v-model="unitBasePrice"
        :currency="currencySymbol"
        label="Precio unitario*"
      />
    </div>
    <p
      class="text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold uppercase py-2 p-4 de:px-8 mb-4"
      >impuestos</p
    >
    <!-- impuestos trasladados -->
    <section class=" de:px-8 px-4 pb-8 de:pb-0">
      <NewConceptTaxesForm
        ref="newConceptTaxesForm"
        v-model="selectedTransferredTaxes"
        taxes-type="transferred"
        :total="conceptPriceWithDiscount"
        select-label="Impuestos trasladados"
        data-testid="Impuestos trasladados"
        :taxes="transferredTaxes.map((tax) => tax.taxName)"
      />
      <!-- impuesto retenido -->
      <NewConceptTaxesForm
        ref="selectedWithheldTaxes"
        v-model="selectedWithheldTaxes"
        taxes-type="withheld"
        :total="conceptPriceWithDiscount"
        select-label="Impuestos retenidos"
        data-testid="Impuestos retenidos"
        :taxes="withheldTaxes.map((tax) => tax.taxName)"
      />
    </section>
    <!-- descuento -->
    <span
      class="text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold uppercase py-2 p-4 de:px-8"
      :class="{ 'de:mt-8': selectedWithheldTaxes.length === 0 }"
      >descuento</span
    >
    <div
      class="flex cursor-pointer justify-between items-center p-4 de:p-8 de:py-4"
    >
      <label :for="`discount-${_uid}`" class="text-base de:text-xs font-gothic"
        >Descuento</label
      >
      <GxSwitch :id="`discount-${_uid}`" v-model="hasDiscount" />
    </div>
    <transition-group tag="div" name="fade" class="mb-8">
      <div
        v-if="hasDiscount"
        key="formDiscount"
        class="flex justify-between px-4 de:px-8 de:flex-no-wrap"
      >
        <GxInputPercentage
          key="discountPercentage"
          v-model="discountPercentage"
          :total="total"
          :money-has-focus="hasMoneyDiscountFocus"
          :amount="discountAmount"
          class="mr-2 de:mr-4 flex-grow"
          :error="errorPercentageDiscount"
          :decimal-limit="2"
        />
        <GxInputMoney
          key="discountAmount"
          v-model="discountAmount"
          :percentage="discountPercentage"
          :total="total"
          class="flex-grow "
          :error="errorAmountDiscount"
          :decimal-limit="2"
          @focus="hasMoneyDiscountFocus = true"
          @blur="hasMoneyDiscountFocus = false"
        />
      </div>
      <p
        v-if="hasDiscount && errorPercentageDiscount && errorAmountDiscount"
        key="discountError"
        class="text-alert mt-2 de:gx-caption gx-caption de:px-8 px-4 font-bold"
        >Debes añadir un porcentaje y un monto</p
      >
    </transition-group>
    <span
      class="text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold uppercase py-2 p-4 de:px-8 mb-4"
      >importe por concepto</span
    >
    <p class="gx-caption de:gx-caption mb-2 de:pr-8 pr-4 ml-auto">Importe</p>
    <p class=" de:px-8 px-4 ml-auto mb-4 break-all de:text-xs">{{
      `$${formattedTotalAfterTaxes} ${currencySymbol}`
    }}</p>
  </form>
</template>

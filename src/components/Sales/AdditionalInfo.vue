<script>
import GxTextArea from '@components/_Core/Forms/GxTextArea'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import PaymentForm from '@components/Sales/PaymentForm'
import GxIcon from '@components/_Core/Icons/GxIcon'
import { LOCAL_COMPANY, SEARCH_INCOME_CATEGORY } from '@src/apollo/queries'
import { PREVIEW_SALE } from '@src/apollo//mutations'
import Big from 'big.js'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
export default {
  name: 'AdditionalInfo',
  components: {
    GxTextArea,
    GxCardModal,
    PaymentForm,
    GxIcon,
    GxIcon2,
  },
  apollo: {
    categories: {
      query: SEARCH_INCOME_CATEGORY,
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          size: 50,
          search: this.incomeCategorySearch,
          status: 'active',
        }
      },
      update(data) {
        const searchResult =
          data.myAccount.companies[0].company.incomeCategories
        const result = [...this.categories, ...searchResult]
        return result.reduce(
          (acc, category) => {
            if (acc.ids.includes(category.incomeCategoryId)) {
              return acc
            }
            acc.ids.push(category.incomeCategoryId)
            acc.uniq.push(category)
            return acc
          },
          { ids: [], uniq: [] }
        ).uniq
      },
      skip() {
        return !this.company
      },
    },
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      loading: false,
      sale: null,
      company: null,
      salePaymentDate: new Date().toISOString().split('T')[0],
      payoffDate: new Date().toISOString(),
      description: '',
      category: '',
      charged: true,
      internalNote: '',
      externalNote: '',
      errorModal: null,
      errorTodoImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      errorpayoffDate: null,
      errorCategory: null,
      categories: [],
      timeout: null,
      incomeCategorySearch: '',
      validatePayments: false,
      saleItems: [],
      payments: [
        {
          id: String(Date.now()),
          expectedAmount: 0,
          expectedDate: new Date().toISOString(),
        },
      ],
    }
  },
  computed: {
    incomeCategory() {
      if (this.categories.length && this.category) {
        return this.categories.find(({ name }) => name === this.category)
      }
      return null
    },
    invalidNumberOfPayments() {
      const { expectedPaymentMethod } = this.sale
      const numberOfPayments = this.payments.length
      return expectedPaymentMethod === 'PUE' && numberOfPayments > 1
    },
    invalidPayments() {
      if (this.multiplePayments) {
        return this.validatePayments && this.debt !== '0'
      }
      return false
    },
    paymentStatus() {
      const fullyPaid = this.payments.every(({ charged }) => charged)
      const notPaid = this.payments.every(({ charged }) => !charged)
      if (fullyPaid) {
        return 'fullyPaid'
      }
      if (notPaid) {
        return 'notPaid'
      }
      return 'partiallyPaid'
    },
    expectedPaymentSchedule() {
      const notCharged = this.payments.filter(({ charged }) => !charged)
      return notCharged.map(({ expectedDate, expectedAmount, bankAccount }) => {
        return {
          expectedDate: new Date(expectedDate).toISOString(),
          expectedAmount: Big(expectedAmount || '0')
            .round(2)
            .valueOf(),
          expectedReceivingMoneyAccountId: bankAccount
            ? bankAccount.moneyAccountId
            : '',
        }
      })
    },
    receivedPayments() {
      const charged = this.payments.filter(({ charged }) => charged)
      return charged.map(({ expectedDate, expectedAmount, bankAccount }) => {
        return {
          date: new Date(expectedDate).toISOString(),
          amountPaidToThisSale: Big(expectedAmount || '0')
            .round(2)
            .valueOf(),
        }
      })
    },
    paymentsTotal() {
      if (this.payments.length > 0) {
        return this.calculateTotalPayments(this.payments)
      }
      return '0'
    },
    formattedPaymentsTotal() {
      return Number(this.paymentsTotal).toLocaleString('en', {
        minimumFractionDigits: 2,
      })
    },
    debt() {
      const charged = this.paymentsTotal
      return Big(this.totalAmount)
        .minus(charged)
        .valueOf()
    },
    debtSign() {
      if (Big(this.debt).gte('0')) {
        return '+'
      }
      return '-'
    },
    totalTransferredTaxes() {
      // ['IEPS','IVA']
      return this.$utils.taxesSum(this.saleItems, 'selectedTransferredTaxes')
    },
    totalWithheldTaxes() {
      // totalWithheldTaxes
      return this.$utils.taxesSum(this.saleItems, 'selectedWithheldTaxes')
    },
    totalAmount() {
      if (this.saleItems.length) {
        let subtotal = this.saleItems.reduce((total, { subtotalAmount }) => {
          return Big(total)
            .plus(subtotalAmount)
            .valueOf()
        }, '0')
        subtotal = Big(subtotal)
          .round(2)
          .valueOf()

        return Big(subtotal)
          .plus(this.totalTransferredTaxes)
          .minus(this.totalWithheldTaxes)
          .round(2)
          .valueOf()
      }
      return null
    },
    salePaymentMethod() {
      if (this.sale) {
        return this.sale.expectedPaymentMethod
      }
      return null
    },
    multiplePayments() {
      if (this.salePaymentMethod) {
        return this.salePaymentMethod !== 'PUE'
      }
      return false
    },
    currencySymbol() {
      if (this.sale) {
        const [currencySymbol] = this.sale.currency.split('-')
        return currencySymbol
      }
      return ''
    },
    formattedCurrency() {
      if (this.concept && this.concept.currency) {
        return this.parseCurrencyCode(this.concept.currency)
      }
      return null
    },
    formattedTotalAmount() {
      if (!this.totalAmount) return null

      const money = this.totalAmount
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .replace(/^\d+$/, '$&.00')
        .replace(/^\d+$/, '$&.00')
        .replace(/\.\d$/, '$&0')

      return `$${money} MXN`
    },
  },
  watch: {
    category() {
      this.errorCategory = ''
    },
  },
  created() {
    this.$apollo.queries.categories.setOptions({
      fetchPolicy: 'network-only',
    })
    localStorage.removeItem('newSale--saleDataInput')
    const saleItems = JSON.parse(localStorage.getItem('newSale--concepts'))
    const saleInfoObject = JSON.parse(
      localStorage.getItem('newSale--saleInfoObject')
    )
    if (saleInfoObject) {
      this.sale = saleInfoObject
    } else {
      this.$router.push({ name: 'newsalechooseclient' })
    }
    if (saleItems) {
      this.saleItems = saleItems || []
    } else {
      this.$router.push({ name: 'saleconcept' })
    }
    this.setDataform()
  },
  beforeDestroy() {
    this.saveSaleItems()
    this.saveFormdata()
  },
  methods: {
    isValid() {
      this.validatePayments = true
      return (
        !!this.category &&
        this.areChildrenValid() &&
        this.debt === '0' &&
        !this.invalidNumberOfPayments
      )
    },
    areChildrenValid() {
      let areChildrenValid = true
      this.$refs.paymentForm.forEach((form) => {
        if (!form.isValid()) {
          areChildrenValid = false
        }
      })
      return areChildrenValid
    },
    updatePayment(payment) {
      const indexToUpdate = this.payments.findIndex(
        ({ id }) => id === payment.id
      )
      this.payments = [
        ...this.payments.slice(0, indexToUpdate),
        payment,
        ...this.payments.slice(indexToUpdate + 1),
      ]
    },
    addPayment() {
      if (
        !this.multiplePayments ||
        Big(this.debt).lte('0') ||
        !this.areChildrenValid()
      ) {
        return
      }
      this.payments = [
        ...this.payments,
        {
          id: String(Date.now()),
          expectedAmount: this.debt,
          expectedDate: new Date().toISOString(),
          bankAccount: null,
          charged: true,
        },
      ]
    },
    saveSaleItems() {
      if (this.saleItems.length) {
        localStorage.setItem(
          'newSale--concepts',
          JSON.stringify(this.saleItems)
        )
      }
    },
    saveFormdata() {
      const { internalNote, externalNote, payments, category } = this
      localStorage.setItem(
        'newSale--addtionalDataInfo',
        JSON.stringify({
          internalNote,
          externalNote,
          payments,
          category,
        })
      )
    },
    setDataform() {
      const dataForm = JSON.parse(
        localStorage.getItem('newSale--addtionalDataInfo')
      )
      const selectedCategory = JSON.parse(
        localStorage.getItem('selectedCategory')
      )
      if (dataForm) {
        Object.keys(dataForm).forEach((key) => {
          this[key] = dataForm[key]
        })
        localStorage.removeItem('newSale--addtionalDataInfo')
        if (this.sale.expectedPaymentMethod === 'PUE') {
          this.$nextTick(() => {
            const [oldPayment] = this.payments
            this.payments = [
              {
                id: String(Date.now()),
                expectedAmount: this.totalAmount,
                expectedDate: oldPayment.expectedDate,
                charged: oldPayment.charged,
                // bankAccount: oldPayment.bankAccount,
              },
            ]
          })
        } else {
          const currentTotalPayments = this.calculateTotalPayments(
            dataForm.payments
          )
          if (Big(this.totalAmount).eq(currentTotalPayments)) return
          const [oldPayment] = this.payments
          this.payments = [
            {
              id: String(Date.now()),
              expectedAmount: this.totalAmount,
              expectedDate: oldPayment.expectedDate,
              charged: oldPayment.charged,
              // bankAccount: oldPayment.bankAccount,
            },
          ]
        }
      } else {
        this.category = ''
        this.internalNotes = ''
        this.category = ''
        // wait to debt computed property
        this.$nextTick(() => {
          this.payments = [
            {
              id: String(Date.now()),
              expectedAmount: this.totalAmount,
              expectedDate: new Date().toISOString(),
              bankAccount: null,
            },
          ]
        })
      }
      if (selectedCategory) {
        this.category = selectedCategory.name
        localStorage.removeItem('selectedCategory')
      }
    },
    goBack() {
      this.showDoItLater = true
    },
    validations() {
      if (!this.payoffDate) {
        this.errorpayoffDate = 'Este campo es necesario'
      } else {
        this.errorpayoffDate = ''
      }
      if (!this.category) {
        this.errorCategory = 'Este campo es necesario'
      } else {
        this.errorCategory = ''
      }
    },
    async onSubmit() {
      if (!this.isValid()) {
        this.validations()
        this.$nextTick(() => {
          const element = document.querySelector('.js-error-anchor')
          if (element) {
            // if (this.$mq === 'mo') {
            //   window.scrollTo({ top: element.offsetTop - 100 })
            // } else {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
            // }
          }
        })
        return
      }
      try {
        this.loading = true
        const currency = this.currencySymbol
        const companyNumber = this.company.number
        const branchNumber = this.company.branchNumber
        const clientId = this.sale.clientId
        const date = new Date(this.sale.date).toISOString()
        const expectedPaymentMethod = this.sale.expectedPaymentMethod
        const expectedPaymentMethodDescription = this.sale
          .expectedPaymentMethodDescription
        const expectedPaymentForm = {
          code: this.sale.expectedPaymentForm.code,
          paymentType: this.sale.expectedPaymentForm.paymentType,
          usesBank: this.sale.expectedPaymentForm.usesBank,
        }
        /* eslint-disable */
        const saleAdditionalDataLocalizedInput_MEX = {
          usoCfdi: this.sale.saleAdditionalDataLocalizedInput_MEX.usoCfdi,
        }
        /* eslint-enable */
        const items = this.saleItems.map((item, index) => {
          const {
            itemReferenceId,
            description,
            additionalNotes,
            key,
            quantity,
            unit,
            unitBasePrice,
            currency,
            discountAmount,
            discountDescription,
            unitPriceWithDiscounts,
            unitTotalPrice,
            subtotalAmount,
            totalAmount,
            transferredTaxesPerUnit,
            withheldTaxesPerUnit,
            calculatedDiscountPercentage,
          } = item
          /* eslint-disable */
          const itemAdditionalDataLocalizedInput_MEX = {
            claveProductoServicioSAT:
              item.itemAdditionalDataLocalizedInput_MEX
                .claveProductoServicioSAT,
            claveProductoServicioSATDescripcion:
              item.itemAdditionalDataLocalizedInput_MEX
                .claveProductoServicioSATDescripcion,
            claveUnidadMedidaSAT:
              item.itemAdditionalDataLocalizedInput_MEX.claveUnidadMedidaSAT,
          }
          /* eslint-enable */
          return {
            itemReferenceId,
            description,
            additionalNotes,
            key,
            quantity,
            unit: unit,
            unitBasePrice,
            currency: currency || this.currencySymbol,
            discountPercentage: calculatedDiscountPercentage,
            discountAmount: discountAmount || '0',
            discountDescription,
            unitPriceWithDiscounts,
            unitTotalPrice,
            subtotalAmount,
            totalAmount,
            position: index + 1,
            itemAdditionalDataLocalizedInput_MEX,
            transferredTaxesPerUnit: transferredTaxesPerUnit.map((tax) => {
              if (tax.taxName === 'IVA-EXENTO') {
                return Object.assign({}, tax, {
                  isFreeTax: true,
                  taxName: 'IVA',
                  rate: '0',
                  amount: '0',
                })
              } else {
                return Object.assign({}, tax, { isFreeTax: false })
              }
            }),
            withheldTaxesPerUnit: withheldTaxesPerUnit.map((tax) =>
              Object.assign({}, tax, { isFreeTax: false })
            ),
          }
        })
        const discountPercentage = '0'
        let discountAmount = items.reduce((total, { discountAmount }) => {
          if (discountAmount) {
            return Big(discountAmount)
              .plus(total)
              .valueOf()
          }
          return total
        }, '0')
        discountAmount = Big(discountAmount).round(2)

        let subtotal = items.reduce((total, { subtotalAmount }) => {
          return Big(subtotalAmount)
            .plus(total)
            .valueOf()
        }, '0')
        subtotal = Big(subtotal).round(2)

        const total = this.totalAmount
        const exchangeRate = '1'
        const status = 'draft'
        const paymentStatus = this.paymentStatus
        const expectedPaymentSchedule = this.expectedPaymentSchedule
        const receivedPayments = this.receivedPayments
        const incomeCategoryId = this.incomeCategory.incomeCategoryId
        const internalNotes = this.internalNote
        const externalNotes = this.externalNote
        const { totalTransferredTaxes, totalWithheldTaxes } = this

        const data = {
          clientId,
          date,
          expectedPaymentMethod,
          expectedPaymentMethodDescription,
          expectedPaymentForm,
          saleAdditionalDataLocalizedInput_MEX,
          items,
          discountPercentage,
          discountAmount,
          subtotal,
          totalTransferredTaxes,
          totalWithheldTaxes,
          total,
          currency,
          exchangeRate,
          status,
          paymentStatus,
          expectedPaymentSchedule,
          receivedPayments,
          incomeCategoryId,
          internalNotes,
          externalNotes,
        }

        const saleDataInput = {
          data,
          companyNumber,
          branchNumber,
        }
        const response = await this.$apollo.mutate({
          mutation: PREVIEW_SALE,
          variables: {
            companyNumber,
            branchNumber,
            data,
          },
        })
        localStorage.setItem(
          'newSale--saleDataInput',
          JSON.stringify(saleDataInput)
        )
        localStorage.setItem(
          'newSale--pdf',
          response.data.saleInvoicePreviewCreate.saleInvoicePreviewFile
        )
        this.$router.push({ name: 'saleInvoiceDraft' })
      } catch (error) {
        this.errorModal = this.$utils.parseServerError(error)
        this.timeout = setTimeout(() => {
          this.errorModal = false
          this.timeout = null
        }, 3000)
      } finally {
        this.loading = false
      }
    },
    goToCategories() {
      this.saveFormdata()
      this.$router.replace({
        name: 'categories',
        query: { searchTerm: this.conceptsSearchTerm },
      })
    },
    onModalClose() {
      if (this.errorModalTimeOut) {
        clearTimeout(this.errorModalTimeOut)
      }
      this.errorModal = null
    },
    deletePayment(index) {
      if (this.payments.length > 1) {
        this.payments = [
          ...this.payments.slice(0, index),
          ...this.payments.slice(index + 1),
        ]
      } else {
        this.payments = [
          {
            id: String(Math.random()),
            expectedAmount: null,
            expectedDate: new Date().toISOString(),
            bankAccount: null,
          },
        ]
      }
    },
    calculateTotalPayments(payments) {
      return payments.reduce((total, { expectedAmount }) => {
        return Big(total)
          .plus(expectedAmount || '0')
          .valueOf()
      }, '0')
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col de:items-center w-screen de:w-full de:mb-4"
  >
    <div class=" de:shadow-3 de:rounded-lg flex flex-col de:w-108 de:mx-auto">
      <div
        v-for="(payment, index) in payments"
        :key="payment.id"
        class="w-full  de:pt-0 flex flex-col"
      >
        <p
          v-if="multiplePayments"
          class="flex text-gray-500 bg-gray-100 mb-2 gx-caption de:gx-caption font-bold py-2 p-4 de:px-8  uppercase"
        >
          detalle de cobro {{ index + 1 }}
          <button
            v-if="payments.length > 1"
            class="flex ml-auto  gx-caption de:gx-caption items-center cursor-pointer"
            @click.prevent="deletePayment(index)"
            >Eliminar pago
            <GxIcon class="text-alert ml-2" icon="remove_circle_outline"
          /></button>
        </p>
        <p
          v-else
          class="flex text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold py-2 p-4 de:px-8  uppercase"
          >detalles de cobro
        </p>
        <PaymentForm
          ref="paymentForm"
          :key="payment.id"
          :index="index"
          :payment="payment"
          :amount-disabled="!multiplePayments"
          :max-value="debt"
          :multiple-payments="multiplePayments"
          :currency-symbol="currencySymbol"
          @updatePayment="updatePayment"
        />
      </div>
      <GxTextLinkIcon
        v-if="multiplePayments"
        class="de:mr-8 mr-4 ml-auto de:mt-0 mt-2"
        text="Agregar cobro"
        @click.stop.prevent="addPayment"
      />
      <form class="w-full  de:pt-0 de:pb-6 flex flex-col">
        <p
          class="flex text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold py-2 p-4 de:px-8 mb-4 mt-2 uppercase"
          >categoría de venta
        </p>
        <div class="mb-2 de:px-8 px-4 mt-2 de:mt-0">
          <GxAutocomplete
            key="incomeCategories"
            v-model="category"
            right-icon="chevron_right"
            :right-icon-click-handler="goToCategories"
            label="Categoría*"
            :loading="$apollo.queries.categories.loading"
            :options="categories.map(({ name }) => name)"
            :error="errorCategory"
            :class="{ 'js-error-anchor': errorCategory }"
            @search="conceptsSearchTerm = $event"
          >
            <template
              v-slot:end-of-list="{
                filteredOptionsLenght,
                loading,
                optionsLenght,
              }"
            >
              <p
                v-if="!loading && optionsLenght === 0"
                class="flex flex-col py-3 px-4 border-t border-gray-200  items-center justify-center"
              >
                <span
                  class="text-center tracking-normal text-gray-500 mb-4 text-lg de:text-xs"
                  >Aún no tienes categorías</span
                >
                <button
                  type="button"
                  class="font-bold text-primary flex items-center text-sm de:text-2xs"
                  @mousedown.prevent="goToCategories"
                >
                  <GxIcon2 icon="add" class="mr-1 text-sm de:text-2xs" />
                  Crea una nueva cegoria</button
                >
              </p>
              <p
                v-else-if="filteredOptionsLenght > 0"
                class="text-right py-3 px-4 border-t border-gray-200 "
              >
                <button
                  type="button"
                  class="font-bold text-primary text-sm de:text-2xs"
                  @mousedown.prevent="goToCategories"
                  >Ver lista completa de categorías</button
                >
              </p>
              <p
                v-else-if="
                  !loading && filteredOptionsLenght === 0 && optionsLenght > 0
                "
                class="flex flex-col py-3 px-4 border-t border-gray-200  items-center justify-center"
              >
                <span
                  class="text-center tracking-normal text-gray-500 mb-4 text-lg de:text-xs"
                  >No encontramos resultados relacionados a tu búsqueda.</span
                >
                <button
                  type="button"
                  class="font-bold text-primary flex items-center text-sm de:text-2xs"
                  @mousedown.prevent="goToCategories"
                >
                  <GxIcon2 icon="add" class="mr-1 text-sm de:text-2xs" />
                  Crear una nueva categoría</button
                >
              </p>
            </template>
            <template v-slot:error>
              <p
                v-if="errorCategory"
                class="text-sm de:text-2xs mt-1 text-alert"
                >{{ errorCategory }}</p
              >
            </template>
          </GxAutocomplete>
        </div>
        <span
          class="text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold uppercase py-2 p-4 de:px-8 mb-4"
          >notas</span
        >
        <GxTextArea
          v-model="externalNote"
          label="Nota visible para el cliente"
          placeholder="Escribe aquí..."
          class="px-4 de:px-8 pb-4"
        />
        <GxTextArea
          v-model="internalNote"
          label="Nota interna (no visible para el cliente)"
          placeholder="Escribe aquí..."
          class="px-4 de:px-8 pb-4"
        />
        <p
          v-if="invalidPayments && debtSign === '+'"
          class="text-alert text-center ml-auto mt-2 de:px-8 px-4 mt-8 mb-2"
          >El total de los pagos (${{ formattedPaymentsTotal }}) es menor que el
          total de la venta ({{ formattedTotalAmount }})</p
        >
        <p
          v-if="invalidPayments && debtSign === '-'"
          class="text-alert text-center ml-auto mt-2 de:px-8 px-4 mt-8 mb-2"
          >El total de los pagos (${{ formattedPaymentsTotal }}) es mayor que el
          total de la venta ({{ formattedTotalAmount }})</p
        >
        <!-- <p
          v-if="!invalidPayments && invalidNumberOfPayments"
          class="text-alert text-center ml-auto mt-2 de:px-8 px-4 mt-8 mb-2"
          >Método de pago:
          <span class="font-bold">"Pago en parcialidades o diferido"</span
          >.<br />Debes agregar 2 o más pagos</p
        > -->
        <GxButton
          :loading="loading"
          :class="{ 'my-8': invalidPayments, 'mb-8': !invalidPayments }"
          class="ml-auto mr-4 mb-8"
          @click.stop.prevent="onSubmit"
          >siguiente</GxButton
        >
      </form>
    </div>
    <GxCardModal
      v-if="errorModal"
      headline="Error"
      :text-body="errorModal"
      :card-img="$utils.alertImages.Oops"
      alt="Error"
      @close="onModalClose"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>

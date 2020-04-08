<script>
import { BANK_ACCOUNTS, LOCAL_COMPANY } from '@src/apollo/queries'
import GxInput from '@components/_Core/Forms/GxInput'
// import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxSwitch from '@components/_Core/Forms/GxSwitch'
import Big from 'big.js'
export default {
  name: 'PaymentForm',
  components: {
    GxInput,
    GxSwitch,
  },
  props: {
    maxValue: {
      type: [String],
      required: true,
    },
    currencySymbol: {
      type: String,
      required: true,
    },
    amountDisabled: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    multiplePayments: {
      type: Boolean,
      required: true,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    bankAccounts: {
      query: BANK_ACCOUNTS,
      variables() {
        return {
          companyNumber: this.company ? this.company.number : null,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.moneyAccounts
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      company: null,
      bankAccounts: [],
      branches: null,
      innerAmount: this.payment.expectedAmount
        ? String(this.payment.expectedAmount)
        : String(this.maxValue),
      expectedDate: this.payment.expectedDate,
      innerBankAccount: this.payment.bankAccount
        ? this.payment.bankAccount.name
        : '',
      charged:
        typeof this.payment.charged === 'undefined'
          ? true
          : this.payment.charged,
      innerAmountError: null,
      expectedDateError: null,
      bankAccountError: null,
    }
  },
  computed: {
    formComplete() {
      if (this.amountDisabled) {
        const { expectedDate, bankAccount } = this
        return !!(expectedDate && bankAccount)
      }
      const { expectedDate, bankAccount, innerAmount } = this
      return !!(expectedDate && bankAccount && innerAmount)
    },
    // bankAccount() {
    //   if (this.bankAccounts.length) {
    //     return this.bankAccounts.find(
    //       ({ name }) => name === this.innerBankAccount
    //     )
    //   }
    //   return null
    // },
    inputMaxAmount() {
      return Big(this.maxValue)
        .plus(this.innerAmount || '0')
        .valueOf()
    },
  },
  watch: {
    innerAmount(newVal) {
      if (newVal) {
        this.innerAmountError = null
      }
      const payment = this.createPayment()
      this.$emit('updatePayment', payment)
    },
    charged() {
      const payment = this.createPayment()
      this.$emit('updatePayment', payment)
    },
    expectedDate(newVal) {
      if (newVal) {
        this.expectedDateError = null
      }
      const payment = this.createPayment()
      this.$emit('updatePayment', payment)
    },
    // innerBankAccount(newVal) {
    //   if (newVal) {
    //     this.bankAccountError = null
    //   }
    //   const payment = this.createPayment()
    //   this.$emit('updatePayment', payment)
    // },
  },
  methods: {
    createPayment() {
      const { innerAmount, charged, expectedDate } = this
      return {
        id: this.payment.id,
        expectedAmount: Number(innerAmount),
        charged,
        expectedDate,
      }
    },
    validations() {
      const { innerAmount, expectedDate } = this
      if (!innerAmount) {
        this.innerAmountError = 'Este campo es obligatorio.'
      }
      if (Big(innerAmount).eq('0')) {
        this.innerAmountError = 'El monto debe ser mayor a cero.'
      }
      if (!expectedDate) {
        this.expectedDateError = 'Este campo es obligatorio.'
      }

      // if (!innerBankAccount && charged) {
      //   this.bankAccountError = 'Este campo es obligatorio.'
      // }
    },
    isValid() {
      const { innerAmount, expectedDate } = this
      this.validations()
      if (this.multiplePayments) {
        if (this.charged) {
          return !!(innerAmount && !Big(innerAmount).eq('0') && expectedDate)
        }
        return !!(innerAmount && !Big(innerAmount).eq('0') && expectedDate)
      } else {
        // if (this.charged) {
        //   return !!(expectedDate && bankAccount)
        // }
        return !!expectedDate
      }
    },
  },
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center p-4 de:p-8 de:py-4">
      <label :for="String(_uid)">Marcar como cobrado</label>
      <GxSwitch :id="String(_uid)" v-model="charged" />
    </div>
    <GxInput
      v-if="multiplePayments"
      v-model="innerAmount"
      placeholder="Monto*"
      label="Monto*"
      pattern="money"
      :decimal-limit="2"
      :icon-right="currencySymbol"
      :disabled="amountDisabled"
      :watch-value="!amountDisabled"
      :max-amount="inputMaxAmount"
      :error="innerAmountError"
      class="de:px-4"
    />
    <GxInput
      v-model="expectedDate"
      placeholder="Fecha de cobro*"
      label="Fecha de cobro*"
      class="de:px-4"
      pattern="date"
      :error="expectedDateError"
      icon="calendar_today"
    />
    <!-- <div v-if="charged" class="de:px-4">
      <GxDropdown
        v-model="innerBankAccount"
        :options="bankAccounts.map(({ name }) => name)"
        label="Cuenta*"
        :error="bankAccountError"
      />
    </div> -->
  </div>
</template>

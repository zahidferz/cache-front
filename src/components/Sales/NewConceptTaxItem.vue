<script>
import GxInputPercentage from '@components/_Core/Forms/GxInputPercentage'
import GxInputMoney from '@components/_Core/Forms/GxInputMoney'
import Big from 'big.js'
export default {
  name: 'NewConceptTaxItem',
  components: {
    GxInputPercentage,
    GxInputMoney,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    dataTestId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rate: this.value.rate,
      amount: this.value.amount,
      moneyHasFocus: false,
      showError: false,
    }
  },
  computed: {
    error() {
      if (this.value.taxName === 'IVA-EXENTO') return false
      return !this.rate || !this.amount
    },
  },
  watch: {
    value: {
      handler: function(newValue, oldValue) {
        if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
          return
        }
        this.rate = newValue.rate
        // A new frequent item was selected if this new frequent item
        // has the same rate as the old item and total remains the same computeds wont be trigered
        // we need to force this process
        if (newValue.amount && Big(newValue.amount).eq('0')) {
          this.$emit('input', {
            taxName: newValue.taxName,
            rate: this.rate,
            amount: this.amount,
          })
        }
      },
    },
    rate(newVal) {
      const taxName = this.value.taxName
      const rate = newVal
      const amount = this.amount
      this.$emit('input', { taxName, rate, amount })
    },
    amount(newVal) {
      const taxName = this.value.taxName
      const rate = this.rate
      const amount = newVal
      this.$emit('input', { taxName, rate, amount })
    },
  },
  methods: {
    isValid() {
      this.showError = true
      return !this.error
    },
  },
}
</script>
<template>
  <div class="flex flex-col mb-2">
    <p class="gx-caption de:gx-body uppercase">{{ value.taxName }}</p>
    <div class="flex justify-between de:flex-no-wrap">
      <!-- Dont use  v-model.number since Number('') === 0  and 0 is a valid input but '' is not.  -->
      <GxInputPercentage
        v-model="rate"
        :disabled="value.taxName === 'IVA-EXENTO'"
        :total="total"
        :amount="amount"
        :money-has-focus="moneyHasFocus"
        class="mt-2 mr-2  de:mr-4 flex-grow"
        :error="error && showError"
        :data-testid="`Porcentaje-${value.taxName}-${dataTestId}`"
      />
      <GxInputMoney
        ref="GxInputMoney"
        v-model="amount"
        :disabled="value.taxName === 'IVA-EXENTO'"
        :percentage="rate"
        :total="total"
        class="mt-2 flex-grow"
        :error="error && showError"
        @focus="moneyHasFocus = true"
        @blur="moneyHasFocus = false"
      />
    </div>
    <transition name="fade">
      <p
        v-if="error && showError"
        class="text-alert mt-2  de:gx-caption gx-caption font-bold"
        >Debes añadir un porcentaje y un monto</p
      >
    </transition>
  </div>
</template>

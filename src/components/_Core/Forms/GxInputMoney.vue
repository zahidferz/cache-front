<template>
  <div
    class="flex justify-start items-center"
    :class="{ 'js-error-anchor': error }"
  >
    <label
      :for="_uid"
      class="flex flex-shrink flex-grow justify-start items-center"
    >
      <span
        class="percentage gx-caption de:gx-caption"
        :class="{ 'text-alert': error }"
        >Monto*</span
      >
      <span
        class="ml-2  px-2 overflow-hidden flex justify-end  items-center rounded-lg flex-grow flex-shrink de:py-1 py-2 gx-caption border rounded-lg"
        :class="{
          'border-alert': error && !disabled,
          'border-black': !error && !disabled,
          'bg-gray-100 border-gray-100 cursor-not-allowed': disabled,
          symbol: $mq === 'mo',
          'symbol-de': $mq === 'de',
        }"
      >
        <input
          :id="_uid"
          ref="input"
          :value="innerValue"
          class="text-right w-full outline-none gx-font-size"
          :class="{
            'text-alert': error,
            'bg-gray-100 cursor-not-allowed': disabled,
          }"
          type="text"
          inputmode="decimal"
          :disabled="disabled"
          @focus="onFocus"
          @blur="onBlur"
          @change="$emit('change')"
          @input="onInput"
        />
      </span>
    </label>
  </div>
</template>
<script>
import Big from 'big.js'

export default {
  name: 'GxInputMoney',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    percentage: {
      type: [Number, String],
      default: 0,
    },
    total: {
      type: String,
      default: '1',
    },
    error: {
      type: Boolean,
      default: false,
    },
    decimalLimit: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      innerValue: this.value,
      hasFocus: false,
    }
  },
  computed: {
    calculated() {
      // if (isNaN(this.total)) {
      //   return 0
      // }
      if (this.percentage === '' || this.percentage === null) {
        return null
      }
      if (this.hasFocus) {
        return this.innerValue.replace(/[^0-9.]/g, '')
      }
      return Big(this.total)
        .times(this.percentage)
        .div(100)
        .round(this.decimalLimit)
        .valueOf()
    },
  },
  watch: {
    innerValue(newVal) {
      // Value can't be greater than total
      // Remove formatting characters and cast as Number to compare with the provided total
      // If found to be greater than total, use parseMoneyInput to properly reset the value
      // Notice that parseMoneyInput expects a string from the input element, so when passing
      // this.total we need to cast to string.
      if (
        Number(
          newVal
            .replace('$', '')
            .split(',')
            .join('')
        ) > Number(this.total)
      ) {
        this.parseMoneyInput(this.total.toString())
      }
    },
    calculated: {
      handler(newValue) {
        if (newValue === null) {
          this.$emit('input', '')
          this.innerValue = ''
          return
        }
        this.$emit('input', newValue)
        this.parseMoneyInput(newValue)
      },
      immediate: true,
    },
    hasFocus(newValue) {
      if (newValue) {
        this.$emit('focus')
      } else {
        this.$emit('blur')
      }
    },
  },
  methods: {
    onFocus() {
      this.hasFocus = true
      this.$refs.input.setSelectionRange(0, this.innerValue.length)
    },
    onInput(evt) {
      const caretPosition =
        evt.target.value.length >= this.$refs.input.value.length
          ? this.$refs.input.selectionStart + 1
          : this.$refs.input.selectionStart - 1
      this.$nextTick(() => {
        this.$refs.input.selectionEnd = caretPosition
      })
      const parsedMoney = this.parseMoneyInput(evt.target.value)
      evt.target.value = parsedMoney
    },
    validate(amount) {
      const parsedAmount = Number(amount)
      if (!this.greaterThanTotal) {
        return true
      }
      return parsedAmount <= this.total
    },
    onBlur() {
      this.hasFocus = false
      if (!this.innerValue) {
        this.$emit('input', '')
        return
      }
      this.innerValue = `$${this.formatMoney(this.innerValue)}`
      this.$emit('input', this.innerValue.replace(/[^0-9.]/g, ''))
    },
    formatMoney(text) {
      return text
        .replace('$', '')
        .replace(/^\d+$/, '$&.00')
        .replace(/^\d+\.$/, '$&00')
        .replace(/\.\d$/, '$&0')
        .replace(/\d+\.$/, '$&00')
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    parseMoneyInput(text) {
      if (!text) {
        this.innerValue = ''
        return
      }
      const parsedText = text.replace(/[^0-9.]/g, '')
      const [integers, decimals] = parsedText.split('.')
      const cleanText =
        typeof decimals === 'string'
          ? integers + '.' + decimals.slice(0, this.decimalLimit)
          : integers
      const includesDecimal = cleanText.includes('.')
      if (this.hasFocus) {
        let formatted
        if (includesDecimal) {
          formatted = cleanText
            .replace(/^\.$/, '0.')
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        } else {
          formatted = cleanText.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        this.innerValue = `$${formatted}`
      } else {
        const formatted = cleanText
          .replace(/^\d+$/, '$&.00')
          .replace(/^\d+\.$/, '$&00')
          .replace(/\.\d$/, '$&0')
          .replace(/\d+\.$/, '$&00')
        this.innerValue = `$${formatted.replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }
      this.$emit('input', this.innerValue.replace(/[^0-9.]/g, ''))
      return this.innerValue
    },
  },
}
</script>
<style lang="scss" scoped>
/*  stylelint-disable  */
.symbol {
  min-width: 90px;
  max-width: 143px;
}
.symbol-de {
  min-width: 152px;
  max-width: 152px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  display: none;
  margin: 0;
}
.gx-font-size {
  font-size: 1.125rem;
}

@screen de {
  .gx-font-size {
    font-size: 0.875rem;
  }
}
</style>

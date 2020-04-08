<template>
  <div
    class="flex flex-shrink  justify-start items-center"
    :class="{ 'js-error-anchor': error }"
  >
    <div
      class="flex flex-grow justify-start items-center"
      :class="{ 'text-gray-700': disabled }"
    >
      <label
        :for="_uid"
        class="percentage gx-caption de:gx-caption"
        :class="{ 'text-alert': error }"
        >Porcentaje*</label
      >
      <span
        class="symbol ml-2 flex justify-end overflow-hidden items-center rounded-lg flex-grow de:py-1 py-2 px-2 gx-caption border rounded-lg"
        :class="{
          'symbol-mo': $mq === 'mo',
          'border-alert': error && !disabled,
          'border-black': !error && !disabled,
          'bg-gray-100 border-gray-100 cursor-not-allowed': disabled,
        }"
      >
        <input
          :id="_uid"
          ref="input"
          :value="innerValue"
          class="text-right w-full  outline-none "
          :class="{
            'text-alert': error,
            'bg-gray-100 cursor-not-allowed': disabled,
          }"
          inputmode="decimal"
          type="tel"
          lang="en-150"
          :disabled="disabled"
          @focus="onFocus"
          @blur="onBlur"
          @change="$emit('change')"
          @input="onInput"
        />
        <span
          v-if="value || value == '0'"
          class="ml-1 gxSymbol"
          :class="{ 'text-alert': error }"
          >%</span
        >
      </span>
    </div>
  </div>
</template>
<script>
import Big from 'big.js'

export default {
  name: 'GxInputPercentage',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    moneyHasFocus: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    total: {
      type: String,
      default: '1',
    },
    amount: {
      type: String,
      default: '0',
    },
    decimalLimit: {
      type: Number,
      default: 6,
    },
    error: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      innerValue: this.value,
      hasFocus: false,
      calculated: 0,
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.innerValue = newValue
    },
    amount(newAmount, oldValue) {
      const typeOfTotal = this.typeOfCalculatedParams(this.total)
      const typeOfAmount = this.typeOfCalculatedParams(newAmount)
      const typeOfPercentage = this.typeOfCalculatedParams(this.value)
      // Initial state Frequent concept with some default taxes
      if (
        typeOfTotal === 'zero' &&
        (typeOfAmount === 'zero' && typeOfPercentage === 'someNumber')
      ) {
        this.$emit('input', this.value)
        return
      }
      if (typeOfTotal === 'zero' && typeOfAmount === 'zero') {
        this.$emit('input', '0')
        return
      }
      if (
        typeOfTotal === 'someNumber' &&
        (typeOfAmount === 'zero' || typeOfAmount === 'someNumber')
      ) {
        this.calculated = Big(newAmount)
          .times(100)
          .div(this.total)
          .round(this.moneyHasFocus ? 10 : this.decimalLimit)
          .valueOf()
        return
      }
      if (typeOfAmount === 'emptyString') {
        this.$emit('input', '')
        this.innerValue = ''
      }
    },
    calculated(newValue, oldValue) {
      // User is editing the amount so we need to recalculate the taxes rate
      if (this.moneyHasFocus) {
        this.innerValue = newValue
        this.$emit('input', newValue)
        return
      }
      // The amount is being modified by the father component, e.g this.total was modified.
      this.$emit('input', this.innerValue)
    },
  },
  methods: {
    onFocus() {
      this.hasFocus = true
      this.$refs.input.setSelectionRange(0, this.value.length)
    },
    typeOfCalculatedParams(param) {
      if (param === '') {
        return 'emptyString'
      }
      if (Big(param).eq('0')) {
        return 'zero'
      }
      return 'someNumber'
    },
    onInput(evt) {
      const cleanInput = this.parseInput(evt.target.value).replace(',', '')
      if (Number(cleanInput) > this.limit) {
        evt.target.value = String(this.limit)
        this.innerValue = String(this.limit)
        this.$emit('input', `${this.limit}`)
      } else {
        evt.target.value = cleanInput
        this.innerValue = cleanInput
        this.$emit('input', cleanInput)
      }
    },
    onBlur() {
      this.hasFocus = false
      if (!this.innerValue) {
        return
      }
      this.innerValue = this.formatMoney(this.innerValue)
      this.$emit('input', this.innerValue.replace(/[^0-9.]/g, ''))
    },
    formatMoney(text) {
      return text.replace(/\.\d$/, '$&0').replace(/\d+\.$/, '$&00')
    },
    parseInput(text) {
      const parsedText = text.replace(/[^0-9.]/g, '')
      const [integers, decimals] = parsedText.split('.')
      const cleanText =
        typeof decimals === 'string'
          ? integers + '.' + decimals.slice(0, this.decimalLimit)
          : integers
      if (this.hasFocus) {
        return cleanText
          .replace(/^\.$/, '0.')
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        const result = cleanText
          .replace(/\.\d$/, '$&0')
          .replace(/\d+\.$/, '$&00')
        return result.replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
/*  stylelint-disable  */

.symbol {
  min-width: 89px;
  max-width: 89px;
}
.symbol-mo {
  min-width: 60px;
  max-width: 76px;
}
input {
  letter-spacing: 1px;
}
input,
input::-webkit-input-placeholder {
  font-size: 1.125rem;
}
input[type='number'] {
  min-width: 0;
  -moz-appearance: textfield;
  appearance: texfield;
}
input[type='number']:invalid {
  box-shadow: none;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  display: none;
  margin: 0;
}
.gxSymbol {
  font-size: 0.875rem;
  line-height: 0.875rem;
}

@media screen and (min-width: 768px) {
  .gxSymbol {
    font-size: 0.875rem;
    line-height: 0.875rem;
  }
  input,
  input::-webkit-input-placeholder {
    font-size: 0.875rem;
  }
}
</style>

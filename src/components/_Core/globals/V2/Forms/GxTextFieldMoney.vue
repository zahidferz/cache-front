<script>
import GxTextField from './GxTextField'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
export default {
  name: 'GxTextFielMoney',
  components: {
    GxTextField,
    GxIcon2,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      default: 'MXN',
    },
    inputClasses: {
      type: Object,
      default: () => ({ 'text-right': true }),
    },
    forId: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    precision: {
      type: Number,
      default: 6,
    },
    defaultValue: {
      type: String,
      default: '0.00',
    },
  },
  data() {
    return {
      hasFocus: false,
      innerValue: this.value
        ? this.parseValue(this.addTrailingZeros(this.value))
        : this.defaultValue,
    }
  },
  watch: {
    value(newValue) {
      if (Number(newValue) > 99999999999999) {
        this.innerValue = this.parseValue('99999999999999')
        return
      }
      this.innerValue = this.parseValue(newValue)
    },
    innerValue(newValue, oldValue) {
      this.$emit('input', newValue.replace(/,/g, ''))
    },
  },
  mounted() {
    // We had to calculate the input's content height due to browser inconsistencies
    // Chrome inputs with line-height:1 and font-size 12px  gives to the content a height of 15.333px
    // FireFox border width:1px actually gives a width of 0.666px
    this.$nextTick(() => {
      const borderWith = window
        .getComputedStyle(this.$refs.GxTextField.$refs.gxInput)
        .borderBlockEndWidth.replace('px', '')
      const inputHieght = this.$refs.GxTextField.$refs.gxInput.getBoundingClientRect()
        .height

      this.$refs.p.style.lineHeight = `${inputHieght -
        21 -
        4 -
        Number(borderWith)}px`
      document.documentElement.style.setProperty(
        '--currency-width',
        // 4 px space bewtween quanti and currency '123 MXN'
        `${this.$refs.p.clientWidth + 4}px`
      )
    })
  },

  methods: {
    updateValue(event) {
      const { selectionStart, selectionEnd } = event.target
      const currentValue = this.cleanInput(this.value)
      const newValue = this.cleanInput(event.target.value)
      let parsedValue
      parsedValue = this.parseValue(newValue)
      event.target.value = parsedValue
      // We lost the caret position after change the input value
      // We need to reset the caret position
      const newCharacters = currentValue.length < newValue.length
      if (newCharacters && this.cleanInput(newValue).length % 3 === 0) {
        event.target.setSelectionRange(selectionStart, selectionEnd)
      } else if (newCharacters) {
        event.target.setSelectionRange(selectionStart + 1, selectionEnd + 1)
      } else {
        event.target.setSelectionRange(selectionStart, selectionEnd)
      }
      this.innerValue = parsedValue
    },
    formatIntegers(string) {
      /*
        REGEX match a single digit '(\d)' that is followed
        by one o more groups of three digits and there arent
        left digits '(?=(\d{3})+(?!\d))'

        (1 333) match 1
        (1 33)  doest not match 1 because there are two left digit and 0 three digit groups
        ?= look ahead match 'x' if  followed by 'y' x(?=y)
        ?! neagation match 'x' if not followed by y x(?!y)
        (\d) regex group that match digits  0,1,2,3...9
        +  mean one or more times
       */
      return string.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    cleanInput(string) {
      /*
        REGEX: replace all but points an number
       */
      return string.replace(/[^.0-9]/g, '')
    },
    getIntegers(string) {
      const [integers] = string.split('.')
      return integers
    },
    getDecimals(string) {
      // eslint-disable-next-line no-unused-vars
      const [_, decimals = null] = string.split('.')
      return decimals ? decimals.slice(0, this.precision) : decimals
    },
    parseValue(input) {
      const cleanedInput = this.cleanInput(input)
      const integers = this.getIntegers(cleanedInput)
      const decimals = this.getDecimals(cleanedInput)
      if (typeof decimals === 'string') {
        return `${this.formatIntegers(integers)}.${decimals}`
      }
      return this.formatIntegers(integers)
    },
    onFocus() {
      this.hasFocus = true
      const selectionEnd = this.innerValue.length
      // Move the caret at the end of the input
      requestAnimationFrame(() => {
        this.$refs.GxTextField.$refs.gxInput.setSelectionRange(0, selectionEnd)
      })
    },
    onBlur() {
      this.hasFocus = false
      const defaultValue = this.value || this.defaultValue
      const formattedValue = this.addTrailingZeros(defaultValue)

      this.$emit('input', formattedValue)
    },
    addTrailingZeros(text) {
      return (
        text
          .replace(/,/g, '')
          // 000 --> 000.00
          .replace(/^(\d+?)+$/g, '$&.00')
          // 000. --> 000.00
          .replace(/^(\d+)+\.$/g, '$&00')
          // 000.0 --> 000.00
          .replace(/^(\d+)+\.\d$/g, '$&0')
      )
    },
  },
}
</script>
<template>
  <GxTextField
    ref="GxTextField"
    :value="innerValue"
    :label="label"
    :error="error"
    :for-id="forId"
    :autocomplete="autocomplete"
    :required="required"
    left-icon="attach_money"
    :autofocus="autofocus"
    :input-classes="{ gxInputMoney: true, ...inputClasses }"
    inputmode="decimal"
    @focus="onFocus"
    @blur="onBlur"
    @pureInput="updateValue"
  >
    <template v-slot:left-icon-slot>
      <GxIcon2 icon="attach_money" class=" pl-2 text-lg de:text-xs gxIcon" />
    </template>
    <template v-slot:right-slot="{ classes }">
      <p
        ref="p"
        class="text-lg de:text-xs pb-1 border border-transparent  tracking-normal text-gray-500 pr-2"
        >{{ hasFocus || value ? currency : '' }}</p
      >
    </template>
    <template v-slot:assistive-slot>
      <p
        class="text-lg de:text-xs pb-1 border border-transparent  tracking-normal text-gray-500 pr-2"
      >
        {{ error ? error : '' }}</p
      >
    </template>
  </GxTextField>
</template>
<style lang="scss" scoped>
/deep/.gxInputMoney {
  padding-right: var(--currency-width);
}
</style>
<style lang="scss" scoped>
:root {
  --currency-width: 0;
}
.gxIcon {
  padding-bottom: 12px;
}

@media screen and (min-width: 768px) {
  .gxIcon {
    padding-bottom: 6px;
  }
}
</style>

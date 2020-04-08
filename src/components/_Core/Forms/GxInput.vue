<script>
import inputValidators from '@src/utils/input-validators.js'
import GxIcon from '@components/_Core/Icons/GxIcon'
import debounce from 'lodash/debounce'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'
import Big from 'big.js'
// https://date-fns.org/docs/format
import format from 'date-fns/format'
Settings.defaultLocale = 'es'
const es = require('date-fns/locale/es')
export default {
  name: 'GxInput',
  components: {
    GxIcon,
    Datetime,
  },
  props: {
    markTouched: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    icon: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      default: 10,
    },
    max: {
      type: Number,
      default: 15,
    },
    assistive: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    validationFn: {
      type: Function,
      default: null,
    },
    accept: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: '',
    },
    watchValue: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    decimalLimit: {
      type: Number,
      default: 6,
    },
    maxAmount: {
      type: [Number, String],
      default: '99999999999999.999999',
    },
    inputmode: {
      type: String,
      default: null,
    },
    maxlength: {
      type: Number,
      default: Infinity,
    },
    phrases: {
      type: Object,
      default: null,
    },
    minDatetime: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      date: this.value || '',
      innerValue:
        this.pattern === 'date'
          ? this.value
            ? format(this.value, 'DD/MM/YY', { locale: es })
            : this.value
          : this.value,
      errorMsg: this.error,
      hasFocus: false,
      showPassword: false,
      labelWidth: null,
      validated: false,
      isTouched: this.markTouched,
    }
  },
  computed: {
    inputmodeInner() {
      if (this.inputmode) return this.inputmode

      if (['money', 'decimal', 'phone', 'numeric'].includes(this.pattern))
        return 'decimal'

      return 'text'
    },
    // Inputs with internal validations, usually associated with a given pattern need to be rendered
    // differently when the input is valid
    validThemePrimary() {
      return [
        'password',
        'ciec',
        'csd',
        'taxId',
        'internationalTaxId',
        'email',
      ].includes(this.pattern)
    },
    leftIconColor() {
      if (this.errorMsg) return 'ALERT'
      if (this.hasFocus) return 'PRIMARY'
      return 'DEFAULT'
    },
    rightIconColor() {
      if (this.errorMsg) return 'ALERT'
      if (this.hasFocus) return 'PRIMARY'
      if (this.hasText && this.validThemePrimary) return 'VALID_PRIMARY'
      if (this.hasText && !this.validThemePrimary) return 'VALID_DEFAULT'
      return 'DEFAULT'
    },
    inputColor() {
      if (this.errorMsg) return 'ALERT'
      if (this.hasFocus) return 'PRIMARY'
      if (this.hasText && this.validThemePrimary) return 'VALID_PRIMARY'
      if (this.hasText && !this.validThemePrimary) return 'VALID_DEFAULT'
      return 'DEFAULT'
    },
    autocompleteInner() {
      if (this.autocomplete) return this.autocomplete

      if (this.pattern === 'email') return 'email'

      return (
        this.pattern === 'password' ||
        this.pattern === 'csd' ||
        this.pattern === 'ciec'
      )
    },
    hasText() {
      if (this.type === 'file') {
        return this.value !== ''
      }
      return this.innerValue !== ''
    },
    // Returns the icon when an existing pattern is given
    // A user can override this by providing an icon prop
    hasValidation() {
      // Determine if the input requires validation via a provided method o a supported pattern
      if (this.pattern) return true
      if (this.validationFn) return true
      return false
    },
    innerIcon() {
      if (this.icon) return this.icon
      if (this.pattern === 'phone') return 'phone_iphone'
      if (this.pattern === 'taxId' || this.pattern === 'internationalTaxId')
        return 'domain'
      if (
        this.pattern === 'password' ||
        this.pattern === 'ciec' ||
        this.pattern === 'csd'
      )
        return 'lock'
      if (this.pattern === 'email') return 'email'
      if (this.pattern === 'name') return 'face'
      return null
    },
    innerIconRight() {
      if (this.iconRight) return this.iconRight
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        this.showPassword
      )
        return 'visibility'
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        !this.showPassword
      )
        return 'visibility_off'
      if (this.errorMsg) return 'cancel'
      if (
        this.validated &&
        this.hasValidation &&
        this.innerValue !== '' &&
        !this.errorMsg
      )
        return 'check_circle'
      return null
    },
    innerType() {
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        this.showPassword
      )
        return 'text'
      if (this.pattern === 'date' || this.pattern === 'money') {
        return 'text'
      }
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        !this.showPassword
      )
        return 'password'
      if (
        this.pattern === 'phone' ||
        this.pattern === 'clabe' ||
        this.pattern === 'bankAccount' ||
        this.pattern === 'numeric' ||
        this.pattern === 'decimal'
      )
        return 'tel'
      return this.type
    },
  },
  watch: {
    value(newVal) {
      if (this.watchValue) {
        if (this.pattern === 'money' || this.pattern === 'decimal') {
          // Value can't be greater than maxAmount
          // Remove formatting characters and cast as Number to compare with the provided maxAmount
          // If found to be greater than maxAmount, use parseMoneyInput to properly reset the value
          // Notice that parseMoneyInput expects a string from the input element, so when passing
          // this.maxAmount we need to cast to string.
          if (
            this.maxAmount &&
            Big(newVal.replace('$', '').replace(/,/g, '') || '0').gt(
              this.maxAmount
            )
          ) {
            this.innerValue =
              this.pattern === 'money'
                ? '$' + this.parseMoneyInput(this.maxAmount.toString())
                : this.parseMoneyInput(this.maxAmount.toString())
          } else {
            this.innerValue =
              this.pattern === 'money' && this.parseMoneyInput(newVal)
                ? '$' + this.parseMoneyInput(newVal)
                : this.parseMoneyInput(newVal)
          }
        } else {
          this.innerValue = newVal
        }
      }
    },
    date(newVal) {
      this.$emit('input', newVal)
      this.hasFocus = false
      this.innerValue = format(newVal, 'DD/MM/YY', { locale: es })
    },
    error(newErrorMsg) {
      this.errorMsg = newErrorMsg
    },
    autofocus(newVal) {
      if (newVal) {
        this.timeoutSetFocus()
      }
    },
    loading(newVal) {
      this.$nextTick(() => {
        if (newVal) this.onSvgLoaded()
      })
    },
  },
  created() {
    this.validateInput = debounce(this.immediateValidateInput, 700)
  },
  mounted() {
    if (this.pattern === 'money') {
      this.innerValue = this.parseMoneyInput(this.value)
        ? '$' + this.parseMoneyInput(this.value)
        : ''
      this.$emit('input', this.innerValue.replace(/[^0-9.]/g, ''))
    }
    if (this.pattern === 'decimal') {
      this.innerValue = this.parseDecimalInput(this.value)
      this.$emit('input', this.innerValue.replace(/[^0-9.]/g, ''))
    }
    if (this.pattern !== 'date') {
      this.$emit('input', this.value)
    }
    if (this.autofocus) {
      this.timeoutSetFocus()
    }
    // Defer validations until user types, unless a value already exists
    if (this.innerValue !== '') {
      this.immediateValidateInput()
    }
    if (this.error) {
      this.errorMsg = this.error
    }
    this.labelWidth = this.$refs.label.clientWidth
  },
  methods: {
    onSvgLoaded() {
      // SVGElement getTotalLength has not been implemented in JSDom and will break tests
      if (
        document.querySelector('path') &&
        document.querySelector('path').getTotalLength
      ) {
        const pathLength = document.querySelector('path').getTotalLength()
        this.$refs.label.style.setProperty('--dashArray', pathLength / 2)
        this.$refs.label.style.setProperty('--dashOffset', pathLength)
      }
    },
    setFocus() {
      this.$refs.gxInput.focus()
    },
    timeoutSetFocus() {
      setTimeout(() => {
        this.setFocus()
      }, 300)
    },
    immediateValidateInput() {
      // Mark the input as having gone through at least one validation. This will render the corresponding right icon.
      this.validated = true
      if (this.error) {
        this.errorMsg = this.error
        return
      }
      if (this.validationFn) {
        this.errorMsg = this.validationFn(this.innerValue)
      } else if (inputValidators[this.pattern]) {
        this.errorMsg = inputValidators[this.pattern](
          this.innerValue,
          this.min,
          this.max
        )
      }
      this.$emit('valid', this.errorMsg)
    },
    onClickLabel(e) {
      if (this.pattern === 'date' && !this.disabled) {
        e.preventDefault()
        e.target.blur()
        this.$refs.datetime.open({ target: { blur: function() {} } })
        this.isTouched = true
        this.hasFocus = true
        this.$emit('focus')
      }
    },
    onFocus(e) {
      this.isTouched = true
      this.hasFocus = true
      this.$emit('focus')
    },
    onInput(e) {
      if (this.pattern === 'money') {
        this.moneyPattern(e)
        return
      }
      if (this.pattern === 'decimal') {
        this.decimalPattern(e)
        return
      }
      if (this.type === 'file') {
        this.$emit('input', e)
        return
      }
      if (this.pattern === 'date' && this.$mq === 'de') {
        return
      }
      this.innerValue = e.target.value
      this.cleanInput()
      this.$emit('input', this.innerValue)
      this.validateInput()
    },
    onBlur(e) {
      this.hasFocus = false
      if (this.pattern === 'money') {
        const value = this.formatMoney(e.target.value.replace(/[^0-9.]/g, ''))
          ? this.formatMoney(e.target.value.replace(/[^0-9.]/g, ''))
          : ''
        e.target.value = value
        this.$emit('input', value.replace(/[^0-9.]/g, ''))
        this.$emit('blur')
        return
      }
      if (this.pattern === 'decimal') {
        const value = this.formatDecimal(e.target.value.replace(/[^0-9.]/g, ''))
        e.target.value = value
        this.$emit('input', value.replace(/[^0-9.]/g, ''))
        this.$emit('blur')
        return
      }
      this.cleanInput()
      if (this.pattern !== 'date') {
        this.$emit('input', this.innerValue)
      }
      if (this.pattern === 'date' && this.$mq === 'mo' && !this.innerValue) {
        e.target.type = 'text'
      }
      this.validateInput()
      this.$emit('blur')
    },
    cleanInput() {
      const deleteWhiteSpace = (text) => text.replace(/\s/g, '')
      const deleteSpecialCharacters = (text) =>
        text.replace(/[`~!#$%^&*()¬|×÷£¡₩¥€=¨Ç¿?;:'“‘,‘•",·<>{}[\]\\/]/gi, '')
      const deleteNoNumeric = (text) => text.replace(/\D/g, '')
      const deleteNoDecimal = this.decimalInput
      const deleteNoPhone = (text) => text.replace(/[^0-9]/g, '')
      const deleteNumeric = (text) => text.replace(/\d/g, '')
      const getNegativeNumber = (text) => text.replace(/[^.\-0-9]/g, '')
      const taxIdUpperCase = (text) => text.slice(0, 13).toUpperCase()
      const deleteNotCsdOrCiec = (text) =>
        text.replace(/[^ñÑ0-9a-zA-Z-._%&]/, '')
      const deleteInvalidBusinessName = (text) =>
        text.replace(/[^0-9a-zA-Z áéíóúÁÉÍÓÚÑñ´]/, '')
      const deleteNoSpaceInPassword = (text) =>
        text.replace(/[^0-9A-Za-z$&#_!*%]/, '')
      const deleteExceedTaxId = (text) => {
        if (text.length > 20) {
          return text.slice(0, 20).toUpperCase()
        } else return text.toUpperCase()
      }
      const capitalizeText = (text) => {
        let splitText = text.split(' ')
        for (let i = 0; i < splitText.length; i++) {
          splitText[i] =
            splitText[i].charAt(0).toUpperCase() + splitText[i].substring(1)
        }
        return splitText.join(' ')
      }

      const deleteExtraNumbersforClabe = (text) => {
        if (text.length > 18) {
          return text.slice(0, 18)
        } else return text.replace(/\D/g, '')
      }
      if (this.pattern === 'email') {
        this.innerValue = deleteWhiteSpace(this.innerValue)
        this.innerValue = deleteSpecialCharacters(this.innerValue)
      }
      if (this.pattern === 'internationalTaxId') {
        this.innerValue = deleteExceedTaxId(this.innerValue)
      }
      if (this.pattern === 'business-name') {
        this.innerValue = deleteInvalidBusinessName(this.innerValue)
      }
      if (this.pattern === 'csd' || this.pattern === 'ciec') {
        this.innerValue = deleteNotCsdOrCiec(this.innerValue)
      }
      if (this.pattern === 'password') {
        this.innerValue = deleteNoSpaceInPassword(this.innerValue)
      }
      if (this.pattern === 'numeric' || this.pattern === 'bankAccount') {
        this.innerValue = deleteNoNumeric(this.innerValue)
      }
      if (this.pattern === 'decimal' || this.pattern === 'bankAccount') {
        this.innerValue = deleteNoDecimal(this.innerValue)
      }
      if (this.pattern === 'clabe') {
        this.innerValue = deleteExtraNumbersforClabe(this.innerValue)
      }
      if (this.pattern === 'phone') {
        let countSpecialChars = 0
        for (let index = 0; index < this.innerValue.length; index++) {
          if ('+()'.includes(this.innerValue[index])) {
            countSpecialChars++
          }
        }
        this.innerValue = deleteNoPhone(this.innerValue).slice(
          0,
          this.max + countSpecialChars
        )
      }
      if (this.pattern === 'no-numeric') {
        this.innerValue = deleteNumeric(this.innerValue)
      }
      if (this.pattern === 'name' || this.pattern === 'lastname') {
        this.innerValue = deleteNumeric(this.innerValue)
        this.innerValue = capitalizeText(this.innerValue)
      }
      if (this.pattern === 'numeric-negative') {
        this.innerValue = getNegativeNumber(this.innerValue)
      }
      if (this.pattern === 'taxId') {
        this.innerValue = taxIdUpperCase(this.innerValue)
      }
    },
    onIconRightClick() {
      if (
        this.pattern === 'password' ||
        this.pattern === 'ciec' ||
        this.pattern === 'csd'
      ) {
        this.showPassword = !this.showPassword
      }
      this.$emit('icon-right-click')
    },
    moneyPattern(evt) {
      let value = this.parseMoneyInput(evt.target.value.replace(/[^0-9.]/g, ''))
        ? '$' + this.parseMoneyInput(evt.target.value)
        : ''
      if (this.maxAmount) {
        const inputNumber = Big(value.replace('$', '').replace(/,/g, '') || '0')
        if (inputNumber.gt(this.maxAmount)) {
          value = '$' + this.parseMoneyInput(String(this.maxAmount))
        }
      }
      const result = value.replace(/[^0-9.]/g, '') || ''
      const caretPosition =
        value.length >= this.$refs.gxInput.value.length
          ? this.$refs.gxInput.selectionStart + 1
          : this.$refs.gxInput.selectionStart - 1
      evt.target.value = value
      this.$nextTick(() => {
        this.$refs.gxInput.selectionEnd = caretPosition
      })
      this.$emit('input', result)
    },
    decimalPattern(evt) {
      let value = this.parseDecimalInput(evt.target.value)
      if (this.maxAmount) {
        const inputNumber = Big(
          value.replace(/[^0-9.]/g, '').replace(/,/g, '') || '0'
        )
        if (inputNumber.gt(this.maxAmount)) {
          value = this.parseDecimalInput(String(this.maxAmount))
        }
      }
      const result = value.replace(/[^0-9.]/g, '') || ''
      const caretPosition =
        value.length >= this.$refs.gxInput.value.length
          ? this.$refs.gxInput.selectionStart + 1
          : this.$refs.gxInput.selectionStart - 1
      evt.target.value = value
      this.$nextTick(() => {
        this.$refs.gxInput.selectionEnd = caretPosition
      })
      this.$emit('input', result)
    },
    decimalInput(text) {
      if (!text) {
        return ''
      }
      let cleanText = text.replace(/[^0-9.]/g, '')
      if (this.maxAmount && Big(cleanText || '0').gt(this.maxAmount)) {
        cleanText = Big(this.maxAmount).valueOf()
      }
      return this.formatDecimal(cleanText)
    },
    parseDecimalInput(text) {
      if (!text) {
        return ''
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
        return formatted
      } else {
        if (includesDecimal) {
          return cleanText
            .replace(/^\d+\.$/, '$&00')
            .replace(/^\.\d+$/, '0$&')
            .replace(/^\.$/, '0$&')
            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
        return cleanText
          .replace(/^\d+\.$/, '$&00')
          .replace(/^\.\d$/, '0$&')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    },
    formatDecimal(text) {
      if (text.includes('.')) {
        return text
          .replace(/^\d+\.$/, '$&00')
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        return text
          .replace(/^\d+\.$/, '$&00')
          .replace(/\.\d$/, '0$&0')
          .replace(/\d+\.$/, '$&00')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
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
        return ''
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
        return formatted
      } else {
        return cleanText
          .replace(/^\d+$/, '$&.00')
          .replace(/^\d+\.$/, '$&00')
          .replace(/\.\d$/, '$&0')
          .replace(/\d+\.$/, '$&00')
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      }
    },
  },
}
</script>
<template>
  <!-- has-error-anchor should just be used to scroll to an error -->
  <div
    class="w-full mb-2 de:mb-2 gxInput"
    :class="{ 'js-error-anchor': errorMsg }"
  >
    <label
      ref="label"
      :for="_uid"
      class="w-full flex px-4"
      :class="{
        'text-gray-500':
          !dark && !errorMsg && !hasFocus && !isTouched && !hasText,
        'rounded-lg bg-secondary-200': dark,
        'text-white': dark && !errorMsg && !hasFocus && !hasText,
        'text-alert': errorMsg,
        'text-primary': hasFocus,
        'active-label': hasFocus || hasText,
        'text-black': hasText && !hasFocus && !errorMsg,
        'text-gray-400': disabled,
        relative: loading && dark,
      }"
      @click="onClickLabel"
    >
      <svg
        v-if="loading && dark"
        height="52"
        :width="labelWidth"
        class="absolute left-0"
      >
        <path
          class="loadingDarkPath"
          :d="
            `M1 8 a8,8 0 0 1 8,-7 H ${labelWidth -
              9} a8,8 0 0 1 8,8 V 42 a8,8 0 0 1 -8,8 H 9 a8,8 0 0 1 -8,-8 Z`
          "
          fill="none"
          stroke-width="2"
          stroke="#fff"
        />
      </svg>
      <div
        class="inputContainer flex-grow flex justify-between items-center relative pt-2"
        :class="{
          'pb-2': dark,
          'border-b': !dark,
          'border-black':
            inputColor === 'DEFAULT' ||
            inputColor === 'VALID_DEFAULT' ||
            inputColor === 'VALID_PRIMARY',
          'border-primary': inputColor === 'PRIMARY',
          'border-alert': inputColor === 'ALERT',
          'border-gray-400': disabled,
          'loading overflow-hidden': loading && !dark,
        }"
      >
        <GxIcon
          v-if="innerIcon"
          class="mr-4"
          :class="{
            'text-white': dark && leftIconColor === 'DEFAULT',
            'text-black': !dark && leftIconColor === 'DEFAULT',
            'text-primary': leftIconColor === 'PRIMARY',
            'text-alert': leftIconColor === 'ALERT',
            'text-gray-400': disabled,
          }"
          :icon="innerIcon"
        />
        <!-- Replacing v-model with the :value / @input combo due to text composition in Android breaking validation -->
        <input
          :id="_uid"
          ref="gxInput"
          :value="innerValue"
          :type="innerType"
          :aria-label="label"
          :placeholder="dark ? placeholder : ''"
          :disabled="disabled || loading"
          :accept="accept"
          :name="name"
          :maxlength="pattern === 'taxId' ? 13 : maxlength"
          :inputmode="inputmodeInner"
          class="min-w-0"
          :class="{
            errorDarkInput: dark && errorMsg,
            'text-right': pattern === 'money',
            'w-full text-alert outline-none border-none bg-transparent label-hidden error': errorMsg,
            'w-full outline-none border-none bg-transparent text-black':
              !dark && !errorMsg,
            'dark w-full text-white outline-none border-none bg-transparent label-hidden':
              dark && !errorMsg,
            'text-black': hasText && !hasFocus && !errorMsg,
            'text-gray-400': disabled,
            gxDateInput: pattern === 'date',
          }"
          :autocomplete="autocompleteInner"
          @input="onInput"
          @focus="onFocus"
          @change="$emit('change')"
          @blur="onBlur"
          @keypress="errorMsg = false"
        />
        <span
          :class="{
            hidden: dark,
            'gx-left-8': innerIcon,
          }"
          class="gxLabelText"
          >{{ label }}
        </span>
        <p
          v-if="type === 'file' && value"
          class="file-name text-black w-full pr-4"
          >{{ value }}</p
        >
        <!-- Toggle password visibility on and off for pattern="password" -->
        <p
          v-if="pattern === 'money' && hasText"
          class="text-black ml-2 gxCurrency"
          >{{ iconRight }}</p
        >
        <GxIcon
          v-if="innerIconRight && pattern !== 'money' && pattern !== 'date'"
          class="ml-4 flinnerIconRightex-shrink-0"
          :class="{
            'text-black':
              !dark &&
              (rightIconColor === 'DEFAULT' ||
                rightIconColor === 'VALID_DEFAULT'),
            'text-white':
              dark &&
              (rightIconColor === 'DEFAULT' ||
                rightIconColor === 'VALID_DEFAULT'),
            'text-primary':
              rightIconColor === 'PRIMARY' ||
              rightIconColor === 'VALID_PRIMARY',
            'text-alert': rightIconColor === 'ALERT',
          }"
          :dark="dark"
          :icon="innerIconRight"
          transparent
          @click.prevent="onIconRightClick"
        />
      </div>
    </label>
    <p
      v-if="assistive || errorMsg"
      class="ml-4 mt-1 gxAssistive text-left text-alert"
      :class="{
        'text-white': dark,
      }"
      >{{ errorMsg ? errorMsg : assistive }}</p
    >
    <Datetime
      v-if="pattern === 'date'"
      ref="datetime"
      v-model="date"
      type="date"
      zone="local"
      value-zone="local"
      :auto="!phrases"
      :week-start="7"
      :min-datetime="minDatetime"
      :phrases="phrases || { ok: 'OK', cancel: 'Cancelar' }"
      class="hideVCalendarInput"
    >
      <template v-if="!phrases" slot="button-cancel">
        <div></div>
      </template>
      <template v-if="!phrases" slot="button-confirm">
        <div></div>
      </template>
    </Datetime>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.gxInput {
  min-height: 4.5rem;
  font-size: 1.125rem;
  line-height: 1.3rem;
}
.gxCurrency {
  font-size: 1.125rem;
  line-height: 1.125rem;
}
input,
input::-webkit-input-placeholder {
  font-size: 1.125rem;
  caret-color: var(--primary);
}
input.dark,
input.dark::-webkit-input-placeholder {
  color: white;
  caret-color: var(--primary);
}
input.error,
input.errorDarkInput,
input.errorDarkInput::-webkit-input-placeholder {
  color: var(--alert);
  caret-color: var(--alert);
}
.gxAssistive {
  font-size: 0.75rem;
}
.loading::after {
  position: absolute;
  bottom: 0;
  content: '';
  border-bottom: 1px solid var(--primary);
  animation: loading 1.3s ease-in-out infinite;
}

@keyframes loading {
  0% {
    width: 0;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 100%;
    transform: translate(100%);
  }
}
label {
  --dashArray: 0;
  --dashOffset: 0;
}
.loadingDarkPath {
  stroke-dasharray: var(--dashArray);
  animation: dash 5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: var(--dashOffset);
  }
}
.inputContainer {
  height: 50px;
}
input {
  letter-spacing: 1px;
}
span {
  position: absolute;
  top: 1.25rem;
  box-sizing: border-box;
  line-height: 1rem;
  transition: all 0.2s ease 0s;
}
.gx-left-8 {
  left: 2rem;
}

// It seems tha this selector disables input:focus in firefox
input:-webkit-autofill + span {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.625rem;
  line-height: 12px;
}

input:focus + span:not(.label-hidden),
.active-label span:not(.label-hidden) {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.625rem;
  line-height: 12px;
}

span.label-hidden,
span.label-hidden {
  font-size: 0.75rem;
  transform: translate(0, 1rem);
}
input:-moz-ui-invalid {
  border: none;
  outline: none;
  box-shadow: 0 0 0;
}
input:-webkit-autofill {
  top: 1.25rem;
  bottom: 1rem;
  color: var(--black);
  background-color: transparent;
  border: none;
  -webkit-box-shadow: 0 0 0 1000px var(--white) inset;
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--black);
}
input.dark:-webkit-autofill {
  color: white;
  -webkit-box-shadow: 0 0 0 1000px var(--secondary-200) inset;
  -webkit-text-fill-color: white;
}
// input.dark:-webkit-autofill,
// input.dark:-webkit-autofill:hover,
// input.dark:-webkit-autofill:focus,
// input.dark:-webkit-autofill:active  {
//     -webkit-box-shadow: 0 0 0 30px red inset !important;
// }
//Firefox invalid state for inputs such as email
input:invalid,
input:-moz-ui-invalid {
  border: none;
  outline: none;
  box-shadow: 0 0 0 1000px var(--secondary-200) inset;
}
.nunitoFamily {
  font-family: 'Muli';
}
input[type='file'] {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
}
.file-name {
  position: absolute;
  top: 1.5rem;
  left: 0;
  box-sizing: border-box;
  overflow: hidden;
  line-height: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media only screen and (max-width: 800px) {
  input:-webkit-autofill + span,
  input:focus + span:not(.label-hidden),
  .active-label span:not(.label-hidden) {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0.875rem;
    line-height: 12px;
  }
}

@media screen and (min-width: 768px) {
  .gxInput {
    min-height: 4.125rem;
    font-size: 0.75rem;
    line-height: 0.875rem;
  }
  input,
  input::-webkit-input-placeholder {
    font-size: 0.75rem;
  }
  input.dark,
  input.dark::-webkit-input-placeholder {
    color: var(--white);
  }
  input:focus + span:not(.label-hidden),
  .active-label span:not(.label-hidden) {
    // font-size: 0.625rem;
  }
  .gxAssistive {
    font-size: 0.625rem;
  }
}
// Hide caret for date inputs
.gxDateInput {
  caret-color: transparent;
}

@screen de {
  .gxCurrency {
    font-size: 0.75rem;
  }
}
</style>
<style lang="scss">
// Hide Calendar default input
// Can't actually hide since it's needed to open calendar popup
.hideVCalendarInput {
  position: relative;
  overflow: hidden;
}
.hideVCalendarInput > input {
  position: absolute;
  left: -100%;
}
// Overwrite VCalendar styles
.vdatetime-popup__header {
  display: none;
}
.vdatetime-popup {
  border-radius: 0.5rem;
}
.vdatetime-popup__actions,
.vdatetime-calendar__month__day,
.vdatetime-calendar__month__weekday {
  font-family: 'Muli';
}
.vdatetime-calendar__month__day--selected > span > span,
.vdatetime-calendar__month__day--selected:hover > span > span {
  background-color: var(--secondary-300);
}
.vdatetime-calendar__month__weekday {
  visibility: hidden;
}
.vdatetime-calendar__month__weekday::first-letter {
  padding-left: 15px;
  visibility: visible;
}
.vdatetime-calendar__current--month {
  text-transform: lowercase;
}
.vdatetime-calendar__navigation * {
  font-family: 'Muli';
  font-size: 24px;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: 0;
}
</style>

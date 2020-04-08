<script>
import GxTextField from './GxTextField'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldPhone',
  components: {
    GxTextField,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: 'phone',
    },
  },
  data() {
    return {
      phoneMaxLength: 15,
      validationFn: inputValidators['phone'],
    }
  },
  methods: {
    updateValue(event) {
      // Remove invalid characters
      let parsedValue = event.target.value.replace(
        /[A-Za-z`~!#$%^&*¬|×÷£¡₩¥€=¨Ç¿?;:'“‘,‘•",·<>[\]\\/]/gi,
        ''
      )
      const nonNumericCharsCount = parsedValue.match(/\D/gi)
        ? parsedValue.match(/\D/gi).length
        : 0

      this.phoneMaxLength = 15 + nonNumericCharsCount

      if (this.phoneMaxLength < parsedValue.length) {
        parsedValue = parsedValue.slice(0, this.phoneMaxLength)
      }

      event.target.value = parsedValue
      this.$emit('input', parsedValue)
    },
  },
}
</script>
<template>
  <!-- Wrapper elements should only listen for the pureInput, which emits the whole event object instead of event.target.value -->
  <GxTextField
    :value="value"
    :label="label"
    pattern="tel"
    inputmode="tel"
    :required="required"
    :validation-fn="validationFn"
    :left-icon="leftIcon"
    @pureInput="updateValue"
  />
</template>

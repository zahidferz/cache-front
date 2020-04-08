<script>
import GxTextField from './GxTextField'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldName',
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
    autofocus: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      validationFn: inputValidators['name'],
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
<template>
  <!-- Wrapper elements should only listen for the pureInput, which emits the whole event object instead of event.target.value -->
  <GxTextField
    :validation-fn="validationFn"
    :value="value"
    :label="label"
    :required="required"
    :autofocus="autofocus"
    :disabled="disabled"
    :left-icon="leftIcon"
    @pureInput="updateValue"
  />
</template>

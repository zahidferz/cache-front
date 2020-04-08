<script>
import GxTextField from './GxTextField'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldEmail',
  components: {
    GxTextField,
  },
  props: {
    forId: {
      type: String,
      default: '',
    },
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
    name: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'email',
    },
    leftIcon: {
      type: String,
      default: 'email',
    },
  },
  data() {
    return {
      validationFn: inputValidators['email'],
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
    :value="value"
    :label="label"
    :error="error"
    :name="name"
    :disabled="disabled"
    :for-id="forId"
    :autocomplete="autocomplete"
    :autofocus="autofocus"
    :required="required"
    inputmode="email"
    :validation-fn="validationFn"
    :left-icon="leftIcon"
    @pureInput="updateValue"
  />
</template>

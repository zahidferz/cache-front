<script>
import GxTextField from './GxTextField'
// import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldBusinessName',
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
    name: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    leftIcon: {
      type: String,
      default: 'domain',
    },
  },
  data() {
    return {}
  },
  methods: {
    updateValue(event) {
      // Remove invalid characters
      let parsedValue = event.target.value.replace(
        /[^0-9a-zA-Z áéíóúÁÉÍÓÚÑñ´]/,
        ''
      )

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
    :error="error"
    :name="name"
    :for-id="forId"
    :autocomplete="autocomplete"
    :required="required"
    :left-icon="leftIcon"
    @pureInput="updateValue"
  />
</template>

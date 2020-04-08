<script>
import GxTextFieldDark from './GxTextFieldDark'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldDarkTaxId',
  components: {
    GxTextFieldDark,
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
    autofocusTimeout: {
      type: Number,
      default: 550,
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
    return {
      validationFn: inputValidators['taxId'],
    }
  },
  methods: {
    updateValue(event) {
      // Remove invalid characters
      let parsedValue = event.target.value.slice(0, 13).toUpperCase()

      event.target.value = parsedValue
      this.$emit('input', parsedValue)
    },
  },
}
</script>
<template>
  <!-- Wrapper elements should only listen for the pureInput, which emits the whole event object instead of event.target.value -->
  <GxTextFieldDark
    :value="value"
    :label="label"
    :error="error"
    :name="name"
    :for-id="forId"
    :autocomplete="autocomplete"
    :required="required"
    :autofocus="autofocus"
    :autofocus-timeout="autofocusTimeout"
    :validation-fn="validationFn"
    :left-icon="leftIcon"
    v-on="$listeners"
    @pureInput="updateValue"
  />
</template>

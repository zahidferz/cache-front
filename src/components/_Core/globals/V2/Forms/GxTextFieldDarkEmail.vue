<script>
import GxTextFieldDark from './GxTextFieldDark'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldDarkEmail',
  components: {
    GxTextFieldDark,
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
    autofocusTimeout: {
      type: Number,
      default: 550,
    },
    assistive: {
      type: String,
      default: '',
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
  <GxTextFieldDark
    :value="value"
    :label="label"
    inputmode="email"
    left-icon="email"
    :validation-fn="validationFn"
    :disabled="disabled"
    :error="error"
    :assistive="assistive"
    :required="required"
    :autofocus="autofocus"
    :autofocus-timeout="autofocusTimeout"
    @pureInput="updateValue"
    v-on="$listeners"
  />
</template>

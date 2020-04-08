<script>
import GxTextFieldDark from './GxTextFieldDark'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldDarkName',
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
    assistive: {
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
  <GxTextFieldDark
    :validation-fn="validationFn"
    :value="value"
    :label="label"
    :required="required"
    :assistive="assistive"
    :autofocus="autofocus"
    :disabled="disabled"
    left-icon="face"
    v-on="$listeners"
    @pureInput="updateValue"
  />
</template>

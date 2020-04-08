<script>
import GxTextField from './GxTextField'
// import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldCiec',
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
      default: 'lock',
    },
  },
  data() {
    return {
      showPassword: false,
      // validationFn: inputValidators['taxId'],
    }
  },
  computed: {
    rightIcon() {
      if (this.value) {
        return this.showPassword ? 'visibility_off' : 'visibility'
      }
      return null
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    updateValue(event) {
      const deleteNotCsdOrCiec = (text) =>
        text.replace(/[^ñÑ0-9a-zA-Z-._%&]/, '')

      // Remove invalid characters
      let parsedValue = deleteNotCsdOrCiec(event.target.value)

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
    :input-classes="{
      'font-nunito': !showPassword,
    }"
    :type="showPassword ? 'text' : 'password'"
    :right-icon="rightIcon"
    :right-icon-click-handler="toggleShowPassword"
    :for-id="forId"
    :autocomplete="autocomplete"
    :required="required"
    :left-icon="leftIcon"
    v-on="$listeners"
    @pureInput="updateValue"
  />
</template>

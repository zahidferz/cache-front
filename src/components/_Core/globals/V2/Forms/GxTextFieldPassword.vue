<script>
import GxTextField from './GxTextField'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldPassword',
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
      default: 'new-password',
    },
    leftIcon: {
      type: String,
      default: 'lock',
    },
  },
  data() {
    return {
      showPassword: false,
      validationFn: inputValidators['password'],
    }
  },
  computed: {
    rightIcon() {
      return this.showPassword ? 'visibility_off' : 'visibility'
    },
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword

      // const input = this.$el.querySelector('input')
      // input.focus()
      // input.setSelectionRange(3, 3)
    },
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
<template>
  <!-- Wrapper elements should only listen for the pureInput, which emits the whole event object instead of event.target.value -->
  <GxTextField
    :for-id="forId"
    :input-classes="{
      'font-nunito': !showPassword,
    }"
    :validation-fn="validationFn"
    :value="value"
    :label="label"
    :type="showPassword ? 'text' : 'password'"
    :right-icon="rightIcon"
    :right-icon-click-handler="toggleShowPassword"
    :required="required"
    :name="name"
    :autocomplete="autocomplete"
    :left-icon="leftIcon"
    :error="error"
    @pureInput="updateValue"
  />
</template>

<script>
import GxTextFieldDark from './GxTextFieldDark'
import inputValidators from '@src/utils/input-validators.js'

export default {
  name: 'GxTextFieldDarkPassword',
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
      // input.setSelectionRange(this.value.length, this.value.length)
    },
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
</script>
<template>
  <!-- Wrapper elements should only listen for the pureInput, which emits the whole event object instead of event.target.value -->
  <GxTextFieldDark
    :input-classes="{
      'font-nunito': !showPassword,
    }"
    :validation-fn="validationFn"
    :value="value"
    :label="label"
    :assistive="assistive"
    :type="showPassword ? 'text' : 'password'"
    :right-icon="rightIcon"
    :right-icon-click-handler="toggleShowPassword"
    :required="required"
    :disabled="disabled"
    :error="error"
    :autofocus="autofocus"
    left-icon="lock"
    v-on="$listeners"
    @pureInput="updateValue"
  />
</template>

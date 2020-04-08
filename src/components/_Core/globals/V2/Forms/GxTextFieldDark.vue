<script>
import { createInputService } from './GxTextFieldDarkStateMachine'
// import inputValidators from '@src/utils/input-validators.js'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'

export default {
  name: 'GxTextFieldDark',
  components: {
    GxIcon2,
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
    type: {
      type: String,
      default: 'text',
    },
    inputmode: {
      type: String,
      default: 'text',
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autofocusTimeout: {
      type: Number,
      default: 550,
    },
    // A validation function that returns null when the input is valid
    // and a string with the relevant error message when invalid
    // It can return a different string according to the invalid condition
    validationFn: {
      type: Function,
      default: null,
    },
    assistive: {
      type: String,
      default: '',
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
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
    rightIconClickHandler: {
      type: Function,
      default: null,
    },
    inputClasses: {
      type: Object,
      default: () => ({}),
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    autocorrect: {
      type: String,
      default: 'off',
    },
  },
  data() {
    return {
      // innerValue: this.value,
      currentState: null,
      inputService: null,
      assistiveStyle: '',
    }
  },
  computed: {
    showAssistive() {
      return !!this.assistive
    },
    // used to set a min-height when passing assistive as empty string
    innerValidationFn() {
      if (this.validationFn) return this.validationFn

      return null
      // switch (this.pattern) {
      //   case 'email':
      //     return inputValidators[this.pattern]
      //   // const deleteWhiteSpace = (text) => text.replace(/\s/g, '')
      //   // const deleteSpecialCharacters = (text) =>
      //   //   text.replace(/[`~!#$%^&*()¬|×÷£¡₩¥€=¨Ç¿?;:'“‘,‘•",·<>{}[\]\\/]/gi, '')
      //   default:
      //     return null
      // }
    },
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    },
    innerRightIconClickHandler() {
      if (this.rightIconClickHandler) return this.rightIconClickHandler

      return () => {}
    },
  },
  watch: {
    assistive() {
      this.setAssistiveStyle()
    },
    value(newVal) {
      this.inputService.send('TYPING', { value: newVal })
    },
    error(newError) {
      if (newError) {
        this.inputService.send('ERROR', { errorMsg: newError })
      }
    },
    // Watcher for debugging purposes only
    currentState(newVal) {
      /* eslint-disable */
      // console.log('Current state: ', JSON.stringify(newVal.value))
      // console.log('Current context: ', JSON.stringify(newVal.context))
      /* eslint-enable */
    },
  },
  created() {
    this.inputService = createInputService({
      value: '',
      required: this.required,
      validationFn: this.innerValidationFn,
    })
    this.inputService.onTransition((state) => {
      /* eslint-disable */
      // console.log('Transitioning to ', state)
      /* eslint-enable */
      this.currentState = state
    })

    // If a value exists on creation, immediately send a TYPING event with the value
    // for validation
    // We can't do this from the watcher for value, since we need the input service to be available
    if (this.value) {
      this.inputService.send('TYPING', { value: this.value })
    }
  },
  mounted() {
    this.setAssistiveStyle()
    if (this.autofocus && !this.isIOS) {
      this.timeoutSetFocus()
    }
  },
  methods: {
    setFocus() {
      if (!this.$refs.gxInput) return
      this.$refs.gxInput.focus()
    },
    timeoutSetFocus() {
      setTimeout(() => {
        this.setFocus()
      }, this.autofocusTimeout)
    },
    setAssistiveStyle() {
      if (this.assistive && this.$refs && this.$refs.assistive) {
        const minHeight = window
          .getComputedStyle(this.$refs.assistive, null)
          .getPropertyValue('line-height')
        this.assistiveStyle = `min-height: ${minHeight}`
      }
    },
    isValid() {
      this.inputService.send('TYPING', {
        value: this.inputService.state.context.value,
      })

      return (
        !this.inputService.state.context.errorMsg &&
        !this.inputService.state.matches('blurred.emptyAndRequired')
      )
    },
    updateValue(event) {
      this.$emit('input', event.target.value)
      // Wrapper inputs such as GxTextFieldPhone need the original event
      // to be able to override the <input /> value when restricting or modifying the
      // original user input by setting event.target.value = "Some parsed value by the parent"
      this.$emit('pureInput', event)
    },
    onFocus() {
      this.inputService.send('FOCUS')
      this.$emit('focus')
    },
    onBlur() {
      this.inputService.send('BLUR')
      this.$emit('blur')
    },
  },
}
</script>
<template>
  <div class="w-full">
    <div class="relative flex flex-col justify-end">
      <GxIcon2
        v-if="leftIcon"
        :icon="leftIcon"
        class="absolute left-0 pl-4 bottom-0 bottom-0 text-lg de:text-xs gxIcon"
        :class="{
          'cursor-not-allowed text-secondary-100': disabled,
          'text-white':
            !disabled &&
            (inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.empty') ||
              inputService.state.matches('blurred.inactive')),
          'text-primary':
            !disabled &&
            (inputService.state.matches('focused.typing') ||
              inputService.state.matches('focused.active') ||
              inputService.state.matches('focused.valid') ||
              inputService.state.matches('focused.validAndRequired') ||
              inputService.state.matches('blurred.validAndRequired')),
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.error') ||
              inputService.state.matches('focused.emptyAndRequired') ||
              inputService.state.matches('blurred.emptyAndRequired') ||
              inputService.state.matches('blurred.error')),
        }"
      />
      <label
        :for="_uid"
        class="absolute leading-normal cursor-text text-lg de:text-xs pl-4 bottom-0 gxLabel pb-3"
        :class="{
          hidden:
            inputService.state.matches('focused') ||
            (inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.validAndRequired')),
          'cursor-not-allowed': disabled,
          'text-secondary-100': disabled,
          'text-white':
            !disabled &&
            (inputService.state.matches('blurred.inactive') ||
              inputService.state.matches('blurred.empty')),
          'text-alert':
            !disabled &&
            (inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          gxIconPaddingLeftLarge: leftIcon,
          'pr-11': rightIcon,
        }"
      >
        {{ label }}
      </label>
      <!-- Need leading-normal to account for accents in uppercase letters -->
      <input
        :id="_uid"
        ref="gxInput"
        :value="value"
        :type="type"
        :inputmode="inputmode"
        :autocomplete="autocomplete"
        :autofocus="autofocus && !isIOS"
        :autofocus-timeout="autofocusTimeout"
        :name="_uid"
        :disabled="disabled"
        class="text-lg de:text-xs leading-normal shadow w-full pr-9 focus:outline-none gxInput rounded-lg gxInput"
        :class="{
          ...inputClasses,
          gxCaretPrimary: inputService.state.matches('focused'),
          gxCaretAlert:
            inputService.state.matches('focused.error') ||
            inputService.state.matches('focused.emptyAndRequired'),
          'cursor-not-allowed bg-primary-550': disabled,
          'text-secondary-100': disabled,
          'bg-secondary-200': !disabled,
          'hover:bg-secondary':
            !disabled && inputService.state.matches('blurred'),
          'pl-4': !leftIcon,
          gxIconPaddingLeftLarge: leftIcon,
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          'text-white':
            !disabled &&
            ((inputService.state.matches('focused') &&
              !inputService.state.matches('focused.error')) ||
              inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.validAndRequired')),
        }"
        @input="updateValue"
        @focus="onFocus"
        @blur="onBlur"
      />
      <GxIcon2
        v-if="rightIcon"
        :icon="rightIcon"
        class="absolute right-0 pr-4 bottom-0 gxIcon text-lg de:text-xs"
        :class="{
          'cursor-pointer': innerRightIconClickHandler,
          'text-white':
            !disabled &&
            !(
              inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired') ||
              inputService.state.matches('focused.validAndRequired') ||
              inputService.state.matches('blurred.validAndRequired') ||
              inputService.state.matches('focused.valid') ||
              inputService.state.matches('blurred.valid')
            ),
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          'text-primary':
            (!disabled &&
              (inputService.state.matches('focused.valid') ||
                inputService.state.matches('blurred.valid'))) ||
            inputService.state.matches('focused.validAndRequired') ||
            inputService.state.matches('blurred.validAndRequired'),
        }"
        @click="innerRightIconClickHandler"
      />
      <GxIcon2
        v-else-if="
          inputService.state.matches('focused.emptyAndRequired') ||
            inputService.state.matches('blurred.emptyAndRequired')
        "
        icon="cancel"
        class="absolute text-alert right-0 pr-4 bottom-0 gxIcon text-lg de:text-xs"
      />
      <GxIcon2
        v-else-if="
          inputService.state.matches('focused.validAndRequired') ||
            inputService.state.matches('blurred.validAndRequired')
        "
        icon="check_circle"
        class="absolute text-primary right-0 pr-4 bottom-0 gxIcon text-lg de:text-xs"
      />
    </div>
    <p
      v-if="
        inputService.state.matches('focused.emptyAndRequired') ||
          inputService.state.matches('blurred.emptyAndRequired')
      "
      class="text-sm de:text-2xs mt-2 text-white"
      >Este campo es requerido</p
    >
    <p
      v-else-if="
        inputService.state.context.errorMsg &&
          (inputService.state.matches('focused.error') ||
            inputService.state.matches('blurred.error'))
      "
      class="text-sm de:text-2xs mt-2 text-white"
      >{{ inputService.state.context.errorMsg }}</p
    >
    <p
      v-else-if="showAssistive"
      ref="assistive"
      class="text-sm de:text-2xs mt-2 text-white"
      :style="assistiveStyle"
      >{{ assistive }}</p
    >
  </div>
</template>
<style lang="scss" scoped>
.gxCaretPrimary {
  caret-color: var(--primary);
}
.gxCaretAlert {
  caret-color: var(--alert);
}
.gxLabel {
  padding-bottom: 11px;
}
.gxInput {
  padding-top: 12px;
  padding-bottom: 11px;
}
.gxIcon {
  padding-bottom: 16px;
}
.gxIconPaddingLeftLarge {
  padding-left: 50px;
}

@media screen and (min-width: 768px) {
  .gxIcon {
    padding-bottom: 16px;
  }
  .gxLabel {
    padding-bottom: 13px;
  }
  .gxInput {
    padding-top: 14px;
    padding-bottom: 13px;
  }
  .gxIconPaddingLeftLarge {
    padding-left: 44px;
  }
}
</style>

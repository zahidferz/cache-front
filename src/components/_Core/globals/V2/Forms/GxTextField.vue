<script>
import { createInputService } from './GxTextFieldStateMachine'
// import inputValidators from '@src/utils/input-validators.js'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'

export default {
  name: 'GxTextField',
  components: {
    GxIcon2,
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
    name: {
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
    maxlength: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // innerValue: this.value,
      currentState: null,
      inputService: null,
    }
  },
  computed: {
    innerForId() {
      return this.forId || this._uid
    },
    innerMaxLength() {
      if (this.maxlength) return this.maxlength

      return null
    },
    innerType() {
      return this.type
    },
    innerInputMode() {
      if (this.pattern === 'phone') return 'tel'

      return 'text'
    },
    innerRightIconClickHandler() {
      if (this.rightIconClickHandler) return this.rightIconClickHandler

      return () => {}
    },
    innerValidationFn() {
      if (this.validationFn) return this.validationFn

      return null
      // switch (this.pattern) {
      //   case 'email':
      //     return inputValidators[this.pattern]
      //   case 'phone':
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
  },
  watch: {
    value(newVal) {
      this.inputService.send('TYPING', { value: newVal })
    },
    error(newError) {
      if (newError) {
        this.inputService.send('ERROR', { errorMsg: newError })
      } else {
        // This case should only run if we receive an empty error, which means we programatically want to remove
        // the error case, which should only happen for custom errors passed via props
        // we just pass the current value to a TYPING event
        const currentValue = this.value
        this.inputService.send('TYPING', { value: currentValue })
      }
    },
    // Watcher for debugging purposes only
    currentState(newVal) {
      /* eslint-disable */
      // console.log('Current state: ', JSON.stringify(newVal.value))
      // console.log('Current context: ', JSON.stringify(newVal.context))
      /* eslint-enable */
    },
    autofocus(newVal) {
      if (newVal) {
        this.timeoutSetFocus()
      }
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
    if (this.autofocus && !this.isIOS) {
      this.timeoutSetFocus()
    }
  },
  methods: {
    setFocus() {
      this.$refs.gxInput.focus()
    },
    timeoutSetFocus() {
      setTimeout(() => {
        this.setFocus()
        // Need to wait for a page transition to occur. We wait 300ms to make sure virtual keyboard is closed,
        // Plus 250ms for the page transition animation to happen.
      }, 550)
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
    <div class="relative flex flex-col justify-end group">
      <div class="absolute left-0 bottom-0">
        <slot name="left-icon-slot">
          <GxIcon2
            v-if="leftIcon"
            :icon="leftIcon"
            class=" pl-2 text-lg de:text-xs gxIcon"
            :class="{
              'cursor-not-allowed': disabled,
              'text-black': inputService.state.matches('blurred.valid'),
              'text-primary':
                !disabled &&
                (inputService.state.matches('focused.typing') ||
                  inputService.state.matches('focused.active') ||
                  inputService.state.matches('focused.valid') ||
                  inputService.state.matches('focused.validAndRequired') ||
                  inputService.state.matches('blurred.validAndRequired')),
              'text-alert':
                !disabled &&
                (inputService.state.matches('focused.errorAndRequired') ||
                  inputService.state.matches('focused.error') ||
                  inputService.state.matches('focused.emptyAndRequired') ||
                  inputService.state.matches('blurred.emptyAndRequired') ||
                  inputService.state.matches('blurred.errorAndRequired') ||
                  inputService.state.matches('blurred.error')),
              'text-gray-500': disabled,
              'text-gray-700':
                !disabled && inputService.state.matches('blurred.inactive'),
            }"
          />
        </slot>
      </div>
      <label
        :for="innerForId"
        class="absolute leading-normal cursor-text text-sm de:text-2xs pl-2 bottom-0 gxLabel"
        style="transition: transform .3s;"
        :class="{
          'group-hover:text-black':
            !disabled &&
            inputService.state.matches('blurred') &&
            !(
              inputService.state.matches('blurred.errorAndRequired') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')
            ),
          'cursor-not-allowed': disabled,
          'text-lg de:text-xs':
            inputService.state.matches('blurred.inactive') ||
            inputService.state.matches('blurred.empty') ||
            inputService.state.matches('blurred.emptyAndRequired'),
          'gxTranslateTopLeft gxLabel--active':
            inputService.state.matches('focused') ||
            inputService.state.matches('blurred.validAndRequired') ||
            inputService.state.matches('blurred.valid') ||
            inputService.state.matches('blurred.errorAndRequired') ||
            inputService.state.matches('blurred.error'),
          'text-black':
            !disabled &&
            (inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.validAndRequired')),
          'text-gray-500': disabled,
          'text-gray-700':
            !disabled && inputService.state.matches('blurred.inactive'),
          'text-primary':
            !disabled &&
            validationFn &&
            (inputService.state.matches('focused.typing') ||
              inputService.state.matches('focused.valid') ||
              inputService.state.matches('focused.validAndRequired') ||
              inputService.state.matches('focused.active')),
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.errorAndRequired') ||
              inputService.state.matches('blurred.errorAndRequired') ||
              inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('focused.emptyAndRequired') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          'pl-9': leftIcon,
          'pr-9': rightIcon,
        }"
      >
        {{ label }}
      </label>
      <!-- Need leading-normal to account for accents in uppercase letters -->
      <input
        :id="innerForId"
        ref="gxInput"
        :value="value"
        :type="innerType"
        :name="name"
        :disabled="disabled"
        :inputmode="inputmode"
        :autofocus="isIOS || $mq === 'mo' ? false : autofocus"
        :autocomplete="autocomplete"
        :autocorrect="autocorrect"
        :maxlength="innerMaxLength"
        class="text-lg de:text-xs rounded-lg rounded-b-none bg-white leading-normal shadow w-full pr-9 focus:outline-none gxInput"
        :class="{
          ...inputClasses,
          'border-b': !disabled,
          'cursor-not-allowed': disabled,
          'hover:bg-gray-100 hover:text-black':
            !disabled && inputService.state.matches('blurred'),
          'pl-2': !leftIcon,
          'pl-9': leftIcon,
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.errorAndRequired') ||
              inputService.state.matches('blurred.errorAndRequired') ||
              inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
          'text-black': disabled && isIOS,
          'text-gray-500': disabled && !isIOS,
          'border-gray-300':
            !disabled &&
            (inputService.state.matches('blurred.valid') ||
              inputService.state.matches('blurred.validAndRequired')),
          'border-alert':
            !disabled &&
            (inputService.state.matches('blurred.emptyAndRequired') ||
              inputService.state.matches('focused.emptyAndRequired') ||
              inputService.state.matches('blurred.errorAndRequired') ||
              inputService.state.matches('blurred.error')),
          'border-black':
            !disabled &&
            (inputService.state.matches('focused.valid') ||
              inputService.state.matches('focused.validAndRequired')),
          'border-gray-500': disabled,
        }"
        @input="updateValue"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div
        class="gxInputMargin"
        :class="{
          'bg-primary': inputService.state.matches('focused') && validationFn,
          'bg-black':
            inputService.state.matches('focused') &&
            !inputService.state.matches('focused.emptyAndRequired') &&
            !validationFn,
          'bg-alert':
            inputService.state.matches('blurred.emptyAndRequired') ||
            inputService.state.matches('blurred.errorAndRequired') ||
            inputService.state.matches('blurred.error'),
          'bg-alert':
            inputService.state.matches('focused.errorAndRequired') ||
            inputService.state.matches('focused.error') ||
            inputService.state.matches('focused.emptyAndRequired') ||
            inputService.state.matches('blurred.emptyAndRequired'),
          'gxInputMargin--active': inputService.state.matches('focused'),
        }"
      ></div>
      <template>
        <div class="absolute right-0 bottom-0">
          <slot
            name="right-slot"
            :classes="{
              'text-alert':
                !disabled &&
                (inputService.state.matches('focused.errorAndRequired') ||
                  inputService.state.matches('blurred.errorAndRequired') ||
                  inputService.state.matches('focused.error') ||
                  inputService.state.matches('blurred.error') ||
                  inputService.state.matches('blurred.emptyAndRequired')),
              'text-primary':
                (!disabled &&
                  (inputService.state.matches('focused.valid') ||
                    inputService.state.matches('blurred.valid'))) ||
                inputService.state.matches('focused.validAndRequired') ||
                inputService.state.matches('blurred.validAndRequired'),
            }"
          >
            <GxIcon2
              v-if="rightIcon"
              :icon="rightIcon"
              class="gxIcon text-lg de:text-xs p-2"
              :class="{
                'cursor-pointer': innerRightIconClickHandler,
                'text-alert':
                  !disabled &&
                  (inputService.state.matches('focused.errorAndRequired') ||
                    inputService.state.matches('blurred.errorAndRequired') ||
                    inputService.state.matches('focused.error') ||
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
                validationFn &&
                  (inputService.state.matches('focused.emptyAndRequired') ||
                    inputService.state.matches('blurred.emptyAndRequired') ||
                    inputService.state.matches('blurred.errorAndRequired') ||
                    inputService.state.matches('focused.errorAndRequired'))
              "
              icon="cancel"
              class="absolute text-alert right-0 pr-2 bottom-0 gxIcon text-lg de:text-xs"
            />
            <GxIcon2
              v-else-if="
                validationFn &&
                  (inputService.state.matches('focused.validAndRequired') ||
                    inputService.state.matches('blurred.validAndRequired'))
              "
              icon="check_circle"
              class="absolute text-primary right-0 pr-2 bottom-0 gxIcon text-lg de:text-xs"
            />
          </slot>
        </div>
      </template>
    </div>
    <slot name="assistive-slot">
      <p
        v-if="
          inputService.state.matches('focused.emptyAndRequired') ||
            inputService.state.matches('blurred.emptyAndRequired')
        "
        class="text-sm de:text-2xs mt-1 text-alert"
        >Este campo es requerido</p
      >
      <p
        v-else-if="
          inputService.state.context.errorMsg &&
            (inputService.state.matches('focused.errorAndRequired') ||
              inputService.state.matches('blurred.errorAndRequired') ||
              inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error'))
        "
        class="text-sm de:text-2xs mt-1 text-alert pl-2"
        >{{ inputService.state.context.errorMsg }}</p
      >
      <p
        v-else-if="assistive"
        class="text-sm de:text-2xs mt-1 text-gray-700 pl-2"
        >{{ assistive }}</p
      >
    </slot>
  </div>
</template>
<style lang="scss" scoped>
/*
This is a rare case where we need to use padding to compensate
for a padding of 8 + 4 and a text of 10 in desktop
and a padding of 8 + 14 and a text of 10 in desktop
The additional padding of 4 above the focused label is so the hover bg color is clear
 */
// .pb-3 {
//   padding-bottom: 10px;
// }
// .gxPaddingTop {
//   padding-top: 1.375rem;
// }

.gxTranslateTopLeft.pl-2 {
  transform: translate3d(0, -22px, 0);
}
.gxTranslateTopLeft.pl-9 {
  transform: translate3d(-28px, -22px, 0);
}
.gxInput {
  padding-top: 20px;
  padding-bottom: 4px;
}
.gxLabel {
  padding-bottom: 6px;
}
.gxLabel--active {
  padding-bottom: 8px;
}
.gxIcon {
  padding-bottom: 12px;
}

@media screen and (min-width: 768px) {
  .gxTranslateTopLeft.pl-2 {
    transform: translate3d(0, -14px, 0);
  }
  .gxTranslateTopLeft.pl-9 {
    transform: translate3d(-28px, -14px, 0);
  }
  .gxInput {
    padding-top: 21px;
    padding-bottom: 4px;
    line-height: 1;
  }
  .gxIcon {
    padding-bottom: 6px;
  }
  .gxLabel {
    padding-bottom: 4px;
  }
  .gxLabel--active {
    padding-bottom: 8px;
  }
}

// Underline animation
.gxInputMargin {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
}
.gxInputMargin--active {
  transition: 0.3s;
  transform: scaleX(1);
}

// OVERRIDE GOOGLE CHROME AGENT STYLESHEET
input:-internal-autofill-selected {
  background-color: var(--white) !important;
}
input:-webkit-autofill {
  background-color: transparent;
  -webkit-box-shadow: 0 0 0 1000px var(--white) inset;
}
</style>

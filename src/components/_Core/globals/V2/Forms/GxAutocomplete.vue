<script>
// ************** IMPORTANT!!!! ***********************
// **** Have a race condition were blur event fires before the click on the option can be triggered
// **** Need to figure out how to delay the blur event
import { createInputService } from './GxAutocompleteStateMachine'
// import inputValidators from '@src/utils/input-validators.js'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
import debounce from 'lodash/debounce'
import deburr from 'lodash/deburr'
import DOMPurify from 'dompurify'
window.deburr = deburr
export default {
  name: 'GxAutocomplete',
  components: {
    GxIcon2,
  },
  directives: {
    cleanhtml: {
      bind: function(el, binding) {
        el.innerHTML = DOMPurify.sanitize(binding.value)
      },
      update: function(el, binding) {
        el.innerHTML = DOMPurify.sanitize(binding.value)
      },
    },
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
    rightIcon: {
      type: String,
      default: 'chevron_right',
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
    // Dropdown specific props
    options: {
      type: Array,
      required: true,
    },
    maxOptions: {
      type: Number,
      default: 5,
    },
    keepTypedValue: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
      searchValue: this.value,
      currentState: null,
      inputService: null,
      highlightedIndex: -1,
      selectedIndex: -1,
      showOptions: false,
      closeMenuTimeout: null,
      mouseHasMoved: false,
      fromClick: false,
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
    },
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    },
    /***********************************************/
    /** ***** Start Dropdown specific options *******/
    /***********************************************/
    deburredAndLowercasedOptions() {
      return this.options.map((option) => {
        return deburr(option).toLowerCase()
      })
    },
    filteredOptions() {
      let result = []
      const deburredAndLowercasedSearchValue = deburr(
        this.searchValue.toLowerCase()
      )
      for (let index = 0; index < this.options.length; index++) {
        if (
          this.deburredAndLowercasedOptions[index].includes(
            deburredAndLowercasedSearchValue
          )
        ) {
          result.push(this.options[index])
        }
      }
      return result
    },
    /*********************************************/
    /** ***** End Dropdown specific options *******/
    /*********************************************/
  },
  watch: {
    value(newVal) {
      this.innerValue = newVal
    },
    innerValue(newVal) {
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
    // Debounce search for performance
    this.debouncedUpdateSearchValue = debounce(this.updateSearchValue, 300)

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
    if (this.autofocus) {
      this.timeoutSetFocus()
    }
  },
  methods: {
    onMouseEnterOption(index) {
      // Require the use to move the mouse before updating the highlighted index, otherwise this will trigger everytime the list
      // gets re-rendered as the user types or uses the arrows
      if (this.mouseHasMoved) {
        this.mouseHasMoved = false
        this.highlightedIndex = index
      }
    },
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
    onInput(event) {
      this.highlightedIndex = -1
      this.innerValue = event.target.value
      this.debouncedUpdateSearchValue(event)
    },
    updateSearchValue(event) {
      this.searchValue = event.target.value
      this.$emit('search', event.target.value)
    },
    onFocus() {
      this.inputService.send('FOCUS')
      this.$emit('focus')
      this.selectInputContent()
      this.showOptions = true
      this.highlightedIndex = -1
      this.selectedIndex = this.highlightedIndex
    },
    selectInputContent() {
      requestAnimationFrame(() => {
        this.$refs.gxInput.setSelectionRange(0, this.innerValue.length)
      })
    },
    onBlur() {
      if (this.fromClick) {
        this.fromClick = false
      } else {
        this.selectOnBlur()
      }
      this.showOptions = false
      this.inputService.send('BLUR')
      this.$emit('blur')
      this.highlightedIndex = -1
      this.selectedIndex = this.highlightedIndex
    },
    selectOnBlur() {
      if (this.keepTypedValue) {
        this.selectOnKeepTypedValue()
      } else {
        this.selectOptionOnNoKeepTypedValue()
      }
    },
    onArrowUp() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1
      } else {
        this.highlightedIndex = Math.min(
          this.filteredOptions.length - 1,
          this.maxOptions - 1
        )
      }
      this.selectedIndex = this.highlightedIndex
    },
    onArrowDown() {
      if (
        this.highlightedIndex <
        Math.min(this.maxOptions - 1, this.filteredOptions.length - 1)
      ) {
        this.highlightedIndex = this.highlightedIndex + 1
      } else {
        this.highlightedIndex = 0
      }
      this.selectedIndex = this.highlightedIndex
    },
    selectOption(option) {
      this.inputService.send('TYPING', {
        value: option,
      })
      this.innerValue = option
      this.$emit('input', option)
    },
    selectOptionOnClick(option) {
      this.selectOption(option)
      const fromClick = true
      this.blurInput(fromClick)
    },
    selectOptionOnKeyDown() {
      this.blurInput()
    },
    selectOnKeepTypedValue() {
      if (this.filteredOptions.length > 0 && this.selectedIndex > -1) {
        const selectedOption = this.filteredOptions[this.selectedIndex]
        this.selectOption(selectedOption)
        return
      }
      this.selectTypedValue()
    },
    selectOptionOnNoKeepTypedValue() {
      if (this.filteredOptions.length > 0 && this.selectedIndex > -1) {
        const selectedOption = this.filteredOptions[this.selectedIndex]
        this.selectOption(selectedOption)
        return
      }
      if (this.value) {
        this.innerValue = this.value
        this.$emit('input', this.innerValue)
        return
      }
      this.selectEmptyValue()
    },
    selectEmptyValue() {
      this.inputService.send('TYPING', {
        value: '',
      })
      this.innerValue = ''
      this.$emit('input', '')
    },
    selectTypedValue() {
      this.inputService.send('TYPING', {
        value: this.innerValue,
      })
      this.innerValue = this.innerValue
      this.$emit('input', this.innerValue)
    },
    blurInput(fromClick = false) {
      this.fromClick = fromClick
      this.$refs.gxInput.blur()
    },
    formattedOption(option) {
      const searchTerm = this.innerValue
        .replace('.', '\\.')
        .replace('+', '\\+')
        .replace('-', '\\-')
        .replace('(', '\\(')
        .replace(')', '\\)')
        .replace('{', '\\{')
        .replace('{', '\\}')
      const regex = new RegExp(`(${deburr(searchTerm)})`, 'ig')
      return deburr(option).replace(
        regex,
        '<span style="background-color:#AAD8FF" class="font-bold">$1</span>'
      )
    },
  },
}
</script>
<template>
  <div class="w-full">
    <div class="relative flex flex-col justify-end group">
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
          'pr-9': rightIcon,
        }"
      >
        {{ label }}
      </label>
      <!-- Need leading-normal to account for accents in uppercase letters -->
      <input
        :id="innerForId"
        ref="gxInput"
        :value="innerValue"
        :type="innerType"
        :name="name"
        :data-testid="label"
        :disabled="disabled"
        :inputmode="inputmode"
        :autofocus="isIOS || $mq === 'mo' ? false : autofocus"
        :autocomplete="autocomplete"
        :autocorrect="autocorrect"
        :maxlength="innerMaxLength"
        class="text-lg de:text-xs pl-2 rounded-lg rounded-b-none bg-white leading-normal shadow w-full pr-9 focus:outline-none gxInput truncate"
        :class="{
          ...inputClasses,
          'border-b': !disabled,
          'cursor-not-allowed': disabled,
          'hover:bg-gray-100 hover:text-black':
            !disabled && inputService.state.matches('blurred'),
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
        @input="onInput"
        @blur="onBlur"
        @keydown.esc="blurInput(false)"
        @focus="onFocus"
        @keydown.prevent.up="onArrowUp"
        @keydown.prevent.down="onArrowDown"
        @keydown.prevent.enter="selectOptionOnKeyDown"
        @keydown.prevent.tab="selectOptionOnKeyDown"
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
      <GxIcon2
        :icon="rightIcon"
        class="absolute right-0 p-2 bottom-0 gxIcon text-lg de:text-xs"
        :class="{
          'cursor-pointer': innerRightIconClickHandler,
          'text-alert':
            !disabled &&
            (inputService.state.matches('focused.errorAndRequired') ||
              inputService.state.matches('blurred.errorAndRequired') ||
              inputService.state.matches('focused.error') ||
              inputService.state.matches('blurred.error') ||
              inputService.state.matches('blurred.emptyAndRequired')),
        }"
        @click="innerRightIconClickHandler"
      />
    </div>
    <!-- Dropdown options -->
    <div
      v-if="showOptions"
      tabindex="-1"
      class="bg-white rounded-tl-lg rounded-b-lg shadow-2"
    >
      <ul
        ref="optionsContainer"
        class="mt-1  w-full focus:outline-none"
        @mousedown.prevent
      >
        <li
          v-for="(option, i) in filteredOptions.slice(0, maxOptions)"
          :key="option + i"
          class="px-2 pt-4 pb-3 de:py-1 text-sm de:text-2xs cursor-pointer flex items-center truncate"
          :class="{
            'bg-secondary-50': highlightedIndex === i,
          }"
          @click="selectOptionOnClick(option)"
          @mousemove="mouseHasMoved = true"
          @mouseenter="onMouseEnterOption(i)"
        >
          <slot name="option" v-bind="{ option, value, formattedOption }">
            <p
              v-cleanhtml="formattedOption(option)"
              :data-testid="option"
              class="truncate w-full"
            ></p>
            <GxIcon2
              v-if="option === value"
              class="ml-auto text-sm de:text-2xs tex-black"
              icon="check"
            />
          </slot>
        </li>
      </ul>
      <slot
        name="end-of-list"
        v-bind="{
          loading,
          filteredOptionsLenght: filteredOptions.length,
          optionsLenght: options.length,
        }"
      >
      </slot>
    </div>
    <slot
      name="error"
      v-bind="{
        emptyAndRequired:
          inputService.state.matches('focused.emptyAndRequired') ||
          inputService.state.matches('blurred.emptyAndRequired'),
        errorMsg:
          inputService.state.context.errorMsg &&
          (inputService.state.matches('focused.errorAndRequired') ||
            inputService.state.matches('blurred.errorAndRequired') ||
            inputService.state.matches('focused.error') ||
            inputService.state.matches('blurred.error')),
        assistive,
      }"
    >
    </slot>
  </div>
</template>
<style lang="scss" scoped>
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

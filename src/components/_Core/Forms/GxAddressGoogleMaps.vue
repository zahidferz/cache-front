<script>
import inputValidators from '@src/utils/input-validators.js'
import GxIcon from '@components/_Core/Icons/GxIcon'
import debounce from 'lodash/debounce'
import loadGoogleMapsApi from '@src/utils/google-maps.js'

export default {
  name: 'GxAddressGoogleMaps',
  components: {
    GxIcon,
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
    placeholder: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    icon: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    pattern: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      default: 10,
    },
    max: {
      type: Number,
      default: 15,
    },
    assistive: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    validationFn: {
      type: Function,
      default: null,
    },
    accept: {
      type: String,
      default: null,
    },
    watchValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
      selectedOption: -1,
      errorMsg: this.error,
      hasFocus: false,
      showPassword: false,
      labelWidth: null,
      validated: false,
      isTouched: false,
      googleMapsAutocompleteService: null,
      googleMapsPlacesService: null,
      predictions: [],
      disableNextGoogleMapsQuery: false,
      showZeroGoogleMapsResults: false,

      // Address components
      address: {
        outsideNumber: null,
        neighborhood: null,
        municipality: null,
        city: null,
        state: null,
        country: null,
        countryCode: null,
        postalCode: null,
      },
    }
  },
  computed: {
    hasText() {
      if (this.type === 'file') {
        return this.value !== ''
      }
      return this.innerValue !== ''
    },
    // Returns the icon when an existing pattern is given
    // A user can override this by providing an icon prop
    hasValidation() {
      // Determine if the input requires validation via a provided method o a supported pattern
      if (this.pattern) return true
      if (this.validationFn) return true
      return false
    },
    innerIcon() {
      if (this.icon) return this.icon
      if (this.pattern === 'phone') return 'phone_iphone'
      if (this.pattern === 'taxId') return 'domain'
      if (
        this.pattern === 'password' ||
        this.pattern === 'ciec' ||
        this.pattern === 'csd'
      )
        return 'lock'
      if (this.pattern === 'email') return 'email'
      if (this.pattern === 'name') return 'face'
      return null
    },
    innerIconRight() {
      if (this.iconRight) return this.iconRight
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        this.showPassword
      )
        return 'visibility'
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        !this.showPassword
      )
        return 'visibility_off'
      if (this.errorMsg) return 'cancel'
      if (
        this.validated &&
        this.hasValidation &&
        this.innerValue !== '' &&
        !this.errorMsg
      )
        return 'check_circle'
      return null
    },
    innerType() {
      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        this.showPassword
      )
        return 'text'

      if (
        (this.pattern === 'password' ||
          this.pattern === 'ciec' ||
          this.pattern === 'csd') &&
        !this.showPassword
      )
        return 'password'

      if (this.pattern === 'phone') return 'tel'

      return this.type
    },
  },
  watch: {
    value(newVal) {
      if (this.watchValue) {
        this.innerValue = newVal
      }
    },
    error(newErrorMsg) {
      this.errorMsg = newErrorMsg
    },
    autofocus(newVal) {
      if (newVal) {
        this.setFocus()
      }
    },
    loading(newVal) {
      this.$nextTick(() => {
        if (newVal) this.onSvgLoaded()
      })
    },
  },
  created() {
    this.validateInput = debounce(this.immediateValidateInput, 300)
    this.searchGoogleMaps = debounce(this.immediateSearchGoogleMaps, 300)
  },
  mounted() {
    this.$emit('input', this.value)

    if (this.autofocus) {
      this.setFocus()
    }

    // Defer validations until user types, unless a value already exists
    if (this.innerValue !== '') {
      this.immediateValidateInput()
    }

    if (this.error) {
      this.errorMsg = this.error
    }

    this.labelWidth = this.$refs.label.clientWidth

    if (!this.disabled) {
      loadGoogleMapsApi().then(
        ({ googleMapsAutocompleteService, googleMapsPlacesService }) => {
          this.googleMapsAutocompleteService = googleMapsAutocompleteService
          this.googleMapsPlacesService = googleMapsPlacesService
        }
      )
    }
  },
  methods: {
    immediateSearchGoogleMaps() {
      if (this.disableNextGoogleMapsQuery) {
        this.disableNextGoogleMapsQuery = false
        return
      }
      if (!this.innerValue) {
        this.predictions = []
        return
      }
      if (!this.googleMapsAutocompleteService) return alert('Service not ready')

      this.showZeroGoogleMapsResults = false
      this.errorMsg = null
      this.googleMapsAutocompleteService.getPlacePredictions(
        { input: this.innerValue },
        function(predictions, status) {
          /* global google */
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            this.showZeroGoogleMapsResults = true
            this.errorMsg = 'No se encontraron resultados.'
            return
          }
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            alert(status)
            return
          }
          this.predictions = predictions
        }.bind(this)
      )
    },
    selectPrediction(prediction) {
      this.disableNextGoogleMapsQuery = true
      this.predictions = []
      // Get and Parse location details
      const request = {
        placeId: prediction.place_id,
        fields: ['formatted_address', 'address_component'],
      }
      this.googleMapsPlacesService.getDetails(request, callback.bind(this))
      function callback(place, status) {
        const address = {}
        address.fullAddress = place.formatted_address
        place.address_components.forEach((c) => {
          if (c.types.includes('route')) {
            address.street = c.long_name
          }
          if (c.types.includes('street_number')) {
            address.outsideNumber = c.long_name
          }
          if (c.types.includes('sublocality_level_2')) {
            address.neighborhood = c.long_name
          }
          if (c.types.includes('sublocality_level_1')) {
            address.municipality = c.long_name
          }
          if (c.types.includes('locality')) {
            address.city = c.long_name
          }
          if (c.types.includes('administrative_area_level_1')) {
            address.state = c.long_name
          }
          if (c.types.includes('country')) {
            address.country = c.long_name
            address.countryCode = c.short_name === 'MX' ? 'MEX' : c.short_name
          }
          if (c.types.includes('postal_code')) {
            address.postalCode = c.long_name
          }
        })
        this.innerValue = address.fullAddress
        this.$emit('validAddress', address)
      }
    },
    onSvgLoaded() {
      // SVGElement getTotalLength has not been implemented in JSDom and will break tests
      if (
        document.querySelector('path') &&
        document.querySelector('path').getTotalLength
      ) {
        const pathLength = document.querySelector('path').getTotalLength()
        this.$refs.label.style.setProperty('--dashArray', pathLength / 2)
        this.$refs.label.style.setProperty('--dashOffset', pathLength)
      }
    },
    setFocus() {
      setTimeout(() => {
        this.$refs.gxInput.focus()
      }, 300)
    },
    immediateValidateInput() {
      // Mark the input as having gone through at least one validation. This will render the corresponding right icon.
      this.validated = true
      if (this.error) {
        this.errorMsg = this.error
        return
      }
      if (this.innerValue === '') {
        this.errorMsg = null
        return
      }
      if (this.validationFn) {
        this.errorMsg = this.validationFn(this.innerValue)
      } else if (inputValidators[this.pattern]) {
        this.errorMsg = inputValidators[this.pattern](
          this.innerValue,
          this.min,
          this.max
        )
      }
      this.$emit('valid', this.errorMsg)
    },
    onFocus() {
      this.isTouched = true
      this.hasFocus = true
      this.$refs.gxInput.setSelectionRange(0, this.innerValue.length)
      this.$emit('focus')
    },
    onInput(e) {
      this.innerValue = e.target.value
      this.cleanInput()
      this.$emit('input', this.innerValue)
      this.validateInput()
      this.searchGoogleMaps()
    },
    onBlur() {
      this.hasFocus = false
      this.cleanInput()
      this.$emit('input', this.innerValue)
      this.validateInput()
      this.$emit('blur')
    },
    cleanInput() {
      const deleteNoNumeric = (text) => text.replace(/\D/g, '')
      const deleteNoPhone = (text) => text.replace(/[^0-9]/g, '')
      const deleteNumeric = (text) => text.replace(/\d/g, '')
      const getNegativeNumber = (text) => text.replace(/[^.\-0-9]/g, '')
      const taxIdUpperCase = (text) => text.slice(0, 13).toUpperCase()
      const deleteNotCsdOrCiec = (text) =>
        text.replace(/[^ñÑ0-9a-zA-Z-._%&]/, '')
      const deleteInvalidBusinessName = (text) =>
        text.replace(/[^0-9a-zA-Z ]/, '')
      const deleteNoSpaceInPassword = (text) =>
        text.replace(/[^0-9A-Za-z$&#_!*%]/, '')

      if (this.pattern === 'business-name') {
        this.innerValue = deleteInvalidBusinessName(this.innerValue)
      }

      if (this.pattern === 'csd' || this.pattern === 'ciec') {
        this.innerValue = deleteNotCsdOrCiec(this.innerValue)
      }
      if (this.pattern === 'password') {
        this.innerValue = deleteNoSpaceInPassword(this.innerValue)
      }

      if (this.pattern === 'numeric') {
        this.innerValue = deleteNoNumeric(this.innerValue)
      }
      if (this.pattern === 'phone') {
        let countSpecialChars = 0
        for (let index = 0; index < this.innerValue.length; index++) {
          if ('+()'.includes(this.innerValue[index])) {
            countSpecialChars++
          }
        }
        this.innerValue = deleteNoPhone(this.innerValue).slice(
          0,
          this.max + countSpecialChars
        )
      }
      if (this.pattern === 'no-numeric') {
        this.innerValue = deleteNumeric(this.innerValue)
      }
      if (this.pattern === 'name') {
        this.innerValue = deleteNumeric(this.innerValue)
      }
      if (this.pattern === 'numeric-negative') {
        this.innerValue = getNegativeNumber(this.innerValue)
      }
      if (this.pattern === 'taxId') {
        this.innerValue = taxIdUpperCase(this.innerValue)
      }
    },
    onIconRightClick() {
      if (
        this.pattern === 'password' ||
        this.pattern === 'ciec' ||
        this.pattern === 'csd'
      ) {
        this.showPassword = !this.showPassword
      }
      this.$emit('icon-right-click')
    },
    onArrowUp() {
      if (this.selectedOption > 0) {
        this.selectedOption = this.selectedOption - 1
      } else {
        this.selectedOption = this.predictions.length - 1
      }
    },
    onArrowDown() {
      if (this.selectedOption < this.predictions.length - 1) {
        this.selectedOption = this.selectedOption + 1
      } else {
        this.selectedOption = 0
      }
    },
    onEnter(evt) {
      if (this.selectedOption === -1 || this.predictions.length === 0) return
      this.selectPrediction(this.predictions[this.selectedOption])
    },
  },
}
</script>
<template>
  <div class="w-full mb-2 de:mb-2 gxInput">
    <label
      ref="label"
      :for="_uid"
      class="w-full flex px-4"
      :class="{
        'text-gray-500': !dark && !errorMsg && !hasFocus && !isTouched,
        'rounded-lg bg-secondary-200': dark,
        'text-white': dark && !errorMsg && !hasFocus && !hasText,
        'text-alert': errorMsg,
        'text-primary': hasFocus,
        'active-label': hasFocus || hasText,
        relative: loading && dark,
      }"
    >
      <svg
        v-if="loading && dark"
        height="52"
        :width="labelWidth"
        class="absolute left-0"
      >
        <path
          class="loadingDarkPath"
          :d="
            `M1 8 a8,8 0 0 1 8,-7 H ${labelWidth -
              9} a8,8 0 0 1 8,8 V 42 a8,8 0 0 1 -8,8 H 9 a8,8 0 0 1 -8,-8 Z`
          "
          fill="none"
          stroke-width="2"
          stroke="#fff"
        />
      </svg>
      <div
        class="inputContainer flex-grow flex justify-between items-center relative pt-2 pb-2"
        :class="{
          'text-gray-500 border-b border-gray-500':
            !dark && !isTouched && !hasFocus && !errorMsg,
          'text-primary': (hasText || hasFocus) && !errorMsg,
          'text-white': dark && !hasText && !errorMsg && !hasFocus,
          'text-primary': (hasFocus || hasText) && dark,
          'border-b border-primary': !dark && !errorMsg,
          'border-b border-black': !dark && !errorMsg && !hasFocus,
          'border-b border-alert text-alert': !dark && errorMsg,
          'loading overflow-hidden': loading && !dark,
        }"
      >
        <GxIcon
          v-if="innerIcon"
          class="mr-4"
          :class="{
            'text-gray-500': !dark && !isTouched && !hasFocus && !errorMsg,
            'text-primary': (hasText || hasFocus) && !errorMsg,
            'text-white': dark && !hasText && !errorMsg && !hasFocus,
            'text-alert': errorMsg,
          }"
          :icon="innerIcon"
        />
        <!-- Replacing v-model with the :value / @input combo due to text composition in Android breaking validation -->
        <input
          :id="_uid"
          ref="gxInput"
          :value="innerValue"
          :type="innerType"
          :aria-label="label"
          :placeholder="dark ? placeholder : ''"
          :disabled="disabled || loading"
          :accept="accept"
          :class="{
            'text-gray-500': !dark && !isTouched && !hasFocus && !errorMsg,
            'w-full text-alert outline-none border-none bg-transparent label-hidden': errorMsg,
            'w-full outline-none border-none bg-transparent text-black':
              !dark && !errorMsg,
            'dark w-full text-white outline-none border-none bg-transparent label-hidden':
              dark && !errorMsg,
            nunitoFamily:
              (pattern === 'password' ||
                pattern === 'ciec' ||
                pattern === 'csd') &&
              !showPassword,
          }"
          :autocomplete="
            pattern === 'password' || pattern === 'csd' || pattern === 'ciec'
          "
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @keyup.up="onArrowUp"
          @keyup.down="onArrowDown"
          @keyup.prevent.enter="onEnter"
          @keydown.enter.prevent
        />
        <span
          :class="{
            'label-hidden text-secondary-200': dark,
            'gx-left-8': innerIcon,
          }"
          class="gxLabelText"
          >{{ label }}
        </span>
        <p
          v-if="type === 'file' && value"
          class="file-name text-black w-full"
          >{{ value }}</p
        >
        <!-- Toggle password visibility on and off for pattern="password" -->
        <GxIcon
          v-if="innerIconRight"
          class="ml-4 flex-shrink-0"
          :class="{
            'text-gray-500': !dark && !hasText && !hasFocus && !errorMsg,
            'text-primary': (hasText || hasFocus) && !errorMsg,
            'text-white': dark && !hasText && !errorMsg && !hasFocus,
            'text-alert': errorMsg,
          }"
          :dark="dark"
          :icon="innerIconRight"
          style="font-size: 24px"
          transparent
          @click.prevent="onIconRightClick"
        />
      </div>
    </label>
    <ul v-if="!showZeroGoogleMapsResults" ref="options" class="px-4">
      <li
        v-for="(prediction, index) in predictions"
        :key="prediction.id"
        :class="{ 'bg-secondary-50': index === selectedOption }"
        class="py-2 text-base de:text-xs font-gothic cursor-pointer hover:bg-secondary-50 border-b border-gray-300"
        @mouseenter="selectedOption = index"
        @click="selectPrediction(prediction)"
      >
        {{ prediction.description }}
      </li>
    </ul>
    <p
      v-if="assistive || errorMsg"
      class="ml-4 mt-1 gxAssistive text-left text-alert"
      :class="{
        'text-white': dark,
      }"
      >{{ errorMsg ? errorMsg : assistive }}</p
    >
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.gxInput {
  min-height: 4.5rem;
  font-size: 1.125rem;
}
input,
input::-webkit-input-placeholder {
  font-size: 1.125rem;
}
.gxAssistive {
  font-size: 0.75rem;
}
.loading::after {
  position: absolute;
  bottom: 0;
  content: '';
  border-bottom: 1px solid var(--primary);
  animation: loading 1.3s ease-in-out infinite;
}

@keyframes loading {
  0% {
    width: 0;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 100%;
    transform: translate(100%);
  }
}
label {
  --dashArray: 0;
  --dashOffset: 0;
}
.loadingDarkPath {
  stroke-dasharray: var(--dashArray);
  animation: dash 5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: var(--dashOffset);
  }
}

.inputContainer {
  height: 50px;
}
input {
  letter-spacing: 1px;
}
span {
  position: absolute;
  top: 1.125rem;
  box-sizing: border-box;
  line-height: 1rem;
  transition: all 0.2s ease 0s;
}
.gx-left-8 {
  left: 2rem;
}
input:focus + span:not(.label-hidden),
.active-label span:not(.label-hidden) {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.75rem;
  line-height: 12px;
}
span.label-hidden,
span.label-hidden {
  font-size: 0.75rem;
  transform: translate(0, 1rem);
}
input:-moz-ui-invalid {
  border: none;
  outline: none;
  box-shadow: 0 0 0;
}

// input:-webkit-autofill + span,
// input:focus:-webkit-autofill + span {
//   font-size: 0.75rem;
//   transform: translate(0, -0.8rem);
// }
input:-webkit-autofill {
  top: 1.25rem;
  bottom: 1rem;
  font-size: 1rem;
  color: var(--black);
  background-color: transparent;
  border: none;
  -webkit-box-shadow: 0 0 0 1000px var(--white) inset;
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--black);
}
input.dark:-webkit-autofill {
  color: white;
  -webkit-box-shadow: 0 0 0 1000px var(--secondary-200) inset;
  -webkit-text-fill-color: white;
}
// input.dark:-webkit-autofill,
// input.dark:-webkit-autofill:hover,
// input.dark:-webkit-autofill:focus,
// input.dark:-webkit-autofill:active  {
//     -webkit-box-shadow: 0 0 0 30px red inset !important;
// }

//Firefox invalid state for inputs such as email
input:invalid,
input:-moz-ui-invalid {
  border: none;
  outline: none;
  box-shadow: 0 0 0 1000px var(--secondary-200) inset;
}
.nunitoFamily {
  font-family: 'Nunito';
}
input[type='file'] {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
}
.file-name {
  position: absolute;
  top: 1.5rem;
  left: 0;
  box-sizing: border-box;
  overflow: hidden;
  line-height: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (min-width: 768px) {
  .gxInput {
    min-height: 4.125rem;
    font-size: 0.75rem;
  }
  input,
  input::-webkit-input-placeholder {
    font-size: 0.875rem;
  }
  input.dark,
  input.dark::-webkit-input-placeholder {
    color: var(--white);
  }
  input:focus + span:not(.label-hidden),
  .active-label span:not(.label-hidden) {
    font-size: 0.625rem;
  }
  .gxAssistive {
    font-size: 0.625rem;
  }
}
</style>

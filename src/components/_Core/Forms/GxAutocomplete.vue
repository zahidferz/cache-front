<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxAutocomplete',
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
  },
  data() {
    return {
      innerValue: this.value,
      errorMsg: this.error,
      hasFocus: false,
      showPassword: false,
      labelWidth: null,
      validated: false,
      suggestions: [],
    }
  },
  computed: {
    innerIcon() {
      return null
    },
    innerIconRight() {
      return 'expand_more'
    },
  },
  mounted() {
    this.$emit('input', this.value)
  },
  methods: {
    onInput(e) {
      this.innerValue = e.target.value
      this.$emit('input', this.innerValue)
    },
    onIconRightClick() {},
  },
}
</script>
<template>
  <div class="w-full mb-2 gxInput">
    <label
      ref="label"
      :for="_uid"
      class="w-full flex px-4"
      :class="{
        'text-gray-500': !dark && !errorMsg && !hasFocus,
        'rounded-lg bg-secondary-200': dark,
        'text-white': !errorMsg && !hasFocus,
        'text-alert': errorMsg,
        'text-primary-500': hasFocus || hasText,
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
          'border-b': !dark,
          'text-primary': (hasFocus || hasText) && !dark,
          'text-alert': errorMsg,
          'border-primary': !dark && !errorMsg && (hasFocus || hasText),
          'border-alert': !dark && errorMsg && (hasFocus || hasText),
          'loading overflow-hidden': loading && !dark,
        }"
      >
        <GxIcon v-if="innerIcon" class="mr-4" :icon="innerIcon" />
        <!-- Replacing v-model with the :value / @input combo due to text composition in Android breaking validation -->
        <input
          :id="_uid"
          ref="gxInput"
          :value="innerValue"
          :type="innerType"
          :aria-label="label"
          :placeholder="dark ? placeholder : ''"
          :disabled="disabled || loading"
          class=""
          :class="{
            'w-full text-alert outline-none border-none bg-transparent label-hidden': errorMsg,
            'text-black w-full outline-none border-none bg-transparent': !dark,
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
        />
        <span
          :class="{
            'label-hidden text-secondary-200': dark,
          }"
          class="gxLabelText"
          >{{ label }}
        </span>
        <!-- Toggle password visibility on and off for pattern="password" -->
        <GxIcon
          v-if="innerIconRight"
          class="ml-4 flex-shrink-0 pb-px"
          :class="{
            'text-white': dark && pattern === 'password',
            'text-gray-500': !dark && pattern === 'password',
          }"
          :dark="dark"
          :icon="innerIconRight"
          transparent
          @click.prevent="onIconRightClick"
        />
      </div>
    </label>
    <p
      v-if="assistive || errorMsg"
      class="ml-4 mt-1 md:mt-0 gxAssistive text-left text-alert"
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
  line-height: 1.125rem;
}

@media screen and (min-width: 768px) {
  .gxInput {
    min-height: 4.125rem;
    font-size: 0.875rem;
    line-height: 0.875rem;
  }
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
  left: 2rem;
  box-sizing: border-box;
  line-height: 1rem;
  transition: all 0.2s ease 0s;
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
</style>

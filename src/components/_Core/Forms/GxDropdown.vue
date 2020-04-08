<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxMultiselect from '@components/_Core/Forms/GxMultiselect'
export default {
  components: {
    GxIcon,
    GxMultiselect,
  },
  props: {
    value: {
      required: true,
      validator: (val) => {
        return (
          typeof val === 'object' ||
          typeof val === 'string' ||
          typeof val === 'undefined'
        )
      },
    },
    watchValue: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Elige una opción',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    keepTypedValue: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    optionValue: {
      type: String,
      default: null,
    },
    optionText: {
      type: String,
      default: null,
    },
    defaultOption: {
      type: String,
      default: null,
    },
    initialObject: {
      type: Object,
      default: null,
    },
    allowEmpty: {
      type: Boolean,
      default: false,
    },
    isTextGray: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.initialObject ? this.initialObject : this.value,
      isOpen: false,
    }
  },
  computed: {
    defaultValue() {
      if (this.defaultOption) {
        return this.defaultOption
      }
      return this.placeholder
    },
  },
  watch: {
    value(newVal) {
      if (this.watchValue) {
        this.innerValue = newVal
      }
    },
    innerValue(newVal) {
      if (this)
        if (newVal && this.optionValue && this.$mq === 'de') {
          this.$emit('input', newVal[this.optionValue])
        } else {
          this.$emit('input', newVal)
        }
    },
  },
}
</script>

<template>
  <!-- 'h-12 ': $mq === 'mo', -->
  <div
    v-if="$mq === 'de'"
    class="w-full flex flex-col mb-2 relative px-4 gxDropdown"
    :class="{ 'js-error-anchor': error }"
  >
    <label
      v-if="label"
      class="gx-caption label-de ml-4 z-1 absolute  cursor-pointer"
      :class="{
        gxDropdownLabel: !innerValue && !isOpen,
        innerVal: value && !isOpen && !error && innerValue,
        'text-gray-400': disabled,
        'text-black': !dark && !disabled && value !== '' && !error,
        'text-white': dark && !disabled,
        'text-primary gxDropdownLabel--focus': isOpen,
        'gxDropdownLabel--focus text-alert': isOpen && error,
        'text-alert': error,
        'text-gray-500': isTextGray && !isOpen,
        'pointer-events-none': !isOpen,
      }"
      >{{ label }}
    </label>
    <GxMultiselect
      v-model="innerValue"
      :dropdown="true"
      :options="options"
      :placeholder="placeholder"
      :label="optionText"
      :watch-value="watchValue"
      class="pt-2"
      :track-by="optionValue"
      :error="error"
      :allow-empty="allowEmpty"
      :keep-typed-value="keepTypedValue"
      :clear-on-select="false"
      @open="isOpen = $event"
    >
    </GxMultiselect>
  </div>
  <div
    v-else
    class="w-full flex flex-col gxDropdown mb-2 relative"
    :class="{ 'js-error-anchor': error }"
  >
    <label
      v-if="label"
      class="gx-caption de:gx-caption ml-4 z-1 absolute label-mo"
      :class="{
        gxDropdownLabel__mo: !innerValue,
        'text-primary gxDropdownLabel__mo--focus': isOpen,
        'text-gray-400': disabled,
        'text-black': !dark && !disabled && innerValue,
        'text-white': dark && !disabled,
        'text-alert': error,
        'text-primary gxDropdownLabel__mo--focus': isOpen,
        'text-gray-500': isTextGray,
      }"
      :for="_uid"
      >{{ label }}
    </label>
    <div class="flex relative items-center">
      <select
        :id="_uid"
        v-model="innerValue"
        style="height:50px"
        class="select w-full border-b pt-2 gxSelect"
        :class="{
          'rounded-none': !dark,
          'border-gray-500':
            defaultValue === placeholder &&
            !dark &&
            innerValue === '' &&
            !error,
          'rounded-lg px-2': dark,
          'text-white': dark && !disabled,
          'bg-secondary-300': dark && !disabled,
          'bg-primary-400': dark && disabled,
          'mx-4 active:border-black focus:border-black': !dark,
          'text-gray-400': disabled,
          'border-black':
            (defaultValue === defaultOption && !dark) || (value && !dark),
          'text-black': defaultOption && !dark && !disabled,
          'text-gray-500 active:text-black focus:text-black':
            !dark && !disabled && value === '' && !defaultOption && !error,
          'bg-white': !dark,
          'cursor-not-allowed': disabled,
          'text-alert border-alert': error,
        }"
        :disabled="disabled"
      >
        <option
          value=""
          hidden
          class="gx-caption de:gx-caption"
          :class="{ 'text-alert': error }"
          >{{ defaultOption }}</option
        >
        <option
          v-for="(option, index) in options"
          :key="option[optionValue] ? option[optionValue] : option + index"
          :value="option[optionValue] ? option[optionValue] : option"
          >{{ option[optionText] ? option[optionText] : option }}</option
        >
      </select>
      <GxIcon
        :class="{
          'text-alert': error,
          'text-black': innerValue !== '' && !error,
          'text-gray-500':
            defaultValue === placeholder &&
            !dark &&
            innerValue === '' &&
            !error,

          'text-white': dark && !disabled,
        }"
        icon="expand_more"
      />
    </div>
    <p
      v-if="error"
      class="mt-1 gxAssistive text-left text-alert pl-4"
      :class="{
        'text-white': dark,
      }"
      >{{ error }}</p
    >
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.label-mo {
  top: -6px;
}
.label-de {
  font-size: 10px;
}
.gxDropdown {
  min-height: 4.5rem;
  font-size: 1.125rem;
}

.gxDropdown .multiselect:focus {
  border-bottom: 1px solid var(--black);
}

.gxAssistive {
  font-size: 0.75rem;
}

select {
  padding-right: 1rem;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
}
select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}
.placeholder-mo {
  display: none;
}

i {
  position: absolute;
  right: 1rem;
  pointer-events: none;
  cursor: pointer;
}

.innerVal {
  top: 0;
  left: 0;
}

// animated label on focus
.gxDropdownLabel {
  position: absolute;
  top: 1.25rem;
  left: 0;
  font-size: 0.75rem;
  color: var(--gray-500);
  letter-spacing: 0;
  transition-duration: 0.3s;
  transition-property: top, left, font-size;
}

.gxDropdownLabel__mo {
  position: absolute;
  top: 1.25rem;
  left: 0;
  z-index: 49; // Multiselect uses a z-index of 50 on active
  font-size: 1.125rem;
  letter-spacing: 0;
  transition: 0.3s all;
}
.gxDropdownLabel__mo:focus {
  top: 0;
  left: 0;
  font-size: 0.625rem;
  color: var(--primary);
}

.gxDropdownLabel--focus {
  top: 0;
  left: 0;
  z-index: 51; // Multiselect uses a z-index of 50 on active
  font-size: 0.625rem;
}

@screen de {
  .gxSelect {
    font-size: 0.75rem;
  }
  .gxDropdown {
    min-height: 4.125rem;
  }
}
</style>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    spacing: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Boolean],
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputId: {
      type: String,
      required: true,
      default: 'inputId',
    },
    single: {
      type: Boolean,
      default: true,
    },
    model: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: 'inline',
    },
    watchValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: false,
    }
  },
  watch: {
    value(newVal) {
      // just work for boolean values
      if (this.watchValue) {
        this.$refs.gxCheckbox.checked = newVal
      }
    },
  },
  mounted() {
    const { checked, value } = this.$refs.gxCheckbox
    this.isChecked = checked
    if (this.single) {
      this.$emit('input', checked)
    } else {
      this.$emit('input', { checked, value })
    }
  },
  methods: {
    onInput({ target }) {
      const { checked, value } = target
      this.isChecked = checked
      if (this.single) {
        this.$emit('input', checked)
      } else {
        this.$emit('input', { checked, value })
      }
    },
  },
}
</script>
<template>
  <label
    :for="inputId"
    :class="[
      spacing,
      labelPosition === 'bottom' ? 'pt-8 text-center' : 'pl-6',
      disabled ? 'cursor-not-allowed' : 'cursor-default',
    ]"
    class="relative"
  >
    {{ label }}
    <input
      :id="inputId"
      ref="gxCheckbox"
      class="absolute"
      :aria-label="label"
      :value="model"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @input="onInput"
      @change="onInput"
    />
    <span
      :class="[labelPosition === 'bottom' ? 'label-bottom' : 'label-inline']"
      class="material-icons-round absolute h-4 w-4 text-base border-none cursor-pointer"
    ></span>
  </label>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
label {
  display: inline-block;
  line-height: 1rem;
}
input {
  width: 0;
  height: 0;
  opacity: 0;
}
input + span {
  top: 0;
  right: 0;
  left: 0;
  line-height: 1rem;
}
.label-bottom {
  margin: 0 auto;
}
.label-inline {
  margin: 0;
}
input + span::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  color: var(--gray-500);
  content: 'check_box_outline_blank';
  border: none;
  opacity: 1;
}
input + span::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5rem;
  height: 0.5rem;
  font-size: 1rem;
  line-height: 1rem;
  color: var(--primary-500);
  content: 'check_box';
  border: none;
  opacity: 0;
  transition: opacity 0.2s ease 0s;
}
input:checked + span::after {
  opacity: 1;
}
input:disabled + span::before,
input:disabled:checked + span::after {
  color: var(--gray-300);
  opacity: 0.7;
}
</style>

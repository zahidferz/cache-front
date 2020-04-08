<script>
export default {
  name: 'GxRadioButton',
  props: {
    label: {
      type: String,
      default: '',
    },
    inputId: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    spacing: {
      type: String,
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
    model: {
      type: String,
      default: '',
    },
    labelPosition: {
      type: String,
      default: 'inline',
    },
  },
  watch: {
    value(newSelection) {
      if (newSelection === this.model) {
        this.$refs.gxRadio.checked = true
      } else {
        this.$refs.gxRadio.checked = false
      }
    },
  },
  mounted() {
    const { checked, value } = this.$refs.gxRadio
    checked && this.$emit('input', value)
  },
  methods: {
    onChange(evt) {
      this.$emit('input', evt.target.value)
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
      disabled ? 'cursor-not-allowed' : 'cursor-pointer ',
    ]"
    class="relative"
  >
    {{ label }}
    <input
      :id="inputId"
      ref="gxRadio"
      class="absolute"
      :aria-label="label"
      type="radio"
      :value="model"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <span
      :class="[labelPosition === 'bottom' ? 'label-botttom' : 'label-inline']"
      class="material-icons absolute h-4 w-4 text-base border-none"
    ></span>
  </label>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
label {
  display: inline-block;
  font-family: 'Muli', 'sans-serif';
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
.label-botttom {
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
  content: 'radio_button_unchecked';
  border: none;
  opacity: 1;
}
input + span::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  color: var(--primary-500);
  content: 'radio_button_checked';
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
  cursor: not-allowed;
  opacity: 0.7;
}
</style>

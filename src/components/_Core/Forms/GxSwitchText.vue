<script>
export default {
  name: 'GxSwitchText',
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    bgColors: {
      type: Array,
      default: () => ['bg-primary-600', 'bg-primary-400'],
    },
  },
  computed: {
    isChecked() {
      return this.options[0] === this.value
    },
    bgColor() {
      if (this.isChecked) {
        return this.bgColors[1]
      } else {
        return this.bgColors[0]
      }
    },
  },
  methods: {
    onInput(evt) {
      if (evt.target.checked) {
        this.$emit('input', this.options[0])
      } else {
        this.$emit('input', this.options[1])
      }
    },
  },
}
</script>
<template>
  <label
    :for="_uid"
    class="flex  overflow-hidden items-center rounded-lg relative h-5 bg-gray align-top"
  >
    <input
      :id="_uid"
      type="checkbox"
      class="input"
      :disabled="disabled"
      :checked="isChecked"
      @input="onInput"
    />
    <span
      class="selector relative px-6 text-white text-center cursor-pointer rounded-full shadow-2 h-5"
      :class="bgColor"
    >
      <div
        v-for="option in options"
        :key="option"
        class="switch-text h-5 flex justify-center items-center"
        :class="{ 'invisible collapse': value !== option }"
        >{{ option }}</div
      >
    </span>
  </label>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.input {
  position: absolute;
  right: -100000px;
  order: 2;
  width: 1px;
  height: 0;
  visibility: collapse;
  opacity: 0;
}
.selector {
  font-family: 'Muli';
  font-size: 0.75rem;
}
.selector::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 2px;
  display: block;
  width: 1rem;
  height: 1rem;
  margin: auto 0;
  content: '';
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: left 0.25s ease 0s;
}
.input:disabled + .selector {
  cursor: not-allowed;
  background: var(--gray-300);
}
.input:checked + .selector::before {
  left: calc(100% - 18px);
}
// .input:not(:disabled):checked + .selector {
//   background: var(--primary-400);
// }

.collapse {
  height: 0;
}
</style>

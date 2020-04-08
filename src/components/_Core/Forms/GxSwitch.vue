<script>
export default {
  name: 'GxSwitch',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: null,
    },
  },
  computed: {
    isChecked() {
      return this.value
    },
  },
  methods: {
    onInput(evt) {
      if (evt.target.checked) {
        this.$emit('input', true)
      } else {
        this.$emit('input', false)
      }
    },
  },
}
</script>
<template>
  <label
    :for="id ? id : _uid"
    class="flex items-center rounded-lg relative h-5 overflow-hidden"
  >
    <input
      :id="id ? id : _uid"
      type="checkbox"
      class="input"
      :disabled="disabled"
      :checked="isChecked"
      @input="onInput"
    />
    <span
      class="selector relative px-5 text-white text-center cursor-pointer bg-gray-500 rounded-full shadow-2 h-5"
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
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: uppercase;
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
.input:not(:disabled):checked + .selector {
  background: var(--primary-500);
}
</style>

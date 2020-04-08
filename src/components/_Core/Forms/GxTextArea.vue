<script>
export default {
  name: 'GxTextArea',
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
    tooltip: {
      type: String,
      default: '',
    },
    columns: {
      type: Number,
      default: 30,
    },
    maxlength: {
      type: Number,
      default: 1000,
    },
    rows: {
      type: Number,
      default: 10,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    autofocusTimeout: {
      type: Number,
      default: 550,
    },
  },
  data() {
    return {
      showTooltip: false,
      innerValue: this.value,
    }
  },
  computed: {
    isIOS() {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    },
  },
  mounted() {
    if (this.autofocus && !this.isIOs) {
      this.timeoutSetFocus()
    }
  },
  methods: {
    onInput(evt) {
      this.$emit('input', this.innerValue)
    },
    onFocus() {
      this.$emit('focus')
    },
    onBlur() {
      this.$emit('blur')
    },
    timeoutSetFocus() {
      setTimeout(() => {
        this.$refs.gxTextArea.focus()
        // Need to wait for a page transition to occur. We wait 300ms to make sure virtual keyboard is closed,
        // Plus 250ms for the page transition animation to happen.
      }, this.autofocusTimeout)
    },
  },
}
</script>
<template>
  <div class="w-full flex flex-col relative">
    <label
      :for="_uid"
      class="flex items-center text-gray-500 de:gx-caption gx-caption de:pb-2 pb-2"
      :class="{ 'text-white -z-1 absolute': dark }"
    >
      {{ label }}
    </label>
    <textarea
      :id="_uid"
      ref="gxTextArea"
      v-model="innerValue"
      :placeholder="placeholder"
      class="flex-grow outline-none resize-none rounded-lg p-2 h-32"
      :maxlength="maxlength"
      :class="{
        'border border-gray-500': !dark,
        'bg-secondary-200 text-white dark': dark,
      }"
      :autofocus="autofocus && !isIOS"
      :autofocus-timeout="autofocusTimeout"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
  </div>
</template>
<style lang="scss" scoped>
textarea.dark::-webkit-input-placeholder {
  color: white;
}
</style>

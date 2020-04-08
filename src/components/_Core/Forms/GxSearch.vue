<script>
export default {
  name: 'GxSearch',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
    }
  },
}
</script>
<template>
  <label
    :for="_uid"
    class="w-full flex justify-between items-center mb-2 p-4 pr-0 rounded-lg h-12"
    :class="{
      'text-gray-400': disabled && !dark,
      'bg-secondary-300': !disabled && dark,
      'bg-primary-400': disabled && dark,
      'text-white': dark,
      border: !dark,
    }"
  >
    <input
      v-model="innerValue"
      class="flex-grow outline-none bg-transparent"
      :class="{ 'cursor-not-allowed': disabled }"
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <GxButtonCircle v-if="innerValue === ''" icon="search" />
    <GxButtonCircle v-else icon="close" @click="innerValue = ''" />
  </label>
</template>

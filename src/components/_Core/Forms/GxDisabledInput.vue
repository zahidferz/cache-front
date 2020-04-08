<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxDisabledInput',
  components: { GxIcon },
  props: {
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
<template>
  <div class="flex gxInput flex-col cursor-not-allowed mx-4 text-gray-400">
    <span class="mb-2 gx-section-title">{{ label }}</span>
    <span
      class="flex  justify-start items-center border-b border-gray-400 pb-3 w-full"
    >
      <GxIcon :icon="icon" />
      <span class="ml-4 text-gray-400">{{ value }} </span>
    </span>
  </div>
</template>
<style lang="scss" scoped>
input:disabled {
  background: none;
}
.gxInput {
  min-height: 4.5rem;
  font-size: 1.125rem;
  line-height: 1.125rem;
}

@screen de {
  .gxInput {
    font-size: 0.75rem;
  }
  .gx-section-title {
    font-size: 0.625rem;
  }
}
</style>

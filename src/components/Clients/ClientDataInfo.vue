<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'ClientDataInfo',
  components: {
    GxIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<template>
  <div class="h-10 de:h-11">
    <h1
      class="text-primary mb-1"
      :class="{
        gxDataListFontMobile: $mq === 'mo',
        gxDataListFontDesk: $mq === 'de',
      }"
      >{{ label }}</h1
    >
    <div class="flex items-center">
      <GxIcon v-if="icon" :icon="icon" class="text-primary mr-4" />
      <span class="text-gray-500">{{ title }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gxDataListFontMobile {
  font-size: 0.875rem;
}
.gxDataListFontDesk {
  font-size: 0.625rem;
}
</style>

<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxShortcut',
  components: { GxIcon },
  props: {
    rightIcon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    to: {
      type: Object,
      required: true,
    },
    leftIcon: {
      type: String,
      default: 'add',
    },
  },
}
</script>
<template>
  <RouterLink
    :to="to"
    tag="li"
    class="flex  justify-end items-center mt-2 gxShortcut"
  >
    <p
      class="bg-white gx-menu-label flex-grow flex item-center justify-center text-center p-1 rounded shadow-2"
    >
      <GxIcon :icon="leftIcon" class="text-black mr-1" />
      {{ label }}
    </p>
    <div
      class="w-10 h-10 ml-2  flex items-center justify-center bg-secondary-200 rounded-full shadow-2"
    >
      <GxIcon :icon="rightIcon" class="text-white" />
    </div>
  </RouterLink>
</template>
<style lang="scss" scoped>
.gxShortcut {
  transform-origin: bottom left;
}
.gx-menu-label {
  min-width: 4.5rem;
  font-size: 14px;
  line-height: 14px;
}
</style>

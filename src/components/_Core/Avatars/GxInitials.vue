<script>
export default {
  name: 'GxInitials',
  props: {
    avatarText: {
      type: String,
      default: '',
    },
    // client lastActivityStatus 1 / 2 / 3
    statusBatch: {
      type: Number,
      default: 1,
    },
    color: {
      type: Number,
      default: 1,
    },
  },
}
</script>
<template>
  <div
    :class="
      `relative w-18 h-18 rounded-full mr-4 flex items-center justify-center text-white gx-h4 font-bold bg-avatar-${color}`
    "
    v-on="$listeners"
  >
    <slot>
      <div
        class="absolute w-3 h-3 border border-white rounded-full gxStatusPosition"
        :class="{
          'bg-success': statusBatch === 1,
          'bg-pending': statusBatch === 2,
          'bg-alert': statusBatch === 3,
        }"
      ></div>
      <span class="uppercase">{{ avatarText }}</span>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.gxStatusPosition {
  right: 0.5rem;
  bottom: 0;
}
</style>

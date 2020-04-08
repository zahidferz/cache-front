<script>
export default {
  name: 'GxMovementsCard',
  props: {
    containerClasses: {
      type: String,
      default: 'border-sales-1 p-4 border-l-8',
    },
  },
}
</script>
<template>
  <div :class="[containerClasses]" class="rounded shadow-2">
    <slot />
  </div>
</template>

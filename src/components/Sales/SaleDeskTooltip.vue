<script>
export default {
  name: 'SaleDeskTooltip',
  props: {
    tooltipClasses: {
      type: String,
      default:
        'mt-1 right-0  shadow-2 rounded-tl text-black rounded-b bg-white p-1 whitespace-no-wrap leading-none de:gx-caption',
    },
    transformOrigin: {
      type: String,
      default: 'transform-origin: top right;',
    },
  },
  data() {
    return {
      tooltip: false,
    }
  },
}
</script>
<template>
  <div
    class="relative"
    @mouseenter="tooltip = true"
    @mouseleave="tooltip = false"
  >
    <slot v-bind="{ mouseover: tooltip }" />
    <p
      v-if="tooltip"
      :style="`${transformOrigin}`"
      :class="[tooltipClasses]"
      class="tooltip absolute"
    >
      <slot name="tooltip" />
    </p>
  </div>
</template>
<style lang="scss" scoped>
.tooltip {
  top: 100%;
}
</style>

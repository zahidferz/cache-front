<script>
export default {
  name: 'GxDragMenu',
  data() {
    return {
      startX: null,
      ongoingTouches: [],
      initialWidth: 48,
      width: 48,
    }
  },
  mounted() {
    const el = this.$refs.draggable
    el.addEventListener('touchstart', this.handleStart, false)
    el.addEventListener('touchend', this.handleEnd, false)
    el.addEventListener('touchcancel', this.handleEnd, false)
    el.addEventListener('touchmove', this.handleMove, false)
  },
  methods: {
    handleStart(evt) {
      evt.preventDefault()
      this.startX = evt.changedTouches[0].pageX
    },
    handleMove(evt) {
      if (
        this.initialWidth +
          Math.abs(evt.changedTouches[0].pageX - this.startX) >
        200
      ) {
        alert('trigger some action')
        return
      }
      this.width =
        this.initialWidth + Math.abs(evt.changedTouches[0].pageX - this.startX)
    },
    handleEnd(evt) {
      this.width = this.initialWidth
    },
  },
}
</script>

<template>
  <div
    ref="draggable"
    class="gx-drag-menu h-12 bg-primary-500  rounded-full rounded-r-none"
    :style="`width: ${width}px`"
  >
  </div>
</template>

<style lang="scss">
/* stylelint-disable */
.gx-drag-menu {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 5;
}
</style>

<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxSwipe',
  components: {
    GxIcon,
  },
  data() {
    return {
      startX: null,
      ongoingTouches: [],
      rightSlotWidth: 0,
      leftSlotWidth: 0,
      defaultSlotWidth: 0,
      Xdiff: 0,
      translateLeftSlot: 0,
      translateRightSlot: 0,
      translateDefaultSlot: 0,
      transitionTransform: false, // Used to animate closing and opening with button. Disabled while dragging
      slotIsOpen: false,
    }
  },
  mounted() {
    const clickHandler = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.closeSlots()
      }
    }
    document.addEventListener('click', clickHandler)
    document.addEventListener('touchstart', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('touchstart', clickHandler)
    })

    this.rightSlotWidth = this.$refs.rightSlot.getClientRects()[0].width
    this.leftSlotWidth = this.$refs.leftSlot.getClientRects()[0].width
    this.defaultSlotWidth = this.$refs.defaultSlot.getClientRects()[0].width

    this.translateLeftSlot = -this.leftSlotWidth
    this.translateRightSlot = this.defaultSlotWidth // Absolute positioned element start with X to left of the continaer, just need to push right the width of main
    this.translateDefaultSlot = 0

    const el = this.$refs.defaultSlot
    el.addEventListener('touchstart', this.handleStart, false)
    el.addEventListener('touchend', this.handleEnd, false)
    el.addEventListener('touchcancel', this.handleEnd, false)
    el.addEventListener('touchmove', this.handleMove, false)
  },
  methods: {
    handleStart(evt) {
      // evt.preventDefault()
      if (this.slotIsOpen) {
        this.closeSlots()
        return
      }
      this.transitionTransform = false
      this.startX = evt.changedTouches[0].pageX
      this.lastX = evt.changedTouches[0].pageX
    },
    handleMove(evt) {
      if (this.slotIsOpen) {
        return
      }
      this.Xdiff = evt.changedTouches[0].pageX - this.lastX
      this.lastX = evt.changedTouches[0].pageX

      if (this.Xdiff < 0) {
        this.translateRightSlot -= Math.abs(this.Xdiff)
        this.translateLeftSlot -= Math.abs(this.Xdiff)
        this.translateDefaultSlot -= Math.abs(this.Xdiff)
      } else {
        this.translateLeftSlot += Math.abs(this.Xdiff)
        this.translateRightSlot += Math.abs(this.Xdiff)
        this.translateDefaultSlot += Math.abs(this.Xdiff)
      }
    },
    handleEnd(evt) {
      if (this.slotIsOpen) {
        return
      }
      const totalDiffX = evt.changedTouches[0].pageX - this.startX
      if (Math.abs(totalDiffX) < 5) {
        return
      }

      // Open left slot
      if (this.leftSlotWidth + this.translateLeftSlot > 45) {
        this.translateLeftSlot = 0
        this.translateRightSlot = this.defaultSlotWidth + this.leftSlotWidth
        this.translateDefaultSlot = this.leftSlotWidth
        this.slotIsOpen = true
        // Open right slot
      } else if (this.translateRightSlot - this.defaultSlotWidth < -45) {
        this.translateRightSlot = this.defaultSlotWidth - this.rightSlotWidth
        this.translateLeftSlot = -this.leftSlotWidth - this.rightSlotWidth
        this.translateDefaultSlot = -this.rightSlotWidth
        this.slotIsOpen = true
        // Close slots
      } else {
        this.translateLeftSlot = -this.leftSlotWidth
        this.translateRightSlot = this.defaultSlotWidth
        this.translateDefaultSlot = 0
        this.slotIsOpen = false
      }
      this.transitionTransform = true
    },
    openRightSlot() {
      this.transitionTransform = true
      this.translateRightSlot = this.defaultSlotWidth - this.rightSlotWidth
      this.translateLeftSlot = -this.leftSlotWidth - this.rightSlotWidth
      this.translateDefaultSlot = -this.rightSlotWidth
      this.slotIsOpen = true
    },
    closeSlots() {
      this.translateLeftSlot = -this.leftSlotWidth
      this.translateRightSlot = this.defaultSlotWidth
      this.translateDefaultSlot = 0
      this.slotIsOpen = false
    },
    onClickHandler(evt) {
      if (this.slotIsOpen) {
        this.closeSlots()
      }
    },
  },
}
</script>

<template>
  <div
    class="overflow-hidden relative"
    :class="{
      gxTransitionTransform: transitionTransform,
    }"
    v-on="$listeners"
    @click="onClickHandler"
  >
    <div
      ref="leftSlot"
      class="flex absolute h-full z-1 gxHideLeftSlot"
      :style="`transform: translate3d(${translateLeftSlot}px, 0px, 0px)`"
    >
      <slot name="left"> </slot>
    </div>
    <div
      ref="rightSlot"
      class="flex absolute h-full z-1 gxHideRightSlot"
      :style="`transform: translate3d(${translateRightSlot}px, 0, 0)`"
    >
      <slot name="right"> </slot>
    </div>
    <div
      ref="defaultSlot"
      :style="
        `width: 100%; min-width: 100%; transform: translate3d(${translateDefaultSlot}px, 0, 0);`
      "
      :class="{
        'pointer-events-none': slotIsOpen,
      }"
    >
      <slot></slot>
    </div>
    <button
      class="absolute top-0 right-0 w-4 h-4 mr-2 mt-2"
      @click.stop="openRightSlot"
    >
      <GxIcon icon="more_horiz" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.gxHideLeftSlot {
  transform: translateX(-100%);
}
.gxHideRightSlot {
  transform: translateX(100%);
}
.gxTransitionTransform .gxHideRightSlot {
  transition: transform 0.3s;
}
</style>

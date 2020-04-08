<script>
import GxCardCarousel from '@components/_Core/Cards/GxCardCarousel.vue'

export default {
  name: 'GxCarousel',
  components: {
    GxCardCarousel,
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeCard: 0,
      startX: 0,
      scrollX: 0,
      transitioningActiveCard: false,
    }
  },
  computed: {
    cardStyles() {
      const styles = []

      this.cards.forEach((card, index) => {
        let xDisplacement = this.cards.length / 2 // Get cards container center
        xDisplacement -= 0.5 // Compensate by 50% to center cards in container
        xDisplacement -= this.activeCard // Compensate by 100% to center the activeCard
        xDisplacement *= 100 // Set to percentage
        // Adjust x displacement when cards are not active to compensate for scale
        if (this.activeCard < index) {
          xDisplacement += 5
        }
        if (this.activeCard > index) {
          xDisplacement -= 5
        }
        // Adjust active card according to user dragging
        if (this.activeCard === index) {
          xDisplacement += this.scrollX
        }

        const zDisplacement = this.activeCard === index ? -30 : -40 // Active card is closer to user
        let newStyle = `width: 90vw; transform: translate3d(${xDisplacement}%,0,${zDisplacement}px)`

        styles.push(newStyle)
      })
      return styles
    },
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
      this.startX = evt.changedTouches[0].pageX
    },
    handleMove(evt) {
      if (this.transitioningActiveCard) return

      const dragDistanceX = evt.changedTouches[0].pageX - this.startX

      if (Math.abs(evt.changedTouches[0].pageX - this.startX) > 50) {
        this.transitioningActiveCard = true
        this.scrollX = 0
        if (dragDistanceX < 0) {
          if (this.activeCard === this.cards.length - 1) {
            this.activeCard = 0
          } else {
            this.activeCard++
          }
        } else {
          if (this.activeCard === 0) {
            this.activeCard = this.cards.length - 1
          } else {
            this.activeCard--
          }
        }

        return
      }
      this.scrollX = evt.changedTouches[0].pageX - this.startX
    },
    handleEnd(evt) {
      this.transitioningActiveCard = false
      this.scrollX = 0
    },
  },
}
</script>
<template>
  <div
    ref="draggable"
    class="overflow-hidden flex justify-center items-center"
    style="perspective: 100px;"
  >
    <GxCardCarousel
      v-for="(card, index) in cards"
      :key="index"
      :style="cardStyles[index]"
      class="card flex-shrink-0 relative ml-8"
      :class="{
        'shadow-4': activeCard !== index,
        'shadow-7': activeCard === index,
        'mr-8': index === cards.length - 1,
      }"
      :headline="card.title"
      :image="card.image"
      :alt="card.alt"
      :click-handler="card.clickHandler"
      @click="activeCard = index"
    />
  </div>
</template>
<style lang="scss" scoped>
.card {
  transition: all 0.5s ease;
}
</style>

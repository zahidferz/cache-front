<script>
// import GxCardCarousel from '@components/_Core/Cards/GxCardCarousel.vue'
import GxCard from '@components/_Core/Cards/GxCard.vue'
import Glider from 'glider-js'

export default {
  name: 'GxCarousel',
  components: {
    GxCard,
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
      carouselCardStyles: '',
      carouselContainerStyles: '',
      carouselCardContainerStyles: '',
    }
  },
  mounted() {
    const itemWidth = 250
    /* eslint-disable */
    new Glider(document.querySelector('.glider'), {
      /* eslint-enable */
      itemWidth: itemWidth,
      exactWidth: true,
      // scrollLock: true,
      // slidesToShow: 5,
    })

    // setTimeout(() => {
    //   const gliderWidth = document.querySelector('.glider').clientWidth
    //   const gliderTrackOriginalWidth = document.querySelector('.glider-track')
    //     .clientWidth
    //   const cardSpacing = 16
    //   document.querySelector(
    //     '.glider-track'
    //   ).style.width = `${gliderTrackOriginalWidth +
    //     gliderWidth / 2 -
    //     cardSpacing}px` // `${gliderTrackOriginalWidth + gliderWidth - itemWidth}px`
    // }, 1000)
  },
}
</script>
<template>
  <div class="overflow-x-hidden">
    <div class="glider">
      <!-- <div class="left-padding">A</div> -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="p-4 cardContainer"
      >
        <GxCard
          :headline="card.title"
          :card-img="card.image"
          alt="Some image"
        />
      </div>
      <!-- <div class="right-padding"></div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '~glider-js/glider.css';
.glider {
  // padding-top: 1rem;
  // padding-bottom: 1rem;
  // padding-left: calc(50% - 75px);
}
.glider-track > *:not(:first-child) {
  // padding-top: 1rem;
  // padding-bottom: 1rem;
  // margin-left: 1rem;
  // margin-right: 1rem;
}
.glider-track > .active .gxCardCore {
  box-shadow: 0 28px 38px rgba(0, 0, 0, 0.28);
}
.cardContainer {
  perspective: 1000px;
}
.glider-track > :not(.active) .gxCardCore {
  transform: translate3d(0, 0, -100px);
}
</style>

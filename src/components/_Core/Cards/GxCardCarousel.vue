<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
export default {
  name: 'GxCardCarousel',
  components: {
    GxCardCore,
  },
  props: {
    image: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: null,
    },
    headline: {
      type: String,
      default: null,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    body: {
      type: String,
      default: null,
    },
  },
}
</script>
<template>
  <GxCardCore class="flex flex-col" v-on="$listeners" @click="clickHandler">
    <div class="pb-4">
      <div class="flex justify-center items-center mb-8">
        <img :src="image" :alt="alt" class="w-full" />
      </div>
      <h1 class="gx-h4 font-bold text-primary px-4 mb-4">{{ headline }}</h1>
      <p class="gx-subtitle px-4">{{ body }}</p>
    </div>
  </GxCardCore>
</template>

<script>
import GxCardCore from './GxCardCore'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxCardSmall',
  components: {
    GxCardCore,
    GxIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    bodyText: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    overline: {
      type: String,
      default: '',
    },
    captionText: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <GxCardCore class="inline-block">
    <div class="w-48">
      <div
        class="gxCardImage bg-cover bg-center"
        :style="`background-image: url(${image});`"
      >
      </div>
      <!-- <div class="flex rounded-lg rounded-b-none justify-center">
        <img :src="image" :alt="alt" />
      </div> -->
      <div class="p-4">
        <div class="py-2">
          <p class="gx-overline">{{ overline }}</p>
          <p class="gx-h5">{{ title }}</p>
          <p>{{ bodyText }}</p>
        </div>
        <div class="flex items-center">
          <GxIcon :icon="icon" class="mr-1" />
          <p class="gx-caption">{{ captionText }}</p>
        </div>
      </div>
    </div>
  </GxCardCore>
</template>
<style lang="scss" scoped>
.gxCardImage::before {
  display: block;
  padding-top: 56.25%;
  content: '';
}
</style>

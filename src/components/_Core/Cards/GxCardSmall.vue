<script>
import GxCardCore from './GxCardCore'
export default {
  name: 'GxCardSmall',
  components: {
    GxCardCore,
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
    imgTitle: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <GxCardCore class="inline-block">
    <div class="px-4 p-4">
      <div>
        <p>{{ title }}</p>
        <p class="gx-h2 mt-4">{{ bodyText }}</p>
      </div>
      <div v-show="image !== ''">
        <p>{{ imgTitle }}</p>
        <div class="flex flex-col items-center">
          <img alt="" class="w-full flex rounded-md" :src="image" />
        </div>
      </div>
    </div>
  </GxCardCore>
</template>

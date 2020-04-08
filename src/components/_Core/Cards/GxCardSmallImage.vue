<script>
import GxCardCore from './GxCardCore'
export default {
  name: 'GxCardSmallImage',
  components: {
    GxCardCore,
  },
  props: {
    title: {
      type: String,
      default: 'Headline 6',
    },
    bodyText: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    icons: {
      type: Array,
      default: () => {
        return []
      },
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <GxCardCore class="inline-block de:shadow-2">
    <div>
      <div
        class="gxCardImage w-48 de:w-56 bg-cover bg-center"
        :style="`background-image: url(${image});`"
      >
      </div>
      <div v-if="icons.length === 0" class="p-4">
        <p class="gx-h5 de:font-bold de:text-primary-500">{{ title }}</p>
        <p>{{ bodyText }}</p>
      </div>
      <div v-else class="flex justify-around p-4">
        <GxButtonCircle
          v-for="icon in icons"
          :key="icon.id"
          transparent
          :icon="icon.name"
          @click="icon.method('Click')"
        />
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

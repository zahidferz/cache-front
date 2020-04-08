<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxTabs from '@components/_Core/Navigation/GxTabs'
export default {
  name: 'CardWithTabs',
  components: {
    GxCardCore,
    GxTabs,
  },
  props: {
    data: {
      type: Number,
      default: 88.9,
    },
    dataMin: {
      type: Number,
      default: 79.23,
    },
    tabsArray: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'Headline 5',
    },
    caption: {
      type: String,
      default: 'Caption',
    },
  },
}
</script>
<template>
  <GxCardCore class="flex flex-col">
    <div class="px-4 pt-4 pb-2">
      <div class="mb-4">
        <p class="gx-h3">{{ title }}</p>
        <p class="gx-caption">{{ caption }}</p>
      </div>
      <div class="flex">
        <p class="gx-h2 flex-grow">{{ data }}</p>
        <p class="self-end ">{{ dataMin }} %</p>
      </div>
    </div>
    <GxTabs :tabs="tabsArray" class="flex-grow" />
  </GxCardCore>
</template>

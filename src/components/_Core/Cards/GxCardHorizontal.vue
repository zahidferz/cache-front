<script>
import GxCardCore from './GxCardCore'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxCardHorizontal',
  components: {
    GxCardCore,
    GxIcon,
  },
  props: {
    actions: {
      type: Array,
      default: () => {
        return []
      },
    },
    cardImg: {
      type: String,
      default: null,
    },
    textBody: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasMultipleActions() {
      return this.actions.length > 1
    },
  },
}
</script>

<template>
  <GxCardCore v-on="$listeners">
    <div class="flex">
      <div
        v-if="cardImg"
        class="w-28 bg-cover bg-center"
        :style="`background-image: url(${cardImg});`"
      >
        <!-- <img
          :src="cardImg"
          :alt="alt"
          class="h-full w-32 rounded-lg rounded-r-none"
        /> -->
      </div>
      <div class="flex-grow">
        <div class="flex px-4 pb-8 pt-2">
          <div class="flex-grow">
            <p class="gx-h4 font-bold">{{ title }}</p>
            <p>{{ textBody }}</p>
          </div>
          <GxIcon icon="favorite" class="self-start text-primary-500" />
        </div>
        <div
          class="flex px-4 pb-4"
          :class="{ 'justify-end': hasMultipleActions }"
        >
          <GxButton
            v-for="(action, index) in actions"
            :key="action.id"
            plain
            :class="{ 'ml-4': index > 0 }"
            @click="action.method"
            >{{ action.label }}</GxButton
          >
        </div>
      </div>
    </div>
  </GxCardCore>
</template>

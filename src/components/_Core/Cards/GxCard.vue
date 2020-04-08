<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxChip from '@components/_Core/Chips/GxChip'
import GxCheckboxGroup from '@components/_Core/Forms/GxCheckboxGroup'

export default {
  name: 'GxCard',
  components: {
    GxCardCore,
    GxChip,
    GxCheckboxGroup,
  },
  props: {
    cardImg: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => {
        return []
      },
    },
    inputs: {
      type: Array,
      default: () => {
        return []
      },
    },
    headline: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    textBody: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => {
        return []
      },
    },
    subtitle: {
      type: String,
      default: '',
    },
    textBodyBold: {
      type: String,
      default: '',
    },
    chips: {
      type: Array,
      default: () => {
        return []
      },
    },
    alt: {
      type: String,
      required: true,
    },
    zoom: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      plainButton: false,
    }
  },
  created() {
    // TOGGLE BUTTON STYLES BETWEEN DESK AND MOBILE VERSION
    const isPlainButton = () => {
      this.plainButton = document.documentElement.clientWidth < 768
    }
    window.addEventListener('resize', isPlainButton)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', isPlainButton)
    })
    isPlainButton()
  },
}
</script>
<template>
  <GxCardCore class="flex-grow flex flex-col cursor-pointer" v-on="$listeners">
    <slot>
      <div class="flex-grow flex flex-col">
        <div
          v-if="cardImg"
          class="flex justify-center items-center mo:mb-8"
          :class="{ zoom: zoom }"
        >
          <img :src="cardImg" :alt="alt" class="w-full " />
        </div>
        <div class="px-4 flex-grow">
          <h1 class="gx-h3 font-bold de:gx-h5 text-primary">{{ headline }}</h1>
          <p v-if="caption" class="gx-caption de:gx-caption">{{ caption }}</p>
          <div v-if="tags" class="flex">
            <div v-for="tag in tags" :key="tag.id">
              <p class="gx-caption de:gx-caption font-bold mr-1">{{ tag }}</p>
            </div>
          </div>
          <p v-if="textBody" class="mt-4 de:mt-1">{{ textBody }}</p>
          <div v-if="chips" class="flex mb-8 de:mb-0">
            <GxChip
              v-for="(chip, index) in chips"
              :key="chip.id"
              :class="{ 'ml-4': index > 0 }"
              :disabled="chip.disabled"
              @click="chip.clickHandler"
              >{{ chip.text }}</GxChip
            >
          </div>
          <div v-if="inputs" class="text-left">
            <GxCheckboxGroup :inputs="inputs" label-position="inline" />
          </div>
        </div>
      </div>
      <div
        v-if="buttons.length > 0"
        class="flex justify-end de:justify-center pb-4 px-4"
      >
        <GxButton
          v-for="(button, index) in buttons"
          :key="button.id"
          :plain="plainButton"
          :class="{ 'ml-4': index > 0 }"
          @click="button.clickHandler"
          >{{ button.text }}</GxButton
        >
      </div>
    </slot>
  </GxCardCore>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.gxCardImage::before {
  display: block;
  padding-top: 56.25%;
  content: '';
}
.zoom {
  transition: all 0.05s ease-in-out;
}
.zoom:hover {
  transform: scale(1.08);
}
.zoom:active {
  transform: scale(1);
}
</style>

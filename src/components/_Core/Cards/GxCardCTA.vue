<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxCardCTA',
  components: {
    GxIcon,
  },
  props: {
    cardImg: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
  },
}
</script>
<template>
  <div class="relative leading-none">
    <div
      class="z-1 gxCardOne gxOutter p-4 flex shadow-2 active:shadow-4 active:bg-secondary-50 bg-white de:hover:bg-gray-200 cursor-pointer rounded gxCardContainer absolute w-full"
      v-on="$listeners"
    >
      <div
        v-if="cardImg"
        class="w-12 h-12 mr-4 bg-cover bg-center rounded-lg gxCTAIcon"
        :style="`background-image: url(${cardImg});`"
      >
      </div>
      <div
        v-if="icon"
        class="w-12 h-12 bg-primary-400 bg-cover rounded-lg flex items-center justify-center text-center mr-4 gxCTAIcon"
      >
        <GxIcon :icon="icon" class="gxCTAIcon text-white" />
      </div>
      <div class="flex flex-col justify-center overflow-hidden">
        <p class=" mr-1 font-bold uppercase truncate text-base">{{ title }}</p>
        <p class="mr-1 de:text-base mt-2">{{ subtitle }}</p>
      </div>
    </div>
    <div
      class="gxBackgroundCard gxCardContainer bg-gray-200 rounded gx-second border-2 border-dashed relative"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.gxCardContainer {
  height: 80px;
}
.gxBackgroundCard {
  top: -4px;
  left: -4px;
}
.gxCTAIcon {
  min-width: 3rem;
  font-size: 2rem;
}
.gxOutter:active {
  // It seems that tailwind does not  use a correct pattern hover  focus active
  background-color: var(--secondary-100);
}

@screen de {
  .gxBackgroundCard {
    top: -8px;
    left: -8px;
    background-color: white;
  }
  .gxCardOne {
    background-color: var(--gray-100);
    box-shadow: none;
    transition: transform 0.1s ease-in-out;
  }

  .gxCardOne:hover {
    transition: transform 0.1s ease-in-out;
    transform: translate(-8px, -8px);
  }
}
</style>

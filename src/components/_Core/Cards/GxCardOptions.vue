<script>
import GxCardCore from './GxCardCore'
export default {
  name: 'GxCardOptions',
  components: {
    GxCardCore,
  },
  props: {
    image: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <GxCardCore
    class="gxWidth shadow-2 cursor-pointer border-gray-700 shadow-2 active:shadow-4 active:bg-secondary-50 de:hover:bg-gray-200 gxOutter"
    v-on="$listeners"
  >
    <div class="flex-grow  flex items-center flex-col">
      <img v-if="image" class="gxImage" :src="image" />
      <div class="px-4 mt-4 de:mt-0 de:mb-8">
        <h5 class="gx-h5 font-bold text-primary mb-4">{{ label }} </h5>
        <p>
          {{ subtitle }}
        </p>
      </div>
    </div>
  </GxCardCore>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.gxImage {
  width: 4.75rem;
  height: 4.75rem;
}
.gxWidth {
  width: 266px;
}

@screen de {
  .gxWidth {
    width: 264px;
  }
  .gxImage {
    width: 240px;
    height: 240px;
  }
  .gxOutter:active {
    // It seems that tailwind does not  use a correct pattern hover  focus active
    background-color: var(--secondary-50);
  }
}
</style>

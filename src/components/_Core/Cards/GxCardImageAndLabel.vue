<script>
import GxCardCore from './GxCardCore'
export default {
  name: 'GxCardImageAndLabel',
  components: {
    GxCardCore,
  },
  props: {
    image: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <GxCardCore
    class="w-full"
    :loading="loading"
    :disabled="disabled"
    v-on="$listeners"
  >
    <div class="flex-grow flex">
      <div
        v-if="image"
        class="gxRoleCardImage bg-contain bg-center bg-no-repeat"
        :style="`background-image: url(${image});`"
      >
      </div>

      <slot name="label">
        <p class="gx-h5 font-bold text-primary flex flex-grow items-center p-4"
          >{{ label }}
        </p>
      </slot>
    </div>
  </GxCardCore>
</template>

<style lang="scss" scoped>
.gxRoleCardImage {
  min-width: 7.5rem;
  min-height: 9rem;
}
</style>

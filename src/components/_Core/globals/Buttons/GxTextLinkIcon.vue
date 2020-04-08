<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxTextLinkIcon',
  components: {
    GxIcon,
  },
  props: {
    to: {
      type: Object,
      default: null,
    },
    targetBlank: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Agregar cuenta',
    },
    icon: {
      type: String,
      default: 'add',
    },
  },
}
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="gxFontSize gx-caption text-gray-700 cursor-pointer flex items-center focus:border-none focus:outline-none"
    v-on="$listeners"
  >
    {{ text }}
    <GxIcon :icon="icon" class="bg-gray-200 rounded ml-1" />
  </RouterLink>
  <button
    v-else
    class="gxFontSize gx-caption text-gray-700 cursor-pointer flex items-center focus:border-none focus:outline-none"
    v-on="$listeners"
  >
    {{ text }}
    <GxIcon :icon="icon" class="bg-gray-200 rounded ml-1" />
  </button>
</template>

<style lang="scss" scoped>
@screen de {
  .gxFontSize {
    font-size: 0.75rem;
  }
}
</style>

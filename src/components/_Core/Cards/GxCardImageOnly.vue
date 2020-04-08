<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxCard',
  components: {
    GxIcon,
  },
  props: {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: false,
    }
  },
}
</script>
<template>
  <button
    class="h-36 w-36 shadow-2 mb-2 inline-block relative rounded-lg"
    v-on="$listeners"
    @click.stop="selected = !selected"
  >
    <GxIcon
      v-if="selected"
      class="absolute text-white selectedCheck z-10"
      icon="check_circle"
    />
    <img :src="image" :alt="alt" class="rounded-lg relative" />
  </button>
</template>
<style lang="scss">
.selectedCheck {
  top: 4px;
  right: 4px;
}
</style>

<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxDesktopHeader',
  components: {
    GxIcon,
  },
  props: {
    header: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconClickHandler: {
      type: Function,
      default: null,
    },
    back: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      if (this.iconClickHandler) {
        this.iconClickHandler()
      } else {
        this.$router.back()
      }
    },
  },
}
</script>

<template>
  <header class="flex mb-4 items-center justify-between">
    <slot name="left">
      <h1 class="gx-h5 text-black font-bold flex items-center">
        <slot name="left-icon">
          <button v-if="back" class="flex items-center" @click="goBack">
            <GxIcon icon="keyboard_backspace" />
          </button>
          <button
            v-else-if="iconClickHandler || back"
            class="flex items-center"
            @click="goBack"
          >
            <GxIcon :icon="icon" />
          </button>
          <GxIcon v-else-if="icon" :icon="icon" class="text-primary" />
        </slot>
        <span class="font-bold ml-2">{{ header }}</span>
      </h1>
    </slot>
    <slot name="right"> </slot>
  </header>
</template>

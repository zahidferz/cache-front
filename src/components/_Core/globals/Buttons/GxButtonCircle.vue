<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxButtonCircle',
  components: {
    GxIcon,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    dark: {
      type: Boolean,
      default: false,
    },
    transparent: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
    label: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      initialWidth: this.full ? '100%' : 'initial',
    }
  },
  watch: {
    // loading(newVal) {
    //   if (newVal) {
    //     const width = this.$refs.button.clientWidth
    //     this.$refs.button.style.setProperty('--initial-width', width + 'px')
    //   }
    // },
  },
}
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    class="
      flex justify-center items-center rounded-full focus:outline-none relative"
    :class="{
      'bg-white': loading,
      'text-gray-500 border-gray-500 cursor-not-allowed': disabled && !loading,
      'bg-gray-300 text-gray-500': disabled && !loading,
      'gx-button-icon': !transparent,
      'bg-primary text-white shadow-4 sm:hover:shadow-4 sm:hover:bg-primary-600 active:shadow-none':
        !disabled && !dark && !transparent,
      'bg-white text-primary sm:hover:bg-secondary-50 active:bg-secondary-200':
        dark && (!disabled || !transparent || !loading),
      'bg-transparent text-primary-500 sm:hover:text-primary-600 active:text-primary-400': transparent,
    }"
    :type="to ? 'text/html' : type"
    :aria-label="label"
    v-on="$listeners"
  >
    <div v-if="loading" class="loader"></div>
    <GxIcon
      :class="{ invisible: loading }"
      :icon="icon"
      class="fontSize"
      aria-hidden="true"
      focusable="false"
    />
  </component>
</template>
<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.loader {
  position: absolute;
  width: 42%;
  height: 42%;
  border: 3px solid transparent;
  border-top-color: var(--primary);
  border-right-color: var(--primary);
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  animation-name: spin;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 500ms;
  animation-iteration-count: infinite;
}
.fontSize {
  font-size: 1.125rem;
}
.gx-button-icon {
  width: 3.125rem;
  height: 3.125rem;
}

@screen de {
  .gx-button-icon {
    width: 2.75rem;
    height: 2.75rem;
  }
  .fontSize {
    font-size: 0.875rem;
  }
}
</style>

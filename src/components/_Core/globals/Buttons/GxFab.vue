<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxFab',
  components: {
    GxIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'add',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
    mobile: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <button
    :type="type"
    data-testid="FAB"
    class="
      flex justify-center items-center rounded-full"
    :class="{
      'gxFAB w-12 h-12': !large && !mini,
      'fabMini w-14 h-14': mini,
      'fabLarge w-13 h-13': large,
      'fabMobile w-13 h-13': mobile,
      'sm:hover:bg-primary-600 active:bg-primary-500 text-white focus:bg-primary-400':
        !disabled && !loading && !dark && !dashed,
      'bg-primary-500 shadow-5 active:shadow-none': !disabled && !loading,
      'cursor-not-allowed bg-gray-300 text-white': disabled || loading,
      'bg-white text-primary-500 sm:hover:bg-gray-100 border border-primary-500 border-dashed border-4': dashed,
      'bg-white text-primary-500': dark,
      'focus:text-primary-200 sm:hover:text-secondary-200 sm:hover:bg-secondary-50 active:bg-secondary-200 ':
        dark && !disabled,
    }"
    :disabled="disabled || loading"
    :aria-label="label"
    v-on="$listeners"
  >
    <GxIcon
      v-if="!loading"
      :icon="icon"
      :class="{ fabMobile: mobile }"
    ></GxIcon>
    <div v-else class="absolute spinner pointer-events-none"></div>
  </button>
</template>

<style lang="scss" scoped>
.fabMini {
  width: 3.125rem;
  height: 3.125rem;
  font-size: 18px;
}
.gxFAB {
  font-size: 1.5rem;
}

.fabLarge {
  width: 3.25rem;
  height: 3.25rem;
  font-size: 1.25rem;
}
.fabMobile {
  font-size: 1.125rem;
}

@screen de {
  .fabLarge {
    width: 3.25rem;
    height: 3.25rem;
    font-size: 1rem;
  }
  .fabMini {
    width: 2.75rem;
    height: 2.75rem;
  }
  .gxFAB {
    font-size: 0.75rem;
  }
}

// Loader
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner::before {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  content: '';
  border: 2px solid #a176ff;
  border-top-color: #6d31ff;
  border-radius: 50%;
  animation: spinner 0.6s linear infinite;
}
</style>

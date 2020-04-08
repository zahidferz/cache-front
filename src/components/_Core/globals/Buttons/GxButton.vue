<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxButton',
  components: {
    GxIcon,
  },
  props: {
    icon: {
      type: String,
      default: null,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingSuccess: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: Boolean,
      default: false,
    },
    variantSecondary: {
      type: Boolean,
      default: false,
    },
    heightVariant: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  data() {
    return {
      initialWidth: this.full ? '100%' : 'initial',
    }
  },
  watch: {
    loading(newVal) {
      // if (newVal) {
      // const width = this.$refs.button.clientWidth
      // this.$refs.button.style.setProperty('--initial-width', width + 'px')
      // }
    },
  },
  mounted() {
    if (!this.to) {
      this.$refs.button.style.setProperty('--initial-width', this.initialWidth)
    }

    // TODO: Fix ripple effect for unit test
    // const clickPosition = (evt) => {
    // const clientRect = evt.currentTarget.getBoundingClientRect()
    // const x = evt.pageX - clientRect.left
    // const y = evt.pageY - clientRect.top
    // this.$refs.button.style.setProperty('--ripple-x', `${x}px`)
    // this.$refs.button.style.setProperty('--ripple-y', `${y}px`)
    // }
    // this.$el.addEventListener('click', clickPosition)
    // this.$once('hook:beforeDestroy', () => {
    //   this.$el.removeEventListener('click', clickPosition)
    // })
    // if (this.plain) return
    // if (this.dark) {
    //   this.setRippleBackground('#D8C6FE')
    //   return
    // }
    // if (this.ghost) {
    //   this.setRippleBackground('#F1E8FF')
    //   return
    // }
    // this.setRippleBackground('#FFFFFF')
  },
  methods: {
    setRippleBackground(background) {
      this.$refs.button.style.setProperty('--ripple-background', background)
    },
  },
}
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    ref="button"
    :to="to"
    class="flex justify-center items-center uppercase  font-bold outline-none focus:outline-none"
    :class="{
      ripple: !plain,
      loading: loading,
      loadingSuccess: loadingSuccess,
      'gx-height-variant': heightVariant,
      'gx-button--plain': plain,
      'px-4 mb-2': !plain && !variantSecondary && !variant,
      'w-full': full,
      'bg-primary-500  hover:bg-primary-600 shadow-2 active:shadow-none focus:shadow-none':
        !ghost && !disabled && !loading && !plain && !dark,
      'bg-secondary-300 de:gx-caption cursor-pointer font-bold text-white gx-height-variant-secondary py-1 px-4': variantSecondary,
      'bg-primary-500': loading,
      'rounded-full':
        (!variant && !plain && !variantSecondary) || (plain && loading),
      'rounded-lg variant-button': variant,
      'gx-button': !variant,
      rounded: variantSecondary,
      'focus:bg-primary-400': !ghost && !plain && !dark,
      'bg-transparent text-primary-500': plain,
      'hover:text-secondary-300': plain && !disabled,
      'border border-primary-500 text-primary-500 focus:text-secondary-300 focus:border-secondary-300': ghost,
      'text-gray-500 border-gray-500 cursor-not-allowed': disabled || loading,
      'bg-gray-300': disabled && !loading && !ghost && !plain,
      'bg-white': (disabled || loading) && ghost && !variant,
      'text-white': !ghost && !plain && !dark,
      'hover:text-primary-400 hover:border-primary-400 focus:text-secondary-300 focus:border-secondary-300':
        plain && !disabled,
      'bg-white text-primary-500  hover:text-primary-600 shadow-2 active:shadow-none focus:shadow-none focus:bg-secondary-50': dark,
      'focus:bg-secondary-50 focus:text-secondary-300':
        ghost && variant && !dark,
    }"
    :type="to ? 'text/html' : type"
    :disabled="disabled || loading || loadingSuccess"
    :data-testid="$slots.default[0].text"
    v-on="$listeners"
  >
    <GxIcon
      v-if="loadingSuccess"
      class="material-icons absolute"
      :class="{ 'text-white': !plain && !dark, 'text-primary-500': plain }"
      aria-hidden="true"
      focusable="false"
      icon="done"
    />
    <GxIcon
      v-if="icon"
      :class="{ invisible: loading || loadingSuccess, 'mr-4': $mq === 'mo' }"
      class="material-icons mr-2"
      aria-hidden="true"
      focusable="false"
      :icon="icon"
    />
    <div
      :class="{
        invisible: loading || loadingSuccess,
        'pointer-events-none': disabled,
      }"
      class="slotContainer de:font-bold"
    >
      <slot />
    </div>
  </component>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.gx-button {
  --initial-width: initial;

  width: var(--initial-width);
  min-width: 9.5rem;
  height: 3.125rem;
  font-family: 'Muli';
  font-size: 1.125rem;
  line-height: 2rem;
  text-transform: uppercase;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  // Make loading end transition .1 seconds slower since it has just an icon and it looks like it's snapping faster on exit.
  transition: all 0.6s ease-in-out;
}
.gx-button--plain {
  min-width: initial;
  height: 24px;
}
.gx-button--plain .slotContainer {
  top: -2px;
}
.gx-button i {
  font-size: inherit;
}

@screen de {
  .variant-button {
    height: 1.75rem;
    padding-right: 2rem;
    padding-left: 2rem;
    font-family: 'Muli';
    font-size: 0.75rem;
  }
  .gx-button {
    height: 2.75rem;
    font-size: 0.75rem;
    font-weight: 800;
  }
  .slotContainer {
    top: 0;
    letter-spacing: 0;
  }
  .gx-button--plain .slotContainer {
    top: 0;
  }
  .gx-height-variant {
    height: 1.75rem;
  }
  .gx-height-variant .slotContainer {
    top: -1px;
  }
  .gx-height-variant-secondary {
    min-width: 0;
    height: 1.125rem;
    font-size: 0.625rem;
    line-height: 15px;
    text-transform: none;
  }
}

// Ripple

/* Ripple effect */
.ripple {
  --ripple-x: 0;
  --ripple-y: 0;
  --ripple-background: white;

  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.ripple::after {
  position: absolute;
  top: calc(var(--ripple-y) - 32.5px);
  left: calc(var(--ripple-x) - 31px);
  display: none;
  width: 61px;
  height: 65px;
  pointer-events: none;
  content: '';
  background-color: var(--ripple-background);
  border-radius: 50%;
  opacity: 0;
  transform-origin: center center;
  animation: ripple 1s;
}

.ripple:focus:not(:active)::after {
  display: block;
}

@keyframes ripple {
  from {
    opacity: 0.5;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(10);
  }
}
// Loader
@keyframes spin {
  from {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(0deg);
  }
  to {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(360deg);
  }
}

.loading {
  width: 50px;
  min-width: 50px;
  height: 50px;
  transition: all 0.5s ease-in-out;
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 1.3s;
  animation-iteration-count: infinite;
}

@screen de {
  .loading {
    width: 44px;
    min-width: 44px;
    height: 44px;
  }
}
</style>

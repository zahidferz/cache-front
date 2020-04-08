<script>
export default {
  name: 'GxCardCore',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      startAnimation: false,
      initialWidth: null,
      initialHeight: null,
      initialOffsetLeft: null,
      initialOffsetTop: null,
    }
  },
  watch: {
    loading(newVal) {
      if (newVal) {
        requestAnimationFrame(() => {
          this.initialWidth =
            this.initialWidth || this.$el.getBoundingClientRect().width
          this.initialHeight =
            this.initialHeight || this.$el.getBoundingClientRect().height
          this.initialOffsetLeft = this.initialOffsetLeft || this.$el.offsetLeft
          this.initialOffsetTop = this.initialOffsetTop || this.$el.offsetTop

          // this.$el.style.setProperty('position', 'fixed')
          this.$el.style.setProperty('width', `${this.initialWidth}px`)
          this.$el.style.setProperty('height', `${this.initialHeight}px`)
          // this.$el.style.setProperty('left', `${this.initialOffsetLeft}px`)
          // this.$el.style.setProperty('top', `${this.initialOffsetTop}px`)

          requestAnimationFrame(() => {
            this.startAnimation = true
            this.$el.style.setProperty('width', `50px`)
            this.$el.style.setProperty('height', `50px`)
            // this.$el.style.setProperty('left', `calc(50% - 25px)`)
            // this.$el.style.setProperty('top', `calc(50% - 25px)`)
          })
        })
      } else {
        // Reset hardcoded styles
        requestAnimationFrame(() => {
          // this.$el.style.setProperty('position', 'initial')
          // this.$el.style.setProperty('left', `${this.$el.offsetLeft}px`)
          // this.$el.style.setProperty('top', `${this.$el.offsetTop}px`)
          this.$el.style.setProperty('width', `${this.initialWidth}px`)
          this.$el.style.setProperty('height', `${this.initialHeight}px`)
          this.$el.style.setProperty('left', `${this.initialOffsetLeft}px`)
          this.$el.style.setProperty('top', `${this.initialOffsetTop}px`)
          requestAnimationFrame(() => {
            this.$el.style.setProperty('position', 'relative')
            this.$el.style.setProperty('left', `0px`)
            this.$el.style.setProperty('top', `0px`)
            this.startAnimation = false
          })
        })
      }
    },
  },
}
</script>

<template>
  <div
    class="gxCardCore rounded-lg bg-white shadow-2"
    :class="[
      {
        loading: startAnimation,
        'disabled cursor-not-allowed pointer-events-none': disabled,
      },
      {
        'active:shadow-4': clickable,
      },
    ]"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.gxCardCore {
  overflow: hidden;
  transition: all 0.5s ease-in-out, background-color 0;
}
.gxCardCore:active {
  transform: translateZ(2rem);
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
  overflow: hidden;
  border: 2px solid var(--secondary-300);
  border-top-color: var(--primary-500);
  border-radius: 9999px;
  box-shadow: none;
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 500ms;
  animation-iteration-count: infinite;
}
.loading::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: ' ';
}
// Hide card contents
.loading > div {
  visibility: hidden;
}

.disabled {
  position: relative;
}
.disabled::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  content: '';
  background-color: var(--gray-500);
  opacity: 0.7;
}
</style>

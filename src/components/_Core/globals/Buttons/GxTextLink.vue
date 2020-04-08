<script>
export default {
  name: 'GxTextLink',
  props: {
    to: {
      type: Object,
      default: null,
    },
    targetBlank: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // Forcing page navigation on mousedown to avoid problems when a form's errors would move
    // the text-link position and navigation would not happen.
    const mouseDownHandler = () => {
      if (this.targetBlank && this.to) {
        let route = this.$router.resolve(this.to)
        window.open(route.href, '_blank')
      } else if (this.to) {
        this.$router.push(this.to)
      }
    }
    this.$el.addEventListener('mousedown', mouseDownHandler)
    this.$once('hook:beforeDestroy', () => {
      this.$el.removeEventListener('mousedown', mouseDownHandler)
    })
  },
}
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    class="font-bold cursor-pointer focus:outline-none"
    :class="{ 'gx-caption': $mq === 'mo' }"
    :target="targetBlank ? '_blank' : null"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

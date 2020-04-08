<script>
export default {
  name: 'GxChip',
  props: {
    leftIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>
<template>
  <button
    ref="button"
    class="ripple relative text-xs text-secondary hover:text-primary-400 bg-secondary-50 hover:bg-secondary-100 px-4 py-2 rounded-full inline-flex items-center"
    :class="{
      'gxChip--left-icon': leftIcon,
    }"
    :style="
      `--left-icon-content: '${leftIcon}'; --ripple-left: 50%; --ripple-top: 50%;`
    "
    v-on="$listeners"
  >
    <slot />
  </button>
</template>
<style lang="scss" scoped>
.gxChip--left-icon::after {
  margin-left: 0.5rem;
  font-family: 'Material Icons Round', serif;
  content: var(--left-icon-content);
}

/* Ripple effect */
.ripple {
  background-position: center;
  transition: background 0.8s;
}
.ripple:hover {
  background: var(--secondary-100)
    radial-gradient(circle, transparent 1%, var(--secondary-100) 1%);
  background-position: left var(--ripple-left) top var(--ripple-top);
  background-size: 15000%;
}
.ripple:active {
  background-color: var(--secondary-200);
  background-size: 100%;
  transition: background 0s;
}
</style>

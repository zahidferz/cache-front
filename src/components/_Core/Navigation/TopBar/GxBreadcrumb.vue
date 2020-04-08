<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxBreadcrumb',
  components: {
    GxIcon,
  },
  props: {
    hasScrolled: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: Object,
      default: null,
    },
  },
  computed: {
    matchedRoutes() {
      return this.$route.matched.slice(1)
    },
  },
}
</script>
<template>
  <ul class="flex-grow flex justify-start">
    <RouterLink
      tag="li"
      class="flex justify-start items-center gx-h5"
      :to="{ name: 'dashboard' }"
    >
      <GxIcon :class="[classes.icon]" icon="dashboard" />
      <GxIcon
        :class="[classes.next]"
        class="gxNext mx-1"
        icon="navigate_next"
      />
    </RouterLink>
    <RouterLink
      v-for="(route, index) in matchedRoutes"
      :key="route.name"
      tag="li"
      class="flex justify-start items-center  gx-h5"
      :to="{ name: route.name }"
    >
      <template v-if="route.meta.icon">
        <GxIcon
          :class="[
            route.name === $route.name || route.redirect.name === $route.name
              ? classes.active
              : classes.icon,
          ]"
          :icon="route.meta.icon"
        />
        <GxIcon
          v-if="
            index !== matchedRoutes.length - 1 &&
              matchedRoutes[index + 1].meta.icon
          "
          :class="[classes.next]"
          class="mx-1  gxNext"
          icon="navigate_next"
        />
      </template>
    </RouterLink>
    <div class="ml-4 title">
      <slot />
    </div>
  </ul>
</template>
<style lang="scss" scoped>
.gxNext {
  font-size: 1rem;
}

@media screen and (max-width: 413px) {
  .title {
    display: none;
  }
}
</style>

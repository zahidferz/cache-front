<script>
// import NavBar from '@components/_Core/Navigation/NavBar'
import GxBottomNav from '@components/_Core/Navigation/GxBottomNav'
export default {
  components: {
    // NavBar,
    GxBottomNav,
  },
}
</script>

<template>
  <div id="layout" class="flex flex-col">
    <!-- <NavBar /> -->
    <div class="container m-auto flex flex-grow pb-16">
      <div class="w-full">
        <div class="px-1">
          <slot />
        </div>
      </div>
      <GxBottomNav />
    </div>
  </div>
</template>
<style lang="scss" scoped>
#layout {
  width: 100%;
  height: 100%;
  background: red;
}
</style>

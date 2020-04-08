<script>
export default {
  data() {
    return {}
  },
}
</script>

<template>
  <div class="bottom-nav flex justify-between w-full h-12 shadow-7 sm:hidden">
    <button
      v-for="i in [1, 2]"
      :key="i"
      class="flex-grow flex justify-center items-center"
    >
      <i class="material-icons">cloud_upload</i>
    </button>
    <div class="flex justify-center items-center">
      <GxFab class="mb-8" />
    </div>
    <button
      v-for="i in [4, 5]"
      :key="i"
      class="flex-grow flex justify-center items-center"
    >
      <i class="material-icons">cloud_upload</i>
    </button>
  </div>
</template>

<style lang="scss">
/* stylelint-disable */
.bottom-nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: white;
}
</style>

<script>
export default {
  name: 'GxLoader',
}
</script>
<template>
  <div class="flex-grow flex justify-center items-center">
    <div class="loading rounded-full"> </div>
  </div>
</template>
<style lang="scss" scoped>
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
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 0ms;
  animation-iteration-count: infinite;
}
</style>

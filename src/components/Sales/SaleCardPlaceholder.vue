<script>
export default {
  name: 'SaleCardPlaceholder',
}
</script>
<template>
  <div
    class="pt-4 px-4 pb-4 flex items-center w-full border border-gray-200 relative"
  >
    <div class=" flex flex-col justify-center items-center">
      <div class=" animate bg-gray-300 bg-no-repeat h-3 w-6 rounded-lg"></div>
      <div
        class=" animate bg-gray-300 bg-no-repeat h-3 w-4 rounded-lg my-1"
      ></div>
      <div class=" animate bg-gray-300 bg-no-repeat h-3 w-6 rounded-lg"></div>
    </div>
    <div class=" animate bg-gray-300 bg-no-repeat w-12 h-12 rounded-lg ml-8">
    </div>
    <div class="ml-4 flex flex-col justify-center">
      <div class=" animate bg-gray-300 bg-no-repeat rounded-lg  h-4 w-31"></div>
      <div
        class=" animate bg-gray-300 bg-no-repeat rounded-lg my-1 h-4 w-17"
      ></div>
      <div class=" animate bg-gray-300 bg-no-repeat rounded-lg h-4 w-12"></div>
    </div>
    <div
      class="mb-1 bg-gray-200 animate bg-gray-300 bg-no-repeat h-5 w-18 rounded-lg absolute bottom-0 right-0 mr-4"
    >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.animate {
  background: linear-gradient(
    to right,
    var(--gray-300) 4%,
    var(--gray-400) 40%,
    var(--gray-300) 60%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
    // background-position: 1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>

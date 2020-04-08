<script>
export default {
  name: 'SaleRowLoader',
}
</script>
<template>
  <tr class="border-b border-gray-200">
    <td class="border-r border-gray-200 align-middle  ">
      <div class="pl-2 pr-4 flex flex-col justify-center items-center">
        <div
          class="bg-gray-300 animate rounded gxH"
          style="width: calc((18 / 1024) * 100vw)"
        ></div>
        <div
          class="bg-gray-300 animate rounded mt-1 gxH w-9"
          style="width: calc((36 / 1024) * 100vw)"
        ></div>
      </div>
    </td>
    <td class="py-4 align-middle">
      <div
        class="flex items-center overflow-hidden flex-grow-0 flex-shrink-0 w-fit-content"
      >
        <div
          class="w-6 h-6 gxLongTable bg-gray-300 animate rounded flex-grow-0 flex-shrink-0  ml-2"
        >
        </div>
        <div
          style="width: calc((86 / 1024) * 100vw)"
          class="ml-4 rounded bg-gray-300 animate h-3"
        >
        </div>
      </div>
    </td>
    <td class="align-middle">
      <div class="px-4">
        <div
          style="width: calc((56 / 1024) * 100vw)"
          class="rounded h-3 bg-gray-300 animate"
        >
        </div>
      </div>
    </td>
    <td class="align-middle">
      <div class="px-4">
        <div
          style="width: calc((56 / 1024) * 100vw)"
          class="rounded h-3 bg-gray-300 animate"
        >
        </div>
      </div>
    </td>
    <td class="align-middle">
      <div class="px-4">
        <div
          style="width: calc((48 / 1024) * 100vw)"
          class="rounded gxH   bg-gray-300 animate"
        >
        </div>
      </div>
    </td>
    <td class="align-middle">
      <div class="px-4 gxLongTable">
        <div
          style="width: calc((128 / 1024) * 100vw)"
          class="rounded gxH   bg-gray-300 animate"
        >
        </div>
      </div>
    </td>
    <td class="align-middle">
      <div class="pl-4 pr-2 flex justify-end">
        <div
          style="width: calc((128 / 1024) * 100vw)"
          class="rounded gxH  bg-gray-300 animate"
        >
        </div>
      </div>
    </td>
  </tr>
</template>
<style lang="scss" scoped>
.gxH {
  height: 0.625rem;
}
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
.gxLongTable {
  display: flex;
}
.gxSmallTable {
  display: none;
}

@media (max-width: 950px) {
  .gxLongTable {
    display: none;
  }
  .gxSmallTable {
    display: initial;
  }
}
</style>

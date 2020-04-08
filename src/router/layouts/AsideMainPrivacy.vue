<script>
import GxDivider from '@components/_Core/Dividers/GxDivider'
import AsideMainMenuPrivacy from './AsideMainMenuPrivacy'

export default {
  name: 'AsideMainPrivacy',
  components: {
    GxDivider,
    AsideMainMenuPrivacy,
  },
}
</script>
<template>
  <aside
    class="bg-gray-100 w-38 flex flex-col py-4 fixed h-full z-101 left-0 top-0"
  >
    <!-- Gestionix Logo -->
    <RouterLink
      :to="{ name: 'welcome' }"
      class="flex items-center mb-4 justify-center"
    >
      <img class="h-5" src="@assets/images/Logos/black.svg" alt="Taquito!" />
    </RouterLink>
    <!-- Company info -->

    <GxDivider />
    <AsideMainMenuPrivacy />
  </aside>
</template>

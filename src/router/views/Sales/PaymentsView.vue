<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'

export default {
  components: {
    LayoutWebMobile,
  },
}
</script>

<template>
  <LayoutWebMobile
    has-drawer
    has-drawer-right
    icon="dashboard"
    title="Dashboard"
  >
    <h1 class="text-black">Payments View</h1>
  </LayoutWebMobile>
</template>

<script>
import Layout from '@layouts/LayoutWeb'

export default {
  components: {
    Layout,
  },
}
</script>

<template>
  <div>
    <Layout
      v-if="$route.fullPath === '/web/saldosencuentas'"
      has-drawer
      has-drawer-right
      icon="dashboard"
      title="Saldos en cuentas"
    >
      <h1>Account Balance view</h1>
    </Layout>
    <RouterView></RouterView>
  </div>
</template>

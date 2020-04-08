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
      v-if="$route.fullPath === '/web/gastos'"
      has-drawer
      has-drawer-right
      icon="dashboard"
      title="Gastos"
    >
      <h1>Expenses view</h1>
    </Layout>
    <RouterView></RouterView>
  </div>
</template>

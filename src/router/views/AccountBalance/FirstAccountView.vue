<script>
import Layout from '@layouts/LayoutWeb'

export default {
  page: {
    title: 'Tu primera cuenta',
    meta: [{ name: 'description', content: 'FirstAccountView' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout
    has-drawer
    has-drawer-right
    icon="dashboard"
    title="Registra tu primera cuenta"
  >
    <h1 class="text-black">Registra tu primera cuenta </h1>
  </Layout>
</template>

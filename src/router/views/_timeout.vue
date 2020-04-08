<script>
import Layout from '@layouts/LayoutMain'

export default {
  page: {
    title: 'Tiempo de carga excedido.',
    meta: [{ name: 'description', content: 'Tiempo de carga excedido.' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <h1 :class="$style.title">
      La página está tardando demasiado tiempo en cargar. Por favor revisa tu
      conexión a Internet y vuelve a intentar.
    </h1>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>

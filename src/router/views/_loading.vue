<script>
import Layout from '@layouts/LayoutMain'

export default {
  page: {
    title: 'Cargando...',
    meta: [{ name: 'description', content: 'Cargando...' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout>
    <Transition appear>
      <div>Cargando...</div>
    </Transition>
  </Layout>
</template>

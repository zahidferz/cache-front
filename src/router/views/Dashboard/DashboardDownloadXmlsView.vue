<script>
import Layout from '@layouts/LayoutWeb'

export default {
  page: {
    title: 'Descarga XMLs',
    meta: [{ name: 'description', content: 'DownloadXmls' }],
  },
  components: { Layout },
}
</script>

<template>
  <Layout
    :has-drawer="$mq === 'de'"
    icon="keyboard_backspace"
    no-top-padding
    title="Conéctate con el SAT"
  >
    Conéctate con el SAT Directamente
  </Layout>
</template>

<script>
import Layout from '@layouts/LayoutWeb'
import ChooseBank from '@components/Signup/InitialTodos/ChooseBank'
export default {
  page: {
    title: 'Banco - Elige',
    meta: [{ name: 'description', content: 'Banco - Elige' }],
  },
  components: { Layout, ChooseBank },
}
</script>

<template>
  <Layout has-search icon="keyboard_backspace" title="Selecciona tu banco">
    <ChooseBank />
  </Layout>
</template>

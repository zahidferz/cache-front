<script>
import Layout from '@layouts/LayoutMain'
import SignupLastname from '@components/Signup/GeneralInfo/SignupLastname'

export default {
  page: {
    title: 'Registro - Apellidos',
    meta: [{ name: 'description', content: 'Registro - Apellidos' }],
  },
  components: { Layout, SignupLastname },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupLastname />
  </Layout>
</template>

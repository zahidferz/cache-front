<script>
import Layout from '@layouts/LayoutMain'
import SignupPassword from '@components/Signup/GeneralInfo/SignupPassword'

export default {
  page: {
    title: 'Registro - Contraseña',
    meta: [{ name: 'description', content: 'Registro - Contraseña' }],
  },
  components: { Layout, SignupPassword },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupPassword />
  </Layout>
</template>

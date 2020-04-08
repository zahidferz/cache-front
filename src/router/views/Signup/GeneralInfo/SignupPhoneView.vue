<script>
import Layout from '@layouts/LayoutMain'
import SignupPhone from '@components/Signup/GeneralInfo/SignupPhone'

export default {
  page: {
    title: 'Registro - Teléfono',
    meta: [{ name: 'description', content: 'Registro - Teléfono' }],
  },
  components: { Layout, SignupPhone },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupPhone />
  </Layout>
</template>

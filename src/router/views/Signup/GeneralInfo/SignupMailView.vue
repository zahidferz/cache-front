<script>
import SignupMail from '@components/Signup/GeneralInfo/SignupMail'
import Layout from '@layouts/LayoutMain'

export default {
  page: {
    title: 'Registro - Correo',
    meta: [{ name: 'description', content: 'Registro - Correo' }],
  },
  components: { Layout, SignupMail },
}
</script>

<template>
  <Layout icon="keyboard_backspace" dark>
    <SignupMail />
  </Layout>
</template>

<script>
import Layout from '@layouts/LayoutMain'
import SignupSendAccountantInvitation from '@src/components/Signup/CompanyInfo/SignupSendAccountantInvitation.vue'

export default {
  page: {
    title: 'Invita a tu contador',
    meta: [{ name: 'Invitacion al contador', content: 'Invita a tu contador' }],
  },
  components: { Layout, SignupSendAccountantInvitation },
}
</script>

<template>
  <Layout dark title="Invita a tu contador sin costo">
    <SignupSendAccountantInvitation />
  </Layout>
</template>

<script>
import Layout from '@layouts/LayoutMain'
import SignupSendTeamInvitations from '@src/components/Signup/CompanyInfo/SignupSendTeamInvitations.vue'

export default {
  page: {
    title: 'Invita a tu equipo',
    meta: [{ name: 'Invitaciones', content: 'Invita a tu equipo' }],
  },
  components: { Layout, SignupSendTeamInvitations },
}
</script>

<template>
  <Layout dark title="Invita a todo tu equipo">
    <SignupSendTeamInvitations />
  </Layout>
</template>

<script>
import Layout from '@layouts/LayoutMain'
import SignupTeamMemberCount from '@src/components/Signup/CompanyInfo/SignupTeamMemberCount.vue'

export default {
  page: {
    title: '¿Cuántos son en el equipo?',
    meta: [{ name: 'Miembros del equipo', content: 'Miembros del equipo' }],
  },
  components: { Layout, SignupTeamMemberCount },
}
</script>

<template>
  <Layout dark title="¿Cuántos son en el equipo?" icon="keyboard_backspace">
    <SignupTeamMemberCount />
  </Layout>
</template>

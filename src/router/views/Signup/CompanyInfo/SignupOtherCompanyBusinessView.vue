<script>
import Layout from '@layouts/LayoutMain'
import SignupOtherCompanyBusinessForm from '@src/components/Signup/CompanyInfo/SignupOtherCompanyBusinessForm.vue'

export default {
  page: {
    title: 'Invita a tu contador',
    meta: [{ name: 'Invitacion al contador', content: 'Invita a tu contador' }],
  },
  components: { Layout, SignupOtherCompanyBusinessForm },
}
</script>
<template>
  <Layout title="Escribe tu giro comercial" icon="expand_more">
    <SignupOtherCompanyBusinessForm />
  </Layout>
</template>

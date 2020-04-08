<script>
import Layout from '@layouts/LayoutMain'
import SignupBranchOfficesCount from '@src/components/Signup/CompanyInfo/SignupBranchOfficesCount'
export default {
  page: {
    title: 'Registro - Número de sucursales',
    meta: [{ name: 'description', content: 'Registro - Número de sucursales' }],
  },
  components: { Layout, SignupBranchOfficesCount },
}
</script>

<template>
  <Layout dark title="¿Cuántas sucursales tienes?" icon="keyboard_backspace">
    <SignupBranchOfficesCount />
  </Layout>
</template>

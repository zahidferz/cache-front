<script>
import Layout from '@layouts/LayoutWeb'
import BankForm from '@components/Signup/InitialTodos/BankForm'
export default {
  page: {
    title: 'Banco - nuevo',
    meta: [{ name: 'description', content: 'Banco - nuevo' }],
  },
  components: { Layout, BankForm },
}
</script>

<template>
  <Layout>
    <BankForm />
  </Layout>
</template>

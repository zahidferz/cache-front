<script>
import Layout from '@layouts/LayoutMain'
import SignupSolvingMainProblem from '@src/components/Signup/CompanyInfo/SignupSolvingMainProblem.vue'

export default {
  page: {
    title: '¿Qué problema resuelves?',
    meta: [
      {
        name: 'Problema Principal',
        content: 'Problema que se resuelve con Gestionix',
      },
    ],
  },
  components: { Layout, SignupSolvingMainProblem },
}
</script>

<template>
  <Layout dark icon="keyboard_backspace" title="¿En qué te podemos ayudar?">
    <SignupSolvingMainProblem />
  </Layout>
</template>

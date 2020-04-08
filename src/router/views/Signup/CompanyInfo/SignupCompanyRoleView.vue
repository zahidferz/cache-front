<script>
import Layout from '@layouts/LayoutMain'
import SignupCompanyRole from '@src/components/Signup/CompanyInfo/SignupCompanyRole.vue'

export default {
  page: {
    title: '¿Qué haces en la empresa?',
    meta: [{ name: 'Rol', content: 'Rol en la empresa' }],
  },
  components: { Layout, SignupCompanyRole },
}
</script>

<template>
  <Layout
    :title="$mq === 'mo' ? '¿Qué haces en la empresa?' : null"
    :dark="$mq === 'mo'"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/black.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupCompanyRole />
  </Layout>
</template>

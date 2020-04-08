<script>
import Layout from '@layouts/LayoutMain'
import SignupCompanyBusiness from '@src/components/Signup/CompanyInfo/SignupCompanyBusiness.vue'

export default {
  page: {
    title: 'Giro de la empresa',
    meta: [{ name: 'Giro', content: 'Giro de la empresa' }],
  },
  components: { Layout, SignupCompanyBusiness },
}
</script>

<template>
  <Layout
    :dark="$mq === 'mo'"
    :title="$mq === 'mo' ? '¿A qué se dedica tu empresa?' : null"
    :icon="$mq === 'mo' ? 'keyboard_backspace' : null"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupCompanyBusiness />
  </Layout>
</template>

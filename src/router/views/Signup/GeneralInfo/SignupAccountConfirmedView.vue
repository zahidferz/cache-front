<script>
import Layout from '@layouts/LayoutMain'
import SignupAccountConfirmed from '@components/Signup/GeneralInfo/SignupAccountConfirmed.vue'

export default {
  page: {
    title: 'Confirmación de cuenta',
    meta: [{ name: 'description', content: 'Confirmación de cuenta' }],
  },
  components: { Layout, SignupAccountConfirmed },
}
</script>

<template>
  <Layout :title="$mq === 'mo' ? 'Cuenta confirmada' : null">
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupAccountConfirmed />
  </Layout>
</template>

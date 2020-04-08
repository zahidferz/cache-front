<script>
import Layout from '@layouts/LayoutMain'
import SignupYoureInCard from '@components/Signup/GeneralInfo/SignupYoureInCard.vue'
export default {
  page: {
    title: 'Registro - Estás dentro',
    meta: [{ name: 'description', content: 'Registro - Estás dentro' }],
  },
  components: { Layout, SignupYoureInCard },
}
</script>

<template>
  <Layout>
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/black.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupYoureInCard />
  </Layout>
</template>

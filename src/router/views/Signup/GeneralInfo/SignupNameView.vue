<script>
import Layout from '@layouts/LayoutMain'
import SignupName from '@components/Signup/GeneralInfo/SignupName'

export default {
  page: {
    title: 'Registro',
    meta: [{ name: 'description', content: 'Registro' }],
  },
  components: { Layout, SignupName },
}
</script>

<template>
  <Layout
    :icon="$mq === 'mo' ? 'keyboard_backspace' : null"
    :dark="$mq === 'mo'"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupName />
  </Layout>
</template>

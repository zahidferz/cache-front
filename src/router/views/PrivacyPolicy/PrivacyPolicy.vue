<script>
import Layout from '@layouts/LayoutMain'
import PrivacyPolicyTabs from '@components/PrivacyPolicy/PrivacyPolicyTabs'
export default {
  page: {
    title: 'Aviso de privacidad',
    meta: [
      {
        name: 'Privacy Policy Info',
        content: 'Aviso de privacidad',
      },
    ],
  },
  components: { Layout, PrivacyPolicyTabs },
}
</script>

<template>
  <Layout icon="keyboard_backspace" title="Cuidamos tu información">
    <PrivacyPolicyTabs class="flex-grow" />
  </Layout>
</template>

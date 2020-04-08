<script>
import Layout from '@layouts/LayoutMain'
import TermsAndConditions from '@components/PrivacyPolicy/TermsAndConditions'
import PrivacyPolicyTabs from '@components/PrivacyPolicy/PrivacyPolicyTabs'
import AsideMainPrivacy from '@layouts/AsideMainPrivacy'
export default {
  page: {
    title: 'Aviso de privacidad',
    meta: [{ name: 'description', content: 'Aviso de privacidad' }],
  },
  components: {
    Layout,
    TermsAndConditions,
    PrivacyPolicyTabs,
    AsideMainPrivacy,
  },
}
</script>

<template>
  <div>
    <Layout v-if="$mq === 'de'">
      <AsideMainPrivacy class="z-1" />
      <TermsAndConditions class="ml-36" />
    </Layout>
    <Layout
      v-if="$mq === 'mo'"
      white
      title="Cuidamos tu información"
      icon="keyboard_backspace"
    >
      <PrivacyPolicyTabs />
    </Layout>
  </div>
</template>

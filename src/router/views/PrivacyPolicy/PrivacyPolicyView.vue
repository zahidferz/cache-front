<script>
import Layout from '@layouts/LayoutMain'
import AsideMainPrivacy from '@layouts/AsideMainPrivacy'
import PrivacyPolicy from '@components/PrivacyPolicy/PrivacyPolicy'
import PrivacyPolicyTabs from '@components/PrivacyPolicy/PrivacyPolicyTabs'

export default {
  page: {
    title: 'Aviso de privacidad',
    meta: [{ name: 'description', content: 'Aviso de privacidad' }],
  },
  components: { Layout, PrivacyPolicy, PrivacyPolicyTabs, AsideMainPrivacy },
  methods: {
    close() {
      window.top.close()
    },
  },
}
</script>

<template>
  <div>
    <Layout v-if="$mq === 'de'">
      <AsideMainPrivacy class="z-1" />
      <PrivacyPolicy class="ml-36" />
    </Layout>
    <Layout
      v-if="$mq === 'mo'"
      white
      title="Cuidamos tu información"
      :icon-click-handler="close"
      icon="keyboard_backspace"
    >
      <PrivacyPolicyTabs :initial-tab="$route.query.initialTab" />
    </Layout>
  </div>
</template>

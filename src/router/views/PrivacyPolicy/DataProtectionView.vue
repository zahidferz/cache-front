<script>
import Layout from '@layouts/LayoutMain'
import AsideMainPrivacy from '@layouts/AsideMainPrivacy'
import DataProtection from '@components/PrivacyPolicy/DataProtection'
import PrivacyPolicyTabs from '@components/PrivacyPolicy/PrivacyPolicyTabs'
export default {
  page: {
    title: 'Protección de datos',
    meta: [{ name: 'description', content: 'Protección de datos' }],
  },
  components: { Layout, DataProtection, PrivacyPolicyTabs, AsideMainPrivacy },
}
</script>

<template>
  <div>
    <Layout v-if="$mq === 'de'">
      <AsideMainPrivacy class="z-1" />
      <DataProtection class="ml-36" />
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

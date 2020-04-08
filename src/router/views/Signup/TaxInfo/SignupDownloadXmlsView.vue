<script>
import Layout from '@layouts/LayoutMain'
import SignupDownloadXmlsForm from '@components/Signup/TaxInfo/SignupDownloadXmlsForm.vue'
export default {
  page: {
    title: 'Descarga tus XMLs',
    meta: [{ name: 'DescargaXMLs', content: 'Descarga tus XMLs' }],
  },
  components: { Layout, SignupDownloadXmlsForm },
}
</script>

<template>
  <Layout
    :dark="$mq === 'mo'"
    :title="$mq === 'mo' ? 'Descarga tus XMLs del SAT' : null"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <SignupDownloadXmlsForm class="de:pt-8" />
  </Layout>
</template>

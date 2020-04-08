<script>
import Layout from '@layouts/LayoutMain'
import SignupCompanyRoleForInvitation from '@components/Signup/GeneralInfo/SignupCompanyRoleForInvitation'

export default {
  page: {
    title: '¿Qué haces en la empresa?',
    meta: [{ name: 'description', content: '¿Qué haces en la empresa?' }],
  },
  components: {
    Layout,
    SignupCompanyRoleForInvitation,
  },
}
</script>

<template>
  <Layout
    :title="$mq === 'mo' ? '¿Qué haces en la empresa?' : null"
    :dark="$mq === 'mo'"
  >
    <section v-if="$mq === 'de'" class="px-8 pt-4 absolute">
      <a href="#"
        ><figure>
          <img
            class="h-5"
            src="@assets/images/DE/mo_logocashme_horizontal_negro.svg"
            alt="CASHME"/></figure
      ></a>
    </section>
    <SignupCompanyRoleForInvitation />
  </Layout>
</template>

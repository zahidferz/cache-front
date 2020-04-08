<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UploadLogo from '@components/Settings/CompanySettings/UploadLogo'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'

export default {
  page: {
    title: 'Subir logo',
    meta: [{ name: 'description', content: 'Subir logo' }],
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          company: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
      error(error) {
        this.error = error.message
      },
    },
  },
  components: { LayoutWebMobile, UploadLogo },
  computed: {
    companyLogo() {
      if (this.myAccount && this.myAccount.companies[0].company.companyLogo) {
        return this.myAccount.companies[0].company.companyLogo
      } else {
        return null
      }
    },
  },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    :title="companyLogo ? 'Actualizar logotipo' : 'Sube el logotipo'"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <UploadLogo />
  </LayoutWebMobile>
</template>

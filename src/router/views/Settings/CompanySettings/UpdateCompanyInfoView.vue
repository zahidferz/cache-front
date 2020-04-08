<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UpateCompanyInfo from '@components/Settings/CompanySettings/UpdateCompanyInfo'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
export default {
  page: {
    title: 'Actualizar información',
    meta: [{ name: 'description', content: 'Actualizar información' }],
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
  components: { LayoutWebMobile, UpateCompanyInfo },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    :title="'Editar información de la empresa'"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <UpateCompanyInfo />
  </LayoutWebMobile>
</template>

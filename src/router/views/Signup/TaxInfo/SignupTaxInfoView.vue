<script>
import Layout from '@layouts/LayoutMain'
import SignupTaxInfoForm from '@components/Signup/TaxInfo/SignupTaxInfoForm'
export default {
  page: {
    title: 'Registro - Información fiscal',
    meta: [{ name: 'description', content: 'Registro - Información fiscal' }],
  },
  components: { Layout, SignupTaxInfoForm },
  methods: {
    gotToXmls() {
      if (this.$refs.SignupTaxInfoForm) {
        if (
          !this.$refs.SignupTaxInfoForm.invalidTaxId &&
          this.$refs.SignupTaxInfoForm.taxId.length > 0
        ) {
          localStorage.setItem('taxId', this.$refs.SignupTaxInfoForm.taxId)
        }
        if (this.$refs.SignupTaxInfoForm.commercialName) {
          localStorage.setItem(
            'commercialName',
            this.$refs.SignupTaxInfoForm.commercialName
          )
        }
        this.$router.push({ name: 'downloadxmls' })
      }
    },
  },
}
</script>

<template>
  <Layout
    :icon="$mq === 'mo' ? 'expand_more' : null"
    :icon-click-handler="gotToXmls"
    :title="$mq === 'mo' ? 'Ingresa tu información fiscal' : null"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6 z-1"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/white.svg"
          alt="CASHME"/></figure
    ></a>
    <div
      class="flex-grow flex flex-col relative de:bg-primary de:justify-center"
    >
      <SignupTaxInfoForm ref="SignupTaxInfoForm" />
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.handsome-height {
  height: calc(100vh - 586px - 16px);
}

@media only screen and (max-height: 655px) {
  .bottom-container {
    display: none;
  }
  .handsome-height {
    display: none;
  }
}
.bottom-container {
  width: 100vw;
  height: 17vh;
  overflow: hidden;
  background-color: #bea0ff;
  clip-path: url(#);
}
.ellipse {
  width: 110%;
  height: 200%;
  margin-left: -5%;
  background-color: white;
  border-radius: 50%;
  transform: translateY;
  transform: translateY(calc(16px - 70%));
}
</style>

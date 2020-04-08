<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UploadCSDSummary from '@components/Signup/InitialTodos/UploadCSDSummary'
export default {
  page: {
    title: 'Resumen de CSD',
    meta: [{ name: 'description', content: 'Resumen de CSD' }],
  },
  components: { LayoutWebMobile, UploadCSDSummary },
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
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
    title="Subir el CSD"
  >
    <UploadCSDSummary />
  </LayoutWebMobile>
</template>

<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UploadCSD from '@components/Signup/InitialTodos/UploadCSD'
export default {
  page: {
    title: 'Subir CSD',
    meta: [{ name: 'description', content: 'Subir CSD' }],
  },
  components: { LayoutWebMobile, UploadCSD },
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
    no-top-padding
    :icon-click-handler="goBack"
    :with-padding-bottom="false"
    title="Elige tus archivos"
  >
    <UploadCSD />
  </LayoutWebMobile>
</template>

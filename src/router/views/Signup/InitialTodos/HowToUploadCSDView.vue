<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import HowToUploadCSD from '@components/Signup/InitialTodos/HowToUploadCSD'
export default {
  page: {
    title: 'Cómo subir tu CSD',
    meta: [{ name: 'description', content: 'Cómo subir tu CSD' }],
  },
  components: { LayoutWebMobile, HowToUploadCSD },
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
    title="Elige cómo subir el CSD"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <HowToUploadCSD />
  </LayoutWebMobile>
</template>

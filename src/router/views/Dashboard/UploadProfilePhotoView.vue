<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UploadProfilePhoto from '@components/Dashboard/UploadProfilePhoto'
export default {
  page: {
    title: 'Subir foto de perfil',
    meta: [{ name: 'description', content: 'Subir foto de perfil' }],
  },
  components: { LayoutWebMobile, UploadProfilePhoto },
  methods: {
    goBack() {
      this.$router.push({ name: 'dashboard', query: { drawerRight: true } })
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    title="Subir foto de perfil"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <UploadProfilePhoto />
  </LayoutWebMobile>
</template>

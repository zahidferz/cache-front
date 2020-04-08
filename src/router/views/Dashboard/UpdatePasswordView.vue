<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UpdatePassword from '@components/Dashboard/UpdatePasswordForm'

export default {
  page: {
    title: 'Actualizar contraseña',
    meta: [{ name: 'description', content: 'Actualizar contraseña' }],
  },
  components: { LayoutWebMobile, UpdatePassword },
  methods: {
    goBack() {
      this.$router.push({ name: 'dashboard', query: { drawerRight: true } })
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    icon-class-without-scroll="text-black"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
    no-top-padding
    title="Actualizar contraseña"
  >
    <UpdatePassword />
  </LayoutWebMobile>
</template>

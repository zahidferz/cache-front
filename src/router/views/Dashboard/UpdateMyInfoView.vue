<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import UploadateMyInfo from '@components/Dashboard/UpdateMyInfo'

export default {
  page: {
    title: 'Actualizar información',
    meta: [{ name: 'description', content: 'Actualizar información' }],
  },
  components: { LayoutWebMobile, UploadateMyInfo },
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
    :icon-click-handler="goBack"
    :has-drawer="$mq === 'de'"
    icon="keyboard_backspace"
    no-top-padding
    title="Actualizar mi información"
  >
    <UploadateMyInfo />
  </LayoutWebMobile>
</template>

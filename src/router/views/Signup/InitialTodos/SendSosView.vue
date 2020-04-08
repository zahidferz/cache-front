<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import SendSos from '@components/Signup/InitialTodos/SendSos'
export default {
  page: {
    title: 'Enviar SOS',
    meta: [{ name: 'description', content: 'Enviar SOS' }],
  },
  components: { LayoutWebMobile, SendSos },
  data() {
    return {
      title: 'Escribe la info de tu contador',
    }
  },
  mounted() {
    if (this.$route.query.r === 'contador') {
      this.title = 'Escribe la info de tu equipo'
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    icon="keyboard_backspace"
    :title="title"
    :icon-click-handler="goBack"
    :has-drawer="$mq === 'de'"
  >
    <SendSos />
  </LayoutWebMobile>
</template>

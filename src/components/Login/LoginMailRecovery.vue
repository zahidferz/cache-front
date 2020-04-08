<script>
import { axiosAuth } from '@src/axiosConfig'
export default {
  name: 'LoginMailRecovery',
  components: {},
  data() {
    return {
      loading: false,
      loadingSuccess: false,
      userEmail: localStorage.gxRecoveryPassword,
    }
  },
  methods: {
    async resendMail() {
      try {
        this.loading = true
        await axiosAuth.post('/reset_password_email', {
          client_id: process.env.VUE_APP_AUTH_URL_CLIENT_ID,
          email: this.userEmail,
        })

        this.loading = false
        this.loadingSuccess = true
      } catch (error) {
        this.loading = false
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      }
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col de:overflow-hidden de:bg-primary de:justify-center"
  >
    <div
      class="flex-grow flex flex-col de:p-8 p-4 de:mx-auto de:shadow-3 de:flex-grow-0 de:relative de:rounded-lg de:w-108 de:bg-white"
    >
      <MqLayout mq="de">
        <h1 class="de:gx-h4 font-bold text-center text-black pb-4"
          >Revisa tu correo</h1
        >
      </MqLayout>
      <p class="mb-8"
        >Hemos enviado un correo a <span class="font-bold">{{ userEmail }}</span
        >, sigue los pasos que se muestran en el mensaje para restablecer tu
        contraseña.</p
      >
      <p class="mb-8">
        Si no recibiste el correo da clic en el siguiente botón:
      </p>
      <GxButton
        class="mx-auto"
        :loading="loading"
        :loading-success="loadingSuccess"
        @click="resendMail"
        >REENVIAR CORREO</GxButton
      >
      <GxTextLink
        class="self-center text-secondary de:gx-caption"
        :to="{ name: 'login' }"
        >Iniciar sesión</GxTextLink
      >
      <div class="de:hidden flex-grow flex flex-col items-center">
        <picture class="flex-grow flex flex-col justify-end imageContainer">
          <source
            media="(min-width: 768px)"
            width="176"
            height="176"
            :srcset="$utils.alertImages.CheckEmail"
          />
          <img
            :src="$utils.alertImages.CheckEmail"
            width="176"
            height="176"
            alt="Revisa tu correo"
            class="image"
          />
        </picture>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */

@screen de {
  .imageContainer {
    position: absolute;
    bottom: -92%;
    left: -150px;
  }
}
</style>

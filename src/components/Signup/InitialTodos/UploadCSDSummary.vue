<script>
import GxBulletList from '@src/components/_Core/Lists/GxBulletList'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { SEND_EMAIL_UPLOAD_CSD } from '@src/apollo//mutations'
import gql from 'graphql-tag'

export default {
  name: 'UploadCSDSummary',
  components: {
    GxBulletList,
    GxCardModal,
  },
  apollo: {
    myAccount: gql`
      {
        myAccount {
          userNumber
          companies {
            company {
              companyNumber
            }
          }
        }
      }
    `,
  },
  data() {
    return {
      customError: null,
      showSkipCerAlert: false,
      loading: false,
      cardloading: false,
    }
  },
  methods: {
    closeSkipAlert() {
      this.showSkipCerAlert = false
      this.$router.push({ name: 'dashboard' })
    },
    openInfo() {
      alert('need to implement')
    },
    async sendEmail() {
      try {
        this.cardloading = true
        await this.$apollo.mutate({
          mutation: SEND_EMAIL_UPLOAD_CSD,
          variables: {
            companyNumber: this.myAccount.companies[0].company.companyNumber,
          },
        })
        this.cardloading = false
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.cardloading = false
        this.customError = this.$utils.parseServerError(error)
      }
    },
    toDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col p-4 pt-0"
    :class="{ 'pt-0': $mq === 'mo' }"
  >
    <img
      :src="$utils.alertImages.Do"
      width="176"
      heigth="176"
      alt="Sube tus certificados"
      class="self-center"
    />
    <h1 class="gx-h3 text-center"
      >Sube el Certificado de Sello Digital (CSD)</h1
    >
    <p class="my-8">
      El CSD es un archivo digital emitido por el SAT que se usa únicamente para
      facturar. Recuerda que es diferente a la Fiel.
      <!-- <GxButtonCircle
        transparent
        icon="help"
        class="text-white"
        label="¿Qué es un certificado de sello digital y de dónde lo obtengo?"
        @click="openInfo"
      /> -->
    </p>
    <p class="mb-4">
      El CSD está compuesto de tres elementos:
    </p>
    <GxBulletList
      class="mb-8"
      :inputs="[
        { label: '1. Certificado de seguridad (archivo .cer)' },
        { label: '2. Llave privada (archivo .key)' },
        { label: '3. Contraseña de la llave privada' },
      ]"
    />
    <p class="mb-4 text-center gx-caption">
      Tu información está protegida.
      <GxTextLink
        target-blank
        :to="{ name: 'privacypolicy', query: { initialTab: 2 } }"
        >Conoce cómo.</GxTextLink
      >
    </p>
    <GxButton :to="{ name: 'howtouploadcsd' }" class="mx-auto"
      >Continuar</GxButton
    >
    <GxTextLink
      class="text-center gx-caption text-secondary"
      @click.stop="showSkipCerAlert = !showSkipCerAlert"
      >Hacerlo después</GxTextLink
    >
    <GxCardModal
      v-if="showSkipCerAlert"
      headline="¿No tienes los certificados?"
      text-body="Recibe un correo electrónico para que nos respondas con tus archivos y nosotros nos encargaremos del resto."
      :card-img="
        $mq === 'mo'
          ? $utils.alertImages.Khaaa
          : $utils.alertImages.Dissapointed
      "
      alt="¿No tienes los certificados?"
      :loading="cardloading"
      @close="closeSkipAlert"
    >
      <template v-slot:actions>
        <div class="flex self-end de:mt-8">
          <GxButton
            :plain="$mq === 'mo'"
            :ghost="$mq === 'de'"
            class="de:text-white de:border-white text-alert mr-4"
            @click="closeSkipAlert"
            >salir</GxButton
          >
          <GxButton
            :plain="$mq === 'mo'"
            :dark="$mq === 'de'"
            @click="sendEmail"
            >Recibir mail</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="customError"
      headline="Hubo un error"
      :card-img="$utils.alertImages.Oops"
      alt="Comprueba que tu información esté correcta y que sean archivos de tu CSD"
      :text-body="customError"
      @click="customError = !customError"
    />
  </div>
</template>

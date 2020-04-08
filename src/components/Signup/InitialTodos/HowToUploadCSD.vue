<script>
// import GxButton from '@src/components/_Core/Buttons/GxButton' // Now global
import GxCardOptions from '@src/components/_Core/Cards/GxCardOptions'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import GxLoader from '@components/_Core/Utils/GxLoader'
import { SEND_EMAIL_UPLOAD_CSD } from '@src/apollo//mutations'
import { DASHBOARD, LOCAL_COMPANY } from '@src/apollo/queries'

import get from 'lodash/get'
const _ = {
  get,
}

export default {
  name: 'HowToUploadCSD',
  components: {
    // GxButton,
    GxCardOptions,
    GxCardModal,
    GxLoader,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: DASHBOARD,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      error(err) {
        /* eslint-disable */
        console.log('Error loading dashboard')
        /* eslint-enable */
        this.error = this.$utils.parseServerError(err)
      },
    },
  },
  data() {
    return {
      error: null,
      editMode: this.$route && this.$route.query.edit,
      showSkipCSDAlert: false,
      customError: null,
      loading: false,
      uploadMyself: {
        image: null,
        label: '',
        alt: '',
        subtitle: '',
      },
      sendSos: {
        image: null,
        label: '',
        alt: '',
        subtitle: '',
      },

      alertImg: this.$utils.alertImages.retencion_de_usuario,
      alertAlt: '¿Seguro que quieres saltar este paso?',
    }
  },
  watch: {
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          this.getMyAccountData(newVal)
        }
      },
      immediate: true,
    },
  },
  methods: {
    goBack() {
      if (this.editMode) {
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$router.gxAnim = 'slide-right'
        this.$router.back()
      }
    },
    getMyAccountData(newVal) {
      if (newVal.jobTitle === 'Contador') {
        this.uploadMyself = {
          image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_contador.svg'),
          label: 'Subirlos yo',
          alt: 'Subir los certificados',
          subtitle: 'Si tienes los certificados de la empresa disponibles.',
        }
        this.sendSos = {
          image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_dueno.svg'),
          label: 'Solicitarlo a mi equipo',
          alt: 'Pedir ayuda para subir mis certificados',
          subtitle:
            'Envía un S.O.S a quién elijas para que te ayude a subirlos.',
        }
        return
      }
      this.uploadMyself = {
        image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_dueno.svg'),
        label: 'Subirlos yo',
        alt: 'Subir los certificados',
        subtitle: 'Si tienes el certificado de la empresa disponible.',
      }
      this.sendSos = {
        image: require('@src/assets/images/Signup/CompanyInfo/SeleccionaTuPuesto/mo_001_3_contador.svg'),
        label: 'Pedírselo al contador',
        alt: 'Invita a tu contador sin costo para que suba los certificados.',
        subtitle:
          'Invita a tu contador sin costo para que suba los certificados.',
      }
    },
    toUploadCer() {
      this.$router.push({ name: 'uploadcsd', query: { edit: this.editMode } })
    },
    toDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
    toSendSos() {
      this.$router.push({ name: 'sendsos' })
    },
    async sendEmail() {
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: SEND_EMAIL_UPLOAD_CSD,
          variables: {
            companyNumber: this.myAccount.companies[0].company.companyNumber,
          },
        })
        this.loading = false
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.loading = false
        this.showSkipCSDAlert = false
        this.customError = _.get(
          error,
          'response.data.message',
          'Hubo un error'
        )
        const timeout = setTimeout(() => {
          this.customError = null
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(timeout)
        })
      }
    },
  },
}
</script>
<template>
  <div v-if="!loading" class="flex-grow flex flex-col p-4 de:p-0">
    <MqLayout mq="mo" class="flex-grow flex flex-col items-center">
      <GxCardOptions
        class="mb-8 gxCardOptions"
        :image="uploadMyself.image"
        :alt="uploadMyself.alt"
        :label="uploadMyself.label"
        :subtitle="uploadMyself.subtitle"
        @click="toUploadCer"
      />
      <GxCardOptions
        class="gxCardOptions"
        :image="sendSos.image"
        :alt="sendSos.alt"
        :label="sendSos.label"
        :subtitle="sendSos.subtitle"
        @click="toSendSos"
      />

      <p class="gx-caption mt-4 de:mt-2 mb-4 de:mb-8"
        >Tu información está protegida.
        <GxTextLink
          target-blank
          :to="{ name: 'privacypolicy' }"
          class="font-bold"
          >Conoce cómo.</GxTextLink
        ></p
      >
      <GxTextLink
        v-if="!editMode"
        class="text-center text-secondary gx-caption"
        @click="showSkipCSDAlert = !showSkipCSDAlert"
        >Hacerlo después</GxTextLink
      >
      <GxCardModal
        v-if="showSkipCSDAlert"
        headline="¿No tienes los certificados?"
        text-body="Recibe un correo electrónico para que nos respondas con tus archivos y nosotros nos encargaremos del resto."
        :card-img="$utils.alertImages.Khaaa"
        alt="¿No tienes los certificados?"
        :loading="loading"
        @click.prevent="showSkipCSDAlert = !showSkipCSDAlert"
      >
        <template v-slot:actions>
          <div class="flex self-end de:justify-center">
            <GxButton
              :plain="$mq === 'mo'"
              :ghost="$mq === 'de'"
              class="text-alert de:border-alert de:border mr-4"
              @click="toDashboard"
              >salir</GxButton
            >
            <GxButton :plain="$mq === 'mo'" @click="sendEmail"
              >Recibir mail</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxCardModal
        v-if="customError"
        :headline="customError"
        :card-img="$util.alertImages.Oops"
        :alt="customError"
        @click="customError = null"
      />
    </MqLayout>
    <MqLayout mq="de" class="flex-grow flex flex-col items-center w-full">
      <header class="w-full  flex justify-start items-center ">
        <i
          v-if="editMode"
          class="material-icons-round iconSize mr-4 cursor-pointer"
          @click="goBack"
          >keyboard_backspace</i
        >
        <i v-else class="material-icons-round iconSize text-primary mr-4"
          >business</i
        >
        <h4 class="gx-h4 font-bold">Elige cómo subir el CSD</h4>
      </header>
      <main class="flex-grow flex-col flex justify-center items-between">
        <div class="flex  w-full justify-center">
          <GxCardOptions
            class="mr-4 gxCardOptions mr-16"
            :image="uploadMyself.image"
            :alt="uploadMyself.alt"
            :label="uploadMyself.label"
            :subtitle="uploadMyself.subtitle"
            @click="toUploadCer"
          />
          <GxCardOptions
            class="gxCardOptions"
            :image="sendSos.image"
            :alt="sendSos.alt"
            :label="sendSos.label"
            :subtitle="sendSos.subtitle"
            @click="toSendSos"
          />
        </div>
        <p class="text-center mt-8 de:gx-caption">
          Tu información está protegida.
          <GxTextLink target-blank :to="{ name: 'privacypolicy' }">
            Conoce cómo.</GxTextLink
          >
        </p>
        <GxTextLink
          v-if="!editMode"
          class="text-center mt-1 text-secondary de:gx-caption"
          @click="showSkipCSDAlert = !showSkipCSDAlert"
          >Hacerlo después</GxTextLink
        >
        <GxCardModal
          v-if="showSkipCSDAlert"
          headline="¿No tienes los certificados?"
          text-body="Recibe un correo electrónico para que nos respondas con tus archivos y nosotros nos encargaremos del resto."
          :card-img="$utils.alertImages.Dissapointed"
          alt="¿No tienes los certificados?"
          :loading="loading"
          @click.prevent="showSkipCSDAlert = !showSkipCSDAlert"
        >
          <template v-slot:actions>
            <div class="flex de:justify-center de:mt-8">
              <GxButton ghost class="mr-4" @click="toDashboard">salir</GxButton>
              <GxButton @click="sendEmail">Recibir mail</GxButton>
            </div>
          </template>
        </GxCardModal>
      </main>
    </MqLayout>
  </div>
  <div
    v-else
    class="flex-grow flex flex-col p-4 de:p-0 justify-center items-center"
  >
    <GxLoader />
  </div>
</template>
<style lang="scss" scoped>
.gxCardOptions {
  min-height: 214px;
}

@screen de {
  .gxCardOptions {
    min-height: 379px;
  }
}
</style>

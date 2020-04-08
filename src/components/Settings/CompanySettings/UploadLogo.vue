<script>
import GxFileDragAndDrop from '@components/_Core/GxFileDragAndDrop.vue'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import { SEND_EMAIL_UPLOAD_CSD } from '@src/apollo//mutations'
import { COMPANY_INFO } from '@src/apollo/queries'
import gql from 'graphql-tag'

export default {
  name: 'UploadLogo',
  components: {
    GxIcon,
    GxCardModal,
    GxModal,
    GxDesktopHeader,
    GxFileDragAndDrop,
  },
  apollo: {
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
    myAccount: COMPANY_INFO,
  },
  data() {
    return {
      showSkipCSDAlert: false,
      imageSrc: null,
      skipStep: false,
      summaryImg: require('@assets/images/Signup/InitialTodos/mo_001_7_certificados.svg'),
      alertAlt: '¿Seguro que quieres salir?',
      showUploadCSDSummary: false,
      loading: false,
      customError: null,
      cardLoading: false,
    }
  },
  computed: {
    editMode() {
      return this.$route && this.$route.query.edit
    },
    companyLogo() {
      if (this.myAccount && this.myAccount.companies[0].company.companyLogo) {
        return this.myAccount.companies[0].company.companyLogo
      } else {
        return null
      }
    },
    inputLabel() {
      if (this.companyLogo) {
        return 'CAMBIAR LOGO'
      }
      return 'SUBIR LOGO'
    },
    // imageInputContainerStyles() {
    //   if (this.companyLogo) {
    //     return `z-index: 0; background-image: url(${
    //       this.companyLogo
    //     }?${new Date().getTime()}); filter: opacity(0.2);`
    //   }
    //   return `z-index: 0;`
    // },
  },
  watch: {
    imageSrc(newVal) {
      this.$router.push({
        name: 'resizelogo',
        params: { imageSrc: newVal },
        query: { edit: this.editMode },
      })
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
    closeModal() {
      this.skipStep = !this.skipStep
    },
    // compress(e) {
    //   const fileName = e.target.files[0].name
    //   const reader = new FileReader()
    //   reader.readAsDataURL(e.target.files[0])
    //   reader.onload = (event) => {
    //     const img = new Image()
    //     img.src = event.target.result
    //     img.onload = () => {
    //       const maxWidth = 350 // Max width for the image
    //       const maxHeight = 350
    //       let ratio = 1
    //       let widthRatio
    //       let heightRatio
    //       if (img.width > maxWidth) {
    //         widthRatio = maxWidth / img.width
    //       }
    //       if (img.height > maxHeight) {
    //         heightRatio = maxHeight / img.height
    //       }
    //       // original image width && height < 350px
    //       if (widthRatio && heightRatio) {
    //         ratio = widthRatio < heightRatio ? widthRatio : heightRatio
    //       }
    //       // Set new width and height based on required ratios
    //       // const width = 100;
    //       // const height = 100;
    //       const width = ratio * img.width
    //       const height = ratio * img.height
    //       const elem = document.createElement('canvas')
    //       elem.width = width
    //       elem.height = height
    //       const ctx = elem.getContext('2d')
    //       // img.width and img.height will contain the original dimensions
    //       ctx.drawImage(img, 0, 0, width, height)
    //       ctx.canvas.toBlob(
    //         (blob) => {
    //           const file = new File([blob], fileName, {
    //             type: 'image/png',
    //             lastModified: Date.now(),
    //           })

    //           var reader = new FileReader()
    //           reader.onloadend = (evt) => {
    //             this.imageSrc = reader.result
    //             this.$router.push({
    //               name: 'resizelogo',
    //               params: { imageSrc: this.imageSrc },
    //               query: { edit: this.editMode },
    //             })
    //           }
    //           reader.readAsDataURL(file)
    //         },
    //         'image/png',
    //         1
    //       )
    //     }
    //     // reader.onerror = (error) => console.log(error)
    //   }
    // },
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
        this.loading = false
        this.customError = this.$utils.parseServerError(error)
        const timeout = setTimeout(() => {
          this.customError = null
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(timeout)
        })
      }
    },
    // loadFile(input) {
    //   this.compress(input)

    //   var reader = new FileReader()
    //   reader.onloadend = () => {
    //     this.imageSrc = reader.result
    //   }
    //   reader.readAsDataURL(input.target.files[0])
    // },
    nextPage() {
      alert('implement')
    },
    toDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
    doItLater() {
      if (this.$mq === 'mo') {
        this.$router.push({ name: 'uploadcsdsummary' })
      } else {
        this.skipStep = false
        this.showUploadCSDSummary = true
      }
    },
  },
}
</script>
<template>
  <!-- global $route -->
  <div
    v-if="$mq === 'mo'"
    class="flex-grow flex flex-col items-center p-4 text-center"
  >
    <p class="mb-8"
      >Este logotipo aparecerá en tu perfil y los documentos que emitas en
      Chain.</p
    >
    <GxFileDragAndDrop
      v-model="imageSrc"
      :original-image="companyLogo"
      :label="inputLabel"
    />
    <!-- <div
      class="mb-2 w-64 h-64 border border-primary flex justify-center items-center rounded-lg"
    >
      <div
        class="absolute mb-2 w-50 h-50 flex justify-center items-center rounded-lg bg-center bg-contain bg-no-repeat"
        :style="imageInputContainerStyles"
      ></div>
      <input
        id="croppieFileInput"
        data-testid="uploadlogofileinput"
        name="croppieFileInput"
        type="file"
        @change="loadFile"
      />
      <label
        class="text-h3 text-primary flex flex-col justify-center items-center w-50 h-50 border border-dashed border-primary rounded-lg"
        for="croppieFileInput"
        style=" z-index: 0;background-color: none;"
      >
        <GxIcon icon="cloud_upload" />
        <span class="gx-h6">{{ inputLabel }}</span>
      </label>
    </div> -->
    <p v-if="!editMode" class="gx-caption"
      >No tengo logo,
      <button class="font-bold text-center mb-4" @click="skipStep = !skipStep"
        >omitir este paso</button
      ></p
    >
    <GxCardModal
      v-if="skipStep"
      headline="¿Seguro que quieres salir?"
      text-body="Podrás subir el logo cuando esté listo, aunque te recomendamos hacerlo ahora."
      :card-img="$utils.alertImages.Cry"
      :alt="alertAlt"
    >
      <template v-slot:actions>
        <div class="flex ml-auto de:mx-auto">
          <GxButton
            :plain="$mq === 'mo'"
            :ghost="$mq === 'de'"
            class="text-alert mr-4 uppercase"
            @click="doItLater"
            >salir</GxButton
          >
          <GxButton
            :plain="$mq === 'mo'"
            class="text-primary uppercase"
            @click="closeModal"
            >continuar</GxButton
          >
        </div>
      </template>
    </GxCardModal>
  </div>
  <div v-else class="flex-grow flex flex-col items-center">
    <GxDesktopHeader
      v-if="!editMode"
      class="self-start"
      icon="receipt"
      header="Sube el logotipo"
    />
    <GxDesktopHeader
      v-else
      class="self-start"
      icon="keyboard_backspace"
      header="Actualizar Logo"
      :icon-click-handler="goBack"
    >
    </GxDesktopHeader>
    <p class="self-start"
      >Este logotipo aparecerá en tu perfil y los documentos que emitas en
      Chain.</p
    >
    <main class="flex-grow flex-col flex justify-center items-center ">
      <!-- <div
        class="mb-2 w-64 h-64 border border-primary flex justify-center items-center rounded-lg"
      >
        <div
          class="absolute mb-2 w-50 h-50 flex justify-center items-center rounded-lg bg-center bg-contain bg-no-repeat"
          :style="imageInputContainerStyles"
        ></div>
        <input
          id="croppieFileInput"
          data-testid="uploadlogofileinput"
          name="croppieFileInput"
          type="file"
          @change="loadFile"
        />
        <label
          class="text-h3 text-primary flex flex-col justify-center items-center w-50 h-50 border border-dashed border-primary rounded-lg"
          for="croppieFileInput"
          style=" z-index: 0;background-color: none;"
        >
          <GxIcon icon="cloud_upload" />
          <span class="gx-h6 ">{{ inputLabel }}</span>
        </label>
      </div> -->
      <GxFileDragAndDrop
        v-model="imageSrc"
        :original-image="companyLogo"
        :label="inputLabel"
      />
      <p v-if="!editMode" class="text-center mt-2 de:gx-caption"
        >No tengo logo,
        <button
          class="font-bold text-center de:gx-caption"
          @click="skipStep = !skipStep"
          >omitir este paso</button
        ></p
      >
    </main>
    <transition mode="out-in">
      <GxCardModal
        v-if="skipStep"
        key="skip-confirmation"
        headline="¿Seguro que quieres salir?"
        text-body="Podrás subir el logo cuando esté listo, aunque te recomendamos hacerlo ahora."
        :card-img="$utils.alertImages.Cry"
        :alt="alertAlt"
      >
        <template v-slot:actions>
          <div class="flex ml-auto de:mx-auto mt-8">
            <GxButton
              :plain="$mq === 'mo'"
              :ghost="$mq === 'de'"
              class="mr-4"
              @click="doItLater"
              >salir</GxButton
            >
            <GxButton
              :plain="$mq === 'mo'"
              class="text-primary"
              @click="closeModal"
              >continuar</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxModal v-if="showUploadCSDSummary" key="cds-info-modal" alt="modal">
        <div
          class="flex-grow flex flex-col w-108 bg-white text-black shadow-3 rounded-lg px-12 py-8"
        >
          <div class="flex-grow flex items-center justify-center mb-4">
            <img :src="$utils.alertImages.Do" alt="alt" />
          </div>
          <h1 class="gx-h4 font-bold text-center mb-4"
            >Sube el Certificado de Sello Digital (CSD)</h1
          >
          <p
            >El CSD es un archivo digital emitido por el SAT que se usa
            únicamente para facturar. Recuerda que es diferente a la Fiel.
            <GxIcon icon="help" />
          </p>
          <p class="mb-4">El CSD está compuesto de tres elementos:</p>
          <ol class="px-2">
            <li class="mb-4">1. Certificado de seguridad (archivo .cer)</li>
            <li class="mb-4">2. Llave privada (archivo .key)</li>
            <li>3. Contraseña de la llave privada</li>
          </ol>
          <div class="flex flex-col mt-2 items-center">
            <p class="de:gx-caption mb-8"
              >Tu información está protegida.
              <GxTextLink
                target-blank
                :to="{ name: 'privacypolicy' }"
                class="font-bold"
                >Conoce cómo.</GxTextLink
              ></p
            >
            <GxButton
              class="mx-auto"
              @click="$router.push({ name: 'howtouploadcsd' })"
              >Continuar</GxButton
            >
            <GxTextLink
              class="text-center"
              @click.prevent="showSkipCSDAlert = !showSkipCSDAlert"
              >Hacerlo después</GxTextLink
            >
          </div>
        </div>
      </GxModal>
    </transition>
    <GxCardModal
      v-if="customError"
      headline="Hubo un error"
      :card-img="$utils.alertImages.Oops"
      alt="Comprueba que tu información esté correcta y que sean archivos de tu CSD"
      :text-body="customError"
      @click="customError = !customError"
    />
    <GxCardModal
      v-if="showSkipCSDAlert"
      headline="¿No tienes los certificados?"
      text-body="Recibe un correo electrónico para que nos respondas con tus archivos y nosotros nos encargaremos del resto."
      :card-img="$utils.alertImages.Dissapointed"
      :alt="alertAlt"
    >
      <template v-slot:actions>
        <div class="flex justify-center de:mt-8">
          <GxButton
            ghost
            class="de:text-alert de:border-alert mr-4"
            @click="toDashboard"
            >salir</GxButton
          >
          <GxButton :loading="cardLoading" @click="sendEmail"
            >recibir mail</GxButton
          >
        </div>
      </template>
    </GxCardModal>
  </div>
</template>
<style lang="scss" scoped>
#croppieFileInput {
  position: absolute;
  z-index: -1;
  width: 0.1px;
  height: 0.1px;
  overflow: hidden;
  opacity: 0;
}
</style>

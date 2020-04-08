<script>
import GxInput from '@src/components/_Core/Forms/GxInput'
import GxIcon from '@src/components/_Core/Icons/GxIcon'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import { SEND_CSD_FILES, SEND_EMAIL_UPLOAD_CSD } from '@src/apollo//mutations'
import { LOCAL_COMPANY, COMPANY_INFO } from '@src/apollo/queries'
import get from 'lodash/get'
const _ = {
  get,
}

export default {
  name: 'UploadCSD',
  components: {
    GxCardModal,
    GxIcon,
    GxCardCore,
    GxInput,
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      company: null,
      editMode: this.$route && this.$route.query.edit,
      hasFocus: false,
      showSkipCerAlert: false,
      timeout: null,
      skipCerAlertImg: this.$utils.alertImages.retencion_de_usuario,
      alertImage: null,
      csdInfo: {
        cer: null,
        key: null,
        password: '',
      },
      showUploadSuccessAlert: false,
      customError: null,
      userError: null,
      fileError: false,
      invalidFileErrorImg: require('@assets/images/Signup/InitialTodos/mo_001_7_error.svg'),
      alertImg: this.$utils.alertImages.retencion_de_usuario,
      alertAlt: '¿Seguro que quieres saltar este paso?',
      loading: false,
      cerName: '',
      keyName: '',
    }
  },
  computed: {
    stepTitle() {
      if (this.csdInfo.cer && this.csdInfo.key) {
        return `Escribe la contraseña`
      }
      if (this.csdInfo.cer) {
        return `Selecciona el archivo .key`
      }

      return `Selecciona el archivo .cer`
    },
  },
  methods: {
    openInputFromIcon(id) {
      document.querySelector(`#${id} label`).click()
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () =>
          resolve(reader.result.substr(reader.result.indexOf(',') + 1))
        reader.onerror = (error) => reject(error)
      })
    },
    onFileChangeCer(e) {
      const validCerFile = e.target.files[0].name.split('.').pop()
      if (validCerFile === 'cer') {
        this.csdInfo.cer = e.target.files[0]
        return
      }
      this.fileError = true
      const timeout = setTimeout(() => {
        this.fileError = false
      }, 3000)
      this.$once('hook:destroyed', () => {
        clearTimeout(timeout)
      })
    },
    async onFileChangeKey(e) {
      const validKeyFile = e.target.files[0].name.split('.').pop()
      if (validKeyFile === 'key') {
        this.csdInfo.key = e.target.files[0]
        return
      }
      this.fileError = true
      const timeout = setTimeout(() => {
        this.fileError = false
      }, 3000)
      this.$once('hook:destroyed', () => {
        clearTimeout(timeout)
      })
    },
    async sendEmail() {
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: SEND_EMAIL_UPLOAD_CSD,
          variables: {
            companyNumber: this.company.number,
          },
        })
        this.loading = false
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.loading = false
        this.customError = _.get(
          error,
          'response.data.message',
          'Hubo un error'
        )
        this.timeout = setTimeout(() => {
          this.errorModalClose()
        }, 3000)
        this.showSkipCerAlert = false
      }
    },
    onDeskInput(evt) {
      const file =
        evt &&
        evt.target &&
        evt.target.files &&
        evt.target.files.length &&
        evt.target.files[0]
      if (file) {
        const regex = /.*\.cer$/g
        if (regex.test(file.name)) {
          this.cerName = file.name
          this.csdInfo.cer = file
        } else {
          this.cerName = ''
          this.fileError = true
        }
      }
    },
    onDeskKeyInput(evt) {
      const file =
        evt &&
        evt.target &&
        evt.target.files &&
        evt.target.files.length &&
        evt.target.files[0]
      if (file) {
        const regex = /.*\.key$/g
        if (regex.test(file.name)) {
          this.keyName = file.name
          this.csdInfo.key = file
        } else {
          this.keyName = ''
          this.fileError = true
        }
      }
    },
    async onSubmit() {
      if (this.invalidPassword || !this.csdInfo.key || !this.csdInfo.cer) return

      try {
        this.loading = true
        // Backend requires files be in base64
        const csdInfoBase64 = { password: this.csdInfo.password }
        await this.getBase64(this.csdInfo.cer).then((res) => {
          csdInfoBase64.cer = res
        })
        await this.getBase64(this.csdInfo.key).then((res) => {
          csdInfoBase64.key = res
        })

        await this.$apollo.mutate({
          mutation: SEND_CSD_FILES,
          variables: {
            companyNumber: this.company.number,
            data: { ...csdInfoBase64 },
          },
          update: (store, { data }) => {
            const query = {
              query: COMPANY_INFO,
              variables: {
                companyNumber: this.company.number,
              },
            }
            const oldData = store.readQuery(query)
            oldData.myAccount.companies[0].company.companyDataLocalized.csd = [
              {
                certificateNumber:
                  data.companyUploadDigitalCertificate.digitalCertificate
                    .certificateNumber,
              },
            ]
            store.writeQuery({
              ...query,
              data: oldData,
            })
          },
        })
        this.loading = false
        this.showUploadSuccessAlert = true
      } catch (error) {
        this.loading = false
        const parsedError = this.$utils.parseServerError(error)
        if (
          parsedError ===
          'Contraseña inválida, por favor ingresa la contraseña correcta'
        ) {
          this.userError = 'Contraseña inválida'
        } else if (
          parsedError.includes(
            'El rfc del certificado no corresponde con el enviado'
          )
        ) {
          this.userError = parsedError
        } else {
          this.customError = parsedError
        }
      }
    },
    errorModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.customError = ''
      this.userError = ''
    },
    toDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
    toCreateInvoice() {
      this.$router.push({
        name: 'newsalechooseclient',
        query: { backTo: 'salesDashboard' },
      })
    },
  },
}
</script>
<template>
  <div
    class="flex-grow flex flex-col items-center"
    :class="{ 'p-4': $mq === 'mo' }"
  >
    <div v-if="$mq === 'mo'" class="flex-grow flex flex-col items-center">
      <h1 class="gx-h3 text-center text-primary">{{ stepTitle }}</h1>
      <p
        class="gx-caption"
        :class="{
          'my-2': hasFocus,
          'my-8': !hasFocus,
        }"
      >
        Te decimos cómo cuidamos tu información
        <GxTextLink target-blank :to="{ name: 'privacypolicy' }"
          >aquí.</GxTextLink
        >
      </p>
      <form class="flex-grow flex flex-col w-full" @submit.prevent="onSubmit">
        <button
          v-if="csdInfo.cer"
          type="button"
          class="uploadedFile w-full flex items-center justify-between p-4 shadow-2 rounded-lg"
          :class="{
            'mb-2': hasFocus,
            'mb-8': !hasFocus,
          }"
        >
          <label for="cer" class="w-full flex items-center justify-between">
            <span class="overflow-x-hidden w-64 text-left">{{
              csdInfo.cer.name
            }}</span>
            <GxIcon class="text-primary" icon="check_circle" />
          </label>
        </button>
        <button
          v-if="csdInfo.key"
          type="button"
          class="uploadedFile w-full flex items-center justify-between p-4 shadow-2 rounded-lg"
          :class="{
            'mb-2': hasFocus,
            'mb-8': !hasFocus,
          }"
        >
          <label for="key" class="w-full flex items-center justify-between">
            <span class="overflow-x-hidden w-64 text-left">{{
              csdInfo.key.name
            }}</span>
            <GxIcon class="text-primary" icon="check_circle" />
          </label>
        </button>
        <GxInput
          v-if="csdInfo.cer && csdInfo.key"
          v-model="csdInfo.password"
          label="Contraseña del CSD"
          placeholder="Contraseña del CSD"
          pattern="csd"
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <div
          class="flex-grow flex flex-col items-center justify-end text-center"
        >
          <div v-if="!csdInfo.cer" class="flex flex-col items-center">
            <GxButton for="cer">
              <label for="cer">
                Subir .Cer
              </label>
            </GxButton>
          </div>
          <div v-else-if="!csdInfo.key" class="flex flex-col items-center">
            <GxButton for="key">
              <label for="key">
                Subir .Key
              </label>
            </GxButton>
          </div>
          <GxButton
            v-else
            type="submit"
            class="fixed bottom-0 right-0"
            :loading="loading"
          >
            Guardar
          </GxButton>

          <!-- File inputs are hidden via css -->
          <input
            id="cer"
            type="file"
            name="cer"
            accept=".cer"
            @change="onFileChangeCer"
          />
          <input
            id="key"
            type="file"
            name="key"
            accept=".key"
            @change="onFileChangeKey"
          />
        </div>
      </form>
      <GxTextLink
        v-if="!editMode"
        class="font-bold text-secondary gx-caption"
        @click="showSkipCerAlert = !showSkipCerAlert"
        >Hacerlo después</GxTextLink
      >
      <GxCardModal
        v-if="showUploadSuccessAlert"
        headline="Ya puedes facturar"
        text-body="Emite ahora tu primera factura."
        :card-img="$utils.alertImages.Done"
        alt="Emite ahora tu primera factura."
      >
        <template v-slot:actions>
          <div class="flex self-end de:justify-center">
            <GxButton
              :plain="$mq === 'mo'"
              :ghost="$mq === 'de'"
              class="text-alert mr-4"
              @click="toDashboard"
              >después</GxButton
            >
            <GxButton :plain="$mq === 'mo'" @click="toCreateInvoice"
              >emitir factura</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxCardModal
        v-if="showSkipCerAlert"
        headline="¿No tienes los certificados?"
        text-body="Recibe un correo electrónico para que nos respondas con tus archivos y nosotros nos encargaremos del resto."
        :card-img="$utils.alertImages.Khaaa"
        :alt="alertAlt"
        :loading="loading"
      >
        <template v-slot:actions>
          <div class="flex self-end">
            <GxButton
              :plain="$mq === 'mo'"
              :ghost="$mq === 'de'"
              class="text-alert de:text-white de:border mr-4"
              @click="toDashboard"
              >salir</GxButton
            >
            <GxButton :plain="$mq === 'mo'" @click="sendEmail"
              >recibir mail</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxCardModal
        v-if="fileError"
        headline="Archivo inválido. Intentalo de nuevo."
        :card-img="$utils.alertImages.Dissapointed"
        alt="Archivo inválido, inténtalo de nuevo."
        @click="fileError = !fileError"
      />
      <GxCardModal
        v-if="customError"
        :headline="customError"
        :card-img="$utils.alertImages.Dissapointed"
        @click="errorModalClose"
        @close="errorModalClose"
      />
      <GxCardModal
        v-if="userError"
        :headline="userError"
        :card-img="$utils.alertImages.Dissapointed"
        alt="Comprueba que tu información esté correcta y que sean archivos de tu CSD"
        text-body="Comprueba que tu información esté correcta y que sean archivos de tu CSD."
        @click="errorModalClose"
        @close="errorModalClose"
      />
    </div>
    <div v-else class="flex-grow flex flex-col items-center w-full">
      <header class="w-full  flex justify-start items-center mt-4">
        <i
          v-if="editMode"
          class="material-icons-round iconSize mr-4 cursor-pointer"
          @click="goBack"
          >keyboard_backspace</i
        >
        <i v-else class="material-icons-round iconSize text-primary mr-4"
          >business</i
        >
        <h4 class="gx-h4 font-bold">Seleccionar archivos</h4>
      </header>
      <main class="flex-grow w-full flex-col flex justify-center items-center">
        <div class="flex w-full justify-center">
          <GxCardCore
            class=" w-2/3 max-w-md shadow-3 flex flex-col rounded-lg shadow-2 p-8 z-1 bg-white"
          >
            <p class="text-center p-2 w-full text-black mb-4 de:gx-caption"
              >Te decimos cómo cuidamos tu información
              <GxTextLink
                target-blank
                :to="{ name: 'privacypolicy' }"
                class="font-bold"
                >aquí</GxTextLink
              >.</p
            >
            <form class="flex flex-col items-center justify-center">
              <GxInput
                id="cerName"
                :value="cerName"
                label="Certificado (.cer)"
                placeholder="Certificado (.cer)"
                :icon-right="cerName ? 'check_circle' : 'search'"
                type="file"
                accept=".cer"
                class="mr-2"
                @icon-right-click="openInputFromIcon('cerName')"
                @input="onDeskInput"
              />
              <GxInput
                id="keyName"
                :value="keyName"
                label="Clave privada (.key)"
                placeholder="Clave privada (.key)"
                :icon-right="keyName ? 'check_circle' : 'search'"
                type="file"
                accept=".key"
                class="mr-2"
                @icon-right-click="openInputFromIcon('keyName')"
                @input="onDeskKeyInput"
              />
              <GxInput
                v-model="csdInfo.password"
                label="Contraseña del CSD"
                placeholder="Contraseña del CSD"
                class="mb-4"
                pattern="csd"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <GxButton
                type="submit"
                class="mt-6"
                :loading="loading"
                @click.prevent="onSubmit"
                >Guardar</GxButton
              >
              <GxTextLink
                v-if="!editMode"
                class="text-center text-secondary"
                @click.prevent="showSkipCerAlert = !showSkipCerAlert"
                >Hacerlo después</GxTextLink
              >
            </form>
          </GxCardCore>
        </div>
      </main>
      <GxCardModal
        v-if="fileError"
        headline="Archivo inválido. Intentalo de nuevo."
        :card-img="$utils.alertImages.Dissapointed"
        alt="Archivo inválido, inténtalo de nuevo."
        @click="fileError = !fileError"
      />
      <GxCardModal
        v-if="customError"
        :headline="customError"
        :card-img="$utils.alertImages.Dissapointed"
        @click="errorModalClose"
        @close="errorModalClose"
      />
      <GxCardModal
        v-if="userError"
        :headline="userError"
        :card-img="$utils.alertImages.Dissapointed"
        alt="Comprueba que tu información esté correcta y que sean archivos de tu CSD"
        text-body="Comprueba que tu información esté correcta y que sean archivos de tu CSD."
        @click="errorModalClose"
        @close="errorModalClose"
      />
      <GxCardModal
        v-if="showSkipCerAlert"
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
            <GxButton :loading="loading" @click="sendEmail"
              >recibir mail</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxCardModal
        v-if="showUploadSuccessAlert"
        headline="Ya puedes facturar"
        text-body="Emite ahora tu primera factura."
        :card-img="$utils.alertImages.Done"
        alt="Emite ahora tu primera factura."
      >
        <template v-slot:actions>
          <div class="flex justify-center de:mt-8">
            <GxButton ghost class="mr-4" @click.prevent="toDashboard"
              >después</GxButton
            >
            <GxButton @click="toCreateInvoice">emitir factura</GxButton>
          </div>
        </template>
      </GxCardModal>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#cer,
#key {
  position: absolute;
  z-index: -1;
  width: 0.1px;
  height: 0.1px;
  overflow: hidden;
  opacity: 0;
}
.uploadedFile {
  font-size: 1.125rem;
}
</style>

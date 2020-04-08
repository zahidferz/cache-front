<script>
// import GxButton from '@src/components/_Core/Buttons/GxButton' // Now global
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import GxIcon from '@components/_Core/Icons/GxIcon'
import gql from 'graphql-tag'
import { axiosAuth } from '@src/axiosConfig'
export default {
  name: 'UpdatePasswordForm',
  components: {
    // GxButton,
    GxCardModal,
    GxIcon,
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            email
          }
        }
      `,
      error(error) {
        this.customError = error.message
      },
    },
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      showSuccessAlert: false,
      showErrorAlert: false,
      successAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_6_exitousuario.svg'),
      errorAlertImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      loading: false,
      invalidPassword: false,
      invalidNewPassword: false,
      invalidNewPasswordConfirmation: false,
      customErrorPassword: null,
      customErrorNewPassword: null,
      customErrorNewPasswordConfirmation: null,
      customError: null,
      serverError: null,
    }
  },
  watch: {
    currentPassword(val) {
      this.customErrorPassword = null
    },
    newPassword(val) {
      this.customErrorNewPasswordConfirmation = null
    },
    newPasswordConfirmation(val) {
      this.customErrorNewPasswordConfirmation = null
    },
  },
  methods: {
    async onSubmit() {
      if (this.newPassword !== this.newPasswordConfirmation) {
        this.customErrorNewPasswordConfirmation =
          'Las contraseñas deben coincidir'
        return
      }

      this.loading = true
      // Implementar mutación para actualizar contraseña
      try {
        await axiosAuth.post(`/change_password`, {
          client_id: process.env.VUE_APP_AUTH0_CLIENT_ID,
          email: this.myAccount.email,
          old_password: this.currentPassword,
          new_password: this.newPassword,
        })
        this.loading = false
        this.showSuccessAlert = true
        const timeout = setTimeout(() => {
          this.showSuccessAlert = false
          this.$router.push({ name: 'dashboard' })
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(timeout)
        })
      } catch (error) {
        this.loading = false
        this.serverError = this.$utils.parseServerError(error)
        if (this.serverError === 'Contraseña incorrecta.') {
          this.customErrorPassword = this.serverError
          this.showErrorAlert = false
        } else {
          this.showErrorAlert = true
        }
      }
    },
    goBack() {
      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col">
    <MqLayout mq="de" class="flex">
      <nav class="gx-h4 flex items-center">
        <GxIcon
          icon="keyboard_backspace"
          class="mr-4 cursor-pointer"
          @click="goBack"
        />
        <h1 class="de:gx-h4 font-bold">Actualizar contraseña</h1>
      </nav>
    </MqLayout>
    <div
      class="flex px-4 mt-4 de:mx-auto de:mt-32 de:shadow-3 de:relative de:p-8 de:rounded-lg de:w-108"
    >
      <GxForm
        v-if="myAccount"
        class="flex-grow flex flex-col"
        @submit="onSubmit"
      >
        <GxTextFieldPassword
          ref="password"
          v-model="currentPassword"
          class="pb-2"
          required
          label="Contraseña actual"
          :error="customErrorPassword"
          icon="lock"
          autocomplete="current-password"
        />
        <GxTextFieldPassword
          v-model="newPassword"
          label="Nueva contraseña"
          class="pb-2"
          required
          :error="customErrorNewPassword"
          icon="lock"
          autocomplete="new-password"
        />
        <GxTextFieldPassword
          v-model="newPasswordConfirmation"
          label="Confirmar contraseña"
          required
          autocomplete="new-password"
          :error="customErrorNewPasswordConfirmation"
          icon="lock"
        />
        <div
          class="flex-grow flex flex-col justify-end mx-auto mt-4 items-center"
        >
          <p class="text-alert h-4 mb-2">
            <span v-if="customError">{{ customError }}</span>
          </p>
          <GxButton :loading="loading" type="submit">
            Actualizar
          </GxButton>
        </div>
      </GxForm>
      <GxCardModal
        v-if="showSuccessAlert"
        headline="Contraseña actualizada"
        :card-img="$utils.alertImages.Done"
        alt="Contraseña actualizada"
        @close="!showSuccessAlert"
      >
      </GxCardModal>
      <GxCardModal
        v-if="showErrorAlert"
        :headline="serverError"
        :card-img="$utils.alertImages.Oops"
        :alt="serverError"
        @click="showErrorAlert = false"
      >
      </GxCardModal>
    </div>
  </div>
</template>

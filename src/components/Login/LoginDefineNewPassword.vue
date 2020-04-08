<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { axiosAuth } from '@src/axiosConfig'

export default {
  name: 'LoginDefineNewPassword',
  components: {
    GxCardCore,
    GxCardModal,
  },
  data() {
    return {
      windowHeight: 'auto',
      token: this.$route.query.token,
      email: this.$route.query.email,
      loading: false,
      loadingSucces: false,
      password: '',
      passwordConfirmation: '',
      invalidPassword: true,
      invalidPasswordConfirmation: true,
      passwordCustomError: null,
      passwordConfirmationCustomError: null,
      bgImg: require('@assets/images/DE/CompanyInfo/CompanyBusiness/de_002_01_fondoguru.svg'),
      errorModal: false,
      linkError: null,
      showSuccessAlert: false,
    }
  },
  watch: {
    password(newPass) {
      this.passwordCustomError = ''
    },
    passwordConfirmation(newPass) {
      this.passwordConfirmationCustomError = ''
    },
  },
  mounted() {
    this.windowHeight = window.document.documentElement.clientHeight + 'px'
    const setImageHeight = () => {
      this.windowHeight = window.document.documentElement.clientHeight + 'px'
    }
    window.addEventListener('resize', setImageHeight)
    this.$once('hook:destroyed', () => {
      window.removeEventListener('resize', setImageHeight)
    })
  },
  methods: {
    async onSubmit() {
      // if (this.password.length === 0) {
      //   this.passwordCustomError = 'Este campo es necesario.'
      //   return
      // }

      if (this.password !== this.passwordConfirmation) {
        this.passwordConfirmationCustomError = 'La contraseña no es igual.'
        return
      }

      try {
        this.loading = true
        await axiosAuth.post('/change_password', {
          email: this.email,
          reset_password_token: this.token,
          new_password: this.password,
        })
        localStorage.removeItem('gxRecoveryPassword')
        this.loading = false
        this.loadingSuccess = true
        this.showSuccessAlert = true
        setTimeout(() => {
          this.$router.push({ name: 'login' })
        }, 3000)
      } catch (error) {
        this.loading = false
        let errorMessage = this.$utils.parseServerError(error)
        if (
          errorMessage ===
          'El vínculo recibido por correo electrónico ha caducado, o bien ya lo has utilizado. Por favor inténtalo de nuevo.'
        ) {
          this.errorModal = true
          this.linkError = errorMessage
        } else {
          this.passwordConfirmationCustomError = errorMessage
        }
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      }
    },
    goTo() {
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col text-white de:text-black p-4 de:p-0">
    <!-- Mobile -->
    <MqLayout class="flex-grow flex flex-col" mq="mo">
      <h1 class="gx-h4">Define tu nueva contraseña</h1>
      <p class="gx-caption">Deberá de ser al menos 8 caracteres con:</p>
      <ul class="gx-caption">
        <li class="flex items-center"
          ><div class="bg-white h-2 w-2 rounded-full mr-1"></div> Una
          mayúscula</li
        >
        <li class="flex items-center"
          ><div class="bg-white h-2 w-2 rounded-full mr-1"></div> Una
          minúscula</li
        >
        <li class="flex items-center"
          ><div class="bg-white h-2 w-2 rounded-full mr-1"></div> Un número (0
          al 9)</li
        >
      </ul>
      <GxForm class=" flex flex-col justify-around mt-8" @submit="onSubmit">
        <div class="flex-grow">
          <GxTextFieldDarkPassword
            v-model="password"
            placeholder="Nueva contraseña"
            label="Nueva contraseña"
            :error="passwordCustomError"
            required
            :disabled="loading"
            class="mb-4"
          />
          <!-- <GxInput
            v-model="password"
            dark
            placeholder="Nueva contraseña"
            label="Nueva contraseña"
            icon="lock"
            pattern="password"
            :error="passwordCustomError"
            @valid="invalidPassword = $event"
          /> -->
          <GxTextFieldDarkPassword
            v-model="passwordConfirmation"
            placeholder="Confirmar contraseña"
            label="Confirmar contraseña"
            required
            :disabled="loading"
            :error="passwordConfirmationCustomError"
          />
          <!-- <GxInput
            v-model="passwordConfirmation"
            dark
            placeholder="Confirmar contraseña"
            label="Confirmar contraseña"
            icon="lock"
            pattern="password"
            :error="passwordConfirmationCustomError"
            @valid="invalidPasswordConfirmation = $event"
          /> -->
        </div>
        <p>{{ passwordConfirmationCustomError }}</p>
        <GxButton
          class="mx-auto mt-8"
          dark
          :loading="loading"
          type="submit"
          :loading-success="loadingSuccess"
          >cambiar contraseña</GxButton
        >
      </GxForm>
      <GxTextLink
        class="self-center text-white de:gx-caption"
        :to="{ name: 'login' }"
        >Iniciar sesión</GxTextLink
      >
    </MqLayout>
    <MqLayout
      class="flex-grow flex flex-col bg-white justify-around bg-no-repeat formPosition"
      mq="de"
      :style="`background-image: url(${bgImg});`"
    >
      <div class="w-108 ml-16 mr-8">
        <GxCardCore
          class=" shadow-3 flex flex-col rounded-lg shadow-2 pb-8 pt-8  bg-white"
        >
          <h4 class="de:gx-h4 de:font-bold text-center mb-4"
            >Define tu nueva contraseña</h4
          >
          <ul class="px-8">
            <p>Deberá de ser al menos 8 caracteres con:</p>
            <li class="flex items-center">
              <span class="mr-2">&#9679;</span> Una mayúscula</li
            >
            <li class="flex items-center"
              ><span class="mr-2">&#9679;</span> Una minúscula</li
            >
            <li class="flex items-center"
              ><span class="mr-2">&#9679;</span> Un número (0 al 9)</li
            >
          </ul>
          <GxForm class="mt-4 px-4" @submit="onSubmit">
            <GxTextFieldPassword
              v-model="password"
              required
              label="Nueva contraseña"
              :error="passwordCustomError"
            />
            <!-- <GxInput
              v-model="password"
              placeholder="Nueva contraseña"
              label="Nueva contraseña"
              icon="lock"
              pattern="password"
              :error="passwordCustomError"
              @valid="invalidPassword = $event"
            /> -->
            <GxTextFieldPassword
              v-model="passwordConfirmation"
              required
              label="Confirmar contraseña"
              :error="passwordConfirmationCustomError"
            />
            <!-- <GxInput
              v-model="passwordConfirmation"
              placeholder="Confirmar contraseña"
              label="Confirmar contraseña"
              icon="lock"
              pattern="password"
              :error="passwordConfirmationCustomError"
              @valid="invalidPasswordConfirmation = $event"
            /> -->
            <GxButton
              class="mx-auto mt-8"
              :loading="loading"
              :loading-success="loadingSuccess"
              type="submit"
              >cambiar contraseña</GxButton
            >
          </GxForm>
          <GxTextLink
            class="text-secondary-300 text-center"
            :to="{ name: 'login' }"
          >
            Iniciar sesión
          </GxTextLink>
        </GxCardCore>
      </div>
      <img
        class="absolute self-start ml-16 gxGuruDe"
        src="@src/assets/images/DE/Login/PasswordRecovery/de_002_1_guru.svg"
        alt="guru"
        aria-hidden="true"
      />
    </MqLayout>
    <GxCardModal
      v-if="linkError"
      headline="El vínculo ya no es válido"
      :text-body="linkError"
      :card-img="$utils.alertImages.Dissapointed"
      alt="Error"
    >
      <template v-slot:actions>
        <div
          class=" justify-center flex de:mt-8"
          :class="{ 'justify-end': $mq === 'mo' }"
        >
          <GxButton class="mr-4" @click="goTo">aceptar</GxButton>
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="showSuccessAlert"
      key="Contraseñaactualizada"
      headline="Contraseña actualizada"
      :card-img="$utils.alertImages.Success"
      alt="Contraseña actualizada"
      @close="categoryCreatedClose"
    />
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.formPosition {
  align-items: flex-end;
  background-size: 70% 100%;
}

@media only screen and (max-width: 970px) {
  .gxGuruDe {
    display: none;
  }
  .formPosition {
    align-items: center;
    background-size: 57% 100%;
  }
}

@media only screen and (min-width: 1035px) {
  .gxGuruDe {
    width: 40%;
  }
  .formPosition {
    padding-right: 10%;
  }
}

@media only screen and (max-width: 1671px) {
  .gxGuruDe {
    width: 40%;
  }
  .formPosition {
    padding-right: 10%;
  }
}
</style>

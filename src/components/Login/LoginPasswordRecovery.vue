<script>
// // import GxInput from '@components/_Core/Forms/GxInput'
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import { axiosAuth } from '@src/axiosConfig'

export default {
  name: 'LoginPasswordRecovery',
  components: {
    // GxInput,
    GxCardCore,
  },
  data() {
    return {
      windowHeight: 'auto',
      hasFocus: false,
      mail: '',
      customError: null,
      error: null,
      invalidEmail: false,
      loading: false,
      urlWhereRegister: window.location.toString().split('?')[0],
      utmMedium: document.referrer || 'Directo Website',
      bgImg: require('@assets/images/DE/CompanyInfo/CompanyBusiness/de_002_01_fondoguru.svg'),
      loadingSuccess: false,
    }
  },
  computed: {
    collapseImage() {
      return this.hasFocus && !this.$utils.isIphone
    },
  },
  watch: {
    mail: function(val) {
      this.customError = ''
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
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    async onSubmit() {
      // if (this.$mq === 'mo') {
      //   this.$refs.email.setFocus()
      // }
      // if (this.mail.length === 0) {
      //   this.customError = 'Este campo es necesario.'
      //   return
      // }
      // if (this.invalidEmail) return
      try {
        this.loading = true
        await axiosAuth.post('/reset_password_email', {
          client_id: process.env.VUE_APP_AUTH_URL_CLIENT_ID,
          email: this.mail,
        })
        this.loading = false
        localStorage.setItem('gxRecoveryPassword', this.mail)
        this.loadingSuccess = true
        setTimeout(() => {
          this.$router.push({ name: 'mailrecovery' })
        }, 2000)
      } catch (err) {
        /* eslint-disable */
        console.log(err)
        /* eslint-enable */
        this.loading = false
        this.customError = this.$utils.parseServerError(err)
      }
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col">
    <!-- Mobile -->
    <MqLayout class="flex-grow flex flex-col" mq="mo">
      <div
        class="overflow-x-hidden"
        :class="{ gxImageContainer: !collapseImage }"
      >
      </div>
      <div
        class="flex-grow flex flex-col justify-around bg-primary rounded-t-xl p-4 text-white formContainer"
      >
        <p class="gx-h6 mb-8"
          >Ups, nuestro gurú no pudo adivinar tu contraseña, escribe tu correo
          para recuperarla:</p
        >
        <GxForm
          class="flex-grow flex flex-col items-center justify-start mb-8"
          @submit="onSubmit"
        >
          <GxTextFieldDarkEmail
            v-model="mail"
            required
            autofocus
            :autofocus-timeout="1000"
            class="mb-4"
            label="Correo Electrónico"
            :error="customError"
            for-id="email"
            name="email"
            :disabled="loading"
            @focus="hasFocus = true"
            @blur="hasFocus = false"
          />
          <!-- <GxInput
            ref="email"
            v-model="mail"
            dark
            autofocus
            placeholder="Correo Electrónico"
            label="Correo Electrónico"
            icon="mail"
            pattern="email"
            class="mb-4"
            :error="customError"
            :loading="loading"
            @valid="invalidEmail = $event"
            @focus="hasFocus = true"
            @blur="hasFocus = false"
          /> -->
          <GxButton
            class="mx-auto"
            dark
            type="submit"
            :loading="loading"
            :loading-success="loadingSuccess"
            >siguiente</GxButton
          >
          <div class="flex w-full justify-center items-center text-white">
            <GxTextLink :to="{ name: 'login' }" class="mr-1 font-bold">
              Inicia sesión</GxTextLink
            >
            <span class="mr-1"> | </span>
            <GxTextLink
              id="btn-register-password-recovery"
              :to="{
                name: 'signup',
                query: {
                  utm_source: 'Orgánico',
                  utm_medium: utmMedium,
                  url_dondeseregistra: urlWhereRegister,
                  url_elementoenelqueseregistra:
                    'btn-register-password-recovery',
                },
              }"
              class="font-bold"
              >Regístrate</GxTextLink
            >
          </div>
        </GxForm>
      </div>
    </MqLayout>
    <!-- Desk -->
    <MqLayout
      class="flex-grow flex flex-col bg-white bg-no-repeat justify-center formPosition"
      mq="de"
      :style="`background-image: url(${bgImg});`"
    >
      <div class="flex-grow flex flex-col justify-center w-108 ml-16 mr-8">
        <GxCardCore
          :clickable="false"
          class="shadow-3 flex flex-col rounded-lg shadow-2 p-8 px-8 bg-white"
        >
          <p class="de:gx-h4 text-center font-bold"
            >Ups, nuestro gurú no pudo adivinar tu contraseña</p
          >
          <p class="text-center py-4">Escribe tu correo para recuperarla:</p>
          <GxForm @submit="onSubmit">
            <GxTextFieldEmail
              v-model="mail"
              required
              class="mb-2"
              label="Correo Electrónico"
              :error="customError"
              for-id="email"
              name="email"
              autofocus
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />
            <!-- <GxInput
              v-model="mail"
              placeholder="Correo Electrónico"
              label="Correo Electrónico"
              icon="mail"
              pattern="email"
              name="email"
              :error="customError"
              :loading="loading"
              @valid="invalidEmail = $event"
              @focus="collapseImage = true"
              @blur="collapseImage = false"
            /> -->
            <p v-if="error" class="text-alert">{{ error }}</p>
            <GxButton
              class="mx-auto mt-8"
              type="submit"
              :loading="loading"
              :loading-success="loadingSuccess"
              >siguiente</GxButton
            >
          </GxForm>
          <div class="flex items-center justify-center de:gx-caption">
            <GxTextLink
              class="text-secondary-300 text-center mr-1"
              :to="{ name: 'login' }"
            >
              Inicia sesión
            </GxTextLink>
            <span class="text-secondary-300 text-center mr-1"> | </span>
            <GxTextLink
              id="btn-register-password-recovery"
              :to="{
                name: 'signup',
                query: {
                  utm_source: 'Orgánico',
                  utm_medium: utmMedium,
                  url_dondeseregistra: urlWhereRegister,
                  url_elementoenelqueseregistra:
                    'btn-register-password-recovery',
                },
              }"
              class="text-secondary-300 text-center font-bold"
              >Regístrate</GxTextLink
            >
          </div>
        </GxCardCore>
      </div>
      <img
        class="absolute self-start ml-16 gxGuruDe"
        src="@src/assets/images/DE/Login/PasswordRecovery/de_002_1_guru.svg"
        alt="guru"
        aria-hidden="true"
      />
    </MqLayout>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.formContainer {
  transform: translateY(-14px);
}
.gxGuru {
  max-width: inherit;
}
.formPosition {
  align-items: flex-end;
  background-size: 70% 100%;
}
.gxImageContainer {
  // Padding hack https://css-tricks.com/scale-svg/
  width: 100%;
  padding-bottom: calc(100% * 244 / 360);
  margin-top: -3.25rem;
  background-image: url(~@assets/images/Login/mo_002_1_guru.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: cover;
  transition: all 0.2s ease-in-out;
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

@media only screen and (min-width: 971px) {
  .gxGuruDe {
    width: 30%;
    padding-left: 0;
  }
  .formPosition {
    padding-right: 10%;
  }
}

@media only screen and (min-width: 1035px) {
  .gxGuruDe {
    width: 40%;
    padding-left: 0;
  }
  .formPosition {
    padding-right: 10%;
  }
}
</style>

<script>
import authService from '@src/auth/authService'
import GxCardCore from '@components/_Core/Cards/GxCardCore'

export default {
  components: {
    GxCardCore,
  },
  data() {
    return {
      hasFocus: false,
      loading: false,
      userEmail: '',
      password: '',
      invalidPassword: true,
      invalidEmail: true,
      customErrorEmail: '',
      customErrorPassword: '',
      authError: null,
      bgImg: require('@src/assets/images/DE/Login/de_002_fondo.svg'),
      bgImgClouds: require('@src/assets/images/DE/Login/de_002_nubes.svg'),
      windowHeight: 'auto',
      urlWhereRegister: window.location.toString().split('?')[0],
      utmMedium: document.referrer || 'Directo Website',
    }
  },
  computed: {
    collapseImage() {
      return this.hasFocus && !this.$utils.isIphone
    },
  },
  watch: {
    password() {
      this.customErrorPassword = ''
    },
    userEmail() {
      this.customErrorEmail = ''
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
    toSignup() {
      this.$router.push({
        name: 'signup',
        query: {
          utm_source: 'Orgánico',
          utm_medium: this.utmMedium,
          url_dondeseregistra: this.urlWhereRegister,
          innerLink: true,
          url_elementoenelqueseregistra: 'btn-register-login',
        },
      })
    },
    getImage(selection) {
      this.imgSelection = selection.optionImg
      this.optionName = selection.optionName
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    onSubmit() {
      // if (this.$mq === 'mo') {
      //   this.$refs.email.setFocus()
      // }
      // if (this.userEmail.length === 0 || this.password.length === 0) {
      //   this.customErrorEmail = 'Este campo es necesario'
      //   this.customErrorPassword = 'Este campo es necesario'
      // }
      // if (this.userEmail.length === 0) {
      //   this.customErrorEmail = 'Este campo es necesario'
      // } else {
      //   this.customErrorEmail = ''
      // }
      // if (this.password.length === 0) {
      //   this.customErrorPassword = 'Este campo es necesario'
      // } else {
      //   this.customErrorPassword = ''
      // }
      // if (this.invalidEmail || this.invalidPassword) {
      //   return
      // }
      // if (this.invalidPassword) return

      this.loading = true
      this.authError = null
      authService.login(
        {
          email: this.userEmail,
          password: this.password,
        },
        (err) => {
          this.loading = false
          this.authError = this.$utils.parseServerError(err)
          this.customErrorEmail = ' '
          this.customErrorPassword = ' '
        }
      )
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col">
    <!-- Mobile -->
    <MqLayout class="flex-grow flex flex-col backgroundColor" mq="mo">
      <div
        class="overflow-x-hidden"
        :class="{ gxImageContainer: !collapseImage }"
      >
      </div>
      <div>
        <div
          id="borders"
          class="flex-grow flex flex-col bg-primary p-4  negative-margin formContainer  rounded-t-xl"
        >
          <p class="text-white mb-8">Bienvenido, ingresa tus datos</p>
          <GxForm class="flex-grow flex flex-col " @submit="onSubmit">
            <GxTextFieldDarkEmail
              v-model="userEmail"
              required
              autofocus
              :autofocus-timeout="1000"
              class="mb-4"
              label="Correo Electrónico"
              :error="customErrorEmail"
              for-id="email"
              name="email"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />
            <!-- <GxInput
              ref="email"
              v-model="userEmail"
              dark
              label="Correo Electrónico"
              placeholder="Correo Electrónico"
              icon="email"
              pattern="email"
              name="email"
              autofocus
              :error="customErrorEmail"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
              @valid="invalidEmail = $event"
            ></GxInput> -->
            <GxTextFieldDarkPassword
              v-model="password"
              required
              class="mb-4"
              label="Contraseña"
              :error="customErrorPassword"
              for-id="password"
              name="password"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />
            <!-- <GxInput
              v-model="password"
              placeholder="Contraseña"
              dark
              autocomplete="new-password"
              label="Contraseña"
              pattern="password"
              :error="customErrorPassword"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
              @valid="invalidPassword = $event"
            /> -->
            <p v-if="authError" class="text-white text-center mb-2">
              {{ authError }}
            </p>
            <GxButton :loading="loading" class="mx-auto" dark type="submit"
              >Entrar</GxButton
            >
            <div class="flex w-full justify-center text-white">
              <GxTextLink
                :to="{
                  name: 'signup',
                  query: {
                    utm_source: 'Orgánico',
                    utm_medium: utmMedium,
                    url_dondeseregistra: urlWhereRegister,
                    url_elementoenelqueseregistra: 'btn-register-login',
                  },
                }"
                class="mr-1 font-bold"
                >Regístrate</GxTextLink
              >
              <span class="mr-1"> | </span>
              <GxTextLink :to="{ name: 'passwordrecovery' }" class="font-bold">
                Recuperar contraseña</GxTextLink
              >
            </div>
          </GxForm>
        </div>
      </div>
    </MqLayout>
    <!-- Desktop -->
    <MqLayout
      class="flex-grow flex items-center w-full bg-no-repeat overflow-hidden relative contentPosition"
      mq="de"
      :style="`background-image: url(${bgImg});background-position: right;`"
    >
      <!-- <div class="flex-grow flex items-center w-full bg-no-repeat position overflow-hidden"
      :style="
        `
        background-image: url(${bgImgClouds});
        background-size: auto 100%;
        background-position: right center;
        height: 100%;
        `
      "> -->
      <!-- <img
        class="group-image flex-shrink absolute stars"
        style=" right: 0;"
        src="@src/assets/images/DE/Login/de_002_bienvenido.svg"
        alt="El espacio"
        aria-hidden="true"
      /> -->
      <div class="ml-8 formPosition">
        <GxCardCore
          :clickable="false"
          class="gxCardFormDesk px-8 py-8 shadow-3"
        >
          <p class="de:gx-h4 text-center font-bold"
            >Bienvenido, inicia sesión</p
          >
          <GxForm class="mt-4" @submit="onSubmit">
            <GxTextFieldEmail
              v-model.trim="userEmail"
              required
              label="Correo Electrónico"
              :error="customErrorEmail"
              for-id="email"
              name="email"
              autofocus
              class="mb-2"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />
            <!-- <GxInput
              v-model="userEmail"
              label="Correo Electrónico"
              placeholder="Correo Electrónico"
              icon="email"
              pattern="email"
              autofocus
              :error="customErrorEmail"
              @valid="invalidEmail = $event"
              @focus="collapseImage = true"
              @blur="collapseImage = false"
            ></GxInput> -->
            <GxTextFieldPassword
              v-model="password"
              required
              label="Contraseña"
              :error="customErrorPassword"
              for-id="password"
              name="password"
              @focus="hasFocus = true"
              @blur="hasFocus = false"
            />
            <!-- <GxInput
              v-model="password"
              placeholder="Contraseña"
              label="Contraseña"
              pattern="password"
              :error="customErrorPassword"
              @valid="invalidPassword = $event"
              @focus="collapseImage = true"
              @blur="collapseImage = false"
            /> -->
            <p class="text-alert text-center mt-8 mb-2"> {{ authError }} </p>
            <GxButton :loading="loading" class="mx-auto" type="submit"
              >Entrar</GxButton
            >
          </GxForm>
          <div class="flex justify-center de:gx-caption">
            <p class="mr-1">
              ¿Aún no tienes cuenta?
            </p>
            <GxTextLink
              id="btn-register-login"
              class="text-secondary-300"
              @mousedown="toSignup"
            >
              Regístrate
            </GxTextLink>
            <span class="mx-1"> | </span>
            <GxTextLink
              class="text-secondary-300"
              :to="{ name: 'passwordrecovery' }"
            >
              Recuperar contraseña
            </GxTextLink>
          </div>
        </GxCardCore>
      </div>
      <!-- <img
        class="group-image z-1 flex-shrink absolute moon"
        style="top: 5%; right: 35%;"
        src="@src/assets/images/DE/Login/de_002_luna.svg"
        alt="Astronauta en el espacio con su computadora"
      /> -->
      <img
        class="group-image z-1 absolute flex-shrink astronaut pointer-events-none"
        style="right: 32px;"
        src="@src/assets/images/DE/Login/de_002_bienvenido.svg"
        alt=""
      />
      <!-- </div> -->
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.formContainer {
  transform: translateY(-14px);
}
.gxImageContainer {
  // Padding hack https://css-tricks.com/scale-svg/
  width: 100%;
  padding-bottom: calc(100% * 244 / 360);
  margin-top: -3.25rem;
  background-image: url(~@assets/images/Login/mo_002_bienvenido.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: cover;
  transition: all 0.2s ease-in-out;
}
.gxCardFormDesk {
  width: 27rem;
}
.contentPosition {
  background-size: 71% 100%;
}

@media only screen and (max-width: 1000px) {
  .group-image {
    display: none;
  }
  .contentPosition {
    justify-content: center;
    background-size: 50% 100%;
  }
}

@media only screen and (min-width: 1035px) {
  .astronaut {
    width: 40%;
    padding-bottom: 4rem;
  }
  .formPosition {
    padding-left: 5%;
  }
  .stars {
    width: 48%;
  }
  .moon {
    width: 8%;
  }
}
</style>

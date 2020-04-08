<script>
import {
  UPDATE_USER_NAME,
  UPDATE_INVITATED_USER,
  UPDATE_COMPANY_NUMBER,
} from '@src/apollo//mutations'
import gql from 'graphql-tag'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import authService from '@src/auth/authService'
import { getAttributions } from '@src/utms'
export default {
  name: 'SignupName',
  apollo: {
    user: gql`
      {
        user @client {
          email
          number
          jobTitle
        }
      }
    `,
    subscription: gql`
      {
        subscription @client {
          number
        }
      }
    `,
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
  },
  data() {
    return {
      createAccountError: null,
      hasFocus: false,
      name: '',
      lastname: '',
      userEmail: '',
      phone: '',
      guest: false,
      password: '',
      invalidName: false,
      invalidLastname: false,
      invalidEmail: false,
      invalidPhone: false,
      invalidPassword: false,
      customError: null,
      astronautImageDisplacementY: 120,
      loading: false,
      buttonText: '',
      customErrorLastname: null,
      customErrorEmail: null,
      customErrorPhone: null,
      customErrorPassword: null,
      bgImg: require('@assets/images/Signup/GeneralInfo/de_001_1_astronauta.svg'),
      loadingSuccess: false,
    }
  },
  watch: {
    name(newVal) {
      this.customError = ''
      this.createAccountError = ''
    },
    lastname(val) {
      this.customErrorLastname = ''
      this.createAccountError = ''
    },
    userEmail(val) {
      this.customErrorEmail = ''
      this.createAccountError = ''
    },
    phone(val) {
      this.customErrorPhone = ''
      this.createAccountError = ''
    },
    password(val) {
      this.customErrorPassword = ''
      this.createAccountError = ''
    },
  },
  created() {
    if (localStorage.name) this.name = localStorage.name
    this.captureQueryParams()
    if (this.guest) {
      this.buttonText = 'Unirme Ahora'
    } else {
      this.buttonText = 'Crear cuenta'
    }
  },
  mounted() {
    // Extract signup data for totalpay accounts from query params
    // The link is provided to the users for faster acc. creation
    this.captureTotalplayQueryParams()

    // Optimal setting for Astronaut image found at 1382 width. Modifying according to viewport width
    const vw = document.documentElement.clientWidth
    this.astronautImageDisplacementY += (vw - 1382) / 10

    if (this.$route.query.cn && this.$route.query.cn === 'false') {
      this.$router.push({ name: 'login' })
    }

    // Capture account information for TP account creation
  },
  methods: {
    toLogin() {
      this.$router.push({ name: 'login' })
    },
    goBack() {
      this.$router.back()
    },
    async onSubmit() {
      // Prevent loosing focus on submit ( only mobile)
      if (this.mq === 'mo') {
        this.$refs.name.setFocus()
      }
      try {
        // Mobile and Desktop validations
        // Mobile validate name
        if (this.$mq === 'mo') {
          if (this.name.length === 0) {
            this.customError = 'Este campo es necesario'
          }
          if (this.name.length === 1) {
            this.customError = 'Tu nombre es muy corto'
          }
          if (this.invalidName) return
        }
        // Desktop validations
        else {
          let hasError
          if (this.name.length === 0) {
            this.customError = 'Necesitamos tu nombre '
            hasError = true
          }
          if (this.lastname.length === 0) {
            this.customErrorLastname = 'Falta tu apellido'
            hasError = true
          }
          if (this.userEmail.length === 0) {
            this.customErrorEmail = 'Sin tu correo no podemos seguir'
            hasError = true
          }
          if (this.phone.length === 0) {
            this.customErrorPhone = 'Falta tu teléfono'
            hasError = true
          }
          if (this.password.length === 0) {
            this.customErrorPassword =
              'Necesitamos una contraseña para continuar'
            hasError = true
          }
          if (
            this.invalidName ||
            this.invalidLastname ||
            this.invalidPassword ||
            this.invalidEmail ||
            this.invalidPhone ||
            hasError
          )
            return
        }

        // Mobile and Desktop validations PASSED. Submit.
        this.loading = true
        if (this.$mq === 'de') {
          await this.submitDesktop()
        } else {
          await this.submitMobile()
        }
      } catch (error) {
        this.loading = false
        if (this.$mq === 'mo') {
          this.customError = this.$utils.parseServerError(error)
        } else {
          this.createAccountError = this.$utils.parseServerError(error)
        }
      }
    },
    captureQueryParams() {
      // i=email(invitation email),re=email(sos email), r=role, e=company number, cn=new account, nu=user number, ns=suscription number
      const { i, re, e, cn, nu, r } = this.$route.query
      const fromSOSInvitation = !!(re && e && cn && r && nu)
      const fromSignUpInvitation = !!(i && e && cn && nu)
      this.guest = fromSOSInvitation || fromSignUpInvitation

      if (this.guest) {
        this.$apollo.mutate({
          mutation: UPDATE_INVITATED_USER,
          variables: {
            email: i || re,
            jobTitle: r || '',
            companyNumber: e,
            userNumber: nu || '',
          },
        })
        this.$apollo.mutate({
          mutation: UPDATE_COMPANY_NUMBER,
          variables: {
            companyNumber: e,
          },
        })
        this.userEmail = i || re || ''
      }
    },
    captureTotalplayQueryParams() {
      // Totalplay specific params
      // tp: Is a totalplay account (true)
      // fn: first name
      // ln: last name
      // e: email
      // p: phone
      const { tp, fn, ln, e, p, tax } = this.$route.query
      if (tp) {
        this.name = fn
        this.lastname = ln
        this.userEmail = e.replace(' ', '+')
        this.phone = p
        this.taxId = tax

        // Add to localstorage for mobile signup
        localStorage.setItem('lastname', this.lastname)
        localStorage.setItem('userEmail', this.userEmail)
        localStorage.setItem('phone', this.phone)
        localStorage.setItem('taxId', this.taxId)
      }
    },
    async submitMobile() {
      await this.$apollo.mutate({
        mutation: UPDATE_USER_NAME,
        variables: {
          name: this.name.trim(),
        },
      })
      if (this.guest) {
        const p = this.$route.query.p || this.$route.query.pendiente
        this.$router.push({
          name: 'signupLastname',
          query: { invitado: true, p },
        })
      } else {
        this.$router.push({
          name: 'signupLastname',
        })
      }
      localStorage.setItem('name', this.name.trim())
    },
    async submitDesktop() {
      if (this.guest) {
        await this.createGuest()
        // Skip email form if inside invitation flow
        // Since Auth0 authentication happens here, actual redirects should happend in Callback.vue
        // here we just store the redirect VueRouter object
        if (
          this.$route.query.p === 'subircsd' ||
          this.$route.query.pendiente === 'subircsd'
        ) {
          localStorage.setItem(
            'redirectTo',
            JSON.stringify({ name: 'uploadcsd' })
          )
        } else if (this.user.jobTitle.toLowerCase() === 'contador') {
          localStorage.setItem(
            'redirectTo',
            JSON.stringify({ name: 'dashboard' })
          )
        } else {
          localStorage.setItem(
            'redirectTo',
            JSON.stringify({
              name: 'companyrole',
              query: { invitado: true },
            })
          )
        }
      } else {
        const res = await this.createUserDesktop()
        // used for e2e tests
        if (res.data.ecu) {
          localStorage.setItem('ecu', res.data.ecu)
        }
        this.loadingSuccess = true
        localStorage.setItem(
          'redirectTo',
          JSON.stringify({ name: 'signupAccountConfirmation' })
        )
      }
      this.loading = false
      this.loadingSuccess = true
      localStorage.setItem('name', this.name)
      // // Authenticate against Auth0 to set cookies for account confirmation flow
      authService.login({
        email: this.userEmail,
        password: this.password,
      })
    },
    createUserDesktop() {
      const {
        utms,
        whereArrives,
        whereItComesFrom,
        elementWhereRegisters,
        whereRegisters,
      } = getAttributions()
      return axiosAccountProvisioning.post('/create_account', {
        user: {
          email: this.userEmail,
          firstName: this.name,
          lastName: this.lastname,
          mobilePhone: this.phone.replace(/\D/gi, ''),
          password: this.password,
        },
        subscription: {
          createdBy: this.userEmail,
          attribution: {
            utmSource: utms.utmSource,
            utmMedium: utms.utmMedium,
            utmCampaign: utms.utmCampaign,
            utmContent: utms.utmContent,
            utmTerm: utms.utmTerm,
            utmMatchtype: utms.utmMatchtype,
          },
          urls: {
            whereItComesFrom,
            whereArrives,
            whereRegisters,
            elementWhereRegisters,
          },
        },
      })
    },
    createGuest() {
      const url = `/update_account/${this.user.number}/${this.company.number}`
      const mobilePhone = this.phone.replace(/\D/gi, '')
      const password = this.password
      const firstName = this.name
      const lastName = this.lastname
      return axiosAccountProvisioning.post(
        url,
        {
          user: {
            mobilePhone,
            password,
            firstName,
            lastName,
          },
        },
        { params: { fromInvitation: true } }
      )
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col justify-between p-4 de:p-0">
    <!-- Mobile -->
    <MqLayout
      class="flex-grow flex flex-col"
      :class="{
        'justify-between': !(hasFocus && $utils.isIphone),
        'justify-end': hasFocus && $utils.isIphone,
      }"
      mq="mo"
    >
      <!-- Seems to require a first click to lose focus and a second click to actually work on mobile -->
      <!-- The double click makes this hack useless for a dummy back button -->
      <!-- <div v-if="hasFocus && $utils.isIphone" class="flex mb-12">
        <GxIcon
          icon="keyboard_backspace"
          style=" font-size: 24px;color: #fff;"
          html-tag="button"
          @click="goBack"
        />
      </div> -->
      <p
        class="text-white text-center gx-h3"
        :class="{
          'pb-0': hasFocus,
          'pb-4': !hasFocus,
          'mb-32': hasFocus && $utils.isIphone,
        }"
        style="transition: all .3s"
        >¡Hola! <br />
        ¿Cómo te llamas?</p
      >
      <GxForm class="w-full flex" @submit="onSubmit">
        <GxTextFieldDarkName
          v-model="name"
          required
          class="mr-4"
          label="Nombre"
          assistive=" "
          autofocus
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        />
        <!-- <GxInput
          ref="name"
          v-model="name"
          dark
          placeholder="Nombre"
          label="Nombre"
          icon="face"
          class="mr-4"
          pattern="name"
          :autofocus="$utils.isIphone ? false : true"
          :loading="loading"
          :error="customError"
          @valid="invalidName = $event"
          @focus="hasFocus = true"
          @blur="hasFocus = false"
        ></GxInput> -->
        <div>
          <GxButtonCircle
            dark
            type="submit"
            icon="arrow_forward"
            label="Guardar"
          />
        </div>
      </GxForm>
    </MqLayout>
    <!-- Desktop -->
    <MqLayout
      class="flex-grow flex flex-col items-center justify-center overflow-hidden bg-primary"
      mq="de"
    >
      <div class="z-2 flex justify-center ">
        <div class="mx-auto mt-8">
          <div
            class="flex flex-col bg-white rounded-lg shadow-3 p-8 z-1 formContainer"
          >
            <p class="de:gx-h4 text-center font-bold de:mb-2">Bienvenido</p>
            <GxForm
              class="w-full flex flex-col z-10 form"
              autocomplete="off"
              @submit="onSubmit"
            >
              <GxTextFieldName
                v-model="name"
                required
                label="Nombre*"
                autofocus
                left-icon="face"
                :error="customError"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <GxTextFieldName
                v-model="lastname"
                required
                left-icon="face"
                label="Apellido*"
                :error="customErrorLastname"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <GxTextFieldPhone
                v-model="phone"
                required
                label="Teléfono*"
                :error="customErrorPhone"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <GxTextFieldEmail
                v-model="userEmail"
                required
                :disabled="guest"
                label="Correo Electrónico*"
                :error="customErrorEmail"
                :for-id="`email_cuenta_nueva${Date.now()}`"
                :name="`email_cuenta_nueva${Date.now()}`"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <!-- Use autocomplete new-password to prompt Chrome to autosuggest a strong password to the user -->
              <GxTextFieldPassword
                v-model="password"
                required
                class="mr-4 z-1"
                label="Contraseña*"
                for-id="contraseña_cuenta_nueva"
                name="contraseña_cuenta_nueva"
                :error="customErrorPassword"
                @focus="hasFocus = true"
                @blur="hasFocus = false"
              />
              <div
                class="flex flex-col justify-center items-center de:mt-8 z-10"
              >
                <p
                  v-if="createAccountError"
                  class="text-center text-alert mb-2"
                  >{{ createAccountError }}</p
                >
                <GxButton
                  type="submit"
                  :loading="loading"
                  :loading-success="loadingSuccess"
                >
                  {{ buttonText }}
                </GxButton>
              </div>
            </GxForm>
            <p class="z-10 text-center de:gx-caption"
              >¿Ya tienes una cuenta?
              <GxTextLink
                class="text-center mb-4 text-secondary"
                :to="{ name: 'login' }"
                >Inicia sesión</GxTextLink
              ></p
            >
          </div>
        </div>
      </div>
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
.formContainer {
  width: 432px;
}
.moon {
  right: 65%;
  bottom: 250px;
  width: 9%;
}

.astronaut {
  bottom: 25px;
  left: 60%;
  width: 40%;
}

@media only screen and (max-width: 1035px) {
  .form {
    position: relative;
  }
  .astronaut {
    bottom: -130px;
    left: 65%;
    width: 100%;
  }

  .moon {
    bottom: -70px;
    left: -100px;
    width: 30%;
  }
}

@media only screen and (max-height: 870px) {
  .form {
    position: relative;
  }
  .astronaut {
    bottom: -130px;
    left: 65%;
    width: 100%;
  }

  .moon {
    bottom: -70px;
    left: -100px;
    width: 30%;
  }
}
</style>

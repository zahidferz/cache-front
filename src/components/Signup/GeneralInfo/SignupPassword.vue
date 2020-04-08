<script>
import gql from 'graphql-tag'
import authService from '@src/auth/authService'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import get from 'lodash/get'
const _ = {
  get,
}
export default {
  name: 'SignupPassword',
  apollo: {
    user: gql`
      {
        user @client {
          name
          lastname
          email
          phone
          jobTitle
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
    subscription: gql`
      {
        subscription @client {
          number
        }
      }
    `,
  },
  data() {
    return {
      password: '',
      invalidPassword: true,
      customError: '',
      loading: false,
      hasFocus: false,
    }
  },
  watch: {
    password(val) {
      this.customError = ''
    },
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async onSubmit() {
      // this.$refs.password.setFocus()
      try {
        if (this.loading) return
        // if (this.password.length === 0) {
        //   this.customError = 'Este campo es necesario'
        // } else {
        //   this.customError = ''
        // }
        // if (this.invalidPassword) return
        this.loading = true
        if (this.$route.query.invitado) {
          await this.createGuest()
        } else {
          await this.updatePassword()
        }

        // No need to set loading false, just wait for redirect
        // this.loading = false

        if (this.$route.query.invitado) {
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
              JSON.stringify({ name: 'companyrole', query: { invitado: true } })
            )
          }
        } else {
          localStorage.setItem(
            'redirectTo',
            JSON.stringify({ name: 'signupAccountConfirmation' })
          )
        }
        localStorage.removeItem('name')
        localStorage.removeItem('lastname')
        localStorage.removeItem('phone')
        localStorage.removeItem('userEmail')
        // // Authenticate against Auth0 to set cookies for account confirmation flow
        authService.login({
          email: this.user.email,
          password: this.password,
        })
      } catch (err) {
        this.loading = false
        this.customError = _.get(err, 'response.data.message', 'Hubo un error')
      }
    },
    updatePassword() {
      return axiosAccountProvisioning.post(
        `/update_account/${this.user.number}/${this.company.number}`,
        {
          user: {
            mobilePhone: this.user.phone,
            password: this.password,
          },
        }
      )
    },
    createGuest() {
      const url = `/update_account/${this.user.number}/${this.company.number}`
      const mobilePhone = this.user.phone
      const password = this.password
      const firstName = this.user.name
      const lastName = this.user.lastname
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
  <div
    class="flex-grow flex flex-col p-4 de:p-0"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <!-- Seems to require a first click to lose focus and a second click to actually work on mobile -->
    <!-- The double click makes this hack useless for a dummy back button -->
    <!-- <div v-if="hasFocus && $utils.isIphone" class="flex mb-12">
      <GxIcon
        icon="keyboard_backspace"
        style=" font-size: 24px;color: #fff;"
        @click="goBack"
      />
    </div> -->
    <p
      v-if="user"
      class="gx-transition-all text-white text-center gx-h3"
      :class="{
        'py-0': hasFocus,
        'py-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >Crea una contraseña<br />segura, {{ user.name }}.</p
    >
    <GxForm class="w-full flex" @submit="onSubmit">
      <GxTextFieldDarkPassword
        v-model="password"
        required
        class="mr-4"
        label="Contraseña"
        :disabled="loading"
        :error="customError"
        autofocus
        assistive=" "
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
      <!-- <GxInput
        ref="password"
        v-model="password"
        placeholder="Contraseña"
        dark
        label="Contraseña"
        class="mr-4"
        pattern="password"
        :autofocus="$utils.isIphone ? false : true"
        autocomplete="new-password"
        :error="customError"
        :loading="loading"
        @valid="invalidPassword = $event"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      >
      </GxInput> -->
      <div>
        <GxButtonCircle
          dark
          type="submit"
          label="Guardar"
          icon="arrow_forward"
          :loading="loading"
          :disabled="loading"
        />
      </div>
    </GxForm>
  </div>
</template>
<style lang="scss" scoped>
.gx-transition-all {
  transition: all 0.5s ease-in-out;
}
</style>

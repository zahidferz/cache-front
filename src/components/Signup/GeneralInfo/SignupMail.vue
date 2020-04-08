<script>
import gql from 'graphql-tag'
import {
  UPDATE_USER_EMAIL,
  UPDATE_COMPANY_NUMBER,
} from '@src/apollo//mutations'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import { getAttributions } from '@src/utms'
export default {
  name: 'SignupMail',
  apollo: {
    user: gql`
      {
        user @client {
          name
          lastname
        }
      }
    `,
  },
  data() {
    return {
      userEmail: '',
      invalidEmail: true,
      loading: false,
      customError: '',
      hasFocus: false,
    }
  },
  watch: {
    userEmail(val) {
      this.customError = ''
    },
  },
  created() {
    if (localStorage.userEmail) this.userEmail = localStorage.userEmail
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async onSubmit() {
      // this.$refs.email.setFocus()
      // if (this.userEmail.length === 0) {
      //   this.customError = 'Este campo es necesario'
      // } else {
      //   this.customError = ''
      // }
      // if (this.invalidEmail) {
      //   return
      // }
      // Storing info in local cache
      try {
        this.loading = true
        const {
          utms,
          whereArrives,
          whereItComesFrom,
          elementWhereRegisters,
          whereRegisters,
        } = getAttributions()
        await this.$apollo.mutate({
          mutation: UPDATE_USER_EMAIL,
          variables: {
            email: this.userEmail,
          },
        })
        const res = await axiosAccountProvisioning.post('/create_account', {
          user: {
            email: this.userEmail,
            firstName: this.user.name,
            lastName: this.user.lastname,
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

        localStorage.setItem(
          'temp_subs_number',
          res.data.subscription.subscriptionNumber
        )

        // used for e2e tests
        if (res.data.ecu) {
          localStorage.setItem('ecu', res.data.ecu)
        }

        await this.$apollo.mutate({
          mutation: gql`
            mutation($number: String!) {
              updateUserNumber(number: $number) @client
            }
          `,
          variables: {
            number: res.data.user.userNumber,
          },
        })

        await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_NUMBER,
          variables: {
            companyNumber: parseInt(res.data.company.companyNumber),
          },
        })

        await this.$apollo.mutate({
          mutation: gql`
            mutation($number: String!) {
              updateSubscriptionNumber(number: $number) @client
            }
          `,
          variables: {
            number: res.data.subscription.subscriptionNumber,
          },
        })
        // userId needed in case verify_account
        await this.$apollo.mutate({
          mutation: gql`
            mutation($userId: String!) {
              updateUserId(userId: $userId) @client
            }
          `,
          variables: {
            userId: res.data.user.userId,
          },
        })

        this.loading = false
        this.$router.push({ name: 'signupPhone' })
        localStorage.setItem('userEmail', this.userEmail)
      } catch (error) {
        this.loading = false
        if (error.message === 'Network Error') {
          this.customError = 'Hubo un error de conexión. Intenta de nuevo.'
          return
        }
        this.customError = this.$utils.parseServerError(error)
      }
    },
  },
}
</script>

<template>
  <div
    class="flex-grow flex flex-col items-center p-4 de:p-0 items-center"
    :class="{
      'justify-between': !(hasFocus && $utils.isIphone),
      'justify-end': hasFocus && $utils.isIphone,
    }"
  >
    <!-- Seems to require a first click to lose focus and a second click to actually work on mobile -->
    <!-- The double click makes this hack useless for a dummy back button -->
    <!-- <div
      v-if="hasFocus && $utils.isIphone"
      class="flex justify-start w-full mb-12"
    >
      <GxIcon
        icon="keyboard_backspace"
        style=" font-size: 24px;color: #fff;"
        html-tag="button"
        @click="goBack"
      />
    </div> -->
    <p
      v-if="user"
      class="text-white text-center gx-h3"
      :class="{
        'pb-0': hasFocus,
        'pb-4': !hasFocus,
        'mb-32': hasFocus && $utils.isIphone,
      }"
      >¡{{ user.name.split(' ')[0] }}!<br />
      ¿Cuál es tu correo electrónico?</p
    >
    <GxForm class="w-full flex" @submit="onSubmit">
      <GxTextFieldDarkEmail
        v-model="userEmail"
        :error="customError"
        class="mr-4"
        label="Correo Electrónico"
        :disabled="loading"
        assistive=" "
        autofocus
        required
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
        class="mr-4"
        pattern="email"
        :autofocus="$utils.isIphone ? false : true"
        :error="customError"
        :loading="loading"
        @valid="invalidEmail = $event"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      ></GxInput> -->
      <div>
        <GxButtonCircle
          icon="arrow_forward"
          label="Guardar"
          dark
          type="submit"
          data-testid="mail"
          :loading="loading"
          :disabled="loading"
        />
      </div>
    </GxForm>
  </div>
</template>

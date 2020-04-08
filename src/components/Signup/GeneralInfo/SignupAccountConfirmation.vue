<script>
import gql from 'graphql-tag'
import get from 'lodash/get'
import { restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import { axiosAccountProvisioning } from '@/src/axiosConfig.js'

const _ = {
  get,
}

export default {
  name: 'SignupAccountConfirmation',
  apollo: {
    myAccount: gql`
      {
        myAccount {
          userNumber
          userSecurityStatus
          firstName
          email
        }
      }
    `,
  },
  data() {
    return {
      loading: false,
      serverError: null,
    }
  },
  watch: {
    myAccount(newVal) {
      if (newVal) {
        if (newVal.userSecurityStatus === 'secured') {
          this.$router.push({ name: 'signupYourein' })
          return
        }

        /* eslint-disable */
        console.log('Init subs')
        restartWebsockets(this.$apollo.provider.clients.defaultClient.wsClient)
        /* eslint-enable */
        const subQuery = gql`
          subscription userSecured($userNumber: Int!) {
            userSecured(userNumber: $userNumber) {
              userNumber
              isSecured
            }
          }
        `
        const userNumber = Number(this.myAccount.userNumber)
        const observer = this.$apollo.subscribe({
          query: subQuery,
          variables: {
            userNumber,
          },
        })

        const $router = this.$router
        observer.subscribe({
          next(data) {
            if (data.data.userSecured.isSecured) {
              /* eslint-disable */
              console.log('Subscription confirms authentication')
              /* eslint-enable */
              $router.push({ name: 'signupYourein' })
            }
          },
          error(error) {
            /* eslint-enable */
            console.error('Sub Confirmation error ', { error })
          },
        })
      }
    },
  },
  mounted() {},
  methods: {
    async validateAccountConfirmation() {
      this.$apollo.queries.myAccount.refetch().then((res) => {
        const userSecurityStatus = _.get(
          res,
          'data.myAccount.userSecurityStatus',
          null
        )
        if (userSecurityStatus === 'secured') {
          this.$router.push({ name: 'signupYourein' })
        }
      })
    },
    async resendEmail() {
      // Double check user hasn't already confirmed account
      this.validateAccountConfirmation()
      try {
        this.loading = true
        await axiosAccountProvisioning.post('/resend_confirmation_email', {
          email: this.myAccount.email,
        })
        this.loading = false
      } catch (error) {
        this.loading = false
        this.serverError = this.$utils.parseServerError(error)
      }
    },
  },
}
</script>
<template>
  <GxCardModal
    v-if="serverError"
    :headline="serverError"
    :card-img="$utils.alertImages.Oops"
    alt="Error"
    @close="serverError = null"
  />
  <div
    v-else
    class="flex-grow flex flex-col justify-center de:overflow-hidden de:bg-primary"
  >
    <div
      class="flex-grow flex flex-col de:p-8 p-4 de:mx-auto de:shadow-3 de:flex-grow-0 de:relative de:rounded-lg de:w-108 de:bg-white"
    >
      <MqLayout mq="de">
        <h1 v-if="myAccount" class="gx-h4 font-bold text-center mb-8"
          >{{ myAccount.firstName }}, confirma tu cuenta</h1
        >
      </MqLayout>
      <p v-if="myAccount" class="mb-4"
        >Enviamos un correo a
        <span class="font-bold break-words"> {{ myAccount.email }} </span> para
        que confirmes tu cuenta.</p
      >
      <p class="mb-8">Si no recibiste el correo da clic aquí:</p>
      <GxButton class="self-center" :loading="loading" @click="resendEmail"
        >REENVIAR CORREO</GxButton
      >
      <MqLayout mq="mo">
        <p class="my-4 text-center gx-caption"
          >Si continúas consideramos que aceptas los
          <GxTextLink
            target-blank
            :to="{
              name: 'termsandconditions',
              query: {
                initialTab: 1,
              },
            }"
            >Términos y condiciones</GxTextLink
          >
          de Chain</p
        >
      </MqLayout>
      <!-- <div class="flex-grow flex flex-col justify-end">
        <picture
          class="flex-grow flex flex-col justify-end items-center imageContainer"
        >
          <source
            media="(min-width: 768px)"
            srcset="@src/assets/images/Signup/GeneralInfo/de_001_1_enviado.svg"
          />
          <img
            src="@src/assets/images/Signup/GeneralInfo/de_001_1_enviado.svg"
            alt="Taquito te ha enviado un correo"
            class="image"
          />
        </picture>
      </div> -->
    </div>
    <MqLayout mq="de" class="flex flex-col  mx-auto">
      <p
        class="w-64 mt-2 mx-auto text-white de:gx-caption self-center text-center"
        >Si continúas consideramos que aceptas los
        <GxTextLink target-blank :to="{ name: 'termsandconditions' }"
          >Términos y condiciones</GxTextLink
        >
        de Chain</p
      >
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.image {
  width: 136px;
}

@screen de {
  .imageContainer {
    position: absolute;
    bottom: -190px;
    left: -100px;
  }
  .image {
    width: 200px;
  }
}
</style>

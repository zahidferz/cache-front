<script>
import GxLoader from '@components/_Core/Utils/GxLoader'
// import GxButton from '@src/components/_Core/Buttons/GxButton' // Now global
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import GxIcon from '@components/_Core/Icons/GxIcon'
import gql from 'graphql-tag'
import { SEND_SOS_MAIL } from '@src/apollo//mutations'

export default {
  name: 'SendSos',
  components: {
    GxLoader,
    // GxButton,
    GxCardModal,
    GxIcon,
  },
  apollo: {
    myAccount: gql`
      {
        myAccount {
          userNumber
          email
          companies {
            company {
              companyNumber
              users(where: { jobTitle: "Contador" }) {
                user {
                  userNumber
                  email
                  userCompleteName
                }
              }
            }
          }
        }
      }
    `,
  },
  data() {
    return {
      name: '',
      nameError: null,
      emailError: null,
      email: '',
      timeout: null,
      invalidName: true,
      invalidEmail: true,
      hasError: false,
      customError: '',
      customErrorName: '',
      customErrorEmail: '',
      showSosSuccessAlert: false,
      sosSuccessAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_6_sos.svg'),
      sendSosMailModal: false,
      emailConfirmationAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_7_duda.svg'),
      loading: false,
      loadingSuccess: false,
    }
  },
  computed: {
    sendSosBody() {
      return `Enviaremos la solicitud de ayuda a: `
    },
    sendEmailTo() {
      return `${this.email}`
    },
    loadingGraphQL() {
      if (this.$apollo) {
        return this.$apollo.queries.myAccount.loading
      }
      return false
    },
    title() {
      if (this.$route.query.r === 'contador') {
        return 'Escribe la información de tu equipo'
      }
      return 'Escribe la información de tu contador'
    },
  },
  watch: {
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          this.getMyAccountData(newVal)
        }
      },
      immediate: true,
    },
    name() {
      // Reset error as user types
      this.hasError = false
      this.nameError = ''
      this.customError = ''
    },
    email() {
      // Reset error as user types
      this.hasError = false
      this.emailError = ''
      this.customError = ''
    },
  },
  created() {
    if (this.$route.query.r === 'contador') {
      this.sendSosMailModal = false
    }
  },
  methods: {
    getMyAccountData(data) {
      const accountantList = data.companies[0].company.users
      if (
        accountantList.length === 0 ||
        accountantList[0].user.email === this.myAccount.email
      ) {
        this.sendSosMailModal = false
        return
      }
      const accountantInfo = accountantList[0]
      this.email = accountantInfo.user.email
      this.name = accountantInfo.user.userCompleteName
      this.sendSosMailModal = true
    },
    async onSubmit() {
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: SEND_SOS_MAIL,
          variables: {
            companyNumber: this.myAccount.companies[0].company.companyNumber,
            email: this.email,
          },
        })
        this.loading = false
        this.loadingSuccess = true
        this.showSosSuccessAlert = true
        this.timeout = setTimeout(() => {
          this.closeModalSuccess()
        }, 3000)
      } catch (error) {
        this.loading = false
        this.customError = this.$utils.parseServerError(error)
      }
    },
    closeModalSuccess() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.$router.push({ name: 'dashboard' })
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
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
        <h1 class="de:gx-h4 font-bold">{{ title }}</h1>
      </nav>
    </MqLayout>
    <div
      class="flex p-4 de:mx-auto de:mt-32 de:p-8 de:shadow-3 de:relative de:rounded-lg de:w-108"
    >
      <GxLoader v-if="loadingGraphQL" />
      <GxForm v-else class="flex-grow flex flex-col" @submit="onSubmit">
        <!-- <GxInput
          v-if="myAccount"
          v-model="name"
          label="Nombre"
          placeholder="Nombre"
          class="mb-8 de:m-0"
          pattern="name"
          :error="nameError"
          @valid="invalidName = $event"
        /> -->
        <GxTextFieldName
          v-if="myAccount"
          v-model="name"
          label="Nombre"
          required
          left-icon="face"
          :error="nameError"
          class="mb-2"
        />
        <!-- <GxInput
          v-if="myAccount"
          v-model="email"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          pattern="email"
          :error="emailError"
          @valid="invalidEmail = $event"
        /> -->
        <GxTextFieldEmail
          v-model="email"
          required
          label="Correo Electrónico"
          :error="emailError"
          name="Correo Electrónico"
        />
        <p
          class="mb-4 de:mb-8 de:mt-4 mt-8 de:gx-caption gx-caption text-center"
          >Tu información está protegida.
          <GxTextLink target-blank :to="{ name: 'privacypolicy' }"
            >Conoce cómo.</GxTextLink
          ></p
        >
        <div class="flex-grow flex flex-col justify-end items-center mx-auto">
          <p v-if="customError" class="mb-2 text-alert">{{ customError }}</p>
          <GxButton
            :loading="loading"
            :loading-success="loadingSuccess"
            type="submit"
          >
            Enviar S.O.S
          </GxButton>
        </div>
      </GxForm>
      <GxCardModal
        v-if="showSosSuccessAlert"
        headline="S.O.S enviado"
        text-body="Te notificaremos cuando tu información esté actualizada."
        :card-img="$utils.alertImages.Done"
        alt="Email de ayuda enviado."
        @close="closeModalSuccess"
        @click="closeModalSuccess"
      >
      </GxCardModal>
      <GxCardModal
        v-if="customError && sendSosMailModal"
        key="errorModal"
        :headline="customError"
        :card-img="$utils.alertImages.Dissapointed"
        @close="$router.push({ name: 'dashboard' })"
        @click="$router.push({ name: 'dashboard' })"
      >
      </GxCardModal>
      <GxCardModal
        v-if="sendSosMailModal && !customError"
        key="sendSOSModal"
        headline="Ya tenemos el correo de tu contador"
        :card-img="$utils.alertImages.Question"
        alt="Ya tenemos el correo de tu contador"
      >
        <template v-slot:body class="">
          <p class="mb-8 mt-4 text-black de:text-center"
            >{{ sendSosBody }}
            <span class="font-bold">{{ sendEmailTo }}</span></p
          >
        </template>
        <template v-slot:actions>
          <div class="flex justify-end de:justify-center de:mt-8">
            <GxButton
              :plain="$mq === 'mo'"
              :ghost="$mq === 'de'"
              class="text-alert mr-4 de:border-alert"
              :disabled="loading"
              @click="sendSosMailModal = false"
              >cambiarlo</GxButton
            >
            <GxButton
              :plain="$mq === 'mo'"
              :loading="loading"
              :loading-success="loadingSuccess"
              @click="onSubmit"
              >confirmar</GxButton
            >
          </div>
        </template>
      </GxCardModal>
    </div>
  </div>
</template>

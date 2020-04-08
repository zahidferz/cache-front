<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { SEND_TEAM_MEMBER_INVITATION } from '@src/apollo//mutations'
import gql from 'graphql-tag'

export default {
  name: 'SignupSendAccountantInvitation',
  components: {
    GxCardModal,
  },
  apollo: {
    user: gql`
      {
        user @client {
          number
          name
          lastname
          email
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
    myAccount: gql`
      {
        myAccount {
          userNumber
          firstName
          companies {
            company {
              companyNumber
            }
          }
        }
      }
    `,
  },
  data() {
    return {
      accountantEmail: '',
      showDoItLater: false,
      invalidMail: true,
      customErrorMsg: null,
      customError: null,
      invitationSent: false,
      loading: false,
    }
  },
  watch: {
    accountantEmail(newVal) {
      this.customErrorMsg = ''
    },
  },
  methods: {
    closeModal() {
      if (this.showDoItLater) {
        this.showDoItLater = !this.showDoItLater
      } else {
        this.customError = false
      }
    },
    nextStep() {
      if (this.loading) return
      if (this.accountantEmail.length === 0) {
        // this.customErrorMsg = 'Campo obligatorio'
        return
      }
      // if (!this.invalidMail) {
      this.loading = true
      this.$apollo
        .mutate({
          mutation: SEND_TEAM_MEMBER_INVITATION,
          variables: {
            email: this.accountantEmail,
            companyNumber: this.myAccount.companies[0].company.companyNumber,
            profile: 'accountant',
            jobTitle: 'Contador',
          },
        })
        .then((res) => {
          this.loading = false
          this.invitationSent = true
          const timeout = setTimeout(() => {
            // Do something
            this.$router.push({ name: 'teamInvitations' })
          }, 3000)
          this.$once('hook:destroyed', () => {
            clearTimeout(timeout)
          })
        })
        .catch((err) => {
          this.loading = false
          this.customError = this.$utils.parseServerError(err)
        })
      // }
    },
    doItLater() {
      this.$router.push({ name: 'teamInvitations' })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col p-4 text-white">
    <p class="flex-grow"
      >Sólo escribe su correo electrónico y te notificaremos cuando esté dentro
      de tu equipo.</p
    >
    <GxForm class="flex" @submit="nextStep">
      <GxTextFieldDarkEmail
        v-model="accountantEmail"
        label="Correo Electrónico"
        :error="customErrorMsg"
        :disabled="loading"
        required
        assistive=" "
        autofocus
      />
      <!-- <GxInput
        v-model="accountantEmail"
        pattern="email"
        dark
        placeholder="Correo Electrónico"
        label="Correo Electrónico"
        icon="email"
        :error="customErrorMsg"
        :loading="loading"
        @valid="invalidMail = $event"
      /> -->
      <div class="ml-4">
        <GxButtonCircle
          :loading="loading"
          icon="arrow_forward"
          type="submit"
          dark
          label="sendInvitation"
        />
      </div>
    </GxForm>
    <p class="gx-caption"
      >Aún no tengo contador,
      <button class="font-bold" @click="showDoItLater = !showDoItLater"
        >hacerlo después.</button
      ></p
    >
    <GxCardModal
      v-if="showDoItLater"
      headline="¿Seguro que quieres salir?"
      text-body="Podrás integrar a tu equipo cuando lo necesites, pero ahora es
              el mejor momento."
      :card-img="$utils.alertImages.Cry"
      alt="Animación de usuario llorando"
    >
      <template v-slot:actions>
        <div class="flex self-end">
          <GxButton plain class="text-alert mr-4" @click="doItLater"
            >salir</GxButton
          >
          <GxButton plain @click="closeModal">continuar</GxButton>
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="invitationSent"
      headline="Invitación enviada"
      text-body="Te notificaremos cuando acepte tu invitación y esté dentro."
      :card-img="$utils.alertImages.Success"
      alt="Invitación Enviada"
      @click="$router.push({ name: 'teamInvitations' })"
    />
    <GxCardModal
      v-if="customError"
      headline="Hubo un error"
      :text-body="customError"
      :card-img="$utils.alertImages.Oops"
      :alt="sendAlt"
      @click="closeModal"
    />
  </div>
</template>

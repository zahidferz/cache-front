<script>
import GxTextAreaTags from '@components/_Core/Forms/GxTextAreaTags'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { SEND_TEAM_MEMBER_INVITATION } from '@src/apollo//mutations'

import gql from 'graphql-tag'
import get from 'lodash/get'
const _ = {
  get,
}

export default {
  name: 'SignupSendTeamInvitations',
  components: {
    GxTextAreaTags,
    GxCardModal,
  },
  apollo: {
    user: gql`
      {
        user @client {
          name
          lastname
          email
          number
          jobTitle
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
      invitationSent: false,
      teamEmails: [],
      skipStep: false,
      showDoItLater: false,
      emptyInput: false,
      loading: false,
      placeholder: 'Añade un email',
    }
  },
  computed: {
    multipleInvites() {
      return this.teamEmails.length > 1
    },
  },
  watch: {
    teamEmails(newVal) {
      if (newVal.length && newVal.length > 0) {
        this.placeholder = ''
      } else {
        this.placeholder = 'Añade un email'
      }
    },
  },
  methods: {
    closeModal() {
      this.skipStep = !this.skipStep
    },
    async onSubmit() {
      if (this.teamEmails.length === 0) {
        this.emptyInput = true
        return
      }
      this.loading = true
      for (let mail of this.teamEmails) {
        await this.$apollo
          .mutate({
            mutation: SEND_TEAM_MEMBER_INVITATION,
            variables: {
              email: mail.value,
              companyNumber: this.myAccount.companies[0].company.companyNumber,
            },
          })
          .then((res) => {})
          .catch((err) => {
            // console.log(err);

            this.loading = false
            this.customError = _.get(
              err,
              'response.data.message',
              'Hubo un error'
            )
          })
      }
      this.loading = false

      this.invitationSent = true
      const timeout = setTimeout(() => {
        // Do something
        this.$router.push({ name: 'companyBusiness' })
      }, 3000)
      this.$once('hook:destroyed', () => {
        clearTimeout(timeout)
      })
    },
    doItLater() {
      this.$router.push({ name: 'companyBusiness' })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col text-white p-4">
    <form class="flex-grow flex flex-col">
      <p
        >Escribe el correo de los miembros de tu equipo separado por comas o
        espacio.</p
      >
      <GxTextAreaTags
        v-model="teamEmails"
        dark
        :placeholder="placeholder"
        label="Correos electrónicos"
        class="my-4"
      />
      <div class="flex-grow flex flex-col justify-end">
        <p v-if="emptyInput" class="gx-caption text-white my-2 text-center"
          >Escribe al menos un correo válido.</p
        >
        <GxButton class="mx-auto" dark :loading="loading" @click="onSubmit"
          >enviar invitaciones</GxButton
        >
      </div>
    </form>
    <button
      class="font-bold text-center mb-4 gx-caption"
      @click="skipStep = !skipStep"
      >Omitir este paso</button
    >
    <GxCardModal
      v-if="skipStep"
      headline="¿Seguro que quieres salir?"
      text-body="Podrás integrar a tu equipo cuando, lo necesites, pero ahora es
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
      v-if="!multipleInvites && invitationSent"
      headline="Invitación enviada"
      text-body="Te notificaremos cuando acepte tu invitación y esté dentro."
      :card-img="$utils.alertImages.Success"
      alt="Animación de éxito"
      @click="$router.push({ name: 'companyBusiness' })"
    />

    <GxCardModal
      v-if="multipleInvites && invitationSent"
      headline="Invitaciones enviadas"
      text-body="Te notificaremos cuando todo el equipo esté abordo."
      :card-img="$utils.alertImages.Success"
      alt="Animación de éxito"
      @click="$router.push({ name: 'companyBusiness' })"
    />
  </div>
</template>

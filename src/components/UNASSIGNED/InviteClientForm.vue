<script>
import GxInput from '@components/_Core/Forms/GxInput'
import SuccessfulEmailCard from '@components/UNASSIGNED/SuccessfulEmailCard'

import gql from 'graphql-tag'
export default {
  name: 'AddAccountantForm',
  components: {
    GxInput,
    SuccessfulEmailCard,
  },
  apollo: {
    user: gql`
      {
        user @client {
          name
          email
          phone
        }
      }
    `,
  },
  data() {
    return {
      email: '',
      invalidEmail: true,
      componentName: 'doNotInvite',
      showCard: false,
    }
  },
  computed: {
    firstName() {
      return this.user.name.split(' ')[0]
    },
  },
  methods: {
    onSubmit() {
      if (this.invalidEmail) {
        return
      }
      this.$router.push({ name: 'Successful Email' })
    },
  },
}
</script>

<template>
  <div
    class="flex-grow flex flex-col items-center justify-between items-center"
  >
    <div>
      <p class="gx-h3 text-white text-center pt-8"
        >{{ firstName }}, invita a tu cliente a CASHME.</p
      >
      <p class=" text-white pt-8"
        >Sólo escribe su correo electrónico y te notificaremos cuando esté
        dentro de tu equipo.</p
      >
    </div>
    <div class="w-full">
      <form class="w-full flex" @submit.prevent="onSubmit">
        <GxInput
          v-model="email"
          dark
          :valid="invalidEmail"
          label="Correo de tu contador"
          placeholder="Correo Electrónico"
          pattern="email"
          class="mr-2"
          @valid="invalidEmail = $event"
        ></GxInput>
        <div>
          <GxFab
            dark
            no-shadow
            data-testid="mail"
            @click="showModal = !showModal"
          />
        </div>
      </form>
      <SuccessfulEmailCard v-if="showCard" />
    </div>
  </div>
</template>

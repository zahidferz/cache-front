<script>
import GxInput from '@components/_Core/Forms/GxInput'
import DoNotInviteCard from '@components/UNASSIGNED/DoNotInviteCard'

import gql from 'graphql-tag'

export default {
  name: 'AddAccountantForm',
  components: {
    GxInput,
    DoNotInviteCard,
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
      loading: false,
      showModal: false,
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

      this.$router.push({ name: 'home' })
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
        >{{ firstName }} invita a tu contador sin costo.</p
      >
      <p class=" text-white pt-8"
        >Solo escribe su correo electrónico y te notificaremos cuando esté
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
          <GxFab dark no-shadow data-testid="mail" />
        </div>
      </form>
      <p class="gx-caption text-white mb-2 ml-4"
        >Aún no tengo contador.
        <a class="font-bold" @click="showModal = !showModal"
          >Hacerlo después.</a
        >
      </p>
    </div>
    <DoNotInviteCard v-if="showModal" />
  </div>
</template>

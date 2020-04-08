<script>
import GxInput from '@components/_Core/Forms/GxInput'

export default {
  components: {
    GxInput,
  },
  data() {
    return {
      accountant: '',
      accountantEmail: '',
      validEmail: false,
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({ name: 'home' })
    },
    isValid(val) {
      this.validEmail = val
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col px-4">
    <p class="text-center"
      >Escribe su nombre y correo electrónico. Le enviaremos vía correo
      electrónico tu solicitud.</p
    >
    <form
      class="flex-grow flex flex-col justify-around"
      @submit.prevent="onSubmit"
    >
      <GxInput
        v-model="accountant"
        label="Nombre de tu contador"
        input-id="accountant"
        icon="face"
        :valid="accountant.length > 0"
      />
      <GxInput
        v-model="accountantEmail"
        label="Correo de tu contador"
        input-id="accountantEmail"
        icon="email"
        pattern="email"
        @valid="isValid"
      />

      <GxButton class="mx-8" :disabled="!validEmail" type="submit"
        >Enviar Correos</GxButton
      >
    </form>
  </div>
</template>

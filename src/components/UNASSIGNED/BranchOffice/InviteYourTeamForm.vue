<script>
import GxTextAreaTags from '@components/_Core/Forms/GxTextAreaTags.vue'

export default {
  components: {
    GxTextAreaTags,
  },
  data() {
    return {
      tags: [],
    }
  },
  methods: {
    sendData() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col items-center justify-between ">
    <p class="pt-8 text-white"
      >Escribe el correo de los miembros de tu equipo separado por comas o
      espacio.</p
    >
    <GxTextAreaTags
      class="mb-8"
      placeholder="Separa los correos por comas..."
      label="Correos electrónicos"
      dark
      value=""
    />
    <div>
      <GxButton dark @click="sendData">Enviar Invitaciones</GxButton>
      <p class="text-white text-center">omitir este paso</p>
    </div>
  </div>
</template>

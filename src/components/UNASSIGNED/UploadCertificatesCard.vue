<script>
import GxCard from '@components/_Core/Cards/GxCard'
import GxModal from '@components/_Core/Modals/GxModal'

export default {
  name: 'ExitRegisterCard',
  components: {
    GxCard,
    GxModal,
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/uploadCertificates.svg'),
    }
  },
  mounted() {
    const timeout = setTimeout(() => {
      this.nextPage()
    }, 3000)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timeout)
    })
  },
  methods: {
    nextPage() {
      this.$router.push({ name: 'home' })
    },
    exit() {
      this.$router.push({ name: 'home' })
    },
    next() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<template>
  <GxModal>
    <GxCard
      class="text-center shadow-7"
      text-body-bold="¿No tienes tus certificados a la mano?"
      text-body="Podrás terminar este proceso cuando tengas tu Información disponible. También puedes:"
      link-to="aquí."
      :buttons="[
        { text: 'regresar', clickHandler: exit },
        { text: 'continuar', clickHandler: next },
      ]"
      :checkboxes="[
        {
          label: 'Recibir un mail y responder con tus archivos.',
          id: 'recieve-email',
        },
        { label: 'Pedir ayuda a tu contador.', id: 'Ask-help' },
        { label: 'Salir e intentarlo más tarde.', id: 'exit-try' },
      ]"
      :card-img="image"
      @click="nextPage"
    ></GxCard>
  </GxModal>
</template>

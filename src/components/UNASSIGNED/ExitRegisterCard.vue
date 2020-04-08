<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'

export default {
  name: 'ExitRegisterCard',
  components: {
    GxCardModal,
    GxModal,
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/exitRegister.svg'),
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
    <GxCardModal
      class="text-center shadow-7"
      headline="¿Seguro que quieres salir?"
      text-body="Podrás conectar con tus bancos cuando quieras, pero para iniciar tu operación es ideal que lo hagas ahora. Puedes conocer cómo cuidamos tu información"
      link-to="aquí."
      :buttons="[
        { text: 'Salir', clickHandler: exit },
        { text: 'continuar', clickHandler: next },
      ]"
      :card-img="image"
      @click="nextPage"
    ></GxCardModal>
  </GxModal>
</template>

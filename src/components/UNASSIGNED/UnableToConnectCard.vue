<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'

export default {
  name: 'UnableToConnect',
  components: {
    GxCardModal,
    GxModal,
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/unableToConnect.svg'),
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
      headline="No pudimos conectarnos"
      text-body="Solicitud rechazada con tu banco, inténtalo nuevamente."
      :buttons="[
        { text: 'Salir', clickHandler: exit },
        { text: 'continuar', clickHandler: next },
      ]"
      :card-img="image"
      @click="nextPage"
    ></GxCardModal>
  </GxModal>
</template>

<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'

export default {
  name: 'PerfectBill',
  components: {
    GxCardModal,
    GxModal,
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/perfectBill.svg'),
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
      headline="¡Quedó perfecta!"
      text-body="¿Quieres ver cómo se ve? Envíate una prueba."
      :buttons="[
        { text: 'Ahora no', clickHandler: exit },
        { text: 'continuar', clickHandler: next },
      ]"
      :card-img="image"
      @click="nextPage"
    ></GxCardModal>
  </GxModal>
</template>

<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'
export default {
  name: 'ConnectingBankCard',
  components: {
    GxCardModal,
    GxModal,
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/connectingBank.svg'),
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
  },
}
</script>

<template>
  <GxModal>
    <GxCardModal
      class="text-center shadow-7"
      headline="¡Estamos conectando con tu banco!"
      text-body="Estamos conectando con tu banco, esto puede tardar unos minutos. Mientras terminamos, ponle estilo a tus facturas."
      :card-img="image"
      @click="nextPage"
    ></GxCardModal>
  </GxModal>
</template>

<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxModal from '@components/_Core/Modals/GxModal'
export default {
  name: 'SuccessfulEmailCard',
  components: {
    GxCardModal,
    GxModal,
  },
  data() {
    return {
      image: require('@src/assets/images/UNASSIGNED/successfulEmail.svg'),
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
      headline="Invitación enviada"
      text-body="Te notificaremos cuando acepte tu invitación y esté dentro."
      :card-img="image"
      @click="nextPage"
    ></GxCardModal>
  </GxModal>
</template>

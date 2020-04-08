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
      image: require('@src/assets/images/UNASSIGNED/sentSos.svg'),
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
      headline="S.O.S enviado"
      text-body="Te notificaremos cuando tu contador suba tu información."
      :card-img="image"
      @click="nextPage"
    ></GxCardModal>
  </GxModal>
</template>

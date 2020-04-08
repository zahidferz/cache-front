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
      headline="¿Seguro que quieres hacerlo después?"
      text-body="Podrás integrar a tu equipo cuando lo necesites, pero ahora es el mejor momento."
      :buttons="[
        { text: 'Salir', clickHandler: exit },
        { text: 'continuar', clickHandler: next },
      ]"
      :card-img="image"
    ></GxCardModal>
  </GxModal>
</template>

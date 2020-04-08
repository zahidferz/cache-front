<script>
import Layout from '@layouts/LayoutWeb'
import LinkBank from '@components/Signup/InitialTodos/LinkBank'
import GxModal from '@components/_Core/Modals/GxModal'
import GxCardModal from '@components/_Core/Cards/GxCardModal'

export default {
  page: {
    title: 'Banco - Conéctate',
    meta: [{ name: 'description', content: 'Banco - Conéctate' }],
  },
  components: {
    Layout,
    LinkBank,
    GxModal,
    GxCardModal,
  },
  data() {
    return {
      image: require('@src/assets/images/Signup/GeneralInfo/completedForm.svg'),
      showModal: false,
      buttons: [
        { text: 'Salir', clickHandler: this.goBack },
        { text: 'Continuar', clickHandler: this.continue },
      ],
    }
  },
  methods: {
    iconClickHandler() {
      this.showModal = true
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    continue() {
      this.$router.push({ name: 'choosebank' })
    },
  },
}
</script>

<template>
  <Layout
    icon="keyboard_backspace"
    :icon-click-handler="iconClickHandler"
    title="Conecta tu banco"
  >
    <LinkBank />
    <GxModal v-if="showModal">
      <GxCardModal
        class="text-center"
        headline="¿Seguro que quieres salir?"
        text-body="Podrás continuar cuando quieras, sin embargo lo mejor es que desde ahora te conectes."
        :card-img="image"
        alt="You're in baby"
        :buttons="buttons"
      >
      </GxCardModal>
    </GxModal>
  </Layout>
</template>

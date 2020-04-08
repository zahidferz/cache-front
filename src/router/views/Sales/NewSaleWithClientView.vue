<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewSalewithClient from '@components/Sales/NewSaleWithClient'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'

export default {
  page: {
    title: 'Venta - nueva',
    meta: [{ name: 'description', content: 'Venta - nueva' }],
  },
  name: 'NewSaleWithClientView',
  components: {
    LayoutWebMobile,
    NewSalewithClient,
    GxCardModal,
    GxDesktopHeader,
  },
  data() {
    return {
      timeout: null,
      showDoItLater: false,
      alertImg: require('@assets/images/Sales/de_007_2_borrador.svg'),
      savedDraftModal: false,
      draftSuccessImage: require('@assets/images/Signup/Alerts/mo_stepone.svg'),
      scrolled: false,
    }
  },
  created() {
    /* Warn user about data loss when trying to reload page */
    const warnBeforeLeavingPage = (e) => {
      e.preventDefault()
      // Algunos browsers no respetan el texto y utilizan un texto de advertencia estándar
      e.returnValue = 'Seguro que deseas salir? Se perderán tus cambios.'
    }
    window.addEventListener('beforeunload', warnBeforeLeavingPage)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', warnBeforeLeavingPage)
    })
  },
  methods: {
    goBack() {
      // this.showDoItLater = true
      this.$router.back()
    },
    onModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.showDoItLater = false
    },
    nextForm() {
      this.$router.push({ name: 'newsaleconcept' })
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    icon="keyboard_backspace"
    title="Nueva venta"
    :with-padding-bottom="false"
    :icon-click-handler="goBack"
    @scrolled="scrolled = $event"
  >
    <GxDesktopHeader
      v-if="$mq === 'de'"
      header="Nueva venta"
      icon="keyboard_backspace"
      :icon-click-handler="goBack"
    />
    <NewSalewithClient />
    <GxCardModal
      v-if="savedDraftModal"
      headline="Borrador guardado"
      :card-img="draftSuccessImage"
      alt="Borrador Guardado"
      @click.stop="onModalClose"
      @close="onModalClose"
    >
    </GxCardModal>
  </LayoutWebMobile>
</template>

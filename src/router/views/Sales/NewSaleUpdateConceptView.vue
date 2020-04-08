<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewFrequentConcept from '@components/Sales/NewFrequentConcept'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
export default {
  page: {
    title: 'Actualizar concepto',
    meta: [{ name: 'description', content: 'Actualizar  concepto' }],
  },
  components: { LayoutWebMobile, NewFrequentConcept, GxDesktopHeader },
  methods: {
    toConceptDetail() {
      this.$router.replace({
        name: 'conceptdetail',
        params: { id: this.$route.params.id },
        query: { ...this.$route.query },
      })
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    :has-drawer="$mq === 'de'"
    icon="keyboard_backspace"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    :icon-click-handler="toConceptDetail"
    title="Editar concepto"
    :with-padding-bottom="false"
  >
    <GxDesktopHeader
      v-if="$mq === 'de'"
      icon="keyboard_backspace"
      header="Editar concepto"
      :icon-click-handler="toConceptDetail"
    >
    </GxDesktopHeader>
    <NewFrequentConcept :update-concept="true" />
  </LayoutWebMobile>
</template>

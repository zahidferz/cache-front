<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import ConceptDetail from '@components/Sales/ConceptDetail'
export default {
  page: {
    title: 'Venta - Detalle de concepto',
    meta: [{ name: 'description', content: 'Venta - Detalle de concepto' }],
  },
  components: { LayoutWebMobile, ConceptDetail },
  methods: {
    tochoosefrequentconcept() {
      this.$router.replace({
        name: 'choosefrequentconcept',
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
    title="Detalles del concepto"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    has-sticky-element
    no-horizontal-padding
    with-padding-bottom
    :icon-click-handler="tochoosefrequentconcept"
  >
    <ConceptDetail />
  </LayoutWebMobile>
</template>

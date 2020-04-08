<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewSaleSelectSatKey from '@components/Sales/NewSaleSelectSatKey'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
export default {
  page: {
    title: 'Venta - Clave SAT',
    meta: [{ name: 'description', content: 'Venta - Clave SAT' }],
  },
  components: {
    LayoutWebMobile,
    GxDesktopHeader,
    GxDesktopSearchInput,
    NewSaleSelectSatKey,
  },
  data() {
    return {
      textInput: this.$route.query.searchTerm || '',
      paddingBottom: false,
    }
  },
  mounted() {
    this.scrollElement =
      document.getElementById('mobileMainContent') ||
      document.getElementById('gxDeMainNotStickyElement')
  },
  methods: {
    toSaleConcept() {
      this.$router.gxAnim = 'slide-right'
      if (!this.$route.query.from) {
        this.$router.replace({
          name: 'saleconcept',
        })
        return
      }
      if (this.$route.query.from === 'updateconcept') {
        this.$router.replace({
          name: 'updateconcept',
          params: {
            id: this.$route.query.documentItemId,
          },
          query: { localId: this.$route.query.localId },
        })
        return
      }
      this.$router.replace({
        name: this.$route.query.from,
        query: { localId: this.$route.query.localId },
      })
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    ref="LayoutWebMobile"
    has-search
    icon="keyboard_backspace"
    title="Selecciona la clave del SAT"
    icon-class-without-scroll="text-black"
    has-sticky-element
    no-horizontal-padding
    :with-padding-bottom="paddingBottom"
    :icon-click-handler="toSaleConcept"
    @search="textInput = $event"
  >
    <GxDesktopHeader
      v-if="$mq == 'de'"
      icon="keyboard_backspace"
      class="mx-8"
      header="Selecciona la clave del SAT"
      :icon-click-handler="toSaleConcept"
    >
    </GxDesktopHeader>
    <GxDesktopSearchInput
      v-if="$mq == 'de'"
      v-model="textInput"
      class="ml-auto mr-8"
      label="Buscar clave sat"
    />
    <NewSaleSelectSatKey class="mt-2" :search-term="textInput" />
  </LayoutWebMobile>
</template>

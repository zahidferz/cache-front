<script>
import NewSaleSelectUnit from '@components/Sales/NewSaleSelectUnit'
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
export default {
  page: {
    title: 'Venta - Unida de medida',
    meta: [{ name: 'description', content: 'Venta - Unida de medida' }],
  },
  components: {
    LayoutWebMobile,
    NewSaleSelectUnit,
    GxDesktopHeader,
    GxDesktopSearchInput,
  },
  data() {
    return {
      textInput: this.$route.query.searchTerm || '',
      paddingBottom: false,
    }
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
      header="Selecciona una unidad"
      :icon-click-handler="toSaleConcept"
    >
    </GxDesktopHeader>
    <GxDesktopSearchInput
      v-if="$mq == 'de'"
      v-model="textInput"
      class="ml-auto mr-8"
      label="Buscar unidad"
    />
    <NewSaleSelectUnit class="de:mt-2 px-4" :search-term="textInput" />
  </LayoutWebMobile>
</template>

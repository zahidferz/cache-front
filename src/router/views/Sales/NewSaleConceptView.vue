<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewSaleConcept from '@components/Sales/NewSaleConcept'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  page: {
    title: 'Venta - Concepto',
    meta: [{ name: 'description', content: 'Venta - Concepto' }],
  },
  name: 'NewSaleConceptView',
  components: { LayoutWebMobile, NewSaleConcept, GxIcon },
  methods: {
    previous() {
      this.$router.back()

      // Commenting out the following code since you should never arrive at the sale concept stage of a sale without a client

      // const saleInfoObject = JSON.parse(
      //   localStorage.getItem('newSale--saleInfoObject')
      // )

      // if (saleInfoObject && saleInfoObject.clientId) {
      //   const clientId = saleInfoObject.clientId
      //   this.$router.push({ name: 'newsalewithclient', params: { clientId } })
      // } else {
      //   this.$router.push({ name: 'newsalechooseclient' })
      // }
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    icon="keyboard_backspace"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    :icon-click-handler="previous"
    title="Concepto de venta"
    :with-padding-bottom="false"
    @scrolled="scrolled = $event"
  >
    <header v-if="$mq === 'de'" class="items-center mb-4 de:gx-h4 flex">
      <GxIcon
        icon="keyboard_backspace"
        class="mr-4 cursor-pointer"
        @click="previous"
      />
      <p class="font-bold">Concepto de venta</p>
    </header>
    <NewSaleConcept ref="newSaleConcept" />
  </LayoutWebMobile>
</template>

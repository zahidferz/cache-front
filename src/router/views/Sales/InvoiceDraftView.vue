<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import InvoiceDraft from '@components/Sales/InvoiceDraft'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'

export default {
  page: {
    title: 'Venta - Borrador de factura',
    meta: [{ name: 'description', content: 'Venta - Borrador de factura' }],
  },
  components: {
    LayoutWebMobile,
    InvoiceDraft,
    GxDesktopHeader,
  },
  methods: {
    goBack() {
      // Avoid reset payments array on AdittionalInfo.vue
      localStorage.setItem('newSale--skipPayment', 'true')
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    icon="keyboard_backspace"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    placeholder="Buscar cliente"
    :icon-click-handler="goBack"
    :with-padding-bottom="false"
    title="Borrador de factura"
    @search="textInput = $event"
  >
    <GxDesktopHeader v-if="$mq === 'de'" header="Borrador de factura" back />
    <InvoiceDraft />
  </LayoutWebMobile>
</template>

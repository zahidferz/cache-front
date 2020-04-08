<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import SendInvoice from '@components/Sales/SendInvoice'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
export default {
  page: {
    title: 'Venta - borrador',
    meta: [{ name: 'description', content: 'Venta - borrador' }],
  },
  components: {
    LayoutWebMobile,
    SendInvoice,
    GxDesktopHeader,
  },
  methods: {
    goToSales() {
      this.$router.push({ name: 'newsalechooseclient' })
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
    :icon-click-handler="goToSales"
    :with-padding-bottom="false"
    title="Enviar factura"
  >
    <GxDesktopHeader
      v-if="$mq === 'de'"
      header="Enviar factura"
      icon="keyboard_backspace"
      :icon-click-handler="goToSales"
    />
    <SendInvoice />
  </LayoutWebMobile>
</template>

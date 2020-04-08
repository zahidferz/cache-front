<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import InvoicePreview from '@components/Signup/InitialTodos/InvoicePreview'
export default {
  page: {
    title: 'Venta - Borrador de factura',
    meta: [{ name: 'description', content: 'Venta - Borrador de factura' }],
  },
  components: { LayoutWebMobile, InvoicePreview },
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    title="Así se verá tu logo en la factura"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <InvoicePreview />
  </LayoutWebMobile>
</template>

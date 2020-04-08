<script>
export default {
  name: 'SalesView',
  data() {
    return {
      cachedComponents: ['MySalesView', 'SalesDashboardView'],
    }
  },
  created() {
    // Disable unload check for cypresst
    if (typeof Cypress === 'undefined') {
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
    }
  },
}
</script>

<template>
  <keep-alive :include="cachedComponents">
    <RouterView></RouterView>
  </keep-alive>
</template>

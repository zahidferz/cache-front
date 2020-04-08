<script>
import SaleDetail from '@components/Sales/SaleDetail'

export default {
  name: 'SaleDetailView',
  components: {
    SaleDetail,
  },
  data() {
    return {
      saleId: this.$route.params.saleId,
    }
  },
}
</script>

<template>
  <SaleDetail :sale-id="saleId" />
</template>

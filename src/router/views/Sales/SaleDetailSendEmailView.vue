<script>
import SaleDetailSendEmail from '@components/Sales/SaleDetailSendEmail'

export default {
  name: 'SaleDetailSendEmailView',
  components: {
    SaleDetailSendEmail,
  },
  data() {
    return {
      saleId: this.$route.params.saleId,
    }
  },
}
</script>

<template>
  <SaleDetailSendEmail :sale-id="saleId" />
</template>

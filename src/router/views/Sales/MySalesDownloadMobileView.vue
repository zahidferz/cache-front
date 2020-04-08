<script>
import MySalesDownloadMobile from '@components/Sales/MySalesDownloadMobile'

export default {
  name: 'MySalesDownloadMobileView',
  components: {
    MySalesDownloadMobile,
  },
  data() {
    return {
      saleId: this.$route.params.saleId,
    }
  },
}
</script>

<template>
  <MySalesDownloadMobile :sale-id="saleId" />
</template>

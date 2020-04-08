<script>
import { readCookie } from '@src/utms'
export default {
  created() {
    this.setUtms()
    this.setWhereRegisterCookie()
  },
  methods: {
    setWhereRegisterCookie() {
      if (this.$route.query['url_dondeseregistra']) {
        document.cookie =
          'url_dondeseregistra' +
          '=' +
          this.$route.query['url_dondeseregistra'] +
          '; path=/' +
          '; samesite=Unset'
      }
      if (this.$route.query['url_elementoenelqueseregistra']) {
        document.cookie =
          'url_elementoenelqueseregistra' +
          '=' +
          this.$route.query['url_elementoenelqueseregistra'] +
          '; path=/' +
          '; samesite=Unset'
      }
    },
    setUtms() {
      const landingSource = readCookie('landing_source')
      if (landingSource) {
        return
      }
      const utms = {
        utm_source: this.$route.query['utm_source'] || null,
        utm_medium: this.$route.query['utm_medium'] || null,
        utm_campaign: this.$route.query['utm_campaign'] || null,
        utm_content: this.$route.query['utm_content'] || null,
        utm_term: this.$route.query['utm_term'] || null,
        utm_matchtype: this.$route.query['utm_matchtype'] || null,
        noUTMS() {
          return (
            !this.utm_source &&
            !this.utm_medium &&
            !this.utm_campaign &&
            !this.utm_content &&
            !this.utm_term &&
            !this.utm_matchtype
          )
        },
        toString() {
          return `utmSource=${this.utm_source}&utmMedium=${
            this.utm_medium
          }&utmContent=${this.utm_content}&utmTerm=${
            this.utm_term
          }&utmMatchtype=${this.utm_matchtype}`
        },
      }
      if (utms.noUTMS()) return
      const experationDate = new Date()
      experationDate.setHours(experationDate.getHours() + 10 * 365 * 24)
      const cookieName = this.$route.query.innerLink
        ? 'inner_landing'
        : 'landing_source'

      document.cookie =
        cookieName +
        '=' +
        utms.toString() +
        '; expires=' +
        experationDate.toUTCString() +
        '; path=/' +
        '; samesite=Unset'
    },
  },
}
</script>
<template>
  <RouterView></RouterView>
</template>

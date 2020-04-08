<script>
// En dev, se puede usar usuario: test y password: test
export default {
  name: 'PaybookWidget',
  props: {
    paybookId: {
      type: String,
      required: true,
    },
    paybookName: {
      type: String,
      required: true,
    },
  },
  methods: {
    loadPaybookWidget() {
      const vueInstance = this
      /* eslint-disable */
      !(function(w, d, s, id, r) {
        var js,
          fjs = d.getElementsByTagName(s)[0],
          p = /^http:/.test(d.location) ? 'http' : 'https'
        if (!d.getElementById(id)) {
          w[r] = {}
          w[r] =
            w[r] ||
            function() {
              w[r].q = w[r].q || [].push(arguments)
            }
          js = d.createElement(s)
          js.id = id
          js.type = 'text/javascript'
          js.src = p + '://www.paybook.com/sync/widget.js'
          fjs.parentNode.insertBefore(js, fjs)
        }
      })(window, document, 'script', 'sync-widget', 'syncWidget')

      var sync_token_session = 'b0afe03c646530846ef2a14ca30345b3'

      var widgetCallback = function(response) {
        console.log('Widget callback')
        console.log('Message: ', response.message)
        console.log('Code: ', response.response)
        if (response.response === 200) {
          vueInstance.$emit('success')
        }
      }

      console.log('Loading paybook widget with id: ', this.paybookId)

      var widget_options = {
        token: sync_token_session,
        baseDiv: 'sync_container',
        theme: 'light',
        avoidAdmin: true,
        callback: widgetCallback,
        // inc: [this.paybookId],
      }

      syncWidget.options = widget_options

      if (typeof syncWidget.setToken === 'function') {
        syncWidget.setToken(sync_token_session)
      }
    },
  },
  mounted() {
    this.loadPaybookWidget()
  },
}
</script>
<template>
  <div id="sync_container" class="w-full px-4"></div>
</template>
<style lang="scss">
// // Override Paybook Widget
// .syncBoxContent h1 {
//   display: none !important;
// }
// .syncBoxContent p {
//   // color: white !important;
// }
// .syncBox {
//   background: none !important;
// }
// .syncBox label {
//   // color: white !important;
// }
// .syncBox input {
//   // color: white !important;
//   background: transparent !important;
//   // border-radius: 0.5rem !important;
//   outline: none !important;
// }
// .syncBox input:-webkit-autofill {
//   top: 1.25rem !important;
//   bottom: 1rem !important;
//   font-size: 1rem !important;
//   // color: white;
//   background-color: transparent !important;
//   border: none !important;
//   border-bottom: 1px solid var(--black) !important;
//   -webkit-box-shadow: 0 0 0 1000px var(--white) inset;
//   -webkit-text-fill-color: var(--black);
// }
// .syncBanks li {
//   width: 40% !important;
// }
// .syncCover {
//   border-radius: 0.5rem;
// }

// .syncBtn {
//   --initial-width: initial !important;

//   width: var(--initial-width) !important;
//   min-width: 9.5rem !important;
//   height: 3.125rem !important;
//   /* stylelint-disable font-family-no-missing-generic-family-keyword */
//   font-family: 'Gothic A1' sans-serif !important;
//   font-size: 1.125rem !important;
//   line-height: 2rem !important;
//   text-transform: uppercase !important;
// }
// // .syncBtn.backBtn {
// // }
// .syncBtn.syncBtnGreen {
//   background-color: var(--primary) !important;
//   border: none;
// }
</style>

<script>
export default {
  name: 'GxPDFViewer',
  props: {
    blob: {
      type: String,
      required: true,
    },
  },
  computed: {
    uint8Array() {
      if (!this.blob) return null
      return this.base64ToUint8Array(this.blob)
    },
  },
  created() {
    localStorage.removeItem('pdfjs.history')
  },
  mounted() {
    this.renderPDF()
  },
  methods: {
    async renderPDF() {
      if (
        document.querySelector('iframe').contentWindow &&
        document.querySelector('iframe').contentWindow.PDFViewerApplication
      ) {
        const alpha = document
          .querySelector('iframe')
          .contentWindow.PDFViewerApplication.open(this.uint8Array)
        window.alpha = alpha
        // // height: 100% does not work on safari
        // document.querySelector('iframe').style.height = `${
        //   this.$refs.iframeWrapper.clientHeight
        // }px`
        this.adjustViewerHeight()
      } else {
        setTimeout(() => {
          this.renderPDF()
        }, 100)
      }
    },
    adjustViewerHeight() {
      if (
        document
          .querySelector('iframe')
          .contentDocument.querySelector('#viewer').clientHeight > 0
      ) {
        const newHeight = document
          .querySelector('iframe')
          .contentDocument.querySelector('#viewer').clientHeight
        const pageCount = document.querySelector('iframe').contentWindow
          .PDFViewerApplication.pagesCount
        document.querySelector('iframe').style.height = `${newHeight +
          50 * pageCount}px`
      } else {
        setTimeout(() => {
          this.adjustViewerHeight()
        }, 100)
      }
    },
    base64ToUint8Array(base64) {
      var raw = atob(base64) // This is a native function that decodes a base64-encoded string.
      var uint8Array = new Uint8Array(new ArrayBuffer(raw.length))
      for (var i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i)
      }
      return uint8Array
    },
  },
}
</script>
<template>
  <div ref="iframeWrapper" class="flex flex-col flex-grow">
    <iframe src="/pdfviewer/web/viewer.html?file=" frameborder="0"></iframe>
  </div>
</template>
<style lang="scss">
// .gxInvoiceIframe {
//   height: 30vh;
// }
</style>

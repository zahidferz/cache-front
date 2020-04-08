<script>
export default {
  name: 'GxPdfDownloader',
  props: {
    pdfFile: {
      type: String,
      required: true,
    },
    targetBlank: {
      type: Boolean,
      default: false,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
}
</script>
<template>
  <a
    id="btnLink"
    :href="`data:application/pdf;base64,${pdfFile}`"
    :download="fileName"
    class="font-bold de:font-bold gx-caption de:gx-caption cursor-pointer"
    :target="targetBlank ? '_blank' : null"
    v-on="$listeners"
  >
    <slot />
  </a>
</template>
<style lang="scss" scoped>
#btnLink:focus {
  outline: none;
}
</style>

<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import { saveAs } from 'file-saver/FileSaver'
const b64toBlob = require('b64-to-blob')
export default {
  name: 'SaleDownloadFile',
  components: {
    GxIcon,
  },
  apollo: {
    file: {
      query() {
        return this.query
      },
      variables() {
        return this.queryVariables
      },
      update(data) {
        return this.extractData(data)
      },
      skip() {
        return this.skipQuery
      },
    },
  },
  props: {
    query: {
      type: Object,
      required: true,
    },
    queryVariables: {
      type: Object,
      required: true,
    },
    extractData: {
      type: Function,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'picture_as_pdf',
    },
  },
  data() {
    return {
      skipQuery: true,
      file: null,
      tooltip: false,
    }
  },
  watch: {
    file(newFile) {
      this.saveFile(newFile)
    },
  },
  methods: {
    saveFile(file) {
      saveAs(b64toBlob(file), this.fileName)
    },
    downloadFile() {
      if (this.$apollo.queries.file.loading) {
        return
      }
      if (this.file) {
        this.saveFile(this.file)
        return
      }
      this.skipQuery = false
      this.$apollo.queries.file.refetch()
    },
  },
}
</script>
<template>
  <button class="focus:outline-none" @click.stop="downloadFile">
    <div
      v-if="$apollo.queries.file.loading"
      class="loading rounded-full top-0  bottom-0 left-0 right-0 m-auto"
    >
    </div>
    <GxIcon v-else :icon="icon" />
  </button>
</template>
<style lang="scss" scoped>
.tooltip {
  top: 100%;
  transform-origin: top right;
}
.loading {
  width: 10px;
  height: 10px;
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 0ms;
  animation-iteration-count: infinite;
}

@keyframes spin {
  from {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(0deg);
  }
  to {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(360deg);
  }
}
</style>

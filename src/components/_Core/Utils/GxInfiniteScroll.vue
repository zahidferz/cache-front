<script>
export default {
  name: 'GxInfiniteScroll',
  props: {
    loadMore: {
      type: Function,
      required: true,
    },
    component: {
      type: String,
      default: 'div',
    },
    noMoreResults: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      listData: [],
      observer: null,
      loadingTimestamp: null,
    }
  },
  created() {
    // this.loadData()
  },
  mounted() {
    this.observer = new IntersectionObserver(this.observerCallback, {
      threshold: 0.1,
    })
    this.observer.observe(this.$refs.observer)
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    reset() {
      this.listData = []
      this.loadData()
    },
    async loadData() {
      if (this.noMoreResults) return

      const loadingTimestamp = Date.now()
      this.loadingTimestamp = loadingTimestamp

      this.loading = true
      const response = await this.loadMore()

      // Resolve race conditions
      if (this.loadingTimestamp === loadingTimestamp) {
        this.listData = [...this.listData, ...response]
      }

      this.loading = false
    },
    observerCallback(entries) {
      if (this.loading) return
      if (entries[0].intersectionRatio > 0.1) {
        this.loadData()
      }
    },
  },
  // render() {
  //   if (this.loading) {
  //     return this.$scopedSlots.default({
  //       loading: this.loading,
  //       listData: this.listData,
  //     })
  //   }

  //   return this.$scopedSlots.default({
  //     loading: this.loading,
  //     listData: this.listData,
  //   })
  // }
}
</script>
<template>
  <component :is="component">
    <slot :listData="listData" :loading="loading" />
    <div ref="observer"></div>
  </component>
</template>

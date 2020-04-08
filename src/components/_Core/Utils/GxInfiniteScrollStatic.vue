<script>
// Infinite scroller for static lists with large amounts of data preloaded
// used for Catalogue dropdown such as SAT Unit Keys to avoid performance issues
// If you're looking for an infinite scroller for your apollo queries use GxInfiniteScollApollo.vue instead
import debounce from 'lodash/debounce'

export default {
  name: 'GxInfiniteScrollStatic',
  props: {
    component: {
      type: String,
      default: 'div',
    },
    list: {
      type: Array,
      required: true,
    },
    searchTerm: {
      type: String,
      default: '',
    },
    searchKeys: {
      type: Array,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      observer: null,
      page: 0,
      noMoreResults: false,
      listData: [],
      loading: false,
    }
  },
  watch: {
    searchTerm(newVal) {
      this.reset()
    },
    list(newVal) {
      this.reset()
    },
  },
  created() {
    this.reset = debounce(this.immediateReset, 300)
    this.loadMore()
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
    stripAccents(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
    normalize(str) {
      return this.stripAccents(str.toLowerCase())
    },
    search(page, pageSize) {
      var data = []
      for (let i = 0; i < this.list.length - 1; i++) {
        if (this.searchKeys) {
          for (let index = 0; index < this.searchKeys.length; index++) {
            const key = this.searchKeys[index]
            if (
              this.normalize(this.list[i][key]).includes(
                this.normalize(this.searchTerm)
              )
            ) {
              data.push(this.list[i])
              break
            }
          }
        } else {
          // No search required, just push items in order
          data.push(this.list[i])
        }

        if (data.length === page * pageSize) {
          break
        }
      }
      return data
    },
    immediateReset() {
      this.page = 0
      this.noMoreResults = false
      this.listData = []
      this.loadMore()
    },
    async loadMore() {
      if (this.noMoreResults || this.loading) return

      this.loading = true

      this.page++

      const searchResult = this.search(this.page, this.pageSize)

      // const response = await this.$apollo.query({
      //   query: this.query,
      //   update: this.extractDataFn,
      //   variables,
      //   policy: 'no-cache',
      // })

      this.listData = [...searchResult]

      // if there is no more data, stop looking
      if (this.listData.length < this.page * this.pageSize) {
        this.noMoreResults = true
      }

      // if a limit was set by the consumer of this component, stop when reaching it
      if (this.listData.length >= this.limit) {
        this.noMoreResults = true
      }

      this.loading = false

      // Check if observer is still visible after re-render and force loading more items
      // this.$nextTick(() => {
      //   console.log(this.$refs.observer.getBoundingClientRect());
      //   console.log(this.$refs.observer.parentElement.getBoundingClientRect());

      //   if (this.$refs.observer.getBoundingClientRect().y <= this.$refs.observer.parentElement.getBoundingClientRect().height + this.$refs.observer.parentElement.getBoundingClientRect().top) {
      //     console.log('Still visible');
      //     // this.loadMore()
      //   }
      // }, 1000)
    },
    observerCallback(entries) {
      if (this.loading) return
      if (entries[0].intersectionRatio > 0.1) {
        this.loadMore()
      }
    },
  },
}
</script>
<template>
  <component :is="component">
    <slot
      :listData="listData"
      :loading="loading"
      :no-more-results="noMoreResults"
    />
    <div ref="observer"></div>
  </component>
</template>

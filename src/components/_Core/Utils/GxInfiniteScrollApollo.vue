<script>
// Infinite scroller for paginated apollo queries
// Take a look at existing implementations within notifications.vue or MyClients.vue
// We leverage slots and expose three simple props that should cover all needs: dataList, loading and noMoreResults
// all pagination loading is handled by the component, you just need to pass three props to let it know how to handle
// the pagination
export default {
  name: 'GxInfiniteScrollApollo',
  props: {
    component: {
      type: String,
      default: 'div',
    },
    query: {
      type: Object,
      required: true,
    },
    variables: {
      type: Object,
      default() {
        return {}
      },
    },
    extractDataFn: {
      type: Function,
      required: true,
    },
    updateDataFn: {
      type: Function,
      required: true,
    },
    // Set a limit to the amount of data you would like to retrieve
    limit: {
      type: Number,
      default: Infinity,
    },
  },
  apollo: {
    listData: {
      query() {
        return this.query
      },
      variables() {
        return {
          ...this.variables,
          page: 1,
          size: this.pageSize,
        }
      },
      update(data) {
        try {
          this.noMoreResults = this.extractDataFn(data).length < this.pageSize
          return this.extractDataFn(data)
        } catch (error) {
          if (window.bugsnagClient) {
            window.bugsnagClient.notify(
              new Error('Error updating inside GxInfiniteScrollApollo.vue'),
              {
                metaData: {
                  query: this.query,
                  error: this.error,
                },
              }
            )
          }
        }
      },
      error(err) {
        /* eslint-disable */
        console.log(err)
        /* eslint-enable */
        this.error = this.$utils.parseServerError(err)
      },
      fetchPolicy: 'cache-and-network',
    },
  },
  data() {
    return {
      observer: null,
      page: 1,
      pageSize: 50,
      noMoreResults: false,
      listData: [],
      error: null,
    }
  },
  watch: {
    variables() {
      this.listData = []
      this.page = 1
      this.$emit('noResults', false)
    },
    page(nextPage, previousPage) {
      if (nextPage > previousPage) {
        this.fetchMore(nextPage)
      }
    },
    listData(newResult) {
      if (newResult.length === 0 && this.noMoreResults) {
        this.$emit('noResults', true)
      } else {
        this.$emit('noResults', false)
      }
    },
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
    refetchData() {
      this.$apollo.queries.listData.refetch()
    },
    resetError() {
      this.error = null
    },
    fetchMore(nextPage) {
      this.$apollo.queries.listData
        .fetchMore({
          variables: {
            page: nextPage,
            size: this.pageSize,
            ...this.variables,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const result = this.updateDataFn(previousResult, fetchMoreResult)
            // if there is no more data, stop looking
            this.noMoreResults =
              this.extractDataFn(result).length < nextPage * this.pageSize
            // if a limit was set by the consumer of this component, stop when reaching it
            if (this.extractDataFn(result).length >= this.limit) {
              this.noMoreResults = true
            }
            return result
          },
        })
        .catch((error) => {
          this.error = error
        })
    },
    observerCallback(entries) {
      if (this.$apollo.queries.listData.loading || this.noMoreResults) return
      if (entries[0].intersectionRatio > 0.1) {
        this.page += 1
      }
    },
  },
}
</script>
<template>
  <component :is="component">
    <slot
      :listData="listData"
      :loading="$apollo.queries.listData.loading"
      :no-more-results="noMoreResults"
      :error="error"
    />
    <div ref="observer"></div>
  </component>
</template>

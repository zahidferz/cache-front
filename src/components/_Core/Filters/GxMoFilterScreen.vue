<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxMoFilter from '@components/_Core/Filters/GxMoFilter'
export default {
  name: 'GxMoFilterScreen',
  components: {
    GxIcon,
    GxLoader,
    GxMoFilter,
  },
  props: {
    filters: {
      /*  [
            {
              name:branchName
              label:label,
              trackBy:id
              options:[{branchName:matriz,id:10},...]
            },
            {
              name:branchName
              options:[option1,option2,...]
            }
          ]
      */
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'FILTROS',
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      innerValue: this.value,
    }
  },
  computed: {
    selectedFilter() {
      if (this.innerValue.length > 0) {
        return this.innerValue.filter((filter) => {
          if (filter.checked) {
            return filter.checked.length > 0
          } else if (filter.range) {
            return filter.range
          }
          return false
        })
      }
      return []
    },
  },
  watch: {
    selectedFilter(newVal) {
      this.$emit('input', newVal)
    },
  },
  created() {
    this.updateQueryParams({ filter: true })
    // this.queryParamsToInnerValue()
  },
  methods: {
    onFilter() {
      // this.innerValueToQueryParams({ filter: false })
      this.$emit('input', this.selectedFilter)
      this.$emit('close')
    },
    updateQueryParams(newQuery /* {key:value} */) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, newQuery),
      })
    },
    innerValueToQueryParams(param) {
      if (!this.innerValue.length) return

      const queries = {}
      this.selectedFilter.forEach((f) => {
        if (f.checked) {
          queries[f.name] = f.checked.join(',')
        } else if (f.range) {
          queries[f.name] = `${f.range.startDate},${f.range.endDate}`
        } else {
          queries[f.name] = ''
        }
      })
      this.updateQueryParams({ ...queries, ...param })
    },
    queryParamsToInnerValue() {
      const innerValue = []

      this.filters.forEach((f) => {
        let valueToPush
        if (f.typeFilter === 'range' && this.$route.query[f.name]) {
          const [startDate, endDate] = this.$route.query[f.name].split(',')
          valueToPush = {
            name: f.name,
            range: { startDate, endDate },
          }
        } else {
          valueToPush = {
            name: f.name,
            checked: this.$route.query[f.name]
              ? this.$route.query[f.name].split(',')
              : [],
          }
        }
        innerValue.push(valueToPush)
      })
      this.innerValue = innerValue
    },
    onInput(data) {
      if (this.innerValue.length) {
        const indexToUpdate = this.innerValue.findIndex(
          (f) => f.name === data.name
        )
        if (indexToUpdate > -1) {
          this.innerValue = [
            ...this.innerValue.slice(0, indexToUpdate),
            data,
            ...this.innerValue.slice(indexToUpdate + 1),
          ]
        } else {
          this.innerValue = [...this.innerValue, data]
        }
      } else {
        this.innerValue = [data]
      }
    },
    close() {
      this.updateQueryParams({ filter: false })
      this.$emit('close')
    },
  },
}
</script>
<template>
  <Portal to="moFilter">
    <transition name="fade" appear>
      <article
        class=" gxMofilter flex flex-col z-40 fixed top-0 bottom-0 right-0 left-0 m-auto  w-screen bg-white"
      >
        <header class="h-14 p-4 flex justify-start items-bottom leading-none">
          <h1 class="gx-h5 font-bold flex items-center">
            <GxIcon icon="expand_more" class="mr-4" @click="close" />
            <span>{{ title }}</span>
          </h1>
        </header>
        <main class="flex flex-grow flex-col mt-4">
          <transition name="fade" mode="out-in">
            <div
              v-if="loading"
              class="flex flex-grow flex-col justify-center items-center"
            >
              <GxLoader key="GxLoader" />
            </div>
            <div v-else key="content" class="flex-grow  flex-col flex">
              <form v-if="filters" class="flex flex-col flex-grow">
                <GxMoFilter
                  v-for="filter in filters"
                  :key="filter.name"
                  :value="
                    innerValue.length
                      ? innerValue.find((f) => f.name === filter.name)
                      : null
                  "
                  :options="filter.options"
                  :label="filter.label"
                  :track-by="filter.trackBy"
                  :legend="filter.name"
                  :type-filter="filter.typeFilter ? filter.typeFilter : null"
                  @input="onInput"
                />
                <div class="flex w-full">
                  <GxButton
                    plain
                    class="flex ml-auto mb-8 mr-4"
                    @click.prevent.stop="onFilter"
                    >filtrar</GxButton
                  >
                </div>
              </form>
            </div>
          </transition>
        </main>
      </article>
    </transition>
  </Portal>
</template>
<style lang="scss" scoped>
.gxMofilter {
  min-height: 100%;
  overflow-y: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}
</style>

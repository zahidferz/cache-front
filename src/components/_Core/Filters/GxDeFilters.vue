<script>
import GxDeFilter from '@components/_Core/Filters/GxDeFilter'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxDeFilters',
  components: {
    GxDeFilter,
    GxIcon,
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
    value: {
      type: Array,
      default: () => [],
    },
    groupByFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: [],
      activeFilter: null,
    }
  },
  computed: {
    notEmptyFilters() {
      return this.innerValue.filter(
        (f) => (f.checked && f.checked.length > 0) || f.range
      )
    },
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal) {
        this.innerValue = newVal
      } else {
        this.innerValue = []
      }
    },
    notEmptyFilters(newVal, oldVal) {
      if (newVal && JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        this.innerValueToLocalStarorage()
        this.$emit('input', newVal)
      }
    },
    activeFilter(newVal) {
      if (!newVal) {
        this.$emit('filtersOpen', false)
      } else {
        this.$emit('filtersOpen', true)
      }
    },
  },
  created() {
    this.localStorageToInnerValue()
  },
  methods: {
    updateQueryParams(newQuery /* {key:value} */) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, newQuery),
      })
    },
    innerValueToLocalStarorage() {
      localStorage.setItem('gx-mysales-filter', JSON.stringify(this.innerValue))
    },
    localStorageToInnerValue() {
      this.innerValue =
        JSON.parse(localStorage.getItem('gx-mysales-filter')) || []
      localStorage.removeItem('gx-mysales-filter')
    },
    onInput(data) {
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
    },
    cleanFilters() {
      localStorage.removeItem('gx-mysales-filter')
      this.innerValue = []
    },
    onCloseFilter(filter) {
      if (this.activeFilter === filter) {
        this.activeFilter = null
      }
    },
  },
}
</script>
<template>
  <div class="h-full  flex justify-end items-center">
    <GxDeFilter
      v-for="(filter, index) in filters"
      :key="filter.name"
      :type-filter="filter.typeFilter ? filter.typeFilter : 'popover'"
      :options="filter.options"
      :label="filter.label"
      :track-by="filter.trackBy"
      :legend="filter.name"
      :is-open="filter.name === activeFilter"
      :class="{ 'ml-4': index > 0 }"
      :group-by-filter="filters.length > 1"
      :value="
        innerValue.length
          ? innerValue.find((f) => f.name === filter.name)
          : null
      "
      @input="onInput"
      @open="activeFilter = $event"
      @close="onCloseFilter"
    />
    <button
      v-if="
        groupByFilter &&
          innerValue.some((value) =>
            value.checked ? value.checked.length > 0 : value.range
          )
      "
      class="de:gx-caption p-1 leading-none flex justify-center items-center ml-2 rounded font-bold text-white bg-secondary"
      @click="cleanFilters"
    >
      <GxIcon icon="close" />
    </button>
  </div>
</template>

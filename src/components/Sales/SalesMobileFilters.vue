<script>
import GxMoFilterScreen from '@components/_Core/Filters/GxMoFilterScreen'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'SalesMobileFilters',
  components: {
    GxMoFilterScreen,
    GxIcon,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mobileFilters: false,
      innerSelectedFilters: this.value,
    }
  },
  computed: {
    notEmptyFilters() {
      if (this.innerSelectedFilters.length > 0) {
        return this.innerSelectedFilters.filter(
          (f) => (f.checked && f.checked.length > 0) || f.range
        )
      }
      return []
    },
  },
  watch: {
    value(newVal) {
      this.innerSelectedFilters = newVal
    },
    notEmptyFilters(newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
      this.$emit('input', newVal)
      this.innerValueToLocalStarorage()
    },
  },
  created() {
    this.localStorageToInnerValue()
  },
  methods: {
    innerValueToLocalStarorage() {
      localStorage.setItem(
        'gx-mysales-filter',
        JSON.stringify(this.innerSelectedFilters)
      )
    },
    cleanFilters() {
      localStorage.removeItem('gx-mysales-filter')
      this.innerSelectedFilters = []
    },
    cleanFilter(filterName) {
      const indexToDelete = this.innerSelectedFilters.findIndex(
        (f) => f.name === filterName
      )
      if (indexToDelete > -1) {
        if (this.innerSelectedFilters[indexToDelete].range) {
          this.innerSelectedFilters = [
            ...this.innerSelectedFilters.slice(0, indexToDelete),
            { ...this.innerSelectedFilters[indexToDelete], range: null },
            ...this.innerSelectedFilters.slice(indexToDelete + 1),
          ]
        } else {
          this.innerSelectedFilters = [
            ...this.innerSelectedFilters.slice(0, indexToDelete),
            { ...this.innerSelectedFilters[indexToDelete], checked: [] },
            ...this.innerSelectedFilters.slice(indexToDelete + 1),
          ]
        }
      }
    },
    localStorageToInnerValue() {
      this.innerSelectedFilters =
        JSON.parse(localStorage.getItem('gx-mysales-filter')) || []
      localStorage.removeItem('gx-mysales-filter')
    },
  },
}
</script>
<template>
  <p
    :class="{
      'pr-4 pb-3 justify-end': notEmptyFilters.length > 0,
      'justify-between': notEmptyFilters.length === 0,
    }"
    class="flex flex-grow  gx-section-title text-gray-500 font-bold leading-none uppercase"
  >
    <template v-if="notEmptyFilters.length === 0">
      <span class="font-bold">VENTAS</span>
      <button class="text-black" @click.stop="mobileFilters = true">
        <GxIcon icon="filter_list" />
      </button>
    </template>
    <template v-else>
      <button
        v-for="(filter, index) in notEmptyFilters"
        :key="filter.name"
        style="font-size:0.75rem"
        :class="{ 'ml-4': index > 0 }"
        class="flex items-center px-2 py-1  rounded-full leading-none bg-secondary-300 text-white font-bold whitespace-no-wrap"
      >
        <span v-if="filter.checked" class="font-bold"
          >{{ filter.checked.length }} {{ filter.name }}</span
        >
        <span v-else-if="filter.range" class="font-bold">{{
          `${$utils.dates.formatDateLongYear(
            filter.range.startDate
          )} a ${$utils.dates.formatDateLongYear(filter.range.endDate)}`
        }}</span>
        <GxIcon
          class="ml-2"
          icon="close"
          @click.stop="cleanFilter(filter.name)"
        />
      </button>
      <button
        v-if="innerSelectedFilters.length > 1"
        style="font-size:0.75rem"
        class="flex items-center p-1 rounded leading-none bg-secondary-300 text-white font-bold whitespace-no-wrap mx-2"
        @click.stop="cleanFilters"
      >
        <GxIcon icon="close" />
      </button>
      <button class="text-black ml-2" @click.stop="mobileFilters = true">
        <GxIcon icon="filter_list" />
      </button>
    </template>
    <GxMoFilterScreen
      v-if="mobileFilters"
      v-model="innerSelectedFilters"
      :filters="filters"
      title="Filtrar ventas"
      @close="mobileFilters = false"
    />
  </p>
</template>

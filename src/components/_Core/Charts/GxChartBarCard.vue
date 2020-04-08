<script>
import GxChartBar from './GxChartBar'
import GxTinyMenu from '@components/_Core/Forms/GxTinyMenu'
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxChartBarCard',
  components: {
    GxChartBar,
    GxCardCore,
    GxTinyMenu,
    GxIcon,
  },
  props: {
    dataset: {
      type: Array,
      required: true,
    },
    dropdownOptions: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    selectedBar: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
      innerSelectedBar: this.selectedBar,
    }
  },
  computed: {
    beforeDropdownOption() {
      const innerValueIndex = this.dropdownOptions.findIndex(
        (option) => option.value === this.innerValue
      )
      if (innerValueIndex > 0) {
        return this.dropdownOptions[innerValueIndex - 1]
      }
      return null
    },
    nextDropdownOption() {
      const innerValueIndex = this.dropdownOptions.findIndex(
        (option) => option.value === this.innerValue
      )
      if (innerValueIndex < this.dropdownOptions.length - 1) {
        return this.dropdownOptions[innerValueIndex + 1]
      }
      return null
    },
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    selectedBar(newVal) {
      this.innerSelectedBar = newVal
    },
  },
  methods: {
    selectDropdownOption(dropdownOption) {
      this.innerValue = dropdownOption.value
    },
  },
}
</script>
<template>
  <GxCardCore
    class="flex flex-col relative px-4 pt-4 pb-1 flex-grow"
    :clickable="false"
    @click="$emit('click')"
  >
    <div class="z-1 absolute right-0 mr-4">
      <GxTinyMenu v-model="innerValue" :options="dropdownOptions" />
    </div>
    <div class="flex items-end">
      <GxIcon
        v-if="nextDropdownOption && $mq === 'de'"
        class="mr-4 gxYearNavigation cursor-pointer"
        icon="chevron_left"
        @click.stop="selectDropdownOption(nextDropdownOption)"
      />
      <GxChartBar
        :loading="loading"
        :dataset="dataset"
        :selected-bar="innerSelectedBar"
        class="z-0 overflow-auto pb-3 de:pb-0"
        @selectBar="$emit('selectBar', $event)"
      />
      <GxIcon
        v-if="beforeDropdownOption && $mq === 'de'"
        class="ml-4 gxYearNavigation cursor-pointer"
        icon="chevron_right"
        @click.stop="selectDropdownOption(beforeDropdownOption)"
      />
    </div>
  </GxCardCore>
</template>
<style lang="scss" scoped>
.gxYearNavigation {
  margin-bottom: 0.75rem;
  font-size: 14px;
  font-weight: bold;
}
</style>

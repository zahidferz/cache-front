<script>
import GxLoader from '@components/_Core/Utils/GxLoader'

export default {
  name: 'GxChartBar',
  components: {
    GxLoader,
  },
  props: {
    dataset: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selectedBar: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      height: 140,
      barWidth: 24,
      innerSelectedBar: this.selectedBar,
      zeroHeight: 4, // Bars with zero value still show with a small height
    }
  },
  computed: {
    maxValue() {
      let max = 0
      this.dataset.forEach((d) => {
        if (d.amount > max) {
          max = d.amount
        }
      })
      return max
    },
  },
  watch: {
    selectedBar(newVal) {
      this.innerSelectedBar = this.selectedBar
    },
    innerSelectedBar(newVal, oldVal) {
      if (newVal === oldVal) {
        return
      }
      this.innerSelectedBar = newVal
      this.$emit('selectBar', newVal)
    },
    loading(newVal) {
      if (!newVal) {
        this.$nextTick(() => {
          this.scrollToSelectedBar()
        })
      }
    },
  },
  mounted() {
    this.scrollToSelectedBar()
  },
  methods: {
    scrollToSelectedBar() {
      if (this.$refs.selectedBar) {
        this.$refs.selectedBar[0].scrollIntoView({
          block: 'nearest',
          inline: 'center',
        })
      }
    },
  },
}
</script>
<template>
  <div class="w-full pt-16">
    <div
      ref="chartContainer"
      class="w-full flex justify-between"
      :style="`height: ${height}px`"
    >
      <GxLoader v-if="loading"></GxLoader>
      <div
        v-for="(d, i) in dataset"
        v-else
        :key="i"
        class="flex flex-col justify-end items-center px-2 pb-2 relative"
      >
        <div class="h-full relative flex flex-col justify-end">
          <div
            v-if="innerSelectedBar === i"
            class=" amount absolute shadow-5 rounded-l rounded-tr p-1 whitespace-no-wrap z-1 bg-white gx-section-title"
            :class="{
              'left-0': i < dataset.length / 2,
              'right-0': i >= dataset.length / 2,
            }"
            :style="
              `bottom: calc(${(d.amount / Math.max(maxValue, 1)) *
                100}% + 4px + ${zeroHeight}px);`
            "
          >
            {{ d.formattedAmount }}
          </div>
          <button
            :ref="innerSelectedBar === i ? 'selectedBar' : ''"
            :width="barWidth"
            class="bar rounded rounded-b-none focus:outline-none"
            :disabled="d.disabled && d.amount === 0"
            :class="{
              'bg-sales-3': !d.disabled,
              'cursor-pointer': !d.disabled,
              'bg-gray-400 de:bg-gray-200': d.disabled,
              'cursor-not-allowed': d.disabled && d.amount === 0,
            }"
            :style="
              `
              width: ${barWidth}px;
              height: calc(${(d.amount / Math.max(maxValue, 1)) *
                100}% + ${zeroHeight}px);
            `
            "
            @click.stop="innerSelectedBar = i"
          />
        </div>
        <p
          class="uppercase font-bold cursor-pointer gx-section-title mt-1"
          :class="{
            'text-black': innerSelectedBar === i,
            'text-gray-500': innerSelectedBar !== i,
          }"
          @click.stop="innerSelectedBar = i"
          >{{ d.label }}</p
        >
        <div
          v-if="innerSelectedBar === i"
          :class="{
            'bg-gray-400 de:bg-gray-200': d.disabled,
            'bg-sales-1': !d.disabled,
          }"
          class="w-2 h-2 rounded-full  bottom-0 absolute mt-2"
        ></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.amount {
  transition: bottom 0.5s ease-in-out;
}
.bar {
  transition: height 0.5s ease-in-out;
}
</style>

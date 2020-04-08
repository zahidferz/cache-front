<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import debounce from 'lodash/debounce'

export default {
  name: 'VerticalCounter',
  components: {
    GxIcon,
  },
  props: {
    nums: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      number: 0,
    }
  },
  mounted() {
    const draggable = this.$refs.draggable
    const adjustScrollPosition = debounce((numberIndex) => {
      draggable.scrollTop = numberIndex * 46
    }, 300)
    this.$refs.draggable.addEventListener(
      'scroll',
      () => {
        const numberIndex = Math.round(this.$refs.draggable.scrollTop / 46)
        this.$emit('input', this.nums[numberIndex])
        adjustScrollPosition(numberIndex)
      },
      { passive: true }
    )
    setTimeout(() => {
      draggable.childNodes[7].scrollIntoView()
    }, 600)
  },
}
</script>
<template>
  <div class="container">
    <div class="counter">
      <div class="arrow left">
        <GxIcon icon="arrow_right" />
      </div>
      <div class="arrow right">
        <GxIcon icon="arrow_left" />
      </div>
      <div
        ref="draggable"
        class="scroll-area rounded-full bg-secondary-300 text-white"
      >
        <span
          v-for="(n, index) in nums"
          :key="index"
          class="number gx-h3 text-secondary-200"
          :class="{ 'text-white': $attrs.value === n }"
          >{{ n }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.counter {
  position: relative;
  width: 100%;
  width: 50px;
  // overflow: hidden;
  // overflow: hidden;
}
.scroll-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 240px;
  padding-top: 100px;
  padding-bottom: 100px;
  overflow: auto;
  scroll-behavior: smooth;
}
.scroll-area::-webkit-scrollbar {
  display: none;
}
.number {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 46px;
  line-height: 1;
}

.arrow {
  position: absolute;
  top: calc(50% - 20px);
  display: flex;
  align-items: center;
  height: 46px;
  font-size: 1.5rem;
  color: var(--white);
}
.left {
  left: -12px;
}
.right {
  right: -12px;
}
</style>

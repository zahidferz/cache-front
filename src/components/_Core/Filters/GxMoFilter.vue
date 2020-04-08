<script>
import GxDateTimeFilter from '@components/_Core/Filters/GxDateTimeFilter'
export default {
  name: 'GxMoFilter',
  components: {
    GxDateTimeFilter,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    legend: {
      type: String,
      default: '',
    },
    typeFilter: {
      type: String,
      default: 'checkbox',
    },
    label: {
      type: String,
      default: '',
    },
    trackBy: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      innerValue: [],
      startDateError: '',
      endDateError: '',
      range: null,
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
      if (this.typeFilter === 'range') {
        if (newVal) {
          this.range = newVal.range
        } else {
          this.range = null
        }
      } else {
        if (newVal) {
          this.innerValue = newVal.checked
        } else {
          this.innerValue = []
        }
      }
    },
    innerValue(newVal, oldVal) {
      if (newVal && JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        this.$emit('input', { name: this.legend, checked: newVal })
      }
    },
    range(newVal, oldVal) {
      if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        this.$emit('input', { name: this.legend, range: this.range })
      }
    },
  },
  created() {
    this.innerValue = this.value && this.value.checked ? this.value.checked : []
    this.range = this.value && this.value.range ? this.value.range : null
  },
  mounted() {
    const clickOutside = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.$emit('close')
      }
    }
    document.addEventListener('click', clickOutside)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', clickOutside)
    })
  },
}
</script>
<template>
  <div v-if="typeFilter === 'range'" class="w-full">
    <p
      class="uppercase  flex gx-caption text-gray-500 font-bold  leading-none pl-4  mb-6"
      >{{ legend }}</p
    >
    <GxDateTimeFilter ref="dateTimeFilter" v-model="range" />
  </div>
  <div v-else class="w-full">
    <p
      class="uppercase  flex gx-caption text-gray-500 font-bold  leading-none pl-4  mb-6"
      >{{ legend }}</p
    >
    <fieldset
      class="gxForm  w-full overflow-hidden filter-option text-left whitespace-no-wrap cursor-pointer flex flex-col px-4 focus:outline-none"
    >
      <label
        v-for="(option, index) in options"
        :key="typeof option === 'object' ? option[trackBy] : option"
        :for="
          typeof option === 'object' ? `${option[trackBy]}-${index}` : option
        "
        :class="{
          'mb-6': index < options.length - 1,
          'mb-8': index === options.length - 1,
        }"
        class=" relative  capitalize text-base de:text-xs font-gothic leading-none"
      >
        {{ typeof option === 'object' ? option[label] : option }}
        <input
          :id="
            typeof option === 'object' ? `${option[trackBy]}-${index}` : option
          "
          v-model="innerValue"
          class="absolute gx-checkbox"
          :value="typeof option === 'object' ? option[trackBy] : option"
          type="checkbox"
        />
        <span class="material-icons-round top-0 bottom-0 my-auto"></span>
      </label>
    </fieldset>
  </div>
</template>
<style lang="scss" scoped>
.gxForm {
  -webkit-tap-highlight-color: transparent;
}
.gx-checkbox {
  position: absolute;
  left: -100px;
  width: 0;
  height: 0;
  border: none;
}
.gx-checkbox + span::before {
  position: absolute;
  top: 1px;
  right: 0;
  bottom: 0;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  color: var(--gray-500);
  content: 'check_box_outline_blank';
  border: none;
  opacity: 1;
}
.gx-checkbox + span::after {
  position: absolute;
  top: 1px;
  right: 0;
  bottom: 0;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 1rem;
  color: var(--primary-500);
  content: 'check_box';
  border: none;
  opacity: 0;
  transition: opacity 0.2s ease 0s;
}
input:checked + span::after {
  opacity: 1;
}
</style>

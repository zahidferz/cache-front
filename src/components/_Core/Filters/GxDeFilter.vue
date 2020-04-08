<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxDateTimeFilter from '@components/_Core/Filters/GxDateTimeFilter'
export default {
  name: 'GxDeFilter',
  components: { GxIcon, GxDateTimeFilter },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    legend: {
      type: String,
      required: true,
    },
    typeFilter: {
      type: String,
      default: 'popover',
    },
    label: {
      type: String,
      default: '',
    },
    trackBy: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    groupByFilter: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      innerValue: [],
      showSection: false,
      range: null,
    }
  },
  watch: {
    value(newVal) {
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
      if (newVal.length === 0) {
        this.showSection = false
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
    const clickHandler = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.showSection = false
      }
    }
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', clickHandler)
    })
  },
  methods: {
    afterLeave() {
      if (this.showSection) {
        this.$emit('open', this.legend)
      } else {
        this.$emit('close', this.legend)
      }
    },
    closSection() {
      this.showSection = false
    },
    findSelection(selection) {
      if (this.options.every((option) => typeof option === 'object')) {
        const match = this.options.find(
          (option) => String(option[this.trackBy]) === String(selection)
        )
        return match[this.label]
      }
      return selection
    },
    deleteSelection(selection, evt) {
      // Prevent dropdown from opening when deleting a chip
      evt.stopImmediatePropagation()
      const indexToUpdate = this.innerValue.findIndex((s) => s === selection)
      this.innerValue = [
        ...this.innerValue.slice(0, indexToUpdate),
        ...this.innerValue.slice(indexToUpdate + 1),
      ]
    },
    cleanFilters(evt) {
      evt.stopImmediatePropagation()
      this.showSection = false
      this.innerValue = []
    },
    displayPopover() {
      this.showSection = !this.showSection
    },
  },
}
</script>
<template>
  <GxDateTimeFilter
    v-if="typeFilter === 'range'"
    ref="GxRangeFilter"
    v-model="range"
  />
  <div v-else class="flex justify-start items-center h-full">
    <button
      class="relative  flex items-center  de:gx-caption text-gray-700  focus:outline-none"
      @click="displayPopover"
    >
      <div
        v-if="innerValue.length && !groupByFilter"
        class="flex de:gx-caption leading-none items-center justify-end"
      >
        <p
          v-for="selection in innerValue"
          :key="selection"
          class=" de:gx-caption py-1 text-white rounded-xxl leading-none px-2 bg-secondary flex items-center justify-start"
        >
          <span class=" text-center font-bold">{{
            findSelection(selection)
          }}</span>
          <GxIcon
            class="ml-2"
            icon="close"
            @click="deleteSelection(selection, $event)"
          />
        </p>
      </div>
      <p
        v-if="groupByFilter && innerValue.length"
        class=" de:gx-caption py-1 whitespace-no-wrap rounded-xxl leading-none px-2 bg-secondary flex items-center justify-start"
      >
        <span class="text-white text-center font-bold">{{
          `${innerValue.length} ${legend}`
        }}</span>
        <button
          class="ml-2  text-white font-bold flex-items-center "
          @click="cleanFilters"
        >
          <GxIcon icon="close" />
        </button>
      </p>
      <span
        v-if="groupByFilter && !innerValue.length"
        :class="{
          'text-black': showSection && isOpen,
          'text-gray-700': !showSection && !isOpen,
        }"
        class="leading-none font-bold whitespace-no-wrap "
        >{{ legend }}</span
      >
      <span
        v-if="!groupByFilter && !innerValue.length"
        :class="{
          'font-bold text-black': showSection && isOpen,
          'text-gray-700': !showSection && !isOpen,
        }"
        class="leading-none whitespace-no-wrap"
        >{{ legend }}</span
      >
      <GxIcon
        v-if="innerValue.length === 0"
        :class="{
          'text-black': showSection && isOpen,
          'text-gray-700': !showSection && !isOpen,
        }"
        class="ml-2"
        icon="expand_more"
      />
      <transition
        name="popover"
        @after-leave="afterLeave"
        @before-enter="afterLeave"
      >
        <section
          v-if="showSection"
          class="flex flex-col absolute right-0 shadow-3  bg-white popover z-1 p-2"
          @click.stop
        >
          <label
            v-for="option in options"
            :key="typeof option === 'object' ? option[trackBy] : option"
            :for="typeof option === 'object' ? option[trackBy] : option"
            class="relative overflow-hidden filter-option text-left whitespace-no-wrap cursor-pointer mb-4"
          >
            <span class="pl-5 capitalize">{{
              typeof option === 'object' ? option[label] : option
            }}</span>
            <input
              :id="typeof option === 'object' ? option[trackBy] : option"
              v-model="innerValue"
              class="absolute gx-checkbox"
              :value="typeof option === 'object' ? option[trackBy] : option"
              type="checkbox"
              @click.stop
            />
            <span class="material-icons-round top-0 bottom-0 my-auto"></span>
          </label>
        </section>
      </transition>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.gxCloseButton {
  width: 18px;
  padding-top: 2px;
  border-radius: 4px;
}
.popover {
  top: 1.25rem;
  min-width: 107px;
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
// Vue  animations
.popover-enter-active {
  transition: all 0.3s ease-out;
}
.popover-leave-active {
  transition: all 0.3s ease-in;
}
.popover-enter,
.popover-leave-to {
  opacity: 0;
  transform: translateY(-1rem) scale(0.1);
}
.popover-enter-to {
  transform: scale(1);
}

.filter-option:last-child {
  margin-bottom: 0;
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
  top: 1.5px;
  // bottom: 1px;
  left: 0;
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  line-height: 0.75rem;
  color: var(--gray-500);
  content: 'check_box_outline_blank';
  border: none;
  opacity: 1;
}
.gx-checkbox + span::after {
  position: absolute;
  top: -1.5px;
  left: 0;
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
input:checked + span::before {
  opacity: 0;
}
</style>

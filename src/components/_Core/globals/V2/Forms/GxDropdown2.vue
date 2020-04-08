<script>
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
import debounce from 'lodash/debounce'
export default {
  name: 'GxDropdown2',
  components: {
    GxIcon2,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionValue: {
      type: String,
      default: '',
    },
    optionText: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    maxNumberOptions: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      innerValue: '',
      searchValue: null,
      hover: false,
      selectedIndex: 0,
      debouncedUpdateSearchValue: null,
      filteredOptions: this.options,
      showOptions: false,
      blurredEmptyAndRequired: false,
    }
  },
  watch: {
    value(newVal) {
      this.innerValue = newVal
      const result = this.findSearchValue(newVal)
      this.searchValue = this.optionValue ? result[this.optionText] : result
    },
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    showOptions(newVal) {
      if (newVal) {
        this.blurredEmptyAndRequired = false
        this.searchValue = ''
      }
    },
    async searchValue(newVal) {
      this.filteredOptions = await this.filterOptions(newVal)
      this.selectedIndex = 0
      this.$nextTick(() => {
        this.scrollToOption()
      })
    },
  },
  created() {
    this.debouncedUpdateSearchValue = debounce((value) => {
      this.searchValue = value
    }, 300)
    const onClickOutSide = (evt) => {
      if (this.$el.contains(evt.target)) return
      this.showOptions = false
    }
    document.addEventListener('click', onClickOutSide)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', onClickOutSide)
    })
  },
  methods: {
    isValid() {
      if (this.required && !this.disabled) {
        this.blurredEmptyAndRequired = !this.innerValue
        return !!this.innerValue
      }
      return true
    },
    findSearchValue(newVal) {
      return this.options.find((option) => {
        if (this.optionValue) {
          return (
            this.normalizeString(option[this.optionValue]) ===
            this.normalizeString(newVal)
          )
        }
        return this.normalizeString(option) === this.normalizeString(newVal)
      })
    },
    onInput(evt) {
      this.debouncedUpdateSearchValue(evt.target.value)
    },
    filterOptions(searchValue) {
      return new Promise((resolve, reject) => {
        if (!searchValue) {
          resolve(this.options)
        }
        const result = this.options.filter((option) => {
          const text = this.optionText
            ? this.normalizeString(option[this.optionText])
            : this.normalizeString(option)
          const searchTerm = this.normalizeString(searchValue).toLowerCase()
          return text.toLowerCase().includes(searchTerm)
        })
        resolve(result)
      })
    },
    normalizeString(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
    deactivate() {
      this.showOptions = false
      if (this.innerValue) {
        const result = this.findSearchValue(this.innerValue)
        this.searchValue = this.optionValue ? result[this.optionText] : result
      }
      this.blurredEmptyAndRequired = this.required && !this.innerValue
    },
    scrollToOption() {
      if (this.$refs.optionsContainer.children[this.selectedIndex]) {
        this.$refs.optionsContainer.children[this.selectedIndex].scrollIntoView(
          {
            behavior: 'smooth',
            block: 'nearest',
          }
        )
      }
    },
    selectOption(data) {
      if (typeof data === 'object') {
        this.searchValue = data[this.optionText]
        this.innerValue = data[this.optionValue]
      } else {
        this.searchValue = data
        this.innerValue = data
      }
      this.$refs.input.blur()
    },
    onKeyup() {
      this.$refs.input.blur()
    },
    onArrowUp() {
      if (this.selectedIndex > 0) {
        this.selectedIndex = this.selectedIndex - 1
      } else {
        this.selectedIndex = Math.min(
          this.filteredOptions.length - 1,
          this.maxNumberOptions - 1
        )
      }
      this.$nextTick(() => {
        this.scrollToOption()
      })
    },
    onArrowDown() {
      if (
        this.selectedIndex <=
        Math.min(this.maxNumberOptions - 2, this.filteredOptions.length - 2)
      ) {
        this.selectedIndex = this.selectedIndex + 1
      } else {
        this.selectedIndex = 0
      }
      this.scrollToOption()
    },
  },
}
</script>
<template>
  <div class="relative w-full">
    <label
      :for="_uid"
      :class="{
        'bg-gray-100 text-gray-500 border-gray-100': disabled,
        'bg-gray-100 border-gray-200 text-gray-700':
          !disabled && !showOptions && !searchValue && !blurredEmptyAndRequired,
        'bg-white border-gray-300': !disabled && !showOptions && searchValue,
        'border-gray-300 hover:text-black':
          !disabled && !showOptions && hover && !blurredEmptyAndRequired,
        'bg-gray-100 border-alert': !disabled && blurredEmptyAndRequired,
        'bg-white border-black': !disabled && showOptions,
        'text-alert': !disabled && blurredEmptyAndRequired,
      }"
      class="relative gx-dropdown-container block  border-b  rounded-t-lg cursor-pointer  px-2"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    >
      <input
        :id="_uid"
        ref="input"
        :value="searchValue"
        :disabled="disabled"
        class="gx-dropdown-input absolute  text-xs mb-2 w-full min-w-0 bottom-0   bg-transparent focus:outline-none focus:border-none"
        autocomplete="off"
        type="text"
        :placeholder="label"
        @input="onInput"
        @keydown.prevent.up="onArrowUp"
        @keydown.down="onArrowDown"
        @blur.prevent="deactivate"
        @focus="showOptions = true"
        @keydown.prevent.enter="selectOption(options[selectedIndex])"
        @keyup.esc="onKeyup"
      />
      <span
        :class="{
          'gxSelectedValue text-2xs': searchValue || showOptions,
          'text-xs': !searchValue && !showOptions,
        }"
        class="absolute left-0 ml-2 mb-2 bottom-0  leading-none gxLabel"
        >{{ label }}</span
      >
      <GxIcon2
        class="absolute right-0 bottom-0 text-2xs mb-2 mr-2"
        :icon="showOptions ? 'expand_less' : 'expand_more'"
      />
    </label>
    <p
      v-if="blurredEmptyAndRequired"
      class="text-sm de:text-2xs mt-2 text-alert"
      >Este campo es requerido</p
    >
    <ul
      v-show="showOptions"
      ref="optionsContainer"
      tabIndex="-1"
      class="gxOptions absolute mt-1  overflow-y-auto bg-white z-51 w-full rounded-tl-lg rounded-b-lg shadow-2"
      @mousedown.prevent
    >
      <template v-if="optionText && optionValue">
        <li
          v-for="(option, index) in filteredOptions.slice(0, maxNumberOptions)"
          :key="option[optionValue]"
          class="px-2 py-1  text-2xs cursor-pointer flex items-center"
          :class="{ 'bg-secondary-50': selectedIndex === index }"
          @mouseenter="selectedIndex = index"
          @click="selectOption(option)"
        >
          {{ option[optionText] }}
          <GxIcon2
            v-if="innerValue === option[optionValue]"
            class="ml-auto text-2xs"
            icon="done"
          />
        </li>
      </template>
      <template v-else>
        <li
          v-for="(option, index) in filteredOptions.slice(0, maxNumberOptions)"
          :key="option"
          :class="{ 'bg-secondary-50': selectedIndex === index }"
          class="px-2 py-1 mt-1 text-2xs cursor-pointer flex items-center"
          @mouseenter="selectedIndex = index"
          @mousedown.prevent="selectOption(option)"
        >
          {{ option }}
          <GxIcon2
            v-if="innerValue === option"
            class="ml-auto text-2xs"
            icon="done"
          />
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.gx-dropdown-container {
  height: 41px;
  padding-bottom: 6px;
}
.gxLabel {
  backface-visibility: hidden;
  transition: transform 0.3s;
  transform-origin: bottom;
}
.gx-dropdown-input::placeholder {
  color: transparent;
}
.gxSelectedValue {
  transform: translate3d(0, -20px, 0);
}
.gxOptions {
  scrollbar-width: thin;
  min-height: 54px;
  max-height: 150px;
}
.gxOptions::-webkit-scrollbar {
  width: 4px;
}
</style>

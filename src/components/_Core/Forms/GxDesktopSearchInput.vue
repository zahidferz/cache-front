<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxDesktopSearchInput',
  components: {
    GxIcon,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
      searchFocus: false,
    }
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal, oldVal) {
      if (newVal === oldVal) return
      this.innerValue = newVal
    },
  },
  mounted() {
    if (this.autofocus && this.$refs.input) {
      this.$refs.input.focus()
    }
  },
}
</script>
<template>
  <label
    :for="_uid"
    :class="{
      'border-primary-500': searchFocus,
      'border-gray-700': !searchFocus,
    }"
    class="de:gx-caption border-b pb-1 relative flex items-center text-gray-700  cursor-text  min-w-38  whitespace-no-wrap"
  >
    <GxIcon
      icon="search"
      class="leading-none"
      :class="{
        'text-primary-500': searchFocus,
        'text-gray-700': !searchFocus,
      }"
    />
    <input
      :id="_uid"
      ref="input"
      v-model.trim="innerValue"
      class="gxInput  px-2  focus:outline-none text-black flex-grow"
      :label="label"
      :placeholder="label"
      type="search"
      :autofocus="autofocus"
      @blur="searchFocus = false"
      @focus="searchFocus = true"
    />
    <p
      class="de:gx-caption flex items-center gxLabel absolute mb-1 left-0 top-0 bottom-0 my-auto leading-none  invisible"
    >
      <span>{{ label }}</span>
    </p>
    <button
      v-if="innerValue"
      class="de:gx-caption bg-white text-black ml-auto flex items-center leading-none"
      @click.stop.prevent.exact="innerValue = ''"
    >
      <GxIcon key="close" icon="close" />
    </button>
  </label>
</template>
<style lang="scss" scoped>
.gxLabel {
  padding-right: 18px;
  padding-left: 18px;
}
.gxInput::placeholder {
  color: white;
}
.gxInput:placeholder-shown + p {
  visibility: visible;
}
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
</style>

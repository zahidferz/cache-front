<script>
import GxCheckbox from '@components/_Core/Forms/GxCheckbox.vue'
export default {
  name: 'GxCheckboxGroup',
  components: {
    GxCheckbox,
  },
  props: {
    value: {
      type: [Array, String],
      default: () => [],
    },
    inputs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selections: [],
    }
  },
  computed: {
    labelPosition() {
      if (this.inputs.length > 0) {
        return 'inline-right'
      }
      return 'bottom'
    },
    computedSpacing() {
      if (this.labelPosition === 'bottom') {
        return 'mr-12'
      }
      return 'mb-8'
    },
  },
  watch: {
    selections(newValue) {
      this.$emit('input', newValue)
    },
  },
  methods: {
    onInput({ checked, value }) {
      const indexOfValue = this.selections.indexOf(value)
      if (checked && indexOfValue === -1) {
        this.selections.push(value)
      } else if (!checked && indexOfValue !== -1) {
        this.selections.splice(indexOfValue, 1)
      }
    },
  },
}
</script>
<template>
  <div
    :class="[labelPosition === 'bottom' ? 'flex-row items-center' : 'flex-col']"
    class="w-full h-auto flex justify-start mb-2"
  >
    <GxCheckbox
      v-for="(checkbox, index) in inputs"
      :key="index"
      :single="false"
      :label="checkbox.label"
      :input-id="`checkbox-${Math.random()}-${index}`"
      :label-position="labelPosition"
      :model="checkbox.value"
      :checked="checkbox.checked ? checkbox.checked : false"
      :disabled="checkbox.disabled"
      :spacing="computedSpacing"
      @input="onInput"
    />
  </div>
</template>

<script>
import GxRadioButton from '@components/_Core/Forms/GxRadioButton.vue'
export default {
  name: 'GxRadioButtonGroup',
  components: {
    GxRadioButton,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    inputs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      inputChecked: '',
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
    inputChecked(newValue) {
      this.$emit('input', newValue)
    },
  },
}
</script>
<template>
  <div
    :class="[labelPosition === 'bottom' ? 'flex' : 'flex-col']"
    class="w-full h-auto flex justify-start mb-2"
  >
    <GxRadioButton
      v-for="(radio, index) in inputs"
      :key="index"
      v-model="inputChecked"
      :label="radio.label"
      :input-id="`radio-${Math.random()}-${index}`"
      :disabled="radio.disabled"
      :model="radio.value"
      :checked="radio.checked ? radio.checked : false"
      :label-position="labelPosition"
      :spacing="computedSpacing"
    />
  </div>
</template>

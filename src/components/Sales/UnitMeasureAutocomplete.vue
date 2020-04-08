<script>
import sortBy from 'lodash/sortBy'
import satUnits from '@src/assets/Catalogos/CAT_005_MEX_CFDI_Unidades.json'
const orderedSatUnits = sortBy(satUnits, ['unit']).map((unit) => {
  unit.customLabel = `${unit.code} - ${unit.unit}`
  return unit
})
// {
//     "code": "18",
//     "customLabel": "18 - Tambor de cincuenta y cinco galones (EUA)"
//     "unit": "Tambor de cincuenta y cinco galones (EUA)"
// }
export default {
  name: 'UnitMeasureAutocomplete',
  props: {
    value: {
      type: Object,
      required: true,
    },
    localId: {
      type: Number,
      default: null,
    },
    error: {
      type: String,
      default: '',
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    onGoToList: {
      type: Function,
      default: () => () => null,
    },
  },
  data() {
    return {
      searcTerm: '',
      selectedUnitMeasureDescription: this.value.customLabel || '',
      labels: Object.freeze(
        orderedSatUnits.map(({ customLabel }) => customLabel)
      ),
    }
  },
  computed: {
    selectedClaveSat() {
      const result = orderedSatUnits.find(
        ({ customLabel }) => customLabel === this.selectedUnitMeasureDescription
      )
      return result || {}
    },
  },
  watch: {
    value(newVal) {
      this.selectedUnitMeasureDescription = newVal.customLabel || ''
    },
    selectedClaveSat(newVal) {
      this.$emit('input', newVal)
    },
  },
  methods: {
    selectUnit() {
      // this.saveFormState()
      if (this.localId) {
        this.$router.replace({
          name: 'selectunit',
          query: { localId: this.localId, searchTerm: this.searcTerm },
        })
      } else {
        this.onGoToList()
        this.$router.replace({
          name: 'selectunit',
          query: {
            ...this.queryParams,
            searcTerm: this.searcTerm,
          },
        })
      }
    },
    isValid() {
      return this.$refs.GxAutocomplete.isValid()
    },
    setFocus() {
      return this.$refs.GxAutocomplete.setFocus()
    },
  },
}
</script>
<template>
  <GxAutocomplete
    ref="GxAutocomplete"
    v-model="selectedUnitMeasureDescription"
    :options="labels"
    label="Unidad de medida*"
    :class="{ 'js-error-anchor': error }"
    :right-icon-click-handler="selectUnit"
    required
    @search="searcTerm = $event"
  >
    <template
      v-slot:end-of-list="{ filteredOptionsLenght, loading, optionsLenght }"
    >
      <p
        v-if="filteredOptionsLenght > 0"
        class="text-right py-3 px-4 border-t border-gray-200 text-sm de:text-2xs"
      >
        <button
          type="button"
          class="font-bold text-primary text-sm de:text-2xs"
          @mousedown.prevent="selectUnit"
          >Ver lista completa</button
        >
      </p>
      <p
        v-else-if="!loading && filteredOptionsLenght === 0 && optionsLenght > 0"
        class="flex flex-col py-3 px-4 border-t border-gray-200  items-center justify-center"
      >
        <span
          class="text-center tracking-normal text-gray-500 mb-4 text-lg de:text-xs"
          >No encontramos resultados relacionados a tu búsqueda.</span
        >
        <button
          type="button"
          class="font-bold text-primary flex items-center text-sm de:text-2xs"
          @mousedown.prevent="selectUnit"
        >
          Ver lista completa</button
        >
      </p>
    </template>
    <template v-slot:error>
      <p v-if="error" class="text-sm de:text-2xs mt-1 text-alert">{{
        error
      }}</p>
    </template>
  </GxAutocomplete>
</template>

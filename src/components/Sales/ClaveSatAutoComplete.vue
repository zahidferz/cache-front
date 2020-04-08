<script>
// original file '@src/assets/Catalogos/CAT_006_MEX_CFDI_Clave_de_producto_o_Servicio-old.json'
import orderedSatKeys from '@src/assets/Catalogos/CAT_006_MEX_CFDI_Clave_de_producto_o_Servicio.json'
// {
//     "c": "13102012",
//     "d": "(no hay sugerencias) pbt",
//     "customLabel": "13102012 - (no hay sugerencias) pbt"
// }
export default {
  name: 'ClaveSatAutoComplete',
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
      searchTerm: '',
      selectSatKeyDescription: this.value.customLabel || '',
      labels: Object.freeze(
        orderedSatKeys.map(({ customLabel }) => customLabel)
      ),
    }
  },
  computed: {
    selectedClaveSat() {
      const result = orderedSatKeys.find(
        ({ customLabel }) => customLabel === this.selectSatKeyDescription
      )
      return result || {}
    },
  },
  watch: {
    value(newVal) {
      this.selectSatKeyDescription = newVal.customLabel || ''
    },
    selectedClaveSat(newVal) {
      this.$emit('input', newVal)
    },
  },
  methods: {
    selectClaveSat() {
      if (typeof this.localId === 'number') {
        this.$router.replace({
          name: 'newsaleselectsatkey',
          query: { localId: this.localId, searchTerm: this.searchTerm },
        })
      } else {
        this.onGoToList()
        this.$router.replace({
          name: 'newsaleselectsatkey',
          query: {
            ...this.queryParams,
            searchTerm: this.searchTerm,
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
    v-model="selectSatKeyDescription"
    :options="labels"
    :class="{ 'js-error-anchor': error }"
    label="Clave SAT*"
    required
    :right-icon-click-handler="selectClaveSat"
    @search="searchTerm = $event"
  >
    <template
      v-slot:end-of-list="{ filteredOptionsLenght, loading, optionsLenght }"
    >
      <p
        v-if="filteredOptionsLenght > 0"
        class="text-right py-3 px-4 border-t border-gray-200 "
      >
        <button
          type="button"
          class="font-bold text-primary text-sm de:text-2xs"
          @mousedown.prevent="selectClaveSat"
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
          @mousedown.prevent="selectClaveSat"
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

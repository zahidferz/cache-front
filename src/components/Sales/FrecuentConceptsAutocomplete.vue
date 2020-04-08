<script>
import { FREQUENT_ITEMS_SEARCH, LOCAL_COMPANY } from '@src/apollo/queries'
import GxIcon2 from '@components/_Core/Icons/GxIcon2'
import Big from 'big.js'
export default {
  name: 'FrequenConceptsAutocomplete',
  components: {
    GxIcon2,
  },
  apollo: {
    company: LOCAL_COMPANY,
    concepts: {
      query: FREQUENT_ITEMS_SEARCH,
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          size: 50,
          status: 'active',
          search: this.searchTerm,
        }
      },
      update(data) {
        const searchResult =
          data.myAccount.companies[0].company.frequentItems.list
        const result = [...this.concepts, ...searchResult]
        return result.reduce(
          (acc, concept) => {
            if (acc.ids.includes(concept.documentItemId)) {
              return acc
            }
            acc.ids.push(concept.documentItemId)
            acc.uniq.push(concept)
            return acc
          },
          { ids: [], uniq: [] }
        ).uniq
      },
      fetchPolicy: 'network-only',
      skip() {
        return (
          !this.company || !this.company.number || !this.company.branchNumber
        )
      },
    },
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    localId: {
      type: Number,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      company: null,
      concepts: [],
      selectedDescription: this.value.description || '',
      searchTerm: '',
    }
  },
  computed: {
    conceptDescriptions() {
      return this.concepts.map((concept) => concept.description)
    },
    selectedConcept() {
      if (!this.selectedDescription) return {}
      const defaultConcept = {
        description: this.selectedDescription,
        itemAdditionalDataLocalized: {},
        withheldTaxesPerUnit: [],
        transferredTaxesPerUnit: [],
      }
      const concept = this.concepts.find((concept) => {
        return concept.description === this.selectedDescription
      })
      return this.saleItemInput(concept || defaultConcept)
    },
    innerError() {
      if (this.selectedDescription.length > 1000) {
        return 'Nombre de concepto debe tener máximo 1000 caracteres'
      }
      return this.error
    },
  },
  watch: {
    selectedConcept(newVal, oldVal) {
      this.$emit('input', newVal)
    },
  },
  created() {
    localStorage.removeItem('gx-nf-concept')
  },
  methods: {
    formatUnitPrice(unitPrice) {
      return (
        new Big(unitPrice)
          .valueOf()
          // 000 --> 000.00
          .replace(/^(\d+,?)+$/g, '$&.00')
          // 000. --> 000.00
          .replace(/^(\d+,?)+\.$/g, '$&00')
          // 000.0 --> 000.00
          .replace(/^(\d+,?)+\.\d$/g, '$&0')
      )
    },
    deepEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2)
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0
    },
    selectFrequentConcept() {
      this.$router.replace({
        name: 'choosefrequentconcept',
        query: { localId: this.localId, searchTerm: this.searchTerm },
      })
    },
    createFrequentConcept() {
      this.$router.replace({
        name: 'newfrequentconcept',
        query: { localId: this.localId, from: 'saleconcept' },
      })
    },
    isValid() {
      return !!this.selectedDescription && !this.innerError
    },
    saleItemInput(concept) {
      return {
        itemReferenceId: concept.documentItemId || '',
        key: concept.key || '',
        description: concept.description,
        unitBasePrice: concept.unitBasePrice
          ? this.formatUnitPrice(concept.unitBasePrice)
          : '',
        currency: concept.currency || '',
        withheldTaxesPerUnit: this.parseTaxes(concept.withheldTaxesPerUnit),
        transferredTaxesPerUnit: this.parseTaxes(
          concept.transferredTaxesPerUnit
        ),
        itemAdditionalDataLocalizedInput_MEX: {
          claveProductoServicioSAT:
            concept.itemAdditionalDataLocalized.claveProductoServicioSAT || '',
          descripcionProductoServicioSAT:
            concept.itemAdditionalDataLocalized
              .descripcionProductoServicioSAT || '',
          claveUnidadMedidaSAT:
            concept.itemAdditionalDataLocalized.claveUnidadMedidaSAT || '',
          descripcionUnidadMedidaSAT:
            concept.itemAdditionalDataLocalized.descripcionUnidadMedidaSAT ||
            '',
        },
      }
    },
    parseTaxes(taxes) {
      if (taxes.length === 0) return []
      return taxes.map(this.parseTax)
    },
    parseTax(tax) {
      return {
        taxName: tax.name,
        amount: '0.00',
        rate: new Big(tax.rate).valueOf(),
      }
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
    v-model="selectedDescription"
    keep-typed-value
    :options="conceptDescriptions"
    :loading="$apollo.queries.concepts.loading"
    :class="{ 'js-error-anchor': innerError }"
    label="Nombre del concepto*"
    :right-icon-click-handler="selectFrequentConcept"
    required
    @search="searchTerm = $event"
  >
    <template
      v-slot:end-of-list="{ filteredOptionsLenght, loading, optionsLenght }"
    >
      <p
        v-if="!loading && optionsLenght === 0"
        class="flex flex-col py-3 px-4 border-t border-gray-200  items-center justify-center"
      >
        <span
          class="text-center tracking-normal text-gray-500 mb-4 text-lg  de:text-xs"
          >Aun no tienes conceptos frecuentes</span
        >
        <button
          type="button"
          class="font-bold text-primary flex items-center text-sm de:text-2xs"
          @mousedown.prevent="createFrequentConcept"
        >
          <GxIcon2 icon="add" class="mr-1 text-sm de:text-2xs" />
          Crear un nuevo concepto frecuente</button
        >
      </p>
      <p
        v-else-if="filteredOptionsLenght > 0"
        class="text-right py-3 px-4 border-t border-gray-200 text-sm de:text-2xs"
      >
        <button
          type="button"
          class="font-bold text-primary text-sm de:text-2xs"
          @mousedown.prevent="selectFrequentConcept"
          >Ver lista completa de conceptos</button
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
          @mousedown.prevent="createFrequentConcept"
        >
          <GxIcon2 icon="add" class="mr-1 text-sm de:text-2xs" />
          Crear un nuevo concepto frecuente</button
        >
      </p>
    </template>
    <template v-slot:error>
      <p v-if="innerError" class="text-sm de:text-2xs mt-1 text-alert">{{
        innerError
      }}</p>
    </template>
  </GxAutocomplete>
</template>

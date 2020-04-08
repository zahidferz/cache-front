<script>
export default {
  name: 'NewSaleUnitCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateSatUnitConcept() {
      const saleConcepts = JSON.parse(localStorage.getItem('newSale--concepts'))
      if (!saleConcepts) throw TypeError('newSale--concepts cannot be null')
      const conceptToBeUpdated = saleConcepts.find((concept) => {
        return concept.localId === Number(this.$route.query.localId)
      })
      if (!conceptToBeUpdated)
        throw TypeError('conceptToBeUpdated cannot be undifined')
      // eslint-disable-next-line camelcase
      const itemAdditionalDataLocalizedInput_MEX = {
        ...conceptToBeUpdated.itemAdditionalDataLocalizedInput_MEX,
        claveUnidadMedidaSAT: this.item.code,
        claveUnidadMedidaSATDescripcion: this.item.unit,
      }
      const updatedConcept = {
        ...conceptToBeUpdated,
        // eslint-disable-next-line camelcase
        itemAdditionalDataLocalizedInput_MEX,
      }
      const indexToUpdate = saleConcepts.findIndex((concept) => {
        return concept.localId === Number(this.$route.query.localId)
      })
      saleConcepts[indexToUpdate] = updatedConcept
      localStorage.setItem('newSale--concepts', JSON.stringify(saleConcepts))
    },
    async selectUnit() {
      const { item } = this
      localStorage.setItem(
        'selectedUnitMeasure',
        JSON.stringify({ item, localId: this.$route.query.localId })
      )
      if (!this.$route.query.from) {
        this.updateSatUnitConcept()
        this.$router.replace({
          name: 'saleconcept',
        })
        return
      }
      if (this.$route.query.from === 'updateconcept') {
        const data = JSON.parse(localStorage.getItem('gx-nf-concept'))
        this.$router.replace({
          name: 'updateconcept',
          params: {
            id: data.concept.documentItemId,
          },
          query: { localId: this.$route.query.localId },
        })
        return
      }
      this.$router.replace({
        name: this.$route.query.from,
        query: { localId: this.$route.query.localId },
      })
    },
  },
}
</script>
<template>
  <button class="py-4 text-left w-full" @click="selectUnit">
    <p>{{ item.unit }}</p>
    <p class="gx-caption de:gx-caption">{{ item.code }}</p>
  </button>
</template>

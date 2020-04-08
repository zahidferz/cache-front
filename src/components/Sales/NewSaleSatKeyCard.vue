<script>
export default {
  name: 'NewSaleSatKeyCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateSatKeyConcept() {
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
        claveProductoServicioSATDescripcion: this.item.d,
        claveProductoServicioSAT: this.item.c,
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
    selectSatKey() {
      const { item } = this
      // frequentConcep form
      if (this.$route.query.from === 'newfrequentconcept') {
        localStorage.setItem('selectedSatKey', JSON.stringify(item))
        this.$router.replace({
          name: this.$route.query.from,
          query: { localId: this.$route.query.localId },
        })
      }
      // edit concept form
      if (this.$route.query.from === 'updateconcept') {
        localStorage.setItem('selectedSatKey', JSON.stringify(item))
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
      // New sale Concept form
      if (!this.$route.query.from) {
        this.updateSatKeyConcept()
        this.$router.replace({
          name: 'saleconcept',
        })
      }
    },
  },
}
</script>
<template>
  <button class="py-4 text-left w-full" @click="selectSatKey">
    <p>{{ item.d }}</p>
    <p class="gx-caption de:gx-caption">{{ item.c }}</p>
  </button>
</template>

<script>
import GxCardImageOnly from '@components/_Core/Cards/GxCardImageOnly'
import banks from './banks'

export default {
  name: 'ChooseBank',
  components: {
    GxCardImageOnly,
  },
  inject: ['topBarSearch'],
  data() {
    return {
      banks,
    }
  },
  computed: {
    filteredBanks() {
      return this.banks.filter((bank) => {
        return bank.name
          .toUpperCase()
          .includes(this.topBarSearch.search.toUpperCase())
      })
    },
  },
  methods: {
    pickBank(bank) {
      this.$router.push({
        name: 'bankform',
        params: { bank: bank.name },
        query: { paybookId: bank.paybookId, paybookName: bank.paybookName },
      })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col items-center">
    <div v-if="filteredBanks.length > 0" class="gxBanksContainer">
      <GxCardImageOnly
        v-for="bank in filteredBanks"
        :key="bank.name"
        class="mb-8 mx-4"
        :image="bank.image"
        :alt="bank.name"
        @click="pickBank(bank)"
      />
    </div>
    <p v-else class="text-white">
      No existen resultados relacionados con tu búsqueda. Escríbenos en el chat
      si necesitas ayuda.
    </p>
  </div>
</template>
<style lang="scss">
.gxBanksContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>

<script>
import GxMultiselect from '@components/_Core/Forms/GxMultiselect'
import NewConceptTaxItem from '@components/Sales/NewConceptTaxItem'
export default {
  name: 'NewConceptTaxesForm',
  components: {
    GxMultiselect,
    NewConceptTaxItem,
  },
  props: {
    taxes: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      default: () => [],
    },
    selectLabel: {
      type: String,
      default: '',
    },
    total: {
      type: String,
      required: true,
    },
    taxesType: {
      type: String,
      default: 'transferred',
    },
  },
  data() {
    return {
      selectedTaxes: this.value.map(({ taxName }) => taxName),
      taxesModels: [],
      defaultRate: {
        IVA: this.taxesType === 'transferred' ? '16' : '',
      },
    }
  },
  watch: {
    value: {
      handler: function(newValue, oldValue) {
        if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
          return
        }
        this.taxesModels = this.value
        this.selectedTaxes = this.value.map(({ taxName }) => taxName)
      },
      immediate: true,
    },
    selectedTaxes(newVal) {
      const updatedTaxModels = []
      newVal.forEach((taxName) => {
        const exists = this.taxesModels.find((tax) => taxName === tax.taxName)
        if (exists) {
          updatedTaxModels.push(exists)
        } else {
          updatedTaxModels.push({
            taxName,
            amount: '',
            rate: this.defaultRate[taxName] || '',
          })
        }
      })
      this.taxesModels = updatedTaxModels
    },
    taxesModels(newVal) {
      this.$emit('input', newVal)
    },
  },
  methods: {
    updateTaxItem(taxItem) {
      const indexToUpdate = this.taxesModels.findIndex(
        ({ taxName }) => taxName === taxItem.taxName
      )
      this.taxesModels = [
        ...this.taxesModels.slice(0, indexToUpdate),
        taxItem,
        ...this.taxesModels.slice(indexToUpdate + 1),
      ]
    },
    isValid() {
      if (this.taxesModels.length === 0) {
        return true
      }
      const areChildrenValid = this.$refs.newConceptTaxItem.every((item) => {
        return item.isValid()
      })
      return areChildrenValid
    },
  },
}
</script>
<template>
  <div>
    <!-- Need to set searchable true otherwise there is no way to close the dropdown in iOS. Known issue from vue-multiselect, waiting for V3 -->
    <GxMultiselect
      v-model="selectedTaxes"
      :select-label="selectLabel"
      :searchable="true"
      :multiple="true"
      watch-value
      :options="taxes"
      hide-selected
    >
    </GxMultiselect>
    <transition name="fade">
      <div v-if="selectedTaxes.length" key="tranderred" class="mb-8 de:mb-4">
        <NewConceptTaxItem
          v-for="tax in taxesModels"
          :key="tax.taxName"
          ref="newConceptTaxItem"
          :total="total"
          class="flex flex-col"
          :value="tax"
          :data-test-id="selectLabel"
          @input="updateTaxItem"
        />
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.2s ease-out;
}
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

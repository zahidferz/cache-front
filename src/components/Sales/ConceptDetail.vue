<script>
import GxSwitchText from '@components/_Core/Forms/GxSwitchText'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxChip from '@src/components/_Core/Chips/GxChip'
import Big from 'big.js'
import { FREQUENT_CONCEPT_BY_ID, LOCAL_COMPANY } from '@src/apollo/queries'
import {
  FREQUENT_ITEM_REACTIVATE,
  FREQUENT_ITEM_DEACTIVATE,
} from '@src/apollo/mutations'
import GxLoader from '@components/_Core/Utils/GxLoader'
export default {
  name: 'ConceptDetail',
  components: {
    GxChip,
    GxLoader,
    GxSwitchText,
    GxDesktopHeader,
    GxCardModal,
  },
  apollo: {
    concept: {
      query: FREQUENT_CONCEPT_BY_ID,
      variables() {
        return {
          companyNumber: this.company.number,
          id: this.$route.params.id,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.frequentItems.list[0]
      },
      skip() {
        return !this.company
      },
    },
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      company: null,
      concept: null,
      status: '',
      loading: false,
      errorModal: null,
      errorAlertImg: require('@assets/images/Sales/de_007_4_nombreexistente.svg'),
      options: ['ACTIVO', 'INACTIVO'],
    }
  },
  computed: {
    formattedCurrency() {
      if (this.concept && this.concept.currency) {
        return this.parseCurrencyCode(this.concept.currency)
      }
      return null
    },
    formattedUnitBasePrice() {
      if (!this.concept) {
        return
      }
      const [integers, decimals] = Big(this.concept.unitBasePrice)
        .valueOf()
        .split('.')
      if (decimals) {
        if (decimals.length > 1) {
          return `$${Number(integers).toLocaleString('en')}.${decimals}`
        }
        return `$${Number(integers).toLocaleString('en')}.${decimals}0`
      }
      return `$${Number(integers).toLocaleString('en', {
        minimumFractionDigits: 2,
      })}`
    },
  },
  watch: {
    concept(newVal) {
      if (newVal) {
        if (newVal.status === 'inactive') {
          this.status = 'INACTIVO'
        } else {
          this.status = 'ACTIVO'
        }
      }
    },
  },
  created() {
    this.$apollo.queries.concept.setOptions({
      fetchPolicy: 'network-only',
    })
  },
  methods: {
    parseCurrencyCode(code) {
      if (code === 'MXN') {
        return 'Peso Mexicano (MXN)'
      }
      if (code === 'EUR') {
        return 'Euro (EUR)'
      }
      if (code === 'USD') {
        return 'Dolar americano (USD)'
      }
      return code
    },
    deleteSelectedConceptNewSaleFlow() {
      const data = JSON.parse(localStorage.getItem('newSale--concepts'))
      const formData = JSON.parse(localStorage.getItem('newConceptForm'))
      if (!data) return
      // remove items with a inactive frequent concept
      const filtered = data.filter(
        (item) => item.itemReferenceId !== this.$route.params.id
      )
      if (filtered.length === 0) {
        filtered[0] = { localId: Date.now() }
      }

      localStorage.setItem('newSale--concepts', JSON.stringify(filtered))
      if (
        formData &&
        formData.selectedConcept &&
        'documentItemId' in formData.selectedConcept
      ) {
        if (formData.selectedConcept.documentItemId === this.$route.params.id) {
          localStorage.removeItem('newConceptForm')
        }
      }
    },
    async onInput(evt) {
      const previusStatus = this.status
      try {
        this.loading = true
        this.$nextTick(async () => {
          const branchNumber = this.company.branchNumber
          const companyNumber = this.company.number
          const documentItemId = this.$route.params.id
          this.status = evt
          if (evt === 'ACTIVO') {
            await this.$apollo.mutate({
              mutation: FREQUENT_ITEM_REACTIVATE,
              variables: {
                branchNumber,
                companyNumber,
                documentItemId,
              },
            })
          } else {
            await this.$apollo.mutate({
              mutation: FREQUENT_ITEM_DEACTIVATE,
              variables: {
                branchNumber,
                companyNumber,
                documentItemId,
              },
            })
            this.deleteSelectedConceptNewSaleFlow()
          }
          await this.$apollo.queries.concept.refetch()
          this.loading = false
        })
      } catch (error) {
        this.errorModal = this.$utils.parseServerError(error)
        this.status = previusStatus
      }
    },
    toConcepts() {
      this.$router.replace({
        name: 'choosefrequentconcept',
        query: { ...this.$route.query },
      })
    },
  },
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="company && concept" class="px-4 de:px-8">
      <GxDesktopHeader
        v-if="$mq === 'de'"
        icon="keyboard_backspace"
        header="Detalles del concepto"
        :icon-click-handler="toConcepts"
      >
        <template v-slot:right>
          <GxSwitchText
            :value="status"
            :disabled="loading"
            :options="options"
            :bg-colors="['bg-alert', 'bg-success']"
            @input="onInput"
          />
        </template>
      </GxDesktopHeader>
      <div v-if="$mq === 'mo'" class="flex justify-end w-full mt-4">
        <GxSwitchText
          :value="status"
          :disabled="loading"
          :options="options"
          :bg-colors="['bg-alert', 'bg-success']"
          @input="onInput"
        />
      </div>
      <h5 class="gx-subtitle mt-8 mb-2">Concepto</h5>
      <p class=" mb-4 gxFontSize">{{ concept.description }}</p>
      <h5 class="gx-subtitle mb-2">Clave</h5>
      <p class=" mb-4 gxFontSize">{{ concept.key }}</p>
      <h5 class="gx-subtitle mb-4 de:mb-2">Clave del SAT</h5>
      <div class="flex">
        <p class="gxFontSize"
          >{{ concept.itemAdditionalDataLocalized.claveProductoServicioSAT }} -
          {{
            concept.itemAdditionalDataLocalized.descripcionProductoServicioSAT
          }}</p
        >
      </div>
      <h5 class="gx-subtitle mb-4 pt-4 de:mb-2">Unidad de medida</h5>
      <div class="flex">
        <p class="gxFontSize"
          >{{ concept.itemAdditionalDataLocalized.claveUnidadMedidaSAT }} -
          {{
            concept.itemAdditionalDataLocalized.descripcionUnidadMedidaSAT
          }}</p
        >
      </div>
      <h5 class="gx-subtitle mb-2 pt-4">Precio unitario</h5>
      <p class="mb-4 gxFontSize">{{ formattedUnitBasePrice }}</p>
      <h5 class="gx-subtitle mb-2">Moneda</h5>
      <p class="mb-8 de:mb-8 gxFontSize">{{ formattedCurrency }}</p>
      <p class="uppercase mb-4 gx-subtitle text-gray-500 font-bold"
        >impuestos</p
      >
      <template v-if="concept.transferredTaxesPerUnit.length">
        <p class="gx-subtitle mb-2">Impuesto de traslado</p>
        <div class="flex">
          <GxChip
            v-for="(taxes, index) in concept.transferredTaxesPerUnit"
            :key="taxes.name"
            :clickable="false"
            :class="{ 'ml-2': index !== 0 }"
            >{{ taxes.name }}</GxChip
          >
        </div>
      </template>
      <template v-if="concept.withheldTaxesPerUnit.length">
        <p class="gx-subtitle mt-4 mb-2 de:mt-2">Impuesto retenido</p>
        <div class="flex">
          <GxChip
            v-for="(taxes, index) in concept.withheldTaxesPerUnit"
            :key="taxes.name"
            :clickable="false"
            :class="{ 'ml-2': index !== 0 }"
            >{{ taxes.name }}</GxChip
          >
        </div>
      </template>
      <GxFab
        v-if="status === 'ACTIVO'"
        :mobile="$mq === 'mo'"
        :large="$mq === 'de'"
        icon="edit"
        class="shadow-2 fixed gxFixedFab"
        label="crear nuevo concepto"
        @click="
          $router.replace({
            name: 'updateconcept',
            params: { id: $route.params.id },
            query: { ...$route.query },
          })
        "
      />
      <GxCardModal
        v-if="errorModal"
        headline="Error"
        :text-body="errorModal"
        :card-img="errorAlertImg"
        alt="Error"
        @close="errorModal = null"
      />
    </div>
    <div v-else class="p-4 flex-grow flex">
      <GxLoader class="ailgn-center" />
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
.gx-subtitle {
  font-size: 0.625rem;
}
.gxFontSize {
  font-size: 0.75rem;
}

@media only screen and (max-width: 800px) {
  .gxFontSize {
    font-size: 1.125rem;
  }
}
</style>

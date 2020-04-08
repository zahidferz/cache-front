<script>
import GxSwipe from '@components/_Core/Utils/GxSwipe.vue'
import GxLoader from '@components/_Core/Utils/GxLoader'
import Observer from '@components/_Core/Utils/Observer'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxIcon from '@components/_Core/Icons/GxIcon'
import Big from 'big.js'
import {
  FREQUENT_ITEMS,
  FREQUENT_ITEMS_SEARCH,
  LOCAL_COMPANY,
} from '@src/apollo/queries'
export default {
  name: 'NewSaleFrequentConcept',
  components: {
    GxSwipe,
    GxLoader,
    GxIcon,
    GxCardModal,
    Observer,
  },
  props: {
    search: {
      type: String,
      default: '',
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    concepts: {
      query() {
        if (this.search) {
          return FREQUENT_ITEMS_SEARCH
        }
        return FREQUENT_ITEMS
      },
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          status: 'all',
          size: this.pageSize,
          search: this.search,
        }
      },
      error(error) {
        this.errorModal = error.message ? error.message : 'Error al descargar'
      },
      update(data) {
        if (!data.myAccount) {
          return null
        }
        return data.myAccount.companies[0].company.frequentItems
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      company: null,
      concepts: null,
      bgImg: require('@src/assets/images/Sales/de_007_2_fondocurvo.svg'),
      showIcon: false,
      downloadedAll: false,
      page: 1,
      pageSize: 50,
      errorModal: null,
      errorTodoImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
    }
  },
  computed: {
    sortedConcepts() {
      if (this.concepts && this.concepts.list.length > 0) {
        const concepts = this.concepts.list.slice(0)
        return concepts.sort(function(a, b) {
          if (a.description.toLowerCase() > b.description.toLowerCase()) {
            return 1
          }
          return -1
        })
      }
      return null
    },
  },
  watch: {
    search(newValue) {
      this.page = 1
      this.downloadedAll = false
      this.concepts = null
    },
    page(newValue) {
      const vm = this
      this.$apollo.queries.concepts.fetchMore({
        variables: {
          page: newValue,
          size: this.pageSize,
          searchText: this.search,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newConcepts =
            fetchMoreResult.myAccount.companies[0].company.frequentItems.list
          previousResult.myAccount.companies[0].company.frequentItems.list = [
            ...previousResult.myAccount.companies[0].company.frequentItems.list,
            ...newConcepts,
          ]
          if (newConcepts.length < vm.pageSize) {
            vm.downloadedAll = true
          }
          return previousResult
        },
      })
    },
  },
  methods: {
    selectConcept(concept) {
      if (concept.status === 'inactive') {
        return
      }
      if (!this.$route.query.localId)
        throw TypeError('localId cannot be undefined')
      this.selectConcepNewSale(concept)
      this.$router.replace({ name: 'saleconcept' })
    },
    selectConcepNewSale(concept) {
      const saleItemInput = this.saleItemInput(concept)
      const saleConcepts = JSON.parse(localStorage.getItem('newSale--concepts'))
      if (!saleConcepts) throw TypeError('newSale--concepts cannot be null')
      const conceptToBeUpdated = saleConcepts.find((concept) => {
        return concept.localId === Number(this.$route.query.localId)
      })
      if (!conceptToBeUpdated)
        throw TypeError('conceptToBeUpdated cannot be undifined')
      const overWriteValues =
        saleItemInput.itemReferenceId !== conceptToBeUpdated.itemReferenceId
      if (!overWriteValues) return
      const updatedConcept = {
        ...conceptToBeUpdated,
        ...saleItemInput,
      }
      const indexToUpdate = saleConcepts.findIndex((concept) => {
        return concept.localId === Number(this.$route.query.localId)
      })
      saleConcepts[indexToUpdate] = updatedConcept
      localStorage.setItem('newSale--concepts', JSON.stringify(saleConcepts))
    },
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
        selectedWithheldTaxes: this.parseTaxes(concept.withheldTaxesPerUnit),
        selectedTransferredTaxes: this.parseTaxes(
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
        amount: '0',
        rate: new Big(tax.rate).valueOf(),
      }
    },
    mouseOver(index) {
      this.showIcon = index
    },
    mouseLeave() {
      this.showIcon = false
    },
    onErrorClose() {
      this.errorModal = null
      this.$router.replace({ name: 'saleconcept' })
    },
  },
}
</script>
<template>
  <transition name="fade" mode="out-in">
    <div v-if="!concepts" key="loader" class="flex-grow flex flex-col">
      <GxLoader />
      <!-- In case the api is down -->
      <GxCardModal
        v-if="errorModal"
        headline="Error"
        :text-body="errorModal"
        :card-img="errorTodoImg"
        alt="Error"
        @close="onErrorClose"
      />
    </div>
    <div
      v-else
      key="conceptsList"
      class="flex-grow flex flex-col mt-4 de:mt-0 pb-2"
    >
      <p
        v-if="search && sortedConcepts"
        class="bg-gray-100 text-gray-400 px-4 de:mx-8  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
        :class="{ gxHeaders: $mq === 'de' }"
        >RESULTADOS DE LA BÚSQUEDA</p
      >
      <ul
        v-if="sortedConcepts && sortedConcepts.length > 0"
        class="flex flex-col de:px-8 mb-20"
      >
        <div
          v-for="(concept, index) in sortedConcepts"
          :key="concept.documentItemId"
        >
          <template v-if="!search">
            <p
              v-if="index === 0"
              class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
              :class="{ gxHeaders: $mq === 'de' }"
              >{{ concept.description.charAt(0) }}</p
            >
            <p
              v-else-if="
                concept.description.charAt(0).toLowerCase() !==
                  sortedConcepts[index - 1].description.charAt(0).toLowerCase()
              "
              class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
              :class="{ gxHeaders: $mq === 'de' }"
              >{{ concept.description.charAt(0).toUpperCase() }}</p
            >
          </template>
          <GxSwipe v-if="$mq === 'mo'">
            <li
              class="flex flex-col p-4 border-b"
              :class="{ 'text-gray-500': concept.status === 'inactive' }"
              @click="selectConcept(concept)"
              >{{ concept.description
              }}<span class="mt-2">{{ concept.key }}</span></li
            >
            <template v-slot:right>
              <GxTextLink
                class="flex justify-center items-center px-4 bg-primary text-white"
                @click.stop="
                  $router.replace({
                    name: 'conceptdetail',
                    params: {
                      id: concept.documentItemId,
                    },
                  })
                "
              >
                Ver detalle
              </GxTextLink>
            </template>
          </GxSwipe>
          <li
            v-else
            :class="{ 'text-gray-500': concept.status === 'inactive' }"
            class="flex flex-grow p-4 border-b gxOutter de:hover:bg-gray-200 de:active:bg-secondary-50 cursor-pointer"
            @mouseover="mouseOver(index)"
            @mouseleave="mouseLeave"
            @click="selectConcept(concept)"
          >
            <div class="flex flex-grow flex-col"
              ><p> {{ concept.description }}</p>
              <p>{{ concept.key }}</p>
            </div>
            <button
              class="text-gray-500"
              @click.stop="
                $router.replace({
                  name: 'conceptdetail',
                  params: { id: concept.documentItemId },
                  query: { ...$route.query },
                })
              "
              ><GxIcon v-if="showIcon === index" icon="remove_red_eye"
            /></button>
          </li>
        </div>
        <Observer
          v-if="sortedConcepts.length < concepts.size && !downloadedAll"
          :loading="$apollo.queries.concepts.loading"
          class="w-full flex justify-center mt-4"
          @load="page++"
        />
      </ul>
      <div
        v-if="search && !sortedConcepts"
        class="h-full flex-grow flex flex-col justify-center items-center"
      >
        <img
          :src="$utils.alertImages.NoResultsFound"
          alt="No encontramos conceptos relacionados con tu búsqueda"
          class="mb-8"
        />
        <h1 class="gx-h4 mx-4 text-center"
          >No encontramos conceptos relacionados a tu búsqueda</h1
        >
      </div>
      <section
        v-if="!search && concepts && concepts.list.length === 0"
        key="no-concepts-section"
        class="bg-no-repeat flex-grow flex-col items-center justify-center gx-background"
      >
        <h1 class="gx-h4 text-center de:pt-8 mb-8 de:mb-4"
          >Aún no tienes conceptos frecuentes. <br />
          Crea el primero desde el +</h1
        >
        <img
          v-if="$mq === 'mo'"
          src="@assets/images/Sales/de_007_3_primerconcepto.svg"
          alt=""
          class="ml-auto mr-auto"
        />
      </section>
      <GxFab
        key="gxFab"
        :mobile="$mq === 'mo'"
        :large="$mq === 'de'"
        icon="add"
        class="shadow-2 fixed gxFixedFab"
        label="crear nuevo concepto"
        @click="
          $router.replace({
            name: 'newfrequentconcept',
            query: { ...$route.query },
          })
        "
      />
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
.gx-background {
  background-image: url('../../../src/assets/images/Sales/de_007_3_primerconcepto.svg');
  background-position: center bottom, bottom;
  background-size: auto calc(100% - 64px - 51px), 100% calc(100% - 64px - 51px);
}
.gxOutter:focus-within {
  background-color: var(--gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
}

@media only screen and (max-width: 767px) {
  .gx-background {
    background-image: none;
    // background-image: url('../../../src/assets/images/Sales/de_007_3_primerconcepto.svg');
    // background-size: auto calc(100% - 102px - 71px), 100% calc(100% - 16px);
  }
}
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.gxHeaders {
  line-height: 0.75rem;
}
</style>

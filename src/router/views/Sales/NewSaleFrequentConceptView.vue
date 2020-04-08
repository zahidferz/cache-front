<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewSaleFrequentConcept from '@components/Sales/NewSaleFrequentConcept'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import {
  FREQUENT_ITEMS,
  FREQUENT_ITEMS_SEARCH,
  LOCAL_COMPANY,
} from '@src/apollo/queries'

export default {
  name: 'NewSaleFrequentConceptView',
  page: {
    title: 'Nuevo concepto frecuente',
    meta: [{ name: 'description', content: 'Nuevo concepto frecuente' }],
  },
  components: {
    LayoutWebMobile,
    GxDesktopHeader,
    NewSaleFrequentConcept,
    GxIcon,
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
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.frequentItems
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      concepts: null,
      company: null,
      textInput: this.$route.query.searchTerm || '',
      searchFocus: false,
    }
  },
  methods: {
    toSaleConcept() {
      this.$router.gxAnim = 'slide-right'
      this.$router.replace({
        name: 'saleconcept',
      })
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    ref="LayoutWebMobile"
    :has-search="concepts && concepts.list.length > 0"
    icon="keyboard_backspace"
    title="Selecciona un concepto frecuente"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    no-horizontal-padding
    :with-padding-bottom="false"
    placeholder="Buscar concepto"
    :icon-click-handler="toSaleConcept"
    @search="textInput = $event"
  >
    <GxDesktopHeader
      v-if="$mq === 'de'"
      class="px-8"
      header="Selecciona un concepto frecuente"
      icon="keyboard_backspace"
      :icon-click-handler="toSaleConcept"
    />
    <div
      v-if="concepts && concepts.list.length > 0 && $mq === 'de'"
      class="flex justify-end mb-2 pr-8"
    >
      <label
        for="searchConcept"
        class="flex items-center pb-1 relative w-40 overflow-hidden de:gx-caption border-b"
        :class="{
          'border-primary-500': searchFocus,
          'border-gray-700': !searchFocus,
        }"
      >
        <GxIcon
          key="search"
          icon="search"
          :class="{
            'text-primary-500': searchFocus,
            'text-gray-700': !searchFocus,
          }"
        />
        <input
          id="searchConcept"
          v-model="textInput"
          class="pl-2 search-input focus:outline-none flex-grow"
          placeholder="Buscar concepto"
          label="Buscar concepto"
          type="text"
          @blur="searchFocus = false"
          @focus="searchFocus = true"
        />
        <button
          v-if="textInput"
          class="de:gx-caption flex  cursor-pointer z-1"
          @click.stop.prevent.exact="textInput = ''"
        >
          <GxIcon key="close" icon="close" />
        </button>
      </label>
    </div>
    <NewSaleFrequentConcept :search="textInput" />
  </LayoutWebMobile>
</template>

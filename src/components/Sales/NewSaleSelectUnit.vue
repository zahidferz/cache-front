<script>
// import axios from 'axios'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import GxInfiniteScrollStatic from '@components/_Core/Utils/GxInfiniteScrollStatic.vue'
import sortBy from 'lodash/sortBy'
import NewSaleUnitCard from '@components/Sales/NewSaleUnitCard.vue'
import VirtualList from 'vue-virtual-scroll-list'
import GxDivider from '@components/_Core/Dividers/GxDivider.vue'
import satUnits from '@src/assets/Catalogos/CAT_005_MEX_CFDI_Unidades.json'
var orderedSatUnits = sortBy(satUnits, ['unit'])

export default {
  name: 'NewSaleSelectUnit',
  components: {
    GxLoader,
    GxDivider,
    GxInfiniteScrollStatic,
    NewSaleUnitCard,
    VirtualList,
  },
  props: {
    searchTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      scrollElement: null,
      loadingSearch: false,
      unitList: Object.freeze(orderedSatUnits),
    }
  },
  watch: {
    searchTerm() {
      this.loadingSearch = true
      this.$nextTick(() => {
        this.loadingSearch = false
      })
    },
  },
  mounted() {
    this.scrollElement =
      document.getElementById('mobileMainContent') ||
      document.getElementById('gxDeMainNotStickyElement')
  },
}
</script>
<template>
  <div class="de:px-8 pb-4 flex flex-grow flex-col flex">
    <GxInfiniteScrollStatic
      v-if="unitList"
      :list="unitList"
      :search-keys="['unit', 'code']"
      :search-term="searchTerm"
      :page-size="100"
      class="flex flex-col flex-grow"
      component="ul"
    >
      <template slot-scope="{ loading, listData }">
        <div
          v-if="listData.length === 0"
          class="flex-grow flex flex-col justify-center items-center"
        >
          <img
            :src="$utils.alertImages.NoResultsFound"
            alt="No encontramos conceptos relacionados con tu búsqueda"
            class="mb-8"
          />
          <p class="gx-h4 mx-4 text-center"
            >No encontramos resultados relacionados a tu búsqueda.</p
          >
        </div>
        <VirtualList
          v-else
          ref="virtualList"
          :size="48"
          :remain="listData.length"
          :scrollelement="scrollElement"
          class="flex flex-grow flex-col overflow-hidden"
          :variable="true"
        >
          <div v-for="(unit, index) of listData" :key="unit.code">
            <p
              v-if="
                index !== 0 &&
                  listData[index - 1].unit
                    .trim()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .charAt(0) !==
                    listData[index].unit
                      .trim()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .toLowerCase()
                      .charAt(0)
              "
              class="bg-gray-100 text-gray-400 px-4  py-2 flex items-center gx-caption de:gx-caption font-bold uppercase"
              >{{ listData[index].unit.trim().charAt(0) }}</p
            >
            <p
              v-if="index === 0"
              class="bg-gray-100 text-gray-400 px-4  py-2 flex items-center gx-caption de:gx-caption font-bold uppercase"
              >{{ listData[index].unit.charAt(0) }}</p
            >
            <NewSaleUnitCard :item="unit" />
            <GxDivider />
          </div>
        </VirtualList>
        <GxLoader v-if="loading || loadingSearch" />
      </template>
    </GxInfiniteScrollStatic>
    <GxLoader v-if="!unitList" />
  </div>
</template>

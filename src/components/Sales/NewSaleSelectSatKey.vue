<script>
// import axios from 'axios'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import GxInfiniteScrollStatic from '@components/_Core/Utils/GxInfiniteScrollStatic.vue'
import NewSaleSatKeyCard from '@components/Sales/NewSaleSatKeyCard.vue'
import VirtualList from 'vue-virtual-scroll-list'
import GxDivider from '@components/_Core/Dividers/GxDivider.vue'
import orderedSatKeys from '@src/assets/Catalogos/CAT_006_MEX_CFDI_Clave_de_producto_o_Servicio.json'
// original file '@src/assets/Catalogos/CAT_006_MEX_CFDI_Clave_de_producto_o_Servicio-old.json'

export default {
  name: 'NewSaleSelectSatKey',
  components: {
    GxLoader,
    GxDivider,
    GxInfiniteScrollStatic,
    NewSaleSatKeyCard,
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
      satKeyList: Object.freeze(orderedSatKeys),
      scrollElement: null,
      loadingSearch: false,
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
  <div class="de:px-8 pb-4 flex-grow flex-col flex">
    <GxInfiniteScrollStatic
      v-if="satKeyList"
      :list="satKeyList"
      :search-keys="['d', 'c']"
      :search-term="searchTerm"
      :page-size="100"
      class="flex flex-grow flex-col"
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
          :variable="true"
        >
          <div v-for="(satKey, index) of listData" :key="satKey.c">
            <p
              v-if="
                index !== 0 &&
                  listData[index - 1].d
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase()
                    .charAt(0) !==
                    listData[index].d
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                      .toLowerCase()
                      .charAt(0)
              "
              class="bg-gray-100 text-gray-400 px-4  py-2 flex items-center gx-caption de:gx-caption font-bold uppercase"
              >{{ listData[index].d.charAt(0) }}</p
            >
            <p
              v-if="index === 0"
              class="bg-gray-100 text-gray-400 px-4  py-2 flex items-center gx-caption de:gx-caption font-bold uppercase"
              >{{ listData[index].d.charAt(0) }}</p
            >
            <NewSaleSatKeyCard class="px-4" :item="satKey" />
            <GxDivider />
          </div>
        </VirtualList>
        <GxLoader v-if="loading || loadingSearch" />
      </template>
    </GxInfiniteScrollStatic>
    <GxLoader v-if="!satKeyList" />
  </div>
</template>

<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxIcon from '@components/_Core/Icons/GxIcon'
import MySales from '@components/Sales/MySales'
export default {
  name: 'MySalesView',
  page: {
    title: 'Mis ventas',
    meta: [{ name: 'Mis ventas', content: 'Mis ventas' }],
  },
  components: {
    LayoutWebMobile,
    GxDesktopHeader,
    GxIcon,
    MySales,
  },
  data() {
    return {
      searchTerm: '',
      startDate: '',
      endDate: '',
    }
  },
  created() {
    if (localStorage.getItem('gx-sales-search-text')) {
      this.searchTerm = localStorage.getItem('gx-sales-search-text')
      localStorage.removeItem('gx-sales-search-text')
    }
  },
  beforeDestroy() {
    if (this.searchTerm) {
      localStorage.setItem('gx-sales-search-text', this.searchTerm)
    }
  },
  methods: {
    toSalesDownload() {
      this.$router.push({
        name: 'mySalesDownload',
        query: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
      })
    },
    goToSalesDashboard() {
      this.$router.gxAnim = 'slide-right'
      this.$router.push({ name: 'salesDashboard' })
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    icon="keyboard_backspace"
    :icon-click-handler="goToSalesDashboard"
    has-search
    title="Mis ventas"
    @search="searchTerm = $event"
  >
    <template slot="topbar-right">
      <GxIcon
        html-tag="button"
        class="mr-4"
        style="font-size:1.25rem"
        icon="download"
        @click="toSalesDownload"
      />
    </template>
    <GxDesktopHeader
      v-if="$mq === 'de'"
      header="Mis ventas"
      icon="keyboard_backspace"
      :icon-click-handler="goToSalesDashboard"
    >
      <template v-slot:right>
        <GxButton
          class="ml-auto w-38"
          variant
          @click="$router.push({ name: 'newsalechooseclient' })"
        >
          <p class="flex items-center">
            <GxIcon icon="add" class="mr-2" />
            <span>VENTA</span>
          </p>
        </GxButton>
      </template>
    </GxDesktopHeader>
    <MySales
      :search-term="searchTerm"
      @startDate="startDate = $event"
      @endDate="endDate = $event"
    />
  </LayoutWebMobile>
</template>

<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import SalesDashboard from '@components/Sales/SalesDashboard'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'SalesDashboardView',
  components: {
    LayoutWebMobile,
    SalesDashboard,
    GxDesktopSearchInput,
    GxDesktopHeader,
    GxIcon,
  },
  data() {
    return {
      searchTerm: '',
      shortcutsDesk: [
        {
          label: 'venta',
          to: { name: 'newsalechooseclient' },
          isDefault: true,
        },
      ],
    }
  },
  created() {
    if (this.$route.query.searchTerm) {
      this.searchTerm = this.$route.query.searchTerm
      this.$router.push({
        query: Object.assign({}),
      })
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    breadcrumb
    icon-class-without-scroll="text-black"
    :icon-click-handler="goToDashboard"
    icon-class-with-scroll="text-black"
    icon="local_offer"
    placeholder="Buscar venta..."
    has-search
    title="Ventas"
    :search-term="searchTerm"
    @search="searchTerm = $event"
  >
    <GxDesktopHeader
      v-if="$mq === 'de'"
      icon="local_offer"
      style="margin-bottom:0"
      header="Ventas "
    >
      <template v-slot:right>
        <GxButton
          class="ml-auto w-38"
          variant
          @click="$router.push({ name: 'newsalechooseclient' })"
        >
          <p class="flex items-center">
            <GxIcon icon="add" class="mr-2" />
            <span class="font-bold">VENTA</span>
          </p>
        </GxButton>
      </template>
    </GxDesktopHeader>
    <GxDesktopSearchInput
      v-if="$mq === 'de'"
      v-model="searchTerm"
      label="Buscar venta..."
      class="ml-auto mt-4 mb-8"
    />
    <SalesDashboard :search-term="searchTerm" />
  </LayoutWebMobile>
</template>

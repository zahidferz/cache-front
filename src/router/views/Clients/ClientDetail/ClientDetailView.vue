<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxIcon from '@components/_Core/Icons/GxIcon'
import Detail from '@components/Clients/ClientDetail'
import { CLIENT_DETAIL_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
export default {
  name: 'ClientDetailView',
  components: {
    LayoutWebMobile,
    GxIcon,
    Detail,
  },
  apollo: {
    company: LOCAL_COMPANY,
    clientInfo: {
      query: CLIENT_DETAIL_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
          year: this.searchedYear,
          branchNumber: this.company.branchNumber,
          clientId: this.$route.params.clientId,
        }
      },
      fetchPolicy: 'cache-and-network',
      update(data) {
        return data.myAccount.companies[0].company.clients.list[0]
      },
      skip() {
        return (
          !this.company || !this.company.number || !this.company.branchNumber
        )
      },
    },
  },
  data() {
    return {
      company: null,
      clientInfo: null,
      searchedYear: new Date().getFullYear(),
      searchTerm: '',
    }
  },
  methods: {
    refetchQueries() {
      this.$apollo.queries.clientInfo.refetch()
    },
    goBack() {
      this.$router.push({
        name: 'myclients',
      })
    },
    newSale() {
      localStorage.removeItem('newSale--concepts')
      localStorage.removeItem('newSale--saleInfo')
      localStorage.removeItem('newSale--saleInfoObject')
      localStorage.removeItem('newSale--addtionalDataInfo')
      this.$router.push({
        name: 'newsalewithclient',
        params: { clientId: this.$route.params.clientId },
      })
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    v-if="$mq === 'mo'"
    :title="clientInfo ? clientInfo.commercialName : ''"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    :icon="clientInfo ? 'keyboard_backspace' : ''"
    :icon-click-handler="goBack"
  >
    <template
      v-if="
        clientInfo &&
          clientInfo.commercialName.toLowerCase() !== 'publico general'
      "
      slot="topbar-right"
    >
      <GxIcon
        html-tag="button"
        class="fontSize"
        icon="visibility"
        data-testid="visibility"
        @click="
          () =>
            $router.push({
              name: 'clientgeneralinfo',
              params: this.$route.params.clientId,
            })
        "
      />
    </template>

    <Detail :client-info="clientInfo" />
    <GxFab
      v-if="clientInfo && clientInfo.status === 'active'"
      mini
      icon="add"
      class="shadow-2 fixed gxFixedFab z-1"
      label="crear nuevo cliente"
      @click="newSale"
    />
  </LayoutWebMobile>
  <div v-else class="pb-4 px-8 flex flex-grow flex-col">
    <header v-if="clientInfo" class="items-center flex w-full">
      <h1 class="font-bold gx-h5 flex flex-grow items-center">
        <GxIcon
          icon="keyboard_backspace"
          class="mr-4 cursor-pointer"
          @click="$router.push({ name: 'myclients' })"
        />
        {{ clientInfo ? clientInfo.commercialName : 'Detalle' }}</h1
      >
      <GxButton
        v-if="clientInfo.status === 'active'"
        class="ml-auto w-38"
        variant
        @click="newSale"
      >
        <p class="flex items-center">
          <GxIcon icon="add" class="mr-4" />
          <span>VENTA</span>
        </p>
      </GxButton>
    </header>
    <Detail :client-info="clientInfo" @refetch="refetchQueries" />
  </div>
</template>
<style lang="scss" scoped>
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
.fontSize {
  font-size: 1.25rem;
}
</style>

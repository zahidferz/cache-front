<script>
import GxClientCard from '@components/_Core/Cards/GxClientCard'
import GxSwipe from '@components/_Core/Utils/GxSwipe.vue'
import Observer from '@components/_Core/Utils/Observer'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
import NewSaleUpdatePostalCode from '@components/Sales/NewSaleUpdatePostalCode'
import {
  CLIENTS_SEARCH,
  LOCAL_COMPANY,
  COMPANY_INFO,
} from '@src/apollo/queries'
export default {
  name: 'NewSaleChooseClient',
  components: {
    GxClientCard,
    GxSwipe,
    GxLoader,
    Observer,
    NewSaleUpdatePostalCode,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
    },
    clients: {
      query() {
        return CLIENTS_SEARCH
      },
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          companyNumber: this.company.number,
          where: {
            searchText: this.search,
            clientStatusArray: ['active'],
          },
          page: 1,
          size: this.pageSize,
          options: this.search
            ? null
            : { withDefaultClientsForCountryCode: 'MEX' },
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.clients
      },
      skip() {
        return !this.company
      },
    },
  },
  props: {
    search: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      generalPublicImage: require('@src/assets/images/Sales/de_007_2_publicoengeneral.svg'),
      myAccount: null,
      company: null,
      clients: null,
      noMoreResultsForOrderedClients: false,
      page: 1,
      pageSize: 50,
    }
  },
  computed: {
    hasPostalCode() {
      if (this.myAccount) {
        return !!this.myAccount.companies[0].company.fiscalAddress.postalCode
      }
      return false
    },
    hasTaxRegime() {
      if (this.myAccount) {
        return (
          !!this.myAccount.companies[0].company.companyDataLocalized
            .regimenFiscalCodigo ||
          !!this.myAccount.companies[0].company.companyDataLocalized
            .regimenFiscalNombre
        )
      }
      return null
    },
    genericClients() {
      if (this.clients && !this.search) {
        const client = this.clients.list.filter(({ commercialName }) => {
          return (
            commercialName === 'Cliente Extranjero' ||
            commercialName === 'Público General' ||
            commercialName === 'Publico General'
          )
        })
        return client
      }
      return null
    },
    noGenericClients() {
      if (this.clients) {
        const genericNames = [
          'Cliente Extranjero',
          'Público General',
          'Publico General',
        ]
        return this.clients.list.filter(
          ({ commercialName }) => !genericNames.includes(commercialName)
        )
      }
      return null
    },
  },
  watch: {
    search() {
      this.page = 1
      this.clients = null
    },
    page(newValue) {
      this.$apollo.queries.clients.fetchMore({
        variables: {
          page: newValue,
          size: this.pageSize,
          searchText: this.search,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newClients =
            fetchMoreResult.myAccount.companies[0].company.clients.list
          previousResult.myAccount.companies[0].company.clients.list = [
            ...previousResult.myAccount.companies[0].company.clients.list,
            ...newClients,
          ]
          return previousResult
        },
      })
    },
  },
  methods: {
    goToClientDetail(clientId) {
      return () => {
        this.$router.push({
          name: 'clientData',
          params: { clientId },
        })
      }
    },
    newSale(clientId) {
      localStorage.removeItem('newSale--saleInfo')
      localStorage.removeItem('newSale--saleInfoObject')
      localStorage.removeItem('newSale--addtionalDataInfo')
      localStorage.removeItem('newSale--concepts')
      localStorage.removeItem('newSale--saleDataInput')
      localStorage.removeItem('newSale--pdf')
      localStorage.removeItem('newSale--saleId')
      this.$router.push({ name: 'newsalewithclient', params: { clientId } })
    },
    createNewClient() {
      this.$router.push({ name: 'createnewclient', query: { newSale: true } })
    },
  },
}
</script>
<template>
  <div
    v-if="
      (!noGenericClients || !genericClients) && $apollo.queries.clients.loading
    "
    class="flex flex-grow flex-col justify-center items-center"
  >
    <GxLoader />
  </div>
  <div v-else class="flex-grow flex flex-col  w-screen de:w-full de:mb-4">
    <section
      v-if="
        !search &&
          noGenericClients &&
          noGenericClients.length > 0 &&
          genericClients
      "
    >
      <p
        class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
        :class="{ gxHeaders: $mq === 'de' }"
        >Público en general</p
      >
      <GxClientCard
        v-for="genericClient in genericClients"
        :key="genericClient.commercialName"
        :commercial-name="genericClient.commercialName"
        :tax-id="genericClient.taxId"
        :avatar-url="generalPublicImage"
        :recient-activity-status="genericClient.lastActivityStatus"
        class="cursor-pointer border-b border-gray-200"
        @click="newSale(genericClient.clientId)"
      />
    </section>
    <ul v-if="noGenericClients" class="mb-20">
      <p
        v-if="search && clients"
        class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
        :class="{ gxHeaders: $mq === 'de' }"
        >RESULTADOS DE LA BUSQUEDA</p
      >
      <li
        v-for="(client, index) in noGenericClients"
        :key="client.clientId"
        :class="{ 'mb-2': index === noGenericClients.length - 1 }"
      >
        <p
          v-if="!search && clients && clients.list.length > 0 && index === 0"
          class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
          :class="{ gxHeaders: $mq === 'de' }"
          >{{ noGenericClients[0].commercialName.charAt(0) }}</p
        >
        <p
          v-else-if="
            !search &&
              clients &&
              clients.list.length > 0 &&
              client.commercialName.charAt(0).toLowerCase() !==
                noGenericClients[index - 1].commercialName
                  .charAt(0)
                  .toLowerCase()
          "
          class="bg-gray-100 text-gray-400 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
          :class="{ gxHeaders: $mq === 'de' }"
          >{{ noGenericClients[index].commercialName.charAt(0) }}</p
        >
        <GxClientCard
          v-if="$mq === 'de'"
          :commercial-name="client.commercialName"
          :tax-id="client.taxId"
          class="border-b border-gray-200 cursor-pointer de:hover:bg-gray-200 de:active:bg-secondary-50"
          :avatar-url="client.avatarURL"
          :recient-activity-status="client.lastActivityStatus"
          show-icon-eye
          :color-number="client.color"
          :icon-click-handler="goToClientDetail(client.clientId)"
          @click="newSale(client.clientId)"
        />
        <GxSwipe v-if="$mq === 'mo'">
          <GxClientCard
            :commercial-name="client.commercialName"
            :tax-id="client.taxId"
            class="border-b border-gray-200 cursor-pointer de:hover:bg-gray-200 de:active:bg-secondary-50"
            :avatar-url="client.avatarURL"
            :color-number="client.color"
            :recient-activity-status="client.lastActivityStatus"
            show-icon-eye
            @click="newSale(client.clientId)"
          />
          <template v-slot:right>
            <GxTextLink
              class="flex justify-center items-center px-4 bg-primary text-white"
              :to="{
                name: 'clientgeneralinfo',
                params: { clientId: client.clientId },
              }"
            >
              Ver detalle
            </GxTextLink>
          </template>
        </GxSwipe>
      </li>
      <Observer
        v-if="clients.list.length < clients.size"
        :loading="$apollo.queries.clients.loading"
        class="w-full flex justify-center mt-4"
        @load="page++"
      />
    </ul>
    <div
      v-if="
        (noGenericClients && noGenericClients.length === 0) ||
          (noGenericClients && noGenericClients.length === 0 && search)
      "
      class="flex-grow flex flex-col items-center"
      :class="{ 'justify-center': $mq === 'de' }"
    >
      <img
        :src="$utils.alertImages.NoResultsFound"
        alt="No encontramos clientes relacionados con tu búsqueda"
        width="176"
        height="176"
        class="mb-8 self-center"
        :class="{ 'mt-8': $mq === 'mo' }"
      />
      <h1 class="gx-h4  text-center px-8"
        >No encontramos clientes relacionados con tu búsqueda</h1
      >
    </div>
    <GxFab
      :large="$mq === 'de'"
      :mini="$mq === 'mo'"
      icon="add"
      class="shadow-2 fixed gxFixedFab z-1"
      label="crear nuevo cliente"
      @click="createNewClient"
    />
    <NewSaleUpdatePostalCode v-if="!hasPostalCode || !hasTaxRegime" />
  </div>
</template>
<style lang="scss" scoped>
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
.gxHeaders {
  line-height: 0.75rem;
}
</style>

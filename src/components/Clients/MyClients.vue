<script>
import GxClientCard from '@components/_Core/Cards/GxClientCard'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo.vue'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxLoader from '@components/_Core/Utils/GxLoader.vue'
// import GxIcon from '@components/_Core/Icons/GxIcon.vue'
import { startOfDay, subDays } from 'date-fns'

import { CLIENTS_SEARCH } from '@src/apollo/queries'
import gql from 'graphql-tag'

export default {
  name: 'MyClients',
  components: {
    GxClientCard,
    GxDivider,
    GxInfiniteScrollApollo,
    GxLoader,
    // GxIcon,
    GxCardModal,
  },
  props: {
    activeTab: {
      type: String,
      default: 'recent',
    },
    searchTerm: {
      type: String,
      default: '',
    },
    scrolled: {
      type: Boolean,
      default: false,
    },
    pendingPayment: {
      type: Boolean,
      required: true,
    },
  },
  inject: ['topBarSearch'],
  apollo: {
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
  },
  data() {
    return {
      error: null,
      generalPublicImage: require('@src/assets/images/Sales/de_007_2_publicoengeneral.svg'),
      skipMyAccountQuery: true,
      clientsSearchQuery: CLIENTS_SEARCH,
      activateKey: 0,
    }
  },
  computed: {
    companyNumber() {
      return this.company ? this.company.number : null
    },
    clientsSearchQueryVariables() {
      return {
        companyNumber: this.companyNumber,
        where: {
          searchText: this.searchTerm,
          pendingPayment: this.pendingPayment,
        },
      }
    },
    clientsOrderedQueryVariables() {
      return {
        companyNumber: this.companyNumber,
        where: {
          pendingPayment: this.pendingPayment,
        },
        options: { withDefaultClientsForCountryCode: 'MEX' },
      }
    },
    clientsWithRecentActivityQueryVariables() {
      return {
        companyNumber: this.companyNumber,
        where: {
          recentActivityStartDate: startOfDay(subDays(new Date(), 30)),
          pendingPayment: this.pendingPayment,
        },
        options: { withDefaultClientsForCountryCode: 'MEX' },
      }
    },
  },
  activated() {
    this.activateKey += 1
    if (this.lastScroll) {
      if (this.$mq === 'de' && document.getElementById('gxDeMain')) {
        document.getElementById('gxDeMain').scrollTop = this.lastScroll
      }
      if (this.$mq === 'mo') {
        window.scrollY = this.lastScroll
      }
      this.lastScroll = null
    }
  },
  methods: {
    onNoOrderedClients(noResults) {
      if (this.pendingPayment) return
      this.$emit('noResults', noResults)
    },
    goToClientDetail(id) {
      // Save clicked item to scroll to when user returns to list
      if (this.$mq === 'de' && document.getElementById('gxDeMain')) {
        this.lastScroll = document.getElementById('gxDeMain').scrollTop
      }
      if (this.$mq === 'mo') {
        this.lastScroll = window.scrollY
      }

      this.$router.push({ name: 'clientData', params: { clientId: id } })
    },
    extractDataFn(data) {
      return data.myAccount.companies[0].company.clients.list
    },
    updateDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].company.clients.list = [
        ...dataToUpdate.myAccount.companies[0].company.clients.list,
        ...newData.myAccount.companies[0].company.clients.list,
      ]
      return dataToUpdate
    },
    normalizeText(text) {
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
    isGenericClient(client) {
      return (
        this.normalizeText(client.commercialName).toLowerCase() ===
        'publico general'
      )
    },
    filterClients(listData) {
      try {
        const noCustomClients =
          listData.length === 1 &&
          this.normalizeText(listData[0].commercialName).toLowerCase() ===
            'publico general'
        if (noCustomClients) {
          this.$emit('noResults', true)
          return []
        }
        return listData.slice().sort((a, b) => {
          if (
            this.normalizeText(a.commercialName.toLowerCase()) >
            this.normalizeText(b.commercialName.toLowerCase())
          ) {
            return 1
          }
          if (
            this.normalizeText(a.commercialName.toLowerCase()) <
            this.normalizeText(b.commercialName.toLowerCase())
          ) {
            return -1
          }
          return 0
        })
      } catch (error) {
        /* eslint-disable */
        console.log({ error })
        console.log(listData)
        /* eslint-enable */
      }
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col">
    <!-- Resultados de búsqueda -->
    <section v-if="searchTerm" class="flex-grow flex flex-col">
      <p
        class="bg-gray-100 text-gray-500 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
        :class="{ gxHeaders: $mq === 'de' }"
        >Resultados de la búsqueda</p
      >
      <div class="flex-grow flex flex-col">
        <GxInfiniteScrollApollo
          key="clientsSearchResults"
          :variables="clientsSearchQueryVariables"
          :query="clientsSearchQuery"
          :extract-data-fn="extractDataFn"
          :update-data-fn="updateDataFn"
          class="flex-grow flex flex-col"
        >
          <template slot-scope="{ loading, listData }">
            <div v-for="client in listData" :key="client.commercialName">
              <GxClientCard
                class="cursor-pointer"
                :commercial-name="client.commercialName"
                :business-name="client.businessName"
                :tax-id="client.taxId"
                :recient-activity-status="client.lastActivityStatus"
                :avatar-url="
                  isGenericClient(client)
                    ? generalPublicImage
                    : client.avatarUrl
                "
                :color-number="client.color"
                @click="goToClientDetail(client.clientId)"
              />
              <GxDivider />
            </div>

            <GxLoader v-if="loading" class="py-4" />
            <!-- Sin resultados de búsqueda, actualizar con resultados de query -->
            <div
              v-if="!loading && listData.length === 0"
              class="flex-grow flex flex-col justify-center items-center"
            >
              <img
                :src="$utils.alertImages.NoResultsFound"
                alt="No encontramos resultados relacionados con tu búsqueda"
                width="176"
                height="176"
                class="my-8 self-center"
              />
              <h1 class="gx-h4  text-center px-8"
                >No encontramos resultados relacionados con tu búsqueda</h1
              >
            </div>
          </template>
        </GxInfiniteScrollApollo>
      </div>
    </section>
    <!-- clientes recientes  -->
    <section
      v-show="!searchTerm && activeTab === 'recent' && $mq === 'de'"
      id="recentClients"
      ref="recentClientsContainer"
      class="flex flex-col"
    >
      <GxInfiniteScrollApollo
        :key="'clientsWithRecentActivity' + activateKey"
        :variables="clientsWithRecentActivityQueryVariables"
        :query="clientsSearchQuery"
        :extract-data-fn="extractDataFn"
        :update-data-fn="updateDataFn"
        :limit="10"
        @noResults="$emit('recentActivityResults', $event)"
      >
        <template slot-scope="{ loading, listData }">
          <!-- Clients with recent activity NOT FOUND -->
          <!-- <p
            v-if="listData.length > 0"
            class="bg-gray-100 text-gray-500 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
            :class="{ gxHeaders: $mq === 'de' }"
            >Recientes</p
          > -->
          <!-- <div
            v-if="!loading && listData.length === 0"
            ref="recentActivityClientsEmpty"
            class="px-4 py-2 py-8 flex items-center gx-caption de:gx-caption justify-center font-bold"
          >
            <GxIcon icon="timer" class="mr-2 my-1" />
            <p>Ninguno de tus clientes ha tenido actividad reciente.</p>
          </div> -->
          <!-- <div v-else-if="loading" class="flex-grow flex justify-center py-4">
            <GxLoader />
          </div> -->
          <template v-if="listData.length > 0">
            <div
              v-for="client in filterClients(listData)"
              :id="client.clientId"
              :key="client.commercialName"
            >
              <GxClientCard
                class="cursor-pointer"
                :commercial-name="client.commercialName"
                :business-name="client.businessName"
                :tax-id="client.taxId"
                :recient-activity-status="client.lastActivityStatus"
                :avatar-url="
                  isGenericClient(client)
                    ? generalPublicImage
                    : client.avatarUrl
                "
                :color-number="client.color"
                @click="goToClientDetail(client.clientId)"
              />
              <GxDivider />
            </div>
          </template>
          <GxLoader v-if="loading" class="py-4" />
        </template>
      </GxInfiniteScrollApollo>
    </section>
    <!-- lista de todos los clientes -->
    <section
      v-show="!searchTerm && (activeTab === 'all' || $mq === 'mo')"
      id="clientList"
      ref="allClientsContainer"
    >
      <GxInfiniteScrollApollo
        :key="'clientsOrdered' + activateKey"
        :variables="clientsOrderedQueryVariables"
        :query="clientsSearchQuery"
        :extract-data-fn="extractDataFn"
        :update-data-fn="updateDataFn"
        @noResults="onNoOrderedClients"
      >
        <template slot-scope="{ loading, listData }">
          <div>
            <p
              v-if="!scrolled && $mq === 'mo' && listData.length > 1"
              class="text-gray-500 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
              :class="{ gxHeaders: $mq === 'de' }"
            >
              Todos
            </p>
            <template v-if="listData.length > 0">
              <div
                v-for="(client, index) in filterClients(listData)"
                :key="client.commercialName"
              >
                <p
                  v-if="
                    index !== 0 &&
                      normalizeText(
                        filterClients(listData)[index - 1].commercialName
                      )
                        .toLowerCase()
                        .charAt(0) !==
                        normalizeText(
                          filterClients(listData)[index].commercialName
                        )
                          .toLowerCase()
                          .charAt(0)
                  "
                  class="bg-gray-100 text-gray-500 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
                  :class="{ gxHeaders: $mq === 'de' }"
                  >{{
                    filterClients(listData)[index].commercialName.charAt(0)
                  }}</p
                >
                <p
                  v-if="index === 0"
                  class="bg-gray-100 text-gray-500 px-4  de:py-2 py-1 flex items-center gx-caption de:gx-caption font-bold uppercase"
                  :class="{ gxHeaders: $mq === 'de' }"
                  >{{ client.commercialName.charAt(0) }}</p
                >
                <GxClientCard
                  class="cursor-pointer"
                  :commercial-name="client.commercialName"
                  :business-name="client.businessName"
                  :tax-id="client.taxId"
                  :recient-activity-status="client.lastActivityStatus"
                  :avatar-url="
                    isGenericClient(client)
                      ? generalPublicImage
                      : client.avatarUrl
                  "
                  :color-number="client.color"
                  @click="goToClientDetail(client.clientId)"
                />
                <GxDivider />
              </div>
            </template>
          </div>
          <div
            v-if="
              filterClients(listData).length === 0 &&
                !loading &&
                !pendingPayment
            "
            class="flex-grow flex flex-col items-center de:mt-16"
          >
            <p
              v-if="$mq === 'de'"
              class="text-3xl de:2xl leading-none tracking-normal text-center px-8 mb-8 mt-8 de:mt-0"
              >Aún no tienes ningún cliente.<br />Crea el primero desde el botón
              de arriba</p
            >
            <p
              v-else
              class="text-3xl de:2xl leading-none tracking-normal text-center px-4 my-8"
              >Aún no tienes ningún <br />
              cliente.<br />Crea el primero desde el +</p
            >
            <img
              src="@assets/images/Clients/Misclientes/de_005_3_descargarclientes.svg"
              width="337"
              alt="No encontramos clientes relacionados con tu búsqueda"
              class="self-center"
            />
          </div>
          <div
            v-else-if="!loading && pendingPayment && listData.length === 0"
            class="flex-grow flex flex-col justify-center items-center"
          >
            <img
              :src="$utils.alertImages.NoResultsFound"
              alt="No encontramos resultados relacionados con tu búsqueda"
              width="176"
              height="176"
              class="my-8 self-center"
            />
            <h1 class="gx-h4  text-center px-8"
              >No encontramos resultados relacionados con tu búsqueda</h1
            >
          </div>
          <GxLoader v-if="loading" class="py-4" />
        </template>
      </GxInfiniteScrollApollo>
    </section>
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
      @click="error = null"
      @close="error = null"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxHeaders {
  line-height: 0.75rem;
}
</style>

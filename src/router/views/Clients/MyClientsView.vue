<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxSwitch from '@components/_Core/Forms/GxSwitch'
import MyClients from '@components/Clients/MyClients'
import GxTabs from '@components/_Core/Navigation/GxTabs'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxCheckbox from '@components/_Core/Forms/GxCheckbox'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
import { CLIENT_SEND_CSV_FILE_EMAIL } from '@src/apollo/mutations'
import { LOCAL_COMPANY } from '@src/apollo/queries'
import debounce from 'lodash/debounce'
import gql from 'graphql-tag'

export default {
  name: 'MyClientsView',
  components: {
    LayoutWebMobile,
    GxSwitch,
    GxCardModal,
    MyClients,
    GxIcon,
    GxTabs,
    GxCheckbox,
    GxDesktopSearchInput,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: gql`
        query USER_EMAIL {
          myAccount {
            email
          }
        }
      `,
    },
  },
  data() {
    return {
      noResults: false,
      disabledRecentTab: false,
      textSearch: '',
      activeTab: 'recent',
      textInput: '',
      shortcutsDesk: [
        {
          label: 'cliente',
          to: { name: 'createnewclient' },
          isDefault: true,
        },
        {
          label: 'Descargar todos mis clientes',
          action: () => {
            this.downloadClients = !this.downloadClients
          },
          to: null,
          isDefault: false,
        },
      ],
      debounceUpdateSearchTerm: null,
      pendingBalance: false,
      donwloadClientsImg: require('@assets/images/Clients/Misclientes/de_005_3_descargarclientes.svg'),
      downloadClients: false,
      downloadingClients: false,
      downloadCompleted: false,
      downloadedImg: require('@assets/images/Clients/Misclientes/de_005_csvenviado.svg'),
      scrolled: false,
      tabs: [
        {
          label: 'Recientes',
          name: 'recent',
        },
        {
          label: 'Todos',
          name: 'all',
        },
      ],
      error: null,
    }
  },
  computed: {
    modalTextBody() {
      return `Enviaremos un correo a ${
        this.myAccount.email
      } con la lista de todos tus clientes.`
    },
  },
  watch: {
    textSearch(newValue) {
      this.textSearch = newValue
    },
    textInput(newValue) {
      this.debounceUpdateSearchTerm(newValue)
    },
    noResults(newValue) {
      if (newValue) {
        this.activeTab = 'all'
      }
    },
  },
  created() {
    this.debounceUpdateSearchTerm = debounce(this.updateTextSearch, 300)
    this.$root.$emit('addToKeepAlive', 'MyClientsView')
  },
  methods: {
    onRecentActivityResults(noResults) {
      this.disabledRecentTab = noResults
      if (!noResults) return
      this.activeTab = 'all'
    },
    updateTextSearch(newString) {
      this.textSearch = newString
    },
    async downloadClientList() {
      this.downloadingClients = true

      try {
        await this.$apollo.mutate({
          mutation: CLIENT_SEND_CSV_FILE_EMAIL,
          variables: {
            companyNumber: this.company.number,
          },
        })
        this.downloadClients = false

        setTimeout(() => {
          this.downloadCompleted = true
        }, 0)
      } catch (error) {
        /* eslint-disable */
        console.log(error)
        this.error = this.$utils.parseServerError(error)
      } finally {
        this.downloadingClients = false
      }
    },
    cancelMobileSearch() {
      this.textInput = ''
      this.mobileSearch = false
    },
    focusMobileSearch() {
      this.$refs.mobileSearch && this.$refs.mobileSearch.focus()
    },
    onCloseMobileSearch() {
      this.textInput = ''
      this.mobileSearch = false
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    v-if="$mq === 'mo'"
    title="Mis clientes"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    :has-search="!noResults"
    placeholder="Buscar cliente"
    breadcrumb
    @scrolled="scrolled = $event"
    @search="textInput = $event"
  >
    <!-- Mobile -->
    <template slot="topbar-right">
      <GxIcon
        icon="get_app"
        class="mr-6 fontSize"
        html-tag="button"
        v-if="!noResults"
        @click.stop="downloadClients = true"
      />
    </template>
    <template v-slot:default="{ hasScrolled, search }">
      <!-- Mobile version filter -->
      <section
        v-if="$mq === 'mo' && !textInput && !noResults"
        class="flex justify-end items-center mx-4 mt-4 mb-4"
      >
        <p>Saldo pendiente</p>
        <GxSwitch v-model="pendingBalance" class="ml-2" />
      </section>
      <MyClients
        :pending-payment="pendingBalance"
        :active-tab="activeTab"
        :scrolled="hasScrolled"
        :search-term="$mq === 'de' ? textSearch : search"
        @noResults="noResults = $event"
        @activeTab="activeTab = $event"
      />
      <GxCardModal
        v-if="downloadClients"
        key="downloadclients"
        headline="Descarga tu lista de clientes"
        :card-img="donwloadClientsImg"
        :text-body="modalTextBody"
        :loading="downloadingClients"
        @close="downloadClients = !downloadClients"
      >
        <template v-slot:actions>
          <div class="flex self-end mt-8">
            <GxButton
              :ghost="$mq === 'de'"
              :plain="$mq === 'mo'"
              class="text-alert de:text-white mr-4 de:border-white"
              @click="downloadClients = !downloadClients"
              >No, cancelar</GxButton
            >
            <GxButton
              :ghost="$mq === 'de'"
              :plain="$mq === 'mo'"
              :dark="$mq === 'de'"
              @click="downloadClientList"
              >Sí, enviar</GxButton
            >
          </div>
        </template>
      </GxCardModal>
      <GxCardModal
        v-if="downloadCompleted"
        key="downloadCompleted"
        :card-img="$utils.alertImages.CheckEmail"
        headline="Revisa tu correo"
        text-body="El CSV de tus clientes estará listo en unos minutos. Te llegará un correo con un archivo adjunto."
        @click="downloadCompleted = false"
        @close="downloadCompleted = false"
      />
      <GxCardModal
        v-if="error"
        key="errormodal"
        :headline="error"
        :card-img="$utils.alertImages.Oops"
        :alt="error"
        @click="error = null"
      />
    </template>
  </LayoutWebMobile>
  <div v-else class="px-8">
    <header class=" flex flex-grow mb-4 items-center justify-between">
      <h1 class="gx-h5 text-black font-bold flex items-center">
        <GxIcon icon="contacts" class="mr-4 text-primary" />
        Mis clientes
      </h1>
      <!-- GxButtonWithOptionsComponent -->
      <GxButton
        v-if="noResults"
        class="ml-auto w-38"
        variant
        @click="$router.push({ name: 'createnewclient' })"
      >
        <p class="flex items-center">
          <GxIcon icon="add" class="mr-2 text-xs" />
          <span class="font-bold">CLIENTE</span>
        </p>
      </GxButton>
      <GxButtonWithOptions v-else :options="shortcutsDesk" />
    </header>
    <div v-if="!noResults" class="flex flex-col border-t  border-gray-200">
      <div class="flex self-end py-2 h-8 items-center">
        <div class="flex justify-center mr-8 "
          ><GxCheckbox v-model="pendingBalance" input-id="forPendingBalance" />
          <span class="de:gx-caption">Saldo Pendiente</span></div
        >
        <GxDesktopSearchInput v-model="textInput" label="Buscar cliente" />
      </div>
      <div v-if="!textInput" class="border-t pt-2 border-gray-200">
        <GxTabs
          :initial-tab="activeTab"
          :tabs="tabs"
          @activeTab="activeTab = $event"
        />
      </div>
    </div>

    <MyClients
      :pending-payment="pendingBalance"
      :active-tab="activeTab"
      :search-term="$mq === 'de' ? textSearch : search"
      @activeTab="activeTab = $event"
      @noResults="noResults = $event"
      @recentActivityResults="onRecentActivityResults"
    />

    <GxCardModal
      v-if="downloadClients"
      headline="Descarga tu lista de clientes"
      :card-img="donwloadClientsImg"
      :text-body="modalTextBody"
      :loading="downloadingClients"
      @close="downloadClients = !downloadClients"
    >
      <template v-slot:actions>
        <div class="flex justify-end de:justify-center de:mt-8">
          <GxButton
            :ghost="$mq === 'de'"
            :plain="$mq === 'mo'"
            class="text-alert de:text-primary de:border-primary mr-4"
            @click="downloadClients = !downloadClients"
            >No, cancelar</GxButton
          >
          <GxButton :plain="$mq === 'mo'" @click="downloadClientList"
            >Sí, enviar</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="downloadCompleted"
      :card-img="$utils.alertImages.CheckEmail"
      headline="Revisa tu correo"
      text-body="El CSV de tus clientes estará listo en unos minutos. Te llegará un correo con un archivo adjunto."
      @click="downloadCompleted = !downloadCompleted"
      @close="downloadCompleted = !downloadCompleted"
    />
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
      @click="error = null"
    />
  </div>
</template>
<style lang="scss" scoped>
.fontSize {
  font-size: 1.25rem;
}
</style>

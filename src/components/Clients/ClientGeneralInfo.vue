<script>
import ClientDataInfo from './ClientDataInfo.vue'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import CreateNewClientForm from './CreateNewClientForm'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxIcon from '@components/_Core/Icons/GxIcon'

import ClientSummary from './ClientSummary'
import { CLIENT_GENERAL_INFO, LOCAL_COMPANY } from '@src/apollo/queries'

import gql from 'graphql-tag'

import get from 'lodash/get'
const _ = {
  get,
}

export default {
  name: 'ClientGeneralInfo',
  components: {
    GxIcon,
    ClientDataInfo,
    GxDivider,
    CreateNewClientForm,
    GxCardModal,
    ClientSummary,
  },
  apollo: {
    countries: {
      query: gql`
        query {
          countries {
            countryCode
            country
          }
        }
      `,
    },
    company: {
      query: LOCAL_COMPANY,
    },
    myAccount: {
      query: CLIENT_GENERAL_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          clientId: this.$route.params.clientId,
        }
      },
      fetchPolicy: 'cache-and-network',
      error(err) {
        this.error = this.$utils.parseServerError(err)
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
      clientData: null,
      error: null,
      isNationalClient: null,
      skipCompanyQuery: false,
      contactsList: null,
      bankAccountList: null,
      showEditForm: false,
      totalSalesAmount: null,
      loading: true,
      clientLogo: require('@assets/images/Signup/Alerts/mo_logoselvita.svg'),
      rfcLabel: null,
    }
  },
  computed: {
    fullAddress() {
      return _.get(
        this.myAccount,
        'companies[0].company.clients.list[0].address.fullAddress',
        null
      )
    },
    clientCountry() {
      if (!this.clientData || this.isNationalClient === 'Nacional') return null

      return this.countries.find(
        (c) => c.countryCode === this.clientData.countryCode
      )
    },
  },
  watch: {
    myAccount: {
      handler(newVal) {
        if (newVal) {
          this.refetchValues()
        }
      },
    },
    company: {
      handler(newVal) {
        this.skipCompanyQuery = true
      },
    },
  },
  mounted() {
    window.scrollY = 0
  },
  methods: {
    goBack() {
      if (this.$route.query.from === 'new') {
        this.$router.push({ name: 'myclients' })
      } else {
        this.$router.gxAnim = 'slide-right'
        this.$router.back()
      }
    },
    formatPhone(phone) {
      if (!phone) {
        return ''
      }
      if (
        phone.slice(0, 2) === '55' ||
        phone.slice(0, 2) === '33' ||
        phone.slice(0, 2) === '81'
      ) {
        if (phone.length > 10) {
          return phone.replace(/(\d{2})(\d{4})(\d{4})(\d)/, '($1) $2-$3-$4')
        } else {
          return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        }
      } else {
        if (phone.length > 10) {
          return phone.replace(/(\d{3})(\d{3})(\d{4})(\d)/, '($1) $2-$3-$4')
        } else {
          return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        }
      }
    },
    closeErrorModal() {
      if (this.error === 'Este cliente no existe.') {
        this.$router.push({ name: 'myclients' })
      }
      this.error = null
    },
    updateCompleted() {
      this.showEditForm = false
      this.refetchValues()
      this.$apollo.queries.myAccount.refetch()
    },
    refetchValues() {
      const clientId = this.$route.params.clientId
      const client = this.myAccount.companies[0].company.clients.list.find(
        (c) => c.clientId === clientId
      )
      this.clientData = client
      this.totalSalesAmount = client.totalSalesAmount

      if (this.clientData.countryCode === 'MEX') {
        this.isNationalClient = 'Nacional'
        this.rfcLabel = 'RFC'
      } else {
        this.isNationalClient = 'Extranjero'
        this.rfcLabel = 'Tax ID'
      }
      this.contactsList = this.clientData.contacts.map((contact) => {
        const contactWithFormatedPhones = {
          ...contact,
          formatedPhone: this.formatPhone(contact.phone),
          formatedMobilePhone: this.formatPhone(contact.mobilePhone),
        }
        return contactWithFormatedPhones
      })
      if (this.clientData.bankAccounts) {
        this.bankAccountList = this.clientData.bankAccounts.map((account) => {
          return {
            bank: account.bank.name,
            bankAccount: account.bankAccountNumber,
            clabe: account.bankAccountDataLocalized
              ? account.bankAccountDataLocalized.clabe
              : null,
          }
        })
      } else this.bankAccountList = []
    },
    editable() {
      this.showEditForm = !this.showEditForm
    },
  },
}
</script>
<template>
  <!-- Added width:100vw cause elements werent growing to full width, flex-grow not working -->
  <div class="flex-grow" :class="{ 'w-screen': $mq === 'mo' }">
    <header
      v-if="$mq === 'de' && !showEditForm"
      class="flex self-start items-center  mb-8"
    >
      <!-- <i class="material-icons-round mr-4">keyboard_backspace</i> -->
      <span class="gx-h4 mr-4 flex items-center"
        ><GxIcon
          class="cursor-pointer"
          icon="keyboard_backspace"
          @click="goBack"
      /></span>
      <h4 class="gx-h5 font-bold">Información general</h4>
    </header>
    <header
      v-if="$mq === 'de' && showEditForm"
      class="flex self-start items-center  mb-8"
    >
      <!-- <i class="material-icons-round mr-4">keyboard_backspace</i> -->
      <span class="gx-h4 mr-4 flex items-center"
        ><GxIcon
          class="cursor-pointer"
          icon="keyboard_backspace"
          @click="editable"
      /></span>
      <h4 class="gx-h4 font-bold">Editar información</h4>
    </header>
    <ClientSummary
      v-if="clientData"
      class="px-4 de:px-0"
      :image="clientData.avatarURL"
      :client-name="clientData.commercialName"
      title="Cuentas por cobrar"
      :amount="clientData.totalAccountsReceivableAmount.total"
      :company-number="company.number"
      :currency="clientData.totalAccountsReceivableAmount.currencyCode"
      :client-id="$route.params.clientId"
      :starcount="clientData.starring"
      :color="clientData.color"
      :status="
        myAccount.companies[0].company.clients.list[0].status === 'active'
          ? 'ACTIVO'
          : 'INACTIVO'
      "
      :recient-activity-status="clientData.lastActivityStatus"
    />
    <!-- Section showing the data -->
    <div v-if="!showEditForm" class="flex-grow">
      <section v-if="clientData" class="flex-grow">
        <GxDivider />
        <h1
          class="uppercase h-8 de:h-7 py-2 px-4 flex items-center gx-caption de:gx-caption font-bold text-gray-500 bg-gray-100"
          >Información General</h1
        >
        <GxDivider />
        <div class="flex-grow flex flex-col pt-4 de:pt-5 px-4">
          <p class="self-end flex-grow flex mb-4 de:mb-5 gxTinyTextMo">{{
            isNationalClient
          }}</p>
          <div :class="{ gxGridContainer: $mq === 'de' }">
            <ClientDataInfo
              v-if="clientData.commercialName"
              label="Nombre Comercial"
              icon="store_mall_directory"
              :title="clientData.commercialName"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="clientData.taxId"
              :label="rfcLabel"
              icon="domain"
              :title="clientData.taxId"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="clientData.businessName"
              label="Razón Social"
              icon="business_center"
              :title="clientData.businessName"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="clientCountry"
              label="País"
              :title="clientCountry.country"
              class="mb-8 de:mb-4"
            />
          </div>
        </div>
      </section>
      <section v-if="contactsList && contactsList.length > 0" class="flex-grow">
        <GxDivider />
        <h1
          class="uppercase h-8 de:h-7 py-2 px-4 flex items-center gx-caption de:gx-caption font-bold text-gray-500 bg-gray-100"
          >Datos de contacto</h1
        >
        <GxDivider />

        <div
          v-for="(contact, index) in contactsList"
          :key="contact.email"
          class="flex-grow flex flex-col pt-4 px-4"
        >
          <div :class="{ gxGridContainer: $mq === 'de' }">
            <ClientDataInfo
              v-if="contact.name"
              label="Nombre"
              icon="face"
              :title="contact.name"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="contact.jobTitle"
              label="Puesto"
              icon="business_center"
              :title="contact.jobTitle"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="contact.email"
              label="Correo Electrónico"
              icon="email"
              :title="contact.email"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="contact.mobilePhone"
              label="Celular"
              icon="phone_iphone"
              :title="contact.formatedMobilePhone"
              class="mb-8 de:mb-4"
            />
            <ClientDataInfo
              v-if="contact.phone"
              label="Teléfono"
              icon="phone"
              :title="contact.formatedPhone"
              class="mb-8 de:mb-4"
            />
          </div>
          <GxDivider v-if="index !== contactsList.length - 1" />
        </div>
      </section>
      <section v-if="fullAddress" class="flex-grow">
        <GxDivider />
        <h1
          class="uppercase h-8 de:h-7 py-2 px-4 flex items-center gx-caption de:gx-caption font-bold text-gray-500 bg-gray-100"
          >Dirección Fiscal</h1
        >
        <GxDivider />

        <div class="flex-grow flex flex-col pt-4 px-4">
          <div :class="{ gxGridContainer: $mq === 'de' }">
            <ClientDataInfo
              label="Dirección"
              icon="location_on"
              :title="fullAddress"
              class="mb-8 de:mb-4"
            />
          </div>
        </div>
      </section>
      <section
        v-if="bankAccountList && bankAccountList.length > 0"
        class="mb-8 flex-grow"
        :class="{ 'mt-8': $mq === 'mo' }"
      >
        <GxDivider />
        <h1
          class="uppercase h-8 de:h-7 py-2 px-4 flex items-center gx-caption de:gx-caption font-bold text-gray-500 bg-gray-100"
          >Cuenta Bancaria</h1
        >
        <GxDivider />
        <div
          v-for="(account, index) in bankAccountList"
          :key="account.bankAccountNumber"
          class="flex-grow flex  flex-col pt-4 px-4"
          :class="{ gxGridFlex: $mq === 'de' }"
        >
          <ClientDataInfo
            v-if="account.bank"
            label="Banco"
            :title="account.bank"
            class="mb-8 de:mb-4"
          />
          <ClientDataInfo
            v-if="account.bankAccount"
            label="Cuenta"
            icon="credit_card"
            :title="account.bankAccount"
            class="mb-8 de:mb-4"
          />
          <ClientDataInfo
            v-if="account.clabe"
            label="CLABE"
            icon="vpn_key"
            :title="account.clabe"
            class="mb-8 de:mb-4"
          />
          <GxDivider v-if="index !== bankAccountList.length - 1" />
        </div>
      </section>

      <GxFab
        v-if="
          myAccount &&
            myAccount.companies[0].company.clients.list[0].status === 'active'
        "
        :mini="$mq === 'mo'"
        icon="edit"
        class="shadow-2 fixed gxFixedFab"
        :large="$mq === 'de'"
        label="editar"
        @click="editable"
      />
    </div>
    <!-- Section editing the data -->
    <CreateNewClientForm
      v-if="showEditForm"
      :editing-client-data="clientData"
      @updateCompleted="updateCompleted"
    />
    <GxCardModal
      v-if="error"
      :text-body="error"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
      @click="closeErrorModal"
    />
    <div
      v-if="$apollo.queries.myAccount.loading && !error"
      class="loading rounded-full center"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
.gxTinyTextMo {
  font-size: 0.75rem;
}
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
.gxBigFab {
  width: 3.25rem;
  height: 3.25rem;
}

// Loader
@keyframes spin {
  from {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(0deg);
  }
  to {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(360deg);
  }
}

.loading {
  width: 50px;
  min-width: 50px;
  height: 50px;
  transition: all 0.5s ease-in-out;
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 500ms;
  animation-iteration-count: infinite;
}

.center {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
.gxGridContainer {
  display: grid;
  -template-columns: 1fr 1fr;
}
.gxGridFlex {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>

<script>
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxSwitchText from '@components/_Core/Forms/GxSwitchText'
import GxSwitch from '@components/_Core/Forms/GxSwitch'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import CreateNewClientFormBankAccounts from './CreateNewClientFormBankAccounts'
import CreateNewClientFormBranches from './CreateNewClientFormBranches'
import GxAddressGoogleMaps from '@components/_Core/Forms/GxAddressGoogleMaps'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import { CREATE_NEW_CLIENT, UPDATE_CLIENT } from '@src/apollo//mutations'
import { CLIENT_GENERAL_INFO, LOCAL_COMPANY } from '@src/apollo/queries'

import gql from 'graphql-tag'

export default {
  name: 'CreateNewClientForm',
  components: {
    GxAddressGoogleMaps,
    CreateNewClientFormBankAccounts,
    CreateNewClientFormBranches,
    GxDivider,
    GxSwitchText,
    GxDropdown,
    GxIcon,
    GxSwitch,
    GxCardModal,
    GxDesktopHeader,
  },
  props: {
    editingClientData: {
      type: Object,
      default: () => {
        return {
          clientId: null,
          clientNumber: '',
          isNational: 'Nacional',
          branches: [],
          address: {
            fullAddress: '',
          },
          bankAccounts: [
            {
              bankAccountNumber: '',
              bank: {
                name: '',
                bankCode: '',
              },
              bankAccountDataLocalized: {
                clabe: '',
              },
              custombankAccountNumberError: null,
              customAccountClabeError: null,
            },
          ],
          businessName: '',
          commercialName: '',
          contacts: [
            {
              name: '',
              nameError: null,
              invalidName: '',
              jobTitle: '',
              email: '',
              customErrorMail: null,
              invalidEmail: '',
              mobilePhone: '',
              customErrorMobilePhone: null,
              invalidMobilePhone: '',
              phone: '',
              customErrorPhone: null,
              invalidPhone: '',
            },
          ],
          status: 'ACTIVO',
          statusSwitchOptions: ['ACTIVO', 'INACTIVO'],
          taxId: '',
          countryCode: 'MEX',
          sellOnCredit: false,
          maximumCreditAmount: '',
          maximumCreditDays: '',
          customClientNumberError: null,
          customMaxCreditError: null,
          customMaxDaysOfCreditError: null,
        }
      },
    },
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
    company: LOCAL_COMPANY,
    myAccount: {
      query: CLIENT_GENERAL_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
          clientId: this.$route.params.clientId,
          branchNumber: this.company.branchNumber,
        }
      },
      error(err) {
        this.error = this.$utils.parseServerError(err)
      },
      skip() {
        return this.skipQuery
      },
    },
  },
  data() {
    return {
      // Usada para redireccionar después de crear un cliente
      timeout: null,
      newClientId: null,
      clientId: this.editingClientData.clientId,
      clientNumber: this.editingClientData.clientNumber.toString(),
      isNational:
        this.editingClientData.countryCode !== 'MEX'
          ? 'Extranjero'
          : 'Nacional',
      isNationalSwitchOptions: ['Nacional', 'Extranjero'],
      // The real address is the value returned from the component via the validAddress event.
      // addressInputValue just holds the text search for Google Maps. Use the address object when
      // sending data to the server

      fiscalAddress: {
        fullAddress:
          this.editingClientData.address &&
          this.editingClientData.address.fullAddress
            ? this.editingClientData.address.fullAddress
            : '',
      },
      fiscalAddressFull:
        this.editingClientData.address &&
        this.editingClientData.address.fullAddress
          ? this.editingClientData.address.fullAddress
          : '',
      branches: this.editingClientData.branches,
      bankAccounts: this.editingClientData.bankAccounts || [
        {
          bankAccountNumber: '',
          bank: {
            name: '',
            bankCode: '',
          },
          bankAccountDataLocalized: {
            clabe: '',
          },
          custombankAccountNumberError: null,
          customAccountClabeError: null,
        },
      ],
      businessName: this.editingClientData.businessName,
      commercialName: this.editingClientData.commercialName,
      contacts: this.editingClientData.contacts,
      status:
        this.editingClientData.status === 'active' ? 'ACTIVO' : 'INACTIVO',
      statusSwitchOptions: ['ACTIVO', 'INACTIVO'],
      taxId: this.editingClientData.taxId,
      country: '',
      sellOnCredit:
        this.editingClientData.sellOnCredit === null
          ? false
          : this.editingClientData.sellOnCredit,
      maximumCreditAmount: this.editingClientData.maximumCreditAmount
        ? String(this.editingClientData.maximumCreditAmount)
        : '',
      maximumCreditDays: this.editingClientData.maximumCreditDays
        ? String(this.editingClientData.maximumCreditDays)
        : '',
      invalidTaxId: '',
      customClientNumberError: this.editingClientData.customClientNumberError,
      customMaxCreditError: this.editingClientData.customMaxCreditError,
      customMaxDaysOfCreditError: this.editingClientData
        .customMaxDaysOfCreditError,
      customTaxError: null,
      customLegalNameError: null,
      customCommercialError: null,
      customCountryError: null,
      loading: false,
      saveLoading: false,
      showAdvancedOptions: false,
      showCreateClientSuccess: false,
      customCreateClientError: null,
      branchName: this.editingClientData.branchName,
    }
  },
  computed: {
    editingCountryName() {
      if (this.countries && this.editingClientData) {
        const result = this.countries.find(
          (c) => c.countryCode === this.editingClientData.countryCode
        )
        return result.country
      }
      return null
    },
    countryCode() {
      if (this.country && this.countries) {
        const result = this.countries.find((c) => c.country === this.country)
        return result.countryCode
      }
      return null
    },
    showBranches() {
      return this.branches.length !== 0
    },
    skipQuery() {
      return ['createnewclient'].includes(this.$route.name)
    },
    statusPlaceholder() {
      if (this.isNational === 'Nacional') {
        return `RFC`
      } else return `Tax ID`
    },
    statusPlaceholderName() {
      if (this.isNational === 'Nacional') {
        return `Nombre o Razón Social`
      } else return `Nombre de la empresa o persona`
    },
    patternForTaxId() {
      if (this.isNational === 'Nacional') {
        return `taxId`
      } else return `internationalTaxId`
    },
  },
  watch: {
    editingCountryName(newVal) {
      this.country = newVal
    },
    sellOnCredit(newVal) {
      if (newVal === false) {
        this.maximumCreditAmount = ''
        this.maximumCreditDays = ''
      }
    },
    maximumCreditAmount(newVal) {
      if (Number(newVal) > 99999999999999) {
        this.customMaxCreditError =
          'El monto no puede ser mayor que $99,999,999,999,999'
      } else {
        this.customMaxCreditError = ''
      }
    },
    isNational(newVal) {
      if (newVal === 'Nacional') {
        this.country = 'México'
      } else {
        this.country = ''
      }
    },
    taxId: function(val) {
      this.customTaxError = ''
    },
    commercialName(newVal) {
      this.customCommercialError = null
    },
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    if (!this.contacts) {
      this.contacts = []
      this.addContact()
    } else if (this.contacts.length === 0) {
      this.addContact()
    }
    this.contacts = this.contacts.map((contact, index) => {
      const id = Date.now() + index
      const contactWidthId = {
        ...contact,
        id,
      }
      return contactWidthId
    })
  },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
    toggleAdvancedOptions() {
      this.showAdvancedOptions = !this.showAdvancedOptions
    },
    redirectModal() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.$route.query.newSale) {
        // Clear NewSale Forms data
        localStorage.removeItem('newSale--saleInfo')
        localStorage.removeItem('newSale--saleInfoObject')
        localStorage.removeItem('newSale--addtionalDataInfo')
        localStorage.removeItem('newSale--concepts')
        localStorage.removeItem('newSale--saleDataInput')
        localStorage.removeItem('newSale--pdf')
        localStorage.removeItem('newSale--saleId')
        this.$router.replace({
          name: 'newsalewithclient',
          params: { clientId: this.clientId },
        })
      } else {
        this.$router.replace({
          name: 'clientgeneralinfo',
          params: { clientId: this.clientId },
          // query: { from: 'new' },
        })
      }
    },
    async addNewClient() {
      if (this.commercialName === '') {
        this.customCommercialError = `Este campo es necesario`
        document.body.scrollTop = document.documentElement.scrollTop = 0
        return
      }
      if (this.customMaxCreditError) {
        return
      }
      try {
        this.loading = true
        // Building object to send client info
        const data = {
          taxId: this.taxId,
          businessName: this.businessName,
          commercialName: this.commercialName,
          countryCode: this.countryCode,
          sellOnCredit: this.sellOnCredit,
          maximumCreditAmount: this.maximumCreditAmount
            ? parseFloat(this.maximumCreditAmount)
            : null,
          maximumCreditDays: this.maximumCreditDays
            ? parseInt(this.maximumCreditDays)
            : null,
          clientNumber: this.clientNumber ? parseInt(this.clientNumber) : null,
          address: this.fiscalAddress,
        }

        // A city should be provided by Google Maps, so this value should exist if user has selected
        if (this.fiscalAddress && this.fiscalAddress.city) {
          data.address = {
            street: this.fiscalAddress.street || '',
            outsideNumber: this.fiscalAddress.outsideNumber || '',
            insideNumber: this.fiscalAddress.insideNumber || '',
            neighborhood: this.fiscalAddress.neighborhood || '',
            municipality: this.fiscalAddress.municipality || '',
            city: this.fiscalAddress.city || '',
            state: this.fiscalAddress.state || '',
            country: this.fiscalAddress.country || '',
            countryCode: this.fiscalAddress.countryCode || '',
            postalCode: this.fiscalAddress.postalCode || '',
            fullAddress: this.fiscalAddress.fullAddress || '',
          }
        } else {
          data.address = null
        }

        // Branches must have a fullAddress defined
        if (this.branches.length > 0 && this.branches[0].address.fullAddress) {
          const branchesData = this.branches.map((branch) => {
            const cleanBranch = {
              name: branch.name,
              address: {
                fullAddress: branch.address.fullAddress || '',
                street: branch.address.street || '',
                outsideNumber: branch.address.outsideNumber || '',
                insideNumber: branch.address.insideNumber || '',
                neighborhood: branch.address.neighborhood || '',
                municipality: branch.address.municipality || '',
                city: branch.address.city || '',
                state: branch.address.state || '',
                country: branch.address.country || '',
                countryCode: branch.address.countryCode || '',
                postalCode: branch.address.postalCode || '',
                reference: branch.address.reference || '',
              },
            }
            return cleanBranch
          })
          data.branches = branchesData
        } else {
          data.branches = []
        }

        if (
          this.bankAccounts.length > 0 &&
          this.bankAccounts[0].bank.bankCode
        ) {
          const bankAccountsData = this.bankAccounts.map((account) => {
            const cleanBankAccount = {
              bankCode: account.bank.bankCode,
              bankAccountName: account.bank.name,
              bankAccountNumber: account.bankAccountNumber,
              clabe: account.bankAccountDataLocalized.clabe,
            }
            return cleanBankAccount
          })
          data.bankAccounts = bankAccountsData
        } else {
          data.bankAccounts = null
        }

        if (this.contacts.length > 0) {
          // Deleting front end validation variables not accepted in the data base
          const contactsData = this.contacts
            .filter((contact) => {
              // Valid contacts must have at least a name
              return contact.name
            })
            .map((contact) => {
              return {
                country: contact.country,
                countryCode: contact.countryCode,
                email: contact.email,
                jobTitle: contact.jobTitle,
                mobilePhone: contact.mobilePhone,
                name: contact.name,
                personId: contact.personId,
                phone: contact.phone,
              }
            })

          if (contactsData.length > 0) {
            data.contacts = contactsData
          } else {
            data.contacts = null
          }
        } else {
          data.contacts = null
        }
        const vModel = this
        const res = await this.$apollo.mutate({
          mutation: CREATE_NEW_CLIENT,
          variables: {
            companyNumber: this.company.number,
            data,
          },
          update(store, data) {
            // Delete clients pages from cache to force a refetch when revisiting lists
            // Apollo Client 3 might solve some of this issues. Will need to await the stable release plus integration
            // by the vue-apollo team
            Object.keys(store.data.data).forEach((k, i) => {
              if (
                k.includes(
                  `$ROOT_QUERY.myAccount.companies({"companyNumber":${
                    vModel.company.number
                  }}).0.company.clients`
                )
              ) {
                store.data.delete(k)
              }
            })
          },
        })

        // No need to disable loading since user will be redirected. Setting loading to false will flash
        // the completed form and feel like an error
        // this.loading = false

        this.clientId = res.data.clientCreate.clientId
        this.loading = false
        this.showCreateClientSuccess = true

        this.timeout = setTimeout(() => {
          this.redirectModal()
        }, 3000)
      } catch (e) {
        /* eslint-disable */
        this.loading = false
        console.log(e)
        this.customCreateClientError = this.$utils.parseServerError({
          message: e.message,
        })
        /* eslint-enable */
        if (window.bugsnagClient) {
          window.bugsnagClient.notify(e, {
            metaData: {
              m: 'CreateNewClientForm addNewClient',
              data: e,
            },
          })
        }
      }
    },
    async updateClient() {
      if (this.commercialName === '') {
        this.customCommercialError = `Este campo es necesario`
        document.body.scrollTop = document.documentElement.scrollTop = 0
        return
      }
      if (this.customMaxCreditError) {
        return
      }
      try {
        this.saveLoading = true
        const data = {
          taxId: this.taxId,
          businessName: this.businessName,
          commercialName: this.commercialName,
          countryCode: this.countryCode,
          sellOnCredit: this.sellOnCredit,
          maximumCreditAmount: this.maximumCreditAmount
            ? parseFloat(this.maximumCreditAmount)
            : null,
          maximumCreditDays: this.maximumCreditDays
            ? parseInt(this.maximumCreditDays)
            : null,
          clientNumber: this.clientNumber ? parseInt(this.clientNumber) : null,
          address: this.fiscalAddress,
        }

        // Branches must have a fullAddress defined
        if (this.branches.length > 0 && this.branches[0].address.fullAddress) {
          const branchesData = this.branches.map((branch) => {
            const cleanBranch = {
              name: branch.name,
              address: {
                fullAddress: branch.address.fullAddress || '',
                street: branch.address.street || '',
                outsideNumber: branch.address.outsideNumber || '',
                insideNumber: branch.address.insideNumber || '',
                neighborhood: branch.address.neighborhood || '',
                municipality: branch.address.municipality || '',
                city: branch.address.city || '',
                state: branch.address.state || '',
                country: branch.address.country || '',
                countryCode: branch.address.countryCode || '',
                postalCode: branch.address.postalCode || '',
                reference: branch.address.reference || '',
              },
            }
            if (branch.clientBranchId) {
              cleanBranch.clientBranchId = branch.clientBranchId
            }
            return cleanBranch
          })
          data.branches = branchesData
        } else {
          data.branches = []
        }

        if (
          this.bankAccounts.length > 0 &&
          this.bankAccounts[0].bank.bankCode
        ) {
          const bankAccountsData = this.bankAccounts.map((account) => {
            const cleanBankAccount = {
              bankCode: account.bank.bankCode,
              bankAccountName: account.bank.name,
              bankAccountNumber: account.bankAccountNumber,
              clabe: account.bankAccountDataLocalized.clabe,
            }
            if (account.bankAccountId) {
              cleanBankAccount.bankAccountId = account.bankAccountId
            }
            return cleanBankAccount
          })
          data.bankAccounts = bankAccountsData
        } else {
          data.bankAccounts = null
        }

        if (this.contacts.length > 0) {
          // Deleting front end validation variables not accepted in the data base
          const contactsData = this.contacts
            .filter((contact) => {
              // Valid contacts must have at least a name
              return contact.name
            })
            .map((contact) => {
              const cleanContact = {
                country: contact.country,
                countryCode: contact.countryCode,
                email: contact.email,
                jobTitle: contact.jobTitle,
                mobilePhone: contact.mobilePhone,
                name: contact.name,
                personId: contact.personId,
                phone: contact.phone,
              }
              if (contact.personId) {
                cleanContact.personId = contact.personId
              }
              return cleanContact
            })
          if (contactsData.length > 0) {
            data.contacts = contactsData
          } else {
            data.contacts = null
          }
        } else {
          data.contacts = null
        }
        const vModel = this
        await this.$apollo.mutate({
          mutation: UPDATE_CLIENT,
          variables: {
            companyNumber: this.company.number,
            branchNumber: this.company.branchNumber,
            clientId: this.clientId,
            data,
          },
          update: (store, response) => {
            const updatedClient = response.data.clientUpdate
            const query = {
              query: CLIENT_GENERAL_INFO,
              variables: {
                companyNumber: this.company.number,
                clientId: this.clientId,
                branchNumber: this.company.branchNumber,
              },
            }
            const data = store.readQuery(query)

            const indexToUpdate = data.myAccount.companies[0].company.clients.list.findIndex(
              (client) => {
                return client.clientId === this.clientId
              }
            )

            data.myAccount.companies[0].company.clients.list[
              indexToUpdate
            ] = updatedClient
            store.writeQuery({ ...query, data })

            // // Force persist-cache update for next reloads
            // this.$apollo.queries.myAccount.refetch()

            // Delete clients pages from cache to force a refetch when revisiting lists
            // Apollo Client 3 might solve some of this issues. Will need to await the stable release plus integration
            // by the vue-apollo team

            Object.keys(store.data.data).forEach((k, i) => {
              if (
                k.includes(
                  `$ROOT_QUERY.myAccount.companies({"companyNumber":${
                    vModel.company.number
                  }}).0.company.clients`
                )
              ) {
                store.data.delete(k)
              }
            })
          },
        })
        this.saveLoading = false
        this.$emit('updateCompleted')
        this.$root.$emit('removeFromKeepAlive', 'MyClientsView')
      } catch (error) {
        /* eslint-disable */
        this.saveLoading = false
        this.customCreateClientError = this.$utils.parseServerError({
          message: error.message,
        })
        /* eslint-enable */
        if (window.bugsnagClient) {
          window.bugsnagClient.notify(error, {
            metaData: {
              m: 'CreateNewClientForm updateClient',
              data: error,
            },
          })
        }
      }
    },
    addBranch() {
      const newBranch = {
        id: Date.now(),
        name: '',
        branchNameError: null,
        address: {
          countryCode: 'MEX',
          fullAddress: '',
          addressError: null,
        },
      }
      this.branches = [...this.branches, newBranch]

      if (this.branches.length > 1) {
        setTimeout(() => {
          const el = document.getElementById(newBranch.id)
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        }, 300)
      }
    },
    addContact() {
      const newContact = {
        id: Date.now(),
        name: '',
        nameError: null,
        invalidName: '',
        jobTitle: '',
        email: '',
        customErrorMail: null,
        invalidEmail: '',
        mobilePhone: '',
        customErrorMobilePhone: null,
        invalidMobilePhone: '',
        phone: '',
        customErrorPhone: null,
        invalidPhone: '',
      }
      this.contacts = [...this.contacts, newContact]

      if (this.contacts.length > 1) {
        setTimeout(() => {
          const el = document.getElementById(newContact.id)
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        }, 300)
      }
    },
    removeContact(id) {
      const indexToRemove = this.contacts.findIndex((c) => c.id === id)
      this.contacts = [
        ...this.contacts.slice(0, indexToRemove),
        ...this.contacts.slice(indexToRemove + 1),
      ]
    },
    removeBranch(id) {
      const indexToRemove = this.branches.findIndex((bran) => bran.id === id)
      this.branches = [
        ...this.branches.slice(0, indexToRemove),
        ...this.branches.slice(indexToRemove + 1),
      ]
    },
  },
}
</script>
<template>
  <div>
    <div v-if="$mq === 'mo'">
      <GxForm class="flex-grow flex flex-col relative w-screen">
        <!-- Gral. Info. -->
        <section class="flex-grow flex flex-col pt-4">
          <GxDivider />
          <h1
            class="bg-gray-100 uppercase h-8 py-2 px-4 flex items-center gx-caption font-bold text-gray-500"
            >Información General</h1
          >
          <GxDivider />
          <div class="flex-grow flex flex-col pt-4 px-4">
            <GxSwitchText
              v-model="isNational"
              :options="isNationalSwitchOptions"
              class="self-end mx-2"
            />
            <GxTextField
              v-model="commercialName"
              label="Nombre Comercial"
              input-id="commercialName"
              left-icon="store_mall_directory"
              :error="customCommercialError"
              class="mb-2"
              autofocus
            />
            <GxTextFieldTaxId
              v-model="taxId"
              :label="statusPlaceholder"
              :error="customTaxError"
              class="mb-2"
            />
            <GxTextFieldBusinessName
              v-model="businessName"
              :label="statusPlaceholderName"
              :error="customLegalNameError"
              class="mb-2"
            />

            <GxDropdown
              v-if="isNational === 'Extranjero' && countries"
              v-model="country"
              label="Elige un país"
              placeholder="Elige un país"
              :options="countries.map((c) => c.country)"
              option-value="countryCode"
              option-text="country"
              watch-value
              :error="customCountryError"
            />
          </div>
        </section>
        <!-- Contacts -->
        <section class="flex-grow flex flex-col pt-4">
          <GxDivider />
          <div
            class="flex-grow px-4 bg-gray-100 flex items-center text-gray-500 h-8 justify-between"
          >
            <h1 class="uppercase font-bold gx-caption pt-1"
              >Datos de contacto</h1
            >
            <GxTextLink
              class="flex items-center"
              type="button"
              @click.prevent="addContact"
            >
              <span class="mr-1">Agregar contacto</span>
              <GxIcon icon="add" />
            </GxTextLink>
          </div>
          <GxDivider />
          <div
            v-for="(contact, index) in contacts"
            :id="contact.id"
            :key="contact.id"
            class="flex-grow flex flex-col pt-4 px-4"
          >
            <div class="flex flex-col">
              <div class="flex justify-end">
                <GxTextLink
                  v-if="contacts.length > 1 || clientId"
                  class="flex mr-4 items-center"
                  @click.prevent="removeContact(contact.id)"
                >
                  <span class="mr-1">Eliminar contacto</span>
                  <div
                    class="bg-gray-200 rounded gxAddOther flex items-center justify-center"
                  >
                    <GxIcon
                      icon="remove_circle_outline"
                      style="font-size:0.5rem"
                      class="text-alert"
                    />
                  </div>
                </GxTextLink>
              </div>
              <GxTextFieldName
                v-model="contact.name"
                label="Nombre"
                left-icon="face"
                :error="contact.nameError"
                class="mb-2"
              />
              <GxTextField
                v-model="contact.jobTitle"
                label="Puesto"
                left-icon="business_center"
                class="mb-2"
              />
              <GxTextFieldEmail
                v-model="contact.email"
                label="Correo Electrónico"
                :error="contact.customErrorMail"
                class="mb-2"
              />
              <GxTextFieldPhone
                v-model="contact.mobilePhone"
                label="Celular"
                :error="contact.customErrorMobilePhone"
                left-icon="phone_iphone"
                class="mb-2"
              />
              <GxTextFieldPhone
                v-model="contact.phone"
                label="Teléfono"
                icon="phone"
                :error="contact.customErrorPhone"
                class="mb-4"
              />
              <GxDivider
                v-if="index !== contacts.length - 1"
                class="mb-4 mt-2"
              />
            </div>
          </div>
        </section>
        <!-- Fiscal address -->
        <section class="flex-grow flex flex-col">
          <GxDivider />
          <h1
            class="bg-gray-100 uppercase h-8 py-2 px-4 flex items-center gx-caption font-bold text-gray-500"
            >Dirección Fiscal</h1
          >
          <GxDivider />
          <GxAddressGoogleMaps
            v-model="fiscalAddressFull"
            class="my-8"
            label="Dirección"
            placeholder="Dirección"
            @validAddress="fiscalAddress = $event"
          />
        </section>
        <!-- Bank Accounts -->
        <CreateNewClientFormBankAccounts v-model="bankAccounts" />
        <!-- Branches -->
        <CreateNewClientFormBranches v-model="branches" />
        <!-- Advanced Options -->
        <section
          class="flex-grow flex flex-col pt-2"
          :class="{ 'mb-6': !editingClientData.clientNumber }"
        >
          <div
            v-if="!showAdvancedOptions"
            class="flex-grow px-4 bg-gray-100 flex flex-col justify-center h-8"
            :class="{ 'mb-4': editingClientData.clientNumber }"
          >
            <GxDivider />
            <GxTextLink
              class="flex self-end items-center text-gray-500"
              @click.prevent="showAdvancedOptions = !showAdvancedOptions"
            >
              <span class="mr-1">Opciones avanzadas</span>
              <GxIcon icon="keyboard_arrow_down" />
            </GxTextLink>
            <GxDivider />
          </div>
          <div v-if="showAdvancedOptions">
            <GxDivider />
            <h1
              class="bg-gray-100 uppercase h-8 py-2 px-4 flex items-center gx-caption font-bold text-gray-500"
              >Opciones avanzadas</h1
            >
            <GxDivider />
            <div class="flex-grow flex flex-col pt-4 px-4">
              <p class="flex pb-4 items-center">
                <span class="flex-grow ">Venta a crédito</span
                ><GxSwitch v-model="sellOnCredit"
              /></p>
              <GxTextFieldMoney
                v-if="sellOnCredit"
                v-model="maximumCreditAmount"
                :currency="''"
                :default-value="''"
                :input-classes="{ 'text-left': true }"
                label="Crédito máximo"
                class="mb-2"
                :error="customMaxCreditError"
              />
              <GxTextFieldNumeric
                v-if="sellOnCredit"
                v-model="maximumCreditDays"
                label="Días máximo de crédito"
                :maxlength="9"
                left-icon="calendar_today"
                :error="customMaxDaysOfCreditError"
                class="mb-8"
              />
              <p class="uppercase text-gray-400 gx-caption font-bold  mb-4"
                >Datos especiales</p
              >
              <GxTextFieldNumeric
                v-model="clientNumber"
                label="Número de cliente"
                pattern="numeric"
                placeholder="Número de cliente"
                left-icon="face"
                :error="customClientNumberError"
              />
            </div>
          </div>
        </section>
        <GxButton
          v-if="!editingClientData.clientNumber"
          :loading="loading"
          type="submit"
          class="self-end mx-4 mb-12"
          @click.prevent="addNewClient"
          >Guardar</GxButton
        >

        <GxFab
          v-if="editingClientData.clientNumber"
          :loading="saveLoading"
          mini
          icon="save"
          class="shadow-2 gxFabFloat"
          label="guardar"
          @click.prevent="updateClient"
        />
      </GxForm>
    </div>
    <div v-else class="flex flex-col" :class="{ 'items-center': !clientId }">
      <GxDesktopHeader
        v-if="!clientId"
        header="Añadir nuevo cliente"
        icon="keyboard_backspace"
        :icon-click-handler="goBack"
        class="self-start"
      />
      <form
        class="pb-8 flex flex-col"
        :class="{ 'gxForm shadow-4 rounded-lg': !clientId }"
      >
        <!-- general info -->
        <section>
          <GxDivider />
          <h1
            class="px-8 h-7 uppercase bg-gray-100 text-gray-500 font-bold de:gx-caption flex items-center"
            >Información general</h1
          >
          <div class="flex flex-col flex-grow mt-4 px-8 pb-8">
            <GxSwitchText
              v-model="isNational"
              :options="isNationalSwitchOptions"
              class="self-end mx-4"
            />
            <GxTextField
              v-model="commercialName"
              label="Nombre Comercial"
              input-id="commercialName"
              left-icon="store_mall_directory"
              :error="customCommercialError"
              class="mb-2"
              autofocus
            />
            <div class="gxGridContainer mb-2">
              <GxTextFieldTaxId
                v-model="taxId"
                data-taxId
                :label="statusPlaceholder"
                :error="customTaxError"
              />
              <GxTextField
                v-model="businessName"
                :label="statusPlaceholderName"
                :placeholder="statusPlaceholderName"
                left-icon="business_center"
                :error="customLegalNameError"
              />
              <GxDropdown
                v-if="isNational === 'Extranjero' && countries"
                v-model="country"
                label="Elige un país"
                placeholder="Elige un país"
                watch-value
                :options="countries.map((c) => c.country)"
                :error="customCountryError"
              />
            </div>
          </div>
        </section>
        <!-- contacts -->
        <section>
          <GxDivider />
          <div
            class="flex-grow px-8 bg-gray-100 flex items-center text-gray-500 h-7 justify-between"
            :class="{ 'mb-4': contacts.length === 0 }"
          >
            <h1 class="uppercase font-bold de:gx-caption pt-1"
              >Datos de contacto</h1
            >
            <GxTextLink
              class="flex items-center gxDeskLink"
              type="button"
              @click.prevent="addContact"
            >
              <span class="mr-1">Agregar contacto</span>
              <GxIcon icon="add" />
            </GxTextLink>
          </div>
          <GxDivider />
          <div
            v-for="(contact, index) in contacts"
            :id="contact.id"
            :key="contact.id"
            class="pt-4 flex flex-col"
          >
            <GxTextLink
              v-if="contacts.length > 1 || clientId"
              class="gxDeskLink flex self-end px-8 items-center"
              @click.prevent="removeContact(contact.id)"
            >
              <span class="mr-1 text-gray-700">Eliminar contacto</span>
              <div
                class="bg-gray-200 rounded flex items-center justify-center h-3 w-3"
              >
                <GxIcon
                  icon="remove_circle_outline"
                  class="text-alert"
                  style="font-size:0.5rem"
                />
              </div>
            </GxTextLink>

            <div class="gxGridContainer px-8 pb-8">
              <GxTextField
                v-model="contact.name"
                label="Nombre"
                left-icon="face"
                :error="contact.nameError"
                @valid="contact.invalidName = $event"
              />
              <GxTextField
                v-model="contact.jobTitle"
                label="Puesto"
                placeholder="Puesto"
                left-icon="business_center"
              />
              <GxTextField
                v-model="contact.email"
                label="Correo Electrónico"
                left-icon="email"
                :error="contact.customErrorMail"
                @valid="contact.invalidEmail = $event"
              />
              <GxTextFieldPhone
                v-model="contact.mobilePhone"
                label="Celular"
                left-icon="phone_iphone"
                :error="contact.customErrorMobilePhone"
              />
              <GxTextFieldPhone
                v-model="contact.phone"
                label="Teléfono"
                icon="phone"
                :error="contact.customErrorPhone"
                class="mb-2"
              />
            </div>
            <GxDivider v-if="index !== contacts.length - 1" />
          </div>
        </section>
        <!-- fiscal address -->
        <section>
          <GxDivider />
          <h1
            class="px-8 h-7 uppercase bg-gray-100 text-gray-500 font-bold de:gx-caption flex items-center"
            >Dirección fiscal</h1
          >
          <GxDivider />
          <div class="px-4 py-4">
            <GxAddressGoogleMaps
              v-model="fiscalAddressFull"
              label="Dirección"
              placeholder="Dirección"
              @validAddress="fiscalAddress = $event"
            />
          </div>
        </section>
        <!-- bank accounts -->
        <CreateNewClientFormBankAccounts v-model="bankAccounts" />
        <!-- Branches -->
        <CreateNewClientFormBranches v-model="branches" />
        <!-- Opciones avanzadas -->
        <section>
          <div v-if="!showAdvancedOptions" class="mb-8">
            <GxDivider />
            <p
              class="h-7 flex flex-col justify-center bg-gray-100 px-8 mt-4"
              :class="{ 'mb-24': clientId }"
            >
              <GxTextLink
                class="flex self-end text-gray-500 gxDeskLink"
                type="button"
                @click="toggleAdvancedOptions"
              >
                <span class="mr-1">Opciones avanzadas</span>
                <div
                  class="bg-gray-200 rounded flex items-center justify-center"
                >
                  <GxIcon icon="keyboard_arrow_down" style="font-size:0.5rem" />
                </div>
              </GxTextLink>
            </p>
            <GxDivider />
          </div>
          <div v-if="showAdvancedOptions" class="mt-4">
            <GxDivider />
            <h1
              class="bg-gray-100 uppercase h-7 px-8 flex items-center de:gx-caption font-bold text-gray-500"
              >Opciones avanzadas</h1
            >
            <GxDivider />
            <div class="flex-grow flex flex-col py-4 px-4">
              <p class="flex self-end px-4 items-center">
                <span class="mr-4">Venta a crédito</span
                ><GxSwitch v-model="sellOnCredit"
              /></p>
            </div>
            <div v-if="sellOnCredit" class="gxGridContainer px-4 pb-8">
              <GxTextFieldMoney
                v-if="sellOnCredit"
                v-model="maximumCreditAmount"
                :currency="''"
                :default-value="''"
                :input-classes="{ 'text-left': true }"
                label="Crédito máximo"
                :error="customMaxCreditError"
              />
              <GxTextFieldNumeric
                v-if="sellOnCredit"
                v-model="maximumCreditDays"
                label="Días máximos de crédito"
                pattern="creditdays"
                placeholder="Días máximos de crédito"
                left-icon="calendar_today"
                :error="customMaxDaysOfCreditError"
              />
            </div>
            <div>
              <GxDivider />
              <h1
                class="h-7 px-8 uppercase de:gx-caption font-bold text-gray-500 py-2"
                >Cliente</h1
              >
              <GxDivider class="mb-4" />
              <GxTextFieldNumeric
                v-model="clientNumber"
                label="Número de cliente"
                left-icon="face"
                :error="customClientNumberError"
                class="gxGridContainer px-8"
              />
            </div>
          </div>
        </section>
        <GxButton
          v-if="!clientId"
          class="self-end mx-8"
          type="submit"
          :loading="loading"
          @click.prevent="addNewClient"
          >Guardar</GxButton
        >
        <GxFab
          v-if="clientId"
          large
          :loading="saveLoading"
          icon="save"
          class="shadow-2 gxFabFloat"
          label="guardar"
          @click.prevent="updateClient"
        />
      </form>
    </div>
    <GxCardModal
      v-if="showCreateClientSuccess"
      headline="Cliente creado"
      :card-img="$utils.alertImages.Done"
      alt="Cliente creado"
      @click.stop="redirectModal"
    />
    <GxCardModal
      v-if="customCreateClientError"
      :headline="customCreateClientError"
      :card-img="$utils.alertImages.Dissapointed"
      :alt="customCreateClientError"
      @click="customCreateClientError = null"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxAddOther {
  width: 0.875rem;
  height: 0.875rem;
}
.gxFabFloat {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
.gxForm {
  width: 100%;
  max-width: 750px;
}
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem 2rem;
}
.gxDeskLink {
  font-size: 12px;
}
</style>

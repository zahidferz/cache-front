<script>
// import GxButton from '@src/components/_Core/Buttons/GxButton' // Now global
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { UPDATE_COMPANY_INFO } from '@src/apollo//mutations'
import { COMPANY_INFO } from '@src/apollo/queries'
import regimeList from '@src/assets/Catalogos/CAT_011_MEX_Regimen_fiscal.json'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxAddressGoogleMaps from '@components/_Core/Forms/GxAddressGoogleMaps'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import gql from 'graphql-tag'

export default {
  name: 'UpdateCompanyInfo',
  components: {
    // GxButton,
    GxCardModal,
    GxDropdown,
    GxAddressGoogleMaps,
    GxLoader,
    GxDesktopHeader,
  },
  apollo: {
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
    },
  },
  data() {
    return {
      editFullAddress: false,
      invalidTaxid: false,
      commercialName: '',
      legalName: '',
      regimeList: Object.freeze(regimeList),
      taxRegime: '',
      taxId: '',
      taxIdError: '',
      taxRegimeError: '',
      zipCode: '',
      invalidZipCode: null,
      zipCodeError: null,
      address: '',
      fiscalAddressFull: '',
      street: '',
      outsideNumber: '',
      timeout: null,
      insideNumber: '',
      neighborhood: '',
      municipality: '',
      city: '',
      state: '',
      country: '',
      countryCode: '',
      showSuccessAlert: false,
      showErrorAlert: false,
      successAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_6_exitousuario.svg'),
      errorAlertImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      loading: false,
      invalidCommercialName: null,
      commercialNameError: null,
      invalidLegalName: null,
      legalNameError: null,
    }
  },
  computed: {
    isPersonaFisica() {
      if (
        this.myAccount &&
        this.myAccount.companies[0].company.companyDataLocalized
          .regimenFiscalNombre
      ) {
        const currentUserRegime = this.myAccount.companies[0].company
          .companyDataLocalized.regimenFiscalNombre
        return this.regimeList.find(
          (regime) => regime.description === currentUserRegime
        ).valid_for_person
      }

      if (this.taxId && this.taxId.length === 13) return true

      return false
    },
    label() {
      if (this.isPersonaFisica) {
        return 'Nombre'
      }
      return 'Razón Social'
    },
    icon() {
      if (this.isPersonaFisica) {
        return 'face'
      }
      return 'business_center'
    },
    companyInfo() {
      if (!this.myAccount) return null
      return this.myAccount.companies[0].company
    },
    canUpdateTaxId() {
      if (!this.companyInfo) {
        return null
      }
      if (
        this.companyInfo.companyDataLocalized.csd.length ||
        this.companyInfo.companyDataLocalized.ciecConfigurada
      ) {
        return false
      }
      return true
    },
    filteredRegimeList() {
      if (this.taxId && this.taxId.length === 12) {
        return this.regimeList.filter((regime) => regime.valid_for_company)
      }

      if (this.taxId && this.taxId.length === 13) {
        return this.regimeList.filter((regime) => regime.valid_for_person)
      }

      return this.regimeList
    },
    descriptions() {
      return this.filteredRegimeList.map((regime) => {
        return regime.description
      })
    },
    taxRegimeCode() {
      if (!this.taxRegime) return null

      return this.regimeList.find((r) => r.description === this.taxRegime)
        .regime_code
    },
  },
  watch: {
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          this.setFormData(newVal)
        }
      },
      immediate: true,
    },
    commercialName(val) {
      this.commercialNameError = ''
    },
    legalName(val) {
      this.legalNameError = ''
    },
    taxRegime(val) {
      this.taxRegimeError = ''
    },
    zipCode(val) {
      this.zipCodeError = ''
    },
    filteredRegimeList(newVal) {
      const result = newVal.find(
        (regime) => regime.description === this.taxRegime
      )
      if (!result) {
        this.taxRegime = ''
      }
    },
  },
  methods: {
    updateFiscalAddress({
      street,
      outsideNumber,
      insideNumber,
      neighborhood,
      municipality,
      city,
      state,
      country,
      countryCode,
      postalCode,
      fullAddress,
    }) {
      this.street = street || ''
      this.outsideNumber = outsideNumber || ''
      this.insideNumber = insideNumber || ''
      this.neighborhood = neighborhood || ''
      this.municipality = municipality || ''
      this.city = city || ''
      this.state = state || ''
      this.country = country || ''
      this.countryCode = countryCode || ''
      this.postalCode = postalCode || ''
      this.fiscalAddressFull = fullAddress || ''

      // Open manual edit form so user can verify data
      this.editFullAddress = true
    },
    setFormData(newVal) {
      this.legalName = newVal.companies[0].company.legalName || ''
      this.commercialName = newVal.companies[0].company.commercialName || ''
      this.taxId = newVal.companies[0].company.taxId || ''
      this.taxRegime =
        newVal.companies[0].company.companyDataLocalized.regimenFiscalNombre ||
        ''
      this.zipCode = newVal.companies[0].company.fiscalAddress
        ? newVal.companies[0].company.fiscalAddress.postalCode || ''
        : ''
      this.street = newVal.companies[0].company.fiscalAddress.street || ''
      this.outsideNumber =
        newVal.companies[0].company.fiscalAddress.outsideNumber || ''
      this.insideNumber =
        newVal.companies[0].company.fiscalAddress.insideNumber || ''
      this.neighborhood =
        newVal.companies[0].company.fiscalAddress.neighborhood || ''
      this.municipality =
        newVal.companies[0].company.fiscalAddress.municipality || ''
      this.city = newVal.companies[0].company.fiscalAddress.city || ''
      this.state = newVal.companies[0].company.fiscalAddress.state || ''
      this.country = newVal.companies[0].company.fiscalAddress.country || ''
      this.countryCode =
        newVal.companies[0].company.fiscalAddress.countryCode || ''
      this.postalCode =
        newVal.companies[0].company.fiscalAddress.postalCode || ''
      this.fiscalAddressFull =
        newVal.companies[0].company.fiscalAddress.fullAddress || ''
    },
    async onSubmit() {
      try {
        let hasError
        if (this.commercialName.length === 0) {
          this.commercialNameError = 'Este campo es necesario'
          hasError = true
        }
        if (this.legalName.length === 0) {
          this.legalNameError = 'Este campo es necesario'
          hasError = true
        }
        if (this.taxId.length === 0) {
          this.taxIdError = 'Este campo es necesario'
          hasError = true
        }
        if (this.taxRegime.length === 0) {
          this.taxRegimeError = 'Este campo es necesario'
          hasError = true
        }
        if (this.zipCode.length === 0) {
          this.zipCodeError = 'Este campo es necesario'
          hasError = true
        }
        if (this.zipCode.length !== 5) {
          this.zipCodeError = 'El código postal debe tener 5 dígitos'
          hasError = true
        }
        if (
          this.invalidCommercialName ||
          this.invalidLegalName ||
          this.invalidZipCode ||
          this.invalidTaxid ||
          hasError
        ) {
          this.$nextTick(() => {
            const element = document.querySelector('.js-error-anchor')
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              })
            }
          })
          return
        }

        this.loading = true

        await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_INFO,
          variables: {
            companyNumber: this.company.number,
            data: {
              commercialName: this.commercialName || '',
              legalName: this.legalName || '',
              taxId: this.taxId,
              companyDataLocalized: {
                regimenFiscalNombre: this.taxRegime,
                regimenFiscalCodigo: Number(this.taxRegimeCode),
              },
              fiscalAddress: {
                street: this.street,
                outsideNumber: this.outsideNumber,
                insideNumber: this.insideNumber,
                neighborhood: this.neighborhood,
                municipality: this.municipality,
                city: this.city,
                state: this.state,
                country: this.country,
                countryCode: this.countryCode,
                postalCode: this.zipCode,
                reference: this.reference,
                fullAddress: this.fiscalAddressFull,
              },
            },
          },
          update: (store, { data }) => {
            // // Read the data from our cache for this query.
            const query = {
              query: COMPANY_INFO,
              variables: {
                companyNumber: this.company.number,
              },
            }
            const oldData = store.readQuery(query)
            oldData.myAccount.companies[0].company =
              data.companyUpdateInfo.updatedCompany

            store.writeQuery({
              ...query,
              data: oldData,
            })

            this.$apollo.queries.myAccount.refetch()
          },
        })

        this.loading = false
        this.showSuccessAlert = true
        this.timeout = setTimeout(() => {
          this.closeSuccessModal()
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(this.timeout)
        })
      } catch (error) {
        this.loading = false
        this.customError = this.$utils.parseServerError(error)
        this.showErrorAlert = true
        this.timeout = setTimeout(() => {
          this.showErrorAlert = false
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(this.timeout)
        })
      }
    },
    closeSuccessModal() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.showSuccessAlert = false
      this.$router.push({ name: 'dashboard' })
    },
    goBack() {
      this.$router.push({ name: 'dashboard' })
      // this.$router.gxAnim = 'slide-right'
      // this.$router.back()
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col">
    <MqLayout mq="de" class="flex">
      <GxDesktopHeader
        header="Mi empresa"
        icon="keyboard_backspace"
        :icon-click-handler="goBack"
      />
    </MqLayout>
    <div
      v-if="myAccount"
      class="flex mt-4 de:p-4 de:mx-auto de:mt-8 de:p-4 de:shadow-3 de:relative de:rounded-lg de:w-108"
    >
      <GxForm class="flex-grow flex flex-col" @submit="onSubmit">
        <div
          class="de:-mx-4 text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold uppercase py-2 p-4 de:px-8 mb-4"
          >Información General</div
        >
        <GxTextField
          v-model="commercialName"
          required
          class="mb-2 px-4"
          left-icon="store_mall_directory"
          :error="commercialNameError"
          name="Nombre Comercial"
          label="Nombre Comercial"
        />
        <GxTextFieldBusinessName
          v-model="legalName"
          required
          :label="label"
          placeholder="Nombre o Razón Social"
          name="Nombre o Razón Social"
          :left-icon="icon"
          class="mb-2 px-4"
        />

        <GxTextFieldTaxId
          v-if="canUpdateTaxId"
          v-model="taxId"
          required
          label="RFC de tu empresa"
          name="RFC de tu empresa"
          :error="taxIdError"
          class="mb-2 px-4"
        />
        <GxTextFieldTaxId
          v-else
          v-model="taxId"
          disabled
          label="RFC de tu empresa"
          class="mb-2 px-4"
        />
        <GxDropdown
          v-model="taxRegime"
          watch-value
          placeholder="Régimen Fiscal"
          label="Régimen Fiscal*"
          :error="taxRegimeError"
          :options="descriptions"
        />
        <div
          class="de:-mx-4 text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold uppercase py-2 p-4 de:px-8 mb-4"
          >Dirección Fiscal</div
        >
        <GxAddressGoogleMaps
          v-model="fiscalAddressFull"
          watch-value
          label="Buscar dirección"
          placeholder="Buscar dirección"
          @validAddress="updateFiscalAddress($event)"
        />

        <GxTextFieldNumeric
          v-model="zipCode"
          required
          name="C.P."
          label="C.P.*"
          :error="zipCodeError"
          :maxlength="5"
          left-icon="map"
          class="mb-2 px-4"
        />
        <div
          class="flex justify-end text-right de:-mx-4 text-gray-500 bg-gray-100 gx-caption de:gx-caption font-bold py-2 p-4 de:px-8 mb-4"
        >
          <button
            class="gx-caption flex items-center"
            style="font-size: 0.75rem;"
            type="button"
            @click="editFullAddress = !editFullAddress"
            >Editar dirección manualmente
            <GxIcon :icon="editFullAddress ? 'expand_less' : 'expand_more'" />
          </button>
        </div>
        <div v-show="editFullAddress" class="px-4">
          <GxTextField
            v-model="street"
            label="Calle"
            name="Calle"
            class="mb-2 "
          />
          <GxTextField
            v-model="outsideNumber"
            label="No. Exterior"
            name="No. Exterior"
            class="mb-2"
          />
          <GxTextField
            v-model="insideNumber"
            label="No. Interior"
            name="No. Interior"
            class="mb-2"
          />
          <GxTextField
            v-model="municipality"
            label="Municipio"
            name="Municipio"
            class="mb-2"
          />
          <GxTextField
            v-model="city"
            label="Ciudad"
            name="Ciudad"
            class="mb-2"
          />

          <GxTextField
            v-model="state"
            label="Estado"
            name="Estado"
            class="mb-2"
          />

          <GxTextField
            v-model="country"
            label="País"
            name="País"
            class="mb-2"
          />
          <!-- <GxInput
            v-model="countryCode"
            watch-value
            label="Código de país"
            placeholder="Código de país"
          /> -->
        </div>
        <div class="flex-grow flex flex-col justify-end mx-auto">
          <GxButton class="mt-4 mb-4" :loading="loading" type="submit">
            Actualizar
          </GxButton>
        </div>
      </GxForm>
      <GxCardModal
        v-if="showSuccessAlert"
        headline="Info actualizada"
        :card-img="$utils.alertImages.Done"
        alt="Información actualizada"
        @click="closeSuccessModal"
        @close="closeSuccessModal"
      >
      </GxCardModal>
      <GxCardModal
        v-if="showErrorAlert"
        :headline="customError"
        :card-img="$utils.alertImages.Oops"
        alt="Ops, algo salió mal. Inténtalo de nuevo."
      >
      </GxCardModal>
    </div>
    <div v-else class="flex-grow flex justify-center items-center">
      <GxLoader />
    </div>
  </div>
</template>

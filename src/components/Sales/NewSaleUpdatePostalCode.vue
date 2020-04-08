<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxModal from '@components/_Core/Modals/GxModal'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import regimeList from '@src/assets/Catalogos/CAT_011_MEX_Regimen_fiscal.json'
import { UPDATE_COMPANY_INFO } from '@src/apollo//mutations'
import { LOCAL_COMPANY, COMPANY_INFO } from '@src/apollo/queries'
export default {
  name: 'NewSaleUpdatePostalCode',
  components: {
    GxCardModal,
    GxModal,
    GxDropdown,
    GxCardCore,
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
  },
  data() {
    return {
      regimeList: Object.freeze(regimeList),
      myAccount: null,
      company: null,
      serverError: null,
      customError: null,
      loading: false,
      taxRegimeError: '',
      taxRegime: '',
      postalCode: '',
    }
  },
  computed: {
    taxId() {
      if (!this.myAccount) return null
      return this.myAccount.companies[0].company.taxId
    },
    isPersonaFisica() {
      if (!this.taxId) return null
      return this.taxId.length === 13
    },
    dropdownOptions() {
      if (this.isPersonaFisica) {
        return this.regimeList
          .filter((regime) => regime.valid_for_person)
          .map((regime) => regime.description)
      }
      return this.regimeList
        .filter((regime) => regime.valid_for_company)
        .map((regime) => regime.description)
    },
    selectedRegime() {
      if (this.taxRegime) {
        return this.regimeList.find(
          (regime) => regime.description === this.taxRegime
        )
      }
      return null
    },
  },
  watch: {
    myAccount(newVal) {
      if (newVal.companies[0].company.fiscalAddress.postalCode) {
        this.postalCode = newVal.companies[0].company.fiscalAddress.postalCode
      }
      if (
        newVal.companies[0].company.companyDataLocalized.regimenFiscalNombre
      ) {
        this.taxRegime =
          newVal.companies[0].company.companyDataLocalized.regimenFiscalNombre
      }
    },
  },
  methods: {
    async onSubmit() {
      if (!this.postalCode || !this.taxRegime) {
        this.taxRegimeError = !this.taxRegime ? 'Este campo es requerido' : ''
        return
      }
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: UPDATE_COMPANY_INFO,
          variables: {
            companyNumber: this.company.number,
            data: {
              fiscalAddress: {
                countryCode: this.myAccount.companies[0].company.countryCode,
                postalCode: this.postalCode,
              },
              companyDataLocalized: {
                regimenFiscalNombre: this.selectedRegime.description,
                regimenFiscalCodigo: Number(this.selectedRegime.regime_code),
              },
            },
          },
          update: (store, { data }) => {
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
          },
        })
      } catch (error) {
        this.loading = false
        this.serverError = this.$utils.parseServerError(error)
      }
    },
  },
}
</script>
<template>
  <GxCardModal
    v-if="serverError"
    :headline="serverError"
    :card-img="$utils.alertImages.Oops"
    alt="Error"
    @close="serverError = null"
  />
  <GxModal v-else class="py-4">
    <GxCardCore
      :clickable="false"
      class="flex-grow bg-white flex flex-col  w-82 de:w-108 pt-4 de:pt-8 pb-2 de:pb-6   shadow-8 de:shadow-4 rounded-lg"
    >
      <GxForm class="w-full  flex flex-col" @submit="onSubmit">
        <legend
          class="text-primary font-nunito px-4 de:px-8 text-3xl de:text-2xl leading-none font-bold"
        >
          Ingresa tus datos
        </legend>
        <p class="text-base de:text-xs px-4 de:px-8 text-black mt-8">
          El SAT requiere esta información para poder emitir facturas.
        </p>
        <div class="px-4 de:px-8">
          <GxTextFieldNumeric
            v-model="postalCode"
            autofocus
            required
            :maxlength="5"
            class="mt-4 mb-2"
            label="Código Postal"
          />
        </div>
        <div class="de:px-4 mt-4">
          <GxDropdown
            v-model="taxRegime"
            watch-value
            placeholder="Régimen Fiscal"
            label="Régimen Fiscal"
            :error="taxRegimeError"
            :options="dropdownOptions"
          />
        </div>
        <div class="mt-8 mb-2 de:mb-0 flex justify-end de:justify-center">
          <GxButton
            :plain="$mq === 'mo'"
            :ghost="$mq === 'de'"
            class="text-alert de:text-primary"
            :disabled="loading"
            type="button"
            @click="$router.push({ name: 'dashboard' })"
            >cancelar</GxButton
          >
          <GxButton
            :plain="$mq === 'mo'"
            :ghost="$mq === 'de'"
            class="ml-4 mr-4 de:mr-0 text-primary de:text-white de:bg-primary-500"
            :loading="loading"
            type="submit"
            >enviar</GxButton
          >
        </div>
      </GxForm>
    </GxCardCore>
  </GxModal>
</template>

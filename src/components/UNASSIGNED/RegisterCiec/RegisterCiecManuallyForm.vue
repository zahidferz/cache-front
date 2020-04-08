<template>
  <form class="flex-grow flex flex-col">
    <GxInput
      v-model="taxId"
      label="RFC de tu empresa"
      placeholder="RFC de tu empresa"
      pattern="taxId"
      @valid="rfcValidation"
    />
    <GxInput
      v-model="companyName"
      label="Nombre o Razón Social"
      placeholder="Nombre o Razón Social"
      input-id="companyName"
      icon="business_center"
      :valid="companyName.length > 0"
    />
    <GxInput
      v-model="commercialName"
      label="Nombre Comercial"
      placeholder="Nombre Comercial"
      input-id="commercialName"
      icon="store_mall_directory"
      :valid="commercialName.length > 0"
    />
    <GxDropdown
      v-model="taxRegime"
      placeholder="Régimen Fiscal"
      label="Régimen Fiscal"
      :options="descriptions"
    />
    <GxButton plain :disabled="isValidForm" class="self-end">guardar</GxButton>
  </form>
</template>
<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import regimeList from '@src/assets/Catalogos/CAT_011_MEX_Regimen_fiscal.json'
export default {
  components: {
    GxInput,
    GxDropdown,
  },
  data() {
    return {
      regimeList,
      validRFC: false,
      validForm: this.isValidForm,
      taxId: '',
      companyName: '',
      commercialName: '',
      taxRegime: '',
      fiscalAddress: '',
    }
  },
  computed: {
    isValidForm() {
      if (
        this.validRFC &&
        this.companyName.length > 0 &&
        this.commercialName.length > 0 &&
        this.taxRegime.length > 0 &&
        this.fiscalAddress.length > 0
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
  },
  methods: {
    rfcValidation(newVal) {
      this.validRFC = newVal
    },
  },
}
</script>

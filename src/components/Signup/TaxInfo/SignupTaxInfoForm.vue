<script>
import gql from 'graphql-tag'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxCheckbox from '@components/_Core/Forms/GxCheckbox.vue'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import productKeys from '@src/assets/Catalogos/CAT_011_MEX_Regimen_fiscal.json'

export default {
  name: 'SignupTaxInfoForm',
  components: {
    GxDropdown,
    GxCheckbox,
  },
  apollo: {
    user: gql`
      {
        user @client {
          number
        }
      }
    `,
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
    subscription: gql`
      {
        subscription @client {
          number
        }
      }
    `,
    myAccount: gql`
      {
        myAccount {
          userNumber
          companies {
            company {
              companyNumber
            }
          }
        }
      }
    `,
  },
  data() {
    return {
      json: productKeys,
      taxId:
        this.$route && this.$route.query.taxId ? this.$route.query.taxId : '',
      legalName: '',
      commercialName:
        this.$route && this.$route.query.commercialName
          ? this.$route.query.commercialName
          : '',
      regimeDropdown: '',
      invalidTaxId: '',
      postalCode: '',
      desktopGoToXmls: true,
      customCommercialError: null,
      customCompanyError: null,
      customTaxError: null,
      customRegimeError: null,
      description: null,
      loading: false,
      loadingSuccess: false,
      customError: null,
      customErrorPostalCode: null,
    }
  },
  computed: {
    regimeCode() {
      if (this.regimeDropdown) {
        const result = this.filterRegime.find(
          (reg) => reg.description === this.regimeDropdown
        )
        return result.regime_code
      }
      return null
    },
    filterRegime() {
      if (this.taxId && this.taxId.length === 12) {
        return this.json.filter((data) => data.valid_for_company === true)
      }
      if (this.taxId && this.taxId.length === 13) {
        return this.json.filter((data) => data.valid_for_person === true)
      }
      return this.json
    },
    submitCopy() {
      return this.$mq === 'mo' ? 'continuar' : 'conectarme'
    },
    isEnterprise() {
      return (
        this.taxId.length > 0 && this.taxId.length === 12 && !this.invalidTaxId
      )
    },
  },
  watch: {
    taxId() {
      this.customTaxError = null
    },
    legalName: function(val) {
      if (val.length < 2) {
        this.customCompanyError =
          'Nombre o Razón Social debe contener más de dos caracteres'
      } else {
        this.customCompanyError = ''
      }
      if (val && this.$mq === 'mo') {
        localStorage.setItem('legalName', val)
      }
    },
    commercialName: function(val) {
      if (val.length === 1) {
        this.customCommercialError =
          'Nombre Comercial debe contener más de dos caracteres'
      } else {
        this.customCommercialError = ''
      }
    },
    desktopGoToXmls(newValue) {
      if (!newValue) {
        if (!this.invalidTaxId && this.taxId.length > 0) {
          localStorage.setItem('taxId', this.taxId)
        }
        if (this.commercialName) {
          localStorage.setItem('commercialName', this.commercialName)
        }
        if (this.postalCode) {
          localStorage.setItem('postalCode', this.postalCode)
        }
        if (this.legalName) {
          localStorage.setItem('legalName', this.legalName)
        }

        this.$router.push({ name: 'downloadxmls' })
      }
    },
    regimeDropdown: function(val) {
      if (val.length === 0) {
        this.customRegimeError = 'Debes seleccionar tu régimen fiscal'
      } else {
        this.customRegimeError = ''
      }
      if (this.regimeDropdown) {
        localStorage.setItem('regimeDropdown', this.regimeDropdown)
      }
    },
    postalCode(newValue) {
      this.customErrorPostalCode = ''
      if (newValue && this.$mq === 'mo') {
        localStorage.setItem('postalCode', newValue)
      }
    },
  },
  created() {
    const taxId = localStorage.getItem('taxId')
    if (taxId) {
      this.taxId = taxId
      localStorage.removeItem('taxId')
    }
    const commercialName = localStorage.getItem('commercialName')
    if (commercialName) {
      this.commercialName = commercialName
      localStorage.removeItem('commercialName')
    }
    const postalCode = localStorage.getItem('postalCode')
    if (postalCode) {
      this.postalCode = postalCode
      localStorage.removeItem('postalCode')
    }
    const legalName = localStorage.getItem('legalName')
    if (legalName) {
      this.legalName = legalName
      localStorage.removeItem('legalName')
    }
    const regimeDropdown = localStorage.getItem('regimeDropdown')
    if (regimeDropdown) {
      this.regimeDropdown = regimeDropdown
      localStorage.removeItem('regimeDropdown')
    }
  },
  methods: {
    onSubmit() {
      // if (this.$mq === 'mo') {
      //   this.$refs.taxId.setFocus()
      // }
      if (this.loading) {
        return
      }
      if (
        !this.taxId &&
        !this.legalName &&
        !this.regimeDropdown &&
        !this.postalCode &&
        !this.commercialName
      ) {
        this.customError = 'Debes completar los campos obligatorios'
        return
      } else {
        this.customError = null
        let error = false
        if (!this.taxId) {
          this.customTaxError = 'Este campo es necesario'
          error = true
        }
        if (!this.legalName) {
          this.customCompanyError = 'Nombre es un campo necesario'
          if (this.isEnterprise) {
            this.customCompanyError = 'Razón Social es un campo necesario'
          }
          error = true
        }
        if (!this.regimeDropdown) {
          this.customRegimeError = 'Debes seleccionar tu régimen fiscal'
          error = true
        }
        if (!this.postalCode) {
          this.customErrorPostalCode = 'Código postal es un campo necesario'
          error = true
        }
        if (!this.commercialName) {
          this.customCommercialError =
            'Nombre Comercial es un campo es necesario'
          error = true
        }
        if (error) return
      }
      // After input validation, send info
      this.loading = true
      axiosAccountProvisioning
        .post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            company: {
              taxId: this.taxId,
              legalName: this.legalName,
              commercialName: this.commercialName,
              companyDataLocalized: {
                regimenFiscalNombre: this.regimeDropdown,
                regimenFiscalCodigo: this.regimeCode,
              },
              fiscalAddress: {
                postalCode: this.postalCode,
                countryCode: 'MEX',
              },
            },
          }
        )
        .then((res) => {
          this.loading = false
          this.loadingSuccess = true
          setTimeout(() => {
            this.$router.push({ name: 'companyinfo' })
          }, 1000)
        })
        .catch((err) => {
          this.loading = false
          this.customError = this.$utils.parseServerError(err)
        })
    },
  },
}
</script>

<template>
  <div
    :class="{
      ' p-8 de:shadow-6 rounded-lg mt-16 m-16 z-10  gxContainer self-center bg-white':
        $mq === 'de',
      'flex-grow': $mq === 'mo',
    }"
  >
    <template v-if="$mq === 'de'">
      <p class="gx-h4 font-bold text-center mb-4 "
        >Ingresa tu información fiscal</p
      >
      <p class="mb-4 text-center"
        >Ingresa la información fiscal de la empresa.</p
      >
    </template>
    <GxForm class=" flex flex-col items-center mt-4" @submit="onSubmit">
      <div class="w-full px-4" :class="{ gxGridContainer: $mq === 'de' }">
        <GxTextFieldTaxId
          ref="taxId"
          v-model="taxId"
          required
          label="RFC"
          name="RFC"
          placeholder="RFC"
          autofocus
          :error="customTaxError"
          class="mb-2"
        />
        <!-- <GxInput
          ref="taxId"
          v-model="taxId"
          data-taxId
          label="RFC*"
          name="RFC*"
          pattern="taxId"
          placeholder="RFC*"
          autofocus
          :error="customTaxError"
          @valid="invalidTaxId = $event"
        /> -->
        <GxTextFieldBusinessName
          v-model="legalName"
          required
          label="Nombre o Razón Social"
          placeholder="Nombre o Razón Social"
          name="Nombre o Razón Social"
          icon="business_center"
          :error="customCompanyError"
          class="mb-2"
        />
        <!-- <GxInput
          v-model="legalName"
          label="Nombre o Razón Social*"
          placeholder="Nombre o Razón Social*"
          name="Nombre o Razón Social*"
          icon="business_center"
          :error="customCompanyError"
          pattern="business-name"
        /> -->
        <GxTextField
          v-model="commercialName"
          required
          left-icon="store_mall_directory"
          label="Nombre Comercial"
          name="Nombre Comercial"
          :error="customCommercialError"
          class="mb-2"
        />
        <!-- <GxInput
          v-model="commercialName"
          placeholder="Nombre Comercial*"
          label="Nombre Comercial*"
          name="Nombre Comercial"
          input-id="commercialName"
          icon="store_mall_directory"
          :error="customCommercialError"
        /> -->
        <GxTextFieldNumeric
          v-model="postalCode"
          required
          name="C.P."
          label="C.P.*"
          :error="customErrorPostalCode"
          :maxlength="5"
          left-icon="map"
          class="mb-2"
        />
        <!-- <GxInput
          v-model="postalCode"
          placeholder="C.P.*"
          name="C.P."
          label="C.P.*"
          input-id="postalCode"
          :error="customErrorPostalCode"
          :maxlength="5"
          pattern="numeric"
          icon="map"
        /> -->
      </div>

      <GxDropdown
        v-model="regimeDropdown"
        class="de:mt-0"
        placeholder="Régimen fiscal*"
        label="Régimen fiscal*"
        :options="filterRegime.map((regime) => regime.description)"
        :error="customRegimeError"
      />
      <GxCheckbox
        v-if="$mq === 'de'"
        v-model="desktopGoToXmls"
        class="self-end mb-4 pr-4"
        input-id="checkboxInput"
        label="Ingresar mi información manualmente."
        checked
      />
      <p class="text-alert h-4 mb-2">
        <span v-if="customError"> {{ customError }} </span>
      </p>
      <GxButton
        :plain="$mq === 'mo'"
        :class="{
          'self-end': $mq === 'mo',
          'mr-4': $mq === 'mo' && loading,
          'self-center mb-2': $mq === 'de',
        }"
        class="px-4"
        type="submit"
        :loading="loading"
        :loading-success="loadingSuccess"
        :disabled="loading"
        >{{ submitCopy }}</GxButton
      >
      <p v-if="$mq === 'de'" class="self-center  mt-6 gx-caption de:gx-caption"
        >Tu información está protegida.<GxTextLink
          target-blank
          :to="{ name: 'privacypolicy' }"
          class="text-secondary"
        >
          Conoce cómo</GxTextLink
        ></p
      >
    </GxForm>
  </div>
</template>

<style lang="scss" scoped>
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0 1rem;
}

.gxContainer {
  width: 750px;
}
</style>

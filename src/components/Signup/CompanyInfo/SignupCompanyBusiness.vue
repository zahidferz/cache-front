<script>
import gql from 'graphql-tag'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import GxCardImageAndLabel from '@components/_Core/Cards/GxCardImageAndLabel'
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxTextArea from '@components/_Core/Forms/GxTextArea'
import GxDropdown from '@components/_Core/Forms/GxDropdown'
import GxInput from '@components/_Core/Forms/GxInput'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
const err = 'Este campo es necesario'

export default {
  name: 'SignupCompanyBusiness',
  components: {
    GxCardCore,
    GxTextArea,
    GxCardModal,
    GxDropdown,
    GxInput,
    GxCardImageAndLabel,
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
      loading: false,
      customError: null,
      validForm: false,
      onSubmitCompleted: false,
      mainProblem: '',
      teamMemberCount: '',
      businessSelectionInner: '',
      businessSelection: '',
      branchOfficesCount: '',
      loadingDesk: false,
      bgImg: require('@assets/images/DE/CompanyInfo/CompanyBusiness/de_002_01_fondoguru.svg'),
      emptyInput: null,
      pickedBusiness: null,
      customErrorBusinessSelection: null,
      customErrorBranchOfficesCount: null,
      customErrorTeamMemberCount: null,
      customErrorBusinessSelectionInner: null,
      loadingSuccess: false,
    }
  },
  computed: {
    teamMemberCountOptions() {
      const arrayNumbers = []
      for (let i = 1; i <= 99; i++) {
        const numbers = i === 99 ? (i = '99+') : i
        arrayNumbers.push(`${numbers}`)
      }
      return arrayNumbers
    },

    businessOptions() {
      return this.options.map((option) => {
        return option.title
      })
    },
    options() {
      let options = [
        {
          title: 'Comercio',
          image: require('@assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_comercio.svg'),
          alt: 'comercio',
        },
        {
          title: 'Servicios',
          image: require('@assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_servicios.svg'),
          alt: 'servicios',
        },
        {
          title: 'Despacho contable',
          image: require('@assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_despacho.svg'),
          alt: 'despacho',
        },
        {
          title: 'Manufactura',
          image: require('@assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_manufactura.svg'),
          alt: 'manufactura',
        },
      ]

      if (this.$mq === 'de') {
        options.push({
          title: 'Otro',
          image: require('@assets/images/Signup/CompanyInfo/GiroComercial/businessImages/MO_001_3_manufactura.svg'),
          alt: 'otro',
          clickHandler: () => {
            this.businessSelected('Otro')
          },
        })
      }

      return options
    },
  },
  watch: {
    businessSelectionInner(newVal) {
      if (newVal === 'Otro') {
        this.businessSelection = ''
      } else {
        this.businessSelection = newVal
      }
      this.customErrorBusinessSelectionInner = null
    },
    branchOfficesCount() {
      this.customErrorBranchOfficesCount = null
    },
    teamMemberCount() {
      this.customErrorTeamMemberCount = null
    },
    businessSelection() {
      this.customErrorBusinessSelection = null
    },
  },
  methods: {
    async businessSelected(selection) {
      try {
        this.pickedBusiness = selection
        this.loading = true
        await axiosAccountProvisioning.post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            subscription: {
              registry: {
                businessProfileActivity: selection,
              },
            },
          }
        )
        this.$mq === 'de' ? (this.loading = false) : (this.loading = true)
        this.$router.push({ name: 'teamMemberCount' })
      } catch (error) {
        this.loading = false
        this.customError = this.$utils.parsedServerError(error)
      }
    },
    validateInputs() {
      if (!this.businessSelectionInner) {
        this.customErrorBusinessSelectionInner = err
      } else {
        this.customErrorBusinessSelectionInner = null
      }

      if (this.businessSelectionInner && !this.bussinessSelection) {
        this.customErrorBusinessSelection = err
      } else {
        this.customErrorBusinessSelection = null
      }

      if (!this.teamMemberCount) {
        this.customErrorTeamMemberCount = err
      } else {
        this.customErrorTeamMemberCount = null
      }

      if (!this.branchOfficesCount) {
        this.customErrorBranchOfficesCount = err
      } else {
        this.customErrorBranchOfficesCount = null
      }
    },
    validations() {
      if (
        !this.businessSelectionInner &&
        !this.teamMemberCount &&
        !this.branchOfficesCount
      ) {
        this.emptyInput = 'Debes completar los campos obligatorios'
      } else if (
        !this.businessSelectionInner ||
        !this.teamMemberCount ||
        !this.branchOfficesCount ||
        (this.businessSelectionInner === 'Otro' && !this.businessSelection)
      ) {
        this.emptyInput = ''
        this.validateInputs()
      } else {
        this.onSubmit()
      }
    },
    async onSubmit() {
      this.emptyInput = ''
      this.loadingDesk = true
      try {
        await axiosAccountProvisioning.post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            subscription: {
              registry: {
                businessProfileActivity: this.businessSelection,
                businessSizeEmployees: this.teamMemberCount,
                businessSizeBranches: this.branchOfficesCount,
                businessBiggestProblem: this.mainProblem,
              },
            },
          }
        )
        this.loadingDesk = false
        this.loadingSuccess = true
        setTimeout(() => {
          this.onSubmitCompleted = true
        }, 1000)
        const timeout = setTimeout(() => {
          this.$router.push({ name: 'dashboard' })
        }, 3000)
        this.$once('hook:destroyed', () => {
          clearTimeout(timeout)
        })
      } catch (error) {
        this.loadingDesk = false
        this.customError = this.$utils.parsedServerError(error)
      }
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col p-4 de:p-0 de:bg-primary">
    <MqLayout class="flex-grow flex flex-col items-center" mq="mo">
      <!-- <GxCarousel :cards="options" @click="businessSelected" /> -->
      <GxCardImageAndLabel
        v-for="(option, index) in options"
        :key="index"
        class="mb-4"
        :image="option.image"
        :alt="option.alt"
        :label="option.title"
        :loading="loading && pickedBusiness === option.title"
        :disabled="loading && pickedBusiness !== option.title"
        @click="businessSelected(option.title)"
      />
      <div class="flex justify-end fixed right-0 bottom-0 mb-4 mr-4">
        <GxFab
          dark
          class="inline-block shadow-9"
          label="Otro rol"
          @click="$router.push({ name: 'otherBusiness' })"
        />
      </div>
    </MqLayout>
    <MqLayout class="flex-grow flex items-center w-full justify-center" mq="de">
      <GxCardCore :clickable="false" class="gxCardFormDesk px-4 py-8 shadow-3">
        <h1 class="gx-h4 font-bold text-center mb-8">Último Paso</h1>
        <form @submit.prevent="validations">
          <div
            class="mb-2"
            :class="{ 'mb-4': businessSelectionInner !== 'Otro' }"
          >
            <GxDropdown
              v-model="businessSelectionInner"
              placeholder="¿A qué se dedica tu empresa?*"
              label="¿A qué se dedica tu empresa?*"
              :options="businessOptions"
              :error="customErrorBusinessSelectionInner"
              keep-typed-value
            >
            </GxDropdown>
          </div>
          <GxInput
            v-if="businessSelectionInner === 'Otro'"
            v-model="businessSelection"
            icon="store_mall_directory"
            label="Giro comercial de tu empresa*"
            placeholder="Giro comercial de tu empresa*"
            :error="customErrorBusinessSelection"
          />
          <div class="my-4">
            <GxDropdown
              v-model="teamMemberCount"
              placeholder="Elige cuántos son en el equipo*"
              label="Elige cuántos son en el equipo*"
              :options="teamMemberCountOptions"
              :error="customErrorTeamMemberCount"
              keep-typed-value
            />
          </div>
          <div class="mb-4">
            <GxDropdown
              v-model="branchOfficesCount"
              placeholder="Elige cuántas sucursales tienes*"
              label="Elige cuántas sucursales tienes*"
              :options="teamMemberCountOptions"
              :error="customErrorBranchOfficesCount"
              keep-typed-value
            />
          </div>
          <GxTextArea
            v-model="mainProblem"
            class="px-4 mb-8"
            label="¿Cuál es el problema principal que quieres resolver con Chain?"
            placeholder=""
          />
          <p class="text-center text-alert mb-2 ">
            <span v-if="emptyInput">
              {{ emptyInput }}
            </span>
          </p>
          <GxButton
            type="submit"
            :loading="loadingDesk"
            :loading-success="loadingSuccess"
            :disabled="validForm"
            class="mx-auto"
            >Iniciar</GxButton
          >
        </form>
      </GxCardCore>
      <GxCardModal
        v-if="onSubmitCompleted"
        headline="¡Bienvenido!"
        text-body="Tú, tu equipo y tu empresa están dentro junto a miles de empresas que solo utilizan la mejor plataforma."
        :card-img="$utils.alertImages.Success"
        alt="Imagen de éxito"
        @click="$router.push({ name: 'dashboard' })"
      />
      <GxCardModal
        v-if="customError"
        :headline="customError"
        :card-img="$utils.alertImages.Oops"
        :alt="customError"
        @click="customError = !customError"
      />
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
.gxCardFormDesk {
  width: 27rem;
}
.backgroundSize {
  background-size: 71% 100%;
}

@media only screen and (max-width: 800px) {
  .backgroundSize {
    background-size: 55% 100%;
  }
  .group-image {
    display: none;
  }
}
</style>

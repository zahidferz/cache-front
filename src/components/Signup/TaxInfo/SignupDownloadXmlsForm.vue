<script>
import GxCheckbox from '@components/_Core/Forms/GxCheckbox.vue'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'

import { UPDATE_TAX_CIEC } from '@src/apollo//mutations'
import gql from 'graphql-tag'

let counter = 0
export default {
  name: 'SignupDownloadXmlForm',
  components: {
    GxCheckbox,
    GxCardModal,
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            userNumber
            jobTitle
            companies {
              company {
                companyNumber
              }
            }
          }
        }
      `,
      error(error) {
        if (
          error &&
          error &&
          error.networkError &&
          error.networkError.result &&
          error.networkError.result.errors
        ) {
          if (
            error.networkError.result.errors[0].extensions.code ===
            'UNAUTHENTICATED'
          ) {
            const fullPath = this.$route.fullPath
            this.$router.push({
              name: 'logout',
              query: { redirectFrom: fullPath },
            })
          }
        }
      },
    },
  },
  data() {
    return {
      image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
      passwordCiec: '',
      taxId: '',
      commercialName: '',
      customCommercialNameError: null,
      invalidPassword: false,
      invalidTaxId: false,
      customTaxIdError: null,
      customPasswordError: null,
      submitError: false,
      desktopManual: false,
      customError: null,
      loading: false,
      loadingSuccess: false,
      errors: null,
      hasFocus: false,
    }
  },
  computed: {
    collapseImage() {
      return this.hasFocus && !this.$utils.isIphone
    },
  },
  watch: {
    commercialName() {
      this.customCommercialNameError = null
    },
    taxId() {
      this.customTaxIdError = null
    },
    passwordCiec() {
      this.customPasswordError = null
    },
    desktopManual(newValue) {
      if (newValue) {
        if (!this.invalidTaxId && this.taxId.length > 0) {
          localStorage.setItem('taxId', this.taxId)
        }
        if (this.commercialName) {
          localStorage.setItem('commercialName', this.commercialName)
        }
        this.$router.push({ name: 'taxinfoform' })
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
  },
  mounted() {
    const timeout = setTimeout(() => {
      this.hasFocus = true
    }, 2000)
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timeout)
    })
  },
  methods: {
    async onSubmit() {
      // if (this.$mq === 'mo') {
      //   this.$refs.taxId.setFocus()
      // }
      counter = ++counter
      if (
        (!this.taxId && !this.passwordCiec && !this.commercialName) ||
        !this.taxId
      ) {
        this.customTaxIdError = 'Te falta capturar tu RFC'
        return
      } else {
        this.customTaxIdError = ''
      }
      if (counter > 1 && !this.passwordCiec) {
        this.customPasswordError =
          'Si no recuerdas tu contraseña del SAT puedes capturar tus datos manualmente'
        return
      } else {
        this.customPasswordError = ''
      }
      if (
        (this.customPasswordError && !this.taxId && !this.commercialName) ||
        !this.commercialName
      ) {
        this.customCommercialNameError = 'Te falta ingresar el Nombre Comercial'
        return
      }
      try {
        this.loading = true
        await this.$apollo.mutate({
          // Query
          mutation: UPDATE_TAX_CIEC,
          // Parameters
          variables: {
            companyNumber: this.myAccount.companies[0].company.companyNumber,
            taxId: this.taxId,
            ciec: this.passwordCiec,
            commercialName: this.commercialName,
          },
        })
        this.loading = false
        this.loadingSuccess = true
        this.$router.push({ name: 'companyinfo' })
      } catch (error) {
        this.loading = false
        if (this.$mq === 'mo') {
          this.customError = this.$utils.parseServerError(error)
          const timeout = setTimeout(() => {
            this.customError = null
          }, 3000)
          this.$once('hook:destroyed', () => {
            clearTimeout(timeout)
          })
        } else {
          this.submitError = this.$utils.parseServerError(error)
        }
      }
    },
  },
}
</script>
<template>
  <div
    class=" flex-grow flex flex-col justify-between de:bg-primary de:justify-center"
    :class="{ bgColor: $mq === 'mo' }"
  >
    <template v-if="$mq === 'mo'" class="flex-grow flex flex-col">
      <!-- <transition name="slide"> -->
      <div
        class="overflow-x-hidden"
        :class="{ gxImageContainer: !collapseImage }"
      ></div>
      <!-- </transition> -->
      <div
        class="flex-grow flex flex-col justify-around bg-primary rounded-t-xl p-4 pb-0 text-white formContainer"
      >
        <h1 class="text-white mb-4">
          Ingresa tus datos para descargar tus XMLs directo del SAT.
        </h1>
        <GxForm
          class="flex-grow flex flex-col items-center justify-start mb-8"
          autocomplete="off"
          @submit="onSubmit"
        >
          <GxTextFieldDarkTaxId
            v-model="taxId"
            class="mb-4"
            required
            icon="business"
            name="RFC*"
            label="RFC*"
            autocomplete="new-password"
            :error="customTaxIdError"
            @focus="hasFocus = true"
            @blur="hasFocus = false"
          />
          <!-- <GxInput
            ref="taxId"
            v-model="taxId"
            dark
            pattern="taxId"
            icon="business"
            placeholder="RFC*"
            name="RFC*"
            label="taxId"
            autocomplete="new-password"
            autofocus
            :error="customTaxIdError"
            @valid="invalidTaxId = $event"
            @focus="collapseImage = true"
            @blur="collapseImage = false"
          /> -->
          <GxTextFieldDarkCiec
            v-model="passwordCiec"
            class="mb-4"
            required
            label="Contraseña del SAT (CIEC)*"
            name="Contraseña del SAT (CIEC)*"
            :error="customPasswordError"
            autocomplete="new-password"
            @focus="hasFocus = true"
            @blur="hasFocus = false"
          />
          <!-- <GxInput
            v-model="passwordCiec"
            dark
            pattern="ciec"
            placeholder="Contraseña del SAT (CIEC)*"
            label="ciec*"
            name="ciec*"
            :error="customPasswordError"
            autocomplete="new-password"
            @valid="invalidPassword = $event"
            @focus="collapseImage = true"
            @blur="collapseImage = false"
          /> -->
          <GxTextFieldDark
            v-model="commercialName"
            class="mb-4"
            required
            left-icon="store_mall_directory"
            :error="customCommercialNameError"
            label="Nombre Comercial*"
            name="Nombre Comercial*"
            autocomplete="off"
            @focus="hasFocus = true"
            @blur="hasFocus = false"
          />
          <!-- <GxInput
            v-model="commercialName"
            icon="store_mall_directory"
            :error="customCommercialNameError"
            dark
            placeholder="Nombre Comercial*"
            label="Nombre Comercial*"
            name="Nombre Comercial*"
            autocomplete="off"
            @focus="collapseImage = true"
            @blur="collapseImage = false"
          /> -->
          <div class="flex flex-col items-center ">
            <p class="text-white gx-caption mr-2 gx-caption de:gx-caption"
              >Tu información está protegida.
              <GxTextLink target-blank :to="{ name: 'privacypolicy' }">
                Conoce cómo.</GxTextLink
              ></p
            >
            <GxButton :loading="loading" type="submit" class="mt-8" dark
              >conectarme</GxButton
            >
            <p class="text-white gx-caption"
              >O<GxTextLink
                :to="{ name: 'taxinfoform', query: { taxId, commercialName } }"
              >
                ingresar mi información manualmente.</GxTextLink
              ></p
            >
          </div>
        </GxForm>
      </div>
    </template>
    <template v-else>
      <div class="w-108 z-10  mx-auto de:shadow-6 rounded-lg p-8 bg-white">
        <p class="gx-h4 font-bold text-center pb-0"
          >Descarga tus XMLs directo del SAT</p
        >
        <p class="text-left mt-4"
          >Ingresa tus datos para conectarnos y descargar tus XMLs directo del
          SAT</p
        >
        <GxForm
          class="mt-4 flex flex-col"
          autocomplete="off"
          @submit="onSubmit"
        >
          <GxTextFieldTaxId
            v-model="taxId"
            class="mb-2"
            required
            icon="business"
            name="RFC*"
            label="RFC*"
            autocomplete="off"
            autofocus
            :error="customTaxIdError"
          />
          <GxTextFieldCiec
            v-model="passwordCiec"
            class="mb-2"
            required
            name="Contraseña del SAT (CIEC)*"
            label="Contraseña del SAT (CIEC)*"
            autocomplete="new-password"
            :error="customPasswordError"
          />
          <GxTextField
            v-model="commercialName"
            required
            class="mb-8"
            left-icon="store_mall_directory"
            :error="customCommercialNameError"
            autocomplete="off"
            name="Nombre Comercial*"
            label="Nombre Comercial*"
          />
          <GxCheckbox
            v-model="desktopManual"
            class="self-end"
            input-id="checkboxInput"
            label="Ingresar mi información manualmente."
          />
          <div
            class="flex flex-col items-center mt-2 text-center"
            :class="{ 'mt-8': !submitError }"
          >
            <p v-if="submitError" class="text-alert mb-2">{{ submitError }}</p>
            <GxButton
              :loading="loading"
              :loading-success="loadingSuccess"
              type="submit"
              class="mb-8"
              >conectarme</GxButton
            >
            <p class="gx-caption de:gx-caption">
              Tu información está protegida.
              <GxTextLink
                target-blank
                class="text-secondary-300 gx-caption de:gx-caption"
                :to="{ name: 'privacypolicy' }"
              >
                Conoce cómo.</GxTextLink
              >
            </p>
          </div>
        </GxForm>
      </div>
      <GxCardModal
        v-if="customError"
        :headline="customError"
        :card-img="$utils.alertImages.Oops"
        text-body=""
        @click="customError = false"
      />
    </template>
    <GxCardModal
      v-if="customError"
      :headline="customError"
      :card-img="$utils.alertImages.Oops"
      @click="customError = false"
    />
  </div>
</template>
<style lang="scss" scoped>
// Slide image

// .slide-enter-active {
//   transition-timing-function: ease-in;
//   transition-duration: 0.3s;
// }
// .slide-leave-active {
//   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
//   transition-duration: 0.3s;
// }
// .slide-enter-to,
// .slide-leave {
//   max-height: 100px;
//   overflow: hidden;
// }

// .slide-enter,
// .slide-leave-to {
//   max-height: 0;
//   overflow: hidden;
// }
// .handsome-height {
//   z-index: 100;
//   height: calc(100vh - 540px - 16px - 16px);
// }
.formContainer {
  transform: translateY(-14px);
}
.gxImageContainer {
  // Padding hack https://css-tricks.com/scale-svg/
  width: 100%;
  padding-bottom: calc(100% * 244 / 360);
  margin-top: -2.5rem;
  background-image: url(~@assets/images/Login/mo_001_2_Descargarxml.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-size: cover;
  transition: all 0.2s ease-in-out;
}

// @media only screen and (max-height: 650px) {
//   .bottom-container {
//     display: none;
//   }
//   .handsome-height {
//     display: none;
//   }
// }
// .gxImageContainer {
//   width: 100%;
//   padding-bottom: calc(100% * 244 / 360);
//   margin-top: -3.25rem;
//   background-image: url(~@assets/images/Signup/TaxInfo/mo_001_2_Descarga_XMLs_del_SAT.svg);
//   background-repeat: no-repeat;
//   background-position-x: center;
//   background-size: cover;
//   transition: all 0.2s ease-in-out;
//   // Padding hack https://css-tricks.com/scale-svg/
// }
// .backdrop-radius {
//   margin-top: -2rem;
//   border-radius: 16px 16px 0 0;
//   transform: translateY(-18px);
// }
// .bottom-container {
//   width: 100vw;
//   height: 17vh;
//   overflow: hidden;
//   background: #bea0ff;
//   clip-path: url(#);
// }
// .ellipse {
//   z-index: -1;
//   width: 110%;
//   height: 200%;
//   margin-left: -5%;
//   background-color: white;
//   border-radius: 50%;
//   transform: translateY(calc(-70% + 16px));
// }
</style>

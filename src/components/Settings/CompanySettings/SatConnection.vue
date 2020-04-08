<script>
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxDisabledInput from '@components/_Core/Forms/GxDisabledInput'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
import { UPDATE_COMPANY_CIEC } from '@src/apollo//mutations'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
export default {
  name: 'SatConnection',
  components: { GxLoader, GxDisabledInput, GxCardModal },
  apollo: {
    company: LOCAL_COMPANY,
    companyInfo: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
      update(data) {
        return data.myAccount.companies[0].company
      },
    },
  },
  data() {
    return {
      company: null,
      errorMsg: null,
      serverError: null,
      companyInfo: null,
      showSuccessAlert: false,
      showErrorAlert: false,
      timeout: null,
      taxIdValidation: true,
      loading: false,
      ciec: '',
      taxId: '',
      successAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_6_exitousuario.svg'),
      errorAlertImage: this.$utils.alertImages.Oops,
    }
  },
  computed: {
    formEmty() {
      if (this.updateRFC) {
        return !this.ciec || !this.taxId
      }
      return !this.ciec
    },
    isTaxIdInValid() {
      if (this.updateRFC) {
        return !!this.taxIdValidation
      }
      return false
    },
    updateRFC() {
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
    companyName() {
      if (!this.companyInfo) return ''
      if (this.companyInfo.commercialName) {
        return this.companyInfo.commercialName
      }
      if (this.companyInfo.legalName) {
        return this.companyInfo.legalName
      }
      return ''
    },
  },
  watch: {
    formEmty(newVal) {
      if (!newVal) {
        this.errorMsg = null
        this.serverError = null
      }
    },
    companyInfo(newVal) {
      this.taxId = newVal.taxId
    },
  },
  methods: {
    onSuccessModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.$router.push({ name: 'dashboard', query: { drawerRight: true } })
    },
    onErrorModalClose() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.showErrorAlert = false
    },
    dispatchUpadateCIEC() {
      return this.$apollo.mutate({
        mutation: UPDATE_COMPANY_CIEC,
        variables: {
          companyNumber: this.company.number,
          data: {
            taxId: this.updateRFC ? this.taxId : this.companyInfo.taxId,
            commercialName: this.companyInfo.commercialName,
            ciec: this.ciec,
          },
        },
      })
    },
    async onSubmit() {
      try {
        if (this.formEmty) {
          this.errorMsg = 'Faltan datos obligatorios'
          this.serverError = null
          return
        }
        this.loading = true
        await this.dispatchUpadateCIEC()
        this.showSuccessAlert = true
        this.timeout = setTimeout(() => {
          this.onSuccessModalClose()
        }, 3000)
      } catch (error) {
        this.serverError = this.$utils.parseServerError(error)
        if (
          this.serverError ===
          'No tienes permisos para actualizar la información fiscal de la compañía'
        ) {
          this.errorAlertImage = this.$utils.alertImages.Dissapointed
        } else {
          this.errorAlertImage = this.$utils.alertImages.Oops
        }

        this.showErrorAlert = true
        this.timeout = setTimeout(() => {
          this.onErrorModalClose()
        }, 3000)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<template>
  <section
    v-if="$apollo.queries.companyInfo.loading"
    class="flex flex-col flex-grow items-center justify-center"
  >
    <GxLoader />
  </section>
  <section
    v-else
    class="flex flex-col flex-grow de:flex-grow-0 pt-4 px-4 de:px-8 de:mx-auto de:rounded-lg de:mt-32 de:pt-8 de:pb-6  de:shadow-3 de:w-108"
  >
    <p v-if="updateRFC" class=""
      >Ingresa tu información para descargar tus XMLs directo del SAT.</p
    >
    <p v-else-if="companyInfo" class=""
      >Puedes modificar tu CIEC relacionado al RFC de {{ companyName }}.</p
    >
    <GxForm class="w-full mt-8" autocomplete="off" @submit="onSubmit">
      <GxTextFieldTaxId
        v-if="updateRFC"
        ref="taxId"
        v-model="taxId"
        disabled
        watch-value
        label="RFC*"
        icon="business"
        class="mb-2"
        @valid="taxIdValidation = $event"
      />
      <GxDisabledInput
        v-else-if="companyInfo"
        icon="business"
        :value="companyInfo.taxId"
        label="RFC*"
        name="RFC"
      />
      <GxTextFieldCiec
        v-model="ciec"
        label="Contraseña del SAT (CIEC)"
        icon="lock"
        autocomplete="new-password"
        name="ciec"
      />
      <div class="flex w-full flex-col items-center mt-8">
        <p v-if="errorMsg" class="text-alert text-center  mb-2">{{
          errorMsg
        }}</p>
        <GxButton :loading="loading" type="submit">
          ACTUALIZAR
        </GxButton>
      </div>
    </GxForm>
    <GxCardModal
      v-if="showSuccessAlert"
      headline="CIEC actualizada"
      :card-img="$utils.alertImages.Done"
      alt="CIEC actualizada"
      @close="onSuccessModalClose"
    />
    <GxCardModal
      v-if="showErrorAlert"
      :headline="serverError"
      :card-img="errorAlertImage"
      @close="onErrorModalClose"
    />
  </section>
</template>

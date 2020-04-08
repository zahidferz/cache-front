<script>
// import GxButton from '@src/components/_Core/Buttons/GxButton' // Now global
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import gql from 'graphql-tag'
import { USER_UPDATE } from '@src/apollo//mutations'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'

export default {
  name: 'UpdateMyInfo',
  components: {
    // GxButton,
    GxCardModal,
    GxDesktopHeader,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: gql`
        {
          myAccount {
            firstName
            lastName
            mobilePhone
          }
        }
      `,
      error(error) {
        this.error = error.message
      },
    },
  },
  data() {
    return {
      company: null,
      name: '',
      phone: '',
      lastname: '',
      showSuccessAlert: false,
      showErrorAlert: false,
      successAlertImg: require('@assets/images/Signup/InitialTodos/mo_001_6_exitousuario.svg'),
      errorAlertImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      loading: false,
      nameError: null,
      invalidName: false,
      lastnameError: null,
      invalidLastname: false,
      phoneError: null,
      invalidPhone: false,
      customError: null,
      initialDataSet: false,
      timeout: null,
    }
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
    name(val) {
      this.nameError = ''
    },
    lastname(val) {
      this.lastnameError = ''
    },
    phone(val) {
      this.phoneError = ''
    },
  },
  methods: {
    setFormData(newVal) {
      this.name = newVal.firstName
      this.phone = newVal.mobilePhone
      this.lastname = newVal.lastName
      this.initialDataSet = true
    },
    async onSubmit() {
      try {
        this.loading = true

        await this.$apollo.mutate({
          mutation: USER_UPDATE,
          variables: {
            data: {
              firstName: this.name,
              lastName: this.lastname,
              mobilePhone: this.phone,
            },
          },
          update: (
            store,
            {
              data: {
                userUpdate: { firstName, lastName, mobilePhone },
              },
            }
          ) => {
            // // Read the data from our cache for this query.
            const query = {
              query: COMPANY_INFO,
              variables: { companyNumber: this.company.number },
            }
            const data = store.readQuery(query)
            data.myAccount.firstName = firstName
            data.myAccount.lastName = lastName
            data.myAccount.mobilePhone = mobilePhone
            store.writeQuery({ ...query, data })
          },
        })

        this.loading = false
        this.showSuccessAlert = true
        this.timeout = setTimeout(() => {
          this.closeSuccesModal()
        }, 3000)
      } catch (error) {
        this.loading = false
        this.customError = this.$utils.parseErrorServer(error)
        this.showErrorAlert = true
      }
    },
    closeSuccesModal() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.showSuccessAlert = false
      this.$router.push({ name: 'dashboard' })
    },
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col">
    <MqLayout mq="de" class="flex">
      <GxDesktopHeader
        v-if="$mq === 'de'"
        header="Actualizar mi información"
        icon="keyboard_backspace"
        :icon-click-handler="goBack"
      />
    </MqLayout>
    <div
      class="flex mt-4 de:p-8 p-4 de:mx-auto de:mt-32 de:p-4 de:shadow-3 de:relative de:rounded-lg de:w-108"
    >
      <GxForm class="flex-grow flex flex-col" @submit="onSubmit">
        <GxTextFieldName
          v-if="initialDataSet"
          v-model="name"
          label="Nombre"
          class="mb-4 de:mb-2"
          left-icon="face"
          required
        />
        <GxTextFieldName
          v-if="initialDataSet"
          v-model="lastname"
          label="Apellido"
          left-icon="face"
          class="mb-4 de:mb-2"
          required
        />
        <GxTextFieldPhone
          v-if="initialDataSet"
          v-model="phone"
          label="Teléfono"
          required
        />
        <div class="flex-grow flex flex-col justify-end mx-auto items-center">
          <p class="h-4">
            <span v-if="customError" class="text-alert">{{ customError }}</span>
          </p>
          <GxButton class="mt-4" :loading="loading" type="submit">
            Actualizar
          </GxButton>
        </div>
      </GxForm>
      <GxCardModal
        v-if="showSuccessAlert"
        headline="Info actualizada"
        :card-img="$utils.alertImages.Done"
        alt="Imagen de éxito"
        @click="closeSuccesModal"
        @close="closeSuccesModal"
      >
      </GxCardModal>
      <GxCardModal
        v-if="showErrorAlert"
        headline="Ops, algo salió mal. Inténtalo de nuevo."
        :card-img="$utils.alertImages.Oops"
        alt="Ops, algo salió mal. Inténtalo de nuevo."
        @close="showErrorAlert = false"
      >
      </GxCardModal>
    </div>
  </div>
</template>

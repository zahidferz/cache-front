<script>
import gql from 'graphql-tag'
import get from 'lodash/get'
import { axiosAccountProvisioning } from '@src/axiosConfig'
const _ = {
  get,
}

export default {
  name: 'SignupOtherCompanyBusinessForm',
  components: {},
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
      otherBusiness: '',
      customErrorMsg: null,
    }
  },
  watch: {
    otherBusiness: function(val) {
      this.customErrorMsg = ''
      if (val.length > 100) {
        this.customErrorMsg = 'Debe contener menos de 100 caracteres.'
      }
    },
  },
  methods: {
    onSubmit() {
      if (this.otherBusiness.length === 0) {
        this.customErrorMsg = 'Escribe tu giro comercial'
        return
      }
      axiosAccountProvisioning
        .post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            subscription: {
              registry: {
                businessProfileActivity: this.otherBusiness,
              },
            },
          }
        )
        .then((res) => {
          this.$router.push({ name: 'teamMemberCount' })
        })
        .catch((err) => {
          this.loading = false
          this.customError = _.get(
            err,
            'response.data.message',
            'Hubo un error'
          )
        })
    },
  },
}
</script>
<template>
  <form class="flex-grow p-4 flex flex-col" @submit.prevent="onSubmit">
    <GxTextField
      v-model="otherBusiness"
      required
      left-icon="store_mall_directory"
      label="Giro Comercial"
      name="Giro Comercial"
      :error="customErrorMsg"
      class="mb-2"
      autofocus
    />

    <GxButton plain class="self-end pr-4" type="submit">continuar</GxButton>
  </form>
</template>

<script>
import VerticalCounter from './VerticalCounter'
import get from 'lodash/get'
import { axiosAccountProvisioning } from '@src/axiosConfig'
import gql from 'graphql-tag'

const _ = {
  get,
}

export default {
  name: 'SignupTeamMemberCount',
  components: {
    VerticalCounter,
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
      userNumber: '',
      memberCount: '1',
      loading: false,
    }
  },
  computed: {
    nums() {
      const nums = []
      for (let i = 1; i < 99; i++) {
        if (i < 10) {
          nums.push(`0${i}`)
        } else {
          nums.push(`${i}`)
        }
      }
      nums.push(`99+`)
      return nums
    },
  },
  methods: {
    onSubmit() {
      this.loading = true
      axiosAccountProvisioning
        .post(
          `/update_account/${this.myAccount.userNumber}/${
            this.myAccount.companies[0].company.companyNumber
          }`,
          {
            subscription: {
              registry: {
                businessSizeEmployees: this.memberCount,
              },
            },
          }
        )
        .then((res) => {
          this.loading = false
          this.$router.push({ name: 'branchOfficesCount' })
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
  <form class="flex-grow flex flex-col justify-between p-4 items-center">
    <div class="flex-grow flex flex-col justify-center">
      <VerticalCounter v-model="memberCount" :nums="nums" class="mb-8" />
    </div>
    <GxButton dark :loading="loading" @click="onSubmit">continuar</GxButton>
  </form>
</template>

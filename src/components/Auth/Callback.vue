<template>
  <div class="h-full relative">
    <div class="loading rounded-full center"></div>
    <GxCardModal
      v-if="headerError"
      :headline="headerError"
      :card-img="imageError"
      :text-body="bodyError"
      alt="Error"
      @close="cleanErrorState($router, 'dashboard')"
    >
      <template v-if="modalButtons" v-slot:actions>
        <div class="flex justify-end mt-4">
          <GxButton plain @click.stop="cleanErrorState($router, 'logout')"
            >ENTENDIDO</GxButton
          >
        </div>
      </template>
    </GxCardModal>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { getters, mutations } from '@src/store'
export default {
  components: {
    GxCardModal,
  },
  data() {
    return {
      error: null,
    }
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            userNumber
            email
            jobTitle
            userSecurityStatus
            companies {
              company {
                companyNumber
                taxId
                companyProfile {
                  businessProfileActivity
                  businessSizeEmployees
                  businessSizeBranches
                  businessBiggestProblem
                }
              }
            }
          }
        }
      `,
    },
  },
  computed: {
    ...getters,
  },
  watch: {
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          if (window.bugsnagClient) {
            /* eslint-disable */
            console.log('Config bug')
            /* eslint-enable */
            window.bugsnagClient.user = {
              email: newVal.email,
            }
          }

          /* eslint-disable */
          console.log('Callback')
          console.log(localStorage.getItem('redirectTo'))
          /* eslint-enable */
          try {
            let redirectTo
            if (localStorage.getItem('redirectTo')) {
              redirectTo = JSON.parse(localStorage.getItem('redirectTo'))
              localStorage.removeItem('redirectTo')
            }

            // Account not secured yet, redirect
            if (newVal.userSecurityStatus !== 'secured') {
              /* eslint-disable */
              console.log(`1. Account not secured yet, redirect`)
              /* eslint-enable */
              this.$router.push({ name: 'signupAccountConfirmation' })
              return
            }

            // Missing Tax ID
            if (!newVal.companies[0].company.taxId) {
              /* eslint-disable */
              console.log(`2. Missing Tax ID`)
              /* eslint-enable */
              if (
                redirectTo &&
                redirectTo.name === 'signupAccountConfirmation'
              ) {
                /* eslint-disable */
                console.log('First time')
                /* eslint-enable */
                this.$router.push({ name: 'signupAccountConfirmation' })
              } else {
                this.$router.push({ name: 'downloadxmls' })
              }
              return
            }

            // Missing user role
            if (!newVal.jobTitle) {
              /* eslint-disable */
              console.log(`3. Missing jobTitle`)
              /* eslint-enable */
              // Local storage determines it the user is a Guest and adds the necessary query params
              if (redirectTo) {
                /* eslint-disable */
                console.log(`3.1 Redirecting from callback ${redirectTo}`)
                /* eslint-enable */
                this.$router.replace(redirectTo)
                return
              }
              /* eslint-disable */
              console.log(`3.2 No redirectTo, go to company role`)
              /* eslint-enable */
              this.$router.push({ name: 'companyrole' })
              return
            }
            // Missing company business profile
            if (
              !newVal.companies[0].company.companyProfile
                .businessProfileActivity
            ) {
              /* eslint-disable */
              console.log(`4. Missing business profile`)
              /* eslint-enable */
              this.$router.push({ name: 'companyrole' })
              return
            }
            // Missing employees count
            if (
              !newVal.companies[0].company.companyProfile.businessSizeEmployees
            ) {
              /* eslint-disable */
              console.log(`5.-1 Missing employees`)
              /* eslint-enable */
              if (this.$mq === 'mo') {
                this.$router.push({ name: 'teamMemberCount' })
              } else {
                this.$router.push({ name: 'companyBusiness' })
              }
              return
            }
            // Missing branch count
            if (
              !newVal.companies[0].company.companyProfile.businessSizeBranches
            ) {
              /* eslint-disable */
              console.log(`5.-2 Missing branch count`)
              if (this.$mq === 'mo') {
                /* eslint-enable */
                this.$router.push({ name: 'branchOfficesCount' })
              } else {
                this.$router.push({ name: 'companyBusiness' })
              }
              return
            }

            if (redirectTo) {
              /* eslint-disable */
              console.log(`6. Redirecting from callback`, redirectTo)
              /* eslint-enable */
              if (redirectTo.path === '/callback') {
                window.location.reload()
              }
              return this.$router.replace(redirectTo)
            }

            /* eslint-disable */
            console.log(`7. Straight to dashboard`)
            /* eslint-enable */
            this.$router.replace({ name: 'dashboard' })
          } catch (e) {
            console.error(e)
            // this.$router.replace('/')
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mutations,
    logout() {
      this.$router.push({ name: 'logout' })
    },
    reload() {
      window.location.reload()
    },
  },
}
</script>
<style lang="scss" scoped>
// Loader
@keyframes spin {
  from {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(0deg);
  }
  to {
    background: transparent;
    border: 2px solid var(--secondary-300);
    border-top-color: var(--primary-500);
    transform: rotate(360deg);
  }
}

.loading {
  width: 50px;
  min-width: 50px;
  height: 50px;
  transition: all 0.5s ease-in-out;
  animation-name: spin;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-delay: 500ms;
  animation-iteration-count: infinite;
}

.center {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
</style>

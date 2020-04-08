<script>
// This web view handles all authenticated routes
// Desktop layout has a fixed side navigation that should not animate on page transitions
import {
  UPDATE_COMPANY_NUMBER,
  UPDATE_BRANCH_NUMBER,
} from '@src/apollo/mutations'
import {
  COMPANY_NUMBER,
  BRANCHES,
  SOLVED_TODOS,
  TODOS,
  LOCAL_COMPANY,
  COMPANY_INFO,
} from '@src/apollo/queries'
import {
  TODOS_SUBSCRIPTION,
  SOLVED_TODOS_SUBSCRIPTION,
} from '@src/apollo/subscriptions'
import MenuBottom from '@components/Mobile/MenuBottom'
import { restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import GxLoader from '@components/_Core/Utils/GxLoader'
import Layout from '@layouts/LayoutWeb'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { getters, mutations } from '@src/store'
export default {
  name: 'Web',
  components: {
    Layout,
    MenuBottom,
    GxLoader,
    GxCardModal,
  },
  data() {
    return {
      company: null,
      startSubs: false,
      branches: null,
      myAccount: null,
      todos: null,
      error: false,
      errorImg: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      isCollapsed: false,
    }
  },
  computed: {
    ...getters,
    hasCerticates() {
      if (!this.myAccount) return null
      return (
        this.myAccount.companies[0].company.companyDataLocalized.csd.length > 0
      )
    },
    showBottomMenu() {
      return ![
        'invoicepreview',
        'uploadprofilephoto',
        'updatepassword',
        'uploadcsdsummary',
        'sendsos',
        'howtouploadcsd',
        'resizeprofilephoto',
        'notifications',
        'updatemyinfo',
        'clientgeneralinfo',
        'newsalechooseclient',
        'newsaleconcept',
        'newsalewithclient',
        'additionalinfo',
        'choosefrequentconcept',
        'categories',
        'categoryDetail',
        'saleconcept',
        'newsaleselectsatkey',
        'newfrequentconcept',
        'conceptdetails',
        'keySat',
        'units',
        'sendInvoice',
        'updateconcept',
        'conceptdetail',
        'saleInvoiceDraft',
        'selectunit',
        'updatecompanyinfo',
        'uploadcompanylogo',
        'resizelogo',
        'satConnection',
        'clientData',
        'createnewclient',
        'uploadcsd',
        'saleDetail',
        'saleDetailSendEmail',
      ].includes(this.$route.name)
    },
  },
  reactiveProvide: {
    name: 'drawer',
    include: ['isCollapsed'],
  },
  apollo: {
    companyNumber: {
      query: COMPANY_NUMBER,
      update(newVal) {
        return newVal.myAccount.companies[0].company.companyNumber
      },
    },
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company || !this.company.number
      },
    },
    branches: {
      query: BRANCHES,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company || !this.company.number
      },
      update(data) {
        return data.myAccount.companies[0].company.branches
      },
    },
    todos: {
      query: TODOS,
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          size: 50,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.pendingActions
      },
      skip() {
        return !this.company || !this.company.number
      },
      subscribeToMore: [
        {
          document: TODOS_SUBSCRIPTION,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          updateQuery(previousResult, { subscriptionData }) {
            try {
              if (!previousResult) {
                return
              }
              let newList
              const updatedPendingAction =
                subscriptionData.data.pendingActionUpdated.pendingAction
              if (!previousResult) return
              const indexToUpdate = previousResult.myAccount.companies[0].company.pendingActions.list.findIndex(
                ({ type }) => {
                  return type === updatedPendingAction.type
                }
              )
              if (indexToUpdate !== -1) {
                const before = previousResult.myAccount.companies[0].company.pendingActions.list.slice(
                  0,
                  indexToUpdate
                )
                const after = previousResult.myAccount.companies[0].company.pendingActions.list.slice(
                  indexToUpdate + 1
                )
                newList = [...before, updatedPendingAction, ...after]
                if (
                  !updatedPendingAction.itemsCount ||
                  updatedPendingAction.itemsCount === 0
                ) {
                  /* eslint-disable */
                  console.log('Desktop empty pendingItem')
                  /* eslint-enable */
                }
              } else {
                newList = [
                  updatedPendingAction,
                  ...previousResult.myAccount.companies[0].company
                    .pendingActions.list,
                ]
              }
              previousResult.myAccount.companies[0].company.pendingActions.list = newList
              previousResult.myAccount.companies[0].company.pendingActions.size =
                newList.length
              return {
                myAccount: previousResult.myAccount,
              }
            } catch (error) {
              /* eslint-disable */
              console.log('TODOS_SUBSCRIPTION on update callback', { error })
            }
          },
          error(error) {
            /* eslint-disable */
            console.log('TODOS_SUBSCRIPTION error', error)
            /* eslint-enable */
          },
          skip() {
            return !this.company || this.company.number || !this.startSubs
          },
          debounce: 300,
        },
      ],
    },
    solvedTodos: {
      query: SOLVED_TODOS,
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          size: 50,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company.pendingActionsDone
      },
      skip() {
        return !this.company || !this.company.number
      },
      subscribeToMore: [
        {
          document: SOLVED_TODOS_SUBSCRIPTION,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          updateQuery(previousResult, { subscriptionData }) {
            const pendingActionsDone =
              previousResult.myAccount.companies[0].company.pendingActionsDone
            const newPendingActionDone =
              subscriptionData.data.pendingActionDoneCreated.pendingActionDone
            previousResult.myAccount.companies[0].company.pendingActionsDone.list = [
              newPendingActionDone,
              ...pendingActionsDone.list,
            ]
            previousResult.myAccount.companies[0].company.pendingActionsDone.size =
              pendingActionsDone.size + 1
            return {
              myAccount: previousResult.myAccount,
            }
          },
          skip() {
            return !this.company || !this.company.number || !this.startSubs
          },
          error(error) {
            /* eslint-disable */
            console.log('SOLVED_TODOS_SUBSCRIPTION', error)
            /* eslint-enable */
          },
        },
      ],
    },
    company: LOCAL_COMPANY,
  },
  watch: {
    $route(to, from) {
      if (
        (to.name === 'newsalechooseclient' ||
          to.name === 'newsalewithclient') &&
        !this.hasCerticates
      ) {
        this.$router.replace({
          name: this.$mq === 'mo' ? 'uploadcsdsummary' : 'howtouploadcsd',
        })
      }
    },
    companyNumber: {
      handler: function(newVal) {
        if (newVal) {
          // Configure the first available company as the active one for now
          this.$apollo.mutate({
            mutation: UPDATE_COMPANY_NUMBER,
            variables: {
              companyNumber: newVal,
            },
          })
        }
      },
      immediate: true,
    },
    branches(newVal) {
      if (newVal.length) {
        this.$apollo.mutate({
          mutation: UPDATE_BRANCH_NUMBER,
          variables: {
            branchNumber: newVal[0].branchNumber,
          },
        })
      }
    },
  },
  created() {
    /* eslint-disable */
    console.log('Init subs web.vue created')
    restartWebsockets(this.$apollo.provider.clients.defaultClient.wsClient)
    this.startSubs = true
    /* eslint-enable */
  },
  methods: {
    ...mutations,
  },
}
</script>
<template>
  <div
    v-if="
      company && company.branchNumber && company.number && myAccount && todos
    "
    id="web-layout"
  >
    <GxCardModal
      v-if="headerError"
      :headline="headerError"
      :card-img="imageError"
      :text-body="bodyError"
      :alt="headerError"
      @click="
        modalButtons
          ? cleanErrorState($router, 'logout')
          : cleanErrorState($router, $route.name)
      "
      @close="
        modalButtons
          ? cleanErrorState($router, 'logout')
          : cleanErrorState($router, $route.name)
      "
    >
      <template v-if="modalButtons" v-slot:actions>
        <div class="flex justify-end mt-4">
          <GxButton plain @click.stop="cleanErrorState($router, 'logout')"
            >ENTENDIDO</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <!-- Desktop -->
    <Layout
      v-if="$mq === 'de'"
      :my-account="myAccount"
      :todos="todos.list"
      no-horizontal-padding
      has-drawer
    >
      <RouterView v-if="myAccount" />
    </Layout>
    <!-- Mobile -->
    <RouterView v-else-if="myAccount" />
    <MenuBottom
      v-if="showBottomMenu && $mq === 'mo'"
      :todos="todos.list"
      class="z-0"
    />
  </div>
  <div v-else id="web-layout" class="flex justify-center items-center">
    <GxCardModal
      v-if="headerError"
      :headline="headerError"
      :card-img="imageError"
      :text-body="bodyError"
      alt="Error"
      @click="
        modalButtons
          ? cleanErrorState($router, 'logout')
          : cleanErrorState($router, $route.name)
      "
      @close="
        modalButtons
          ? cleanErrorState($router, 'logout')
          : cleanErrorState($router, $route.name)
      "
    >
      <template v-if="modalButtons" v-slot:actions>
        <div class="flex justify-end mt-4">
          <GxButton plain @click.stop="cleanErrorState($router, 'logout')"
            >ENTENDIDO</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <GxLoader />
  </div>
</template>
<style lang="scss" scoped>
#web-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
}
</style>

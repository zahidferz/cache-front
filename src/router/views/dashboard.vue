<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxCardCTA from '@components/_Core/Cards/GxCardCTA'
import GxCardAccountsPayableReceivable from '@components/_Core/Cards/GxCardAccountsPayableReceivable'
import GxCardTransactions from '@components/_Core/Cards/GxCardTransactions'
import { CHANGE_TIME_PERIOD_PREFERENCE } from '@src/apollo//mutations.js'
import gql from 'graphql-tag'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { TODOS, LOCAL_COMPANY, DASHBOARD } from '@src/apollo/queries'
import GxTodoDashboardCard from '@components/_Core/Cards/GxTodoDashboardCard'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
export default {
  name: 'Dashboard',
  page: {
    title: 'Dashboard',
    meta: [{ name: 'Dashboard', content: 'Dashboard' }],
  },
  components: {
    GxDesktopHeader,
    LayoutWebMobile,
    GxCardCTA,
    GxCardTransactions,
    GxCardAccountsPayableReceivable,
    GxCardModal,
    GxTodoDashboardCard,
  },
  data() {
    return {
      intercomIsOpen: false,
      type: [],
      bankConnection: false,
      accountSettings: null,
      firstSale: null,
      firstExpense: null,
      todosPage: 1,
      todosSizePage: 50,
      resolvedTodo: false,
      moneyAccounts: null,
      getTodos: null,
      // shortcuts: [
      //   {
      //     label: 'venta',
      //     to: { name: 'newsalechooseclient' },
      //     isDefault: true,
      //   },
      //   {
      //     label: 'Cobro',
      //     to: { name: 'payments' },
      //     isDefault: false,
      //   },
      //   {
      //     label: 'Factura',
      //     to: { name: 'invoices' },
      //     isDefault: false,
      //   },
      // ],
      taxInfoConection: false,
      payableAccounts: null,
      receivableAccounts: null,
      error: null,
      errorImage: require('@assets/images/Dashboard/De_errorplataforma.svg'),
      skipSubscriptions: true,
    }
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: DASHBOARD,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      subscribeToMore: [
        // Income Sales Summary
        {
          document: gql`
            subscription incomeSalesSummaryUpdated($companyNumber: Int!) {
              incomeSalesSummaryUpdated(companyNumber: $companyNumber) {
                sales {
                  today {
                    total
                    currency
                    dateRangeFilterType
                    startDate
                    endDate
                  }
                  currentWeek {
                    total
                    currency
                    dateRangeFilterType
                    startDate
                    endDate
                  }
                  currentMonth {
                    total
                    currency
                    dateRangeFilterType
                    startDate
                    endDate
                  }
                }
              }
            }
          `,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!previousResult) throw new Error('No previous data found')
            previousResult.myAccount.companies[0].company.incomeSummary.sales =
              subscriptionData.data.incomeSalesSummaryUpdated.sales
            return {
              myAccount: previousResult.myAccount,
            }
          },
          skip() {
            return this.skipSubscriptions
          },
          debounce: 300,
        },
        // Spending Expenses Summary
        {
          document: gql`
            subscription spendingExpensesSummaryUpdated($companyNumber: Int!) {
              spendingExpensesSummaryUpdated(companyNumber: $companyNumber) {
                expenses {
                  today {
                    total
                    currency
                    dateRangeFilterType
                    startDate
                    endDate
                  }
                  currentWeek {
                    total
                    currency
                    dateRangeFilterType
                    startDate
                    endDate
                  }
                  currentMonth {
                    total
                    currency
                    dateRangeFilterType
                    startDate
                    endDate
                  }
                }
              }
            }
          `,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!previousResult) return {}
            previousResult.myAccount.companies[0].company.spendingSummary.expenses =
              subscriptionData.data.spendingExpensesSummaryUpdated.expenses
            return {
              myAccount: previousResult.myAccount,
            }
          },
          skip() {
            return this.skipSubscriptions
          },
          debounce: 300,
        },
        // Accounts Receivable
        {
          document: gql`
            subscription incomeAccountsReceivableSummaryUpdated(
              $companyNumber: Int!
            ) {
              incomeAccountsReceivableSummaryUpdated(
                companyNumber: $companyNumber
              ) {
                accountsReceivable {
                  referenceDate
                  currency
                  total
                  totalDue
                  totalDueOnReferenceDate
                  totalUndue
                }
              }
            }
          `,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!previousResult) return {}
            previousResult.myAccount.companies[0].company.incomeSummary.accountsReceivable =
              subscriptionData.data.incomeAccountsReceivableSummaryUpdated.accountsReceivable
            return {
              myAccount: previousResult.myAccount,
            }
          },
          skip() {
            return this.skipSubscriptions
          },
          debounce: 300,
        },
        // Accounts Payable
        {
          document: gql`
            subscription spendingAccountsPayableSummaryUpdated(
              $companyNumber: Int!
            ) {
              spendingAccountsPayableSummaryUpdated(
                companyNumber: $companyNumber
              ) {
                accountsPayable {
                  referenceDate
                  currency
                  total
                  totalDue
                  totalDueOnReferenceDate
                  totalUndue
                }
              }
            }
          `,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!previousResult) return {}
            previousResult.myAccount.companies[0].company.spendingSummary.accountsPayable =
              subscriptionData.data.spendingAccountsPayableSummaryUpdated.accountsPayable
            return {
              myAccount: previousResult.myAccount,
            }
          },
          skip() {
            return this.skipSubscriptions
          },
          debounce: 300,
        },
        // SAT connection status subscription
        {
          document: gql`
            subscription invoiceFilesRetrievalStatusUpdated(
              $companyNumber: Int!
            ) {
              invoiceFilesRetrievalStatusUpdated(
                companyNumber: $companyNumber
              ) {
                ciecConfigurada
                ciecConfiguradaFecha
                estatusDescargaCfdis
              }
            }
          `,
          variables() {
            return {
              companyNumber: this.company.number,
            }
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            if (!previousResult) return {}

            previousResult.myAccount.companies[0].company.companyDataLocalized = {
              ...previousResult.myAccount.companies[0].company
                .companyDataLocalized,
              ...subscriptionData.data.invoiceFilesRetrievalStatusUpdated,
              __typename: 'CompanyDataLocalized_MEX',
            }

            return {
              myAccount: previousResult.myAccount,
            }
          },
          skip() {
            return this.skipSubscriptions
          },
          debounce: 300,
        },
      ],
    },
    getTodos: {
      query: TODOS,
      variables() {
        return {
          companyNumber: this.company.number,
          page: 1,
          size: 50,
        }
      },
      update(data) {
        if (!data.myAccount || !data.myAccount.companies) return
        return data.myAccount.companies[0].company.pendingActions
      },
    },
  },
  computed: {
    parsedDate() {
      return this.$utils.dates.getRelativeDate(this.myAccount.creationDate)
    },
    salesAmounts() {
      return this.myAccount.companies[0].company.incomeSummary.sales
    },
    expensesAmounts() {
      return this.myAccount.companies[0].company.spendingSummary.expenses
    },
    accountsReceivable() {
      if (!this.myAccount) return null

      return this.myAccount.companies[0].company.incomeSummary
        .accountsReceivable
    },
    accountsPayable() {
      if (!this.myAccount) return null

      return this.myAccount.companies[0].company.spendingSummary.accountsPayable
    },
    loadingTransactions() {
      // Disable loading icon for now, since we're not doing much with the downloaded XMLs yet
      return false
      // if (!this.myAccount) return false
      // return (
      //   this.myAccount.companies[0].company.companyDataLocalized
      //     .estatusDescargaCfdis === 'downloading'
      // )
    },
    toCSD() {
      if (
        this.myAccount &&
        this.myAccount.companies[0].company.companyDocumentsLogo
      ) {
        return { name: 'howtouploadcsd' }
      } else {
        return { name: 'uploadcompanylogo' }
      }
    },
    todosWithItems() {
      if (this.getTodos) {
        return this.getTodos.list.filter(({ items }) => items.length > 0)
      }
      return null
    },
    expensesCard() {
      if (this.myAccount) {
        if (
          !this.myAccount.companies[0].company.companyDataLocalized
            .ciecConfigurada
        ) {
          return 'cta-sat'
        }
        if (
          this.myAccount.companies[0].company.companyDataLocalized
            .ciecConfigurada &&
          this.myAccount.companies[0].company.companyDataLocalized
            .estatusDescargaCfdis === 'downloading'
        ) {
          return 'expenses-downloading'
        }
        if (
          this.myAccount.companies[0].company.companyDataLocalized
            .ciecConfigurada &&
          this.myAccount.companies[0].company.companyDataLocalized
            .estatusDescargaCfdis === 'finished' &&
          !this.myAccount.companies[0].company.configuration.features.spending
            .used
        ) {
          return 'cta-first-expense'
        }
        if (
          this.myAccount.companies[0].company.companyDataLocalized
            .ciecConfigurada &&
          this.myAccount.companies[0].company.companyDataLocalized
            .estatusDescargaCfdis === 'finished' &&
          !this.myAccount.companies[0].company.configuration.features.spending
            .used
        ) {
          return 'expenses'
        }
        return null
      }
      return null
    },
  },
  watch: {
    myAccount: {
      handler(newVal) {
        if (newVal) {
          this.skipSubscriptions = false

          this.getTransactionsData(newVal)
          this.getBankData(newVal)

          // Init money accounts subscriptions
          this.initMoneyAccountsSubscriptions()
        }
      },
    },
    accountsReceivable(newVal) {
      if (this.myAccount && newVal) {
        this.getTransactionsData(this.myAccount)
        this.getBankData(this.myAccount)
      }
    },
    accountsPayable(newVal) {
      if (this.myAccount && newVal) {
        this.getTransactionsData(this.myAccount)
        this.getBankData(this.myAccount)
      }
    },
    getTodos(newValue) {
      if (newValue.list.length < newValue.size) {
        const pages = Math.ceil(newValue.size / 10)
        this.fetchMoreTodos(2, pages)
      }
    },
  },
  mounted() {
    /* eslint-disable */
    console.log('Update cache by refetching')
    this.$apollo.queries.myAccount.refetch()
    /* eslint-enable */
  },
  methods: {
    initMoneyAccountsSubscriptions() {
      const companyNumber = this.company.number
      this.myAccount.companies[0].company.moneyAccounts.forEach(
        (moneyAccount) => {
          const accountId =
            moneyAccount.moneyAccountId ||
            moneyAccount.bankAccountId ||
            moneyAccount.creditAccountId ||
            moneyAccount.accountId
          this.$apollo.queries.myAccount.subscribeToMore({
            document: gql`
              subscription moneyAccountUpdated(
                $companyNumber: Int!
                $accountId: ID!
              ) {
                moneyAccountUpdated(
                  companyNumber: $companyNumber
                  accountId: $accountId
                ) {
                  moneyAccount {
                    moneyAccountId
                    moneyAccountNumber
                    moneyAccountType
                    name
                    description
                    moneyAccountBalance {
                      balance
                      initialBalance
                      initialBalanceDate
                    }
                    owner
                    status
                    currency
                    countryCode
                    logo
                    moneyAccountConnection {
                      status
                      lastSyncDate
                    }
                  }
                  # moneyAccount {
                  #   ... on BankAccount {
                  #     accountType
                  #     bankAccountId
                  #     bankAccountName
                  #     bankAccountNumber
                  #     accountBalance
                  #     currency
                  #     logo
                  #     bank {
                  #       name
                  #       longName
                  #     }
                  #     connectionStatus
                  #     connectionLastSynchDate
                  #   }
                  #   ... on CreditAccount {
                  #     accountType
                  #     creditAccountId
                  #     creditAccountName
                  #     creditAccountNumber
                  #     accountBalance
                  #     currency
                  #     logo
                  #     bank {
                  #       name
                  #       longName
                  #     }
                  #     connectionStatus
                  #     connectionLastSynchDate
                  #   }
                  #   ... on OtherAccount {
                  #     accountType
                  #     accountId
                  #     accountName
                  #     accountNumber
                  #     accountBalance
                  #     currency
                  #     logo
                  #   }
                  # }
                }
              }
            `,
            variables: {
              companyNumber,
              accountId,
            },
            // Mutate the previous result
            updateQuery: (previousResult, { subscriptionData }) => {
              if (!previousResult) return {}
              const index = previousResult.myAccount.companies[0].company.moneyAccounts.findIndex(
                (c) => {
                  if (c.accountType === 'bank') {
                    return c.bankAccountId === accountId
                  } else if (c.accountType === 'credit') {
                    return c.creditAccountId === accountId
                  } else {
                    return c.accountId === accountId
                  }
                }
              )

              previousResult.myAccount.companies[0].company.moneyAccounts[
                index
              ] = subscriptionData.data.moneyAccountUpdated.moneyAccount

              // this.moneyAccounts = [...this.moneyAccounts]
              this.$set(
                this.moneyAccounts,
                index,
                subscriptionData.data.moneyAccountUpdated.moneyAccount
              )

              return {
                myAccount: previousResult.myAccount,
              }
            },
            debounce: 300,
            error(error) {
              /* eslint-disable */
              console.log('moneyAccountUpdated', error)
              /* eslint-enable */
            },
          })
        }
      )
    },
    async changeSalesPreferences(payload) {
      if (
        this.myAccount &&
        payload === this.accountSettings.salesSummaryDefaultView
      ) {
        return
      }

      let rangeType = payload

      await this.$apollo.mutate({
        mutation: CHANGE_TIME_PERIOD_PREFERENCE,
        variables: {
          companyNumber: this.company.number,
          data: {
            salesSummaryDefaultView: rangeType,
          },
        },
      })
    },
    async changeExpensesPreferences(payload) {
      if (
        this.myAccount &&
        payload === this.accountSettings.spendingSummaryDefaultView
      ) {
        return
      }
      let rangeType = payload

      await this.$apollo.mutate({
        mutation: CHANGE_TIME_PERIOD_PREFERENCE,
        variables: {
          companyNumber: this.company.number,
          data: {
            spendingSummaryDefaultView: rangeType,
          },
        },
      })
    },
    getTransactionsData(account) {
      if (!account.companies[0].company.companyDataLocalized) return

      this.accountSettings = account.companies[0].userCompanyPreferences

      this.firstSale =
        account.companies[0].company.configuration.features.sales.used
      this.firstExpense =
        account.companies[0].company.configuration.features.spending.used
      this.taxInfoConection =
        account.companies[0].company.companyDataLocalized.ciecConfigurada ||
        false
      this.payableAccounts = this.myAccount.companies[0].company.spendingSummary.accountsPayable
      this.receivableAccounts = this.myAccount.companies[0].company.incomeSummary.accountsReceivable
    },
    getBankData(account) {
      this.moneyAccounts = account.companies[0].company.moneyAccounts
    },
    async fetchMoreTodos(page = 2, pages) {
      if (page > pages) {
        return
      }
      await this.$apollo.queries.getTodos.fetchMore({
        variables: {
          page,
          size: 10,
        },
        updateQuery: (todos, { fetchMoreResult }) => {
          todos.myAccount.companies[0].company.pendingActions.list = [
            ...todos.myAccount.companies[0].company.pendingActions.list,
            ...fetchMoreResult.myAccount.companies[0].company.pendingActions
              .list,
          ]
          return todos
        },
      })
      const newPage = page + 1
      return this.fetchMoreTodos(newPage, pages)
    },
    reload() {
      // Reload page on error
      this.$router.go()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    v-if="
      myAccount && !$apollo.queries.myAccount.loading && company && $mq === 'mo'
    "
    has-drawer
    has-drawer-right
    icon="dashboard"
    title="Dashboard"
    icon-class-without-scroll="text-primary"
  >
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Oops"
      alt="Hubo un error al descargar tu información"
      text-body="Hubo un error"
      @click="reload"
    />
    <MqLayout mq="mo" class="flex-grow flex flex-col p-4">
      <section class="mb-4 de:mb-8">
        <h2 class="text-gray-400 uppercase font-bold gx-caption mb-4"
          >Movimientos</h2
        >
        <div v-if="myAccount && expensesCard === 'cta-sat'" class="mb-2">
          <GxCardCTA
            icon="swap_horiz"
            alt="Conéctate directo al sat"
            title="Conéctate directo al sat"
            subtitle="Y descarga tus XMLs"
            @click="$router.push({ name: 'satConnection' })"
          />
        </div>
        <div v-else-if="myAccount && !firstSale && expensesCard !== 'cta-sat'">
          <GxCardCTA
            icon="shopping_cart"
            alt="Registra tu primera venta"
            title="Registra tu primera venta"
            subtitle="Inicia tu operación"
            @click="$router.push({ name: 'newsalechooseclient' })"
          />
        </div>
        <div v-else-if="myAccount && firstSale">
          <GxCardTransactions
            sales
            :amount="salesAmounts"
            :time-period="accountSettings.salesSummaryDefaultView"
            :loading="loadingTransactions"
            @input="changeSalesPreferences"
            @click="$router.push({ name: 'salesDashboard' })"
          />
        </div>
        <!-- <div v-if="myAccount && firstExpense">
          <GxCardTransactions
            :amount="expensesAmounts"
            :time-period="accountSettings.spendingSummaryDefaultView"
            :loading="loadingTransactions"
            @input="changeExpensesPreferences"
          />
        </div> -->
        <!-- <div v-if="myAccount && !firstExpense && taxInfoConection">
          <GxCardCTA
            icon="monetization_on"
            alt="Registra tu primer gasto"
            title="Registra tu primer gasto"
            subtitle="Puedes migrar tu información"
            @click="$router.push({ name: 'firstexpenses' })"
          />
        </div> -->
        <!-- <div v-if="expensesCard === 'cta-sat'">
          <GxCardCTA
            icon="swap_horiz"
            alt="Conéctate directo al sat"
            title="Conéctate directo al sat"
            subtitle="Y descarga tus XMLs"
            @click="$router.push({ name: 'satConnection' })"
          />
        </div> -->
      </section>
      <!-- <section v-if="moneyAccounts" class="flex flex-col mb-8">
        <div class="flex justify-between mb-4">
          <p class="text-gray-400 uppercase font-bold gx-caption"
            >Saldos en cuentas</p
          >
          <GxTextLinkIcon
            v-if="moneyAccounts.length !== 0"
            :to="{ name: 'firstaccount' }"
          />
        </div>
        <GxCardCTA
          v-if="moneyAccounts.length < 1"
          icon="credit_card"
          alt="img"
          title="Agrega tu primer cuenta"
          subtitle="Bancaria, crédito u otras"
          @click="$route.push({ name: 'firstaccount' })"
        />
        <GxCardBill
          v-for="(moneyAccount, index) in moneyAccounts"
          :key="index"
          :account-name="moneyAccount.accountName"
          :account-type="moneyAccount.accountType"
          :amount="moneyAccount.accountBalance"
          :currency="moneyAccount.currency"
          :card-img="moneyAccount.logo || image"
          :current-status="moneyAccount.connectionStatus"
          :account-number="
            moneyAccount.bankAccountNumber ||
              moneyAccount.creditAccountNumber ||
              moneyAccount.accountNumber
          "
          :last-sync="moneyAccount.connectionLastSynchDate"
        />
      </section> -->
      <section v-if="myAccount && receivableAccounts" class="mb-8 flex-grow">
        <h2
          v-if="myAccount && receivableAccounts"
          class="text-gray-400 uppercase font-bold gx-caption mb-4"
          >Cuentas por cobrar</h2
        >
        <GxCardAccountsPayableReceivable
          v-if="myAccount && receivableAccounts"
          :accounts="receivableAccounts"
        />
      </section>
      <!-- <section v-if="myAccount && payableAccounts" class="flex-grow">
        <h2
          v-if="myAccount && payableAccounts"
          class="text-gray-400 uppercase font-bold gx-caption mb-4"
          >Cuentas por pagar</h2
        >
        <GxCardAccountsPayableReceivable
          v-if="myAccount && payableAccounts"
          payable
          :accounts="payableAccounts"
        />
      </section> -->
    </MqLayout>
  </LayoutWebMobile>
  <div
    v-else-if="
      myAccount && !$apollo.queries.myAccount.loading && company && $mq === 'de'
    "
  >
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Oops"
      alt="Hubo un error al descargar tu información"
      text-body="Hubo un error"
      @click="reload"
    />
    <MqLayout mq="de" class="px-8">
      <GxDesktopHeader header="Dashboard" icon="dashboard">
        <template v-slot:right class="">
          <GxButton
            class="ml-auto w-38"
            variant
            @click="$router.push({ name: 'newsalechooseclient' })"
          >
            <p class="flex items-center">
              <GxIcon icon="add" class="mr-2 text-xs" />
              <span class="font-bold">VENTA</span>
            </p>
          </GxButton>
        </template>
      </GxDesktopHeader>
      <!-- <div class="flex flex-row  mb-8 items-center justify-between">
        <h1 class="gx-h4 text-black font-bold flex items-center">
          <GxIcon icon="dashboard" class="mr-4 text-primary" />
          Dashboard
        </h1>
        <GxButtonWithOptions :options="shortcuts" />
      </div> -->

      <section
        v-if="getTodos && getTodos.list.length"
        class="flex flex-col mb-8"
      >
        <div class="flex justify-between flex flex-col">
          <h3 class="text-gray-400 uppercase font-bold gx-caption mb-4"
            >Pendientes</h3
          >
          <ul class="shadow-2 rounded-lg pb-2">
            <GxTodoDashboardCard
              v-for="todo in todosWithItems"
              :id="todo.type"
              :key="todo.type"
              :subtitle-to-do="todo.description"
              :title="todo.title"
              :type="todo.type"
              :action-buttons="todo.actions"
              :date="todo.datetime"
              :items="todo.items"
              :size="todosSizePage"
              :page="todosPage"
              @resolvedTodo="resolvedTodo = true"
            />
            <!-- <GxTodoDashboardCard
              v-for="initialTodo in initialTodos"
              :key="initialTodo.id"
              :subtitle-to-do="initialTodo.subtitle"
              :title="initialTodo.title"
              :date="initialTodo.date"
              :informative-caption="initialTodo.caption"
              :to="initialTodo.route"
            /> -->
          </ul>
        </div>
      </section>
      <section
        class="mt-4 flex flex-col"
        :class="{ 'mb-6': $mq === 'mo', 'mb-8': $mq === 'de' }"
      >
        <h2 class="text-gray-400 uppercase font-bold gx-caption mb-4"
          >Movimientos</h2
        >

        <div class="gxGridContainer">
          <div v-if="myAccount && expensesCard === 'cta-sat'">
            <GxCardCTA
              icon="swap_horiz"
              alt="Conéctate directo al sat"
              title="Conéctate directo al sat"
              subtitle="Y descarga tus XMLs"
              @click="$router.push({ name: 'satConnection' })"
            />
          </div>
          <div
            v-else-if="myAccount && !firstSale && expensesCard !== 'cta-sat'"
          >
            <GxCardCTA
              icon="shopping_cart"
              alt="Registra tu primera venta"
              title="Registra tu primera venta"
              subtitle="Inicia tu operación"
              @click="$router.push({ name: 'newsalechooseclient' })"
            />
          </div>
          <div v-else-if="myAccount && firstSale">
            <GxCardTransactions
              sales
              :amount="salesAmounts"
              :time-period="accountSettings.salesSummaryDefaultView"
              :loading="loadingTransactions"
              @input="changeSalesPreferences"
              @click="$router.push({ name: 'salesDashboard' })"
            />
          </div>

          <!-- <div
            v-if="
              (myAccount && firstExpense) ||
                (myAccount && !firstExpense && taxInfoConection)
            "
          >
            <GxCardTransactions
              :amount="expensesAmounts"
              :time-period="accountSettings.spendingSummaryDefaultView"
              :loading="loadingTransactions"
              @input="changeExpensesPreferences"
            />
          </div> -->
          <!-- <div v-if="myAccount && !firstExpense && taxInfoConection">
            <GxCardCTA
              icon="monetization_on"
              alt="Registra tu primer gasto"
              title="Registra tu primer gasto"
              subtitle="Puedes migrar tu información"
              @click="$router.push({ name: 'firstexpenses' })"
            />
          </div> -->
          <!-- <div v-if="expensesCard === 'cta-sat'">
            <GxCardCTA
              icon="swap_horiz"
              alt="Conéctate directo al sat"
              title="Conéctate directo al sat"
              subtitle="Y descarga tus XMLs"
              @click="$router.push({ name: 'satConnection' })"
            />
          </div> -->
        </div>
      </section>
      <!-- <section
        v-if="moneyAccounts"
        class="flex flex-col"
        :class="{ 'mb-6': $mq === 'mo', 'mb-8': $mq === 'de' }"
      >
        <div class="flex justify-between">
          <h3 class="text-gray-400 uppercase font-bold gx-caption mb-4"
            >Saldos en cuentas</h3
          >
          <GxTextLinkIcon
            v-if="moneyAccounts.length !== 0"
            :to="{ name: 'firstaccount' }"
          />
        </div>
        <div class="gxGridContainer">
          <GxCardCTA
            v-if="moneyAccounts.length < 1"
            :card-img="image"
            alt="img"
            title="agrega tu primera cuenta"
            subtitle="Bancaria, crédito u otras"
            @click="$router.push({ name: 'firstaccount' })"
          />
          <GxCardBill
            v-for="moneyAccount in moneyAccounts"
            :key="moneyAccount.id"
            :account-name="moneyAccount.accountName"
            :account-type="moneyAccount.accountType"
            :amount="moneyAccount.accountBalance"
            :currency="moneyAccount.currency"
            :card-img="moneyAccount.logo"
            :current-status="moneyAccount.connectionStatus"
            :account-number="
              moneyAccount.bankAccountNumber ||
                moneyAccount.creditAccountNumber ||
                moneyAccount.accountNumber
            "
            :last-sync="moneyAccount.connectionLastSynchDate"
          />
        </div>
      </section> -->
      <section class="mb-8 flex flex-grow gxGridContainer">
        <div v-if="myAccount && receivableAccounts" class="flex-grow">
          <h2
            v-if="myAccount && receivableAccounts"
            class="text-gray-400 uppercase font-bold gx-caption mb-4"
            >Cuentas por cobrar</h2
          >
          <GxCardAccountsPayableReceivable
            v-if="myAccount && receivableAccounts"
            :accounts="receivableAccounts"
          />
        </div>
        <!-- <div v-if="myAccount && payableAccounts" class="flex-grow">
          <h2
            v-if="myAccount && payableAccounts"
            class="text-gray-400 uppercase font-bold gx-caption mb-4"
            >Cuentas por pagar</h2
          >
          <GxCardAccountsPayableReceivable
            v-if="myAccount && payableAccounts"
            payable
            :accounts="payableAccounts"
          />
        </div> -->
      </section>

      <!-- Now using native intercom widget on desktop -->
      <!-- Intercom chat trigger -->
      <!-- <GxFab
        :icon="intercomIsOpen ? 'close' : 'chat'"
        class="shadow-2 fixed gxFixedFab"
        large
        label="chat"
        @click="toggleIntercom"
      /> -->
    </MqLayout>
    <GxCardModal
      v-if="resolvedTodo"
      :delay-animation="true"
      headline="Este pendiente ya se resolvió"
      text-body="Parece que alguien de tu equipo tomó la iniciativa. Puedes conocer el detalle en la sección de resueltos"
      :card-img="$utils.alertImages.Dissapointed"
      alt="Pendiente resuelto"
      @click.stop.prevent="resolvedTodo = false"
      @close="resolvedTodo = false"
    />
  </div>
  <div v-else class="bg-white">
    <div v-if="!error" class="loading rounded-full center"></div>
    <GxCardModal
      v-if="error"
      :headline="error"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
    />
  </div>
</template>

<style lang="scss" scoped>
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}
.gxResetMargin:last-child {
  margin-bottom: 0;
}

@media screen and (min-width: 768px) {
  .gxGridContainer {
    grid-template-columns: minmax(calc(50% - 0.5rem), calc(50% - 0.5rem)) minmax(
        calc(50% - 0.5rem),
        calc(50% - 0.5rem)
      );
  }
}
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

.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
</style>

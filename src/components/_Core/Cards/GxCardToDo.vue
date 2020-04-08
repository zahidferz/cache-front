<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
import { PENDING_ACTION_EXECUTE } from '@src/apollo/mutations.js'
import {
  LOCAL_COMPANY,
  TODOS,
  TODOS_FILTERS,
  COMPANY_INFO,
} from '@src/apollo/queries'

export default {
  name: 'GxCardToDo',
  components: {
    GxIcon,
    GxCardModal,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    subtitleToDo: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    users: {
      type: Array,
      default: () => [],
    },
    gxModule: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    to: {
      type: Object,
      default: () => ({ name: 'todos' }),
    },
    references: {
      type: Array,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
    searchTerm: {
      type: String,
      default: null,
    },
    page: {
      type: Number,
      default: null,
    },
    size: {
      type: Number,
      default: null,
    },
    branches: {
      type: Array,
      default: null,
    },
  },
  apollo: {
    companyInfo: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.companyNumber,
        }
      },
      update(data) {
        return data.myAccount.companies[0].company
      },
      skip() {
        return !this.companyNumber
      },
    },
    companyNumber: {
      query() {
        return LOCAL_COMPANY
      },
      update(data) {
        return data.company.number
      },
    },
  },
  data() {
    return {
      companyInfo: null,
      loading: false,
      closeModal: null,
      companyNumber: null,
      errorModal: null,
      timeout: null,
      showWelcomeAnimation: false,
    }
  },
  computed: {
    searchTitle() {
      if (!this.searchTerm) {
        return this.title
      }
      let scapedSearch = this.searchTerm.replace('.', '\\.')
      scapedSearch = scapedSearch.replace('+', '\\+')
      scapedSearch = scapedSearch.replace('-', '\\-')
      scapedSearch = scapedSearch.replace('(', '\\(')
      scapedSearch = scapedSearch.replace(')', '\\)')
      scapedSearch = scapedSearch.replace('{', '\\{')
      scapedSearch = scapedSearch.replace('{', '\\}')
      const regex = new RegExp(`${scapedSearch}`, 'ig')
      const matches = this.title.match(regex)
      let newTitle = this.title
      if (Array.isArray(matches)) {
        matches.forEach((match) => {
          newTitle = newTitle.replace(match, '{}')
        })
        matches.forEach((match) => {
          newTitle = newTitle.replace(
            '{}',
            `<span class="bg-underlined font-bold">${match}</span>`
          )
        })
      }
      return newTitle
    },
    descriptionTemplate() {
      if (this.searchTerm) {
        const array = this.subtitleToDo.split('{}')
        const search = array.map((text) => {
          let scapedSearch = this.searchTerm.replace('.', '\\.')
          scapedSearch = scapedSearch.replace('+', '\\+')
          scapedSearch = scapedSearch.replace('-', '\\-')
          scapedSearch = scapedSearch.replace('(', '\\(')
          scapedSearch = scapedSearch.replace(')', '\\)')
          scapedSearch = scapedSearch.replace('{', '\\{')
          scapedSearch = scapedSearch.replace('{', '\\}')
          const regex = new RegExp(`${scapedSearch}`, 'ig')
          const matches = text.match(regex)
          let newRefrence = text
          if (Array.isArray(matches)) {
            matches.forEach((match) => {
              newRefrence = newRefrence.replace(match, '{}')
            })
            matches.forEach((match) => {
              newRefrence = newRefrence.replace(
                '{}',
                `<span class="bg-underlined" style="font-weight: inherit;">${match}</span>`
              )
            })
            return newRefrence
          } else {
            return newRefrence
          }
        })
        return search.join('{}')
      }
      return this.subtitleToDo
    },
    description() {
      if (this.searchRefrences) {
        let html = this.descriptionTemplate
        this.searchRefrences.forEach((resourceDescription) => {
          html = html.replace(
            '{}',
            `<span class="font-bold">${resourceDescription}<span>`
          )
        })
        return html
      }
      let description = this.descriptionTemplate.replace(
        /{/g,
        '<span class="font-bold">'
      )
      description = description.replace(/}/g, '</span>')
      return description
    },
    searchRefrences() {
      if (!this.references || this.references.length === 0) {
        return null
      }
      if (!this.searchTerm && Array.isArray(this.references)) {
        return this.references.map(
          ({ resourceDescription }) => resourceDescription
        )
      }
      let references = this.references.map(({ resourceDescription }) => {
        let scapedSearch = this.searchTerm.replace('.', '\\.')
        scapedSearch = scapedSearch.replace('+', '\\+')
        scapedSearch = scapedSearch.replace('-', '\\-')
        scapedSearch = scapedSearch.replace('(', '\\(')
        scapedSearch = scapedSearch.replace(')', '\\)')
        scapedSearch = scapedSearch.replace('{', '\\{')
        scapedSearch = scapedSearch.replace('{', '\\}')
        const regex = new RegExp(`${scapedSearch}`, 'ig')
        const matches = resourceDescription.match(regex)
        let newRefrence = resourceDescription
        if (Array.isArray(matches)) {
          matches.forEach((match) => {
            newRefrence = newRefrence.replace(match, '{}')
          })
          matches.forEach((match) => {
            newRefrence = newRefrence.replace(
              '{}',
              `<span class="bg-underlined font-bold">${match}</span>`
            )
          })
        }
        return newRefrence
      })
      return references
    },
    renderedUsers() {
      return this.users.length > 5 ? this.users.slice(0, 4) : this.users
    },
    calculatingUsers() {
      return this.users.length > 5 ? this.users.length - 4 : null
    },
    dateString() {
      if (this.$mq === 'de') {
        return this.$utils.dates.getRelativeDate(this.date)
      }
      return this.$utils.dates.getRelativeDateShort(this.date)
    },
    secondDescription() {
      let string = null
      if (this.type === 'welcome') {
        string = 'Aquí encontrarás todos tus pendientes'
        return string
      }
      if (this.type === 'companyUploadInvoicingCertificates') {
        string = this.$utils.dates.getTimeLapse(this.date)
        return string
      }
      return string
    },
    borderColor() {
      // Gestionix Module that the ToDo belongs to
      const { gxModule } = this
      switch (gxModule) {
        case 'users':
          return 'border-primary-600'
        case 'spendingSentPayments':
        case 'incomeSaleInvoices':
          return 'border-expenses-1'
        case 'incomeSaleOrders':
          return 'border-sales-1'
        default:
          return 'border-primary-600'
      }
    },
    actionData() {
      const { type } = this
      switch (type) {
        case 'companyUsersJoinRequestApproval':
          return {
            acceptLabelColor: 'text-success',
            acceptLabel: 'Aceptar',
            rejectLabelColor: 'text-alert',
            rejectLabel: 'Rechazar',
          }
        case 'spendingSentPaymentsApproval':
          return {
            acceptLabelColor: 'text-success',
            acceptLabel: 'Aprobarlos',
            rejectLabelColor: 'text-alert',
            rejectLabel: 'Rechazarlos',
          }
        case 'incomeSaleInvoicesCancelApproval':
          return {
            acceptLabelColor: 'text-primary-500',
            acceptLabel: 'Registrar',
            rejectLabelColor: 'text-secondary-300',
            rejectLabel: 'Cancelar',
          }
        default:
          return {
            acceptLabelColor: 'text-success',
            acceptLabel: 'Aceptar',
            rejectLabelColor: 'text-alert',
            rejectLabel: 'Rechazar',
          }
      }
    },
    subtitleToDoIcon() {
      const { gxModule } = this
      switch (gxModule) {
        case 'users':
          return 'people'
        case 'spendingSentPayments':
          return 'attach_money'
        case 'incomeSaleInvoices':
          return 'assignment_ind'
        case 'incomeSaleOrders':
        case 'incomeSales':
          return 'local_offer'
        case 'application':
          return 'tag_faces'
        default:
          return null
      }
    },
    hasActions() {
      return this.actions.length
    },
    routes() {
      let routeName = null
      if (this.type === 'companyUploadInvoicingCertificates') {
        if (this.$mq === 'mo') {
          routeName = 'uploadcsdsummary'
          return routeName
        }
        routeName = 'howtouploadcsd'
        return routeName
      }
      return routeName
    },
  },
  methods: {
    mutationPendingActionExecute(action, pendingItemIds) {
      const vm = this
      const { companyNumber, type, size, branches, searchTerm } = this
      return this.$apollo.mutate({
        mutation: PENDING_ACTION_EXECUTE,
        variables: {
          companyNumber,
          pendingType: type,
          action: action || '',
          pendingItemIds,
        },
        update(store, { data }) {
          //  Query without filters
          if (vm.items) {
            //  Todo already done
            if (!data.companyPendingActionExecute.success) {
              vm.$emit('resolvedTodo')
            }
            const query = {
              query: TODOS,
              variables: {
                companyNumber,
                page: 1,
                size,
              },
            }
            const oldData = store.readQuery(query)
            const todos =
              oldData.myAccount.companies[0].company.pendingActions.list
            //  pendingActionList doen not have a unique identifier
            const itemToDeleteIndex = todos.findIndex(({ type }) => {
              return vm.id === type
            })
            const before = todos.slice(0, itemToDeleteIndex)
            const after = todos.slice(itemToDeleteIndex + 1)
            const newList = [...before, ...after]
            oldData.myAccount.companies[0].company.pendingActions.list = newList
            store.writeQuery({
              query: TODOS,
              variables: {
                companyNumber,
                page: 1,
                size: 10,
              },
              data: oldData,
            })
          } else {
            //  Query with filters
            //  Todo already done
            !data.companyPendingActionExecute.success &&
              vm.$emit('resolvedTodo')
            const query = {
              query: TODOS_FILTERS,
              variables: {
                companyNumber,
                page: 1,
                size,
                branches,
                text: searchTerm,
              },
            }
            const oldData = store.readQuery(query)
            const todos =
              oldData.myAccount.companies[0].company.pendingItems.list
            const itemToDeleteIndex = todos.findIndex(({ pendingItemId }) => {
              return pendingItemId === vm.id
            })
            const before = todos.slice(0, itemToDeleteIndex)
            const after = todos.slice(itemToDeleteIndex + 1)
            const newList = [...before, ...after]
            oldData.myAccount.companies[0].company.pendingItems.list = newList
            store.writeQuery({
              ...query,
              data: oldData,
            })
          }
        },
      })
    },
    async accept() {
      try {
        this.$emit('closeClickOutside')
        this.loading = true
        const action = this.actions[0]
        // This todo does not come from a search by filter or text
        if (this.items) {
          const pendingItemIds = this.items.map(
            ({ pendingItemId }) => pendingItemId
          )
          await this.mutationPendingActionExecute(action, pendingItemIds)
        } else {
          const pendingItemIds = [this.id]
          await this.mutationPendingActionExecute(action, pendingItemIds)
        }
      } catch (error) {
        this.errorModal = 'Error al procesar este pendiente'
      } finally {
        this.loading = false
      }
    },
    async reject() {
      try {
        this.$emit('closeClickOutside')
        const action = this.actions[1]
        this.loading = true
        // This todo does not come from a search by filter or text
        if (this.items) {
          const pendingItemIds = this.items.map(
            ({ pendingItemId }) => pendingItemId
          )
          await this.mutationPendingActionExecute(action, pendingItemIds)
        } else {
          const pendingItemIds = [this.id]
          await this.mutationPendingActionExecute(action, pendingItemIds)
        }
      } catch (error) {
        this.errorModal = 'Error al procesar este pendiente'
      } finally {
        this.loading = false
      }
    },
    onCompanyUploadInvoicingCertificates() {
      if (this.companyInfo && !this.companyInfo.companyLogo) {
        this.$router.push({ name: 'uploadcompanylogo' })
        return
      }
      if (this.$mq === 'de') {
        return this.$router.push({ name: 'howtouploadcsd' })
      }
      return this.$router.push({ name: 'uploadcsdsummary' })
    },
    onClick() {
      switch (this.type) {
        case 'companyUploadInvoicingCertificates':
          this.onCompanyUploadInvoicingCertificates()
          break
        case 'welcome':
          return this.welcomeCelebration()
        default:
          return this.$router.push({ name: 'todos' })
      }
    },
    welcomeCelebration() {
      this.showWelcomeAnimation = true
      this.timeout = setTimeout(() => {
        this.deleteWelcomeAnimation()
      }, 3000)
    },
    async deleteWelcomeAnimation() {
      try {
        if (this.loading) return
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.loading = true
        const action = this.actions[0]
        const pendingItemIds = this.items.map((item) => item.pendingItemId)
        await this.mutationPendingActionExecute(action, pendingItemIds)
      } catch (error) {
        this.errorModal = this.$utils.parseServerError(error)
      } finally {
        this.loading = false
        this.showWelcomeAnimation = false
      }
    },
  },
}
</script>
<template>
  <div
    :id="id"
    class="gxOutter cursor-pointer flex-grow mb-4 de:mb-0 shadow-2 flex active:shadow-4 min-w-40 de:hover:bg-gray-200 rounded  border-l-8"
    :class="[borderColor]"
    @click="onClick"
    v-on="$listeners"
  >
    <div class="flex-col flex-grow flex p-4 overflow-hidden">
      <div class="flex flex-col de:mb-4 mb-2">
        <!-- eslint-disable vue/no-v-html -->
        <span
          v-if="searchTitle"
          class="mr-1 font-bold mb-4 truncate"
          v-html="searchTitle"
        ></span>
        <!-- eslint-enable vue/no-v-html -->
        <div
          class="flex justify-start de:gx-caption gx-caption de:items-center"
        >
          <GxIcon
            class="text-gray-700 mr-2 mt-1 de:mt-0"
            :icon="subtitleToDoIcon"
          />
          <!-- eslint-disable vue/no-v-html -->
          <p v-if="description" class="mr-1" v-html="description"></p>
          <!-- eslint-enable vue/no-v-html -->
          <GxIcon
            class="mr-2 mt-1 ml-auto de:mt-0 self-end de:self-start"
            icon="chevron_right"
          />
        </div>
        <p class="gx-caption de:gx-caption text-gray-500"
          >{{ secondDescription }}
        </p>
      </div>
      <div v-if="hasActions" class="flex mb-2">
        <GxTextLink
          :disabled="loading"
          :class="[actionData.acceptLabelColor]"
          class="mr-4  disabled:cursor-not-allowed"
          @click.stop="accept"
          >{{ actionData.acceptLabel }}</GxTextLink
        >
        <GxTextLink
          :disabled="loading"
          :class="[actionData.rejectLabelColor]"
          class="mr-1"
          @click.stop="reject"
          >{{ actionData.rejectLabel }}</GxTextLink
        >
      </div>
      <div class="flex justify-between items-center">
        <ul class="justify-start items-center flex relative">
          <li
            v-for="(user, index) in renderedUsers"
            :key="user.userNumber"
            :title="user.userCompleteName"
            class="bg-cover bg-center bg-contain absolute text-white gxFont avatarCircle bg-gray-200 border border-white de:hover:border-gray-200 flex rounded-full justify-center items-center"
            :style="
              `background-image: url(${
                user.image
              }); transform: translateX(calc(75% * ${index}))`
            "
          ></li>
          <li
            v-if="calculatingUsers"
            class="bg-primary-500 rounded-full text-white gxFont avatarCircle border border-white absolute flex justify-center items-center"
            :style="
              `transform: translateX(calc(75% * ${renderedUsers.length}))`
            "
            ><span v-if="calculatingUsers > 1">+</span
            >{{ calculatingUsers }}</li
          >
        </ul>
        <p class="text-gray-500 de:gx-caption gx-caption">{{ dateString }}</p>
      </div>
    </div>
    <GxCardModal
      v-if="errorModal"
      :headline="errorModal"
      :card-img="$utils.alertImages.Oops"
      alt="Error"
      @close="errorModal = false"
    />
    <!-- <GxModal v-if="showWelcomeAnimation">
      <WelcomeAnimation
        class="w-screen h-screen"
        @click="deleteWelcomeAnimation"
      />
    </GxModal> -->

    <!-- Need to use portal to be able to use position fixed since the parent is modifying transform for its transition animations -->
    <Portal v-if="showWelcomeAnimation" to="modal-welcome">
      <div class="fixed bottom-0 top-0 right-0 left-0 bg-black opacity-80">
        <div
          class="fixed bottom-0 mb-4 de:mb-8 left-0 right-0 flex justify-center"
        >
          <img
            class="de:ml-38"
            src="@assets/images/Dashboard/welcomeAnimation.gif"
            alt="Welcome to Chain animation!"
            @click="deleteWelcomeAnimation"
          />
        </div>
      </div>
    </Portal>
  </div>
</template>
<style lang="scss" scoped>
.gxBackShadow::before {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  content: '';
  background-color: black;
  opacity: 0.3;
}
.avatarCircle {
  width: 1.055rem;
  height: 1.055rem;
  transform-origin: right top;
}
.gxFont {
  font-size: 0.5rem;
}
.gxOutter {
  -webkit-tap-highlight-color: transparent;
}
.gxOutter:active {
  background-color: var(--secondary-50);
}
.gxOutter:focus-within {
  background-color: var(--gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
}
</style>

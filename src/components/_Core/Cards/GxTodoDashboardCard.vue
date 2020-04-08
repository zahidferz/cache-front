<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import { PENDING_ACTION_EXECUTE } from '@src/apollo/mutations.js'
import { TODOS, LOCAL_COMPANY, COMPANY_INFO } from '@src/apollo/queries'
import GxCardModal from '@src/components/_Core/Cards/GxCardModal'
export default {
  name: 'GxTodoDashboardCard',
  components: {
    GxIcon,
    GxCardModal,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    informativeCaption: {
      type: Boolean,
      default: true,
    },
    subtitleToDo: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    actionButtons: {
      type: Array,
      default: () => {
        return []
      },
    },
    to: {
      type: Object,
      default: null,
    },
    size: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 10,
    },
    items: {
      type: Array,
      default: null,
    },
  },
  apollo: {
    companyNumber: {
      query() {
        return LOCAL_COMPANY
      },
      update(data) {
        return data.company.number
      },
    },
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
  },
  data() {
    return {
      companyInfo: null,
      loading: false,
      companyNumber: null,
      errorModal: null,
      timeout: null,
      showWelcomeAnimation: false,
    }
  },
  computed: {
    dateConverted() {
      return this.$utils.dates.getRelativeDate(this.date)
    },
    typeOfTodoTitle() {
      if (this.type) {
        const { type } = this
        return type
      }
      return this.title
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
    hasActions() {
      return this.actionButtons.length > 0
    },
    caption() {
      let caption = null
      if (this.type === 'welcome') {
        caption = 'Aquí tendrás todos tus pendientes'
        return caption
      } else {
        // Necesitamos agregar este nuevo campo a la notificación que se recibe de back.
        // Ahorita lo dejamos así porque sólo tenemos dos pendientes
        caption = 'Menos de 4 minutos'
        return caption
      }
      // caption = this.$utils.dates.getTimeLapse(this.date)
      // return caption
    },
    description() {
      let subtitle = this.subtitleToDo
      subtitle = subtitle.replace(
        /{/g,
        '<span class="font-bold" data-testid="description">'
      )
      subtitle = subtitle.replace(/}/g, '</span>')
      if (this.informativeCaption) {
        return (
          subtitle +
          `<span class="text-gray-500"> <wbr>-<wbr> <span class="whitespace-no-wrap">${
            this.caption
          }</span></span>`
        )
      }
      return subtitle
    },
  },
  methods: {
    mutationPendingActionExecute(action, pendingItemIds) {
      const vm = this
      const { companyNumber, type } = this
      return this.$apollo.mutate({
        mutation: PENDING_ACTION_EXECUTE,
        variables: {
          companyNumber,
          pendingType: type,
          action: action || '',
          pendingItemIds,
        },
        update(store, { data }) {
          //  Todo already done
          if (!data.companyPendingActionExecute.success) {
            vm.$emit('resolvedTodo')
          }
          const query = {
            query: TODOS,
            variables: {
              companyNumber,
              page: 1,
              size: 50,
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
          oldData.myAccount.companies[0].company.pendingActions.size =
            Number(oldData.myAccount.companies[0].company.pendingActions.size) -
            1
          store.writeQuery({
            ...query,
            data: oldData,
          })
        },
      })
    },
    async accept() {
      try {
        this.loading = true
        const action = this.actionButtons[0]
        // This todo does not come from a search by filter or text
        await this.mutationPendingActionExecute(action, this.id)
      } catch (error) {
        this.errorModal = 'Error al procesar este pendiente'
      } finally {
        this.loading = false
      }
    },
    async reject() {
      try {
        const action = this.actionButtons[1]
        this.loading = true
        // This todo does not come from a search by filter or text
        await this.mutationPendingActionExecute(action, this.id)
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
          return this.onCompanyUploadInvoicingCertificates()
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
        const action = this.actionButtons[0]
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
  <li
    class=" border-b  border-gray-200 py-1 leading-none cursor-pointer flex items-center gxOutter px-4 active:shadow-4 active:bg-secondary-50 de:hover:bg-gray-200"
    v-on="$listeners"
    @click="onClick"
  >
    <p style="min-width:180px;max-width:180px" class="font-bold truncate">{{
      title
    }}</p>
    <div class="flex flex-col ml-4">
      <div class="flex de:gx-caption">
        <!-- eslint-disable vue/no-v-html -->
        <p v-if="description" v-html="description"></p>
        <!-- eslint-enable vue/no-v-html -->

        <!-- <p v-if="informativeCaption" class="text-gray-500 ml-1 truncate"
          >-{{ informativeCaption }}</p
        > -->
      </div>
      <div v-if="hasActions" class="flex mb-2 m">
        <GxTextLink
          class="mr-4 disabled:cursor-not-allowed font-bold capitalize"
          :disabled="loading"
          :class="[actionData.acceptLabelColor]"
          @click.stop="accept"
          >{{ actionData.acceptLabel }}</GxTextLink
        >
        <GxTextLink
          :disabled="loading"
          class="mr-4 disabled:cursor-not-allowed font-bold capitalize"
          :class="[actionData.rejectLabelColor]"
          @click.stop="reject"
          >{{ actionData.rejectLabel }}</GxTextLink
        >
      </div>
    </div>
    <span
      class="text-gray-500 de:gx-caption flex ml-auto pl-4 whitespace-no-wrap"
    >
      {{ dateConverted }}
      <GxIcon icon="chevron_right" class="ml-2 gxIcon"
    /></span>
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
    <Portal v-if="showWelcomeAnimation" to="modal-welcome">
      <!-- Need a z-1 due to the GxCTA cards on dashboard -->
      <div class="fixed bottom-0 top-0 right-0 left-0 gxBackShadow z-1">
        <div
          class="fixed bottom-0 mb-4 de:mb-8 left-0 right-0 flex justify-center"
        >
          <img
            class="ml-38"
            src="@assets/images/Dashboard/welcomeAnimation.gif"
            alt="Welcome to Chain animation!"
            @click="deleteWelcomeAnimation"
          />
        </div>
      </div>
    </Portal>
  </li>
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
  opacity: 0.8;
}
.gxOutter:active {
  // It seems that tailwind does not  use a correct pattern hover  focus active
  background-color: var(--secondary-50);
}
// .gxIcon {
//   padding-top: 3px;
// }
.gxOutter:focus-within {
  background-color: var(--gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
}
</style>

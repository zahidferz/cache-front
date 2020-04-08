<script>
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxIcon from '@components/_Core/Icons/GxIcon'
import { SET_NOTIFICATION_AS_READ } from '@src/apollo//mutations.js'
import { NOTIFICATIONS, LOCAL_COMPANY } from '@src/apollo/queries'

export default {
  name: 'SubmenuNotificationItem',
  components: {
    GxAvatar,
    GxIcon,
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
  },
  data() {
    return {
      company: null,
      loading: false,
    }
  },
  computed: {
    avatarInitials() {
      const nameParts = this.notification.userCompleteName.split(' ')
      if (nameParts.length > 1) {
        return nameParts[0][0] + nameParts[1][0]
      }
      return nameParts[0][0]
    },
    microMessage() {
      let microMessage = this.notification.description
      this.notification.resourceReferences.forEach((ref) => {
        microMessage = microMessage.replace(
          '{}',
          `<a href="/web/ventas" class="font-bold">${
            ref.resourceDescription
          }</a>`
        )
      })
      return microMessage
    },
    unread() {
      return this.notification.readStatus === 'unread'
    },
    resourceType() {
      const resourceType = this.notification.resourceReferences.length
        ? this.notification.resourceReferences[0].resourceType
        : null
      switch (resourceType) {
        case 'spendingSuppliers':
          return 'receipt'
        case 'moneyAccounts':
          return 'attach_money'
        case 'incomeClients':
          return 'sentiment_satisfied_alt'
        case 'spendingExpenses':
          return 'swap_vertical_circle'
        case 'spendingSentPayments':
          return 'credit_card'
        case 'excelReports':
        case 'incomeReceivedPayments':
          return 'local_offer'
        default:
          /* eslint-disable */
          console.log('resourceType not found', resourceType)
          /* eslint-enable */
          return 'close'
      }
    },
    date() {
      return this.$utils.dates.getRelativeDate(this.notification.datetime)
    },
  },
  methods: {
    async markAsRead() {
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: SET_NOTIFICATION_AS_READ,
          variables: {
            notificationId: this.notification.notificationId,
            companyNumber: this.company.number,
          },
          update: (store, { data }) => {
            // // Read the data from our cache for this query.
            const query = {
              query: NOTIFICATIONS,
              variables: {
                page: 1,
                size: 50,
              },
            }
            const oldData = store.readQuery(query)
            const indexToUpdate = oldData.myAccount.companies[0].notifications.list.findIndex(
              (n) => {
                return n.notificationId === this.notification.notificationId
              }
            )
            oldData.myAccount.companies[0].notifications.list = [
              ...oldData.myAccount.companies[0].notifications.list.slice(
                0,
                indexToUpdate
              ),
              {
                ...oldData.myAccount.companies[0].notifications.list[
                  indexToUpdate
                ],
                readStatus: 'read',
              },
              ...oldData.myAccount.companies[0].notifications.list.slice(
                indexToUpdate + 1
              ),
            ]
            // // Write our data back to the cache.
            store.writeQuery({ ...query, data: oldData })
          },
        })
      } catch (error) {
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<template>
  <div
    class="px-2 py-4 de:px-4 flex items-center border-b border-gray-300"
    :class="{
      'bg-gray-100': unread,
      'bg-white': !unread,
    }"
  >
    <div>
      <GxAvatar
        v-if="notification.image"
        class="bg-white relative rounded-full mr-2 de:mr-4 flex-shrink-0 relative"
        style="width: 46px; height: 46px;"
        :avatar-img="notification.image"
      >
        <div
          class="absolute w-3 h-3 border border-white rounded-full bg-success  bottom-0 right-0 "
        ></div>
      </GxAvatar>
      <GxAvatar
        v-else
        class="text-white"
        :class="`bg-avatar-${notification.userColor}`"
        >{{ avatarInitials.toUpperCase() }}</GxAvatar
      >
    </div>
    <div class="ml-4 flex-grow flex">
      <div class="flex-grow pt-2 de:pt-0">
        <!-- eslint-disable -->
        <p
          class="mb-2 pr-2 de:pr-8 text-left text-base de:text-xs font-gothic"
          v-html="microMessage"
        />
        <!-- eslint-enable -->
        <div class="gx-notification-date flex items-center text-gray-500">
          <GxIcon :icon="resourceType" class="mr-2" />
          <span>{{ date }}</span>
        </div>
      </div>
      <div class="flex">
        <GxIcon
          v-if="unread"
          html-tag="button"
          icon="visibility"
          class="self-start de:self-center text-gray-500  flex-shrink-0"
          style=" width: 10px; height: 10px;font-size: 10px; line-height: 10px;"
          :disabled="loading"
          @click="markAsRead"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gx-notification-date {
  font-size: 14px;
  line-height: 14px;
}

@media screen and (min-width: 768px) {
  .gx-notification-date {
    font-size: 10px;
    line-height: 10px;
  }
}
</style>

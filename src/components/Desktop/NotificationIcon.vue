<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import SubmenuNotificationItem from '@components/_Core/Navigation/TopBar/LeftDrawerSubmenus/SubmenuNotificationItem.vue'
import { SET_ALL_NOTIFICATIONS_AS_READ } from '@src/apollo//mutations.js'
import { NOTIFICATIONS } from '@src/apollo/queries.js'
import GxLoader from '@components/_Core/Utils/GxLoader'
import gql from 'graphql-tag'
export default {
  name: 'NotificationIcon',
  components: { GxIcon, SubmenuNotificationItem, GxLoader },
  props: {
    activeMenu: {
      type: String,
      default: null,
    },
  },
  apollo: {
    company: gql`
      {
        company @client {
          number
        }
      }
    `,
    myAccount: {
      query: NOTIFICATIONS,
      variables() {
        return {
          page: 1,
          size: 50,
        }
      },
      subscribeToMore: [
        {
          document: gql`
            subscription subscriptionNotifications($companyNumber: Int!) {
              userCompanyNotificationCreated(companyNumber: $companyNumber) {
                notification {
                  notificationId
                  readStatus
                  datetime
                  image
                  description
                  userCompleteName
                  userColor
                  branchId
                  resourceReferences {
                    resourceId
                    resourceType
                    resourceDescription
                    resourceReference
                    index
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
            if (!previousResult) {
              return
            }
            previousResult.myAccount.companies[0].notifications.list.unshift(
              subscriptionData.data.userCompanyNotificationCreated.notification
            )
            return {
              myAccount: previousResult.myAccount,
            }
          },
          debounce: 3000,
          error(error) {
            /* eslint-disable */
            console.log('myAccount subscribeToMore error')
            console.log(error)
            /* eslint-enable */
          },
        },
      ],
      error(err) {
        this.error = this.$utils.parseServerError(err)
      },
    },
  },
  data() {
    return {
      blockButton: false,
      showPopover: false,
      error: null,
    }
  },
  computed: {
    showSection() {
      return this.activeMenu === this.$options.name
    },
    notifications() {
      if (this.myAccount) {
        return this.myAccount.companies[0].notifications
      }
      return null
    },
    unReadNotificationLength() {
      if (this.notifications && this.notifications.list.length) {
        const unread = this.notifications.list.filter(
          ({ readStatus }) => readStatus === 'unread'
        )
        return unread.length
      }
      return null
    },
    stringlength() {
      if (this.unReadNotificationLength) {
        return String(this.unReadNotificationLength).length
      }
      return null
    },
  },
  mounted() {
    const clickHandler = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.$emit('activeMenu', null)
      }
    }
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', clickHandler)
    })
  },
  methods: {
    async markAllAsRead() {
      try {
        this.blockButton = true
        await this.$apollo.mutate({
          mutation: SET_ALL_NOTIFICATIONS_AS_READ,
          variables: {
            companyNumber: this.company.number,
            datetime: new Date().toISOString(),
          },
          update: (store, { response }) => {
            const query = {
              query: NOTIFICATIONS,
              variables: {
                page: 1,
                size: 50,
              },
            }
            const data = store.readQuery(query)
            const notifications = data.myAccount.companies[0].notifications.list.map(
              (notification) => {
                const updatedNotification = {
                  ...notification,
                  ...{ readStatus: 'read' },
                }
                return updatedNotification
              }
            )
            data.myAccount.companies[0].notifications.list = notifications
            store.writeQuery({ ...query, data })
          },
        })
        this.blockButton = false
      } catch (error) {
        this.blockButton = false
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      }
    },
    showHideMenu() {
      if (this.showSection) {
        this.$emit('activeMenu', null)
      } else {
        this.$emit('activeMenu', this.$options.name)
      }
    },
  },
}
</script>
<template>
  <button
    class="w-5  relative h-5 text-base outline-none focus:outline-none"
    @click.stop="showHideMenu"
  >
    <GxIcon
      icon="notifications"
      :class="{
        'text-gray-700': !unReadNotificationLength,
        'text-black': unReadNotificationLength,
      }"
    />
    <div
      v-if="unReadNotificationLength"
      style="line-height:6px"
      class="text-base de:text-xs font-gothic absolute right-0 bottom-0 rounded-full border-white border bg-alert text-white font-bold flex justify-center items-center gx-unread-notifications"
    >
      <div
        v-if="unReadNotificationLength > 99"
        class="w-1 h-1 bg-white rounded"
      ></div>
      <span v-else>
        {{ unReadNotificationLength }}
      </span>
    </div>
    <transition name="popover">
      <section
        v-if="showSection && !error"
        class="w-108 flex flex-col right-0 shadow-5 absolute bg-white popover overflow-hidden"
        @click.stop
      >
        <header
          class="h-8 w-full pl-4 pr-2 border-b-1 border-gray-200 border flex justify-between items-center"
        >
          <p class="uppercase text-base de:text-xs font-gothic font-bold"
            >notificaciones</p
          >
          <button
            v-if="notifications && notifications.list.length"
            :disabled="blockButton"
            style="font-size:10px"
            class="text-base de:text-xs font-gothic font-bold"
            @click.stop="markAllAsRead"
            >Marcar todas como leídas</button
          >
        </header>
        <main
          :class="{
            'justify-start': notifications && notifications.length,
            'justify-center':
              !notifications ||
              !notifications.list ||
              !notifications.list.length,
          }"
          class="w-full flex-grow flex flex-col items-center"
        >
          <ul v-if="notifications && notifications.list.length" class="w-full">
            <SubmenuNotificationItem
              v-for="notification in notifications.list.slice(0, 5)"
              :key="`other${notification.notificationId}`"
              :notification="notification"
            />
            <li v-if="notifications.list.length <= 5" class="mt-4">
              <p
                style="font-size:10px"
                class="text-base de:text-xs font-gothic flex items-center justify-center"
              >
                <GxIcon icon="tag_faces" class="font-bold text-2xl mr-1" />
                Estas son todas tus notificaciones.
              </p>
            </li>
          </ul>
          <GxLoader v-if="$apollo.queries.myAccount.loading" />
          <p
            v-if="notifications && notifications.list.length === 0"
            class="text-base de:text-xs font-gothic"
          >
            <GxIcon
              style="font-size:1.5rem"
              icon="tag_faces"
              class="font-bold text-2xl"
            />
            <br />
            ¡Wow! No tienes más notificaciones.
          </p>
        </main>
        <footer
          v-if="
            notifications &&
              notifications.list.length &&
              notifications.list.length > 5
          "
          style="height:26px"
          class="bg-blue w-full flex justify-center items-center"
        >
          <RouterLink
            :to="{ name: 'notifications' }"
            style="font-size:10px"
            class="text-black font-bold text-base de:text-xs font-gothic"
          >
            Ver todas mis notificaciones
          </RouterLink>
        </footer>
      </section>
      <section
        v-if="showSection && error"
        class="w-108 flex flex-col right-0 shadow-5 absolute bg-white popover overflow-hidden"
        @click.stop
      >
        <header
          class="h-8 w-full pl-4 pr-2 border-b-1 border-gray-200 border flex justify-between items-center"
        >
          <p class="uppercase text-base de:text-xs font-gothic font-bold"
            >notificaciones</p
          >
          <button
            v-if="notifications && notifications.list.length"
            :disabled="blockButton"
            style="font-size:10px"
            class="text-base de:text-xs font-gothic font-bold"
            @click.stop="markAllAsRead"
            >Marcar todas como leídas</button
          >
        </header>
        <main
          :class="{
            'justify-start': notifications && notifications.list.length,
            'justify-center': !notifications || !notifications.list.length,
          }"
          class="w-full flex-grow flex  flex-col items-center"
        >
          <p>{{ error }}</p>
        </main>
        <footer
          v-if="notifications && notifications.length"
          style="height:26px"
          class="bg-blue w-full flex justify-center items-center"
        >
          <RouterLink
            :to="{ name: 'notifications' }"
            style="font-size:10px"
            class="text-black font-bold text-base de:text-xs font-gothic"
          >
            Ver todas mis notificaciones
          </RouterLink>
        </footer>
      </section>
    </transition>
  </button>
</template>
<style lang="scss" scoped>
.gx-unread-notifications {
  top: 1px;
  width: 0.875rem;
  height: 0.875rem;
  padding-top: 0.5px;
  font-size: 6px;
  transform: translate(2px, 5px);
}
.popover {
  top: 2rem;
  min-height: 28rem;
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
// Vue  animations
// .popover-enter-active {
//   transition: all 0.3s ease-out;
// }
// .popover-leave-active {
//   transition: all 0.3s ease-in;
// }
// .popover-enter,
// .popover-leave-to {
//   opacity: 0;
//   transform: translateY(-1rem) scale(0.1);
// }
// .popover-enter-to {
//   transform: scale(1);
// }
::-webkit-scrollbar {
  width: 8px;
}
</style>

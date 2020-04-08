<script>
import SubmenuNotificationItem from '@components/_Core/Navigation/TopBar/LeftDrawerSubmenus/SubmenuNotificationItem.vue'
import { SET_ALL_NOTIFICATIONS_AS_READ } from '@src/apollo//mutations.js'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxLoader from '@components/_Core/Utils/GxLoader'
import { NOTIFICATIONS, LOCAL_COMPANY } from '@src/apollo/queries.js'
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo'
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'

export default {
  name: 'Notifications',
  components: {
    LayoutWebMobile,
    GxIcon,
    SubmenuNotificationItem,
    GxDivider,
    GxLoader,
    GxInfiniteScrollApollo,
    GxDesktopHeader,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: NOTIFICATIONS,
      variables() {
        return {
          page: 1,
          size: this.pageSize,
        }
      },
    },
  },
  data() {
    return {
      blockButton: false,
      myAccount: null,
      scrolled: false,
      downloading: false,
      page: 1,
      pageSize: 10,
      notificationsSearchQuery: NOTIFICATIONS,
    }
  },
  computed: {
    notifications() {
      if (this.myAccount) {
        return this.myAccount.companies[0].notifications
      }
      return null
    },
    downloadedAll() {
      if (!this.notifications) return true
      return this.notifications.list.length === this.notifications.size
    },
  },
  watch: {
    page(newPage) {
      this.fetchMore(newPage)
    },
  },
  created() {
    /* eslint-disable */
    console.log('Update notifications cache by refetching')
    this.$apollo.queries.myAccount.refetch()
    /* eslint-enable */
  },
  methods: {
    extractDataFn(data) {
      return data.myAccount.companies[0].notifications.list
    },
    updateDataFn(dataToUpdate, newData) {
      dataToUpdate.myAccount.companies[0].notifications.list = [
        ...dataToUpdate.myAccount.companies[0].notifications.list,
        ...newData.myAccount.companies[0].notifications.list,
      ]
      return dataToUpdate
    },
    nextPage() {
      // Incase of api pagination
      this.page = this.page + 1
      this.downloading = true
    },
    fetchMore(newPage) {
      this.$apollo.queries.myAccount.fetchMore({
        variables: {
          page: newPage,
          size: this.pageSize,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newNotifications =
            fetchMoreResult.myAccount.companies[0].notifications.list
          previousResult.myAccount.companies[0].notifications.list = [
            ...previousResult.myAccount.companies[0].notifications.list,
            ...newNotifications,
          ]
          return previousResult
        },
      })
    },
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
      } catch (error) {
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      } finally {
        this.blockButton = false
      }
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    v-if="$mq === 'mo'"
    has-drawer
    has-drawer-right
    icon="dashboard"
    title="Notificaciones"
    @scrolled="scrolled = $event"
  >
    <div
      class="w-full flex-grow flex flex-col items-center"
      :class="{
        'justify-start':
          notifications && notifications.list && notifications.list.length,
        'justify-center':
          !notifications || !notifications.list || !notifications.list.length,
      }"
    >
      <GxInfiniteScrollApollo
        v-if="notifications && notifications.list.length"
        key="notificationsSearchResults"
        class="w-full pb-4"
        :query="notificationsSearchQuery"
        :extract-data-fn="extractDataFn"
        :update-data-fn="updateDataFn"
      >
        <template slot-scope="{ loading, listData, noMoreResults }">
          <ul>
            <SubmenuNotificationItem
              v-for="notification in listData"
              :key="notification.notificationId"
              :notification="notification"
            />
          </ul>

          <GxLoader v-if="loading" class="py-4" />

          <div v-if="noMoreResults" class="mt-4">
            <p
              style="font-size:10px"
              class=" gx-body flex items-center justify-center"
            >
              <GxIcon icon="tag_faces" class="font-bold text-2xl mx-1" />
              Estas son todas tus notificaciones.
            </p>
          </div>
        </template>
      </GxInfiniteScrollApollo>
    </div>
  </LayoutWebMobile>
  <div
    v-else
    class="px-8"
    :class="{
      'flex flex-col flex-grow':
        notifications && notifications.list.length === 0,
    }"
  >
    <GxDesktopHeader header="Notificaciones" icon="notifications" />
    <div class="flex justify-end">
      <button
        v-if="notifications && notifications.list.length"
        :disabled="blockButton"
        class="gx-caption de:gx-caption font-bold"
        @click.stop="markAllAsRead"
        >Marcar todas como leídas
      </button>
    </div>
    <GxDivider />
    <p
      v-if="notifications && notifications.list.length === 0"
      class="de:gx-caption text-center flex flex-col flex-grow justify-center"
    >
      <GxIcon style="font-size:1.5rem" icon="tag_faces" class="font-bold " />
      <br />
      ¡Wow! No tienes más notificaciones.
    </p>
    <div
      v-else
      class="w-full flex-grow flex flex-col items-center"
      :class="{
        'justify-start':
          notifications && notifications.list && notifications.list.length,
        'justify-center':
          !notifications || !notifications.list || !notifications.list.length,
      }"
    >
      <GxInfiniteScrollApollo
        v-if="notifications && notifications.list.length"
        key="notificationsSearchResults"
        class="w-full pb-4"
        :query="notificationsSearchQuery"
        :extract-data-fn="extractDataFn"
        :update-data-fn="updateDataFn"
      >
        <template slot-scope="{ loading, listData, noMoreResults }">
          <ul>
            <SubmenuNotificationItem
              v-for="notification in listData"
              :key="notification.notificationId"
              :notification="notification"
            />
            <GxDivider />
          </ul>

          <GxLoader v-if="loading" class="py-4" />
          <div v-if="noMoreResults" class="mt-4">
            <p
              style="font-size:10px"
              class=" gx-body flex items-center justify-center"
            >
              <GxIcon icon="tag_faces" class="font-bold text-2xl mx-1" />
              Estas son todas tus notificaciones.
            </p>
          </div>
        </template>
      </GxInfiniteScrollApollo>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SubmenuNotificationItem from './SubmenuNotificationItem'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxLoader from '@components/_Core/Utils/GxLoader'

import { SET_ALL_NOTIFICATIONS_AS_READ } from '@src/apollo//mutations.js'
import {
  NOTIFICATIONS,
  COMPANY_INFO,
  LOCAL_COMPANY,
} from '@src/apollo/queries.js'
import GxInfiniteScrollApollo from '@components/_Core/Utils/GxInfiniteScrollApollo'
export default {
  name: 'SubmenuNotifications',
  components: {
    SubmenuNotificationItem,
    GxAvatar,
    GxDivider,
    GxIcon,
    GxLoader,
    GxInfiniteScrollApollo,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
    },
    notifications: {
      query: NOTIFICATIONS,
      variables() {
        return {
          page: 1,
          size: this.pageSize,
        }
      },
      update(data) {
        return data.myAccount.companies[0].notifications
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
                  branchId
                  userCompleteName
                  userColor
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
          debounce: 300,
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
      notificationsSearchQuery: NOTIFICATIONS,
      mutationLoading: false,
      image: require('@src/assets/images/UNASSIGNED/10.svg'),
      welcomeImage: require('@src/assets/images/Storybook/bestia.svg'),
      pageSize: 10,
      notifications: null,
      company: null,
      downloading: false,
      error: null,
    }
  },
  computed: {
    companyLogo() {
      if (!this.myAccount) return null
      return this.myAccount.companies[0].company.companyLogo
    },
    businessName() {
      if (this.myAccount) {
        if (this.myAccount.companies[0].company.commercialName) {
          return this.myAccount.companies[0].company.commercialName
        }
        if (this.myAccount.companies[0].company.legalName) {
          return this.myAccount.companies[0].company.legalName
        }
        return ''
      }
      return ''
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

  mounted() {
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
      this.$apollo.queries.notifications.fetchMore({
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
        this.mutationLoading = true
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
            const data = store.readQuery({ query })
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
            store.writeQuery({ query, data })
          },
        })
      } catch (error) {
        /* eslint-disable */
        console.log(error)
        /* eslint-enable */
      } finally {
        this.mutationLoading = false
      }
    },
  },
}
</script>

<template>
  <div class="bg-white flex-grow w-full overflow-hidden flex flex-col">
    <div class="flex-shrink-0 flex items-center bg-primary-600 h-16">
      <GxAvatar
        class="bg-white rounded-full mx-4"
        style="width: 46px; height: 46px;"
        :class="[
          `bg-avatar-${myAccount ? myAccount.companies[0].company.color : 0}`,
        ]"
        :avatar-img="companyLogo"
      >
        <span
          v-if="!companyLogo"
          class="gx-h5 font-bold uppercase text-white"
          >{{ businessName[0] }}</span
        >
      </GxAvatar>
      <h1 class="flex-grow gx-h4 text-white">Notificaciones</h1>
    </div>
    <button
      v-if="notifications && notifications.list.length > 0"
      class="flex-shrink-0 h-8 px-4 bg-white gx-caption flex items-center justify-end font-bold shadow-2 z-1"
      :disabled="mutationLoading"
      @click="markAllAsRead"
    >
      Marcar todas como leídas
    </button>
    <GxInfiniteScrollApollo
      v-if="notifications && notifications.list.length"
      key="notificationsSearchResults"
      class="w-full pb-4 overflow-auto"
      :query="notificationsSearchQuery"
      :extract-data-fn="extractDataFn"
      :update-data-fn="updateDataFn"
    >
      <template
        slot-scope="{ loading: infiniteScrollLoading, listData, noMoreResults }"
      >
        <ul class="overflow-scroll">
          <li>
            <SubmenuNotificationItem
              v-for="notification in listData"
              :key="notification.notificationId"
              :notification="notification"
            />
            <GxDivider />
          </li>

          <GxLoader v-if="infiniteScrollLoading" class="py-4" />

          <li v-if="noMoreResults" class="mt-4">
            <p
              style="font-size:10px"
              class="text-base de:text-xs font-gothic flex items-center justify-center"
            >
              <GxIcon icon="tag_faces" class="font-bold text-2xl mx-1" />
              Estas son todas tus notificaciones.
            </p>
          </li>
        </ul>
      </template>
    </GxInfiniteScrollApollo>
    <!-- <ul
      v-if="notifications && notifications.list.length > 0"
      class="overflow-scroll"
    >
      <li v-for="(notification, index) in notifications.list" :key="index">
        <SubmenuNotificationItem :notification="notification" />
        <GxDivider />
      </li>
      <li
        v-if="downloadAll"
        class="flex items-center justify-center gx-caption my-4"
      >
        <GxIcon icon="insert_emoticon" class="mr-2" />
        <p>Estas son todas tus notificaciones.</p>
      </li>
      <li class="flex items-center justify-center gx-caption my-4">
        <Observer :loading="downloading" @load="nextPage" />
      </li>
    </ul> -->
    <div v-else class="flex-grow flex flex-col items-center justify-center">
      <GxIcon style="font-size: 24px;" icon="insert_emoticon" />
      <p class="gx-caption">¡Wow! No tienes más notificaciones.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/*  width */
::-webkit-scrollbar {
  width: 2px;
}
</style>

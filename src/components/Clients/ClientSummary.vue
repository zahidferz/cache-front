<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import GxSwitchText from '@components/_Core/Forms/GxSwitchText'
import GxInitials from '@components/_Core/Avatars/GxInitials'
import { CLIENT_DEACTIVATE, CLIENT_REACTIVATE } from '@src/apollo//mutations'
import { CLIENT_GENERAL_INFO, LOCAL_COMPANY } from '@src/apollo/queries'

export default {
  name: 'ClientSummary',
  components: {
    GxCardModal,
    GxIcon,
    GxAvatar,
    GxSwitchText,
    GxInitials,
  },
  props: {
    clientName: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    currency: {
      type: String,
      default: 'MXN',
    },
    amount: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    clientId: {
      type: String,
      required: true,
    },
    companyNumber: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'ACTIVO',
    },
    starcount: {
      type: Number,
      default: 0,
    },
    recientActivityStatus: {
      type: Number,
      default: 1,
    },
    color: {
      type: Number,
      default: 1,
    },
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: CLIENT_GENERAL_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
          branchNumber: this.company.branchNumber,
          clientId: this.$route.params.clientId,
        }
      },
      error(err) {
        this.error = this.$utils.parseServerError(err)
      },
      skip() {
        return this.skipClientGeneralInfoQuery
      },
    },
  },
  data() {
    return {
      errorDeactivatingClient: null,
      errorAlertImg: null,
      isActive: this.status,
      options: ['ACTIVO', 'INACTIVO'],
      skipClientGeneralInfoQuery: true,
    }
  },
  computed: {
    currentClientStatus() {
      return this.myAccount.companies[0].company.clients.list.map((c) => {
        if (c.clientId === this.clientId) {
          return c.status
        } else return null
      })
    },
    avatarInitials() {
      const splitName = this.clientName.split(' ')
      if (splitName.length > 1) {
        const firstInitial = splitName[0].split('')[0]
        const secondInitial = splitName[1].split('')[0]
        return `${firstInitial}${secondInitial}`
      } else {
        return splitName[0].slice(0, 2)
      }
    },
    quantity() {
      return this.amount.toFixed(2)
    },
  },
  watch: {
    company(newVal) {
      this.skipClientGeneralInfoQuery = false
    },
    isActive(newVal) {
      if (newVal === 'ACTIVO' && this.currentClientStatus === 'active') return
      let mutation
      if (newVal === 'ACTIVO') {
        mutation = CLIENT_REACTIVATE
      } else {
        mutation = CLIENT_DEACTIVATE
      }
      const vModel = this
      this.$apollo
        .mutate({
          mutation,
          variables: {
            companyNumber: this.companyNumber,
            clientId: this.clientId,
          },
          update: (store, response) => {
            const responseData =
              response.data.clientDeactivate || response.data.clientReactivate
            const query = {
              query: CLIENT_GENERAL_INFO,
              variables: {
                companyNumber: this.companyNumber,
                branchNumber: this.company.branchNumber,
                clientId: this.clientId,
              },
            }
            const data = store.readQuery(query)

            const clients = data.myAccount.companies[0].company.clients.list.map(
              (client) => {
                const updatedClient = {
                  ...client,
                  ...{ status: responseData.clientStatus },
                }
                return updatedClient
              }
            )
            data.myAccount.companies[0].company.clients.list = clients
            store.writeQuery({ ...query, data })
            Object.keys(store.data.data).forEach((k, i) => {
              if (
                k.includes(
                  `$ROOT_QUERY.myAccount.companies({"companyNumber":${
                    vModel.company.number
                  }}).0.company.clients`
                )
              ) {
                store.data.delete(k)
              }
            })
            // Force persist-cache update for next reloads
            this.$apollo.queries.myAccount.refetch()
          },
        })
        .catch((err) => {
          this.errorDeactivatingClient = this.$utils.parseServerError(err)
          this.isActive = 'ACTIVO'
          if (
            this.errorDeactivatingClient ===
            'Este cliente tiene procesos activos'
          ) {
            this.errorAlertImg = this.$utils.alertImages.Dissapointed
          } else {
            this.errorAlertImg = this.$utils.alertImages.Oops
          }
          setTimeout(() => {
            this.errorDeactivatingClient = null
          }, 3000)
        })

      this.$root.$emit('removeFromKeepAlive', 'MyClientsView')
    },
  },
}
</script>
<template>
  <div class="flex flex-grow mb-8 mt-4">
    <GxAvatar
      v-if="image"
      class="rounded-full flex-shrink-0 relative mr-4"
      style="width: 4.5rem; height: 4.5rem;"
      :avatar-img="image"
    >
      <div
        class="absolute w-3 h-3 border border-white rounded-full gxStatusPosition"
        :class="{
          'bg-success': recientActivityStatus === 1,
          'bg-pending': recientActivityStatus === 2,
          'bg-alert': recientActivityStatus === 3,
        }"
      ></div>
    </GxAvatar>
    <GxInitials
      v-if="!image"
      :status-batch="recientActivityStatus"
      :avatar-text="avatarInitials"
      :color="color"
    />
    <div class="flex-grow">
      <span class="flex-grow">{{ title }}</span>
      <div class="gx-h4 flex gxQuantityContainer">
        <p class="mr-1 font-bold truncate"
          >${{ quantity.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}
        </p>
        <p class="font-bold">{{ currency }}</p>
      </div>
      <div class="flex-grow flex"
        ><p
          :class="{
            'flex-grow flex items-center': $mq === 'mo',
            'mr-4 flex items-center': $mq === 'de',
          }"
        >
          <GxIcon
            v-for="rate in starcount"
            :key="rate.id"
            icon="grade"
            class="text-pending"
          />
          <GxIcon
            v-for="(rate, index) in 3 - starcount"
            :key="index"
            icon="grade"
            class="text-gray-500"
          />
        </p>
        <GxSwitchText
          v-model="isActive"
          :options="options"
          :bg-colors="['bg-alert', 'bg-success']"
        />
      </div>
    </div>
    <GxCardModal
      v-if="errorDeactivatingClient"
      :headline="errorDeactivatingClient"
      :card-img="errorAlertImg"
      :alt="errorDeactivatingClient"
      @click="errorDeactivatingClient = null"
    />
  </div>
</template>
<style lang="scss" scoped>
// Mobile breakpoints
.gxQuantityContainer {
  max-width: 150px;
}

@media screen and (min-width: 361px) {
  .gxQuantityContainer {
    max-width: 165px;
  }
}

@media screen and (min-width: 415px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

// Desktop breakpoints
@media screen and (min-width: 768px) {
  .gxQuantityContainer {
    max-width: 155px;
  }
}

@media screen and (min-width: 868px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

@media screen and (min-width: 968px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

@media screen and (min-width: 1068px) {
  .gxQuantityContainer {
    max-width: 240px;
  }
}

@media screen and (min-width: 1168px) {
  .gxQuantityContainer {
    max-width: 340px;
  }
}
.gxStatusPosition {
  right: 0.5rem;
  bottom: 0;
}
</style>

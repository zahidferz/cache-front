<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import ClientGeneralInfo from '@components/Clients/ClientGeneralInfo'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { CLIENT_DELETE } from '@src/apollo//mutations'
import { CLIENT_GENERAL_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
export default {
  name: 'ClientGeneralInfoView',
  components: {
    ClientGeneralInfo,
    GxCardModal,
    LayoutWebMobile,
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
      skip() {
        return (
          !this.company || !this.company.number || !this.company.branchNumber
        )
      },
    },
  },
  data() {
    return {
      showEditForm: false,
      skipQuery: false,
      clientStatus: null,
      error: null,
      loading: false,
      clienteDeleteConfirmation: false,
      clienteDeleteConfirmationImg: require('@src/assets/images/Clients/ClientoInfo/mo_005_4_1_eliminarcliente.svg'),
      clienteDeleteSuccess: false,
      clienteDeleteSuccessImg: require('@src/assets/images/Clients/ClientoInfo/mo_005_4_1_exitoeliminarcliente.svg'),
    }
  },
  computed: {
    deleteInactiveClientIcon() {
      if (
        this.myAccount &&
        this.myAccount.companies[0].company.clients.list[0].status ===
          'suspended'
      ) {
        return `delete`
      }
      return null
    },
  },
  watch: {
    myAccount: {
      handler(newVal) {
        if (newVal) {
          this.clientStatus = this.myAccount.companies[0].company.clients.list[0].status
        }
      },
    },
    company: {
      handler(newVal) {
        if (newVal) {
          this.skipQuery = true
        }
      },
    },
  },
  created() {
    this.$apollo.queries.myAccount.refetch()
  },
  methods: {
    goBack() {
      if (this.$route.query.from === 'new') {
        this.$router.push({ name: 'myclients' })
      } else {
        this.$router.gxAnim = 'slide-right'
        this.$router.back()
      }
    },
    toggleDeleteConfirmationDialog() {
      this.clienteDeleteConfirmation = true
    },
    async deleteClient() {
      try {
        this.loading = true
        await this.$apollo.mutate({
          mutation: CLIENT_DELETE,
          variables: {
            companyNumber: this.company.number,
            clientId: this.$route.params.clientId,
          },
          update: (store, response) => {
            // Remove client specific queries from cache
            Object.keys(store.data.data).forEach((key) => {
              key.match(this.$route.params.clientId) && store.data.delete(key)
            })
          },
        })
        this.loading = false
        this.clienteDeleteConfirmation = false
        setTimeout(() => {
          this.clienteDeleteSuccess = true
        }, 300)
      } catch (e) {
        this.loading = false
        this.clienteDeleteConfirmation = false
        this.error = this.$utils.parseServerError(e)
      }
    },
    toMyClients() {
      this.$router.push({ name: 'myclients' })
    },
    updateCompleted() {
      localStorage.setItem('clientUpdated', true)
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    v-if="$mq === 'mo'"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
    title="Información general"
    :icon-right="deleteInactiveClientIcon"
    :icon-right-click-handler="toggleDeleteConfirmationDialog"
  >
    <ClientGeneralInfo @updateCompleted="updateCompleted" />
    <GxCardModal
      v-if="clienteDeleteConfirmation"
      text-body="Eliminar un cliente es una acción permanente que no podrás deshacer."
      :card-img="$utils.alertImages.Question"
      alt="¿Seguro que quieres eliminarlo?"
      :loading="loading"
    >
      <template v-slot:headline>
        ¿Seguro que<br />quieres eliminarlo?
      </template>
      <template v-slot:actions>
        <div class="w-full flex justify-end self-center de:mt-8">
          <GxButton
            :ghost="$mq === 'de'"
            :plain="$mq === 'mo'"
            class="de:text-white mr-4 de:border-white"
            @click="clienteDeleteConfirmation = false"
            >cancelar</GxButton
          >
          <GxButton
            :dark="$mq === 'de'"
            :plain="$mq === 'mo'"
            :class="{ 'text-alert': $mq === 'mo' }"
            @click="deleteClient"
            >eliminar</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="clienteDeleteSuccess"
      headline="Cliente eliminado"
      :card-img="$utils.alertImages.Done"
      alt="Cliente eliminado"
      @click="toMyClients"
    />
    <GxCardModal
      v-if="error"
      :text-body="error"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
      @click="error = null"
    />
    <GxFab
      v-if="
        myAccount &&
          myAccount.companies[0].company.clients.list[0].status !== 'active'
      "
      icon="delete"
      :mobile="$mq === 'mo'"
      :large="$mq === 'de'"
      class="shadow-2 fixed gxFixedFab"
      :class="{ gxBigFab: $mq === 'de' }"
      label="eliminar"
      @click="clienteDeleteConfirmation = !clienteDeleteConfirmation"
    />
  </LayoutWebMobile>
  <div v-else class="pb-4 px-8">
    <ClientGeneralInfo @updateCompleted="updateCompleted" />
    <GxCardModal
      v-if="clienteDeleteConfirmation"
      text-body="Eliminar un cliente es una acción permanente que no podrás deshacer."
      :card-img="$utils.alertImages.Question"
      alt="¿Seguro que quieres eliminarlo?"
      :loading="loading"
    >
      <template v-slot:headline>
        ¿Seguro que<br />quieres eliminarlo?
      </template>
      <template v-slot:actions>
        <div class="w-full flex justify-center self-center de:mt-8">
          <GxButton
            :ghost="$mq === 'de'"
            :plain="$mq === 'mo'"
            class="mr-4"
            @click="clienteDeleteConfirmation = false"
            >cancelar</GxButton
          >
          <GxButton
            :plain="$mq === 'mo'"
            :class="{ 'text-alert': $mq === 'mo' }"
            @click="deleteClient"
            >eliminar</GxButton
          >
        </div>
      </template>
    </GxCardModal>
    <GxCardModal
      v-if="clienteDeleteSuccess"
      headline="Cliente eliminado"
      :card-img="$utils.alertImages.Done"
      alt="Cliente eliminado"
      @click="toMyClients"
    />
    <GxCardModal
      v-if="error"
      :text-body="error"
      :card-img="$utils.alertImages.Oops"
      :alt="error"
      @click="error = null"
    />
    <GxFab
      v-if="
        myAccount &&
          myAccount.companies[0].company.clients.list[0].status !== 'active'
      "
      icon="delete"
      :mobile="$mq === 'mo'"
      :large="$mq === 'de'"
      class="shadow-2 fixed gxFixedFab"
      :class="{ gxBigFab: $mq === 'de' }"
      label="eliminar"
      @click="clienteDeleteConfirmation = !clienteDeleteConfirmation"
    />
  </div>
</template>
<style lang="scss" scoped>
.gxFixedFab {
  right: 1rem;
  bottom: 1rem;
}
.gxBigFab {
  width: 3.25rem;
  height: 3.25rem;
}
</style>

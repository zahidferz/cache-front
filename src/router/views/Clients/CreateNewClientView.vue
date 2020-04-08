<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import CreateNewClientForm from '@components/Clients/CreateNewClientForm'

export default {
  components: {
    LayoutWebMobile,
    CreateNewClientForm,
  },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    v-if="$mq === 'mo'"
    icon="expand_more"
    :icon-click-handler="goBack"
    title="Añadir nuevo cliente"
  >
    <CreateNewClientForm />
  </LayoutWebMobile>
  <div v-else class="px-8 pb-4">
    <CreateNewClientForm />
  </div>
</template>

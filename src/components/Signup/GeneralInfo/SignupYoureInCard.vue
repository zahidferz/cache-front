<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
export default {
  name: 'SignupYourInCard',
  components: {
    GxCardModal,
  },
  props: {
    guest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // image: require('@src/assets/images/Alerts/Exito.gif'),
      // image: require('@src/assets/images/Signup/TaxInfo/mo_success.svg'),
      loading: false,
    }
  },
  computed: {
    message() {
      return 'Nos encanta tenerte aquí.'
    },
  },
  methods: {
    nextPage() {
      this.loading = true
      const name = this.guest ? 'dashboard' : 'taxInfo'
      setTimeout(() => {
        this.$router.push({ name })
      }, 300)
    },
  },
}
</script>

<template>
  <div class="flex-grow flex flex-col">
    <MqLayout mq="mo">
      <GxCardModal
        class="text-center"
        headline="You're in baby!"
        text-body="Nos encanta tenerte aquí. Ahora cuéntanos de la mejor empresa del mundo: ¡La tuya!"
        :card-img="$utils.alertImages.Success"
        alt="Ya estas dentro"
        @click="nextPage"
      >
      </GxCardModal>
    </MqLayout>
    <MqLayout
      mq="de"
      class="flex-grow flex flex-col justify-center items-center"
    >
      <div
        class="w-1/3 flex-grow flex flex-col justify-center items-center text-center"
      >
        <img
          :src="$utils.alertImages.Success"
          alt="Ya estas dentro"
          class="mb-8"
        />
        <h1 class="gx-h4 font-bold mb-4">You are in baby!</h1>
        <p class="mb-8"
          >Nos encanta tenerte aquí. Ahora cuéntanos de la mejor empresa del
          mundo: ¡La tuya!</p
        >
        <GxButton :loading="loading" @click="nextPage">Continuar</GxButton>
      </div>
    </MqLayout>
  </div>
</template>

<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxInput from '@components/_Core/Forms/GxInput'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import PaybookWidget from './PaybookWidget'
import banks from './banks'

export default {
  name: 'BankForm',
  components: {
    GxIcon,
    GxInput,
    GxCardModal,
    PaybookWidget,
  },
  data() {
    return {
      username: '',
      showConnectionErrorDialog: false,
      showSuccessDialog: false,
      connectionErrorImage: require('@src/assets/images/Signup/InitialTodos/mo_001_5_datosincorrectos.svg'),
      successTimeout: null,
    }
  },
  computed: {
    bank() {
      return banks.find((bank) => bank.name === this.$route.params.bank)
    },
  },
  watch: {
    showSuccessDialog(newVal) {
      if (newVal) {
        this.successTimeout = setTimeout(() => {
          this.nextPage()
        }, 4000)
      }
    },
  },
  methods: {
    onSubmit() {
      alert('implement')
    },
    goBack() {
      this.$router.back()
    },
    goBackWithReload() {
      window.location = '/registro/pendientes/choosebank'
    },
    nextPage() {
      if (this.successTimeout) {
        clearTimeout(this.successTimeout)
      }
      this.$router.push({ name: 'uploadcompanylogo' })
    },
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col">
    <div
      v-if="$route.query.paybookId"
      class="flex-grow flex flex-col items-center"
    >
      <nav
        class="gx-h5 h-14 flex px-4 py-5 z-10 bg-white text-black rounded-lg self-stretch"
        role="navigation"
      >
        <GxIcon
          transparent
          icon="keyboard_backspace"
          class="cursor-pointer pr-4"
          @click="goBackWithReload"
        />
      </nav>
      <PaybookWidget
        :paybook-name="$route.query.paybookName"
        :paybook-id="$route.query.paybookId"
        @success="showSuccessDialog = true"
      />
    </div>
    <div v-else class="flex-grow flex flex-col">
      <img class="w-full" :src="bank.image" :alt="bank.name" />
      <div class="flex-grow bg-white rounded-lg gxFormContainer">
        <nav
          class="gx-h5 h-14 flex items-center px-4 py-5 z-10 bg-white text-black rounded-lg"
          role="navigation"
        >
          <div class="flex-grow flex items-center">
            <GxIcon
              transparent
              icon="keyboard_backspace"
              class="cursor-pointer pr-4"
              @click="goBack"
            />
            <p class="flex-grow flex justify-left">Conéctate a tu banco</p>
          </div>
        </nav>
        <form @submit.prevent="onSubmit">
          <GxInput
            v-model="username"
            label="Usuario"
            placeholder="Usuario"
            icon="face"
          />
          <GxInput
            v-model="username"
            label="Contraseña"
            placeholder="Contraseña"
            pattern="password"
          />
          <div class="p-4">
            <p class="mb-4">Tu información está protegida. Conoce cómo.</p>
            <GxButton class="mx-auto" type="submit">Continuar</GxButton>
          </div>
        </form>
      </div>
    </div>
    <GxCardModal
      v-if="showConnectionErrorDialog"
      headline="Datos de acceso incorrectos"
      :card-img="connectionErrorImage"
      alt="You're in baby"
      @close="showConnectionErrorDialog = false"
    >
    </GxCardModal>
    <GxCardModal
      v-if="showSuccessDialog"
      headline="!Nos estamos conectando!"
      text-body="Esto puede tardar unos minutos. Mientras terminamos, ponle estilo a tus facturas."
      :card-img="connectionErrorImage"
      alt="You're in baby"
      @close="nextPage"
    >
    </GxCardModal>
  </div>
</template>
<style lang="scss" scoped>
.gxFormContainer {
  margin-top: -2rem;
}
</style>

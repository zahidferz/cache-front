<script>
import GxCardCore from '@components/_Core/Cards/GxCardCore'
import GxInput from '@components/_Core/Forms/GxInput'
import GxModal from '@components/_Core/Modals/GxModal'
import GxCardModal from '@components/_Core/Cards/GxCardModal'
export default {
  name: 'ModalSendByEmail',
  components: {
    GxCardCore,
    GxInput,
    GxModal,
    GxCardModal,
  },
  props: {
    mutation: {
      type: Object,
      required: true,
    },
    mutationVariables: {
      type: Object,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    successMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      invalidMail: true,
      loading: false,
      customError: null,
      showSuccess: false,
      successTimeout: null,
      // alertImg: require('@src/assets/images/Clients/Misclientes/mo_005_csvenviado.svg'),
    }
  },
  computed: {
    isFormEmpty() {
      return !this.email
    },
  },
  watch: {
    email(newVal) {
      if (newVal) {
        this.customError = null
      }
    },
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true
        if (this.isFormEmpty) {
          this.customError = 'Debes ingresar un correo electrónico'
          return
        }
        if (this.invalidMail) {
          return
        }
        await this.$apollo.mutate({
          mutation: this.mutation,
          variables: Object.assign(
            { email: this.email },
            this.mutationVariables
          ),
        })
        this.showSuccess = true
        this.successTimeout = setTimeout(this.onSuccessModalClose, 3000)
      } catch (error) {
        this.customError = this.$utils.parseServerError(error)
      } finally {
        this.loading = false
      }
    },
    onSuccessModalClose() {
      if (this.successTimeout) {
        clearTimeout(this.successTimeout)
      }
      this.$emit('close')
    },
  },
}
</script>
<template>
  <GxCardModal
    v-if="showSuccess"
    :headline="successMessage"
    :card-img="$utils.alertImages.CheckEmail"
    alt="Éxito"
    class="w-108"
    @click="onSuccessModalClose"
    @close="onSuccessModalClose"
  />
  <GxModal v-else class="py-4" @close="$emit('close')">
    <GxCardCore
      :clickable="false"
      class="flex-grow flex flex-col  de:bg-white w-108  pt-8 pb-6 px-4  de:shadow-4 rounded-lg"
    >
      <form class="w-full  flex flex-col px-4" @submit.prevent="onSubmit">
        <p class="text-black gx-h5 text-center leading-none font-bold">{{
          header
        }}</p>
        <GxInput
          v-model="email"
          placeholder="Correo Electrónico"
          label="Correo Electrónico"
          icon="email"
          class="mt-6"
          pattern="email"
          @valid="invalidMail = $event"
        />
        <p class="text-center mt-6 de:gx-caption gx-caption"
          >Tu información está protegida.
          <GxTextLink
            target-blank
            :to="{ name: 'privacypolicy' }"
            class="font-bold leading-none"
            >Conoce cómo.</GxTextLink
          ></p
        >
        <div class="mt-6">
          <p v-if="customError" class="text-alert text-center leading-none">{{
            customError
          }}</p>
          <GxButton :loading="loading" class="mt-2 mx-auto" type="submit"
            >enviar</GxButton
          >
        </div>
      </form>
    </GxCardCore>
  </GxModal>
</template>

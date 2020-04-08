<template>
  <div
    class="bg-primary text-white flex-grow flex flex-col items-center text-center p-4"
  >
    <div class="mb-4">
      <img
        src="@src/assets/images/UNASSIGNED/ciecVip.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
    <div class="mb-8">
      <p class="gx-h3 mb-4">¡Destaca junto con tu negocio!</p>
      <p class=""
        >¡Accede de forma VIP a la plataforma, sólo añade tu CIEC y
        despreocupáte!</p
      >
    </div>
    <form class="w-full">
      <GxInput
        v-model="taxId"
        dark
        placeholder="RFC"
        label="RFC"
        pattern="taxId"
        class="mb-4"
        @valid="rfcValidation"
      />
      <GxInput
        v-model="ciecNum"
        dark
        placeholder="CIEC"
        label="CIEC"
        icon="lock"
        pattern="password"
        :validation-fn="
          (val) => {
            if (val.length < 8) {
              return 'La CIEC debe tener al menos 8 caracteres'
            }
          }
        "
      />
      <div class="flex justify-end">
        <span class="gx-caption"
          >Conoce nuestra
          <GxTextLink target-blank :to="{ name: 'privacyPolicy' }"
            >Política de seguridad</GxTextLink
          ></span
        >
      </div>
      <div class="flex flex-col mt-4">
        <GxButton
          dark
          class="px-8 self-center font-bold"
          :disabled="isValidForm"
          @click="sendData"
        >
          Acceder</GxButton
        >
      </div>
    </form>
    <div>
      <span class="gx-caption self-end"
        >Las apps no son lo mío.
        <GxTextLink :to="{ name: 'registerCiecManually' }" class="font-bold"
          >Registrarme manualmente</GxTextLink
        ></span
      >
    </div>
  </div>
</template>
<script>
import GxInput from '@components/_Core/Forms/GxInput'

export default {
  components: {
    GxInput,
  },
  data() {
    return {
      taxId: '',
      ciecNum: '',
      validRFC: false,
      validForm: this.isValidForm,
    }
  },
  computed: {
    isValidForm() {
      if (this.validRFC && this.ciecNum.length > 0) {
        return false
      }
      return true
    },
  },
  methods: {
    rfcValidation(newVal) {
      this.validRFC = newVal
    },
    sendData() {
      const timeout = setTimeout(() => {
        // Do something
        alert(`Data sent: RFC: ${this.taxId} CIEC: ${this.ciecNum} `)
      }, 3000)
      this.$once('hook:destroyed', () => {
        clearTimeout(timeout)
      })
    },
  },
}
</script>

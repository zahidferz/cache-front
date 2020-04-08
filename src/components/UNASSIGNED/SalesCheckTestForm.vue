<template>
  <div class=" flex-grow flex flex-col p-4">
    <div class="flex-grow flex flex-col justify-around">
      <GxInput
        v-model="mailSubject"
        label="Asunto del correo"
        input-id="mailSubject"
        icon="library_books"
      />
      <GxInput
        v-model="testMail"
        label="Nombre o Razón Social"
        input-id="testMail"
        icon="business_center"
        :valid="testMail.length > 0"
        pattern="email"
      />
      <GxTextArea
        v-model="testMessage"
        text-area-id="message"
        label="Escribe tu mensaje"
        placeholder="Escribe aquí..."
      />
    </div>
    <GxButton plain class="self-end">enviar</GxButton>
  </div>
</template>
<script>
import GxInput from '@components/_Core/Forms/GxInput'
import GxTextArea from '@components/_Core/Forms/GxTextArea'
export default {
  components: {
    GxInput,
    GxTextArea,
  },
  data() {
    return {
      mailSubject: '',
      testMail: '',
      testMessage: '',
    }
  },
  methods: {
    rfcValidation(newVal) {
      this.validRFC = newVal
    },
  },
}
</script>

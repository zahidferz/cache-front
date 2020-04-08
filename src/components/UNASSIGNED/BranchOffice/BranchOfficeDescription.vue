<script>
import GxTextArea from '@components/_Core/Forms/GxTextArea'
export default {
  components: {
    GxTextArea,
  },
  data() {
    return {
      answer: '',
    }
  },
  computed: {
    validInput() {
      if (this.answer !== '') {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<template>
  <div class=" m-2 flex flex-col items-center flex-grow justify-between">
    <GxTextArea
      v-model="answer"
      dark
      placeholder="Procura que sean pocos caracteres"
    />
    <GxFab dark :disabled="validInput" />
  </div>
</template>

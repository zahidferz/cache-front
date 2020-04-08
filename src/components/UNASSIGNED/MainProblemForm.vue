<script>
import GxTextArea from '@components/_Core/Forms/GxTextArea'
export default {
  components: {
    GxTextArea,
  },
  data() {
    return {
      userAnswer: '',
    }
  },
  computed: {
    validInput() {
      if (this.userAnswer !== '') {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<template>
  <form class=" m-2 flex flex-col items-center flex-grow justify-between">
    <GxTextArea
      v-model="userAnswer"
      dark
      placeholder="¿Cuál es el problema principal que quieres resolver con Chain?"
    />
    <GxFab dark :disabled="validInput" />
  </form>
</template>

<script>
import GxInput from '@components/_Core/Forms/GxInput'

export default {
  components: {
    GxInput,
  },
  data() {
    return {
      number: '',
    }
  },
  computed: {
    validInput() {
      if (this.number !== '') {
        return false
      } else {
        return true
      }
    },
  },
}
</script>

<template>
  <form class=" m-2 flex flex-col items-center flex-grow justify-around">
    <GxInput v-model="number" pattern="numeric" dark />
    <GxFab dark :disabled="validInput" />
  </form>
</template>

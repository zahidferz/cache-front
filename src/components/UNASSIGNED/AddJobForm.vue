<script>
import GxInput from '@components/_Core/Forms/GxInput'

export default {
  components: {
    GxInput,
  },
  data() {
    return {
      job: '',
    }
  },
  methods: {
    sendData() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<template>
  <form class="flex-grow flex flex-col justify-between ">
    <GxInput
      v-model="job"
      class="mb-8"
      :valid="job !== ''"
      label="Escribe el rol que desempeñas"
      icon="accessibility_new"
    />
    <div class="flex justify-end">
      <GxButton plain :disabled="job === ''" @click="sendData"
        >Seleccionar</GxButton
      >
    </div>
  </form>
</template>

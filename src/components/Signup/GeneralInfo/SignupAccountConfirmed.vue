<script>
export default {
  name: 'SignupAccountConfirmed',
}
</script>

<template>
  <div class="flex-grow flex flex-col de:overflow-hidden de:bg-primary">
    <div
      class="flex flex flex-col de:p-8 p-4 de:mx-auto de:shadow-3 de:flex-grow-0 de:relative de:rounded-lg de:w-108 mt-8 de:mt-64 de:bg-white"
    >
      <h1 v-if="$mq === 'de'" class="de:gx-h4 font-bold mb-8 text-center"
        >Cuenta confirmada</h1
      >
      <p
        >Ahora tu cuenta está activa. Puedes cerrar esta ventana y continuar en
        la anterior.</p
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* stylelint-disable */
.image {
  width: 176px;
}

@screen de {
  .imageContainer {
    position: absolute;
    top: 85%;
    left: -45%;
  }
  .image {
    width: 120%;
  }
}
</style>

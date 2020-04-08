<script>
import GxBulletList from '@src/components/_Core/Lists/GxBulletList'
// import GxButton from '@src/components/_Core/Buttons/GxButton' // Now global
export default {
  name: 'LinkBank',
  components: {
    GxBulletList,
    // GxButton,
  },
  data() {
    return {
      labels: [
        { label: '1. Selecciona tu entidad bancaria.' },
        { label: '2. Ingresa tu usuario y contraseña.' },
        { label: '3. Obtén los movimientos de tu cuenta en tiempo real.' },
      ],
    }
  },
}
</script>
<template>
  <div class="flex-grow flex flex-col items-center p-4">
    <img
      src="@src/assets/images/Signup/InitialTodos/mo_001_5_guru.svg"
      alt="Conéctate a tu banco"
    />
    <h1 class="gx-h3 text-center text-primary"
      >¡Deja de adivinar tus ingresos y egresos!</h1
    >
    <GxBulletList class="my-8" :inputs="labels" />
    <p class="mb-4 text-center"
      >Tu información está protegida. <a class="font-bold">Conoce cómo.</a></p
    >
    <GxButton :to="{ name: 'choosebank' }">Iniciar</GxButton>
  </div>
</template>

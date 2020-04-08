<script>
import Layout from '@layouts/LayoutMain'
import LoginPasswordRecovery from '@src/components/Login/LoginPasswordRecovery.vue'

export default {
  page: {
    title: 'Recupera tu contraseña',
    meta: [
      {
        name: 'Recuperar contraseña',
        content: 'Formulario para recuperar contraseña',
      },
    ],
  },
  components: { Layout, LoginPasswordRecovery },
}
</script>

<template>
  <Layout
    :icon="$mq === 'mo' ? 'keyboard_backspace' : null"
    :title="$mq === 'mo' ? 'Recupera tu contraseña' : null"
    :dark="$mq === 'mo'"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/pink.svg"
          alt="Chain"/></figure
    ></a>
    <LoginPasswordRecovery />
  </Layout>
</template>

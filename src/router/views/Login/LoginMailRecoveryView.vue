<script>
import Layout from '@layouts/LayoutMain'
import LoginMailRecovery from '@src/components/Login/LoginMailRecovery.vue'

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
  components: { Layout, LoginMailRecovery },
}
</script>

<template>
  <Layout :title="$mq === 'mo' ? 'Revisa tu correo' : null">
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/white.svg"
          alt="Chain"/></figure
    ></a>
    <LoginMailRecovery />
  </Layout>
</template>

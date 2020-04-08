<script>
import Layout from '@layouts/LayoutMain'
import LoginDefineNewPassword from '@src/components/Login/LoginDefineNewPassword.vue'

export default {
  page: {
    title: 'Cambia tu contraseña',
    meta: [
      {
        name: 'Cambia tu contraseña',
        content: 'Formulario para cambiar contraseña',
      },
    ],
  },
  components: { Layout, LoginDefineNewPassword },
}
</script>

<template>
  <Layout :dark="$mq === 'mo'">
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/pink.svg"
          alt="Chain"/></figure
    ></a>
    <LoginDefineNewPassword />
  </Layout>
</template>

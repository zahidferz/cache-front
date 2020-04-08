<script>
import Layout from '@layouts/LayoutMain'
export default {
  page: {
    title: 'Bienvenido',
    meta: [{ name: 'Página de inicio', content: 'Bienvenido' }],
  },
  components: {
    Layout,
  },
  data() {
    return {
      date: new Date().toISOString(),
      urlDondeseregistra: window.location.toString().split('?')[0],
      utmSource: document.referrer || 'Orgánico',
    }
  },
}
</script>

<template>
  <Layout dark>
    <div
      class="flex-grow flex flex-col items-center justify-between p-4 pt-18 text-white bg-primary"
    >
      <div class="flex flex-col items-center">
        <img src="@assets/images/Logos/white.svg" class="w-41" alt="Taquito!" />
      </div>
      <div class="text-center">
        <GxButton
          id="btn-register-welcome"
          :to="{
            name: 'signup',
            query: {
              utm_source: utmSource,
              utm_medium: 'Directo Website',
              utm_campaign: null,
              url_dondeseregistra: urlDondeseregistra,
              innerLink: true,
              url_elementoenelqueseregistra: 'btn-register-welcome',
            },
          }"
          label="Registrarme"
          dark
          >Registrarme</GxButton
        >
        <p class="gx-caption de:gx-caption">
          o
          <GxTextLink :to="{ name: 'login' }">iniciar sesión</GxTextLink>
        </p>
      </div>
    </div>
  </Layout>
</template>

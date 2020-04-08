<script>
import Layout from '@layouts/LayoutMain'
import LoginForm from '@src/components/Login/LoginForm'
export default {
  page: {
    title: 'Login',
    meta: [{ name: 'description', content: 'Login' }],
  },
  components: { Layout, LoginForm },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.push({ name: 'welcome' })
    },
  },
}
</script>

<template>
  <Layout
    :icon="$mq === 'mo' ? 'keyboard_backspace' : null"
    :title="$mq === 'mo' ? 'Inicia sesión' : null"
    :dark="$mq === 'mo'"
  >
    <a v-if="$mq === 'de'" href="#" class="fixed left-0 top-0 ml-6 mt-6"
      ><figure>
        <img
          class="w-22"
          src="@assets/images/Logos/black.svg"
          alt="Chain Logo"/></figure
    ></a>
    <LoginForm />

    <!-- Top Right shortcuts -->
    <div
      v-if="$mq === 'de'"
      class="fixed top-0 right-0 flex items-center pt-4 pr-4"
    >
      <button class="mr-2 flex items-center group" @click="goBack">
        <GxIcon
          icon="keyboard_arrow_left"
          class="mr-2 text-gray-700 group-hover:text-black"
        />
        <span class="text-gray-700 group-hover:text-black mr-4">Regresar</span>
      </button>
      <GxIcon
        icon="stars"
        style="color: var(--secondary-200);"
        class="gx-star-icon"
      />
    </div>
    <!-- Bottom Right shortcuts -->
    <div v-if="$mq === 'de'" class="fixed bottom-0 right-0 mb-22 mr-6">
      <div class="flex justify-end items-center mb-2">
        <!-- El teléfono tiene que incluir código internacional -->
        <!-- <a
          target="_blank"
          href="https://wa.me/521234567890"
          class="mr-4 flex items-center"
        >
          <img
            src="@assets/images/Login/whats.svg"
            alt="Whatsapp"
            class="mr-2"
          />
          <p class="text-gray-700 hover:text-black">1234567890</p>
        </a> -->
        <a
          target="_blank"
          href="https://www.facebook.com/chainapp/"
          class="mr-2"
        >
          <img class="facebook" src="@assets/images/Login/face.svg" />
        </a>
        <a target="_blank" href="https://www.instagram.com/chain_hq/">
          <img class="instagram" src="@assets/images/Login/instagram.svg" />
        </a>
      </div>
      <div class="flex justify-center items-center text-gray-700">
        <RouterLink
          :to="{ name: 'termsandconditions' }"
          target="_blank"
          class="uppercase hover:text-black"
          >Términos y condiciones</RouterLink
        >
        <GxIcon icon="lens" style="font-size: 4px;" class="mx-2" />
        <RouterLink
          :to="{ name: 'privacypolicy' }"
          target="_blank"
          class="uppercase hover:text-black"
          >Privacidad</RouterLink
        >
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.gx-star-icon {
  background-color: white;
  border-radius: 50%;
}
.instagram:hover,
.facebook:hover {
  filter: brightness(0%);
}
</style>

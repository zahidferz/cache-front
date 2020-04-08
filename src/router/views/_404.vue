<script>
import Layout from '@layouts/LayoutMain'

export default {
  page: {
    title: '404',
    meta: [{ name: 'description', content: '404' }],
  },
  components: { Layout },
  props: {
    resource: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      backgroundImageDE: require('@assets/images/404/de_000_fondo.svg'),
      backgroundImageMO: require('@assets/images/404/mo_000_fondo.svg'),
    }
  },
}
</script>

<template>
  <Layout>
    <!-- <h1 :class="$style.title">
      404
      <template v-if="resource">
        {{ resource }}
      </template>
      Not Found
    </h1> -->
    <div class="flex-grow flex flex-col relative">
      <!-- CHAIN LOGO DE -->
      <a v-if="$mq === 'de'" href="#" class="de:absolute ml-6 mt-6"
        ><figure>
          <img
            class="w-22"
            src="@assets/images/Logos/black.svg"
            alt="Chain Logo"/></figure
      ></a>
      <!-- MO -->
      <div
        v-if="$mq === 'mo'"
        class="bg-center bg-cover w-full h-full px-15 items-center flex-grow flex flex-col"
        :style="`background-image: url(${backgroundImageMO});`"
      >
        <a href="#" class="pt-8 pb-24"
          ><figure>
            <img
              class="w-32"
              src="@assets/images/Logos/pink.svg"
              alt="Chain Logo"/></figure
        ></a>
        <img src="@assets/images/404/mo_000_notfound.svg" alt="Not found" />
        <h2
          v-if="$mq === 'mo'"
          class="gx-h4 pb-8 pt-4 pt-8 text-center font-bold"
          >¡Ups! Página no disponible</h2
        >
        <div class="px-12">
          <GxButton :to="{ name: 'dashboard' }">Regresar</GxButton>
        </div>
      </div>
      <!-- DE -->
      <div
        v-else
        class="flex bg-cover w-full h-full"
        :style="`background-image: url(${backgroundImageDE}); `"
      >
        <main
          class="flex flex-col items-start text-center justify-center w-full px-16"
        >
          <h2 class="gx-h2 font-bold mb-8"
            >¡Ups! Página <br />
            no disponible</h2
          >
          <div class="px-6">
            <GxButton :to="{ name: 'dashboard' }">Regresar</GxButton>
          </div>
        </main>
        <img
          class="items-end w-full pr-16"
          src="@assets/images/404/de_000_notfound.svg"
          alt="Not found"
        />
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" module>
.title {
  text-align: center;
}
</style>

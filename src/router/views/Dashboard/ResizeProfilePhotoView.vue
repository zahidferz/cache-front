<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'

import ResizeProfilePhoto from '@components/Dashboard/ResizeProfilePhoto'
export default {
  page: {
    title: 'Foto de perfil',
    meta: [{ name: 'description', content: 'Ajusta tu foto de perfil' }],
  },
  components: { LayoutWebMobile, ResizeProfilePhoto },
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    goBack() {
      this.$router.gxAnim = 'slide-right'
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    title="Ajusta tu foto"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <ResizeProfilePhoto :image-src="imageSrc" />
  </LayoutWebMobile>
</template>

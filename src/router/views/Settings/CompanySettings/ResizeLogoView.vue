<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import ResizeLogo from '@components/Settings/CompanySettings/ResizeLogo'
export default {
  page: {
    title: 'Ajustar logo',
    meta: [{ name: 'description', content: 'Ajustar logo' }],
  },
  components: { LayoutWebMobile, ResizeLogo },
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
    title="Ajusta tu logotipo"
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
  >
    <ResizeLogo :image-src="imageSrc" />
  </LayoutWebMobile>
</template>

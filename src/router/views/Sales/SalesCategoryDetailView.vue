<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import SalesCategoryDetail from '@components/Sales/SalesCategoryDetail'

export default {
  name: 'SalesCategoryDetailView',
  components: {
    SalesCategoryDetail,
    LayoutWebMobile,
  },
  data() {
    return {
      editingCategory: false,
      hasPaddingBottom: false,
    }
  },
  computed: {
    title() {
      if (this.editingCategory) {
        return `Editar categoría`
      } else return `Detalle de categoría`
    },
  },
  methods: {
    previous() {
      if (
        this.$route.query.list === 'true' ||
        this.$route.query.list === true
      ) {
        this.$router.push({ name: 'categories', query: { list: true } })
      } else {
        this.$router.replace({ name: 'categories' })
      }
    },
  },
}
</script>
<template>
  <LayoutWebMobile
    no-bottom-menu
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    icon="keyboard_backspace"
    :with-padding-bottom="hasPaddingBottom"
    :icon-click-handler="previous"
    :title="title"
  >
    <SalesCategoryDetail />
  </LayoutWebMobile>
</template>

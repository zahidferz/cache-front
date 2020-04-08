<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import AdditionalInfo from '@components/Sales/AdditionalInfo'
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'AdditionalInfoView',
  page: {
    title: 'Venta - Información Adicional',
    meta: [{ name: 'description', content: 'Venta - Información Adicional' }],
  },
  components: { LayoutWebMobile, AdditionalInfo, GxIcon },
  methods: {
    goToConcept() {
      this.$refs.additionalInfo.saveFormdata()
      this.$refs.additionalInfo.saveSaleItems()
      this.$router.back()
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    v-if="$mq === 'mo'"
    :has-drawer="$mq === 'de'"
    icon="keyboard_backspace"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    title="Información adicional"
    :icon-click-handler="goToConcept"
  >
    <AdditionalInfo ref="additionalInfo" />
  </LayoutWebMobile>
  <div v-else class="px-8">
    <header v-if="$mq === 'de'" class="items-center de:gx-h4 flex mb-4">
      <GxIcon
        icon="keyboard_backspace"
        class="mr-4 cursor-pointer"
        @click="goToConcept"
      />
      <p class="font-bold">Información adicional</p>
    </header>
    <AdditionalInfo ref="additionalInfo" />
  </div>
</template>

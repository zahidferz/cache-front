<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewFrequentConcept from '@components/Sales/NewFrequentConcept'
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  page: {
    title: 'Nuevo concepto Frecuente',
    meta: [{ name: 'Concepto Frecuente', content: 'Nuevo concepto Frecuente' }],
  },
  components: { LayoutWebMobile, NewFrequentConcept, GxIcon },
  methods: {
    toChooseFrequentConcept() {
      if (this.$route.query.from) {
        this.$router.replace({
          name: this.$route.query.from,
        })
      } else {
        this.$router.gxAnim = 'slide-right'
        this.$router.replace({
          name: 'choosefrequentconcept',
          query: { ...this.$route.query },
        })
      }
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    icon="keyboard_backspace"
    :icon-click-handler="toChooseFrequentConcept"
    icon-class-without-scroll="text-black"
    icon-class-with-scroll="text-black"
    title="Nuevo concepto frecuente"
    :with-padding-bottom="false"
  >
    <header v-if="$mq === 'de'" class="items-center de:gx-h4 flex mb-4">
      <GxIcon
        icon="keyboard_backspace"
        class="mr-4 cursor-pointer"
        @click="toChooseFrequentConcept"
      />
      <p class="font-bold">Nuevo concepto frecuente</p>
    </header>
    <NewFrequentConcept />
  </LayoutWebMobile>
</template>

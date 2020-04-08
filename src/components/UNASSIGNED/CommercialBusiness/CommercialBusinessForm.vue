<template>
  <div
    class="w-full flex flex-col flex-grow border-t border-gray-700 bg-primary"
  >
    <div
      class="h-48 py-4 flex items-center justify-center"
      @option-selected="getImage"
    >
      <img :src="activeImg" :alt="optionName" class="h-48 w-64" />
    </div>
    <div class="bg-white rounded-t-lg flex-grow">
      <GxTabs
        :tabs="tabs"
        @option-selected="getImage"
        @first-element="getImage"
      />
    </div>
  </div>
</template>
<script>
import GxTabs from '@components/_Core/Navigation/GxTabs'
export default {
  components: {
    GxTabs,
  },
  data() {
    return {
      imgSelection: null,
      optionName: '',
      tabs: [
        {
          label: 'PERSONAS MORALES',
          component: () =>
            import('@components/UNASSIGNED/CommercialBusiness/LegalEntities.vue'),
        },
        {
          label: 'PROFESIONISTAS & FREELANCE',
          component: () =>
            import('@components/UNASSIGNED/CommercialBusiness/FreelanceAndProfessions.vue'),
        },
        {
          label: 'TÉCNICOS Y RIF',
          component: () =>
            import('@components/UNASSIGNED/CommercialBusiness/TechnitiansAndRif.vue'),
        },
      ],
    }
  },
  computed: {
    activeImg() {
      return this.imgSelection
    },
  },
  methods: {
    getImage(selection) {
      this.imgSelection = selection.optionImg
      this.optionName = selection.optionName
    },
  },
}
</script>

<template>
  <div class="pt-4 h-full">
    <button
      v-for="member in memberOptions"
      :key="member.optionName"
      class="inline-block ml-8 mb-1 text-center "
      @click="
        $parent.$emit('option-selected', {
          optionImg: member.optionImg,
          optionName: member.optionName,
        })
      "
    >
      <div class="flex-grow flex items-center justify-center">
        <img
          :src="member.optionImg"
          :alt="member.optionName"
          class="w-24 h-24 rounded-full bg-white pb-4"
        />
      </div>

      <p class="gx-overline uppercase">{{ member.optionName }}</p>
    </button>
    <div class="right-corner">
      <GxFab dashed icon="add" class="mr-2" />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    memberOptions() {
      return [
        {
          optionName: 'Diseñador',
          optionImg: require('@src/assets/images/UNASSIGNED/commercialBusiness1.svg'),
        },
        {
          optionName: 'Doctor',
          optionImg: require('@src/assets/images/UNASSIGNED/8.svg'),
        },
        {
          optionName: 'Contador',
          optionImg: require('@src/assets/images/UNASSIGNED/commercialBusiness1.svg'),
        },
        {
          optionName: 'Abogado',
          optionImg: require('@src/assets/images/UNASSIGNED/commercialBusiness1.svg'),
        },
      ]
    },
  },
  mounted() {
    this.$parent.$emit('first-element', this.memberOptions[0])
  },
}
</script>
<style scoped>
.right-corner {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
}
</style>

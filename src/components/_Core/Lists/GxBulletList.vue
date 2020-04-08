<script>
export default {
  name: 'GxBulletList',
  props: {
    inputs: {
      type: Array,
      required: true,
    },
  },
}
</script>
<template>
  <div>
    <ol v-for="(bullet, index) in inputs" :key="index">
      <li
        class="bullet-list"
        :class="{ 'mb-4 de:mb-2': index !== inputs.length - 1 }"
        >{{ bullet.label }}</li
      >
    </ol>
  </div>
</template>
<style lang="scss" module>
.bullet-list {
  color: black;
  list-style-type: disc;
}
</style>

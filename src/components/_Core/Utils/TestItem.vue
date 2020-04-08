<script>
export default {
  name: 'TestItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
<template>
  <li class="py-4 h-12 bg-secondary-300">
    {{ item['d'] }}
  </li>
</template>

<script>
import Todos from '@components/Todos/Todos.vue'
export default {
  name: 'TodosView',
  components: {
    Todos,
  },
}
</script>
<template>
  <Todos v-if="true" class="w-full flex flex-col flex-grow" />
</template>

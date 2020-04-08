<script>
import GxShortcut from '@components/Mobile/GxShortcut'
export default {
  name: 'GxShortcuts',
  components: { GxShortcut },
  props: {
    shortcuts: {
      type: Array,
      required: true,
    },
  },
}
</script>
<template>
  <ul class="mb-2">
    <GxShortcut
      v-for="shortcut in shortcuts"
      :key="`shortcut-${shortcut.to.name}`"
      :right-icon="shortcut.rightIcon"
      :label="shortcut.label"
      style="margin-right:5px"
      :to="shortcut.to"
    />
  </ul>
</template>

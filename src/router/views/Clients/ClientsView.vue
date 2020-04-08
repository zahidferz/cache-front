<script>
export default {
  name: 'ClientsView',
  data() {
    return {
      cachedComponents: ['MyClientsView'],
    }
  },
  created() {
    this.$root.$on('addToKeepAlive', (payload) => {
      if (!this.cachedComponents.includes(payload)) {
        this.cachedComponents.push(payload)
      }
    })

    this.$root.$on('removeFromKeepAlive', (payload) => {
      const indexToRemove = this.cachedComponents.findIndex(
        (c) => c === payload
      )
      this.cachedComponents.splice(indexToRemove, 1)
    })
  },
}
</script>

<template>
  <keep-alive :include="cachedComponents">
    <RouterView></RouterView>
  </keep-alive>
</template>

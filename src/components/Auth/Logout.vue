<script>
import authService from '@src/auth/authService'
export default {
  name: 'Logout',
  render() {
    // Clear apollo cache
    Object.values(this.$apollo.provider.clients).forEach((client) =>
      client.clearStore()
    )
    // Remove any old redirects from the current user
    localStorage.removeItem('redirectTo')
    localStorage.removeItem('apollo-cache-persist')
    localStorage.removeItem('temp_subs_number')
    localStorage.clear()
    const redirect = this.$route.query.redirectFrom
    if (redirect) {
      localStorage.setItem('redirectTo', JSON.stringify({ path: redirect }))
    }
    authService.logOut()
    return this.$scopedSlots
  },
}
</script>

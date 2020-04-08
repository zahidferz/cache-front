<template>
  <GxTabs :tabs="tabs" />
</template>
<script>
import GxTabs from '@components/_Core/Navigation/GxTabs'
export default {
  components: {
    GxTabs,
  },
  data() {
    return {
      tabs: [
        {
          label: 'Acceso',
          component: () =>
            import('@components/UNASSIGNED/PrivacyPolicy/Access'),
        },
        {
          label: 'Seguridad',
          component: () =>
            import('@components/UNASSIGNED/PrivacyPolicy/Security'),
        },
        {
          label: 'MÁS INFO',
          component: () =>
            import('@components/UNASSIGNED/PrivacyPolicy/MoreInfo'),
        },
      ],
    }
  },
}
</script>

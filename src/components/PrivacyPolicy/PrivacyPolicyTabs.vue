<script>
import GxTabs from '@components/_Core/Navigation/GxTabs'

export default {
  name: 'PrivacypolicyTabs',
  components: {
    GxTabs,
  },
  props: {
    initialTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      privacyPolicyTabs: [
        {
          label: 'protección de datos',
          name: 'protección de datos',
          component: () => import('@components/PrivacyPolicy/DataProtection'),
        },
        {
          label: 'términos y condiciones',
          name: 'términos y condiciones',
          component: () =>
            import('@components/PrivacyPolicy/TermsAndConditions'),
        },
        {
          label: 'aviso de privacidad',
          name: 'aviso de privacidad',
          component: () => import('@components/PrivacyPolicy/PrivacyPolicy'),
        },
      ],
    }
  },
}
</script>
<template>
  <GxTabs :tabs="privacyPolicyTabs" :initial-tab="initialTab" fixed />
</template>

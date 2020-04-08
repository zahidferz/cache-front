<script>
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import NewSaleChooseClient from '@components/Sales/NewSaleChooseClient'
import GxDesktopHeader from '@components/_Core/Layout/GxDesktopHeader'
import GxDesktopSearchInput from '@components/_Core/Forms/GxDesktopSearchInput'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
export default {
  name: 'NewSaleChooseClientView',
  page: {
    title: 'Nueva venta',
    meta: [{ name: 'description', content: 'Venta - Elige un cliente' }],
  },
  components: {
    LayoutWebMobile,
    NewSaleChooseClient,
    GxDesktopHeader,
    GxDesktopSearchInput,
  },
  apollo: {
    company: LOCAL_COMPANY,
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
    },
  },
  data() {
    return {
      company: null,
      myAccount: null,
      textInput: '',
      shortcutsDesk: [
        {
          label: 'cliente',
          to: { name: 'createnewclient' },
          isDefault: true,
        },
      ],
    }
  },
  methods: {
    goBack() {
      if (this.$route.query.backTo) {
        this.$router.push({ name: this.$route.query.backTo })
      } else {
        this.$router.back()
      }
    },
  },
}
</script>

<template>
  <div v-if="$mq === 'de'" class="px-8 flex flex-col flex-grow">
    <GxDesktopHeader
      header="Selecciona un cliente"
      icon="keyboard_backspace"
      :icon-click-handler="goBack"
    />
    <div class="flex justify-end mb-4">
      <GxDesktopSearchInput v-model="textInput" label="Buscar cliente" />
    </div>
    <NewSaleChooseClient :search="textInput" />
  </div>
  <LayoutWebMobile
    v-else
    has-search
    icon="keyboard_backspace"
    icon-class-without-scroll="text-black"
    placeholder="Buscar cliente"
    :icon-click-handler="goBack"
    icon-class-with-scroll="text-black"
    :with-padding-bottom="false"
    title="Selecciona un cliente"
    @search="textInput = $event"
  >
    <NewSaleChooseClient :search="textInput" />
  </LayoutWebMobile>
</template>

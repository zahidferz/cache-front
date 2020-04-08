<script>
import GxCardModal from '@components/_Core/Cards/GxCardModal'
import { REQUEST_SALES_BY_TIME_PERIOD } from '@src/apollo//mutations'
import { LOCAL_COMPANY, COMPANY_INFO } from '@src/apollo/queries'
import LayoutWebMobile from '@layouts/LayoutWebMobile'
import GxDisabledInput from '@components/_Core/Forms/GxDisabledInput'
import GxDateTimeFilter from '@components/_Core/Filters/GxDateTimeFilter'
export default {
  name: 'MySalesDownloadMobile',
  components: {
    GxCardModal,
    LayoutWebMobile,
    GxDisabledInput,
    GxDateTimeFilter,
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
    },
  },
  data() {
    return {
      email: '',
      company: null,
      range: null,
      downloadSalesLoading: null,
      downloadSalesSuccess: null,
      downloadSalesError: null,
    }
  },
  computed: {
    parsedPeriod() {
      if (!this.$route.query.startDate || !this.$route.query.endDate)
        return null
      const startDate = this.$utils.dates.formatDateLong(
        this.$route.query.startDate
      )
      const endDate = this.$utils.dates.formatDateLong(
        this.$route.query.endDate
      )

      return `${startDate} al ${endDate}`
    },
    downloadSalesOptions() {
      const options = ['Hoy', 'Semana', 'Mes']

      if (this.parsedPeriod) {
        options.push(this.parsedPeriod)
      }

      return options
    },
  },
  watch: {
    myAccount: {
      handler: function(newVal) {
        if (newVal) {
          this.email = newVal.email
        }
      },
      immediate: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'mySales' })
    },
    async downloadSales() {
      if (!this.range) {
        this.downloadSalesError = 'Debes ingresar un periodo válido'
        return
      }

      this.downloadSalesError = ''

      try {
        this.downloadSalesLoading = true

        let { startDate, endDate } = this.range
        await this.$apollo.mutate({
          mutation: REQUEST_SALES_BY_TIME_PERIOD,
          variables: {
            data: {
              companyNumber: this.company.number,
              startDate,
              endDate,
            },
          },
        })
        this.downloadSalesLoading = false
        this.downloadSalesSuccess = true
      } catch (e) {
        this.downloadSalesLoading = false
        this.downloadSalesError = e
        /* eslint-disable */
        console.log(e)
        /* eslint-enable */
      }
    },
  },
}
</script>

<template>
  <LayoutWebMobile
    icon="keyboard_backspace"
    :icon-click-handler="goBack"
    title="Descargar Excel de ventas"
  >
    <div class="flex-grow flex flex-col w-screen de:w-full de:mb-4 ">
      <div class=" de:shadow-3 de:rounded-lg flex flex-col px-2">
        <form
          action=""
          class="w-full de:pt-0 de:pb-6 flex flex-col mt-4"
          @submit.prevent="downloadSales"
        >
          <GxDateTimeFilter v-model="range" />
          <GxDisabledInput
            v-if="email"
            icon="email"
            :value="email"
            label="Correo Electrónico"
            name="Correo Electrónico"
          />
          <!-- <GxInput
            v-model="email"
            placeholder="Correo Electrónico"
            label="Correo Electrónico"
            icon="email"
            pattern="email"
            disabled
          /> -->
          <p class="mx-auto pb-8 de:gx-caption gx-caption"
            >Tu información está protegida.
            <GxTextLink
              target-blank
              :to="{ name: 'privacypolicy' }"
              class="font-bold"
              >Conoce cómo.</GxTextLink
            ></p
          >
          <p v-if="downloadSalesError" class="text-alert text-center pb-2">{{
            downloadSalesError
          }}</p>
          <GxButton
            :loading="downloadSalesLoading"
            type="submit"
            class="mx-auto"
            @click.stop
            >enviar</GxButton
          >
        </form>
      </div>
      <GxCardModal
        v-if="downloadSalesSuccess"
        headline="Revisa tu correo"
        text-body="Te hemos enviado el archivo Excel con tus ventas"
        :card-img="$utils.alertImages.CheckEmail"
        @click="goBack"
        @close="goBack"
      />
    </div>
  </LayoutWebMobile>
</template>

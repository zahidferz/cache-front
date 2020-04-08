<script>
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxInitials from '@components/_Core/Avatars/GxInitials'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxMovementsCard from '@components/_Core/Cards/GxMovementsCard'
import SalesSummaryChart from '@components/Sales/SalesSummaryChart'
export default {
  name: 'ClientDetail',
  components: {
    GxAvatar,
    GxInitials,
    GxLoader,
    GxIcon,
    GxMovementsCard,
    SalesSummaryChart,
  },
  filters: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
  props: {
    clientInfo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      maxNumberOfStarts: 3,
      searchedYear: String(new Date().getFullYear()),
      selectedMonth: new Date().getMonth(),
      selectedValue: null,
      // Pendiente query que te regresa los años que tienen ventas
    }
  },
  computed: {
    clientInitials() {
      if (!this.clientInfo || this.clientInfo.avatarURL) {
        return
      }
      const array = this.clientInfo.commercialName.split(' ')
      if (array.length > 1) {
        return array[0][0] + array[1][0]
      }
      return (
        this.clientInfo.commercialName[0] + this.clientInfo.commercialName[1]
      )
    },
    formattedReceivable() {
      if (!this.clientInfo) return '0.00'
      if (this.clientInfo.totalAccountsReceivableAmount) {
        return this.clientInfo.totalAccountsReceivableAmount.total.toLocaleString(
          'en',
          {
            minimumFractionDigits: 2,
          }
        )
      }
      return '0.00'
    },
    formattedTotalSalesAmount() {
      if (!this.selectedValue) return '0.00'
      return this.selectedValue.amount.toLocaleString('en', {
        minimumFractionDigits: 2,
      })
    },
    currencyReceivable() {
      if (!this.clientInfo) return 'MXN'
      if (this.clientInfo.totalAccountsReceivableAmount) {
        return this.clientInfo.totalAccountsReceivableAmount.currencyCode
      }
      return 'MXN'
    },
    currencyTotalSalesAmount() {
      if (this.selectedValue) {
        return this.selectedValue.currency
      }
      return null
    },
  },
  methods: {
    goToClientDetail() {
      if (this.clientInfo.commercialName.toLowerCase() === 'publico general') {
        return
      }
      localStorage.removeItem('newSale--saleInfo')
      localStorage.removeItem('newSale--saleInfoObject')
      localStorage.removeItem('newSale--addtionalDataInfo')
      localStorage.removeItem('newSale--concepts')
      localStorage.removeItem('newSale--saleDataInput')
      localStorage.removeItem('newSale--pdf')
      localStorage.removeItem('newSale--saleId')

      this.$router.push({
        name: 'clientgeneralinfo',
        params: this.$route.params.clientId,
      })
    },
    parseStatus(text) {
      const empty = ['sin información']
      const good = [
        'promover crédito',
        'sano',
        'puntual',
        'oportunidad de desarrollo',
        'adecuado',
      ]
      const bad = [
        'impuntual',
        'deudor',
        'riesgoso',
        'controlar',
        'revisar crédito',
        'suspender crédito',
        'decreciente',
      ]
      const lowerCase = text.toLowerCase()
      if (empty.includes(lowerCase)) {
        return 'border-gray-400'
      }
      if (good.includes(lowerCase)) {
        return 'border-success'
      }
      if (bad.includes(lowerCase)) {
        return 'border-alert'
      }
      return 'border-gray-400'
    },
  },
}
</script>
<template>
  <section
    v-if="!clientInfo"
    class="flex flex-grow flex-col w-full items-center justify-center"
  >
    <GxLoader />
  </section>
  <section v-else class="flex flex-col w-full flex-grow p-4 de:p-0 de:my-8 ">
    <div class="w-full flex">
      <GxAvatar
        v-if="clientInfo.avatarURL"
        class="rounded-full flex-shrink-0 relative mr-4 cursor-pointer"
        style="width: 4.5rem; height: 4.5rem;"
        :avatar-img="image"
        @click="goToClientDetail"
      >
        <div
          class="absolute w-3 h-3 border border-white rounded-full gxStatusPosition"
          :class="{
            'bg-success': clientInfo.lastActivityStatus === 1,
            'bg-pending': clientInfo.recientActivityStatus === 2,
            'bg-alert': clientInfo.recientActivityStatus === 3,
          }"
        ></div>
      </GxAvatar>
      <GxInitials
        v-else
        class="flex-shrink-0 cursor-pointer"
        :color="clientInfo.color"
        :status-batch="clientInfo.lastActivityStatus"
        :avatar-text="clientInitials"
        @click="goToClientDetail"
      />
      <div class=" flex flex-col flex-shrink overflow-x-hidden">
        <p>Cuentas por cobrar</p>
        <!--waiting for  totalAccountsReceivableAmount  implementation-->
        <p class="font-bold gx-h4 flex">
          <span class="truncate font-bold gx-h4"
            >${{ formattedReceivable }}</span
          >{{ currencyReceivable }}</p
        >
        <p class="flex">
          <GxIcon
            v-for="number in maxNumberOfStarts"
            :key="number"
            :class="{
              'text-pending': clientInfo.starring >= number,
              'text-gray-500': clientInfo.starring < number,
            }"
            icon="grade"
          />
        </p>
      </div>
    </div>
    <div class="mt-8">
      <p class="text-gray-500 font-bold gxSubtitle">RESUMEN DE VENTAS</p>
      <SalesSummaryChart
        v-model="selectedMonth"
        level="client"
        class="mt-4"
        @refetch="$emit('refetch')"
        @selectedValue="selectedValue = $event"
      />
    </div>
    <div class="mt-8 gxMaxWidth">
      <p class="text-gray-500  font-bold gxSubtitle">MOVIMIENTOS</p>
      <GxMovementsCard class="mt-4">
        <div class="h-full w-full flex flex-col">
          <p class="gx-h6 flex w-full"
            >$<span class="gx-h6 truncate">{{ formattedTotalSalesAmount }}</span
            >&nbsp; {{ currencyTotalSalesAmount }}</p
          >
          <p class="gx-h6 mt-2"> Ventas </p>
        </div>
      </GxMovementsCard>
    </div>
    <div class="mt-8 gxMaxWidth">
      <p class="text-gray-500  font-bold gxSubtitle">RESUMEN</p>
      <GxMovementsCard class="mt-4" container-classes="py-4 pr-4">
        <div class="h-full w-full flex flex-col">
          <!-- <p
            :class="[parseStatus(clientInfo.tagActivityBehavior)]"
            class="border-l-8  flex text-base items-center capitalize"
            ><span class="pl-2 text-gray-500 font-bold tracking-normal truncate"
              >ACTIVIDAD:</span
            ><span class="truncate"
              >&nbsp;{{ clientInfo.tagActivityBehavior | capitalize}}</span
            ></p
          > -->
          <p
            :class="[parseStatus(clientInfo.tagCreditBehavior)]"
            class="border-l-8  text-base flex items-center"
            ><span class="pl-2 text-gray-500 font-bold tracking-normal truncate"
              >CRÉDITO:</span
            ><span class="truncate"
              >&nbsp;{{ clientInfo.tagCreditBehavior | capitalize }}</span
            ></p
          >
          <p
            :class="[parseStatus(clientInfo.tagDebLevel)]"
            class="border-l-8  text-base flex items-center mt-4"
            ><span class="pl-2 text-gray-500 font-bold tracking-normal truncate"
              >NIVEL DE DEUDA:</span
            ><span class="truncate"
              >&nbsp;{{ clientInfo.tagDebLevel | capitalize }}</span
            ></p
          >
          <p
            :class="[parseStatus(clientInfo.tagPaymentBehavior)]"
            class="border-l-8 text-base flex items-center mt-4"
            ><span class="pl-2 text-gray-500 font-bold tracking-normal truncate"
              >COMPORTAMIENTO DE PAGO:</span
            ><span class="truncate"
              >&nbsp;{{ clientInfo.tagPaymentBehavior | capitalize }}</span
            ></p
          >
        </div>
      </GxMovementsCard>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.gxMaxWidth {
  max-width: 396px;
}
.gxSubtitle {
  font-size: 0.875rem;
}
</style>

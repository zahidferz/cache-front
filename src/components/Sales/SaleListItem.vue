<script>
import SaleCardMobile from '@components/Sales/SaleCardMobile'
import SaleRowDesktop from '@components/Sales/SaleRowDesktop'
// import GxSwipe from '@components/_Core/Utils/GxSwipe'
import { format, differenceInDays } from 'date-fns'
const es = require('date-fns/locale/es')

export default {
  name: 'SaleListItem',
  // components: { SaleCardMobile, GxSwipe, SaleRowDesktop },
  components: { SaleCardMobile, SaleRowDesktop },
  props: {
    sale: {
      type: Object,
      required: true,
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      date: null,
    }
  },
  computed: {
    weekday() {
      if (this.date) {
        return format(this.date, 'ddd', { locale: es }).replace('é', 'e')
      }
      return null
    },
    day() {
      if (this.date) {
        return format(this.date, 'D', { locale: es })
      }
      return null
    },
    month() {
      if (this.date) {
        return format(this.date, 'MMM', { locale: es })
      }
      return null
    },
    amount() {
      if (this.sale) {
        const money = this.sale.total.toLocaleString('en', {
          minimumFractionDigits: 2,
        })
        return `$${money} ${this.sale.currency}`
      }
      return null
    },
    status() {
      if (this.sale) {
        switch (this.sale.status) {
          case 'cancelled':
            return 'Cancelada'
          case 'draft':
            return 'Borrador'
          case 'pendingValidation':
            return 'Por validar'
          case 'deleted':
            return 'Eliminada'
          case 'valid':
            return this.validSaleStatus(this.sale)
          default:
            return this.sale.status
        }
      }
      return null
    },
    formattedSaleNumber() {
      if (this.sale) {
        return `VE-${this.sale.saleNumber}`
      }
      return null
    },
    lastMovementDate() {
      return this.parseLastMovementDate(this.sale)
    },
  },
  watch: {
    sale: {
      handler(newVal) {
        this.date = new Date(newVal.date)
      },
      immediate: true,
    },
  },
  methods: {
    validSaleStatus(sale) {
      const { paymentStatus } = sale
      let expectedDate = this.sale.expectedPaymentSchedule.length
        ? this.sale.expectedPaymentSchedule[0].expectedDate
        : null

      switch (paymentStatus) {
        case 'notPaid':
          if (expectedDate && differenceInDays(expectedDate, new Date()) < 0) {
            return this.$mq === 'mo'
              ? this.parseLastMovementDate(sale)
              : 'Vencida'
          } else {
            return this.$mq === 'mo'
              ? this.parseLastMovementDate(sale)
              : 'Pendiente'
          }
        case 'partiallyPaid':
          if (expectedDate && differenceInDays(expectedDate, new Date()) < 0) {
            return this.$mq === 'mo'
              ? this.parseLastMovementDate(sale)
              : 'Vencida'
          } else {
            return this.$mq === 'mo'
              ? this.parseLastMovementDate(sale)
              : 'Parcial'
          }
        case 'fullyPaid':
          return 'Cobrada'
        default:
          return paymentStatus
      }
    },
    parseLastMovementDate(sale) {
      const sortDate = (a, b) => {
        // [oldest,...latest]
        if (new Date(a) < new Date(b)) {
          return -1
        }
        return 1
      }
      const parsePartiallyPaid = (sale) => {
        const [oldest] = sale.expectedPaymentSchedule
          .map((payment) => payment.expectedDate)
          .sort(sortDate)
        const date = new Date(oldest)

        let result
        if (date && differenceInDays(date, new Date()) < 0) {
          if (new Date(sale.date).getFullYear() === date.getFullYear()) {
            result = format(date, 'D[ de ]MMMM', {
              locale: es,
            })
          } else {
            result = format(date, 'D[ de ]MMMM [del] YYYY', {
              locale: es,
            })
          }
        } else {
          if (new Date(sale.date).getFullYear() === date.getFullYear()) {
            result = `Estimado ${format(date, 'D[ de ]MMMM', {
              locale: es,
            })}`
          } else {
            result = `Estimado ${format(date, 'D[ de ]MMMM [del] YYYY', {
              locale: es,
            })}`
          }
        }
        return result
      }
      const parseFullyPaid = (sale) => {
        const [latest] = sale.receivedPayments
          .map((payment) => payment.date)
          .sort(sortDate)
        if (!latest) {
          return ''
        }
        return format(latest, 'D [de] MMMM', {
          locale: es,
        })
      }

      const { paymentStatus } = sale

      switch (paymentStatus) {
        case 'notPaid':
          return parsePartiallyPaid(sale)
        case 'partiallyPaid':
          return parsePartiallyPaid(sale)
        case 'fullyPaid':
          return parseFullyPaid(sale)
        default:
          return paymentStatus
      }
    },
  },
}
</script>
<template>
  <!-- <GxSwipe v-if="$mq === 'mo'">
    <SaleCardMobile
      :weekday="weekday"
      :day="day"
      :month="month"
      :amount="amount"
      :status="status"
      :invoices="sale.invoices"
      :sale-number="formattedSaleNumber"
      :sale-id="sale.saleId"
      :income-category="sale.incomeCategory"
    />
  </GxSwipe> -->
  <SaleCardMobile
    v-if="$mq === 'mo'"
    :weekday="weekday"
    :day="day"
    :month="month"
    :amount="amount"
    :status="status"
    :invoices="sale.invoices"
    :sale-number="formattedSaleNumber"
    :sale-id="sale.saleId"
    :search-term="searchTerm"
    :income-category="sale.incomeCategory"
  />
  <SaleRowDesktop
    v-else
    :weekday="weekday"
    :day="day"
    :month="month"
    :amount="amount"
    :status="status"
    :invoices="sale.invoices"
    :sale-number="formattedSaleNumber"
    :last-movement-date="lastMovementDate"
    :income-category="sale.incomeCategory"
    :search-term="searchTerm"
    :sale-id="sale.saleId"
  />
</template>

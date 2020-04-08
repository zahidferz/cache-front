<script>
export default {
  name: 'GxCardAccountsPayableReceivable',

  props: {
    payable: {
      type: Boolean,
      default: false,
    },
    accounts: {
      type: Object,
      default: null,
    },
  },
  computed: {
    header() {
      if (this.payable) {
        return `Total por pagar`
      } else return `Total por cobrar`
    },
    total() {
      const totalAmount =
        this.accounts.totalDue +
        this.accounts.totalDueOnReferenceDate +
        this.accounts.totalUndue
      return totalAmount
    },
    totalDuePercentage() {
      return (this.accounts.totalDue * 100) / this.total
    },
    totalDueOnReferenceDatePercentage() {
      return (this.accounts.totalDueOnReferenceDate * 100) / this.total
    },
    totalUnduePercentage() {
      return (this.accounts.totalUndue * 100) / this.total
    },
    formatedTotalDue() {
      return this.accounts.totalDue
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    formatedTotalDueOnDate() {
      return this.accounts.totalDueOnReferenceDate
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    formatedUndue() {
      return this.accounts.totalUndue
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    formatedTotal() {
      return this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
  },
}
</script>
<template>
  <div
    clickable
    class="gxOutter flex-grow shadow-2 de:p-4 p-4 rounded-lg leading-none"
    v-on="$listeners"
  >
    <div class="mb-4">
      <p class="uppercase gx-h6 mb-1"
        >${{ formatedTotal }} {{ accounts.currency }}</p
      >
      <p class="uppercase gx-caption font-bold text-gray-700">{{ header }}</p>
    </div>
    <div
      class="h-10 rounded-lg flex mb-4 bg-gray-200"
      :class="{
        border: !payable && total === 0,
        border: payable && total === 0,
      }"
    >
      <div
        v-if="totalDuePercentage"
        :style="`width:${totalDuePercentage}%; min-width:16px`"
        class="h-10 rounded-l-lg"
        :class="{
          'bg-sales-1': !payable,
          'bg-expenses-1': payable,
          'rounded-lg':
            !totalDueOnReferenceDatePercentage && !totalUnduePercentage,
        }"
      ></div>
      <div
        v-if="totalDueOnReferenceDatePercentage"
        :style="`width:${totalDueOnReferenceDatePercentage}%; min-width:16px`"
        class="h-10"
        :class="{
          'bg-sales-2': !payable,
          'bg-expenses-2': payable,
          'rounded-l-lg': !totalDuePercentage,
          'rounded-r-lg': !totalUnduePercentage,
        }"
      ></div>
      <div
        v-if="totalUnduePercentage"
        :style="`width:${totalUnduePercentage}%; min-width:16px`"
        class="h-10 rounded-r-lg"
        :class="{
          'bg-sales-3': !payable,
          'bg-expenses-3': payable,
          'rounded-lg':
            !totalDueOnReferenceDatePercentage && !totalDuePercentage,
        }"
      ></div>
    </div>
    <div
      :class="{
        'flex justify-between': totalDueOnReferenceDatePercentage,
        gxGridContainer: !totalDueOnReferenceDatePercentage,
      }"
    >
      <div
        v-if="totalDuePercentage || total === 0"
        class="uppercase  gx-overline"
        style="letter-spacing:0"
      >
        <p class="mb-1">${{ formatedTotalDue }} {{ accounts.currency }}</p>
        <p class="font-bold text-gray-700">Vencido</p>
      </div>
      <div
        v-if="totalDueOnReferenceDatePercentage"
        class="uppercase  gx-overline"
        style="letter-spacing:0"
      >
        <p class="mb-1"
          >${{ formatedTotalDueOnDate }} {{ accounts.currency }}</p
        >
        <p class="font-bold text-gray-700">Hoy</p>
      </div>
      <div
        v-if="totalUnduePercentage || total === 0"
        class="uppercase  gx-overline"
        style="letter-spacing:0"
      >
        <p class="mb-1">${{ formatedUndue }} {{ accounts.currency }}</p>
        <p class="font-bold text-gray-700">Sin vencer</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gxGridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>

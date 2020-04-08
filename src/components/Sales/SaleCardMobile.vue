<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxTag from '@components/_Core/Tags/GxTag'

export default {
  name: 'SaleCardMobile',
  components: { GxIcon, GxTag },
  props: {
    weekday: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    invoices: {
      type: Array,
      required: true,
    },
    saleNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    incomeCategory: {
      type: Object,
      required: true,
    },
    saleId: {
      type: String,
      required: true,
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
}
</script>
<template>
  <div
    class="flex px-4 relative"
    @click.stop="
      $router.push({
        name: 'saleDetail',
        params: { saleId: saleId },
        query: { searchTerm, from: $route.name },
      })
    "
  >
    <div
      class="flex flex-col leading-none justify-center items-center w-11 pr-4 border-r border-gray-200 text-gray-700 gx-caption flex-shrink-0 overflow-hidden"
    >
      <span class="capitalize">{{ weekday }}</span>
      <span class="capitalize">{{ day }}</span>
      <span class="capitalize">{{ month }}</span>
    </div>
    <div
      :class="`bg-avatar-${incomeCategory.color || 0}`"
      class="w-12 h-12 rounded-lg my-auto flex-grow-0 flex-shrink-0  flex justify-center items-center  ml-4"
    >
      <GxIcon class="text-white" icon="local_offer" />
    </div>
    <div
      class="flex-grow flex flex-col mt-4 mb-2 justify-center  justify-between overflow-hidden"
    >
      <div
        :class="{ 'mb-4': !invoices || !invoices.length }"
        class="flex items-center overflow-hidden flex-grow-0 flex-shrink-0"
      >
        <div class="flex flex-col ml-4  flex-grow overflow-hidden">
          <p class="leading-none flex items-center white overflow-hidden">
            <span class="truncate">{{ amount }} </span>
          </p>
          <p
            class="mt-2 gx-caption leading-none flex items-center white overflow-hidden"
          >
            <span class="truncate">{{ status }}</span>
          </p>
          <p
            class="mt-2 gx-caption  text-gray-500 flex items-center white overflow-hidden "
          >
            <span style="width: calc(100% - 96px)" class="truncate"
              >{{ saleNumber }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="invoices && invoices.length"
      class="bottom-0 right-0 pb-2 pr-4 absolute"
    >
      <GxTag
        v-for="invoice in invoices"
        :key="invoice.invoiceId"
        class="ml-auto truncate py-1"
      >
        <p class="w-20 text-center truncate  font-bold py-1">{{
          invoices[0].folio
        }}</p>
      </GxTag>
    </div>
  </div>
</template>

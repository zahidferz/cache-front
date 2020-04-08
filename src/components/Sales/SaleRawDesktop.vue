<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
// import GxTag from '@components/_Core/Tags/GxTag'
export default {
  name: 'SaleRawDesktop',
  components: {
    GxIcon,
    // GxTag
  },
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
  },
}
</script>
<template>
  <tr>
    <td>
      <p class="flex flex-col items-center justify-center capitalize">
        <span>{{ weekday }}</span>
        <span>{{ day }} {{ month }}</span>
      </p>
    </td>
    <td>
      <div
        :class="{ 'mb-4': !invoices || !invoices.length }"
        class="flex items-center overflow-hidden flex-grow-0 flex-shrink-0"
      >
        <div
          :class="`bg-avatar-${incomeCategory.color || 0}`"
          class="w-12 h-12 rounded-lg flex-grow-0 flex-shrink-0  flex justify-center items-center mb-auto ml-4"
        >
          <GxIcon class="text-white" icon="local_offer" />
        </div>
        <div class="flex flex-col ml-4 overflow-hidden">
          <p class="leading-none flex items-center white overflow-hidden">
            <span class="truncate">{{ amount }} </span>
          </p>
        </div>
      </div>
    </td>
  </tr>
</template>

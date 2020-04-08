<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import SaleInternalNote from '@components/Sales/SaleInternalNote'
export default {
  name: 'SaleDetailHistoryCard',
  components: {
    GxIcon,
    GxAvatar,
    GxDivider,
    SaleInternalNote,
  },
  props: {
    history: {
      type: Object,
      required: true,
    },
    saleNumber: {
      type: Number,
      required: true,
    },
  },
  computed: {
    parsedHistory() {
      return {
        movement: this.parseHistoryMovement(this.history.movement),
        date: this.parseHistoryMovementDate(this.history.creationDate),
        color: this.history.color,
        movementIcon: this.parseMovementIcon(this.history.movementType),
        initials: this.parseUserInitials(this.history.fullName),
        image: this.history.image,
      }
    },
  },
  methods: {
    parseUserInitials(fullName) {
      if (!fullName) return null
      const nameParts = fullName.split(' ')
      return nameParts[0][0] + nameParts[1][0]
    },
    parseMovementIcon(movementType) {
      switch (movementType) {
        case 'saleCreate':
        case 'invoiceCreate':
        case 'receivedPaymentCreate':
          return 'attach_money'
        case 'incomeDocumentSend':
          return 'email'
        default:
          return 'face'
      }
    },
    parseHistoryMovement(text) {
      return text.replace(new RegExp('[{}]', 'g'), '**')
    },
    parseHistoryMovementDate(date) {
      return this.$utils.dates.getRelativeDateShort(date)
    },
  },
}
</script>
<template>
  <li>
    <SaleInternalNote
      v-if="history.movementType === 'saleInternalNoteCreate'"
      :initals="parsedHistory.initials"
      :sale-number="saleNumber"
      :history="history"
      :parsed-date="parsedHistory.date"
    />
    <div v-else class="flex py-4 pl-4">
      <div class="shrink-0">
        <GxAvatar
          v-if="parsedHistory.image"
          class="text-white"
          :class="`bg-avatar-${parsedHistory.color}`"
          :avatar-img="parsedHistory.image"
        />
        <GxAvatar
          v-else
          class="text-white"
          :class="`bg-avatar-${parsedHistory.color}`"
          >{{ parsedHistory.initials.toUpperCase() }}</GxAvatar
        >
      </div>
      <div class="w-full ml-2">
        <div v-markdown="parsedHistory.movement" class="w-full" />
        <p
          class="flex items-center text-gray-500 mt-2 leading-none gx-caption de:gx-caption"
        >
          <GxIcon class="mr-1 " :icon="parsedHistory.movementIcon" />
          <span class="leading-none">{{ parsedHistory.date }}</span>
        </p>
      </div>
    </div>
    <GxDivider />
  </li>
</template>

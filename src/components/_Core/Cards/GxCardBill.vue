<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'GxCardBill',
  components: {
    GxIcon,
  },
  props: {
    cardImg: {
      type: String,
      default: null,
    },
    accountNumber: {
      type: String,
      default: '',
    },
    accountName: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'MXN',
    },
    currentStatus: {
      type: String,
      default: null,
    },
    accountType: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    lastSync: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      warning: false,
      moneyAccounts: null,
      date: null,
      currentStatusInner: this.currentStatus,
    }
  },
  computed: {
    bank() {
      return this.accountType === 'bank'
    },
    credit() {
      return this.accountType === 'credit'
    },
    accountTypeDisplayName() {
      switch (this.accountType) {
        case 'credit':
          return 'Crédito'
        case 'other':
          return 'Otras'
        default:
          return ''
      }
    },
    // Start 6 possible status
    connected() {
      return this.currentStatusInner === 'connected'
    },
    updating() {
      return this.currentStatusInner === 'updating'
    },
    noBankConnectionPossible() {
      return !this.currentStatusInner || this.currentStatusInner === 'null'
    },
    requiresTWOFA() {
      return this.currentStatusInner === 'requiresTWOFA'
    },
    neverConnected() {
      return (
        this.currentStatusInner === 'neverConnected' ||
        this.currentStatusInner === 'disconnectedPermanently'
      )
    },
    disconnectedTemporarily() {
      return this.currentStatusInner === 'disconnectedTemporarily'
    },
    // End 6 possibles status
    hiddenAccountNumber: function() {
      return '**' + this.accountNumber.substr(-4)
    },
    silcedAccountName: function() {
      return this.accountName.length > 24
        ? this.accountName.slice(0, 24) + '...'
        : this.accountName
    },
    slicedAmount: function() {
      return this.amount
        .toFixed(2)
        .toString()
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
    numberOrNameAccount: function() {
      if (!this.bank && !this.credit) {
        return this.silcedAccountName
      } else {
        return this.hiddenAccountNumber
      }
    },
    status: function() {
      switch (this.currentStatusInner) {
        case 'connected':
          return this.$utils.dates.getRelativeDateShort(this.lastSync)
        // Cuando se están descargando movimientos (se está actualizando la cuenta)
        case 'updating':
          return 'Actualizando...'
        // Sin conexión a banco, cuando no tenemos la posibilidad de conectarnos con ese banco
        case 'null':
          return ''
        // Sin conexión al banco, cuando tenemos la posibilidad de conectarnos con ese banco
        case 'neverConnected':
        case 'disconnectedPermanently':
          return ''
        case 'requiresTWOFA':
          return this.$utils.dates.getRelativeDateShort(this.lastSync)
        case 'disconnectedTemporarily':
          return 'Cuenta desconectada'
        default:
          return ''
      }
    },
  },
  methods: {
    goToAccountDetails() {
      alert('Aquí vamos al detalle de la cuenta')
    },
    onStatusIconClick() {
      // Currently simulating updating status
      if (this.connected) {
        this.currentStatusInner = 'updating'
        setTimeout(() => {
          this.currentStatusInner = 'connected'
        }, 3000)
      } else if (this.requiresTWOFA) {
        alert('Aquí empieza el flujo de Two Factor Auth')
      } else if (this.neverConnected) {
        alert('Aquí empieza el flujo de conexión al banco por primera vez')
      } else if (this.disconnectedTemporarily) {
        alert('Aquí sale el modal para reconexión al banco')
      }
    },
  },
}
</script>

<template>
  <div
    class="overflow-x-hidden flex-grow mb-4 de:mb-0 gx-subtitle shadow-2 flex active:shadow-4 de:hover:bg-gray-200 cursor-pointer gxOutter gxCardContainer rounded"
    :class="{
      'border-l-8 border-white de:hover:border-gray-200':
        requiresTWOFA || updating || connected || noBankConnectionPossible,
      'border-l-8 border-alert':
        warning || (!bank && !connected) || (bank && !connected),
    }"
    v-on="$listeners"
    @click="goToAccountDetails"
  >
    <div class="p-4 pl-2 flex flex-grow overflow-x-hidden">
      <figure
        class="gxBankLogo w-12 h-12 mr-4 rounded-lg relative flex-shrink-0"
      >
        <img
          v-if="bank || credit || !cardImg"
          class="rounded-lg"
          :src="cardImg"
          alt="Banco"
        />
        <div
          v-else
          :class="
            `w-12 h-12 rounded-lg flex items-center justify-center text-white gx-h4 font-bold bg-avatar-${Math.floor(
              Math.random() * 19
            )}`
          "
        >
          {{ accountTypeDisplayName[0] }}
        </div>
        <div
          v-if="!noBankConnectionPossible"
          class="circleStatus bg-alert border-2 border-white de:hover:border-gray-200"
          :class="{
            'bg-success': connected,
            'bg-alert':
              warning ||
              (!connected && !bank && !updating) ||
              (!connected && bank),
            'bg-gray-500': updating,
            'bg-pending': requiresTWOFA,
          }"
        ></div>
      </figure>
      <div class="flex-col flex-grow flex overflow-hidden overflow-x-hidden">
        <div class="flex justify-between mb-3">
          <div class="flex gxQuantityContainer">
            <p class="gx-h6 mr-1 truncate">${{ slicedAmount }}</p>
            <p class="gx-h6 mr-1">{{ currency }}</p>
          </div>
          <div class=" mr-auto">
            <GxIcon
              v-if="!noBankConnectionPossible"
              class="mr-4"
              :class="{
                'text-black': connected && !disconnectedTemporarily,
                'bg-pending text-white rounded-lg': requiresTWOFA,
                'bg-alert rounded-lg text-white': neverConnected,
                'text-alert': disconnectedTemporarily,
                'gx-spin': updating,
              }"
              :icon="disconnectedTemporarily ? 'warning' : 'autorenew'"
              :style="updating ? 'display: inline-block;' : ''"
              @click.stop="onStatusIconClick"
            />
          </div>
          <p class="text-gray-500 capitalize">{{ accountTypeDisplayName }}</p>
        </div>
        <div class="flex">
          <p class="text-gray-500 font-bold mr-4">{{ numberOrNameAccount }}</p>
          <p class="text-gray-500">{{ status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gxCardContainer {
  height: 84px;
}
.circleStatus {
  position: absolute;
  bottom: -1px;
  left: 40px;
  width: 0.875rem;
  height: 0.875rem;
  border-radius: 0.5rem;
}
.material-icons-round {
  display: inline;
}
.gxOutter:active {
  // It seems that tailwind does not  use a correct pattern hover  focus active
  background-color: var(--secondary-50);
  border-color: var(--secondary-50);
}
// Loader
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.gx-spin {
  animation-name: spin;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-delay: 500ms;
  animation-iteration-count: infinite;
}

// Mobile breakpoints
@media screen and (max-width: 400px) {
  .gxQuantityContainer {
    max-width: 165px;
  }
}

@media screen and (max-width: 767px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

// Desktop breakpoints
@media screen and (min-width: 768px) {
  .gxQuantityContainer {
    max-width: 100px;
  }
}

@media screen and (min-width: 868px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

@media screen and (min-width: 968px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

@media screen and (min-width: 1068px) {
  .gxQuantityContainer {
    max-width: 240px;
  }
}

@media screen and (min-width: 1168px) {
  .gxQuantityContainer {
    max-width: 340px;
  }
}
</style>

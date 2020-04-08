<script>
import GxTinyMenuTransactionsCard from '@components/_Core/Forms/GxTinyMenuTransactionsCard'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxCardTransactions',
  components: {
    GxTinyMenuTransactionsCard,
    GxIcon,
  },
  props: {
    sales: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Object,
      default: null,
    },
    currency: {
      type: String,
      default: 'MXN',
    },
    timePeriod: {
      type: String,
      default: 'Mes',
    },
    startDate: {
      type: String,
      default: null,
    },
    endDate: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timePeriodValue: this.timePeriod,
      hasHover: true,
    }
  },
  computed: {
    title() {
      if (this.sales) {
        return `Ventas`
      } else return `Gastos`
    },
    quantity() {
      return this.periodAmount.toFixed(2)
    },
    periodAmount() {
      if (this.timePeriodValue === 'day') {
        return this.amount.today.total
      }
      if (this.timePeriodValue === 'month') {
        return this.amount.currentMonth.total
      }
      return this.amount.currentWeek.total
    },
  },
  mounted() {
    let tinyMenuMouseenter
    let tinyMenuMouseleave

    if (this.$refs.tinymenu) {
      tinyMenuMouseenter = this.$refs.tinymenu.$el.addEventListener(
        'mouseenter',
        () => {
          this.hasHover = false
        }
      )
      tinyMenuMouseleave = this.$refs.tinymenu.$el.addEventListener(
        'mouseleave',
        () => {
          this.hasHover = true
        }
      )
      this.$on('hook:beforeUpdate', () => {
        if (this.$refs.tinymenu) {
          this.$refs.tinymenu.$el.removeEventListener(
            'mouseenter',
            tinyMenuMouseenter
          )
          this.$refs.tinymenu.$el.removeEventListener(
            'mouseleave',
            tinyMenuMouseleave
          )
        }
      })
      this.$on('hook:updated', () => {
        this.$nextTick(() => {
          if (this.$refs.tinymenu) {
            tinyMenuMouseenter = this.$refs.tinymenu.$el.addEventListener(
              'mouseenter',
              () => {
                this.hasHover = false
              }
            )
            tinyMenuMouseleave = this.$refs.tinymenu.$el.addEventListener(
              'mouseleave',
              () => {
                this.hasHover = true
              }
            )
          }
        })
      })
    }
  },
}
</script>
<template>
  <div
    id="outter"
    class="gxOutter shadow-2 p-4 overflow-visible rounded cursor-pointer gxCardContainer"
    :class="{
      'de:hover:bg-gray-200 gxOutterActive': hasHover,
      'border-l-8 border-sales-1': sales,
      'border-l-8 border-expenses-1': !sales,
    }"
    v-on="$listeners"
  >
    <div v-if="!loading" class="flex">
      <div class="flex-grow overflow-hidden leading-none">
        <div class="flex justify-between max-w-full">
          <div class="flex gxQuantityContainer">
            <p
              class="gx-h6 max-w-lg mr-1 truncate"
              :title="
                `${quantity.replace(/\d(?=(\d{3})+\.)/g, '$&,')}${currency}`
              "
              >${{ quantity.replace(/\d(?=(\d{3})+\.)/g, '$&,') }}</p
            >
            <p class="gx-h6 max-w-lg mr-4">{{ currency }}</p>
          </div>
          <GxTinyMenuTransactionsCard
            v-if="$mq === 'mo'"
            ref="tinymenu"
            v-model="timePeriodValue"
            :initial-value="timePeriod"
            class="z-10 tinymenu"
            @input="$emit('input', $event)"
          />
        </div>
        <p class="mt-2 de:text-base">{{ title }}</p>
      </div>
      <GxTinyMenuTransactionsCard
        v-if="$mq === 'de'"
        ref="tinymenu"
        v-model="timePeriodValue"
        :initial-value="timePeriod"
        class="tinymenu flex-shrink-0"
        @input="$emit('input', $event)"
      />
    </div>
    <div v-if="loading" class="pr-4 de:pr-4 flex flex-col justify-center">
      <h3 class="uppercase font-bold mb-4 gx-h6"
        >Descargando tus {{ title
        }}<GxIcon class="gx-spin ml-1" icon="autorenew"
      /></h3>
      <p class="de:gx-caption" style="font-size: 1rem;"
        >Esto puede tomar varios minutos...</p
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.gxCardContainer {
  height: 80px;
}
.gxOutter {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  flex-basis: 0;
}
.gxOutterActive:active {
  // It seems that tailwind does not  use a correct pattern hover  focus active
  background-color: var(--secondary-50);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
}

// Mobile breakpoints
.gxQuantityContainer {
  max-width: 150px;
}

@media screen and (min-width: 361px) {
  .gxQuantityContainer {
    max-width: 165px;
  }
}

@media screen and (min-width: 415px) {
  .gxQuantityContainer {
    max-width: 200px;
  }
}

// Desktop breakpoints
@media screen and (min-width: 768px) {
  .gxQuantityContainer {
    max-width: 155px;
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
</style>

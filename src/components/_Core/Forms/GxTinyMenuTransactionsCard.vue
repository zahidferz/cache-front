<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import { format } from 'date-fns'
const es = require('date-fns/locale/es')
export default {
  name: 'GxTinyMenuTransactionsCard',
  components: {
    GxIcon,
  },
  props: {
    initialValue: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      innerValue: this.initialValue ? this.initialValue : null,
      showDeskMenu: false,
      placeholder: null,
      initialPlaceholder: this.initialValue,
      mobileValue: null,
      currentWeek: null,
      currentMonth: null,
      options: [
        { name: 'day', label: 'Hoy' },
        { name: 'week', label: 'Semana' },
        { name: 'month', label: 'Mes' },
      ],
    }
  },
  watch: {
    mobileValue: {
      handler(newVal) {
        if (!this.initialPlaceholder) {
          if (newVal === 'week') {
            this.options[1].label = this.currentWeek
            this.$emit('input', newVal)
          } else if (newVal === 'month') {
            this.options[2].label = this.currentMonth
            this.$emit('input', newVal)
          } else {
            this.$emit('input', newVal)
          }
        }
      },
      immediate: true,
    },
    innerValue(newVal) {
      if (!this.initialPlaceholder) {
        this.$emit('input', newVal)
      }
    },
  },
  created() {
    this.getCurrentWeek()
    this.getCurrentMonth()
    if (this.$mq === 'mo') {
      this.mobileValue = this.initialValue
    }

    this.selectOption(this.initialPlaceholder)
    this.initialPlaceholder = null
  },
  mounted() {
    const clickHandler = (evt) => {
      if (!this.$el.contains(evt.target)) {
        this.showDeskMenu = false
      }
    }
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('click', clickHandler)
    })
  },
  methods: {
    getCurrentMonth() {
      const monthName = format(new Date(), 'MMMM', { locale: es })
      this.currentMonth = this.capitalizeMonth(monthName)
    },
    getCurrentWeek() {
      // Week Monday to sunday
      const today = new Date()
      const weekDay = today.getDay()
      const differenceInHours = weekDay * 24
      const startWeek = new Date()
      startWeek.setHours(startWeek.getHours() - differenceInHours + 24)
      const startWeekIsoString = startWeek.toISOString()
      const endWeek = new Date(startWeekIsoString)
      endWeek.setHours(endWeek.getHours() + 6 * 24)
      const sameMonth = startWeek.getMonth() === endWeek.getMonth()
      if (sameMonth) {
        this.currentWeek = `${startWeek.getDate()} al ${endWeek.getDate()} de ${format(
          startWeek,
          'MMMM',
          { locale: es }
        )}`
      } else {
        this.currentWeek = `${startWeek.getDate()} de ${format(
          startWeek,
          'MMM',
          { locale: es }
        )} al  ${endWeek.getDate()} de ${format(endWeek, 'MMM', {
          locale: es,
        })}`
      }
    },
    capitalizeMonth(month) {
      if (typeof month !== 'string') return ''
      return month.charAt(0).toUpperCase() + month.slice(1)
    },
    openMenu() {
      this.showDeskMenu = !this.showDeskMenu
    },
    selectOption(option) {
      this.innerValue = option
      if (option === 'Hoy' || option === 'day') {
        this.placeholder = `Hoy`
      }
      if (option === 'Mes' || option === 'month') {
        this.placeholder = this.currentMonth
      }
      if (option === 'Semana' || option === 'week') {
        this.placeholder = this.currentWeek
      }
      if (!this.initialPlaceholder) {
        this.openMenu()
      }
    },
  },
}
</script>

<template>
  <div>
    <MqLayout mq="mo" class="flex-grow flex items-center">
      <select
        :id="_uid"
        v-model="mobileValue"
        :name="`select${_uid}`"
        class="bg-transparent gx-caption"
        :class="{
          weekLabelPosition: mobileValue === 'week',
          dayLabelPosition: mobileValue === 'day',
          monthLabelPosiition: mobileValue === 'month',
        }"
        style="direction: rtl"
      >
        <option
          v-for="option in options"
          :key="option.label"
          style="direction: ltr"
          :value="option.name"
          >{{ option.label }}
        </option>
      </select>
      <label :for="`select${_uid}`">
        <GxIcon icon="expand_more" />
      </label>
    </MqLayout>
    <MqLayout
      mq="de"
      class="flex flex-col items-end relative gx-caption cursor-pointer"
    >
      <div class="text-gray-700 gxMenuDesk text-right" @click.stop="openMenu"
        ><p class="flex items-center justify-end"
          >{{ placeholder }} <GxIcon class="ml-1" icon="expand_more"
        /></p>
      </div>
      <transition name="popover">
        <div
          v-show="showDeskMenu"
          class="popover flex-grow flex flex-col shadow-2 w-24 bg-white"
        >
          <div
            v-for="(option, i) in options"
            :key="option.label"
            :class="{
              'rounded-tl-lg': i === 0,
              'rounded-b-lg': i === 2,
            }"
            class="flex-grow flex items-center px-2 hover:bg-secondary-50"
            @click.stop="selectOption(option.name)"
          >
            <p class="flex-grow text-left">{{ option.label }}</p>
            <GxIcon v-if="innerValue === option.name" icon="check" />
          </div>
        </div>
      </transition>
    </MqLayout>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
select {
  display: inline-block;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
select:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #000;
}

#iconMobile {
  top: 0.25rem;
  right: 0.25rem;
  pointer-events: none;
  cursor: pointer;
}

// .gxMenuDesk {
//   width: 7rem;
// }
// .weekLabelPosition {
//   right: 1.25rem;
// }

// .dayLabelPosition {
//   right: -3.5rem;
// }
// .monthLabelPosiition {
//   right: -0.25rem;
// }
// #selectIcon {
//   position: absolute;
//   top: 0.25rem;
//   right: -1rem;
//   cursor: pointer;
// }
// Vue  animations
.popover {
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
// Prevent iOS from zooming when clicked
select::after {
  font-family: 'Material Icons Round';
  color: red;
  content: 'expand_more';
}

@supports (-webkit-overflow-scrolling: touch) {
  select {
    font-size: 1rem;
    transform: scale(0.75);
  }
}
</style>

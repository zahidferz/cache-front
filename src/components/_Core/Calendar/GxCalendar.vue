<template>
  <div>
    <GxInput
      v-model="parsedDate"
      :autocomplete="`date${_uid}`"
      pattern="date"
      placeholder="Elige una fecha"
      label="Elige una fecha"
    />
    <!-- <GxInput v-model="parsedDate" pattern="date" placeholder="Elige una fecha" label="Elige una fecha" @focus="open($event)" /> -->
    <!-- <Datetime
      ref="datetime"
      v-model="dateIso"
      :phrases="{ ok: 'OK', cancel: 'Cancelar' }"
    >
    </Datetime> -->
  </div>
</template>
<script>
// import { Datetime } from 'vue-datetime'
// import { Settings } from 'luxon'
import GxInput from '../Forms/GxInput'
import formatDate from '@src/utils/format-date'

export default {
  name: 'GxCalendar',
  components: {
    // Datetime,
    GxInput,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dateIso: this.value,
      parsedDate: this.dateIso ? formatDate(this.dateIso) : '',
    }
  },
  watch: {
    dateIso(newVal) {
      this.$emit('input', newVal)
      this.parsedDate = formatDate(this.dateIso)
    },
  },
  methods: {
    open(event) {
      // console.log(event)
      this.$refs.datetime.open({ target: { blur: function() {} } })
    },
  },
}
</script>
<style lang="scss">
.theme-orange .vdatetime-popup__header,
.theme-orange .vdatetime-calendar__month__day--selected > span > span,
.theme-orange .vdatetime-calendar__month__day--selected:hover > span > span {
  background: var(--primary);
}

.theme-orange .vdatetime-year-picker__item--selected,
.theme-orange .vdatetime-time-picker__item--selected,
.theme-orange .vdatetime-popup__actions__button {
  color: var(--primary);
}
</style>

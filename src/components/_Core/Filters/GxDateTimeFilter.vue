<script>
import GxModal from '@components/_Core/Modals/GxModal'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxInput from '@components/_Core/Forms/GxInput'
export default {
  name: 'GxDateTimeFilter',
  components: {
    GxModal,
    GxIcon,
    GxInput,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showModal: false,
      startDate: this.value ? this.value.startDate : '',
      endDate: this.value ? this.value.endDate : '',
      errorStart: '',
      errorEnd: '',
      customError: null,
    }
  },
  computed: {
    parsedPeriod() {
      if (this.endDate && this.startDate) {
        return `${this.$utils.dates.formatDateLongYear(
          this.startDate
        )} a ${this.$utils.dates.formatDateLongYear(this.endDate)}`
      }
      return null
    },
    isFormEmpty() {
      return !this.endDate && !this.startDate
    },
    selectedRange() {
      if (this.startDate && this.endDate) {
        return {
          startDate: this.startDate,
          endDate: this.endDate,
        }
      }
      return null
    },
  },
  watch: {
    selectedRange(newVal) {
      if (this.$mq === 'mo' && newVal) {
        this.$emit('input', newVal)
      }
    },
    value(newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
      if (newVal) {
        this.startDate = newVal.startDate
        this.endDate = newVal.endDate
      } else {
        this.cleanFilters()
      }
    },
    startDate() {
      this.errorStart = ''
    },
    endDate() {
      this.errorEnd = ''
    },
    isFormEmpty(newVal) {
      if (!newVal) {
        this.customError = null
      }
    },
  },
  created() {
    this.startDate = this.value ? this.value.startDate : ''
    this.endDate = this.value ? this.value.endDate : ''
  },
  methods: {
    isValid() {
      if (this.isFormEmpty) {
        this.customError = 'Debes seleccionar una fecha de inicio y fin'
        return false
      }
      if (this.startDate && this.endDate) {
        if (new Date(this.startDate) > new Date(this.endDate)) {
          this.customError =
            'La fecha de fin debe ser mayor que la fecha de inicio'
          return false
        }
      }
      if (!this.startDate && this.endDate) {
        this.errorStart = 'Campo obligatorio'
        return false
      }
      if (this.startDate && !this.endDate) {
        this.errorEnd = 'Campo obligatorio'
        return false
      }
      return true
    },
    cleanFilters() {
      this.startDate = ''
      this.endDate = ''
      this.$emit('input', null)
    },
    updateRange() {
      if (this.isValid()) {
        const { startDate, endDate } = this
        this.$emit('input', {
          startDate: startDate,
          endDate: endDate,
        })
        this.showModal = false
      }
    },
  },
}
</script>
<template>
  <div v-if="$mq === 'mo'" class="flex">
    <GxInput
      ref="startDate"
      v-model="startDate"
      pattern="date"
      placeholder="Inicio"
      label="Inicio"
      icon="calendar_today"
      class="flex-grow"
      :error="errorStart"
    />
    <p class="mx-1 de:mx-4 flex items-center">-</p>
    <GxInput
      ref="endDate"
      v-model="endDate"
      pattern="date"
      placeholder="Fin"
      label="Fin"
      class="flex-grow"
      icon="calendar_today"
      :disabled="!startDate"
      :min-datetime="startDate"
      :error="errorEnd"
    />
  </div>
  <button
    v-else
    class="flex items-center ml-4 de:gx-caption leading-none whitespace-no-wrap text-gray-700"
    @click.stop="showModal = true"
  >
    <span v-if="!startDate && !endDate" class="font-bold"
      >Periodo de ventas</span
    >
    <p
      v-else-if="parsedPeriod"
      class=" de:gx-caption py-1 whitespace-no-wrap rounded-xxl leading-none px-2 bg-secondary flex items-center justify-start"
    >
      <span class="text-white text-center font-bold">{{
        `${parsedPeriod}`
      }}</span>
      <button
        class="ml-2 text-white font-bold flex-items-center "
        @click.stop="cleanFilters"
      >
        <GxIcon icon="close" />
      </button>
    </p>
    <GxIcon v-if="!startDate && !endDate" class="ml-2" icon="calendar_today" />
    <GxModal v-if="showModal" class="py-4">
      <div
        class="flex-grow flex flex-col  de:bg-white w-108  py-8 px-4  de:shadow-4 rounded-lg"
      >
        <p class="font-bold gx-h5 pl-4 leading-none">Periodo de ventas</p>
        <div class="flex items-center mt-8">
          <GxInput
            ref="startDate"
            v-model="startDate"
            pattern="date"
            placeholder="Inicio"
            label="Inicio"
            icon="calendar_today"
            class="flex-grow"
            :error="errorStart"
          />
          <p class="mx-4">-</p>
          <GxInput
            ref="endDate"
            v-model="endDate"
            pattern="date"
            placeholder="Final"
            label="Final"
            class="flex-grow"
            icon="calendar_today"
            :disabled="!startDate"
            :min-datetime="startDate"
            :error="errorEnd"
          />
        </div>
        <div class="flex flex-col mt-6">
          <p
            v-if="customError"
            class="text-alert text-center leading-none mb-2"
            >{{ customError }}</p
          >
          <div class=" flex items-center justify-center">
            <GxButton ghost @click.stop="showModal = false">
              <span>CANCELAR</span>
            </GxButton>
            <GxButton class="ml-4" @click.stop="updateRange">
              <span>GUARDAR</span>
            </GxButton>
          </div>
        </div>
      </div>
    </GxModal>
  </button>
</template>

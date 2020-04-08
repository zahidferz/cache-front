<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  components: {
    GxIcon,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: (value) => {
        if (!value || !value[0]) {
          console.warn(
            'GxTinyMenu expects an array with at least one option. You passed ',
            value
          )
          return false
        }
        if (!value[0].value || !value[0].label) {
          console.warn(
            'GxTinyMenu expects an array of objects with the keys value and label. You passed ',
            value
          )
          return false
        }
        return true
      },
    },
  },
  data() {
    return {
      innerValue: this.value,
      optionSelected: this.options.find(
        (option) => option.value === this.value
      ),
      showDeskMenu: false,
    }
  },
  watch: {
    innerValue(newVal) {
      this.optionSelected = this.options.find(
        (option) => option.value === newVal
      )
      this.$emit('input', newVal)
    },
    value(newVal, oldVal) {
      if (newVal === oldVal) return
      this.innerValue = newVal
    },
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
    openMenu() {
      this.showDeskMenu = !this.showDeskMenu
    },
    selectOption(option) {
      this.innerValue = option
      this.showDeskMenu = false
    },
  },
}
</script>

<template>
  <div>
    <MqLayout mq="mo" class="flex-grow flex items-center">
      <select
        :id="`select${_uid}`"
        v-model="innerValue"
        :name="`select${_uid}`"
        class="bg-transparent gx-caption"
        style="direction: rtl"
        @click.stop
      >
        <option
          v-for="option in options"
          :key="option.label"
          style="direction: ltr"
          :value="option.value"
          >{{ option.label }}
        </option>
      </select>
      <label :for="`select${_uid}`">
        <GxIcon icon="expand_more" @click.stop />
      </label>
    </MqLayout>
    <MqLayout
      mq="de"
      class="flex flex-col items-end relative gx-caption cursor-pointer"
    >
      <div class="text-gray-700 gxMenuDesk text-right" @click.stop="openMenu"
        ><p class="flex items-center justify-end"
          >{{ optionSelected.label }} <GxIcon class="ml-1" icon="expand_more"
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
            @click.stop="selectOption(option.value)"
          >
            <p class="flex-grow text-left">{{ option.label }}</p>
            <GxIcon v-if="innerValue === option.value" icon="check" />
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

// Vue  animations
.popover {
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
.popover-enter-active {
  transition: all 0.3s ease-out;
}
.popover-leave-active {
  transition: all 0.3s ease-in;
}
.popover-enter,
.popover-leave-to {
  opacity: 0;
  transform: translateY(-1rem) scale(0.1);
}
.popover-enter-to {
  transform: scale(1);
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

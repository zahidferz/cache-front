<script>
import Multiselect from 'vue-multiselect'
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  components: {
    Multiselect,
    GxIcon,
  },
  props: {
    clearOnSelect: {
      type: Boolean,
      default: true,
    },
    selectLabel: {
      type: String,
      default: null,
    },
    trackBy: {
      type: String,
      default: null,
    },
    value: {
      required: true,
      validator: (val) => {
        return (
          typeof val === 'object' ||
          typeof val === 'string' ||
          typeof val === 'undefined'
        )
      },
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    watchValue: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: null,
    },
    maxItems: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    iconRightClickHandler: {
      type: Function,
      default: null,
    },
    notFoundMsg: {
      type: String,
      default: 'No encontramos tu búsqueda',
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    allowEmpty: {
      type: Boolean,
      default: true,
    },
    keepTypedValue: {
      type: Boolean,
      default: false,
    },
    keepTypedValueAsValue: {
      type: Boolean,
      default: false,
    },
    noOptions: {
      type: String,
      default: 'Lista vacía',
    },
    dropdown: {
      type: Boolean,
      default: false,
    },
    hideSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
      innerOptions: [...this.options],
      isOpen: false,
      innerSearch: '',
      slotResultOptions: ['noOptions', 'noResult'],
    }
  },
  computed: {
    deselectLabel() {
      return this.multiple ? 'Clic para deseleccionar' : ''
    },
  },
  watch: {
    value(newValue) {
      if (this.watchValue) {
        this.innerValue = newValue
      }
    },
    options(newVal) {
      this.innerOptions = this.options
    },
    innerValue(newVal) {
      this.innerSearch = newVal
      this.$emit('input', newVal)
    },
  },
  mounted() {
    if (this.keepTypedValue) {
      this.$refs.multiselect.search = this.value
    }
  },
  methods: {
    searchChange($event) {
      if (!this.keepTypedValue) {
        // Clear inner search when selecting an option from the dropdown
        this.innerSearch = $event
      }
      this.$emit('search', $event)
      if (this.keepTypedValue && this.isOpen) {
        this.innerValue = this.innerSearch
      }
    },
    toggleSelect(value, id) {
      this.isOpen = !this.isOpen
      this.$emit('open', this.isOpen)
    },
    addTag(newTag) {
      if (!this.multiple) {
        this.innerOptions.push(newTag)
        this.innerValue = newTag
      } else {
        this.innerOptions.push(newTag)
        this.innerValue.push(newTag)
      }
    },
    close($event) {
      this.toggleSelect()
      this.$emit('close', $event)
      if (this.keepTypedValue) {
        // Wait for any possible selected value to be set and check again
        this.$nextTick(() => {
          if (!this.innerValue) {
            if (this.keepTypedValueAsValue) {
              this.innerValue = this.$refs.multiselect.search
            } else {
              this.innerValue = this.innerSearch
            }
          }
        })
      }
    },
    onSelect(selectedOption) {
      if (this.keepTypedValue) {
        this.$refs.multiselect.search = selectedOption
      }
    },
  },
}
</script>

<template>
  <div
    class="relative gxMultiselectWrapper"
    :class="{
      leftIcon: icon,
      dropdown: dropdown,
      'gx-taggable': multiple,
      'gx-icon-right': iconRight,
      'has-options': options.length > 5,
      'js-error-anchor': error,
    }"
  >
    <label
      v-if="innerValue || selectLabel"
      :for="_uid"
      class="typo__label de:gx-caption cursor-pointer"
      :class="{
        'z-1': innerValue,
        'typo__label--focus dropdown': isOpen,
        'text-primary dropdown': isOpen,
        'text-alert': error,
        'text-gray-500': !isOpen && !error && !innerValue,
        'typo__label--blur': innerValue,
      }"
      >{{ selectLabel }}</label
    >
    <Multiselect
      :id="_uid"
      ref="multiselect"
      v-model="innerValue"
      class="cursor-pointer"
      :class="{
        gxBorder: isOpen,
        error: error,
        'border-with-value': innerValue && !isOpen && dropdown,
      }"
      :options="innerOptions"
      :placeholder="placeholder"
      :max="maxItems"
      deselect-label=""
      select-label=""
      :multiple="multiple"
      :taggable="taggable"
      tag-placeholder=""
      selected-label=""
      :options-limit="100"
      :track-by="trackBy"
      :label="label ? label : trackBy"
      open-direction="bottom"
      :searchable="searchable"
      :loading="loading"
      :allow-empty="allowEmpty"
      :preserve-search="keepTypedValue"
      :hide-selected="hideSelected"
      :clear-on-select="clearOnSelect"
      @select="onSelect"
      @tag="addTag"
      @open="toggleSelect"
      @close="close"
      @search-change="searchChange"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
        ><slot :name="slot" v-bind="scope"
      /></template>
      <span
        v-if="!iconRight"
        slot="caret"
        slot-scope="{ toggle }"
        class="flex arrow"
        :class="{ 'text-alert': error }"
        @mousedown.prevent.stop="toggle"
        ><GxIcon
          :icon="!isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
          :class="{
            'text-alert': error,
            'text-gray-500': !isOpen && !error && !innerValue,
          }"
      /></span>
      <span v-if="iconRight" slot="caret"></span>
      <!-- <component
        :is="to ? 'RouterLink' : 'button'"
        v-if="iconRight"
        slot="caret"
        class="arrow cursor-pointer"
        :to="to"
        @click.prevent.stop="iconRightClickHandler"
        ><GxIcon
          icon="chevron_right"
          class="de:cursor-pointer"
          :class="{ 'text-alert': error, 'text-black': !error }"
      /></component> -->
      <template v-for="slotResult in slotResultOptions" :slot="slotResult">{{
        slotResult === 'noOptions' ? noOptions : notFoundMsg
      }}</template>
    </Multiselect>
    <component
      :is="to ? 'RouterLink' : 'button'"
      v-if="iconRight"
      class="cursor-pointer gx-rightIcon focus:outline-none"
      :class="{
        'gx-rightIcon--de': $mq === 'de',
        'gx-rightIcon--mo': $mq === 'mo',
      }"
      :to="to"
      @click.prevent.stop="iconRightClickHandler"
      ><GxIcon
        icon="chevron_right"
        class="de:cursor-pointer"
        :class="{ 'text-alert': error, 'text-black': !error }"
    /></component>
    <p style="height:16px" class="text-alert de:gx-caption error pt-1">{{
      error
    }}</p>
  </div>
</template>

<style lang="scss">
.multiselect__select {
  display: none;
}
.gxMultiselectWrapper.leftIcon .multiselect__single,
.gxMultiselectWrapper.leftIcon .multiselect__placeholder {
  padding-left: 28px;
}
.gxMultiselectWrapper.leftIcon::before {
  position: absolute;
  bottom: 1.75rem;
  z-index: 1;
  font-family: 'Material Icons Round', serif;
  content: 'calendar_today';
}
/* stylelint-disable */
@import '~vue-multiselect/dist/vue-multiselect.min.css';
// Limit overflow on selection
.multiselect__tags .multiselect__single {
  padding-right: 4px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
.arrow {
  position: absolute;
  right: 0;
  bottom: 15px;
  z-index: 1;
}
.gx-icon-right .arrow {
  bottom: 5px;
}

.gx-icon-right .arrow {
  bottom: 13px;
}

.multiselect__placeholder {
  margin-bottom: 0;
  color: var(--gray-500);
}
.multiselect__content-wrapper {
  position: none;
  border-radius: 0.5rem;
  transform: translateY(4px);
}

.has-options .multiselect__content-wrapper {
  height: 200px;
}
.dropdown .multiselect__placeholder {
  color: var(--white);
}
.dropdown .multiselect__tags {
  border-bottom: 1px solid var(--gray-500);
}
.dropdown .border-with-value .multiselect__tags {
  border-bottom: 1px solid var(--black);
}

.multiselect__tags {
  padding-top: 8px;
  padding-left: 0;
  font-size: 0.75rem;
  border: none;
  border-bottom: 1px solid var(--black);
  border-radius: 0;
}
.gx-icon-right .multiselect__tags {
  display: flex;
  align-items: flex-end;
  min-height: 50px;
  padding: 8px 0;
  padding-bottom: 12px;
  font-family: Muli;
  font-size: 0.75rem;
  color: var(--gray-500);
  background: none;
  border: none;
  border-bottom: 1px solid var(--black);
  border-radius: 0;
}
.gxBorder .multiselect__tags {
  font-family: Muli;
  font-size: 0.75rem;
  color: var(--gray-500);
  border: none;
  border-bottom: 1px solid var(--primary);
  border-radius: 0;
}
.error .multiselect__tags {
  border-bottom: 1px solid var(--alert);
}
.error .multiselect__placeholder {
  color: var(--alert);
}

.error .typo__label {
  color: var(--alert);
}
.error .multiselect__single {
  color: var(--alert);
}
.dropdown .error .multiselect__placeholder {
  display: none;
}

.multiselect__element,
.multiselect__option {
  // .multiselect__option targets the li when no results are found "No encontramos tu búsqueda"
  height: 29px;
  font-size: 0.75rem;
  color: rgba(25, 27, 29, 1);
}
.multiselect__option--selected {
  height: 29px;
  color: var(--black);
  background: white;
}
.multiselect__option--selected::after {
  height: 29px;
  font-family: 'Material Icons Round', serif;
  color: var(--black);
  content: 'check';
  background-color: transparent;
  transform: translateY(-5px);
}
.multiselect,
.multiselect__input,
.multiselect__single {
  padding: 0;
  margin: 0;
  // font-family: Gothic A1;
  // font-size: 1rem;
  // color: var(--black);
}
.gxMultiselectWrapper input,
.gxMultiselectWrapper input::-webkit-input-placeholder {
  font-family: Muli;
  font-size: 0.75rem;
  font-weight: 300;
  // line-height: 1rem;
}
.multiselect__single {
  margin-bottom: 0;
  font-size: 0.75rem;
  color: rgba(25, 27, 29, 1);
}
.multiselect__option.multiselect__option--highlight {
  color: rgba(25, 27, 29, 1);
  vertical-align: middle;
  background-color: var(--secondary-50);
}
.multiselect__option.multiselect__option--highlight::after {
  background: transparent;
}
.multiselect__option {
  min-height: 29px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
}
.multiselect__tag {
  margin-left: 16px;
  // line-height: 20px;
  background-color: var(--primary);
}
.multiselect__tag-icon {
  background-color: var(--primary);
}
.multiselect__tag-icon:hover,
.multiselect__tag-icon:focus {
  background-color: var(--secondary-300);
}
.multiselect__tag-icon::after {
  color: var(--white);
}
// Taggable overrides
.gx-taggable .multiselect__tags {
  min-height: 34px;
  padding-top: 0;
  padding-left: 4px;
  border: 1px solid var(--black);
  border-radius: 5px;
}
.gx-taggable .typo__label {
  margin-top: 10px;
  margin-bottom: 8px;
  // line-height: 28px;
}
.gx-taggable .multiselect__tag {
  display: inline-flex;
  align-items: center;
  min-width: 74px;
  height: 26px;
  margin: 0;
  margin-top: 4px;
  margin-right: 4px;
  font-family: 'Muli';
  font-size: 0.625rem;
  color: var(--secondary-300);
  text-align: center;
  letter-spacing: 0.24px;
  background-color: var(--secondary-50);
  border-radius: 9999px;
}
.multiselect__tag > span {
  margin: 0 auto;
}
.gx-taggable .multiselect__tag-icon {
  display: flex;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  margin: 0;
  color: var(--secondary-300);
  background-color: var(--secondary-50);
  transform: translateX(5px);
}
.gx-taggable .multiselect__tag-icon::after {
  font-size: 0.625rem;
  color: var(--secondary-300);
  background-color: var(--secondary-50);
  transform: translateX(-4px);
}
.gx-taggable .arrow {
  position: absolute;
  top: 30%;
  right: 8px;
  color: var(--black);
}
.gx-taggable .multiselect__placeholder {
  margin-top: 6px;
}
.gx-taggable .multiselect__input::placeholder {
  color: white;
}
.dropdown .multiselect__input::placeholder {
  color: white;
}
// Icon Right WITH CHEVRON
.gx-icon-right .typo__label {
  position: absolute;
  // transform: translateY(5px);
}
.gx-icon-right .typo__label:focus {
  color: var(--primary);
}

/* START - Animate label on top of placeholder when using the caret-right prop */
// Hide placeholder and work animations with the label
.gx-icon-right .multiselect__input::placeholder {
  color: white;
}
.gx-icon-right .multiselect__placeholder {
  display: none;
}
// On focus, animate label to new position and change text color
.gx-icon-right .typo__label {
  top: 1.25rem;
  font-size: 0.75rem;
  letter-spacing: 0;
  transition: 0.3s all;
}
.gx-icon-right .typo__label--focus {
  top: 0;
  z-index: 51; // Multiselect uses a z-index of 50 on active
  font-size: 0.625rem;
}

.gx-icon-right .typo__label--blur {
  top: 0;
  font-size: 0.625rem;
}

/* END - Animate label on top of placeholder when using the caret-right prop */
.gx-icon-right .multiselect:focus {
  border-bottom: 1px solid var(--primary);
}

/* scrollbar */

/*  width */
::-webkit-scrollbar {
  width: 6px;

  /* horizontal scrollbar width */
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--gray-400);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--gray-500);
}

@media only screen and (max-width: 800px) {
  .multiselect__input {
    font-size: 1.125rem;
  }
  .typo__label {
    z-index: 1;
    height: 12px;
    font-size: 12px;
  }
  .arrow {
    font-size: 1.125rem;
  }
  .gx-icon-right .arrow {
    bottom: 3px;
  }
  .gx-icon-right .multiselect__tags {
    padding-bottom: 8px;
  }
  .multiselect__tags {
    font-size: 1.125rem;
  }
  .gx-taggable .multiselect__tags {
    min-height: 48px;
    padding-left: 8px;
  }
  .gx-taggable .multiselect__tag {
    min-width: 88px;
    height: 32px;
    padding: 6px 26px 6px 16px;
    margin-top: 8px;
    margin-right: 4px;
    font-size: 1rem;
  }
  .gx-taggable .multiselect__tag-icon::after {
    font-size: 1rem;
  }
  .gx-taggable .multiselect__tag-icon::after {
    font-size: 0.875rem;
    transform: translate(-8px, -1px);
  }
  .error .typo__label {
    color: var(--alert);
  }
  .gx-icon-right .typo__label {
    font-size: 1.125rem;
  }
  .gx-icon-right .typo__label--focus {
    font-size: 0.875rem;
  }
  .error {
    font-size: 12px;
  }
  .multiselect__single {
    overflow: hidden;
    font-size: 1.125rem;
    // Avoid double line
    line-height: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .multiselect__placeholder {
    font-family: Muli;
    font-size: 1.125rem;
    font-weight: 300;
    // line-height: 1rem;
    color: var(--gray-500);
  }
  .gx-icon-right .typo__label {
    position: absolute;
    z-index: 1;
    transform: translateY(-3px);
  }
  .gx-icon-right .typo__label--blur {
    font-size: 0.875rem;
  }
  .gxMultiselectWrapper input,
  .gxMultiselectWrapper input::-webkit-input-placeholder {
    font-size: 1.125rem;
  }
}
.gx-rightIcon {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
}
.gx-rightIcon--de {
  padding-right: 32px;
  // padding-left: 32px;
}
.gx-rightIcon--mo {
  padding-right: 16px;
  // padding-left: 16px;
}
</style>

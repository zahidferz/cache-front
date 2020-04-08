<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
export default {
  name: 'GxButtonWithOptions',
  components: {
    GxIcon,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selection: null,
      showOptions: false,
    }
  },
  computed: {
    defaultOption() {
      const defaultOption = this.options.find(({ isDefault }) => isDefault)
      if (defaultOption) {
        return defaultOption
      }
      return this.options[0]
    },
    uniqueAction() {
      return this.options.find(
        (option) => option.label !== this.defaultOption.label
      )
    },
  },
  created() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.showOptions = false
      }
    }
    const clickHandler = (evt) => {
      if (
        'container' in this.$refs &&
        !this.$refs.container.contains(evt.target)
      ) {
        this.showOptions = false
      }
    }
    document.addEventListener('keydown', escapeHandler)
    document.addEventListener('click', clickHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
      document.removeEventListener('click', clickHandler)
    })
  },
}
</script>
<template>
  <div ref="container" class="flex relative flex-row flex-no-wrap">
    <RouterLink
      tag="button"
      :to="defaultOption.to"
      class="flex justify-start items-center justify-center bg-primary-500 rounded-l-lg text-white hover:bg-primary-600 active:bg-primary-500 h-7 w-30"
    >
      <GxIcon icon="add" class="text-white mr-2 font-bold" />
      <span class="font-bold uppercase">{{ defaultOption.label }}</span>
    </RouterLink>
    <button
      class="text-white flex justify-center items-center bg-primary-500 rounded-r-lg font-bold hover:bg-primary-600 active:bg-primary-500 pl-1"
      @click="showOptions = !showOptions"
    >
      <GxIcon icon="expand_more" class="text-white mx-2 font-bold" />
    </button>
    <div
      v-if="showOptions"
      class="absolute bg-white shadow-3 options-container z-10 overflow-hidden"
    >
      <ul
        v-if="options.length > 2"
        class="flex flex-col w-full pt-0 overflow-hidden"
      >
        <RouterLink
          v-for="option in options"
          :key="option.to.name"
          tag="li"
          :to="option.to"
          class=" flex uppercase cursor-pointer w-full relative justify-start items-center option hover:bg-secondary-50 px-2"
        >
          <!-- <GxIcon icon="add" class="mr-1" /> -->
          <span class="flex items-center gx-caption justify-center optionBox">
            <GxIcon icon="add" class="mr-1 optionIcon" />
            {{ option.label }}</span
          >
          <GxIcon
            v-if="defaultOption.to.name === option.to.name"
            icon="done"
            class="ml-auto"
          />
        </RouterLink>
      </ul>
      <ul
        v-if="options.length === 2"
        class="flex cursor-pointer relative  hover:bg-secondary-50 p-2"
      >
        <button
          class="uppercase whitespace-no-wrap"
          @click.stop="uniqueAction.action"
          >{{ uniqueAction.label }}</button
        >
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.options-container {
  top: calc(28px + 4px);
  right: 0;
  border-radius: 8px 0 8px 8px;
  transform-origin: top right;
}
.option {
  height: 1.375rem;
}
.optionBox {
  margin-top: 3px;
}
.optionIcon {
  margin-bottom: 1px;
}
.option:first-child {
  border-radius: 8px 0 0 0;
}
.option:last-child {
  border-radius: 0 0 8px 8px;
}
button:focus {
  outline: none;
}
</style>

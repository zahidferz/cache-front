<script>
export default {
  name: 'GxTabs',
  props: {
    initialTab: {
      type: [Number, String],
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    isGray: {
      type: Boolean,
      default: false,
    },
    noSelectedBlack: {
      type: Boolean,
      default: false,
    },
    skipScrollIntoView: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: this.initialTab,
      hasOffset: false,
    }
  },
  computed: {
    activeIndex() {
      if (this.tabs && this.active) {
        return this.tabs.findIndex((tab) => tab.name === this.active)
      }
      return 0
    },
  },
  watch: {
    initialTab(newVal) {
      this.active = newVal
    },
  },
  // mounted() {
  //   if (this.$mq === 'mo') {
  //     this.hasScroll()
  //     if (this.initialTab !== 0 && !this.skipScrollIntoView) {
  //       this.$refs[this.initialTab].scrollIntoView({ inline: 'start' })
  //     }
  //   }
  // },
  methods: {
    hasScroll() {
      const tabsDiv = document.getElementById('tabsScroll')
      const tabsWidthScroll = tabsDiv.scrollWidth
      const tabsWidth = tabsDiv.clientWidth
      if (tabsWidthScroll > tabsWidth) {
        this.hasOffset = true
      }
    },
    activateTab(tab, evt) {
      if (this.$mq === 'mo') {
        const tabSelected = this.$refs[tab.name][0]
        tabSelected.scrollIntoView({
          inline: 'center',
          block: 'nearest',
          behavior: 'smooth',
        })
      }
      this.active = tab.name
      this.$emit('activeTab', tab.name)
    },
  },
}
</script>

<template>
  <div>
    <MqLayout mq="mo" class="gxTabs" v-on="$listeners">
      <div
        id="tabsScroll"
        class="h-full flex items-start w-full overflow-scroll whitespace-no-wrap no-scroll-bar cursor-pointer"
        :class="{ fixed: fixed }"
      >
        <a
          v-for="(tab, index) in tabs"
          :ref="tab.name"
          :key="tab.name"
          class="flex-grow flex-1 inline-block px-8 flex justify-center items-center bg-white pt-4 pb-2"
          :class="{
            'border-primary border-b-2': active === tab.name && !isGray,
            'text-black border-black border-b-2': active === tab.name && isGray,
            'pl-20': hasOffset && index === 0,
            'gx-shadow-bottom': fixed,
          }"
          @click="activateTab(tab, $event)"
        >
          <i
            v-if="tab.icon"
            class="material-icons"
            :class="{
              'text-primary': active === tab.name && !isGray,
              'text-secondary': active !== tab.name && !isGray,
              'text-black': active === tab.name && isGray,
              'text-gray-500': active !== tab.name && isGray,
            }"
            >{{ tab.icon }}</i
          >
          <p
            v-if="tab.label"
            class="uppercase"
            :class="{
              'text-primary': active === tab.name && !isGray,
              'text-secondary': active !== tab.name && !isGray,
              'text-black': active === tab.name && isGray,
              'text-black': active !== tab.name && noSelectedBlack,
              'text-gray-500': active !== tab.name && isGray,
            }"
            >{{ tab.label }}</p
          >
        </a>
      </div>
    </MqLayout>
    <component
      :is="tabs[activeIndex].component"
      v-if="$mq === 'mo' && tabs[activeIndex].component"
    />
    <MqLayout mq="de">
      <ul class="flex justify-start h-full leading-none">
        <li
          v-for="tab in tabs"
          :key="tab.name"
          :class="{
            'border-primary text-primary border-b-2': active === tab.name,
            'border-gray-200 border-b-2': active !== tab.name,
          }"
          class="de:gx-overline px-2  h-full whitespace-no-wrap uppercase cursor-pointer text-center gxTabDesk flex-grow pb-2"
          @click="activateTab(tab, $event)"
        >
          {{ tab.label }}
        </li>
      </ul>
    </MqLayout>
  </div>
</template>
<style scoped>
.no-scroll-bar::-webkit-scrollbar {
  display: none;
}
.gxTabs {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  font-size: 0.75rem;
}
.gxTabDesk {
  min-width: 8.7rem;
}
.gx-shadow-bottom {
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.16);
}
</style>

<script>
// Used for all inner views. When in desktop works as a simple div wrapper
import GxIcon from '@components/_Core/Icons/GxIcon'
import TopBarLeftDrawer from '@components/_Core/Navigation/TopBar/TopBarLeftDrawer'
import TopBarRightDrawer from '@components/_Core/Navigation/TopBar/TopBarRightDrawer'
import GxBreadcrumb from '@components/_Core/Navigation/TopBar/GxBreadcrumb'
export default {
  name: 'LayoutWebMobile',
  components: {
    TopBarLeftDrawer,
    TopBarRightDrawer,
    GxBreadcrumb,
    GxIcon,
  },
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    breadcrumb: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    onSearchClasses: {
      type: String,
      default: 'text-black',
    },
    placeholder: {
      type: String,
      default: 'Buscar',
    },
    hasDrawer: {
      type: Boolean,
      default: false,
    },
    hasDrawerRight: {
      type: Boolean,
      default: false,
    },
    hasStickyElement: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: '',
    },
    iconClassWithoutScroll: {
      type: String,
      default: 'text-black',
    },
    iconClassWithScroll: {
      type: String,
      default: 'text-black',
    },
    topBarClassWithScroll: {
      type: String,
      default: '',
    },
    topBarClassWithoutScroll: {
      type: String,
      default: 'text-black bg-white',
    },
    iconClickHandler: {
      type: Function,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconRightClickHandler: {
      type: Function,
      default: null,
    },
    withPaddingBottom: {
      type: Boolean,
      default: true,
    },
    noHorizontalPadding: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Boolean,
      default: false,
    },
    breadcrumbClassesWithScroll: {
      type: Object,
      default: () => ({
        icon: 'text-gray-700',
        next: 'text-black',
        active: 'text-primary',
      }),
    },
    breadcrumbClassesWithoutScroll: {
      type: Object,
      default: () => ({
        icon: 'text-gray-700',
        next: 'text-black',
        active: 'text-primary',
      }),
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hasScrolled: false,
      activeDeskTopBarMenu: null,
      drawerLeft: false,
      mobileSearch: false,
      drawerRight: false,
      customTopBar: false,
      drawerOPen: false,
      search: '',
    }
  },
  computed: {
    hasTopBar() {
      return this.title || this.icon || this.iconRight || this.hasDrawer
    },
    iconClasses() {
      if (this.hasScrolled) {
        return this.iconClassWithScroll
      }
      return this.iconClassWithoutScroll
    },
    topBarClasses() {
      if (this.hasScrolled) {
        if (this.topBarClassWithScroll.includes('bg-')) {
          return this.topBarClassWithScroll
        }
        return this.topBarClassWithScroll
      }
      return this.topBarClassWithoutScroll ? this.topBarClassWithoutScroll : ''
    },
    placeholderColor() {
      if (this.onSearchClasses === 'bg-primary-500 text-white') {
        return 'placeholder-bg-dark'
      } else {
        return 'placeholder-bg-white'
      }
    },
  },
  watch: {
    search(newValue) {
      if (this.$mq === 'mo') {
        this.$emit('search', newValue)
      }
    },
  },
  reactiveProvide: {
    name: 'topBarSearch',
    include: ['search'],
  },
  mounted() {
    if (this.$route.query.searchTerm && this.hasSearch) {
      this.setMobileSearch(this.$route.query.searchTerm)
    }
    if (this.$route.query.drawerRight) {
      this.$nextTick(() => {
        this.drawerRight = true
        let query = Object.assign({}, this.$route.query)
        delete query.drawerRight
        this.$router.replace({ query })
      })
    }

    let lastKnownScrollPosition = 0
    let ticking = false

    if (this.$mq === 'de') {
      if (document.getElementById('gxDeMain')) {
        document.getElementById('gxDeMain').addEventListener('scroll', (e) => {
          lastKnownScrollPosition = e.target.scrollTop
          if (!ticking) {
            window.requestAnimationFrame(() => {
              this.hasScrolled = lastKnownScrollPosition > 0
              ticking = false
            })

            ticking = true
          }
        })
      }
    } else {
      window.addEventListener('scroll', (e) => {
        lastKnownScrollPosition = window.scrollY
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.hasScrolled = lastKnownScrollPosition > 0
            ticking = false
          })

          ticking = true
        }
      })
    }
  },
  created() {
    if (this.searchTerm) {
      this.search = this.searchTerm
      this.mobileSearch = true
    }
  },
  methods: {
    onCloseDrawer(drawer) {
      this[drawer] = false
      this.drawerOPen = false
    },
    cancelMobileSearch() {
      this.search = ''
      this.mobileSearch = false
    },
    focusMobileSearch() {
      this.$refs.mobileSearch && this.$refs.mobileSearch.focus()
    },
    onActiveMenu(componentName) {
      this.activeDeskTopBarMenu = componentName
    },
    showCustomTopBar() {
      this.customTopBar = true
    },
    hideCustomTopBar() {
      this.customTopBar = false
    },
    setMobileSearch(searchTerm = '') {
      this.search = searchTerm
      this.mobileSearch = true
    },
  },
}
</script>

<template>
  <MqLayout
    v-if="$mq === 'mo'"
    id="layout"
    key="layout"
    mq="mo"
    class="bg-white flex flex-col"
  >
    <!-- Icon and title -->
    <header
      key="topbar-container"
      class="top-bar sticky top-0 z-20 bg-white"
      :class="{ 'shadow-5': tabs, 'shadow-3': hasScrolled }"
    >
      <transition
        key="default-transition"
        name="input-fade"
        mode="out-in"
        @after-enter="focusMobileSearch"
      >
        <nav
          v-if="!mobileSearch"
          key="default-topbar"
          class="w-full p-4  h-14 flex justify-start items-bottom"
        >
          <GxBreadcrumb
            v-if="!mobileSearch && breadcrumb"
            key="GxBreadcrumb"
            :classes="
              hasScrolled
                ? breadcrumbClassesWithScroll
                : breadcrumbClassesWithoutScroll
            "
            :has-scrolled="hasScrolled"
          >
            <h1 class="gx-h5 font-bold">{{ title }}</h1>
          </GxBreadcrumb>
          <h1
            v-if="!mobileSearch && !breadcrumb"
            key="title-container"
            class="flex justy-left items-bottom gx-h5 font-bold items-center"
          >
            <GxIcon
              v-if="iconClickHandler"
              :icon="icon"
              html-tag="button"
              :class="[iconClasses]"
              class="mr-4"
              style="font-size: 20px;"
              @click.stop="iconClickHandler"
            />
            <GxIcon
              v-else-if="hasDrawer && !iconClickHandler"
              :icon="icon"
              html-tag="button"
              :class="[iconClasses]"
              class="mr-4"
              style="font-size: 20px;"
              @click.stop="drawerLeft = !drawerLeft"
            />
            <GxIcon
              v-else
              :icon="icon"
              :class="[iconClasses]"
              style="font-size: 20px;"
              class="mr-4"
            />
            <slot name="title">
              <span>
                {{ title }}
              </span>
            </slot>
          </h1>
          <div key="right-icons" class="flex ml-auto gx-h5 items-center">
            <slot name="topbar-right" />
            <GxIcon
              v-if="hasSearch"
              key="search-icon"
              html-tag="button"
              icon="search"
              class="icon-button focus:outline-none leading-none"
              @click="mobileSearch = true"
            />
            <GxIcon
              v-if="hasDrawerRight"
              key="right-drawer"
              html-tag="button"
              icon="more_vert"
              class="ml-4 icon-button leading-none"
              @click="drawerRight = !drawerRight"
            />
          </div>
        </nav>
        <!-- Search bar and close button -->
        <nav
          v-else
          key="search-container"
          :class="[onSearchClasses]"
          class="h-14 flex justify-left items-center gx-h5 p-4"
        >
          <button
            class="leading-none focus:outline-none mr-4 flex items-center"
          >
            <GxIcon icon="close" @click.stop="cancelMobileSearch" />
          </button>
          <input
            ref="mobileSearch"
            v-model.trim="search"
            :placeholder="placeholder"
            class="w-full focus:outline-none bg-transparent leading-none gxMobileSearchInput"
            :class="placeholderColor"
            autofocus
            type="search"
          />
        </nav>
      </transition>
      <slot name="header2"></slot>
      <div v-if="tabs" key="tabs-container">
        <slot name="tabs" />
      </div>
    </header>
    <TopBarLeftDrawer
      v-if="hasDrawer"
      key="TopBarLeftDrawer"
      :open="drawerLeft"
      :a-drawer-open="drawerOPen"
      @open="drawerOPen = true"
      @close="onCloseDrawer('drawerLeft')"
    />
    <TopBarRightDrawer
      v-if="hasDrawerRight"
      key="TopBarRightDrawer"
      :open="drawerRight"
      :a-drawer-open="drawerOPen"
      @open="drawerOPen = true"
      @close="onCloseDrawer('drawerRight')"
    />
    <div
      id="mobileMainContent"
      class="flex-grow flex flex-col"
      :class="{
        'gx-padding-menu pb-14': withPaddingBottom,
      }"
    >
      <slot v-bind="{ hasScrolled, search }" />
    </div>
  </MqLayout>
  <!-- Desktop is just a simple wrapper -->
  <div
    v-else
    :class="{ 'px-8': !noHorizontalPadding, 'pb-4': withPaddingBottom }"
    class="flex-grow flex flex-col"
  >
    <slot />
  </div>
</template>
<style lang="scss" scoped>
#layout {
  width: 100%;
  min-height: 100%;
}
#layoutDesk {
  display: grid;
  grid: 2rem auto / auto 1fr;
  min-height: 100vh;
}
.gxStickyHeight {
  height: 100vh;
}
.gxDesktopTopNav {
  grid-area: 1 / 2 / 2 / -1;
}
.gxDeAside {
  grid-area: 1 / 1 / 3 / 2;
  height: 100vh;
}
.gxDeMain {
  grid-area: 2/ 2 / -1 / -1;
}
.gx-padding-menu {
  padding-bottom: 6.375rem;
}
.gxDeStickyContainer {
  top: 0;
}
// top-bar styles

.custom-slot-enter-active,
.custom-slot-leave-active,
.input-fade-enter-active {
  transition: opacity 0.2s ease-out;
}
.input-fade-leave-active {
  transition: opacity 0.2s ease-in;
}
.input-fade-enter,
.custom-slot-enter,
.custom-slot-leave-to,
.input-fade-leave-to {
  opacity: 0;
}
.top-bar {
  transition: background 0.3s ease-out;
}
.icon-button {
  font-size: 1.25rem;
}
.gx-h5 {
  letter-spacing: 0.02rem;
}
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}
.placeholder-bg-dark::placeholder {
  color: white;
}
.placeholder-bg-white::placeholder {
  color: black;
}

.gxMobileSearchInput::placeholder {
  color: var(--gray-700);
}
</style>

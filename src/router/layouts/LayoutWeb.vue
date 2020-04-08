<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import NotificationIcon from '@components/Desktop/NotificationIcon'
import ProfileIcon from '@components/Desktop/ProfileIcon'
import TopBarLeftDrawer from '@components/_Core/Navigation/TopBar/TopBarLeftDrawer'
import TopBarRightDrawer from '@components/_Core/Navigation/TopBar/TopBarRightDrawer'
import AsideMain from '@src/router/layouts/AsideMain.vue'
import GxBreadcrumb from '@components/_Core/Navigation/TopBar/GxBreadcrumb'
export default {
  name: 'LayoutWeb',
  components: {
    TopBarLeftDrawer,
    TopBarRightDrawer,
    GxBreadcrumb,
    GxIcon,
    NotificationIcon,
    ProfileIcon,
    AsideMain,
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
      default: null,
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
      default: 'text-primary',
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
    myAccount: {
      type: Object,
      default: null,
    },
    todos: {
      type: Array,
      default: () => [],
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
  methods: {
    onCloseDrawer(drawer) {
      this[drawer] = false
      this.drawerOPen = false
    },
    cancelMobileSearch() {
      this.search = null
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
              @click.stop="iconClickHandler"
            />
            <GxIcon
              v-else-if="hasDrawer && !iconClickHandler"
              :icon="icon"
              html-tag="button"
              :class="[iconClasses]"
              class="mr-4"
              @click.stop="drawerLeft = !drawerLeft"
            />
            <GxIcon v-else :icon="icon" :class="[iconClasses]" class="mr-4" />
            <span>{{ title }}</span>
          </h1>
          <div key="right-icons" class="flex ml-auto gx-h5 items-center">
            <GxIcon
              v-if="hasSearch"
              key="search-icon"
              html-tag="button"
              icon="search"
              class="icon-button"
              @click="mobileSearch = true"
            />
            <slot name="topbar-right" />
            <GxIcon
              v-if="hasDrawerRight"
              key="right-drawer"
              html-tag="button"
              icon="more_vert"
              class="ml-4 icon-button"
              @click="drawerRight = !drawerRight"
            />
          </div>
        </nav>
        <!-- Search bar and close button -->
        <nav
          v-else
          key="search-container"
          :class="[onSearchClasses]"
          class="h-14 flex justify-left items-bottom  gx-h5 p-4"
        >
          <GxIcon
            html-tag="button"
            icon="close"
            class="mr-4"
            @click.stop="cancelMobileSearch"
          />
          <input
            ref="mobileSearch"
            v-model.trim="search"
            :placeholder="placeholder"
            class="w-full focus:outline-none bg-transparent gxInput"
            autofocus
            type="search"
          />
        </nav>
      </transition>
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
      class="flex-grow flex flex-col"
      :class="{
        'gx-padding-menu pb-14': withPaddingBottom,
      }"
    >
      <slot v-bind="{ hasScrolled, search }" />
    </div>
  </MqLayout>
  <MqLayout
    v-else
    id="layoutDesk"
    key="layoutDesk"
    mq="de"
    :class="{ gxStickyHeight: hasStickyElement }"
    class="w-screen  bg-white"
  >
    <nav
      v-if="hasTopBar"
      class="gxDesktopTopNav  gx-h5 w-full h-full flex items-center z-10  sticky top-0 bg-white  shadow-2"
      role="navigation"
    >
      <div v-if="!hasDrawer" class="flex items-center pt-4 pl-4">
        <img
          class="h-4"
          src="@src/assets/images/DE/de_logocashme.svg"
          alt="Taquito!"
        />
      </div>
      <div v-else class="flex-grow flex items-center justify-between pr-4">
        <div class="pl-4 self-stretch flex items-center de:gx-caption">
          <p
            v-if="myAccount"
            class="font-bold pr-4 mr-4 border-r border-solid border-gray-300"
            >{{
              myAccount.companies[0].company.commercialName
                ? myAccount.companies[0].company.commercialName
                : myAccount.companies[0].company.legalName
            }}</p
          >
          <p
            v-else
            class="font-bold pr-4 mr-4 border-r border-solid border-gray-300 text-transparent"
            >placeholder</p
          >
          <!-- <GxIcon icon="store" class="mr-2 text-gray-700" />
          <p class="de:gx-caption mr-2">Coyoacán</p>
          <GxIcon class="font-bold" icon="expand_more" /> -->
        </div>
        <div class="flex items-center">
          <NotificationIcon
            :active-menu="activeDeskTopBarMenu"
            class="mr-2"
            @activeMenu="onActiveMenu"
          />
          <ProfileIcon
            :my-account="myAccount"
            :active-menu="activeDeskTopBarMenu"
            @activeMenu="onActiveMenu"
          />
        </div>
      </div>
    </nav>
    <main
      v-if="hasStickyElement"
      id="gxDeMain"
      key="sticky-element"
      class="w-full gxDeMain overflow-x-hidden flex-grow flex flex-col"
      :class="{
        'pb-4': withPaddingBottom,
        'px-8': !noHorizontalPadding,
      }"
    >
      <div
        :class="{ 'shadow-6': hasScrolled }"
        class="w-full  pt-4 sticky bg-white z-10 gxDeStickyContainer"
      >
        <slot name="sticky-element" />
      </div>
      <slot />
    </main>
    <main
      v-else
      id="gxDeMainNotStickyElement"
      key="not-sticky-element"
      class="w-full flex flex-col overflow-x-hidden gxDeMain pt-4"
      :class="{
        'px-8': !noHorizontalPadding,
      }"
    >
      <slot />
    </main>
    <AsideMain class="z-1 gxDeAside" :todos="todos" />
  </MqLayout>
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
.gxInput {
  font-size: 1.125rem;
  line-height: 1.125rem;
}
</style>

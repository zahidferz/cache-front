<script>
import MenuItem from '@components/Mobile/MenuItem'
import GxShortcuts from '@components/Mobile/GxShortcuts'
import GxModal from '@components/_Core/Modals/GxModal'
export default {
  name: 'MenuBottom',
  components: {
    MenuItem,
    GxShortcuts,
    GxModal,
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fabActive: false,
      overflowHidden: false,
      myAccount: null,
      routes: null,
    }
  },
  computed: {
    fatherRoute() {
      // Clone in order to create a queue
      const matchedRoutes = this.$route.matched.slice(0)
      const length = matchedRoutes.length
      let beforeRoute
      matchedRoutes.forEach((route, index) => {
        if (!beforeRoute) {
          beforeRoute = this.routes.find(({ name, path }) => {
            return name === route.name || path === route.path
          })
        } else {
          if (index < length - 1) {
            beforeRoute =
              beforeRoute.children &&
              beforeRoute.children.find(({ name, path }) => {
                return name === route.name || path === route.path
              })
          }
        }
      })
      return beforeRoute
    },
    activeRoute() {
      return this.fatherRoute.children.find(({ name, path }) => {
        return name === this.$route.name || path === this.$route.fullPath
      })
    },
    submenus() {
      if (this.activeRoute.children && this.activeRoute.children.length > 0) {
        return this.activeRoute.children.filter(
          ({ meta }) => meta && meta.isSubmenu
        )
      }
      return this.fatherRoute.children.filter(
        ({ meta }) => meta && meta.isSubmenu
      )
    },
    menu() {
      if (this.activeRoute.children && this.activeRoute.children.length > 0) {
        return [this.activeRoute, ...this.submenus]
      }
      if (this.fatherRoute.name !== 'web') {
        return [this.fatherRoute, ...this.submenus]
      }
      return this.submenus
    },
    activeRouteShortcuts() {
      return this.activeRoute.meta.shortcuts
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.fabActive = false
      },
    },
  },
  created() {
    this.routes = this.$router.options.routes
  },
  methods: {
    showShortcuts() {
      if (this.activeRouteShortcuts.length === 1) {
        this.$router.push({ name: this.activeRoute.meta.shortcuts[0].to.name })
      } else {
        this.fabActive = !this.fabActive
      }
    },
    findARouteTree(matchedRoutes) {
      let tree = this.routes
      let target
      const names = matchedRoutes.map(({ name }) => name)
      names.forEach((name, index) => {
        if (index > 0) {
          target = tree.submenus.find((route) => route.to.name === name)
        } else {
          // Initial state this.routes =[{to{name:web},submenus:[]}]
          target = tree.find((route) => route.to.name === name)
        }
        if (target) {
          tree = target
        }
      })
      return tree
    },
  },
}
</script>
<template>
  <nav
    :class="{ 'z-BottomMenu': fabActive }"
    class="w-full fixed bottom-0 bg-gray-100 gxBottomNav shadow-9 flex justify-between"
  >
    <GxModal v-if="fabActive" />
    <transition-group
      name="list-demo"
      tag="ul"
      class="flex justify-start items-end w-full h-full justify-start menu-container"
    >
      <MenuItem
        v-for="route in menu"
        :key="route.redirect ? `r-${route.redirect.name}` : route.name"
        :title="route.meta && route.meta.title"
        :icon="route.meta && route.meta.icon"
        :status-icon="route.meta && route.meta.statusIcon"
        :status-icon-color="route.meta && route.meta.statusIconColor"
        :background="route.meta && route.meta.statusBg"
        :status-text="route.meta && route.meta.statusText"
        :to="route.redirect ? route.redirect : { name: route.name }"
        :todos="todos"
      />
    </transition-group>
    <!-- <div class="flex justify-start items-end h-full justify-start">
      <MenuItemIntercom />
    </div> -->
    <div
      :class="{ 'overflow-hidden': overflowHidden }"
      class="fixed  flex flex-col justify-end items-end gxMoMenu"
    >
      <transition
        name="shortcut"
        @before-enter="overflowHidden = true"
        @after-enter="overflowHidden = false"
        @before-leave="overflowHidden = true"
        @after-leave="overflowHidden = false"
      >
        <GxShortcuts v-if="fabActive" :shortcuts="activeRouteShortcuts" />
      </transition>
      <GxFab
        v-if="activeRouteShortcuts"
        mini
        label="atajos"
        class=" shadow-5 z-10 outline-none focus:outline-none gxMoFab"
        :class="{ 'rotate-45deg': fabActive }"
        @click.stop="showShortcuts"
      />
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.menu-container {
  width: calc(
    100% - 50px - 16px - 8px - 48px
  ); // -48px to leave space for intercom chat icon
}
.gxBottomNav {
  height: 3.375rem;
}
.gxMoMenu {
  right: 1rem;
  bottom: 1.8125rem;
}
.gxMoFab {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  transition: transform 0.3s ease-in;
}
.gx-padding {
  padding-right: 1.3125rem;
  padding-bottom: 5.4375rem;
}
.rotate-45deg {
  transform: rotate(-45deg);
}
.gx-menu-label {
  font-size: 14px;
  line-height: 14px;
}
.shortcut-enter-active {
  transition: all 0.3s ease-out;
}
.shortcut-leave-active {
  transition: all 0.3s ease-in;
}
.shortcut-enter,
.shortcut-leave-to {
  opacity: 0;
  transform: translateY(30%);
}
</style>

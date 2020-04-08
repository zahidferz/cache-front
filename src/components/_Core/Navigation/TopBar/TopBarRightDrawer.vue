<script>
import MenuProfile from '@components/Profile/MenuProfile'
export default {
  components: {
    MenuProfile,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    aDrawerOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: null,
      // Handle menu drag to open
      isOpen: false,
      startX: null,
      startY: null,
      lastPositionY: null,
      lastPositionX: null,
      endY: null,
      endX: null,
      touchHandler: false,
      ongoingTouches: [],
      initialWidth: 0,
      width: 0,
      maxWidth: 0,
    }
  },
  watch: {
    open(newValue) {
      if (newValue) {
        this.openDrawer()
      } else {
        this.hideDrawer()
      }
    },
  },
  created() {
    // Handle drag to open
    window.addEventListener('resize', this.reset)
    // Drag menu out for mobile devices
    document.addEventListener('touchstart', this.handleStart, {
      passive: false,
    })
    document.addEventListener('touchmove', this.handleMove, { passive: false })
    document.addEventListener('touchend', this.handleEnd, { passive: false })
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.reset)
      // Drag menu out for mobile devices
      document.removeEventListener('touchstart', this.handleStart)
      document.removeEventListener('touchmove', this.handleMove)
      document.removeEventListener('touchend', this.handleEnd)

      // make sure to remove any scrolling lock from opening the drawer
      document.body.style.overflow = ''
    })
  },
  methods: {
    reset(close = true) {
      this.startX = null
      this.startY = null
      this.lastPositionY = null
      this.lastPositionX = null
      this.endY = null
      this.endX = null
      this.touchHandler = false
      if (close) {
        this.close()
      }
    },
    openDrawer() {
      const drawer = document.getElementById('drawerRight')
      this.lastPositionX = drawer.clientWidth
      document.body.style.overflow = 'hidden'
      this.$emit('open')
    },
    hideDrawer() {
      document.body.style.overflow = ''
      this.reset()
    },
    close() {
      this.$emit('close')
    },
    switchSubmenu(index) {
      this.$refs[`submenu${index}`][0].scrollIntoView({
        behavior: 'smooth',
      })
      this.activeSubmenu = index
    },
    // Handle swipe to open
    handleStart(evt) {
      const drawer = document.getElementById('drawerRight')
      if (drawer && drawer.contains(evt.target)) {
        return
      }
      if (evt.target.id === 'drawerRightBg') {
        evt.preventDefault()
        this.reset()
        return
      }
      this.reset(false)
      if (this.aDrawerOpen) {
        return
      }
      this.startX = evt.changedTouches[0].pageX
      this.startY = evt.changedTouches[0].pageY
    },
    handleMove(evt) {
      if (this.aDrawerOpen) {
        return
      }
      this.touchHandler = true
      const drawer = document.getElementById('drawerRight')
      if (drawer && drawer.contains(evt.target)) {
        return
      }
      if (evt.target.id === 'drawerRightBg') {
        evt.preventDefault()
        this.reset()
        return
      }
      const x = evt.changedTouches[0].pageX
      const y = evt.changedTouches[0].pageY
      const deltaX = this.startX - x
      const deltaY = y - this.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        this.reset()
        return
      }
      this.lastPositionX =
        deltaX > drawer.clientWidth ? drawer.clientWidth : deltaX
      this.lastPositionY = deltaY
      this.touchHandler = false
    },
    handleEnd(evt) {
      if (this.aDrawerOpen) {
        return
      }
      const drawer = document.getElementById('drawerRight')
      if (drawer && drawer.contains(evt.target)) {
        return
      }
      if (evt.target.id === 'drawerRightBg') {
        evt.preventDefault()
        this.reset()
        return
      }
      const x = evt.changedTouches[0].pageX
      const y = evt.changedTouches[0].pageY
      const deltaX = this.startX - x
      const deltaY = y - this.startY
      if (
        Math.abs(deltaY) > Math.abs(deltaX) ||
        this.startX < x ||
        deltaX < drawer.clientWidth / 2
      ) {
        this.reset()
        return
      }
      this.lastPositionX = drawer.clientWidth
      this.$emit('open')
      this.lastPositionY = deltaY
    },
  },
}
</script>
<template>
  <div class="z-50">
    <transition name="delay">
      <div
        v-if="lastPositionX && lastPositionX > 0"
        id="drawerRightBg"
        key="bg-drawer"
        class="fixed bg-black opacity-75 w-screen h-screen left-0  bottom-0 top-0"
      ></div>
    </transition>
    <aside
      id="drawerRight"
      ref="drawerRight"
      class="drawerRight flex flex-col justify-between overflow-hidden relative bg-white de:px-2 pt-4"
      :class="{ swipe: touchHandler }"
      :style="
        lastPositionX
          ? `transform:translateX(calc(100% - ${lastPositionX}px))`
          : 'transform:translateX(100%)'
      "
    >
      <div class="flex-grow flex flex-col pb-8 overflow-y-auto">
        <MenuProfile />
      </div>
    </aside>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable */
.gxDrawerNavigation {
  right: 0;
  bottom: 0;
  left: 0;
}

.drawerRight {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  width: calc(100% - 2rem);
  transition: transform 0.3s ease-out;
  transform: translateX(100%);
  transform-origin: left;
}

@media screen and (min-width: 769px) {
  .drawerRight {
    min-width: 300px;
  }
}
.gx-navigation-icons i {
  font-size: 1rem;
}
.left-submenus-container {
  display: flex;
  height: 100%;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.left-submenus-container ul {
  flex-shrink: 0;
  scroll-snap-align: center;
  height: 100%;
}
.left-submenus-container {
  -ms-overflow-style: none; // IE 10+
  scrollbar-width: none; // Firefox
}
.left-submenus-container::-webkit-scrollbar {
  display: none; // Safari and Chrome
}
.delay-enter-active {
  transition: opacity 0.25s 0.1s;
}
.delay-enter {
  opacity: 0;
}
.swipe {
  transition: transform 0.05s linear;
}

@media (orientation: landscape) {
  .drawerRight {
    overflow-y: auto;
  }
}
</style>

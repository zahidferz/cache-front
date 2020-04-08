<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import SubmenuTodos from './LeftDrawerSubmenus/SubmenuTodos'
import SubmenuNotifications from './LeftDrawerSubmenus/SubmenuNotifications'
import SubmenuBranches from './LeftDrawerSubmenus/SubmenuBranches'
import GxModal from '@components/_Core/Modals/GxModal'
export default {
  components: {
    GxIcon,
    GxAvatar,
    SubmenuTodos,
    SubmenuBranches,
    SubmenuNotifications,
    GxModal,
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
      image: require('@src/assets/images/UNASSIGNED/exitRegister.svg'),
      imageTwo: require('@src/assets/images/UNASSIGNED/exitRegister.svg'),
      activeSubmenu: 0,
      // submenus: ['SubmenuNotifications', 'SubmenuTodos', 'SubmenuBranches'],
      submenus: ['SubmenuNotifications'],
      error: null,
      // Handle menu drag to open
      isOpen: false,
      startX: null,
      startY: null,
      lastPositionY: null,
      lastPositionX: null,
      endY: null,
      endX: null,
      ongoingTouches: [],
      initialWidth: 0,
      width: 0,
      maxWidth: 0,
      touchHandler: false,
      openDrawerInternal: this.openDrawer,
      closing: false,
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
    // Drag menu out for mobile devices
    window.addEventListener('resize', this.reset)
    document.addEventListener('touchstart', this.handleStart, {
      passive: false,
    })
    document.addEventListener('touchend', this.handleEnd, { passive: false })
    document.addEventListener('touchmove', this.handleMove, { passive: false })
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.reset)
      // Drag menu out for mobile devices
      document.removeEventListener('touchstart', this.handleStart)
      document.removeEventListener('touchmove', this.handleMove)
      document.removeEventListener('touchend', this.handleEnd)
    })
  },
  mounted() {
    // Detect submenu changes via scroll to update active submenu icon
    const options = {
      root: document.querySelector('#submenusContainer'),
      rootMargin: '0px',
      threshold: 0.7,
    }
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSubmenu = Number(entry.target.dataset.submenuindex)
        }
      })
    }
    const observer = new IntersectionObserver(callback, options)
    for (let index = 0; index < this.submenus.length; index++) {
      const element = this.$refs[`submenu${index}`][0]
      observer.observe(element)
    }
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
        this.closing = true
        setTimeout(() => {
          this.closing = false
        }, 300)
      }
    },
    openDrawer() {
      const drawer = document.getElementById('drawerRight')
      this.lastPositionX = drawer.clientWidth
      this.$emit('open')
    },
    hideDrawer() {
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
      // evt.preventDefault()
      if (this.closing) return

      const drawer = document.getElementById('drawerLeft')
      if (drawer && drawer.contains(evt.target)) {
        return
      }
      if (evt.target.id === 'drawerLeftBg') {
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
      if (this.closing) return

      if (this.aDrawerOpen) {
        return
      }
      this.touchHandler = true
      const drawer = document.getElementById('drawerLeft')
      if (drawer && drawer.contains(evt.target)) {
        return
      }
      if (evt.target.id === 'drawerLeftBg') {
        evt.preventDefault()
        this.reset()
        return
      }
      const x = evt.changedTouches[0].pageX
      const y = evt.changedTouches[0].pageY
      const deltaX = x - this.startX
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
      if (this.closing) return

      if (this.aDrawerOpen) {
        return
      }
      const drawer = document.getElementById('drawerLeft')
      if (drawer && drawer.contains(evt.target)) {
        return
      }
      if (evt.target.id === 'drawerLeftBg') {
        evt.preventDefault()
        this.reset()
        return
      }
      const x = evt.changedTouches[0].pageX
      const y = evt.changedTouches[0].pageY
      const deltaX = x - this.startX
      const deltaY = y - this.startY

      if (
        Math.abs(deltaY) > Math.abs(deltaX) ||
        x < this.startX ||
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
        id="drawerLeftBg"
        key="bg-drawer"
        class="fixed bg-black opacity-75 w-screen h-screen right-0 z-10 bottom-0 top-0"
      ></div>
    </transition>
    <aside
      id="drawerLeft"
      ref="drawerLeft"
      key="drawerLeft"
      style="touch-action: none"
      class="drawerLeft flex flex-col justify-between overflow-hidden  bg-white"
      :class="{ swipe: touchHandler }"
      :style="
        lastPositionX
          ? `transform:translateX(calc(${lastPositionX}px - 100%))`
          : 'transform:translateX(-100%)'
      "
    >
      <div
        id="submenusContainer"
        class="flex-grow flex left-submenus-container"
        :class="{ 'mb-12': submenus.length > 1 }"
      >
        <div
          v-for="(submenu, index) in submenus"
          :ref="`submenu${index}`"
          :key="index"
          class="w-full flex-shrink-0"
          :style="`background-color: red;`"
          :data-submenuIndex="index"
        >
          <component :is="submenu" class="left-submenu" />
        </div>
      </div>
      <div
        v-if="submenus.length > 1"
        class="flex justify-center items-center gx-navigation-icons absolute gxDrawerNavigation"
      >
        <template v-for="(submenu, index) in submenus">
          <i
            v-if="index === activeSubmenu"
            :key="index"
            class="material-icons-round px-1 text-primary cursor-pointer"
            @click="switchSubmenu(index)"
          >
            radio_button_checked
          </i>
          <i
            v-else
            :key="index"
            style="font-size: 8px"
            class="material-icons-round px-1 text-secondary-300 cursor-pointer "
            @click="switchSubmenu(index)"
          >
            lens
          </i>
        </template>
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
  height: 3rem;
  background-color: var(--white);
}

.drawerLeft {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  width: calc(100% - 2rem);
  touch-action: none;
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  transform-origin: right;
}

@media screen and (min-width: 769px) {
  .drawerLeft {
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
.left-submenus-container .left-submenu {
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
.gx-drawer-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  content: ' ';
  background-color: var(--black);
  opacity: 0.75;
}

.delay-enter-active {
  transition: opacity 0.5s 0.1s;
}
.delay-enter {
  opacity: 0;
}
.swipe {
  transition: transform 0.05s linear;
}

@media (orientation: landscape) {
  .drawerLeft {
    overflow-y: auto;
  }
}
</style>

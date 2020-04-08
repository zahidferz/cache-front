<script>
import NavBarLeftMenu from './NavBarLeftMenu.vue'
import GxIcon from '@src/components/_Core/Icons/GxIcon.vue'
export default {
  components: { NavBarLeftMenu, GxIcon },
  data() {
    return {
      leftMenuIsOpen: false,
      rightMenuIsOpen: false,
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Home',
          icon: 'cloud_upload',
          routerLink: { name: 'home' },
        },
        {
          name: 'company',
          title: 'company',
          icon: 'arrow_forward',
          routerLink: { name: 'company' },
        },
      ],
      loggedInNavRoutes: [],
      loggedOutNavRoutes: [],
    }
  },
  computed: {
    rightMenuLinks() {
      return [...this.persistentNavRoutes, ...this.loggedInNavRoutes]
    },
  },
  watch: {
    leftSubmenuActive(newVal, prevVal) {
      this.leftSubmenuTransition =
        newVal < prevVal ? 'submenu-slide-left' : 'submenu-slide-right'
    },
  },
  methods: {
    toggleBurgerMenu() {
      this.navMenuIsOpen = !this.navMenuIsOpen
    },
    toggleLeftMenu() {
      this.leftMenuIsOpen = !this.leftMenuIsOpen
    },
    // closeDrawerLeft: function(event) {
    //   if (this.leftMenuIsOpen) {
    //     this.leftMenuIsOpen = false
    //   }
    // },
    closeDrawerRight: function(event) {
      if (this.rightMenuIsOpen) {
        this.rightMenuIsOpen = false
      }
    },
  },
}
</script>

<template>
  <nav
    class="h-14 bg-primary-500 flex justify-between items-center"
    role="navigation"
  >
    <!-- Left Menu -->
    <a
      class="h-12 w-12 flex justify-center items-center cursor-pointer"
      @click.stop.prevent="toggleLeftMenu"
    >
      <GxIcon class="flex text-white" icon="menu" icon-size="1.25" />
      <!-- Left Drawer -->
    </a>
    <transition name="slide-left">
      <NavBarLeftMenu v-if="leftMenuIsOpen" @close="leftMenuIsOpen = false" />
    </transition>

    <!-- Right Menu -->
    <a
      class="h-12 w-12 flex justify-center items-center cursor-pointer"
      @click="rightMenuIsOpen = !rightMenuIsOpen"
    >
      <GxIcon class="text-white" icon="more_vert" />
      <!-- Right Drawer -->
      <!-- <transition name="slide-right">
        <aside
          v-if="rightMenuIsOpen"
          id="drawerRight"
          class="drawerRight bg-white"
          :class="{ drawerRightIsActive: rightMenuIsOpen }"
        >
          <ul>
            <li>
              <div class="p-4 bg-secondary-300">
                <img
                  class="w-16 h-16 mb-3 rounded-full"
                  src="https://gestionix.com/img/gservice_mon.svg"
                  alt=""
                />
                <p class="font-bold">John Doe</p>
                <p>john@doe.com</p>
              </div>
            </li>
            <template v-if="rightMenuLinks">
              <li v-for="link in rightMenuLinks" :key="link.name">
                <RouterLink
                  v-if="link.routerLink"
                  :to="link.routerLink"
                  class="flex items-center justify-center w-full text-center p-4 border-b"
                  href="#"
                >
                  <i class="material-icons absolute left-0 pl-4">
                    {{ link.icon }} </i
                  >{{ link.name }}
                </RouterLink>
                <a
                  v-else
                  class="flex items-center justify-center w-full text-center p-4 border-b"
                  href="#"
                >
                  <i class="material-icons absolute left-0 pl-4">
                    {{ link.icon }} </i
                  >{{ link.name }}
                </a>
              </li>
            </template>
          </ul>
        </aside>
      </transition> -->
    </a>
  </nav>
</template>
<style scoped lang="scss">
.drawerRight {
  position: fixed;
  top: 0;
  right: -80%;
  bottom: 0;
  z-index: 5;
  // min-width: 80%;
  // max-width: 80%;
  // width: 100%;
}
.drawerRightIsActive {
  right: 0;
}

@media screen and (min-width: 769px) {
  .drawerLeft,
  .drawerRight {
    min-width: 300px;
  }
}
// Slide animations
/* stylelint-disable */
.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-left-enter-active {
  transition: 0.3s;
}
.slide-right-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}
.slide-left-enter {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}
</style>

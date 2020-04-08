<script>
import GxIcon from '@components/_Core/Icons/GxIcon'

export default {
  name: 'AsideMainMenu',
  components: {
    GxIcon,
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      openSubmenu: '',
    }
  },
  computed: {
    activeRouteName() {
      return this.$route.name
    },
    menu() {
      return {
        dashboard: {
          title: 'Dashboard',
          to: { name: 'dashboard' },
          icon: 'dashboard',
          isActive: this.$route.name === 'dashboard',
        },
        ventas: {
          title: 'Ventas',
          to: { name: 'sales' },
          icon: 'local_offer',
          isActive: this.$route.name === 'salesDashboard',
          path: 'web/ventas',
          isOpen: this.openSubmenu === 'ventas',
          children: [
            {
              title: 'Mis clientes',
              to: { name: 'myclients' },
              icon: 'contacts',
              path: 'clientes/',
            },
            // {
            //   title: 'Cobros',
            //   to: { name: 'payments' },
            //   icon: 'attach_money',
            //   iconRounded: true,
            //   isActive: this.$route.fullPath.includes('cobros'),
            // },
            // {
            //   title: 'Facturas',
            //   to: { name: 'invoices' },
            //   icon: 'receipt',
            //   isActive: this.$route.fullPath.includes('facturas'),
            // },
            // {
            //   title: 'Categorías',
            //   to: { name: 'categories', query: { list: true } },
            //   icon: 'dvr',
            //   isActive: this.$route.fullPath.includes('categorias'),
            // },
          ],
        },
        // banco: {
        //   title: 'Banco',
        //   to: { name: 'dashboard' },
        //   icon: 'credit_card',
        //   isActive: this.$route.fullPath.includes('banco'),
        // },
      }
    },
  },
  methods: {
    someChildrenIsActive(menuItem) {
      if (!menuItem.children) {
        return menuItem.to.name === this.$route.name
      }
      return menuItem.children.some((child) =>
        this.$route.fullPath.includes(child.path)
      )
    },
    onClickMenuItem(menuItem) {
      this.openSubmenu =
        this.openSubmenu === menuItem.title ? '' : menuItem.title
    },
  },
}
</script>
<template>
  <ul class="py-2">
    <!-- <li
      class="mb-4 gx-menu-item"
      :class="{
        'gx-menu-item--active': false
      }"
    >
      <RouterLink class="flex items-center mb-4" :to="{name: 'dashboard'}">
        <GxIcon icon="dashboard" :class="{'text-primary': false}" />
        <span class="mx-2 font-bold">Dashboard</span>
      </RouterLink>
    </li> -->
    <template v-for="menuItem in menu">
      <li :key="menuItem.name">
        <RouterLink
          :to="menuItem.to"
          class="flex items-center gx-menu-item pl-4 py-2 group hover:bg-gray-200"
          :class="{
            'group-hover:text-primary-600':
              !menuItem.isActive && !someChildrenIsActive(menuItem),
            'gx-menu-item--active': menuItem.isActive,
          }"
        >
          <GxIcon
            class="z-1"
            :icon="menuItem.icon"
            :class="{
              'group-hover:text-primary-600': !menuItem.isActive,
              'text-primary': menuItem.isActive,
              'text-black':
                someChildrenIsActive(menuItem) && !menuItem.isActive,
              'text-gray-700':
                !menuItem.isActive && !someChildrenIsActive(menuItem),
            }"
          />
          <span
            v-if="!isCollapsed"
            class="mx-2"
            :class="{
              'hover:bg-gray-200 group-hover:text-primary-600':
                !menuItem.isActive && !someChildrenIsActive(menuItem),
              'gx-menu-item--active font-bold': menuItem.isActive,
            }"
          >
            {{ menuItem.title }}
          </span>
          <span
            v-if="isCollapsed"
            class="text-center text-black px-2 shadow-3 rounded bg-white de:gx-caption hidden group-hover:block "
            style=" position: absolute; left: 47px; min-width:4.4rem; white-space: nowrap;"
          >
            {{ menuItem.title }}
          </span>
          <GxIcon
            v-if="menuItem.children"
            :class="{ 'group-hover:text-primary-600': !menuItem.isActive }"
            :icon="
              menuItem.isActive || someChildrenIsActive(menuItem)
                ? 'arrow_drop_up'
                : 'arrow_right'
            "
            @click.native="onClickMenuItem(menuItem)"
          />
        </RouterLink>
        <template v-if="menuItem.isActive || someChildrenIsActive(menuItem)">
          <li
            v-for="submenuItem in menuItem.children"
            :key="submenuItem.title"
            class="relative py-2 hover:bg-gray-200"
            :class="{
              'hover:bg-gray-100 hover:text-primary-600': !someChildrenIsActive(
                submenuItem
              ),
              'text-gray-700': !someChildrenIsActive(submenuItem),
              'gx-submenu-item--active text-secondary': someChildrenIsActive(
                submenuItem
              ),
            }"
          >
            <RouterLink
              class="flex items-center gx-menu-item group gx-submenu-item"
              :class="{
                'gx-submenu-item--collapsed': isCollapsed,
                'justify-center': isCollapsed,
                'gx-submenu-item--active': someChildrenIsActive(submenuItem),
              }"
              :to="submenuItem.to"
            >
              <GxIcon
                :class="{
                  'ml-8': !isCollapsed,
                  'mr-2': !isCollapsed,
                  'rounded-full text-white': submenuItem.iconRounded,
                  'text-primary': someChildrenIsActive(submenuItem),
                  'bg-gray-500 group-hover:bg-secondary':
                    submenuItem.iconRounded &&
                    !someChildrenIsActive(submenuItem),
                  'bg-primary':
                    submenuItem.iconRounded &&
                    someChildrenIsActive(submenuItem),
                }"
                :icon="submenuItem.icon"
              />
              <span
                v-if="!isCollapsed"
                :class="{
                  'text-black font-bold': someChildrenIsActive(submenuItem),
                }"
                >{{ submenuItem.title }}</span
              >
              <span
                v-if="isCollapsed"
                class="text-center text-black px-2 shadow-3 rounded bg-white de:gx-caption hidden group-hover:block"
                style=" position: absolute; left: 48px; min-width: 4.5rem; white-space: nowrap;"
              >
                {{ submenuItem.title }}
              </span>
            </RouterLink>
          </li>
        </template>
      </li>
    </template>
  </ul>
</template>
<style lang="scss" scoped>
.gx-menu-item {
  // height: 0.625rem;
  line-height: 0.75rem;
}
.gx-menu-item--active > i:first-of-type {
  position: relative;
}
.gx-menu-item--active > i:first-of-type::before {
  position: absolute;
  left: -16px;
  width: 4px;
  height: 100%;
  content: ' ';
  border-left: 4px solid var(--primary);
}
.gx-submenu-item--active > i:first-of-type {
  position: relative;
}
.gx-submenu-item--active > i:first-of-type::before {
  position: absolute;
  left: -32px;
  width: 4px;
  height: 100%;
  content: ' ';
  border-left: 4px solid var(--primary);
}
.gx-submenu-item--active.gx-submenu-item--collapsed > i:first-of-type::before {
  left: -16px;
}
.gx-menu-item--active.gx-is-collapsed {
  // left: -8px;
  // padding-left: 12px;
}
.gx-submenu-item--active {
  color: var(--secondary);
}
// .gx-submenu-icon-mobile {
//   position: absolute;
//   top: 5px;
//   left: 30px;
// }
// .gxArrowRight {
//   top: 24%;
//   right: 40%;
// }
// .gxArrowDown {
//   top: 8px;
//   right: 40%;
// }
</style>

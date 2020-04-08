<script>
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxDivider from '@components/_Core/Dividers/GxDivider'
import AsideMainMenu from './AsideMainMenu'
import { COMPANY_INFO, LOCAL_COMPANY } from '@src/apollo/queries'
import { version } from '@/package.json'
import GxLoader from '@components/_Core/Utils/GxLoader'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'

export default {
  name: 'AsideMain',
  components: {
    GxIcon,
    AsideMainMenu,
    GxDivider,
    GxLoader,
    GxAvatar,
  },
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  apollo: {
    company: {
      query: LOCAL_COMPANY,
    },
    myAccount: {
      query: COMPANY_INFO,
      variables() {
        return {
          companyNumber: this.company.number,
        }
      },
      skip() {
        return !this.company
      },
      error(error) {
        /* eslint-disable */
        console.error('Error:AsideMain', error)
        /* eslint-enable */
        // this.error = error.message
      },
    },
  },
  data() {
    return {
      company: null,
      packageVersion: version,
      isCollapsed: false,
      companyFallbackImage: require('@src/assets/images/Dashboard/laselvita_logo.svg'),
      myAccount: null,
    }
  },
  computed: {
    avatarBackgroundColor() {
      return `bg-avatar-${
        this.myAccount ? this.myAccount.companies[0].company.color : 0
      }`
    },
    companyNameInitials() {
      let names
      let initials
      if (!this.myAccount.companies[0].company.commercialName) {
        return ''
      }
      if (this.myAccount.companies[0].company.commercialName[0]) {
        names = this.myAccount.companies[0].company.commercialName.split(' ')
      } else {
        names = this.myAccount.companies[0].company.legalName.split(' ')
      }
      initials = names[0][0]
      if (names[1]) {
        initials += `${names[1][0]}`
      }
      initials = initials.toUpperCase()
      return initials
    },
    comparteYGanaIsActive() {
      return this.$route.fullPath.includes('comparte y gana')
    },
    pendientesIsActive() {
      return this.$route.fullPath.includes('pendientes')
    },
    todosWithItems() {
      if (this.todos && this.todos.length > 0) {
        const todosWithItems = this.todos.filter(({ items }) => {
          return items.length > 0
        })
        return todosWithItems.length > 999 ? '+999' : todosWithItems.length
      }
      return null
    },
  },
  watch: {
    isCollapsed(newVal) {
      this.$emit('collapse', newVal)
    },
  },
  mounted() {
    if (window && window.innerWidth < 1000) {
      this.isCollapsed = true
    }
  },
  methods: {
    openNewIntercomMessage() {
      this.$intercom.showNewMessage()
    },
  },
}
</script>
<template>
  <aside
    class="bg-gray-100 flex flex-col justify-between sticky h-full z-10 left-0 top-0 py-4"
    :class="{
      'w-38': !isCollapsed,
      'w-11': isCollapsed,
    }"
  >
    <!-- Company info -->
    <button
      style="position: absolute; top: 80px; right: -12px;"
      class="flex justify-center items-center  absolute shadow-9 rounded-full w-6 h-6 text-base bg-gray-700"
      @click="isCollapsed = !isCollapsed"
    >
      <GxIcon
        :icon="isCollapsed ? 'menu' : 'keyboard_arrow_left'"
        class=" text-white"
      />
    </button>
    <div class="flex-grow">
      <div
        class="flex flex-col items-center px-4"
        :class="{
          'mb-4': !isCollapsed,
          'mb-17': isCollapsed,
        }"
      >
        <GxAvatar
          v-if="myAccount.companies[0].company.companyLogo"
          shape="max-circle"
          :class="{
            'w-20 h-20': !isCollapsed,
            'w-7 h-7': isCollapsed,
          }"
          :color="myAccount.companies[0].company.color"
          :avatar-img="
            myAccount.companies[0].company.companyLogo +
              `?${new Date().getTime()}`
          "
        />
        <GxLoader v-else-if="$apollo.queries.myAccount.loading" />
        <GxAvatar
          v-else
          shape="max-circle"
          class="text-white font-bold shadow-2 rounded-full bg-primary"
          :class="[
            {
              'w-20 h-20 gx-h3 ': !isCollapsed,
              'w-7 h-7': isCollapsed,
            },
            avatarBackgroundColor,
          ]"
        >
          {{ companyNameInitials }}
        </GxAvatar>
      </div>
      <div class="px-4 pb-2">
        <GxDivider class="border-gray-300" />
      </div>
      <RouterLink
        :to="{ name: 'todos' }"
        class="flex items-center px-4 group hover:bg-gray-200 relative py-2"
        :class="{
          'justify-center': isCollapsed,
          'gx-menu-item--active': pendientesIsActive,
        }"
      >
        <div
          :class="{
            'mr-2': !isCollapsed,
            'group-hover:text-primary-600 text-gray-700': !pendientesIsActive,
            'text-primary-500 ': pendientesIsActive,
          }"
          class="relative flex items-center justify-center "
        >
          <GxIcon icon="report_problem" />
          <div
            v-if="isCollapsed && todosWithItems"
            style="transform: translate(50%,-50%)"
            class="absolute border border-white bg-alert rounded-full w-2 h-2 flex justify-center items-center"
          >
            <div style="width:2px; height:2px" class="rounded-full bg-white">
            </div>
          </div>
        </div>
        <span
          v-if="!isCollapsed"
          :class="{
            'group-hover:text-primary-600': !pendientesIsActive,
            'font-bold': pendientesIsActive,
          }"
        >
          Pendientes
        </span>
        <span
          v-if="!isCollapsed"
          class="text-alert font-bold justify-end ml-auto"
          >{{ todosWithItems ? todosWithItems : null }}</span
        >
        <span
          v-if="isCollapsed"
          class="text-center px-2 shadow-3 rounded bg-white de:gx-caption hidden group-hover:block"
          style=" position: absolute; left: 47px; min-width: 4.5rem; white-space: nowrap;"
        >
          Pendientes
          <span class="text-alert font-bold">{{
            todosWithItems ? todosWithItems : null
          }}</span>
        </span>
      </RouterLink>
      <div class="px-4 pt-2">
        <GxDivider class="border-gray-300" />
      </div>
      <AsideMainMenu :is-collapsed="isCollapsed" />
      <div class="px-4">
        <GxDivider class="border-gray-300" />
      </div>
      <!-- <ul class="mx-4">
        <li class="relative group py-2 hover:bg-gray-200">
          <a
            href="#"
            class="flex items-center"
            :class="{ 'justify-center': isCollapsed }"
          >
            <GxIcon
              class="text-gray-700"
              :class="{
                'mr-2': !isCollapsed,
                'group-hover:text-primary-600': !comparteYGanaIsActive.isActive,
                'text-primary': comparteYGanaIsActive.isActive,
                'text-black':
                  comparteYGanaIsActive.childIsActive &&
                  !comparteYGanaIsActive.isActive,
                'text-gray-700':
                  !comparteYGanaIsActive.isActive &&
                  !comparteYGanaIsActive.childIsActive,
                'text-primary-500': pendientesIsActive,
              }"
              icon="card_giftcard"
            />
            <span
              v-if="!isCollapsed"
              :class="{
                'group-hover:text-primary-600': !pendientesIsActive,
              }"
            >
              Comparte y gana
            </span>
            <span
              v-if="isCollapsed"
              class="text-center px-2 shadow-3 rounded bg-white de:gx-caption hidden group-hover:block"
              style=" position: absolute; left: 32px; min-width: 4.5rem; white-space: nowrap;"
            >
              Comparte y gana
            </span>
          </a>
        </li>
      </ul> -->
    </div>
    <!-- Gestionix Logo -->
    <div class="flex justify-center items-center">
      <img
        v-if="isCollapsed"
        class="h-4"
        src="@src/assets/images/Logos/chain592.svg"
        alt="Logo"
      />
      <img
        v-else
        class="w-21"
        src="@src/assets/images/Logos/black.svg"
        :title="packageVersion"
        alt="logo"
      />
    </div>
  </aside>
</template>
<style lang="scss" scoped>
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
.gx-submenu-icon-mobile {
  // position: absolute;
  right: -16px;
}
</style>

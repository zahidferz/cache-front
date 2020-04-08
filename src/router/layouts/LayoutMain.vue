<script>
import TopBar from '@components/_Core/Navigation/TopBar/TopBar'
import GxIcon from '@components/_Core/Icons/GxIcon'
import GxAvatar from '@components/_Core/Avatars/GxAvatar'
import gql from 'graphql-tag'

export default {
  name: 'LayoutMain',
  components: { TopBar, GxIcon, GxAvatar },
  props: {
    dark: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
    hasDrawer: {
      type: Boolean,
      default: false,
    },
    hasDrawerRight: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    iconClickHandler: {
      type: Function,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
  },
  apollo: {
    myAccount: {
      query: gql`
        {
          myAccount {
            userNumber
            firstName
            lastName
            companies {
              company {
                companyNumber
                commercialName
                legalName
              }
            }
          }
        }
      `,
      error(error) {
        console.error('Error: ', error)
        this.error = error.message
      },
      skip() {
        return !this.loggedIn || this.skipQuery
      },
    },
  },
  data() {
    return {
      hasScrolled: false,
      search: '',
      loggedIn: false,
    }
  },
  computed: {
    hasTopBar() {
      return this.title || this.icon || this.iconRight || this.hasDrawer
    },
    skipQuery() {
      return [
        'welcome',
        'login',
        'signupName',
        'signupLastname',
        'signupEmail',
        'signupPhone',
        'passwordrecovery',
        'mailrecovery',
        'changepassword',
        'signupPassword',
      ].includes(this.$route.name)
    },
  },
  reactiveProvide: {
    name: 'topBarSearch',
    include: ['search'],
  },
  mounted() {
    this.loggedIn = localStorage.loggedIn
      ? JSON.parse(localStorage.loggedIn)
      : false
    let lastKnownScrollPosition = 0
    let ticking = false

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
  },
}
</script>

<template>
  <div
    v-if="$mq === 'mo'"
    id="layout"
    class="flex-grow flex flex-col"
    :class="{ 'bg-primary': dark, 'bg-white': !dark }"
  >
    <TopBar
      v-if="
        hasTopBar && (!hasScrolled || !$route.fullPath.includes('tecuidamos'))
      "
      v-model="search"
      :title="title"
      :icon="icon"
      :icon-click-handler="iconClickHandler"
      :icon-right="iconRight"
      :dark="dark"
      :scrolled="hasScrolled"
      :has-search="hasSearch"
      :has-drawer="hasDrawer"
      :has-drawer-right="hasDrawerRight"
    />
    <div
      class="flex flex-grow flex-col justify-center overflow-auto"
      :class="{
        'pt-14':
          hasTopBar &&
          (!hasScrolled || !$route.fullPath.includes('tecuidamos')),
        'gx-padding-menu': $route.fullPath.includes('web'),
      }"
    >
      <slot />
    </div>
  </div>
  <div
    v-else
    id="layout"
    class="flex"
    :class="{ 'bg-primary': dark, 'bg-white': !dark }"
  >
    <!-- <AsideMain v-if="hasDrawer" /> -->
    <div
      class="flex-grow flex flex-col"
      :class="{
        'pr-8': hasDrawer && $mq === 'de',
        'pl-44': hasDrawer && $mq === 'de' && !drawer.isCollapsed,
        'pl-17': hasDrawer && $mq === 'de' && drawer.isCollapsed,
      }"
    >
      <nav
        v-if="hasTopBar"
        :class="{
          'shadow-2': hasScrolled,
          'bg-primary': dark,
          'bg-white': !dark && hasScrolled,
          'text-white': dark,
          'text-black': !dark,
          'gxDesktopTopNav--noDrawer': !hasDrawer,
          'gxDesktopTopNav--collapsed': hasDrawer && drawer.isCollapsed,
        }"
        class="gx-h5 h-8 flex items-center z-50 fixed gxDesktopTopNav fixed shadow-2"
        :style="
          hasDrawer
            ? `left: ${drawer.isCollapsed ? 2.75 : 9.5}rem;`
            : 'left: 0;'
        "
        role="navigation"
      >
        <div v-if="!hasDrawer" class="flex items-center pt-4 pl-4">
          <img
            class="h-4"
            src="@src/assets/images/Logos/white.svg"
            alt="Taquito!"
          />
        </div>
        <div v-else class="flex-grow flex items-center justify-between pr-4">
          <div class="pl-4 self-stretch flex items-center de:gx-caption">
            <p
              v-if="myAccount"
              class="font-bold pr-2 mr-2 border-r border-solid border-gray-300"
              >{{
                myAccount.companies[0].company.commercialName
                  ? myAccount.companies[0].company.commercialName
                  : myAccount.companies[0].company.legalName
              }}</p
            >
            <GxIcon icon="store" class="mr-2 text-gray-700" />
            <p class="de:gx-caption mr-2">Coyoacán</p>
            <GxIcon class="font-bold" icon="expand_more" />
          </div>
          <div class="flex items-center">
            <GxIcon icon="notifications" />
            <GxAvatar
              v-if="myAccount"
              shape="miniAvatar"
              class="bg-secondary-200 text-white rounded-full ml-2 mr-1"
            >
              {{ myAccount.lastName[0] }}{{ myAccount.lastName[0] }}
            </GxAvatar>
            <GxIcon icon="expand_more" />
          </div>
        </div>
      </nav>
      <main class="flex-grow flex flex-col" :class="{ 'pt-12': hasTopBar }">
        <slot />
      </main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#layout {
  width: 100%;
  min-height: 100%;
}
.gxDesktopTopNav {
  top: 0;
  width: calc(100% - 9.5rem);
}
.gxDesktopTopNav--collapsed {
  top: 0;
  width: calc(100% - 2.75rem);
}
.gxDesktopTopNav--noDrawer {
  width: calc(100%);
}
.gxMoMenu {
  transform: translate(-1rem, -1.8125rem);
}
.gxBottomNav {
  height: 3.375rem;
}
.gx-padding-menu {
  padding-bottom: 3.375rem;
}
</style>

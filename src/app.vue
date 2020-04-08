<script>
// import appConfig from '@src/app.config'
import GxIcon from '@components/_Core/Icons/GxIcon'
const appConfig = {
  title: 'Chain',
}
export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  components: {
    GxIcon,
  },
  data() {
    return {
      transitionName: 'slide-left',

      // New service worker available control variables
      refreshing: false,
      registration: null,
      updateExists: false,
    }
  },
  computed: {
    transitionMode() {
      if (
        this.transitionName === 'slide-up' ||
        this.transitionName === 'slide-down'
      ) {
        return this.transitionName === 'slide-up' ? 'in-out' : 'out-in'
      }
      return null
    },
    animateRouteTransition() {
      if (
        (this.$route.fullPath.includes('/tecuidamos') && this.$mq !== 'mo') ||
        this.$route.fullPath.includes('/web')
      ) {
        return false
      }
      return true
    },
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-rigt' : 'slide-left'

      if (this.$router.gxAnim && (this.$mq === 'mo' || to.name === 'welcome')) {
        this.transitionName = this.$router.gxAnim
        this.$router.gxAnim = null
      }
      if (this.$mq === 'mo') {
        if (
          (from.name === 'downloadxmls' && to.name === 'taxinfoform') ||
          (from.name === 'companyBusiness' && to.name === 'otherBusiness') ||
          (from.name === 'myclients' && to.name === 'createnewclient')
        ) {
          this.transitionName = 'slide-up'
        } else if (
          (to.name === 'downloadxmls' && from.name === 'taxinfoform') ||
          (to.name === 'companyBusiness' && from.name === 'otherBusiness') ||
          (to.name === 'createnewclient' && from.name === 'myclients')
        ) {
          this.transitionName = 'slide-down'
        }
      }

      // Disable transitions when Callback.vue (/callback) is involved to
      // avoid having the loader sliding across the screen
      if (from.name === 'callback' || to.name === 'callback') {
        this.transitionName = 'none'
      }

      if (this.$mq === 'de') {
        this.toggleIntercom()
      }
    },
    updateExists(newValue) {
      if (this.$mq === 'de') {
        this.toggleIntercom()
      }
    },
  },
  created() {
    if (navigator && navigator.serviceWorker) {
      // Listen for new service worker lifecycle
      document.addEventListener('serviceWorkerUpdated', this.showRefreshUI, {
        once: true,
      })
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) return
        this.refreshing = true
        window.location.reload()
      })
    }
  },
  mounted() {
    // Load intercom on desktop
    if (this.$mq === 'de') {
      /* eslint-disable */
      console.log('Boot intercom')
      /* eslint-enable */
      this.$intercom.boot({
        hide_default_launcher: true,
      })
      this.toggleIntercom()

      this.loadUpscope()
    }

    // Prompt user to install to homescreen when on Safari mobile
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      return /iphone|ipad|ipod/.test(userAgent)
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator.standalone

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      console.warn('show install popup')
    }

    // Listen for network status changes
    // window.addEventListener('online', () => {
    //   this.$store.commit('network/SET_NETWORK_ONLINE')
    // })
    // window.addEventListener('offline', () => {
    //   this.$store.commit('network/SET_NETWORK_OFFLINE')
    // })
  },
  methods: {
    loadUpscope() {
      /* eslint-disable */
      if (window.Upscope) {
        console.log('Upscope already loaded')
        return
      }
      console.log('Loading Upscope')
      function initUpscope(w, u, d) {
        var i = function() {
          i.c(arguments)
        }
        i.q = []
        i.c = function(args) {
          i.q.push(args)
        }
        var l = function() {
          var s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src = 'https://code.upscope.io/L2QMYkMUWA.js'
          var x = d.getElementsByTagName('script')[0]
          x.parentNode.insertBefore(s, x)
        }
        if (typeof u !== 'function') {
          w.Upscope = i
          l()
        }
      }
      initUpscope(window, window.Upscope, document)
      Upscope('init', {
        uniqueId: '',
        identities: [''],
      })
      /* eslint-enable */
    },
    toggleIntercom() {
      // Toggle intercom only on allowed pages
      if (
        [
          'dashboard',
          'login',
          'signupName',
          'passwordrecovery',
          'mailrecovery',
          'changepassword',
        ].includes(this.$route.name) &&
        !this.updateExists
      ) {
        /* eslint-disable */
        console.log('Show intercom')
        /* eslint-enable */
        this.$intercom.update({
          hide_default_launcher: false,
        })
      } else {
        /* eslint-disable */
        console.log('Hide intercom')
        /* eslint-enable */
        this.$intercom.update({
          hide_default_launcher: true,
        })
      }
    },
    // Show new service worker prompt
    showRefreshUI(e) {
      this.registration = e.detail
      this.updateExists = true
    },
    // User approves new service worker installation
    refreshApp() {
      this.updateExists = false
      if (!this.registration || !this.registration.waiting) {
        return
      }
      // Notify code inside service-worker.js to skipWaiting and take control
      this.registration.waiting.postMessage('skipWaiting')
    },
  },
}
</script>

<template>
  <div id="app" class="text-black text-base de:text-xs font-gothic bg-white">
    <!--
    Even when routes use the same component, treat them
    as distinct and create the component again.
    -->
    <transition
      v-if="animateRouteTransition"
      :key="$route.fullPath"
      :name="transitionName"
    >
      <!-- Don't change key while inside web to avoid reloading -->
      <RouterView
        :key="$route.name"
        :mode="transitionMode"
        :transition-name="transitionName"
      />
    </transition>
    <RouterView v-else />

    <!-- Mobile filters are shown as a fullpage screen. See for example Pendientes, Mis Ventas -->
    <PortalTarget name="moFilter" />

    <!-- Simple modal popup-->
    <PortalTarget name="modal" />
    <PortalTarget name="modal-welcome" />

    <!-- Service worker update prompt -->
    <div
      v-if="updateExists"
      class="flex justify-between fixed bottom-0 left-0 right-0 p-4 bg-gray-100 z-101 border-t-8 border-pending"
      :class="{ 'flex-col': $mq === 'mo' }"
    >
      <div class="flex mb-8 de:mb-0 items-center">
        <GxIcon icon="warning" class="pr-4 text-pending" />
        <p>Nueva versión disponible.</p>
      </div>
      <div class="self-end">
        <button
          class="uppercase mr-4 font-bold text-alert gx-cancel-btn"
          @click="updateExists = false"
          >Cancelar</button
        >
        <button
          class="uppercase font-bold text-primary hover:text-primary-600"
          @click="refreshApp"
          >Actualizar</button
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

@import '@design';

#app {
  height: 100%;
}

.slide-right-leave-active,
.slide-right-enter-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: transform 0.25s 0.3s ease-out;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-enter-to {
  transform-origin: translate(0, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}
.slide-right-enter {
  transform: translate(-99%, 0);
}
.slide-right-enter-to {
  transform: translate(0, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}
.slide-up-leave-active,
.slide-up-enter-active,
.slide-down-leave-active {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100vh;
  transition: transform 0.3s ease-out;
}
.slide-down-leave-active {
  z-index: 11;
  transition: transform 0.3s ease-in;
}
.slide-up-leave-active {
  z-index: 0;
}
.slide-up-enter-leave-to,
.slide-up-enter-leave {
  transform: translate(0, 0);
}
.slide-up-enter,
.slide-down-leave-to {
  transform: translate(0, 100%);
}
.slide-down-leave,
.slide-up-enter-to {
  transform: translate(0, 0);
}
.gx-cancel-btn:hover::before {
  position: absolute;
  color: rgba(0, 0, 0, 0.2);
  content: 'cancelar';
}
</style>

import Vue from 'vue'
import App from './app'
import router from '@router'
import PortalVue from 'portal-vue'
import VueIntercom from 'vue-intercom'
// import 'material-design-icons/iconfont/material-icons.css'
import './registerServiceWorker'
import { createProvider } from './vue-apollo'
import ReactiveProvide from 'vue-reactive-provide'
import VueMq from 'vue-mq'
import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'
import utils from './utils/utilsPlugin'
import Datetime from 'vue-datetime'
import { setUrlWhereArrived } from './utms'

// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import DOMPurify from 'dompurify'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import marked from 'marked'

const utilsPlugin = {
  install() {
    Vue.utils = utils
    Vue.prototype.$utils = utils
  },
}
setUrlWhereArrived()
Vue.use(Datetime)
Vue.use(utilsPlugin)
Vue.use(PortalVue)
// Used to inject the TopBar search string as reactive data
Vue.use(ReactiveProvide)
// Conditional rendering of Vue components according to viewport width. Used to facilitate splitting between
// mobile and desktop components
Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    mo: 768,
    de: Infinity,
    // md: 1250,
    // lg: Infinity,
  },
  defaultBreakpoint: 'mo', // customize this for SSR
})

/* ========= Intercom ========= */
Vue.use(VueIntercom, {
  appId: process.env.VUE_APP_INTERCOM,
})

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// Bugsnag only in production
if (process.env.NODE_ENV === 'production' && !window.Cypress) {
  const bugsnagClient = bugsnag('5566e95c708bf9c69223a51f05d87ef2')
  bugsnagClient.use(bugsnagVue, Vue)
  window.bugsnagClient = bugsnagClient
}

// If running inside Cypress...
if (window.Cypress) {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

// Use v-markdown to avoid using v-html at all times
Vue.directive('markdown', {
  bind: function(el, binding, vnode) {
    const parsedText = marked(binding.value)
      .replace(new RegExp('<strong>', 'g'), '<strong class="font-bold">')
      .replace(
        new RegExp('<strong class="font-bold"><a', 'g'),
        '<strong class="font-bold"><a class="font-bold"'
      )
    const cleanHTML = DOMPurify.sanitize(parsedText)
    el.innerHTML = cleanHTML
  },
})

Vue.directive('click-outside', {
  bind() {
    this.event = (event) => this.vm.$emit(this.expression, event)
    this.el.addEventListener('click', this.stopProp)
    document.body.addEventListener('click', this.event)
  },
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) {
    event.stopPropagation()
  },
})

// ***********************************************
// START Global registration of core Gx components
// ***********************************************
const requireComponent = require.context(
  // The relative path of the components folder
  './components/_Core/globals',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /Gx[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
// ***********************************************
// END Global registration of core Gx components
// ***********************************************

const app = new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app')

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}

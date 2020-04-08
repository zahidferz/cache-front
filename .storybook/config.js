import { configure } from '@storybook/vue'
import { addDecorator } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueMq from 'vue-mq'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import PortalVue from 'portal-vue'
import { addParameters } from '@storybook/vue'

// Install Vue plugins.
Vue.use(Datetime)
Vue.use(Vuex)
Vue.use(VueRouter)
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
Vue.use(PortalVue)

const req = require.context('../src/stories', true, /.stories.js$/)

import '../src/design/index.scss'

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}
// function loadStories() {
// require('../src/stories/index.js')
// You can require as many stories as you need.
// }

const newViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '414px', // Set to optimal size for mobile users
      height: '100%',
    },
  },
}
addParameters({
  viewport: { viewports: newViewports },
})

configure(loadStories, module)

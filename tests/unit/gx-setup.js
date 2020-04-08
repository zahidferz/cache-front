/* eslint-disable no-undef */
// Unit testing utility library for Vue.js.
import { mount, createLocalVue } from '@vue/test-utils' // https://vue-test-utils.vuejs.org/
import VueRouter from 'vue-router'
import VueMq from 'vue-mq'

// Utility library for testing DOM nodes (whether simulated with JSDOM as provided by default with Jest or in the browser).
import {
  getQueriesForElement,
  prettyDOM,
  wait,
  fireEvent,
} from '@testing-library/dom'

// Mock matchmedia for vue-mq
window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }
}) // https://testing-library.com/

// Update fireEvent per vue-testing-library
Object.keys(fireEvent).forEach((fn) => {
  fireEvent[`_${fn}`] = fireEvent[fn]
  fireEvent[fn] = async (...params) => {
    fireEvent[`_${fn}`](...params)
    await wait()
  }
})

fireEvent.touch = async (elem) => {
  await fireEvent.focus(elem)
  await fireEvent.blur(elem)
}

fireEvent.update = async (elem, value) => {
  const tagName = elem.tagName
  const type = elem.type

  switch (tagName) {
    case 'OPTION': {
      elem.selected = value

      const parentElement =
        this.element.parentElement.tagName === 'OPTGROUP'
          ? this.element.parentElement.parentElement
          : this.element.parentElement

      return fireEvent.change(parentElement)
    }

    case 'INPUT': {
      if (type === 'checkbox') {
        elem.checked = value
        return fireEvent.change(elem)
      } else if (type === 'radio') {
        elem.selected = value
        return fireEvent.change(elem)
      } else {
        elem.value = value
        return fireEvent.input(elem)
      }
    }

    case 'TEXTAREA': {
      elem.value = value
      return fireEvent.input(elem)
    }

    case 'SELECT': {
      elem.value = value
      return fireEvent.change(elem)
    }
  }
}

// ===
// Configure Vue
// ===

// localVue for you to add components, mixins and install plugins without polluting the global Vue class.
const defaultMqConfig = {
  breakpoints: {
    mo: 768,
    de: Infinity,
  },
  defaultBreakpoint: 'mo',
}
export default function render(
  TestComponent,
  { routes = null, mqConfig = defaultMqConfig, ...options } = {}
) {
  let router = null
  const localVue = createLocalVue()
  if (routes) {
    localVue.use(VueRouter)
    router = new VueRouter({ routes })
  }
  // mq-vue for conditional component rendering according to screen size
  localVue.use(VueMq, mqConfig)

  const wrapper = mount(TestComponent, {
    localVue,
    router,
    attachToDocument: true,
    ...options,
  })

  return {
    wrapper,
    debug: () => console.log(prettyDOM(wrapper.element)), // eslint-disable-line no-console
    ...getQueriesForElement(wrapper.element),
    fireEvent,
    wait,
  }
}

import Vue from 'vue'

const state = Vue.observable({
  imageError: '',
  headerError: '',
  bodyError: '',
  modalButtons: false,
})

export const getters = {
  imageError: () => state.imageError,
  headerError: () => state.headerError,
  bodyError: () => state.bodyError,
  modalButtons: () => state.modalButtons,
}
export const mutations = {
  setImageError: (val) => {
    state.imageError = val
  },
  setHeaderError: (val) => {
    state.headerError = val
  },
  setBodyError: (val) => {
    state.bodyError = val
  },
  setErrorData: ({ imageError, headerError, bodyError, modalButtons }) => {
    state.imageError = imageError || ''
    state.headerError = headerError || ''
    state.bodyError = bodyError || ''
    state.modalButtons = modalButtons || false
  },
  cleanErrorState: ($router, route) => {
    const name = route || 'dashboard'
    $router.push({ name })
    state.imageError = ''
    state.headerError = ''
    state.bodyError = ''
    state.modalButtons = false
  },
}

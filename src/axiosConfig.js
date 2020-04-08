import axios from 'axios'

export const axiosAccountProvisioning = axios.create({
  baseURL: process.env.VUE_APP_ACC_PROV_URL,
  headers: {
    ClientId: process.env.VUE_APP_ACC_PROV_URL_CLIENT_ID,
    ClientSecret: process.env.VUE_APP_ACC_PROV_URL_CLIENT_SECRET,
    e2ett: '5cebe615a13ff2c99bf896d565cfcfed9d38fd836a9c5e7865369cead58b6e30', // process.env.VUE_APP_CYPRESS_E2E_TOKEN,
    // e2ett: window.Cypress ? process.env.VUE_APP_CYPRESS_E2E_TOKEN : null,
  },
})
export const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_AUTH_URL,
  headers: {
    appid: process.env.VUE_APP_AUTH_URL_APP_ID,
    appsecret: process.env.VUE_APP_AUTH_URL_APP_SECRET,
  },
})

export function configureAxios(token) {
  axiosAccountProvisioning.defaults.headers.Authorization = `Bearer ${token}`
}

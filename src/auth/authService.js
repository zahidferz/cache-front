import auth0 from 'auth0-js'
import { EventEmitter } from 'events'
// Primitivo
const authConfig = {
  domain: process.env.VUE_APP_AUTH0_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
}

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  // redirectUri: `${window.location.origin}?callback=true`,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  responseType: 'id_token token',
  scope: 'openid profile email',
})

const localStorageKey = 'loggedIn'
const loginEvent = 'loginEvent'

class AuthService extends EventEmitter {
  // idToken = null
  profile = null
  tokenExpiry = null
  idToken = null
  login(params, cb) {
    localStorage.setItem(localStorageKey, 'true')
    webAuth.login(
      {
        realm: process.env.VUE_APP_AUTH0_REALM,
        email: params.email,
        password: params.password,
      },
      function(err) {
        localStorage.removeItem(localStorageKey)
        cb(err)
      }
    )
  }
  logOut(returnTo) {
    localStorage.removeItem(localStorageKey)

    // this.idToken = null
    this.tokenExpiry = null
    this.profile = null

    webAuth.logout({
      returnTo: `${window.location.origin}`,
    })

    this.emit(loginEvent, { loggedIn: false })
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          this.emit(loginEvent, {
            loggedIn: false,
            error: err,
            errorMsg: err.statusText,
          })
          reject(err)
        } else {
          this.localLogin(authResult)
          // resolve(authResult.idToken)
          resolve(authResult.accessToken)
        }
      })
    })
  }
  get isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true'
  }
  get isAuthenticated() {
    return Date.now() < this.tokenExpiry && this.isLoggedIn
  }

  get isIdTokenValid() {
    return this.idToken && this.isAuthenticated
  }

  get token() {
    if (this.isAuthenticated) {
      return this.idToken
    }
    return null
  }

  getIdToken() {
    return new Promise((resolve, reject) => {
      if (this.isIdTokenValid()) {
        resolve(this.idToken)
      } else if (this.isAuthenticated()) {
        this.renewTokens().then((authResult) => {
          resolve(authResult.idToken)
        }, reject)
      } else {
        resolve()
      }
    })
  }

  localLogin(authResult) {
    // Convert the expiry time from seconds to milliseconds,
    // required by the Date constructor
    // this.tokenExpiry = new Date(this.profile.exp * 1000)
    const now = new Date()
    now.setSeconds(authResult.expiresIn + now.getSeconds())
    this.tokenExpiry = now
    this.idToken = authResult.idToken
    localStorage.setItem(localStorageKey, 'true')

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {},
    })
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        throw new Error('Not logged in')
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }
}

const authService = new AuthService()

authService.setMaxListeners(5)
export default authService

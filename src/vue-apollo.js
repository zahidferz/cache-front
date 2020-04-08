import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {
  createApolloClient,
  restartWebsockets,
} from 'vue-cli-plugin-apollo/graphql-client'
import {
  typeDefs as localTypeDefs,
  resolvers as localResolvers,
  cacheInit as localCacheInit,
} from '@src/apollo/localState/resolvers'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
// import { persistCache } from 'apollo-cache-persist'
import authService from '@src/auth/authService'
import { mutations } from '@src/store'
import { onError } from 'apollo-link-error'
import { Observable } from 'apollo-link'

import utils from '@src/utils/utilsPlugin'
// To update the fragmentTypes.json run src/getGraphqlSchema.js using node and passing an
// access token: node src/getGraphqlSchema.js "Bearer abcd..."
import introspectionQueryResultData from './fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})
const cache = new InMemoryCache({
  fragmentMatcher,
}) // Adding this line due to this issue with beta 30 https://github.com/Akryum/vue-apollo/issues/631
if (window && window.localStorage) {
  // persistCache({
  //   cache,
  //   storage: window.localStorage,
  // })
}

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint =
  process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql'

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  // wsEndpoint: null,
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS,

  // LocalStorage token
  // Not required getAuth handles Authorization  header
  // tokenName: AUTH_TOKEN,
  // Override the way the Authorization header is set
  getAuth: () => {
    return authService.token ? `Bearer ${authService.token}` : ''
  },
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  // Override default cache
  // cache: myCache
  cache,

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }

  // Local Schema
  typeDefs: localTypeDefs,
  // Local Resolvers
  resolvers: localResolvers,
  // Hook called when you should write local state in the cache
  onCacheInit: localCacheInit,
}

function renewTokensOrLogout(promise) {
  return new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return
        subscriber.next(value)
        subscriber.complete()
      },
      (err) => {
        // Make sure user hasn't already been logged out to avoid entering a logout loop
        if (localStorage && localStorage.loggedIn) {
          location.replace(window.origin + '/logout')
        }
        return subscriber.error(err)
      }
    )
  })
}

// Call this in the Vue app file
export function createProvider(options = {}) {
  // https://www.apollographql.com/docs/link/links/error/
  // On error Callback Returns: Observable<FetchResult> | void The error callback can optionally return an observable from calling forward(operation) if it wants to retry the request. It should not return anything else.
  const link = onError(
    ({ forward, graphQLErrors, networkError, operation }) => {
      if (window.bugsnagClient) {
        window.bugsnagClient.notify(
          new Error(`GraphqlError on ${operation.operationName}`),
          {
            metaData: {
              operation: operation.operationName,
              variables: JSON.stringify(operation.variables),
              graphQLErrors: JSON.stringify(graphQLErrors),
              networkError: JSON.stringify(networkError),
            },
          }
        )
      }
      // Uncomment to debug
      /* eslint-disable */
      // console.log('Operation', operation)
      // console.log('graphQLErrors', graphQLErrors)
      // console.log('networkError', networkError)
      /* eslint-enable */
      if (!graphQLErrors || !graphQLErrors.length === 0) return
      const UNAUTHENTICATED = graphQLErrors
        .filter((e) => e.extensions)
        .some((err) => err.extensions.code === 'UNAUTHENTICATED')
      if (!UNAUTHENTICATED) return
      return renewTokensOrLogout(authService.renewTokens()).flatMap((value) => {
        const oldHeaders = operation.getContext().headers
        operation.setContext({
          headers: {
            ...oldHeaders,
            authorization: `Bearer ${value.idToken}`,
          },
        })
        return forward(operation) // retry operation
      })
    }
  )

  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
    link,
  })
  apolloClient.wsClient = wsClient

  // Create vue apollo provider

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // Subscription errors
      /* eslint-disable */
      console.log('Vue apollo error handler', { error })
      /* eslint-enable */
      if (
        error.message === "Cannot read property 'errorMessage' of undefined"
      ) {
        if (window.bugsnagClient) {
          window.bugsnagClient.notify(
            new Error('Error on graphql subscription'),
            {
              metaData: {
                error: JSON.stringify(error),
              },
            }
          )
        }
        return
      }
      // For smart subscriptions the token is refreshed on their error callback
      // For Graphql queries onError link will refresh the token and retry the query
      if (error.message === 'Token caducado') {
        return
      }
      const {
        headerError,
        imageError,
        bodyError,
        modalButtons,
      } = utils.parseQueryError(error.message)
      mutations.setErrorData({
        headerError,
        imageError,
        bodyError,
        modalButtons,
      })
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    },
  })

  return apolloProvider
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}

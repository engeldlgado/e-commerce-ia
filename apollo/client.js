import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
export const url = process.env.HOST || 'http://localhost:3000'
let apolloClient

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('user-token')
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null
      }
    }))

    return forward(operation)
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: `${url}/api/graphql`,
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  fetchOptions: {
    // add authorization header with jwt token
  }
})

function createApolloClient () {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, authMiddleware, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        getData: {
          items: concatPagination()
        }
      }
    })
  })
}

export function initializeApollo (initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState (client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo (pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}

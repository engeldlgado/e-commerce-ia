import '@/styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { StoreProvider } from '../context/StoreContext'

export default function App ({ Component, pageProps }) {
  const client = useApollo(pageProps)
  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ApolloProvider>
  )
}

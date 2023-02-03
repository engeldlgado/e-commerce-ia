import '@/styles/globals.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { AuthProvider } from '../context/AuthContext'

export default function App ({ Component, pageProps }) {
  const client = useApollo(pageProps)
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  )
}

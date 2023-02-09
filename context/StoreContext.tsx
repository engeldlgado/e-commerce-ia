import { ValidationError } from '@/utils/ErrorHandler'
import { useApolloClient } from '@apollo/client'
import jwt from 'jsonwebtoken'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { GET_USER, LOGIN_SIGNUP } from '../apollo/mutations'

export interface IContext {
  token: string | null
  user: any
  loggedIn: boolean
  message: string | null
  error: string | null
  loading: boolean
  products: {
    items: any[]
    count: number
  }
  loginOrSignup: (username: string, password: string) => Promise<void>
  logout: () => void
  setMessage: (message: string) => void
  setError: (error: string) => void
  setLoading: (loading: boolean) => void
  setProducts: (products: any) => void
}

export interface IStoreProvider {
  children: ReactNode
}

const Context = createContext<IContext | null>(null)

export const StoreProvider = ({ children }:IStoreProvider) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState< { items: any[], count: number } >({
    items: [],
    count: 0
  })

  const client = useApolloClient()

  const isTokenValid = async (authToken:string) => {
    if (authToken) {
      try {
        const JWT_SECRET = process.env.JWT_SECRET
        if (!JWT_SECRET) {
          throw new ValidationError('JWT_SECRET not found')
        }
        const { id } = jwt.verify(authToken, JWT_SECRET, { algorithms: ['HS256'] }) as { id: string }
        const { data } = await client.query({ query: GET_USER })
        if (data.me.id === id) {
          setToken(authToken)
          setUser(data.me)
          setLoggedIn(true)
        }
      } catch (error:any) {
        setToken(null)
        setUser(null)
        setLoggedIn(false)
        localStorage.removeItem('user-token')
        setError('The session has expired. Please log in again.')
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // token expired or invalid
      const authToken = localStorage.getItem('user-token')
      if (authToken) {
        isTokenValid(authToken)
      }

      const tokenRefresh = setInterval(() => {
        const authToken = localStorage.getItem('user-token')
        if (authToken) {
          setToken(authToken)
        } else {
          setLoggedIn(false)
          setUser(null)
        }
      }
      , 1000 * 60 * 60) // 1 hour

      return () => clearInterval(tokenRefresh)
    }
  }
  , []) // eslint-disable-line react-hooks/exhaustive-deps

  const loginOrSignup = async (username: string, password: string) => {
    try {
      setLoading(true)
      const { data } = await client.mutate({
        mutation: LOGIN_SIGNUP,
        variables: {
          input: {
            username,
            password
          }
        }
      })
      localStorage.setItem('user-token', data.createOrLoginUser.value)
      await isTokenValid(data.createOrLoginUser.value)
      setLoading(false)
      setMessage('You have successfully logged in.')
    } catch (error:any) {
      setError(error.message)
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setLoggedIn(false)
    localStorage.removeItem('user-token')
    setMessage('You have successfully logged out.')
  }
  return (
    <Context.Provider
      value={{
        token,
        user,
        loggedIn,
        message,
        error,
        loading,
        products,
        loginOrSignup,
        logout,
        setMessage,
        setError,
        setLoading,
        setProducts
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useStore () {
  return useContext(Context)
}

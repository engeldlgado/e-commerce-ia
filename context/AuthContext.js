import { createContext, useContext, useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import { LOGIN_SIGNUP, GET_USER } from '../apollo/mutations'

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

console.log('JWT: ', JWT_SECRET)

const Context = createContext({
  token: null,
  user: null
})

export function AuthProvider ({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const client = useApolloClient()

  const fetchData = async () => {
    const { data } = await client.query({ query: GET_USER })
    setUser(data.me)
    setLoggedIn(true)
  }

  const isTokenValid = async (authToken) => {
    if (authToken) {
      try {
        const { id } = jwt.verify(authToken, JWT_SECRET)
        const { data } = await client.query({ query: GET_USER })
        if (data.me.id === id) {
          setToken(authToken)
          setUser(data.me)
          setLoggedIn(true)
        }
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          console.log('Error: ', err.message)
          setToken(null)
          setUser(null)
          setLoggedIn(false)
          localStorage.removeItem('user-token')
          setError('The session has expired. Please log in again.')
        }
      }
    }
  }

  useEffect(() => {
    setLoading(true)
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
    setLoading(false)
  }
  , []) // eslint-disable-line react-hooks/exhaustive-deps

  const loginOrSignup = async (username, password) => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_SIGNUP,
        variables: {
          input: {
            username,
            password
          }
        }
      })
      setToken(data.createOrLoginUser.value)
      localStorage.setItem('user-token', data.createOrLoginUser.value)
      fetchData()
      setMessage('You have successfully logged in.')
    } catch (error) {
      setError(error.message)
    }
  }

  const logout = () => {
    setToken(null)
    setLoggedIn(false)
    localStorage.removeItem('user-token')
    client.resetStore()
    setMessage('You have successfully logged out.')
  }

  return (
    <Context.Provider value={{ token, user, loginOrSignup, logout, loggedIn, message, error, setMessage, setError, loading }}>
      {children}
    </Context.Provider>
  )
}

export function useAuthContext () {
  return useContext(Context)
}

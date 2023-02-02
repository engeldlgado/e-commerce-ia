import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Navigation from '../navigation/Navigation'
import { Footer } from '../sections/Footer'

const Layout = ({ children, title, description }) => {
  const [theme, setTheme] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme')
      if (theme) {
        setTheme(theme)
      } else {
        localStorage.setItem('theme', 'light')
        setTheme('light')
      }
    }
  }, [])

  useEffect(() => {
    if (theme !== '' && typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.classList.add(theme)
        localStorage.setItem('theme', theme)
      } else {
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', theme)
      }
    }
  }, [theme])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={description} />
      </Head>
      <Navigation
        theme={theme}
        setTheme={setTheme}
      />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout

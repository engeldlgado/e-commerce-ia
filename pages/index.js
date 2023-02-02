import Layout from '@/components/layout/MainLayout'
import MainHero from '@/components/hero/MainHero'
import ProductFeed from '@/components/sections/Products'
import { LogoSection } from '@/components/sections/LogoSection'

export default function Home () {
  return (
    <Layout
      title='IA Store | Home'
      description='IA Store is a web application that allows you to buy and sell your products online.'
    >
      <MainHero />
      <ProductFeed />
      <LogoSection />

    </Layout>
  )
}

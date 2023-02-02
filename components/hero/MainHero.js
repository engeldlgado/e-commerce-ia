import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import Lottie from 'lottie-react'
import ProductFeeLottie from '../lotties/ProductFeed.json'
import { Login } from '../forms/Login'

export default function MainHero () {
  return (
    <div id='home' className='pt-10 bg-gradient-to-br from-cyan-800 via-base-100 dark:from-cyan-800 dark:via-base-100 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden'>
      <div className='mx-auto max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center'>
            <div className='pt-32 lg:pt-56 lg:pb-24'>
              <Link
                href='#products'
                className='inline-flex items-center p-1 pr-2 text-white bg-black rounded-full sm:text-base lg:text-sm xl:text-base hover:text-gray-200'
                scroll={false}
              >
                <span className='px-3 py-0.5 dark:text-white text-white text-xs font-semibold leading-5 uppercase tracking-wide dark:bg-cyan-800 bg-cyan-800 rounded-full'>
                  See what's new
                </span>
                <ArrowRightIcon className='inline-block w-4 h-4 ml-2 text-gray-500' aria-hidden='true' />
                <span className='ml-4 text-sm'>Explore the Marketplace</span>
                <ChevronRightIcon className='w-5 h-5 ml-2 text-gray-500' aria-hidden='true' />
              </Link>
              <h2 className='mt-4 text-4xl font-extrabold tracking-tight transition-colors duration-500 dark:text-white text-neutral sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl'>
                <span className='block'>Artificial Intelligence</span>
                <span className='block text-cyan-800 dark:text-cyan-600'>Marketplace</span>
              </h2>
              <p className='mt-3 text-base dark:text-gray-300 text-neutral sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
                Artificial Intelligence Marketplace is the perfect platform to showcase and sell your products. With AI-generated product descriptions, you can ensure that your offerings are accurately and attractively represented, increasing your chances of making a sale.
              </p>
              <Login />

              <div className='mt-10 sm:mt-8'>
                <p className='mt-3 text-sm dark:text-gray-300 text-neutral sm:mt-4'>
                  By entering your username and password, an account will be automatically created if you do not have one. This is for demonstration purposes only and no personal data is stored.
                </p>
              </div>

              <div className='min-h-fit' />
            </div>
          </div>

          <div className='z-0 hidden mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:mt-16 lg:relative lg:block'>
            <Lottie className='w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-[1000px] lg:max-w-none' animationData={ProductFeeLottie} loop />
          </div>
        </div>
      </div>
    </div>
  )
}

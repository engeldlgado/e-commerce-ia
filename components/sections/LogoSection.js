import Link from 'next/link'
import CohereLogo from '../svg/CohereLogo'
import MongoLogo from '../svg/MongoLogo'
import NextLogo from '../svg/NextLogo'
import ReactLogo from '../svg/ReactLogo'
import Vercel from '../svg/Vercel'

export const LogoSection = () => {
  return (
    <div id='tech' className='bg-white dark:bg-base-100'>
      <div className='px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h2 className='max-w-2xl mx-auto text-2xl font-extrabold tracking-tight text-center text-gray-900 dark:text-cyan-600 sm:text-4xl'>Powered By</h2>
        <p className='max-w-xl mx-auto mt-4 text-center text-gray-500 dark:text-gray-400'>
          Empowering innovation through cutting-edge technology solutions.
        </p>
        <div className='grid grid-cols-2 gap-8 mt-10 md:grid-cols-6 lg:grid-cols-5'>
          <div className='flex justify-center col-span-1 md:col-span-2 lg:col-span-1'>
            <NextLogo className='h-12 w-36 dark:fill-gray-400 fill-cyan-800' />
          </div>
          <div className='flex justify-center col-span-1 md:col-span-2 lg:col-span-1'>
            <MongoLogo className='h-12 w-36 dark:fill-gray-400 fill-cyan-800' />
          </div>
          <div className='flex justify-center col-span-1 md:col-span-2 lg:col-span-1'>
            <Link href='https://cohere.ai'>
              <CohereLogo className='h-12 w-36 dark:fill-gray-400 fill-cyan-800' />
            </Link>
          </div>
          <div className='flex justify-center col-span-1 md:col-span-3 lg:col-span-1'>
            <ReactLogo className='h-12 w-36 dark:fill-gray-400 fill-cyan-400' />
          </div>
          <div className='flex justify-center col-span-2 md:col-span-3 lg:col-span-1'>
            <Vercel className='h-12 w-36 dark:fill-gray-400 fill-cyan-800' />
          </div>
        </div>
      </div>
    </div>
  )
}

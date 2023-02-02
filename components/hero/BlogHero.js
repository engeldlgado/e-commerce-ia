import { ChevronRightIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogHero () {
  return (
    <div className='pt-10 bg-gradient-to-br from-secondary via-white dark:from-primary dark:via-base-100 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden'>
      <div className='mx-auto max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-8'>
          <div className='max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center'>
            <div className='pt-32 lg:pt-56 lg:pb-24'>
              <Link
                href='/'
                className='inline-flex items-center p-1 pr-2 text-white bg-black rounded-full sm:text-base lg:text-sm xl:text-base hover:text-gray-200'
              >
                <span className='px-3 py-0.5 dark:text-white text-black text-xs font-semibold leading-5 uppercase tracking-wide dark:bg-primary bg-secondary rounded-full'>
                  Home
                </span>
                <span className='ml-4 text-sm'>Dev's Blog</span>
                <ChevronRightIcon className='w-5 h-5 ml-2 text-gray-500' aria-hidden='true' />
              </Link>
              <h2 className='mt-4 text-2xl font-extrabold tracking-tight transition-colors duration-500 dark:text-white text-neutral sm:mt-5 sm:text-4xl lg:mt-6 xl:text-4xl'>
                <span className='block text-secondary dark:text-primary'>&lt;DEV&#39;s /&gt; Blog</span>
              </h2>
              <p className='mt-3 text-base dark:text-gray-300 text-neutral sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
                Únete a mí en el mundo del desarrollo web como Full Stack Developer. Te enseñaré las últimas tecnologías y tendencias para crear proyectos impresionantes. ¡Sigue mi blog para convertirte en un experto en desarrollo Full Stack!
              </p>

              <div className='min-h-fit' />
            </div>
          </div>

          <div className='z-0 mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:mt-16 lg:relative'>
            <div className='max-w-md px-4 mx-auto sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0'>
              {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
              <Image
                className='w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                src='/imagenes/blog.svg'
                alt='Engel Delgado Full Stack Developer'
                width={769}
                height={624}
                priority // This image is critical to the page, so it should be loaded first
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

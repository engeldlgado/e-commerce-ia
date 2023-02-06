import { Fragment } from 'react'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from '../../apollo/query'

const useProduct = (id) => {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { productId: id }
  })

  if (loading) {
    return null
  }

  if (error) {
    console.log(error)
  }

  return data?.product
}

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export const ProductModal = (props) => {
  const { open, setOpen } = props

  const product = useProduct(props.id)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50 overflow-y-auto' onClose={setOpen}>
        <div className='flex min-h-screen text-center md:block md:px-2 lg:px-4' style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden md:inline-block md:align-middle md:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            enterTo='opacity-100 translate-y-0 md:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 md:scale-100'
            leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
          >
            <div className='flex w-full text-base text-left transition transform md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl'>
              <div className='relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-base-100 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
                <button
                  type='button'
                  className='absolute text-gray-400 top-4 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
                  onClick={() => setOpen(false)}
                >
                  <span className='sr-only'>Close</span>
                  <XIcon className='w-6 h-6' aria-hidden='true' />
                </button>

                {product
                  ? (
                    <div className='grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8'>
                      <div className='sm:col-span-4 lg:col-span-5'>
                        <div className='overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1'>
                          {product.gallery.length > 0
                            ? (
                              <Image src={product.gallery[0]} alt={product.name} className='object-cover object-center' width={500} height={500} />
                              )
                            : (
                              <Image src='/images/placeholder.png' alt={product.name} className='object-cover object-center' width={500} height={500} />
                              )}
                        </div>
                      </div>
                      <div className='sm:col-span-8 lg:col-span-7'>
                        <h2 className='text-2xl font-extrabold text-gray-900 dark:text-cyan-600 sm:pr-12'>{product.name}</h2>

                        <section aria-labelledby='information-heading' className='mt-3'>
                          <h3 id='information-heading' className='sr-only'>
                            Product information
                          </h3>

                          <p className='text-2xl text-gray-900 dark:text-cyan-600'>$ {product.price}</p>

                          {/* Reviews */}
                          <div className='mt-3'>
                            <h4 className='sr-only'>Reviews</h4>
                            <div className='flex items-center'>
                              <div className='flex items-center'>
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={classNames(
                                      product.rating > rating ? 'text-cyan-600' : 'text-gray-200',
                                      'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden='true'
                                  />
                                ))}
                              </div>
                              <p className='sr-only'>{product.rating} out of 5 stars</p>
                            </div>
                          </div>

                          <div className='mt-6'>
                            <h4 className='sr-only'>Description</h4>

                            <p className='text-sm text-gray-700 dark:text-gray-300'>{product.description}</p>
                          </div>
                        </section>

                        <section aria-labelledby='options-heading' className='mt-6'>
                          <div className='mt-6'>
                            <button
                              type='submit'
                              className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500'
                            >
                              Contact to the seller
                            </button>
                          </div>
                        </section>
                      </div>
                    </div>
                    )
                  : (
                    <ProductLoader />
                    )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const ProductLoader = () => {
  return (
    <div className='grid items-start w-full grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8'>
      <div className='sm:col-span-4 lg:col-span-5'>
        <div className='overflow-hidden bg-gray-100 rounded-lg aspect-w-1 aspect-h-1'>
          <div className='w-full h-full bg-gray-300 animate-pulse' />
        </div>
      </div>
      <div className='sm:col-span-8 lg:col-span-7'>
        <div className='w-3/4 h-8 bg-gray-300 animate-pulse' />
        <div className='w-1/2 h-8 mt-4 bg-gray-300 animate-pulse' />
        <div className='w-1/4 h-8 mt-4 bg-gray-300 animate-pulse' />
        <div className='w-1/2 h-8 mt-4 bg-gray-300 animate-pulse' />
      </div>
    </div>

  )
}

import { useState } from 'react'
import { ProductModal } from '../modals/ProductModal'

const products = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    color: 'White and black',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140'
  },

  {
    id: 2,
    name: 'Ceramic Set',
    color: 'White and black',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg',
    imageAlt: 'Set of three ceramic pots with saucers: two round pots and one rectangular pot.',
    price: '$40'
  },
  {
    id: 3,
    name: 'Organic Tee',
    color: 'Heather gray',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-03.jpg',
    imageAlt: 'Front of men’s Basic Tee in heather gray.',
    price: '$35'
  },
  {
    id: 4,
    name: 'Leather Coasters',
    color: 'Natural',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-04.jpg',
    imageAlt: 'Set of six leather coasters in natural color.',
    price: '$18'
  }
]

export default function ProductFeed () {
  const [open, setOpen] = useState(false)

  return (
    <div id='products' className='bg-white dark:bg-base-100'>
      <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='max-w-2xl mx-auto text-2xl font-extrabold tracking-tight text-center text-gray-900 dark:text-cyan-600 sm:text-4xl'>Our Marketplace</h1>
        <p className='max-w-xl mx-auto mt-4 text-center text-gray-500 dark:text-gray-400'>
          Our Marketplace is the ultimate platform for businesses to showcase and sell their products. With a user-friendly interface and advanced features, our platform provides businesses the tools to reach a wider audience, increase visibility and boost sales.
        </p>

        <div className='grid grid-cols-1 mt-20 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
          {products.map((product) => (
            <div key={product.id}>
              <div className='relative'>
                <div className='relative w-full overflow-hidden rounded-lg shadow-xl h-72'>
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className='object-cover object-center w-full h-full'
                  />
                </div>
                <div className='relative mt-4'>
                  <h3 className='font-medium text-gray-900 text-md dark:text-cyan-600'>{product.name}</h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                </div>
                <div className='absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72'>
                  <div
                    aria-hidden='true'
                    className='absolute inset-x-0 bottom-0 opacity-80 h-36 bg-gradient-to-t from-cyan-900'
                  />
                  <p className='relative text-lg font-semibold text-white'>{product.price}</p>
                </div>
              </div>
              <div className='mt-6'>
                <button
                  onClick={() => setOpen(true)}
                  className='relative flex items-center justify-center w-full px-8 py-2 text-sm font-medium text-white transition-colors duration-300 border border-transparent rounded-md bg-cyan-700 hover:bg-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500'
                >
                  Quick View<span className='sr-only'>, {product.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal open={open} setOpen={setOpen} />
    </div>
  )
}

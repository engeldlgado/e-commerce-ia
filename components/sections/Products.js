import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProductModal } from '../modals/ProductModal'
import { useQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from '../../apollo/query'
import { useStore } from '../../context/StoreContext'

const Product = ({ search }) => {
  const { products, setProducts, setError } = useStore()
  const [open, setOpen] = useState(false)
  // const [page, setPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [productId, setProductId] = useState(null)

  const PAGE_OFFSET = 12

  const { loading, error, data } = useQuery(SEARCH_PRODUCTS, {
    variables: {
      filter: {
        contains: search
      },
      limit: PAGE_OFFSET,
      offset: 0 * PAGE_OFFSET
    }
  })

  useEffect(() => {
    if (loading) {
      setLoader(true)
    } else {
      setLoader(false)
    }
  }, [loading])

  useEffect(() => {
    if (error) {
      setError('Something went wrong. Please try again later.')
    }
  }, [error]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      setProducts(data.searchProducts.items)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loader) {
    return (
      <div className='grid grid-cols-1 mt-20 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {
          [...Array(4)].map((_, i) => (
            <ProductLoader key={i} />
          ))
        }
      </div>
    )
  }

  const getProductOnCardClick = (id) => {
    setOpen(true)
    setProductId(id)
  }

  return (
    <>
      <div className='grid grid-cols-1 mt-20 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {products && products.map((product, index) => (
          <div key={index}>
            <div className='relative'>
              <div className='relative w-full overflow-hidden rounded-lg shadow-xl h-72'>
                {product.gallery.length > 0
                  ? (
                    <Image
                      src={product.gallery[0]}
                      alt={product.name}
                      className='object-cover object-center w-full h-full'
                      width={288}
                      height={288}
                    />
                    )
                  : (
                    <Image
                      src='/images/placeholder.png'
                      alt={product.name}
                      className='object-cover object-center w-full h-full'
                      width={288}
                      height={288}
                    />
                    )}
              </div>
              <div className='relative mt-4'>
                <h3 className='font-medium text-gray-900 text-md dark:text-cyan-600'>{product.name}</h3>
                {/* <p className='mt-1 text-sm text-gray-500'>{product.color}</p> */}
              </div>
              <div className='absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72'>
                <div
                  aria-hidden='true'
                  className='absolute inset-x-0 bottom-0 opacity-80 h-36 bg-gradient-to-t from-cyan-900'
                />
                <p className='relative text-lg font-semibold text-white'>$ {product.price.toString()}</p>
              </div>
            </div>
            <div className='mt-6'>
              <button
                onClick={getProductOnCardClick.bind(this, product.id)}
                className='relative flex items-center justify-center w-full px-8 py-2 text-sm font-medium text-white transition-colors duration-300 border border-transparent rounded-md bg-cyan-700 hover:bg-cyan-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500'
              >
                Quick View<span className='sr-only'>, {product.name}</span>
              </button>
            </div>
          </div>
        ))}
        {open && <ProductModal open={open} id={productId} setOpen={setOpen} />}
      </div>
    </>
  )
}

export default function ProductFeed () {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  // prevent multiple requests to the server by delaying the query by half a second
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search)
    }, 500) // half a second
    return () => clearTimeout(timer)
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div id='products' className='bg-white dark:bg-base-100'>
      <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='max-w-2xl mx-auto text-2xl font-extrabold tracking-tight text-center text-gray-900 dark:text-cyan-600 sm:text-4xl'>Our Marketplace</h1>
        <p className='max-w-xl mx-auto mt-4 text-center text-gray-500 dark:text-gray-400'>
          Our Marketplace is the ultimate platform for businesses to showcase and sell their products. With a user-friendly interface and advanced features, our platform provides businesses the tools to reach a wider audience, increase visibility and boost sales.
        </p>
        <div className='relative mt-6'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg className='w-5 h-5 text-gray-400 dark:text-gray-600' viewBox='0 0 24 24' fill='none'>
              <path d='M21 21L15.8 15.8M19 10C19 14.4183 15.4183 18 11 18C6.58172 18 3 14.4183 3 10C3 5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </span>
          <input
            type='text'
            className='block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md sm:w-96 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm'
            placeholder='Search on the marketplace...'
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Product search={query} />
      </div>
    </div>
  )
}

const ProductLoader = (key) => {
  return (
    <div key={key} className='relative'>
      <div className='relative w-full overflow-hidden rounded-lg shadow-xl h-72'>
        <div className='w-full h-full bg-gray-200 animate-pulse' />
      </div>
      <div className='relative mt-4'>
        <div className='w-1/2 h-4 bg-gray-200 animate-pulse' />
        <div className='w-1/4 h-4 mt-2 bg-gray-200 animate-pulse' />
      </div>
      <div className='absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 bottom-0 opacity-80 h-36 bg-gradient-to-t from-cyan-900'
        />
        <div className='w-1/4 h-4 bg-gray-200 animate-pulse' />
      </div>
    </div>
  )
}

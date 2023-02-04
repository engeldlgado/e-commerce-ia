import { useState, useEffect } from 'react'
import { ProductModal } from '../modals/ProductModal'
import { useQuery } from '@apollo/client'
import { SEARCH_PRODUCTS } from '../../apollo/query'
import { useAuthContext } from '../../context/AuthContext'

const Product = () => {
  const { products, setProducts } = useAuthContext()
  const [open, setOpen] = useState(false)
  // const [search, setSearch] = useState('')
  // const [page, setPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [productId, setProductId] = useState(null)

  const PAGE_OFFSET = 12

  const { loading, error, data } = useQuery(SEARCH_PRODUCTS, {
    variables: {
      filter: {
        contains: ''
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
      console.log(error)
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setProducts(data.searchProducts.items)
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loader) {
    return (
      <div className='grid grid-cols-1 mt-20 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
        {
          [...Array(PAGE_OFFSET)].map((_, i) => (
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
    <div className='grid grid-cols-1 mt-20 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
      {products && products.map((product, index) => (
        <div key={index}>
          <div className='relative'>
            <div className='relative w-full overflow-hidden rounded-lg shadow-xl h-72'>
              <img
                src={product.gallery[0]}
                alt={product.name}
                className='object-cover object-center w-full h-full'
              />
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
  )
}

export default function ProductFeed () {
  return (
    <div id='products' className='bg-white dark:bg-base-100'>
      <div className='max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='max-w-2xl mx-auto text-2xl font-extrabold tracking-tight text-center text-gray-900 dark:text-cyan-600 sm:text-4xl'>Our Marketplace</h1>
        <p className='max-w-xl mx-auto mt-4 text-center text-gray-500 dark:text-gray-400'>
          Our Marketplace is the ultimate platform for businesses to showcase and sell their products. With a user-friendly interface and advanced features, our platform provides businesses the tools to reach a wider audience, increase visibility and boost sales.
        </p>
        <Product />
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

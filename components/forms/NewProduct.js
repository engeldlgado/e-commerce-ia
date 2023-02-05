/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { RefreshIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client'
import { CREATE_PRODUCT } from '../../apollo/mutations'
import { SEARCH_PRODUCTS } from '@/apollo/query'
import { useStore } from '../../context/StoreContext'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const NewProduct = ({ setOpen }) => {
  const { setError, setMessage, setProducts } = useStore()
  const [gallery, setGallery] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [contact, setContact] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [
      {
        query: SEARCH_PRODUCTS,
        variables: {
          filter: {
            contains: ''
          },
          limit: 10,
          offset: 0
        }
      }
    ],
    awaitRefetchQueries: true,
    update (cache, { data }) {
      // update the UI optimistically with the new product
      setProducts((prev) => [data.createProduct, ...prev])
    },
    onError (error) {
      // reset the UI to the previous state if the request fails
      setError(error.message)
      setProducts((prev) => prev.slice(0, prev.length - 1))
    }
  })

  const formatPrice = (price) => {
    return price.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') // price format 0.00
  }

  const handleGenerateOnClick = async (e) => {
    // generate AI text from product name
    // set the result to description
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: name
        })
      })
      const data = await res.json()
      setDescription(data.text)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createProduct({
        variables: {
          input: {
            name,
            description,
            contact,
            price: formatPrice(price),
            gallery
          }
        }
      })
      if (data) {
        setMessage('Product created successfully')
        setOpen(false)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (

    <>
      <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-base-100'>
        <h2 className='mb-8 text-2xl font-semibold text-gray-900 dark:text-white'>New Product</h2>
      </div>
      <form className='grid items-start w-full grid-cols-12 gap-y-3 gap-x-6 sm:grid-cols-12 lg:gap-x-8' onSubmit={handleSubmit}>
        <div className='col-span-12 sm:col-span-8'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-white'>
            Product Name
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='name'
              id='name'
              className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm dark:bg-base-100'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Introduce your product to generate description'
            />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-4'>
          <label htmlFor='name' className='block text-sm font-medium text-white dark:text-base-100' aria-label='hidden'>
            Generate
          </label>
          <button
            className={
          classNames(
            'inline-flex rounded btn hover:text-cyan-500 w-52',
            loading ? 'loading' : null
          )
        }
            onClick={handleGenerateOnClick}
          >
            {loading ? 'Generating...' : <><RefreshIcon className='w-6 h-6 mr-2' /> Generate AI</>}
          </button>
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700 dark:text-white'>
            Price
          </label>
          <div className='mt-1'>
            <input
              type='text'
              name='price'
              id='price'
              className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm dark:bg-base-100'
              onChange={(e) => setPrice(e.target.value)}
              value={formatPrice(price)}
              placeholder='0.00'
            />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-6'>
          <label htmlFor='contact' className='block text-sm font-medium text-gray-700 dark:text-white'>
            Contact Number <small>(optional)</small>
          </label>
          <div className='mt-1'>
            <input
              type='tel'
              name='contact'
              id='contact'
              className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm dark:bg-base-100'
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-12'>
          <label htmlFor='contact' className='block text-sm font-medium text-gray-700 dark:text-white'>
            Product Description
          </label>
          <div className='mt-1'>
            <textarea
              type='text'
              name='description'
              id='description'
              rows={5}
              className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm dark:bg-base-100'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='Product description'
            />
          </div>
        </div>
        <div className='col-span-12 sm:col-span-12'>
          <FileUploader gallery={gallery} setGallery={setGallery} setError={setError} setMessage={setMessage} />
        </div>
        {/* Submit */}
        <div className='col-span-12 sm:col-span-12'>
          <button type='submit' className='flex items-center justify-center px-8 py-3 mx-auto mt-1 text-base font-medium text-white border border-transparent rounded-md w-60 bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500'>
            Submit
          </button>
        </div>
      </form>
    </>

  )
}

function FileUploader (props) {
  const { gallery, setGallery, setError, setMessage } = props
  const [uploading, setUploading] = useState(false)

  const handleGalleryChange = async (e) => {
    // multiple files selected
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      // check file size of each file
      const fileSizes = files.map(file => file.size)
      if (fileSizes.some(size => size > 1000000)) {
        setError('Some files are too large. Please select files less than 1MB.')
        return
      }
      const folder = 'ai-marketplace'

      const formData = new FormData()
      const newAttachments = []
      for (const file of files) {
        try {
          setUploading(true)
          formData.append('file', file)
          formData.append('folder', folder)
          // add original file name
          formData.append('upload_preset', 'ai-marketplace')
          const api = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/upload`

          const data = await fetch(api, {
            method: 'POST',
            body: formData
          }).then(r => r.json())

          const { secure_url } = data // eslint-disable-line camelcase

          // set url to state
          newAttachments.push(secure_url)
        } catch (error) {
          setError('Error uploading files. Please try again.')
          setUploading(false)
        } finally {
          setUploading(false)
        }
      }
      if (gallery) {
        setGallery([...gallery, ...newAttachments])
      } else {
        setGallery(newAttachments)
      }
      setMessage('Files uploaded successfully')
    }
  }

  const handleGalleryDeleteOnClick = ({ target }) => {
    const index = target.getAttribute('data-index')
    const newAttachments = [...gallery]
    newAttachments.splice(index, 1)
    setGallery(newAttachments)
  }

  const thumbs = gallery?.length >= 0 && (
    <div className='flex flex-wrap h-20 gap-2 mt-10'>
      {gallery.map((url, index) => (
        <div key={index}>
          <div className='relative w-20 h-20 overflow-hidden border-2 rounded-lg shadow-lg'>
            <img
              src={url}
              className='absolute inset-0 object-cover w-full h-full'
              alt='gallery'
            />

            {/* Delete file */}
            <button
              className='absolute top-0 right-0 z-10 p-1 text-white bg-red-500 rounded-full shadow hover:bg-red-600'
              onClick={handleGalleryDeleteOnClick}
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' data-index={index}>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {uploading && (
        <div className='flex items-center justify-center w-20 h-20 m-1 mt-0 mb-0'>
          <div className='flex flex-col items-center justify-center w-20 h-20 p-6 text-center bg-white border-2 border-gray-300 border-dashed rounded-md'>
            <svg className='w-12 h-12 text-gray-400 animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z' />
            </svg>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <section>
      <label className='block text-sm font-medium text-gray-700 dark:text-white'>Upload files</label>
      <div className='mt-1'>
        <input type='file' className='w-full dark:file-input-primary file-input-primary file-input file-input-bordered file-input-md' multiple onChange={handleGalleryChange} />
      </div>
      <aside className='flex flex-wrap gap-3'>
        {thumbs}
      </aside>
    </section>
  )
}

export default NewProduct

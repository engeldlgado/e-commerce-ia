import { useEffect } from 'react'
import { useStore } from '../../context/StoreContext'

function Notifications () {
  const { message, error, setMessage, setError } = useStore()

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }, [message, setMessage])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }, [error, setError])

  return (
    <div className='fixed z-[99] top-24 right-4'>
      {message && (
        <div id='toast-success' className='flex items-center w-full max-w-xs p-4 mb-4 text-white bg-gray-800 rounded-lg shadow-2xl top-3 right-3' role='alert'>
          <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-200 bg-green-800 rounded-lg'>
            <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' /></svg>
            <span className='sr-only'>Check icon</span>
          </div>
          <div className='ml-3 text-sm font-normal'>{message}</div>
          <button type='button' className='ml-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-white hover:text-white dark:bg-gray-800 hover:bg-gray-700' data-dismiss-target='#toast-success' aria-label='Close' onClick={() => setMessage(null)}>
            <span className='sr-only'>Cerrar</span>
            <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
          </button>
        </div>
      )}
      {error && (
        <div id='toast-danger' className='flex items-center w-full max-w-xs p-4 mb-4 text-white bg-gray-800 rounded-lg shadow top-3 right-3' role='alert'>
          <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-200 bg-red-800 rounded-lg'>
            <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
            <span className='sr-only'>Error icon</span>
          </div>
          <div className='ml-3 text-sm font-normal'>{error}</div>
          <button type='button' className='ml-auto -mx-1.5 -my-1.5  rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700' data-dismiss-target='#toast-danger' aria-label='Close' onClick={() => setError(null)}>
            <span className='sr-only'>Cerrar</span>
            <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default Notifications

import { useState } from 'react'
import Image from 'next/image'
import { useStore } from '../../context/StoreContext'
import { LoginIcon } from '@heroicons/react/solid'
import NewProductModal from '../modals/NewProductModal'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Login = () => {
  const {
    loginOrSignup,
    loggedIn,
    logout,
    loading,
    user
  } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modal, setModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    loginOrSignup(username, password)
  }

  if (loggedIn) {
    return (
      <>
        <User user={user} logout={logout} setModal={setModal} />
        <NewProductModal open={modal} setOpen={setModal} />
      </>
    )
  }

  return (
    <>
      <form
        className='flex flex-col gap-2 mt-3 form-control sm:flex-row sm:mt-8'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Username'
          className='rounded input input-bordered'
          autoComplete='off'
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className='rounded input input-bordered'
          autoComplete='off'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={
          classNames(
            'inline-flex rounded btn hover:text-cyan-500',
            loading ? 'loading' : null
          )
        }
          type='submit'
        >
          {loading ? 'Loading...' : <><LoginIcon className='w-6 h-6 mr-2' /> Log in</>}
        </button>
        <div className='input-group' />
      </form>
    </>
  )
}

const User = (props) => {
  const { user, logout, setModal } = props
  return (
    <div className='flex flex-col items-center justify-between gap-2 mt-3 form-control sm:flex-row sm:mt-8'>
      <div className='flex py-6 md:py-0'>
        <div className='mr-2 avatar'>
          <div className='w-12 mask mask-squircle'>
            <Image src='/images/default-avatar.jpg' fill alt={user.username} />
          </div>
        </div>
        <div className='flex flex-col'>
          <small className='text-gray-500 dark:text-gray-300'>Logged in as</small>
          <span className='font-bold text-gray-700 dark:text-gray-100'>{user.username}</span>
        </div>
      </div>
      <div className='flex gap-3'>
        {/* TODO: Make the modal for new product works */}
        <button
          className='inline-flex text-white border-0 rounded btn hover:text-cyan-500 bg-cyan-600'
          onClick={() => setModal(true)}
        >
          Publish a new product
        </button>
        <button
          className='inline-flex rounded btn hover:text-cyan-500'
          onClick={logout}
        >
          Log out
        </button>
      </div>

    </div>
  )
}

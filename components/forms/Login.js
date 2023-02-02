import { LoginIcon } from '@heroicons/react/solid'

export const Login = () => {
  return (
    <div className='flex flex-col gap-2 mt-3 form-control sm:flex-row sm:mt-8'>
      <input type='text' placeholder='Username' className='rounded input input-bordered' autoComplete='off' />
      <input type='password' placeholder='Password' className='rounded input input-bordered' autoComplete='off' />
      <button className='inline-flex rounded btn hover:text-cyan-600'>
        <LoginIcon className='w-6 h-6 mr-2' /> Log in
      </button>
      <div className='input-group' />
    </div>
  )
}

import React from 'react'
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export default function SignUp() {
  return (
    <div className="max-w-lg mx-auto p-3">
    <h2 className="text-3xl text-slate-700 text-center font-semibold my-7">Sign Up</h2>
      <div className="mb-4 ">
        <div className="flex items-center border border-gray-300 rounded-lg p-2 w-full">
            <AiOutlineUser className="text-gray-500 mr-2" />
               <input
                type='text'
                placeholder='Username'
                className='border p-2 bg-slate-100 rounded-2xl w-full'
                id='username'
              />
        </div>
    </div>
    <div className="mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <AiOutlineMail className="text-gray-500 mr-2" />
            <input
                type='text'
                placeholder='E-mail'
                className='border p-2 bg-slate-100 rounded-2xl w-full'
                id='email'
              />
        </div>
    </div>
    <div className="mb-6">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <AiOutlineLock className="text-gray-500 mr-2" />
            <input
                type='password'
                placeholder='Password'
                className='border p-2 bg-slate-100 rounded-2xl w-full'
                id='password'
              />
        </div>
    </div>
    <button className="bg-blue-500 text-white p-2 rounded-2xl w-full hover:opacity-85">
        Sign Up
    </button>
    <div className='flex gap-2 mt-5'>
      <p>Have an account?</p>
      <Link to = "/sign-in" >
        <span className='text-blue-700'>Sign In</span>
      </Link>

    </div>
</div>
  )
}

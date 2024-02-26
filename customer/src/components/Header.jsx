import React from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className='bg-white bg-opacity-15 backdrop-blur-lg fixed w-full z-10'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
       <Link to = '/'>
       <h1 className='font-bold text-sm  sm:text-xl flex flex-wrap'>
        <span className='text-white mr-1'>TVA</span>
        <span className='text-slate-700-contrast'>Group</span>
       </h1>
       </Link>
        
       <form className='bg-slate-100 p-2 rounded-2xl flex items-center'>
        <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none  w-24 sm:w-64'/>
        <FaSearch className='text-slate-500 mr-2'/>
       </form>
       <ul className='flex gap-4'>
       <Link to = "/"><li className='hidden sm:inline text-white font-semibold hover:text-slate-700'>Explore</li></Link> 
       <Link to=  "/about"> <li className='hidden sm:inline text-white font-semibold hover:text-slate-700'>About</li></Link> 
        <Link to = "/sign-in"><li className='text-blue-900-contrast font-extrabold cursor-pointer hover:text-blue-700'>Sign In</li></Link>
       </ul>
        </div>
    </header>
  )
}

   {/* text-sm for mobile size
        sm:text-xl for desktop screen 
        p-3 padding
        max-w-6xl = zoom in/out specing 
        mx - auto auto adjustment
        rounded-3xl= border roundness of search
        w-24 for small mobile screen 
        sm:w-64 for bigger screen'*/}
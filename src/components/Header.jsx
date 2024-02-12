import React from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        {/* text-sm for mobile size
        sm:text-xl for desktop screen 
        p-3 padding
        max-w-6xl = zoom in/out specing 
        mx - auto auto adjustment
        rounded-3xl= border roundness of search
        w-24 for small mobile screen 
        sm:w-64 for bigger screen'*/}
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
       <Link to = '/'>
       <h1 className='font-bold text-sm  sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Axiom</span>
        <span className='text-slate-700'>Estate</span>
       </h1>
       </Link>
        
       <form className='bg-slate-100 p-2 rounded-2xl flex items-center'>
        <input type="text" placeholder=" Search..." className='bg-transparent focus:outline-none  w-24 sm:w-64'/>
        <FaSearch className='text-slate-600'/>
       </form>
       <ul className='flex gap-4'>
       <Link to = "/"><li className='hidden sm:inline text-slate-500 font-bold hover:text-slate-700'>Home</li></Link> 
       <Link to=  "/about"> <li className='hidden sm:inline text-slate-500 font-bold hover:text-slate-700'>About</li></Link> 
        <Link to = "/sign-in"><li className='text-slate-700 font-bold cursor-pointer'>Sign In</li></Link>
       </ul>
        </div>
     
    </header>
  )
}

import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-white bg-opacity-15 backdrop-blur-lg fixed w-full z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
       
          <h1 className="font-bold text-sm  sm:text-xl flex flex-wrap ">
            <span className="text-white mr-1 ">TVA</span>
            <span className="bg-gradient-to-l from-blue-900 to-red-500 bg-clip-text text-transparent">Group</span>
          </h1>
       
        <form className="bg-slate-100 p-2 rounded-2xl flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none  w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500 mr-2" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className=" text-white font-semibold transition-transform hover:scale-125 duration-500">
              Explore
            </li>
          </Link>
         
          <Link to="/gallery">
            <li className=" text-white font-semibold transition-transform hover:scale-125 duration-500">
              Gallery
            </li>
          </Link>
           <Link to="/about">
            <li className=" text-white font-semibold transition-transform hover:scale-125 duration-500">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <li className="text-slate-700 font-extrabold cursor-pointer transition-transform hover:scale-125 duration-500">
                {currentUser.username}
              </li>
            ) : (
              <Link to="/sign-in">
              <li className="text-slate-700 font-extrabold cursor-pointer transition-transform hover:scale-125 duration-500">Sign in</li>
            </Link>
            )}
          </Link>  
        </ul>
      </div>
    </header>
  );
}

{
  /* text-sm for mobile size
        sm:text-xl for desktop screen 
        p-3 padding
        max-w-6xl = zoom in/out specing 
        mx - auto auto adjustment
        rounded-3xl= border roundness of search
        w-24 for small mobile screen 
        sm:w-64 for bigger screen'*/
}


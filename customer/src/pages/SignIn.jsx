import { useState } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import backgroundImage from "./images/abc.jpg"


export default function SignIn() {

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/';// loading to Explore page
    }, 2000); // Change the duration as per your requirement
  };

  return (
    <div className='bg-cover bg-center min-h-screen flex items-center justify-center ' style={{
      backgroundImage: `url(${backgroundImage})`,
    }}>
      <div className="max-w-lg mx-auto p-5 mt-12 backdrop-blur-md rounded-3xl border shadow-lg ">
        <h2 className="text-3xl text-white text-center font-semibold my-7">Sign In</h2>
        <form >
          <div className="mb-4 ">
          </div>
          <div className="mb-4">
            <div className="flex items-center  rounded-lg p-2  hover:scale-110 transform transition duration-500">
              <AiOutlineMail className="text-white mr-2" />
              <input
                type='text'
                placeholder=' Email Address'
                className='border p-2 bg-slate-100 rounded-3xl w-full'
                id='email'  
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center  rounded-lg p-2  hover:scale-110 transform transition duration-500">
              <AiOutlineLock className="text-white mr-2 text" />
              <input
                type='password'
                placeholder=' Password'
                className='border p-2 bg-slate-100 rounded-3xl w-full'
                id='password'
              />
            </div>
          </div>
          <button type="submit"
            onClick={handleSignUp}
            className={`bg-blue-500 text-white p-2 rounded-2xl w-full hover:bg-orange-400${
              loading ? "" : ""
            }`}
            disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className='text-white flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to="/sign-up" >
            <span className='text-blue-700'>Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

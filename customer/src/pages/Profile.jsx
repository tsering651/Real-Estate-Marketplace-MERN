import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import backgroundImage from "./images/a.jpg";

import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { deleteUserFailure,deleteUserStart, deleteUserSuccess, updateUserFailure,updateUserStart,updateUserSuccess ,signOutUserStart, signOutUserFailure,signOutUserSuccess} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'
export default function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setupdateSuccess]=useState(false);
  const fileRef = useRef(null);
  const dispatch=useDispatch();
  

  //firebase storage
  // allow read;
  // allow write: if
  // request.resource.size< 2 *1024 *1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange=(e)=>{
         setFormData({...formData,[e.target.id]:e.target.value});
  }
  const handleSubmit= async (e)=>{
       e.preventDefault();
       try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          return;
        }
  
        dispatch(updateUserSuccess(data));
        setupdateSuccess(true);
       

       } catch (error) {
           dispatch(updateUserFailure(error.message))
       }

  }
  const handleDeleteUser=async () =>{
            try {
              dispatch(deleteUserStart());
              const res=await fetch(`/api/user/delete/${currentUser._id}`,
                 {method:'DELETE'}
              )
              const data=await res.json();
              if(data.success ===false){
                dispatch(deleteUserFailure(data.message));
                return;
              }
              dispatch(deleteUserSuccess(data));

            } catch (error) {
               dispatch(deleteUserFailure(error.message))
            }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (

 <div
      className="bg-cover min-h-screen flex items-center  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
     
  <div className="bg-cover min-h-screen flex items-center">
    <div className="max-w-lg max-h-lg mx-auto p-8 mt-14 backdrop-blur-md rounded-3xl shadow-2xl border">
      <h2 className="text-3xl font-semibold text-center my-3 text-white">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
             onChange={(e) => setFile(e.target.files[0])}
             type="file"
             ref={fileRef}
             hidden
             accept="image/*"
           />
        <div className="flex items-center justify-center relative overflow-hidden">
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profilepic"
            className="rounded-full h-16 w-16 cursor-pointer mb-5"
          />
          <div className="absolute bottom-0">
            <div className="text-black flex cursor-pointer">
              <span className="text-xs" onClick={() => fileRef.current.click()}>edit</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-500">Error: Image upload failed (image must be less than 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-600">Image successfully uploaded!</span>
          ) : ("")}
        </p>
        <div className="flex items-center rounded-lg p-2 bg-slate-100 hover:scale-110 transform transition duration-500">
          <AiOutlineMail className="text-white mr-2" />
          <input
            type="email"
            placeholder="E-mail"
            defaultValue={currentUser.email}
            className="border p-2 bg-slate-100 rounded-3xl w-full"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center rounded-lg p-2 bg-slate-100 hover:scale-110 transform transition duration-500">
          <AiOutlineUser className="text-white mr-2 border rounded-xl" />
          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="border p-2 bg-slate-100 rounded-3xl w-full"
            id="username"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center rounded-lg p-2 bg-slate-100 hover:scale-110 transform transition duration-500">
          <AiOutlineLock className="text-white mr-2 text border rounded-xl" />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 bg-slate-100 rounded-3xl w-full"
            id="password"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center">
          <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? 'Loading...' : 'Update'}
          </button>
        </div>

        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 block text-center" to={"/create-listing"}>
          Create Listing
        </Link>

        <div className='flex justify-between mt-5'>
          <span onClick={handleDeleteUser} className='bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-400 cursor-pointer transition duration-300'>
            Delete account
          </span>
          <span onClick={handleSignOut} className='bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-400 cursor-pointer transition duration-300'>
            Sign out
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ''}</p>
        <p className="text-green-700 mt-5">{updateSuccess ? 'User updated successfully!' : ''}</p>
      </form>
    </div>
  </div>
  </div>

   
);
  
}

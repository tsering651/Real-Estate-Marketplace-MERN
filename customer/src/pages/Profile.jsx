import { useSelector } from "react-redux";
import backgroundImage from "./images/profile.jpg";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { app } from "../firebase";

import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
 
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const [updateSuccess, setupdateSuccess] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  // firebase storage
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
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

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
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
  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success == false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete=async (listingId)=>{
      try {
         const res=await fetch(`/api/listing/delete/${listingId}`,
         {
          method:'DELETE',
         });
         const data=await res.json();
         if(data.success==false){
           console.log(data.message);
           return;
         }

         setUserListings((prev)=>prev.filter((listing)=>listing._id !==listingId))
         
      } catch (error) {
        console.log(error.message);
      }
  }

  return (
    <div
      className="bg-cover min-h-screen flex items-center  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="max-w-lg max-h-lg mx-auto p-8 mt-14 backdrop-blur-md rounded-3xl shadow-2xl border">
        <h2 className="text-3xl font-semibold text-center my-3 text-white">
          Profile
        </h2>
        <form onSubmit={handleSubmit}>
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
              <div className="text-white flex cursor-pointer">
                <span
                  className="text-xs"
                  onClick={() => fileRef.current.click()}
                >
                  edit
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-500 ml-4">
                Image should be less than 2 MB
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-600">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="mb-4">
            <div className="flex items-center  rounded-lg p-2  hover:scale-110 transform transition duration-500">
              <AiOutlineMail className="text-white mr-2" />
              <input
                type="email"
                defaultValue={currentUser.email}
                className="border p-2 bg-slate-100 rounded-3xl w-full"
                id="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center  rounded-lg p-2 w-full hover:scale-110 transform transition duration-500">
              <AiOutlineUser className="text-white mr-2 border rounded-xl" />
              <input
                type="text"
                placeholder="New Username"
                className="border p-2 bg-slate-100 rounded-3xl w-full"
                id="username"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-center  rounded-lg p-2  hover:scale-110 transform transition duration-500">
              <AiOutlineLock className="text-white mr-2 text border rounded-xl" />
              <input
                type="password"
                placeholder="New password"
                className="border p-2 bg-slate-100 rounded-3xl w-full"
                id="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between gap-4 mb-4">
            <button
              disabled={loading}
              className="bg-blue-500 text-white p-2 w-full text-center rounded-xl  hover:opacity-75"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <Link
              to="/sign-in"
              className="bg-red-500 text-white p-2 w-full rounded-xl text-center hover:opacity-75"
            >
              {" "}
              <button onClick={handleSignOut}>Sign Out</button>
            </Link>
          </div>
          <p className="text-red-500 mt-3">{error ? error : ""}</p>
          <p className="text-green-500 mt-3">
            {updateSuccess ? "User updated successfully!" : ""}
          </p>
        </form>
        <Link>
          <button
            onClick={handleDeleteUser}
            className="bg-red-600 text-white p-2 w-full text-center rounded-lg  hover:opacity-75"
          >
            Delete account
          </button>
        </Link>
        <button
          onClick={handleShowListing}
          className="bg-green-600 text-white p-2 w-full text-center rounded-lg  hover:opacity-75"
        >
          Show Listing
        </button>
        <p className="text-red-500 mt-3">
          {showListingError ? "Error showing listing..." : ""}
        </p>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4"> 
            <h1 className="text-center mt-7 text-2xl font-semibold text-white">
              Your Listings
            </h1>
           {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p className="text-white">{listing.name}</p>
              </Link>
              <div className="flex flex-col item-center">
                <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
            ))}
          </div>
        )}
        ;
      </div>
    </div>
  );
}

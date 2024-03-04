import backgroundImage from "./images/a.jpg";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);

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
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div
      className="bg-cover min-h-screen flex items-center  "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="max-w-lg max-h-lg mx-auto p-4 mt-14 backdrop-blur-md rounded-3xl shadow-2xl border">
        <h2 className="text-3xl font-semibold text-center my-3 text-white">
          Settings
        </h2>
        <form>
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
              className="rounded-full h-16 w-16 cursor-pointer"
            />
            <div className="absolute bottom-0">
              <div
                className="text-black flex cursor-pointer font-thin"
                style={{ marginBottom: "2px" }}
              >
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
              <span className="text-red-500">
                Error Image upload (image must be less than 2 mb)
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
          <div>
            <div className="flex items-center  rounded-lg p-2  hover:scale-110 transform transition duration-500">
              <AiOutlineMail className="text-white mr-2" />
              <input
                type="email"
                placeholder="E-mail"
                className="border p-2 bg-slate-100 rounded-3xl w-full"
                id="email"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center  rounded-lg p-2 w-full hover:scale-110 transform transition duration-500">
              <AiOutlineUser className="text-white mr-2 border rounded-xl" />
              <input
                type="text"
                placeholder="Username"
                className="border p-2 bg-slate-100 rounded-3xl w-full"
                id="username"
              />
            </div>
          </div>
          <div className="mb-1">
            <div className="flex items-center  rounded-lg p-2  hover:scale-110 transform transition duration-500">
              <AiOutlineLock className="text-white mr-2 text border rounded-xl" />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 bg-slate-100 rounded-3xl w-full"
                id="password"
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Link
              to="/"
              className="bg-blue-500 text-white p-2 w-full text-center rounded-2xl  hover:bg-blue-500"
            >
              <button>Update</button>
            </Link>

            <Link
              to="/gallery"
              className="bg-red-500 text-white p-2 w-full rounded-2xl text-center hover:bg-red-400"
            >
              <button className="">Sign Out</button>
            </Link>
            {/* is link ko change karna h  */}
          </div>
        </form>
        <div className="text-white flex mt-2 gap-2">
          <p>Delete account ?</p>
          <span className="text-red-600 cursor-pointer">Delete</span>
        </div>
      </div>
    </div>
  );
}

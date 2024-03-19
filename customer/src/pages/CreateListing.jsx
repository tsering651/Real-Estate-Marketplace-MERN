import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./images/listing.jpg";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  console.log(files);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    kitchens: 1,
    halls: 1,
    balcony: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    swimmingpool: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Upload failed, size should be less than 2MB");
          setUploading(false);
        });
    } else {
      setImageUploadError("Upload 6 images per Listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer" ||
      e.target.id === "swimmingpool"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="p-9 mx-auto border backdrop-blur-sm rounded-2xl mt-14">
        <h1 className="text-3xl font-semibold text-center text-white ">
          Create Listing
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="gap-5 flex">
            <div className="flex flex-col gap-3 border p-2 rounded-lg shadow-xl shadow-slate-800">
              <input
                type="text"
                placeholder="Owner's  name"
                className="rounded-2xl p-2 "
                id="name"
                maxLength="62"
                minLength="10"
                required
                onChange={handleChange}
                value={formData.name}
              />
              <textarea
                type="text"
                placeholder="Property's  Description"
                className="p-2 rounded-2xl"
                id="description"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <textarea
                type="text"
                placeholder="Address"
                className="p-2 rounded-2xl"
                id="address"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>

            <div className=" border p-2 rounded-lg  mt-4  shadow-xl shadow-slate-800">
              <div className="flex justify-between p-3 border mb-4 rounded-lg  shadow-xl shadow-slate-800">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="sale"
                    onChange={handleChange}
                    checked={formData.type === "sale"}
                  />
                  <span className="text-white">Sell</span>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    id="rent"
                    onChange={handleChange}
                    checked={formData.type === "rent"}
                  />
                  <span className="text-white">Rent</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="p-1 border rounded-lg"
                    onChange={handleChange}
                    value={formData.bedrooms}
                  />
                  <p className="text-white">Beds</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="p-1 border rounded-lg"
                    onChange={handleChange}
                    value={formData.bathrooms}
                  />
                  <p className="text-white">Baths</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="kitchens"
                    min="1"
                    max="10"
                    required
                    className="p-1 border  rounded-lg"
                    onChange={handleChange}
                    value={formData.kitchens}
                  />
                  <p className="text-white">Kitchens</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="halls"
                    min="1"
                    max="50"
                    required
                    className="p-1 border  rounded-lg"
                    onChange={handleChange}
                    value={formData.halls}
                  />
                  <p className="text-white">Number of Halls</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="balcony"
                    min="1"
                    max="50"
                    required
                    className="p-1 border rounded-lg"
                    onChange={handleChange}
                    value={formData.balcony}
                  />
                  <p className="text-white">Balcony</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="10000000"
                    required
                    className="p-1 border  rounded-lg"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div className="flex items-center">
                    <p className="text-white">Regular price</p>
                    {formData.type === "rent" && (
                      <span className="text-xs text-white">(₹/month)</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-2 rounded-lg grid grid-row-2 gap-4">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className="text-white">Parking</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className="text-white">Furniture</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="swimmingpool"
                  onChange={handleChange}
                  checked={formData.swimmingpool}
                />
                <span className="text-white"> Swimming Pool</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className="text-white">Offers</span>
              </div>
              {formData.offer && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    required
                    className="p-1 border rounded-lg"
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex items-center gap-1">
                    <p className="text-white">Discounted price</p>

                    {formData.type === "rent" && (
                      <span className="text-xs text-white">(₹/month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-bold text-white mt-6 mb-2">
              Images({formData.imageUrls.length}):
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-2 border rounded-2xl w-full bg-slate-100"
                type="file"
                accept="image/*"
                multiple
              />
              <button
                type="button"
                disabled={uploading}
                onClick={handleImageSubmit}
                className="p-2 text-white bg-green-700  rounded-2xl hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex items-center justify-between gap-2 mt-2"
                >
                  <img
                    src={url}
                    alt="Image uploaded by user"
                    className="p-1 w-40 h-20 object-contain rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="p-1 text-white bg-red-600 border rounded-lg hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              disabled={loading || uploading}
              className="p-2 bg-green-700 text-white border rounded-lg mt-3 hover:opacity-75 disabled:opacity-80"
            >
              {loading ? "Creating..." : "Submit"}
            </button>
            {error && <p className="text-red-700 text-sm">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

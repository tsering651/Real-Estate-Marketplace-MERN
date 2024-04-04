import { Link } from "react-router-dom";
const ShowListingCard = ({
  _id,
  name,
  regularPrice,
  discountPrice,
  swimmingpool,
  bathrooms,
  bedrooms,
  kitchens,
  halls,
  balcony,
  furnished,
  parking,
  type,
  offer,
  imageUrls,
  setlisting,
}) => {
  const handleListingDelete = async (listingId) => {
    try {
      console.log(listingId);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setlisting((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (e) => {
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
      navigate(`/show-listing`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleView = async (e) => {
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
      navigate(`/show-listing`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-md border rounded-lg text-white p-2 mt-10 hover:backdrop-blur-xl duration-500">
      <div className="flex items-center justify-between p-1">
        <h2 className="text-xl font-semibold uppercase">{name}</h2>
        <p className="bg-blue-600 rounded-lg w-[20%] text-center">
          {type}
        </p>
      </div>

      <div className="flex justify-between items-center p-1 rounded-lg">
        <span className="text-lg font-semibold">
          Amount : ${regularPrice - discountPrice}
        </span>
        {offer && (
          <span className="bg-green-500 text-white text-center rounded-xl p-1 w-[30%]">
            Offer
          </span>
        )}
      </div>

      <div className="flex items-center justify-between p-2 ">
        <div>
          <p>
            <strong>Regular Price:</strong> ${regularPrice}
          </p>
          <p>
            <strong>Swimming Pool:</strong> {swimmingpool ? "Yes" : "No"}
          </p>
          <p className="flex gap-1">
            <strong>Balcony:</strong> {balcony ? "Yes" : "No"} 
            <p className="font-semibold">({balcony})</p>
          </p>
          <p>
            <strong>Furnished:</strong> {furnished ? "Yes" : "No"}
          </p>
          <p>
            <strong>Parking:</strong> {parking ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <p>
            <strong>Discount Price:</strong> ${discountPrice}
          </p>
          <p>
            <strong>Kitchens:</strong> {kitchens}
          </p>
          <p>
            <strong>Halls:</strong> {halls}
          </p>

          <p>
            <strong>Bathrooms:</strong> {bathrooms}
          </p>
          <p>
            <strong>Bedrooms:</strong> {bedrooms}
          </p>
        </div>
      </div>

      {imageUrls && imageUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 border rounded-xl p-1">
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="p-1 w-40 h-40 rounded-xl "
            />
          ))}
        </div>
      )}
      <div className="flex space-x-4 mb-2">
        <button
          onClick={() => handleListingDelete(_id)}
          className="text-white bg-red-500 uppercase  p-1 rounded-lg w-[30%] mt-4 hover:bg-opacity-75"
        >
          Delete
        </button>

        <button
          onClick={handleEdit}
          className="text-white bg-green-600 uppercase p-1 rounded-lg w-[30%] mt-4 hover:bg-opacity-75"
        >
          <Link to={`/update-listing/${_id}`}>Edit</Link>
        </button>

        <button
          onClick={handleView}
          className="text-white bg-blue-600 uppercase  p-1 rounded-lg w-[30%] mt-4 hover:bg-opacity-75"
        >
          <Link to={`/listing/${_id}`}>View</Link>
        </button>
      </div>
    </div>
  );
};

export default ShowListingCard;

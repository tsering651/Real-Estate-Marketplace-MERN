// ShowListingCard.jsx


import { Link } from 'react-router-dom';


const ShowListingCard = ({
  _id,
  name,
  description,
  address,
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
  setlisting
}) => {
  
  

  const handleListingDelete = async (listingId) => {
    try {
      console.log(listingId);
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }

       setlisting((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-silver shadow-md rounded-lg p-4 mt-10">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-700 mb-2">{address}</p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold">${discountPrice}</span>
        {offer && (
          <span className="bg-green-500 text-white px-2 py-1 rounded-md">
            Offer
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>Regular Price:</strong> ${regularPrice}
          </p>
          <p>
            <strong>Discount Price:</strong> ${discountPrice}
          </p>
          <p>
            <strong>Swimming Pool:</strong> {swimmingpool ? "Yes" : "No"}
          </p>
          <p>
            <strong>Bathrooms:</strong> {bathrooms}
          </p>
          <p>
            <strong>Bedrooms:</strong> {bedrooms}
          </p>
        </div>
        <div>
          <p>
            <strong>Kitchens:</strong> {kitchens}
          </p>
          <p>
            <strong>Halls:</strong> {halls}
          </p>
          <p>
            <strong>Balcony:</strong> {balcony ? "Yes" : "No"}
          </p>
          <p>
            <strong>Furnished:</strong> {furnished ? "Yes" : "No"}
          </p>
          <p>
            <strong>Parking:</strong> {parking ? "Yes" : "No"}
          </p>
          {/* You can add more details here */}
        </div>
      </div>
      {imageUrls && imageUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="rounded-md w-full"
            />
          ))}
        </div>
      )}
    <div className="flex space-x-4">
  <button
    onClick={() => handleListingDelete(_id)}
    className="text-red-700 uppercase mb-4"
  >
    Delete
  </button>
  <Link to={`/update-listing/${_id}`}>
    <button className="text-green-700 uppercase mr-4">Edit</button>
  </Link>
  <Link to={`/listing/${_id}`}>
    <button className="text-green-700 uppercase">View List</button>
  </Link>
</div>
    </div>
  );
};

export default ShowListingCard;

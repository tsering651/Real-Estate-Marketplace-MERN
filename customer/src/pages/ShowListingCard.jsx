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

  return (
    <div className="backdrop-blur-md border rounded-lg text-white p-2 mt-10 transition-transform hover:scale-105 hover:backdrop-blur-lg duration-500">

      <div className="flex items-center justify-between p-1 mb-1">
           <h2 className="text-xl font-semibold">{name}</h2>
           <p>
            <strong className="bg-blue-600 p-1 rounded-lg ">{type}</strong> 
          </p>
      </div>
      
      <div className="flex justify-between items-center mt-3 p-1">
        <span className="text-lg font-semibold">
          Amount : ${regularPrice - discountPrice}
        </span>
        {offer && (
          <span className="bg-green-500 text-white text-center rounded-xl p-1 w-[30%]">
            Offer
          </span>
        )}
      </div>


      <div className="flex items-center justify-between p-1">
      <div>
        <p>
            <strong>Regular Price:</strong> ${regularPrice}
          </p> 
          <p>
            <strong>Swimming Pool:</strong> {swimmingpool ? "Yes" : "No"}
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

        <div className="mt-4 grid grid-cols-2 gap-2">
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
      <div className="flex space-x-4">
        <button
          onClick={() => handleListingDelete(_id)}
          className="text-white bg-red-500 uppercase  p-1 rounded-lg w-[30%] mt-4 2"
        >
          Delete
        </button>

        <button
          onClick={() => handleListingDelete(_id)}
          className="text-white bg-green-600 uppercase p-1 rounded-lg w-[30%] mt-4 2"
        >
          Edit
        </button>

        <button
          onClick={() => handleListingDelete(_id)}
          className="text-white bg-blue-600 uppercase  p-1 rounded-lg w-[30%] mt-4 2"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ShowListingCard;

{
  /*
   border black
   text coulour --  blue with white and red
*/
}

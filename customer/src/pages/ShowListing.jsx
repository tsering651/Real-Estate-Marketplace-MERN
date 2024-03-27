import ShowListingCard from "./ShowListingCard.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ShowListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  // const handleShowListings = async () => {
  //   try {
  //     setShowListingsError(false);
  //     const res = await fetch(`/api/user/listings/${currentUser._id}`);
  //     const data = await res.json();
  //     if (data.success === false) {
  //       setShowListingsError(true);
  //       return;
  //     }

  //     setUserListings(data);
  //   } catch (error) {
  //     setShowListingsError(true);
  //   }
  // };
  const handleShowListings = async () => {
  
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`, // Assuming currentUser contains token information
        },
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await res.json();
      console.log(data);
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-5 ">Property Listing</h1>
      <button onClick={handleShowListings}>Show Listing</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {userListings.map(({ id, ...property }) => (
          <ShowListingCard key={id} {...property} />
        ))}
      </div>
    </div>
  );
}

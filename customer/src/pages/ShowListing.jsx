import ShowListingCard from "./ShowListingCard.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import backgroundImage from "./images/show.jpg";


export default function ShowListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  useEffect(()=>{
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
    handleShowListings();
  },[userListings])


  return (
    <div
    className="bg-cover min-h-screen flex items-center  "
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
     <div className="container mx-auto mt-14">
      <h1 className="text-2xl font-bold text-white">Your Listings :</h1>
      <div className="grid sm:grid-cols-3 gap-3"
          style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
        {userListings.map(({ id, ...property }) => (
          <ShowListingCard key={id} {...property} setListing = {setUserListings}/>
        ))}
      </div>
    </div>
  </div>
  );
}

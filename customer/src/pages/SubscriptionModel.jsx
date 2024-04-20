
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux";
import {loadStripe} from '@stripe/stripe-js';

const SubscriptionModelPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const makePayment=(e)=>{
     console.log(currentUser)
  }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Choose Your Subscription Plan</h2>
        <div className="flex flex-col gap-4">
          {/* Free Tier */}
          <div className="bg-blue-100 border border-blue-400 p-4 rounded-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Free</h3>
              <p className="text-sm text-blue-600">Basic access to listings</p>
            </div>
            <Link
            to={"/"}
            >
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
              Select
            </button>
            </Link>
            
          </div>
          {/* Basic Tier */}
          <div className="bg-yellow-100 border border-yellow-400 p-4 rounded-md flex flex-col gap-2">
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Basic</h3>
              <p className="text-sm text-yellow-600">Enhanced access to listings</p>
              <p className="text-sm text-yellow-600">Max 10 Owners you can contact</p>
              <p className="text-sm text-yellow-600">Unlock Owner Properties reserved for Prime Members</p>
              <p className="text-sm text-yellow-600">Validity: 1 Month</p>
            </div>
            <button  onClick={makePayment} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-400">
             Pay Now
            </button>
          </div>
          {/* Premium Tier (Optional) */}
          {/* <div className="bg-purple-100 border border-purple-400 p-4 rounded-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-800">Premium</h3>
              <p className="text-sm text-purple-600">All features of Basic + more</p>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-400">
              Select
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModelPage;

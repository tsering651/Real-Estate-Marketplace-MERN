import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import terms from "./files/Terms and Conditions.pdf";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const handleUsernameHover = () => {
    setShowMenu(true);
  };
  const handleUsernameLeave = () => {
    setShowMenu(false);
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
      window.location.href = "/sign-up";
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setSearchTerm("");
  };

  return (
    <header className=" backdrop-blur-xl fixed w-full z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold rounded-lg p-1 text-sm sm:text-xl flex flex-wrap gap-2">
            <span className="bg-gradient-to-l from-orange-400 to-orange-600 bg-clip-text text-transparent">
              TVA
            </span>
            <span className="text-white">Group</span>
          </h1>
        </Link>

        {location.pathname !== "/" && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-2 rounded-full flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch className="text-slate-600" />
            </button>
          </form>
        )}

        <ul
          className={`flex gap-4 ${
            showMenu ? "flex-col sm:flex-row" : "hidden sm:flex"
          }`}
        >
          <Link to="/">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/"
                  ? "border bg-blue-900  rounded-full "
                  : ""
              }`}
            >
              Explore
            </li>
          </Link>
          <Link to="/gallery">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/gallery"
                  ? "border bg-blue-900 rounded-full"
                  : ""
              }`}
            >
              Gallery
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/about"
                  ? "border bg-blue-900  rounded-full "
                  : ""
              }`}
            >
              About
            </li>
          </Link>
          <Link>
            {currentUser ? (
              <li
                onMouseEnter={handleUsernameHover}
                onMouseLeave={handleUsernameLeave}
              >
                <li
                  className={`text-white  border-x-[4px]  p-1 font-bold rounded-lg uppercase  cursor-pointer transition-transform hover:scale-105 duration-500 ${
                    location.pathname === "" ? "border rounded-2xl" : ""
                  }`}
                >
                  {currentUser.username}
                </li>

                {showMenu && (
                  <ul className="absolute top-[78%] shadow-xl bg-white bg-opacity-45 py-2 px-4 rounded-lg">
                    <Link to="/create-listing">
                      <li
                        className={`text-black p-1 font-thick transition-transform text-center hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/create-listing"
                            ? "text-white border hover:text-black"
                            : ""
                        }`}
                      >
                        List Property
                      </li>
                    </Link>
                    <Link to="/show-listing">
                      <li
                        className={`text-black p-1 font-thick text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/show-listing"
                            ? "text-white border hover:text-black"
                            : ""
                        }`}
                      >
                        Your Listings
                      </li>
                    </Link>

                    <Link to="/request-info">
                      <li
                        className={`text-black p-1 font-thick text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/request-info"
                            ? "text-white border hover:text-black"
                            : ""
                        }`}
                      >
                        Request info
                      </li>
                    </Link>

                    <Link to="">
                      <li
                        className={`text-black p-1 font-thick text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === ""
                            ? "text-white border hover:text-black"
                            : ""
                        }`}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = terms;
                          link.setAttribute("download", "");
                          link.click();
                        }}
                      >
                        Terms & Conditions
                      </li>
                    </Link>

                    <Link to="/profile">
                      <li
                        className={`text-black p-1 font-thick text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/profile"
                            ? "text-white border hover:text-black"
                            : ""
                        }`}
                      >
                        Settings
                      </li>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-white p-1 font-thick text-center transition-transform hover:scale-105 duration-500  bg-red-600 rounded-2xl w-full"
                    >
                      Sign Out
                    </button>
                  </ul>
                )}
              </li>
            ) : (
              <Link to="/sign-up">
                <li className="text-white border-x-[3px] font-bold p-1 rounded-lg cursor-pointer transition-transform hover:scale-125 duration-500">
                  Sign in
                </li>
              </Link>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

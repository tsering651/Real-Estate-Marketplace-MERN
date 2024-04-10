import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice";
import terms from "./files/Terms and Conditions.pdf";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
      // Redirect to sign-in page after signing out
      window.location.href = "/sign-in";
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <header className="bg-white bg-opacity-15 backdrop-blur-lg fixed w-full z-10">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-white mr-1">TVA</span>
            <span className="bg-gradient-to-l from-blue-600 to-red-500 bg-clip-text text-transparent">
              Group
            </span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-2 rounded-2xl flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500 mr-2" />
        </form>

        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {showMenu ? (
              <FaTimes className="text-white" />
            ) : (
              <FaBars className="text-white" />
            )}
          </button>
        </div>

        <ul
          className={`flex gap-4 ${
            showMenu ? "flex-col sm:flex-row" : "hidden sm:flex"
          }`}
        >
          <Link to="/">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/" ? "border rounded-2xl " : ""
              }`}
            >
              Explore
            </li>
          </Link>
          <Link to="/gallery">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/gallery" ? "border rounded-2xl " : ""
              }`}
            >
              Gallery
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/about" ? "border rounded-2xl " : ""
              }`}
            >
              About
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`text-white p-1 font-semibold transition-transform hover:scale-125 duration-500 ${
                location.pathname === "/" ? "border rounded-2xl " : ""
              }`}
            >
              Contact Us
            </li>
          </Link>

          <Link>
            {currentUser ? (
              <li
                onMouseEnter={handleUsernameHover}
                onMouseLeave={handleUsernameLeave}
              >
                <li
                  className={`text-white bg-slate-700 border-x-[1px] p-1 font-bold rounded-lg uppercase  cursor-pointer transition-transform hover:scale-105 duration-500 ${
                    location.pathname === "" ? "border rounded-2xl" : ""
                  }`}
                >
                  {currentUser.username}
                </li>

                {showMenu && (
                  <ul className="absolute top-[78%] shadow-xl bg-white bg-opacity-45 py-2 px-4 rounded-lg">
                    <Link to="/create-listing">
                      <li
                          className={`text-black p-1 font-semibold transition-transform text-center hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/create-listing"
                            ? "text-white hover:text-black"
                            : ""
                        }`}
                      >
                        List Property
                      </li>
                    </Link>
                    <Link to="/show-listing">
                      <li
                        className={`text-black p-1 font-semibold text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/show-listing"
                            ? "text-white hover:text-black"
                            : ""
                        }`}
                      >
                        Your Listings
                      </li>
                    </Link>
                    <Link to="/about">
                      <li
                        className={`text-black p-1 font-semibold text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/" ? "text-white hover:text-black" : ""
                        }`}
                      >
                        Contact Us
                      </li>
                    </Link>

                    <Link to="">
                      <li
                        className={`text-black p-1 font-semibold text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "" ? "text-white hover:text-black" : ""
                        }`}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = terms;
                          link.setAttribute('download', '');
                          link.click();
                        }}
                      >
                        Terms & Conditions
                      </li>
                    </Link>
                    <Link to="/profile">
                      <li
                        className={`text-black p-1 font-semibold text-center transition-transform hover:scale-105 duration-500 hover:bg-white rounded-2xl ${
                          location.pathname === "/profile" ? "text-white hover:text-black" : ""
                        }`}
                      >
                        Settings
                      </li>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-white p-1 font-semibold text-center transition-transform hover:scale-105 duration-500  bg-red-600 rounded-2xl w-full"
                    >
                      Sign Out
                    </button>
                  </ul>
                )}
              </li>
            ) : (
              <Link to="/sign-in">
                <li className="text-white bg-slate-600 border-x-[1px] font-thin p-1 rounded-lg cursor-pointer transition-transform hover:scale-125 duration-500">
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

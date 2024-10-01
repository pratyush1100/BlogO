import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn, LogoutUser } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    // Close the dropdown when a link is clicked
    setDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100 border-b-2 shadow-md">
      {/* Navbar start - left side */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Dropdown for smaller screens */}
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-medium"
            >
              <li>
                <NavLink to="/" onClick={handleLinkClick}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/posts" onClick={handleLinkClick}>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus" onClick={handleLinkClick}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" onClick={handleLinkClick}>
                  My Posts
                </NavLink>
              </li>
              {/* Additional Sidebar Links */}
              <li>
                <NavLink to="/profile" onClick={handleLinkClick}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/create" onClick={handleLinkClick}>
                  Create Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" onClick={handleLinkClick}>
                  LogOut
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <a className="btn btn-ghost text-xl">BlogO</a>
      </div>

      {/* Center links for large screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium text-lg">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/aboutus">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar end - right side */}
      <div className="navbar-end">
        {!isLoggedIn ? (
          <button>
            <NavLink to="/login" className="btn font-medium text-lg mr-2">
              LogIn
            </NavLink>
          </button>
        ) : (
          <button onClick={LogoutUser} className="btn font-medium text-lg mr-2">
            LogOut
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

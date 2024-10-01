import React from "react";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <>
      <div className="sm:hidden">
        <ul className="menu bg-base-200 text-base-content min-h-full w-full sm:min-w-full p-4">
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create Blog</NavLink>
          </li>
          <li>
            <NavLink to="/myposts">My posts</NavLink>
          </li>
          <li>
            <NavLink to="/logout">LogOut</NavLink>
          </li>
        </ul>
      </div>
      <div className="drawer lg:drawer-open">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle hidden"
        />
        <div className="drawer-content flex flex-col items-center justify-center"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-full sm:w-80 p-4">
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/create">Create Blog</NavLink>
            </li>
            <li>
              <NavLink to="/myposts">My Blogs</NavLink>
            </li>
            <li>
              <NavLink to="/logout">LogOut</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;

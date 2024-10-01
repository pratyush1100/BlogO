import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle hidden"
      />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-full sm:w-80 p-4">
          <li>
            <NavLink to="/profile" className="flex items-center">
              <span className="icon-profile mr-2"></span>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className="flex items-center">
              <span className="icon-create mr-2"></span>
              Create Blog
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/myposts" className="flex items-center">
              <span className="icon-posts mr-2"></span>
              My Blogs
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/logout" className="flex items-center">
              <span className="icon-logout mr-2"></span>
              LogOut
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

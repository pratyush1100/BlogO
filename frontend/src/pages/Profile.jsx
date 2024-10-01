import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Profile = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("/man.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const callProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/blog/getuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await callProfile();
        if (user) {
          setName(user.name);
          setEmail(user.email);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Error Occured while fetching the user profile: ", error);
      }
    };
    fetchProfile();
  }, [isLoggedIn]);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-sm w-full">
          <div className="flex flex-col items-center">
            {imageURL ? (
              <img
                src={imageURL}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600 mb-2">{email}</p>
            <button className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2">
              <NavLink to="/editprofile">Edit Profile</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

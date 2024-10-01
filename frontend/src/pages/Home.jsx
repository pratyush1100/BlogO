import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">BlogO</h1>
          <div className="py-6 text-md">
            Empowering You to Turn Your Insights into Influential Content.
            <p>Connect, Create, and Inspire with Us.</p>
          </div>
          <button className="btn btn-primary">Create your Blog</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

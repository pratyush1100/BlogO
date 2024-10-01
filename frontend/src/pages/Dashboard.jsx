import React from "react";
import SideBar from "../components/SideBar";
import MyPosts from "./MyPosts";

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/4 sm:h-screen">
        <SideBar />
      </div>

      <div className="w-full sm:w-3/4 p-4">
        <div className="text-2xl flex justify-center mr-[180px] font-semibold underline ">
          Your Posts
        </div>
        <MyPosts />
      </div>
    </div>
  );
};

export default Dashboard;

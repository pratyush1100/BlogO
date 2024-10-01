import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import { LogOut } from "./pages/LogOut";
import EditProfile from "./pages/EditProfile";
// not monitoring continuously
import { useAuth } from "./store/auth";
import MyPosts from "./pages/MyPosts";
import AllPosts from "./pages/AllPosts";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Login />}
          />
          <Route
            path="/myposts"
            element={isLoggedIn ? <MyPosts /> : <Login />}
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

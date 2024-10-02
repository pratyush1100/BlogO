import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationDialog from "../components/ConfirmationDialog";

const MyPosts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const URL = "https://blogo-backend.onrender.com/blog/myposts";
  const navigate = useNavigate();

  const fetchAuthorById = async (authorId) => {
    try {
      const response = await fetch(
        `https://blogo-backend.onrender.com/blog/getuser/${authorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch author");
      }

      const authorData = await response.json();
      return authorData.user;
    } catch (error) {
      console.error("Error fetching author:", error);
      return null;
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await res.json();
      const blogPosts = result.blogposts;

      const updatedPosts = await Promise.all(
        blogPosts.map(async (post) => {
          if (typeof post.tags === "string") {
            post.tags = post.tags.split(",").map((tag) => tag.trim());
          }

          const author = await fetchAuthorById(post.author);
          return { ...post, author };
        })
      );

      setData(updatedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleEditClick = (postId, e) => {
    e.stopPropagation();
    navigate(`/edit/${postId}`);
  };

  const handleDeleteClick = (postId, e) => {
    e.stopPropagation();
    setPostToDelete(postId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        const response = await fetch(
          `https://blogo-backend.onrender.com/blog/delete/${postToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the post");
        }

        setData((prevData) =>
          prevData.filter((post) => post._id !== postToDelete)
        );
        alert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete the post.");
      } finally {
        setIsModalOpen(false);
        setPostToDelete(null);
      }
    }
  };

  return (
    <div className="flex flex-col  p-4">
      <main className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 max-h-[75vh] overflow-y-auto">
        {loading ? (
          <LoadingSpinner />
        ) : (
          data.map((post) => (
            <div
              key={post._id}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleCardClick(post._id)}
            >
              <h2
                className="text-lg sm:text-xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ maxWidth: "180px", minWidth: "120px" }}
              >
                {post.title}
              </h2>
              {post.thumbnail && (
                <img
                  src={post.thumbnail.url}
                  alt={post.title}
                  className="h-32 w-full object-cover rounded-md mb-2"
                />
              )}
              <p
                className="flex-grow mt-2 text-gray-700 text-sm line-clamp-4"
                style={{
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.content}
              </p>
              <div className="flex flex-wrap mt-2">
                {post.tags &&
                  post.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-gray-300 text-gray-700 text-sm rounded-full px-2 py-1 mr-2 mb-2"
                    >
                      {tag}
                    </div>
                  ))}
              </div>
              <p className="mt-auto text-gray-500 text-sm">
                Posted on: {new Date(post.postedOn).toLocaleDateString()} by{" "}
                {post.author ? post.author.name : "Unknown Author"}
              </p>
              <div className="flex justify-between mt-4">
                <PencilSquareIcon
                  className="h-5 w-5 text-blue-600 cursor-pointer hover:text-blue-800 transition duration-200"
                  onClick={(e) => handleEditClick(post._id, e)}
                />
                <TrashIcon
                  className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-800 transition duration-200"
                  onClick={(e) => handleDeleteClick(post._id, e)}
                />
              </div>
            </div>
          ))
        )}
      </main>

      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default MyPosts;

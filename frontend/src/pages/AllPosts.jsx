import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const URL = "https://blogo-backend.onrender.com/blog/getall";
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

  return (
    <div className="flex flex-col p-4">
      <section className="text-3xl font-bold self-center mb-8 underline">
        All Posts
      </section>
      <main className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
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
                className="text-xl font-bold mb-2 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ maxWidth: "200px" }}
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
                {post.author ? post.author.name : "Unknown Author"}{" "}
                {/* Display the author's name */}
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AllPosts;

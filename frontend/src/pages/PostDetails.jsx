import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState("Unknown");
  const [loading, setLoading] = useState(true);

  const fetchAuthorById = async (authorId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/blog/getuser/${authorId}`,
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

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/blog/view/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }
        const data = await response.json();
        const post = data.post;

        const author = await fetchAuthorById(post.author);
        setAuthor(author ? author.name : "Unknown Author");
        setPost(post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!post) {
    return <div className="text-center text-xl">Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border my-5 border-gray-200">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.thumbnail && (
        <img
          src={post.thumbnail.url}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
        />
      )}
      <p className="text-gray-800 leading-relaxed mb-6 border-b border-gray-300 pb-4">
        {post.description}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Posted on:</strong>{" "}
        {new Date(post.postedOn).toLocaleDateString()}
        <span className="ml-2 text-gray-500">
          <strong>by:</strong> {author}
        </span>
      </p>
      <div className="flex flex-wrap mb-4">
        {post.tags &&
          post.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-200 text-blue-800 text-sm rounded-full px-3 py-1 mr-2 mb-2 transition duration-300 hover:bg-blue-300"
            >
              {tag}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostDetails;

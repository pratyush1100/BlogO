import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
    tags: "",
    thumbnail: null,
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const URL = `http://localhost:4000/blog/editblog/${id}`;

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:4000/blog/view/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await response.json();
      const post = data.post;
      console.log(post);

      const tags = Array.isArray(data.tags) ? data.tags.join(", ") : "";

      setPost({
        title: post.title || "",
        description: post.description || "",
        tags: post.tags,
        thumbnail: post.thumbnail || null,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("tags", post.tags);

    if (file) {
      formData.append("thumbnail", file);
    }

    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {},
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      alert("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update the post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Content</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            required
            rows="4"
          />
        </div>
        <div>
          <label className="block mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={post.tags}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

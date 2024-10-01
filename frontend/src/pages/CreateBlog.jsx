import React, { useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const validateForm = () => {
    if (!title || !description || !tags || !thumbnail) {
      return false;
    }
    return true;
  };

  const postData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.alert("Please fill all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    console.log("Form Data:", {
      title,
      description,
      tags,
      thumbnail,
    });

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:4000/blog/postblog", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Response from the server: ", data);
        window.alert(data.message);

        setTitle("");
        setDescription("");
        setTags("");
        setThumbnail(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        const errorData = await res.json();
        window.alert(
          errorData.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Network error: ", error);
      window.alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      {isLoading && <LoadingSpinner />} {/* Show the spinner when loading */}
      <div
        className={`bg-white p-6 rounded-lg shadow-lg ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

        <form className="space-y-6" method="POST" onSubmit={postData}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter post title"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description (Larger Text Area) */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter detailed description"
              required
              disabled={isLoading}
            ></textarea>
          </div>

          {/* Tags (Comma-separated array input) */}
          <div>
            <label
              htmlFor="tags"
              className="block text-lg font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tags (comma separated)"
              disabled={isLoading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate tags with commas (e.g., tech, coding, web development)
            </p>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="text-lg font-medium text-gray-700 flex">
              <div>Thumbnail</div>
              <div className="relative group ml-2 cursor-pointer">
                <span className="flex items-center justify-center italic bg-blue-500 text-white rounded-full w-5 h-5">
                  i
                </span>
                {/* Tooltip */}
                <div className="absolute left-0 bottom-6 hidden group-hover:block w-28 bg-gray-900 text-white text-sm rounded-lg p-2 shadow-lg">
                  Upload an image for the thumbnail (JPG, PNG). Max size: 2MB.
                </div>
              </div>
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              ref={fileInputRef}
              className="mt-1 block w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-md p-2 shadow-sm"
              required
              disabled={isLoading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload an image for the thumbnail (jpg, png, gif)
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Post..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

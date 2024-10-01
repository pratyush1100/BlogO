import { Blog } from "../models/blogSchema.js";
import { v2 as cloudinary } from "cloudinary"

export const postBlog = async (req, res, next) => {
    try {
        console.log("Request Body: ", req.body);
        console.log("Request Files: ", req.files);
        const { title, description, tags } = req.body;

        // Validate the fields
        if (!title || !description || !tags) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory."
            });
        }

        // Process tags to ensure it's an array
        const processedTags = Array.isArray(tags)
            ? tags // If already an array, use it directly
            : typeof tags === 'string'
                ? tags.split(",").map(tag => tag.trim()) // Split by commas if it's a string
                : []; // Fallback to an empty array if it's neither

        const blogData = {
            title,
            description,
            tags: processedTags, // Use processed tags
        };

        // Handle thumbnail upload
        if (req.files && req.files.thumbnail) {
            const { thumbnail } = req.files;
            if (thumbnail) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(thumbnail.tempFilePath, { folder: "Blog_Thumbnails" });
                    if (!cloudinaryResponse || cloudinaryResponse.error) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to upload thumbnails."
                        });
                    }
                    blogData.thumbnail = {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url,
                    };
                } catch (error) {
                    console.log("Error at Uploading thumbnail. ", error);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to upload thumbnails."
                    });
                }
            }
        }

        blogData.author = req.user._id;
        const post = await Blog.create(blogData);
        return res.status(201).json({
            success: true,
            message: "Blog Posted Successfully.",
            post,
        });
    } catch (error) {
        console.log("Error at postBlog: ", error);
        next(error);
    }
};

export const getMyPosts = async (req, res, next) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json("User is not Authenticated.");
        }
        const blogposts = await Blog.find({ author: userId }).lean();
        if (!blogposts.length) {
            return res.status(404).json({
                success: false,
                message: "No blog posts found."
            });
        }

        // Process tags for each post to ensure they're arrays
        const processedPosts = blogposts.map(post => ({
            ...post,
            tags: Array.isArray(post.tags) ? post.tags : post.tags.split(",").map(tag => tag.trim()) // Ensure tags are an array
        }));

        return res.status(200).json({
            success: true,
            blogposts: processedPosts // Send processed posts with tags as arrays
        });
    } catch (error) {
        console.log("Error while getting the post: ", error);
        return res.status(500).json({
            message: "Error while getting the post."
        });
        next();
    }
};


export const getAll = async (req, res, next) => {
    try {
        const blogposts = await Blog.find();
        return res.status(200).json({
            success: true,
            blogposts
        })
    } catch (error) {
        console.log("Error at getAll function", error)
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}




export const editBlogPosts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const authorid = req.user._id.toString();

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Post doesnot exist. ",
            })
        }
        const blogauthid = blog.author.toString()

        if (!blogauthid || (blogauthid !== authorid)) {
            return res.status(400).json({
                success: false,
                message: "You are not authorised to edit this post. ",
            })
        }

        const { title,
            description
        } = req.body;

        const blogData = {
            title,
            description
        }

        if (req.files && req.files.thumbnail) {
            const { thumbnail } = req.files;
            if (thumbnail) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(thumbnail.tempFilePath, { folder: "Blog_Thumbnails" });
                    if (!cloudinaryResponse || cloudinaryResponse.error) {
                        return res.status(500).json({
                            success: false,
                            messgae: "Failed to upload thumbnails. "
                        })
                    }
                    blogData.thumbnail = {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url,
                    }
                } catch (error) {
                    console.log("Error at Uploading thumbnail. ", error);
                    return res.status(500).json({
                        success: false,
                        messgae: "Failed to upload thumbnails. "
                    })
                }
            }
        }

        const updatedPost = await Blog.findByIdAndUpdate(id, blogData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found. "
            })
        }
        return res.status(200).json({
            success: true,
            message: "Post updated. ",
            updatedPost
        })
    } catch (error) {
        console.log("Error while updating blog : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. "
        })
    }
}


export const deletePost = async (req, res, next) => {
    const { id } = req.params;

    const authorid = req.user._id.toString();

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(400).json({
            success: false,
            message: "Post doesnot exist. ",
        })
    }
    const blogauthid = blog.author.toString()

    if (!blogauthid || (blogauthid !== authorid)) {
        return res.status(400).json({
            success: false,
            message: "You are not authorised to delete this post. ",
        })
    }

    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
        return res.status(400).json({
            success: false,
            message: "Error while deleting the post. "
        })
    }
    return res.status(200).json({
        success: true,
        message: "Post deleted successfully."
    })
}


export const viewPost = async (req, res, next) => {
    const { id } = req.params;

    try {
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, post });
    } catch (error) {

    }
}
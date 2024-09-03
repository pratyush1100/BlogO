import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        // minLength: [100, "Description must contain at least 100 characters."]
    },
    thumbnail: {
        public_id: String,
        url: String,
    },
    tags: {
        type: [String],
        default: [],
        required: true
    }
})

export const Blog = mongoose.model("Blog", blogSchema);
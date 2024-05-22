import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: String,
    post: String,
    likes: [{username: String}],
    dislikes: [{username: String}],
});

export const Post = mongoose.model("posts", postSchema);
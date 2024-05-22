import { Post } from "../models/PostModel.js";
import { User } from "../models/UserModel.js";

export const likePost = async (req, res) => {
    const userId = req.session.user.id;
    const postId = req.params.postId;

    try {
        const user = await User.findById(userId);
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const alreadyLiked = post.likes.some(entry => entry.username === user.username);
        if (alreadyLiked) {
            return res.send("Post already liked by the user");
        }

        post.dislikes = post.dislikes.filter(({ username }) => username !== user.username);
        post.likes.push({ username: user.username });
        await post.save();
        
        return res.send("Liked post successfully");
    } catch (error) {
        return res.status(500).send(`Error while updating likes: ${error.message}`);
    }
}

export const dislikePost = async (req, res) => {
    const userId = req.session.user.id;
    const postId = req.params.postId;
    try {
        const user = await User.findById(userId);
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const alreadyDisliked = post.dislikes.some(entry => entry.username === user.username);
        if (alreadyDisliked) {
            return res.send("Post already disliked by the user");
        }

        post.likes = post.likes.filter(({ username }) => username !== user.username);
        post.dislikes.push({ username: user.username });
        await post.save();
        
        return res.send("Disliked post successfully");
    } catch (error) {
        return res.status(500).send(`Error while updating dislikes: ${error.message}`);
    }
}
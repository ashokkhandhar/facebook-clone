import { User } from '../models/UserModel.js';
import { Post } from '../models/PostModel.js';
import { Friends } from '../models/FriendsModel.js';

export const userProfile = async (req, res) => {
    const reqId = req.params.id;
    try {
        const user = await User.findById(reqId);
        if(user) return res.send(user);
        else return res.status(404).send("user not found");
    } catch(error) {
        return res.status(500).send(`error while fatching data from database in controller: ${error.message}`);
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find().select("username email");
        return res.send(users);
    } catch(error) {
        return res.status(500).send(`error while fetching all users data from database in user controller: ${error.message}`);
    }
}

export const addNewPost = async (req, res) => {
    const userId = req.session.user.id;
    const { post } = req.body;
    try {
        const newPost = new Post({
            userId: userId,
            post: post,
        });
        const response = await newPost.save();
        console.log(response);
        return res.send("added post successfully");
    } catch(error) {
        return res.status(500).send(`error while saving post to database ${error.message}`);
    }
}

export const getUsersPosts = async (req, res) => {
    const userId = req.session.user.id;
    try {
        const userPosts = await Post.find({userId: userId});
        return res.send(userPosts);
    } catch(error) {
        return res.status(500).send(`error while find all post of user from database: ${error.message}`);
    }
}

export const userTimeline = async (req, res) => {
    const userId = req.session.user.id;
    try {
        const frinedListDocument = await Friends.findOne({userId: userId});
        if(!frinedListDocument) return res.send([]);
        const friendsPosts = await Post.find({userId: {$in: frinedListDocument.friendList}});

        const uniqueUserIds = [...new Set(friendsPosts.map(post => post.userId))];
        const users = await User.find({_id: {$in: uniqueUserIds}}).select('username email');

        const mergedData = friendsPosts.map(post => {
            const user = users.find(user => user._id.toString() === post.userId);
            return {post, user};
        });

        return res.send(mergedData);
    } catch(error) {
        return res.status(500).send(`error while fetching all friends: ${error}`);
    }
}

export const deleteUsersPost = async (req, res) => {
    const { id } = req.body;
    try {
        const response = await Post.deleteOne({_id: id});
        console.log(response);
        return res.send("deleted post successfully");
    } catch(error) {
        return res.status(500).send(`error while deleteing post: `, error.message);
    }
}
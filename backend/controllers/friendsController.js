import { User } from '../models/UserModel.js';
import { Friends } from '../models/FriendsModel.js';
import { FriendRequest } from '../models/FriendRequestModel.js';
import mongoose from 'mongoose';

export const fetchFriends = async (req, res) => {
    const userId = req.user.id;
    try {
        const frinedListDocument = await Friends.findOne({userId: userId});
        if(!frinedListDocument) {
            return res.send(null);
        }
        const userFriends = await User.find({_id: {$in: frinedListDocument.friendList}});
        return res.send(userFriends);
    } catch(error) {
        return res.status(500).send(`error while fetching all friends of user from database: ${error.message}`);
    }
}

export const sendFriendRequest = async (req, res) => {
    const {fromUserId, toUserId} = req.body;
    
    const newFriendRequest = new FriendRequest({
        fromUserId: fromUserId,
        toUserId: toUserId
    });
    try {
        const response = await newFriendRequest.save();
        console.log(response);
        return res.send("new friend request sent");
    } catch(error) {
        return res.status(500).send(`error whlie sending new friend request: ${error.message}`);
    }
}

export const fetchAllRequest = async (req, res) => {
    const userId = req.user.id;
    try {
        const allFriendRequests = await FriendRequest.find({ toUserId: userId });
        const fromUserIds = allFriendRequests.map((friendrequest) => new mongoose.Types.ObjectId(friendrequest.fromUserId));
        const users = await User.find({ _id: { $in: fromUserIds } });
        return res.send(users);
    } catch(error) {
        return res.status(500).send(`error while fetching all friend requests: ${error.message}`);
    }
}


export const acceptFriendRequest = async (req, res) => {
    const userId = req.user.id;
    const friendsId = req.params.friendsId; 
    try { 
        await addUserInFriendList(userId, friendsId);
        await addUserInFriendList(friendsId, userId);
        const response = await FriendRequest.find({fromUserId: friendsId, toUserId: userId});
        await FriendRequest.deleteMany({_id: {$in: response.map(request => request._id)}});
        return res.send("added new friend successfully");
    } catch(error) {
        return res.status(500).send(`error while fetching user friendslist from database in friendscontroller: ${error.message}`);
    }
}

const addUserInFriendList = async (userId, friendsId) => {
    const existingDocument = await Friends.findOne({userId: userId});
    if(existingDocument) {
        existingDocument.friendList.push(friendsId);
        const response = await existingDocument.save();
        console.log(response);
    } else {
        const newFriend = new Friends({
            userId: userId,
            friendList: [friendsId],
        });
        const response = await newFriend.save();
        console.log(response);
    }
}

export const unfriend = async (req, res) => {
    const userId = req.user.id;
    const friendsId = req.params.friendsId; 
    try {
        await removeUserFromFriendList(userId, friendsId);
        await removeUserFromFriendList(friendsId, userId);
        return res.send("friend removed successfully");
    } catch(error) {
        return res.status(500).send(`error while removing friend: ${error.message}`);
    }
}

const removeUserFromFriendList = async (userId, friendsId) => {
        const response = await Friends.deleteOne({userId, friendsId});
        console.log(response);
}
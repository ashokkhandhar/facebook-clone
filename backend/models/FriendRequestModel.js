import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    fromUserId: String,
    toUserId: String,
});

export const FriendRequest = mongoose.model("friendRequest", friendRequestSchema);
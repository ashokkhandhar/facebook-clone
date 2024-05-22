import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
    userId: String,
    friendList: [String],
});

export const Friends = mongoose.model("friends", friendSchema);
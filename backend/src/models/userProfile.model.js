import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicUrl: {
        type: String,
        default: ""
    }
});
export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
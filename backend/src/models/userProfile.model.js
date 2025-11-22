import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
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
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
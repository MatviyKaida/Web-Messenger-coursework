import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    userProfileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"
    }
},
{timestamps: true}
);
export const User = mongoose.model("User", userSchema);
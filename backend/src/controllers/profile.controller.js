import cloudinary from "../lib/cloudinary.js";
import UserProfile from "../models/userProfile.model.js";

export const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;
        const {firstName, lastName, bio, profilePicURL} = req.body;
        let updatedUserProfile = await UserProfile.findById(user.UserProfileID);

        if(profilePicURL){
            const uploadResponse = await cloudinary.uploader.upload(profilePicURL);
            if(uploadResponse){
                updatedUserProfile.profilePicUrl = uploadResponse.secure_url;
            }
        }
        updatedUserProfile.firstName = firstName;
        updatedUserProfile.lastName = lastName;
        updatedUserProfile.bio = bio;
        await updatedUserProfile.save();
        res.status(200).json(updatedUserProfile);
    }
    catch (err) {
        console.log(`Update user profile controller error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}
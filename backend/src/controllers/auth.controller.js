import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import UserProfile from "../models/userProfile.model.js";
import { generateToken } from "../utils/JWT.js";

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(password < 8) {
            res.status(400).json({message: "Password must contain at least 8 characters"});
        }
        const user = await User.findOne({email});
        if(user){
            res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const userProfile = new UserProfile()
        userProfile.save();
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            userProfileID: userProfile._id
        });
        if(newUser){
            const token = generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                password:newUser.password,
                userProfileID: newUser.userProfileID._id
            });
        }
        else {
            res.status(400).json({message: "Invalid user creation data"});
        }
    }
    catch (err){
        console.log(`Sign up error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}
export const login = (req, res) => {
    res.status(200).send("login route");
}
export const logout = (req, res) => {
    res.status(200).send("logout route");
}
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(user.password < 8) {
            res.status(400).json({message: "Password must contain at least 8 characters"});
        }
        const user = await User.findOne({email});
        if(user){
            res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            
        })
    }
    catch (err){
        console.log(`Sign up error: ${err}`);
    }
}
export const login = (req, res) => {
    res.status(200).send("login route");
}
export const logout = (req, res) => {
    res.status(200).send("logout route");
}
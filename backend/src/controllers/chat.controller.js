import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createChat = async (req, res) => {
    try{
        const user1 = req.user;
        const user2 = await User.findOne({username: req.params.username});
        if(!user2){
            return res.status(404).json({message: "User you're trying to create chat with doesn't exsist"});
        }
        const chatExists = await Chat.findOne({
            $or: [
                {user1ID: user1._id, user2ID: user2._id},
                {user1ID: user2._id, user2ID: user1._id}
            ]
        });
        if(chatExists){
            return res.status(400).json({message: "Chat already exsists"});
        }
        const newChat = new Chat ({
            user1ID: user1._id,
            user2ID: user2._id
        })
        newChat.save();
        res.status(201).json({message: "Chat created", });
    }
    catch (err) {
        console.log(`Chat creation error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }

}
export const deleteChat = async (req, res) => {
    try {
        const user1 = req.user;
        const user2 = await User.findOne({username: req.params.username});
        if(!user2){
            return res.status(404).json({message: "User you're trying to create chat with doesn't exsist"});
        }
        const chat = await Chat.findOneAndDelete({
            $or: [
                {user1ID: user1._id, user2ID: user2._id},
                {user1ID: user2._id, user2ID: user1._id}
            ]
        });
        res.status(200).json({chat, message: "Chat deleted"});
    }
    catch (err) {
        console.log(`Chat deletion error: ${err}`);
    }
}
import Message from "../models/messages.model.js";
import Chat from "../models/chat.model.js";

export const getMesssagesList = async (req, res) => {
    try {
        const messages = await Message.find({chatID: req.params.chatID})
        .populate({path: "senderID",
            populate: {
                path: "userProfileID",
                model: "UserProfile"
            }});
        res.status(200).json(messages);
    }
    catch (err) {
        console.log(`Get messages error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }

}

export const createMessage = async (req, res) => {
    try {
        const sender = req.user;
        const chat = await Chat.findById(req.params.chatID);
        if(!chat){
            res.status(400).json({message: "Can't create message: Chat doesn't exsist"});
        }
        const textContent = req.body.textContent;
        const message = new Message({
            senderID: sender._id,
            chatID: chat._id,
            textContent: textContent
        });
        const saved = await message.save();
        if(saved) {
            const populatedMessage = await Message.findById(saved._id)
                .populate({
                    path: "senderID",
                    populate: {
                        path: "userProfileID",
                        model: "UserProfile"
                    }
                });
            return res.status(201).json(populatedMessage);
        }
        res.json({message: "Message wasn't saved to database"});
    }
    catch (err) {
        console.log(`createMessage error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}
import Message from "../models/messages.model.js";
import Chat from "../models/chat.model.js";

export const getMesssagesList = async (req, res) => {
    try {
        const messages = await Message.find({chatID: req.params.chatID}).populate("userProfileID");
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
        const chat = await Chat.findById(req.body.chatID);
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
            return res.status(201).json(message);
        }
        res.json({message: "Message wasn't saved to database"});
    }
    catch (err) {
        console.log(`createMessage error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}
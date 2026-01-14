import Message from "../models/messages.model.js";
import Chat from "../models/chat.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";
import CryptoJS from "crypto-js";

const MESSAGE_SECRET_KEY = process.env.MESSAGE_SECRET;

export const getMessagesList = async (req, res) => {
    try {
        const messages = await Message.find({chatID: req.params.chatID})
        .populate({path: "senderID",
            populate: {
                path: "userProfileID",
                model: "UserProfile"
            }});
        const decryptedMessages = messages.map(msg => ({
            ...msg.toObject(),
            textContent: msg.textContent ? CryptoJS.AES.decrypt(msg.textContent, MESSAGE_SECRET_KEY).toString(CryptoJS.enc.Utf8) : "",
            AttachedPicUrl: msg.AttachedPicUrl ? CryptoJS.AES.decrypt(msg.AttachedPicUrl, MESSAGE_SECRET_KEY).toString(CryptoJS.enc.Utf8) : ""
        }));
        res.status(200).json(decryptedMessages);
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
        const imageContent = req.body.AttachedPicUrl;
        let AttachedPicUrl;
        if(imageContent){
            const uploadResponse = await cloudinary.uploader.upload(imageContent);
            AttachedPicUrl = uploadResponse.secure_url;
        }
        const encryptedText = textContent ? CryptoJS.AES.encrypt(textContent, MESSAGE_SECRET_KEY).toString() : "";
        const encryptedImageUrl = AttachedPicUrl ? CryptoJS.AES.encrypt(AttachedPicUrl, MESSAGE_SECRET_KEY).toString() : "";
        const message = new Message({
            senderID: sender._id,
            chatID: chat._id,
            textContent: encryptedText,
            AttachedPicUrl: encryptedImageUrl 
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
            const decryptedMessage = {
                ...populatedMessage.toObject(),
                textContent: textContent || "",
                AttachedPicUrl: AttachedPicUrl || ""
            };
            io.to(chat._id.toString()).emit("newMessage", decryptedMessage);
            return res.status(201).json(decryptedMessage);
        }
        res.json({message: "Message wasn't saved to database"});
    }
    catch (err) {
        console.log(`createMessage error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const chatID = req.params.chatID;
        const messageID = req.params.messageID;
        const deletedMessage = await Message.findOneAndDelete({chatID: chatID, _id: messageID});
        if(deletedMessage){
            io.to(chat._id.toString()).emit("messageDeleted");
            res.status(200).json({message: "Message was deleted"});
        }
        else {
            res.status(404).json({message: "Message not found"});
        }
    }
    catch (err) {
        console.log(`deleteMessage error: ${err}`);
        res.status(500).json({message: "Internal server error"});
    }
}
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
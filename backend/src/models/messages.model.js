import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    textContent: {
        type: String,
        default: ""
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{timestamps: true}
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
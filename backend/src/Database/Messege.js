export class Messege {
    messegeID;
    chat;
    content;
    timestamp;
    constructor (chat, content){
        this.messegeID = Date.now();
        this.chat = chat;
        this.content = content;
        this.timestamp = Date.now();
    }
}
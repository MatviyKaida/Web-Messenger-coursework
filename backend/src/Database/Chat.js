export class Chat {
    chatID;
    user1;
    user2;
    constructor (user1, user2) {
        this.chatID = Date.now();
        this.user1 = user1;
        this.user2 = user2;
    }
}
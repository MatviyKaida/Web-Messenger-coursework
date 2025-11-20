export class Chat {
    chatID;
    user1ID;
    user2ID;
    constructor (user1, user2) {
        this.charID = Date.now();
        this.user1ID = user1;
        this.user2ID = user2;
    }
}
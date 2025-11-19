export class User {
    userID;
    username;
    password;
    constructor (){
        this.userID = Date.now();
        this.username = "user" + Date.now();
        this.password = "pwd" + Date.now() * 2;
    }

}
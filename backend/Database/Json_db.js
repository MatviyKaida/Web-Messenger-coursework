import { IDataBase } from "./IDatabase.js";
import {User} from "./User.js";
import fs from 'fs';
import {Chat} from "./Chat.js";

export class json_db extends IDataBase {
    UsersFilePath = "./Database/Users.json";
    ChatsFilePath = "./Database/Chats.json";
    users = []
    chats = []
    AddUser () {
        let user = new User();
        if(fs.existsSync(this.UsersFilePath)){
            this.users = JSON.parse(fs.readFileSync(this.UsersFilePath));
        }
        this.users.push(user);
        fs.writeFileSync(this.UsersFilePath, JSON.stringify(this.users, null, 4));
    }
    getUsers(){
        return JSON.parse(fs.readFileSync(this.UsersFilePath));
    }
    ChatExsists(user1, user2){
        if(fs.existsSync(this.ChatsFilePath)){
            let chats = JSON.parse(fs.readFileSync(this.ChatsFilePath));
            for(let i = 0; i < chats.length; i++){
                if(chats[i].user1.userID == user1.userID && chats[i].user2.userID == user2.userID){
                    return true;
                }
            }
        }
        return false;
    }
    CreateChat (){
        let users = this.getUsers();
        let user1 = users[Math.floor(Math.random() * users.length)];
        let user2 = users[Math.floor(Math.random() * users.length)];
        while (user1 === user2){
            user2 = users[Math.floor(Math.random() * users.length)];
        }
        if(!this.ChatExsists(user1, user2)){
            let chat = new Chat(user1, user2);
            if(fs.existsSync(this.ChatsFilePath)){
                this.chats = JSON.parse(fs.readFileSync(this.ChatsFilePath));
            }
            this.chats.push(chat);

            chat = new Chat(user2, user1);
            this.chats.push(chat);
            fs.writeFileSync(this.ChatsFilePath, JSON.stringify(this.chats, null, 4));
            return chat;
        }
        return -1;
    }
    ChatCreated(){
        let result = this.CreateChat();
        if(result === -1){
            return false;
        }
        return true;
    }
}
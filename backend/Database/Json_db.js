import { IDataBase } from "./IDatabase.js";
import {User} from "./User.js";
import fs from 'fs';
import {Chat} from "./Chat.js";
import { Messege } from "./Messege.js";

export class json_db extends IDataBase {
    UsersFilePath = "./Database/Users.json";
    ChatsFilePath = "./Database/Chats.json";
    MessegesFilePath = "./Database/Messeges.json";
    TextContentFilePath = "./Database/TextContent.json";
    
    GetUsers(){
        if(fs.existsSync(this.UsersFilePath)){
            return JSON.parse(fs.readFileSync(this.UsersFilePath));
        }
        return [];
    }

    CreateUser () {
        let user = new User();
        let users = this.GetUsers();
        users.push(user);
        fs.writeFileSync(this.UsersFilePath, JSON.stringify(users, null, 4));
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

    GetChats(){
        if(fs.existsSync(this.ChatsFilePath)){
            return JSON.parse(fs.readFileSync(this.ChatsFilePath));
        }
        return [];
    }

    CreateChat (){
        let users = this.GetUsers();
        let user1 = users[Math.floor(Math.random() * users.length)];
        let user2 = users[Math.floor(Math.random() * users.length)];
        while (user1 === user2){
            user2 = users[Math.floor(Math.random() * users.length)];
        }
        let chats = this.GetChats();
        if(!this.ChatExsists(user1, user2)){
            let chat = new Chat(user1, user2);
            chats.push(chat);

            chat = new Chat(user2, user1);
            chats.push(chat);
            fs.writeFileSync(this.ChatsFilePath, JSON.stringify(chats, null, 4));
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
    
    GetMesseges() {
        if(fs.existsSync(this.MessegesFilePath)){
            return JSON.parse(fs.readFileSync(this.MessegesFilePath));
        }
        return [];
    }

    CreateMessege(){
        let chats = this.GetChats();
        let messeges = this.GetMesseges();
        let chat = chats[Math.floor(Math.random() * chats.length)];
        let messege = new Messege(chat, null);
        messeges.push(messege);
        fs.writeFileSync(this.MessegesFilePath, JSON.stringify(messeges, null, 4));
    }
}
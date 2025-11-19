import { IDataBase } from "./IDatabase.js";
import {User} from "../User.js";
import fs, { existsSync } from 'fs';

export class json_db extends IDataBase {
    UsersFilePath = "./Database/Users.json";
    users = []
    AddUser () {
        let user = new User();
        if(existsSync(this.UsersFilePath)){
            this.users = JSON.parse(fs.readFileSync(this.UsersFilePath));
        }
        this.users.push(user);
        fs.writeFileSync(this.UsersFilePath, JSON.stringify(this.users, null, 4));
    }
}
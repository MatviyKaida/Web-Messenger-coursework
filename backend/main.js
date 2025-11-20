import { json_db } from './Database/Json_db.js';
import express from 'express';
const app = express();
const db = new json_db();
const PORT = 5000;

app.get("/user", (req, res) => {
    try {
        db.CreateUser();
        res.status(200).send('<h1>777</h1>');
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})
app.get("/deleteUser/:id", (req, res) => {
    try {
        db.deleteUserByID(req.params.id);
        res.status(200).send('<h1>777</h1>');
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})
app.get("/createChat", (req, res) => {
    try {
        if(db.ChatCreated()){
            res.status(201).send('<h1>Chat was created</h1>');
        }
        else{
            res.status(200).send('<h1>Chat already exsists</h1>');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})
app.get("/createMessege", (req, res) => {
    try {
        db.CreateMessege();
        res.status(200).send('<h1>Messege created</h1>');
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
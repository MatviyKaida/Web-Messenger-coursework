import { json_db } from './Database/Json_db.js';
import express from 'express';
const app = express();
const db = new json_db();
const PORT = 5000;

app.get("/user", (req, res) => {
    try {
        db.AddUser();
        res.status(200).send('<h1>777</h1>');
    }
    catch (err) {
        console.log(err);
    }
})
app.get("/deleteUser/:id", (req, res) => {
    try {
        db.deleteUserByID(req.params.id);
        res.status(200).send('<h1>777</h1>');
    }
    catch (err) {
        console.log(err);
    }
})
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
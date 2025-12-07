import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server (server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("joinChat", (chatID) => {
        socket.join(chatID);
        console.log(`Socket ${socket.id} joined chat ${chatID}`);
    });
    socket.on("joinRoom", (chatID) => {
        socket.join(chatID);
    });
    socket.on("leaveRoom", (chatID) => {
        socket.leave(chatID);
    });
    socket.on("disconnect", ()=> {
        console.log("User disconnected", socket.id);
    })
})

export {app, server, io};
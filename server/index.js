import express from "express";
import http from "http"
import cors from "cors"
import { Server } from "socket.io"
import { roomHandler } from "./room/index.js";

const PORT = 8080
const app = express()
app.use(cors)
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log('user is connected')
    roomHandler(socket)
    socket.on("disconnect", () => {
        console.log("user is disconnected")
    })
})

server.listen(PORT, () => {
    console.log(`Listening to the server on ${PORT}`);
});
import socketIOClient from "socket.io-client"

const WS = "https://vidya.onrender.com"
// const WS = "http://localhost:8080"
export const ws = socketIOClient(WS)
import socketIOClient from "socket.io-client"

const WS = "https://vidya.onrender.com"
export const ws = socketIOClient(WS)
import { v4 as uuidV4 } from "uuid";

const rooms = {};
const chats = {};

export const roomHandler = (socket) => {
    const createRoom = () => {
        const roomId = uuidV4();
        rooms[roomId] = {};
        socket.emit("room-created", { roomId });
        console.log("user created the room");
    };
    const joinRoom = ({ roomId, peerId, userName, sharingVideo }) => {
        if (!rooms[roomId]) rooms[roomId] = {};
        if (!chats[roomId]) chats[roomId] = [];
        socket.emit("get-messages", chats[roomId]);
        console.log(
            "user joined the room",
            roomId,
            peerId,
            userName,
            sharingVideo
        );
        rooms[roomId][peerId] = { peerId, userName, sharingVideo };
        socket.join(roomId);
        socket
            .to(roomId)
            .emit("user-joined", { peerId, userName, sharingVideo });
        socket.emit("get-users", {
            roomId,
            participants: rooms[roomId],
        });

        socket.on("disconnect", () => {
            console.log("user left the room", peerId);
            leaveRoom({ roomId, peerId });
        });
    };

    const leaveRoom = ({ peerId, roomId }) => {
        // rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    };

    const startSharing = ({ peerId, roomId }) => {
        socket.to(roomId).emit("user-started-sharing", peerId);
    };

    const stopSharing = (roomId) => {
        socket.to(roomId).emit("user-stopped-sharing");
    };

    const addMessage = (roomId, message) => {
        console.log({ message });
        if (chats[roomId]) {
            chats[roomId].push(message);
        } else {
            chats[roomId] = [message];
        }
        socket.to(roomId).emit("add-message", message);
    };

    const changeName = ({ peerId, userName, roomId }) => {
        if (rooms[roomId] && rooms[roomId][peerId]) {
            rooms[roomId][peerId].userName = userName;
            socket.to(roomId).emit("name-changed", { peerId, userName });
        }
    };

    const toggleShowingVideo = ({ peerId, roomId, sharingVideo }) => {
        if (rooms[roomId] && rooms[roomId][peerId]) {
            rooms[roomId][peerId].sharingVideo = sharingVideo;
            socket
                .to(roomId)
                .emit("toggled-showing-video", { peerId, sharingVideo });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on("start-sharing", startSharing);
    socket.on("stop-sharing", stopSharing);
    socket.on("send-message", addMessage);
    socket.on("change-name", changeName);
    socket.on("toggle-showing-video", toggleShowingVideo);
};

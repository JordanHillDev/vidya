import { v4 as uuidV4 } from "uuid";
import {
    insertRoom,
    insertUser,
    insertParticipant,
    getMessages,
    getParticipants,
    setPresent,
    setNotPresent,
    insertMessage,
} from "../config/supabaseClient.js";

const rooms = {};
const chats = {};

export const roomHandler = (socket) => {
    const createRoom = async () => {
        const roomId = uuidV4();
        insertRoom(roomId);
        socket.emit("room-created", { roomId });
        console.log("user created the room");
    };
    const joinRoom = async ({
        roomId,
        peerId,
        userName,
        sharingVideo,
        isPresent,
    }) => {
        insertUser(peerId);
        const newParticipant = await insertParticipant(
            peerId,
            roomId,
            userName,
            sharingVideo,
            isPresent
        );
        const messages = await getMessages(roomId);
        console.log(messages);
        const participants = (await getParticipants(roomId)).reduce(
            (acc, curr) => {
                acc[curr.user_id] = { ...curr };
                return acc;
            },
            {}
        );

        // let mapped = participants.reduce((acc, curr) => {
        //     acc[curr.user_id] = {}
        //     return acc
        // }, {})

        // if (!rooms[roomId]) rooms[roomId] = {};
        // if (!chats[roomId]) chats[roomId] = [];

        // Keeps user-joined from refiring when screen-sharing and allows user to rejoin if disconnected
        if (newParticipant || !participants[peerId]?.is_present) {
            setPresent(roomId, peerId);
            socket.emit("get-messages", messages);
            console.log("user joined the room", roomId, peerId, userName);
            socket.join(roomId);
            socket
                .to(roomId)
                .emit("user-joined", { peerId, userName, sharingVideo });
            socket.emit("get-users", {
                roomId,
                participants: participants,
            });
            socket.on("disconnect", () => {
                console.log("user left the room", peerId);
                leaveRoom({ roomId, peerId });
            });
        }
    };

    const leaveRoom = ({ peerId, roomId }) => {
        setNotPresent(roomId, peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    };

    const addMessage = (roomId, messageData) => {
        insertMessage(roomId, messageData.author, messageData.content)
        socket.to(roomId).emit("add-message", messageData);
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

    const toggleSharingMic = ({ peerId, roomId, sharingMic }) => {
        if (rooms[roomId] && rooms[roomId][peerId]) {
            rooms[roomId][peerId].sharingMic = sharingMic;
            socket
                .to(roomId)
                .emit("toggled-sharing-mic", { peerId, sharingMic });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("join-room", joinRoom);
    socket.on("send-message", addMessage);
    socket.on("change-name", changeName);
    socket.on("toggle-showing-video", toggleShowingVideo);
    socket.on("toggle-sharing-mic", toggleSharingMic);
};

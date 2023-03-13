import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// Context
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";
// Components
import Header from "../components/header/Header";
import VideoGrid from "../components/video/VideoGrid";
import Footer from "../components/footer/Footer";
import Chat from "../components/chat/Chat";
// ws
import { ws } from "../ws";

const Room = () => {
    const { id } = useParams();
    console.log(id)
    const { stream, setRoomId } = useContext(RoomContext);
    const { userName, userId, isPresent, } = useContext(UserContext);
    const { toggleChat, chat } = useContext(ChatContext);

    useEffect(() => {
        if (stream) {
            ws.emit("join-room", { roomId: id, peerId: userId, userName, isPresent });
        }
    }, [stream]);

    useEffect(() => {
        setRoomId(id || "");
    }, [id, setRoomId]);

    // Closes socket connection when leaving the site
    useEffect(() => {
        window.onpopstate = e => {
            ws.close()
        }
    }, [])

    return (
        <div
            className="max-h-screen grid grid-rows-grail grid-cols-grail bg-stone-800"
            style={{ maxHeight: "100vh", height: "100vh" }}
        >
            <Header roomId={id} />
            <VideoGrid toggleChat={toggleChat} />
            {chat.isChatOpen && <Chat />}
            <Footer />
        </div>
    );
};

export default Room;

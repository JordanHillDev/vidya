import { useEffect, useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// Context
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";
// Components
import Header from "../components/Header";
import VideoGrid from "../components/VideoGrid";
import Footer from "../components/Footer";
import Chat from "../components/chat/Chat";
import Video from "../components/Video";
// ws
import { ws } from "../ws";

const Room = () => {
    const ref = useRef()
    const [height, setHeight] = useState("100vh")
    const { id } = useParams();
    const {
        stream,
        screenStream,
        peers,
        shareScreen,
        screenSharingId,
        setRoomId,
    } = useContext(RoomContext);
    const { userName, userId } = useContext(UserContext);
    const { toggleChat, chat } = useContext(ChatContext);

    useEffect(() => {
        if (stream)
            ws.emit("join-room", { roomId: id, peerId: userId, userName });
    }, [id, userId, stream, userName]);

    useEffect(() => {
        setRoomId(id || "");
    }, [id, setRoomId]);

    useEffect(() => {
        function resize() {
            setHeight("100vh")
        }

        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <div ref={ref} className="max-h-screen grid grid-rows-grail grid-cols-grail" style={{maxHeight: "100vh", height: height}}>
            <Header />
            <VideoGrid />
            <Chat />
            <Footer />
        </div>
    );
};

export default Room;

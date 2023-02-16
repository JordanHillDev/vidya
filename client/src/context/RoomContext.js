import {
    createContext,
    useEffect,
    useState,
    useReducer,
    useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { ws } from "../ws";
import { peersReducer } from "../reducers/peerReducer";
import {
    addPeerStreamAction,
    addPeerNameAction,
    removePeerStreamAction,
    addAllPeersAction,
} from "../reducers/peerActions";
import { UserContext } from "./UserContext";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const navigate = useNavigate();
    const { userName, userId } = useContext(UserContext);
    const [me, setMe] = useState();
    const [stream, setStream] = useState();
    const [sharingVideo, setSharingVideo] = useState(false);
    const [sharingAudio, setSharingAudio] = useState(false);
    const [screenStream, setScreenStream] = useState();
    const [screenSharingId, setScreenSharingId] = useState("");
    const [roomId, setRoomId] = useState();
    const [peers, dispatch] = useReducer(peersReducer, {});

    const enterRoom = ({ roomId }) => {
        navigate(`/room/${roomId}`);
    };

    const getUsers = ({ participants }) => {
        dispatch(addAllPeersAction(participants));
    };

    const removePeer = (peerId) => {
        dispatch(removePeerStreamAction(peerId));
    };

    const switchStream = (stream) => {
        setStream(stream);
        setScreenSharingId(me?.id || "");
        Object.values(me?.connections).forEach((connection) => {
            const videoTrack = stream
                ?.getTracks()
                .find((track) => track.kind === "video");
            connection[0].peerConnection
                .getSenders()
                .find((sender) => sender.track.kind === "video")
                .replaceTrack(videoTrack)
                .catch((err) => console.error(err));
        });
    };

    const shareScreen = () => {
        if (screenSharingId) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then(switchStream);
        } else {
            navigator.mediaDevices.getDisplayMedia().then((stream) => {
                switchStream(stream);
                setScreenStream(stream);
            });
        }
    };

    const nameChangedHandler = ({ peerId, userName }) => {
        dispatch(addPeerNameAction(peerId, userName));
    };

    const toggleStream = () => {
        const track = stream.getTracks().find(track => track.kind === 'video')
        if(track.enabled) {
            track.enabled = false;
            setSharingVideo(false)
        } else {
            track.enabled = true;
            setSharingVideo(true)
        }
    };

    useEffect(() => {
        ws.emit("change-name", { peerId: userId, userName, roomId });
    }, [userName, userId, roomId]);

    useEffect(() => {
        const peer = new Peer(userId);
        setMe(peer);

        try {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    setSharingVideo(!!stream.getVideoTracks().length);
                    setSharingAudio(!!stream.getAudioTracks().length);
                    setStream(stream);
                });
        } catch (error) {
            console.error(error);
        }

        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers);
        ws.on("user-disconnected", removePeer);
        ws.on("user-started-sharing", (peerId) => setScreenSharingId(peerId));
        ws.on("user-stopped-sharing", () => setScreenSharingId(""));
        ws.on("name-changed", nameChangedHandler);

        return () => {
            ws.off("room-created");
            ws.off("get-users");
            ws.off("user-disconnected");
            ws.off("user-started-sharing");
            ws.off("user-stopped-sharing");
            ws.off("user-joined");
            ws.off("name-changed");
            me?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (screenSharingId) {
            ws.emit("start-sharing", { peerId: screenSharingId, roomId });
        } else {
            ws.emit("stop-sharing");
        }
    }, [screenSharingId, roomId]);

    useEffect(() => {
        if (!me) return;
        if (!stream) return;

        ws.on("user-joined", ({ peerId, userName: name }) => {
            const call = me.call(peerId, stream, {
                metadata: {
                    userName,
                },
            });
            call.on("stream", (peerStream) => {
                dispatch(addPeerStreamAction(peerId, peerStream));
            });
            dispatch(addPeerNameAction(peerId, name));
        });

        me.on("call", (call) => {
            const { userName } = call.metadata;
            dispatch(addPeerNameAction(call.peer, userName));
            call.answer(stream);
            call.on("stream", (peerStream) => {
                dispatch(addPeerStreamAction(call.peer, peerStream));
            });
        });

        return () => {
            ws.off("user-joined");
        };
    }, [me, stream, userName]);

    return (
        <RoomContext.Provider
            value={{
                stream,
                screenStream,
                peers,
                shareScreen,
                roomId,
                setRoomId,
                screenSharingId,
                sharingVideo,
                sharingAudio,
                toggleStream,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

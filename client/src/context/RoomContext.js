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
// Reducers / Actions
import { peersReducer } from "../reducers/peerReducer";
import {
    addPeerStreamAction,
    addPeerNameAction,
    removePeerStreamAction,
    addAllPeersAction,
    toggleSharingVideoAction,
} from "../reducers/peerActions";
// Context
import { UserContext } from "./UserContext";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const navigate = useNavigate();
    const enterRoom = ({ roomId }) => {
        navigate(`/room/${roomId}`);
    };

    // Context
    const { userName, userId, sharingVideo, setSharingVideo } =
        useContext(UserContext);

    // State
    const [me, setMe] = useState();
    const [stream, setStream] = useState();
    const [roomId, setRoomId] = useState();
    const [sharingScreen, setSharingScreen] = useState(false);

    // Dispatch / Actions
    const [peers, dispatch] = useReducer(peersReducer, {});

    const getUsers = ({ participants }) => {
        dispatch(addAllPeersAction(participants));
    };

    const removePeer = (peerId) => {
        dispatch(removePeerStreamAction(peerId));
    };

    const nameChangedHandler = ({ peerId, userName }) => {
        dispatch(addPeerNameAction(peerId, userName));
    };

    const showingVideoHandler = ({ peerId, sharingVideo }) => {
        dispatch(toggleSharingVideoAction(peerId, sharingVideo));
    };

    // Effects
    useEffect(() => {
        const tracks = stream?.getVideoTracks();
        if (tracks) tracks.forEach((track) => (track.enabled = sharingVideo));
        ws.emit("toggle-showing-video", {
            peerId: userId,
            roomId,
            sharingVideo,
        });
    }, [sharingVideo, userId, roomId, stream]);

    useEffect(() => {
        ws.emit("change-name", { peerId: userId, userName, roomId });
    }, [userName]);

    const getStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setSharingVideo(!!stream.getVideoTracks().length);
            setStream(stream);
        } catch (error) {
            console.error(error);
        }
    };

    const switchStream = (stream) => {
        setStream(stream);
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
        if (sharingScreen) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => switchStream(stream));
                setSharingScreen(false)
        } else {
            navigator.mediaDevices.getDisplayMedia().then((stream) => {
                switchStream(stream);
                setSharingScreen(true)
            });
        }
    };

    useEffect(() => {
        const peer = new Peer(userId);
        setMe(peer);
        if(!stream) getStream();

        ws.on("room-created", enterRoom);
        ws.on("get-users", getUsers);
        ws.on("user-disconnected", removePeer);
        ws.on("name-changed", nameChangedHandler);
        ws.on("toggled-showing-video", showingVideoHandler);

        return () => {
            ws.off("room-created");
            ws.off("get-users");
            ws.off("user-disconnected");
            ws.off("user-joined");
            ws.off("name-changed");
            me?.disconnect();
        };
    }, []);

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
                peers,
                roomId,
                setRoomId,
                sharingVideo,
                sharingScreen,
                setSharingScreen,
                shareScreen
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

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

    useEffect(() => {
        const peer = new Peer(userId);
        setMe(peer);

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

        getStream();

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
                console.log('call.on("stream")');
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
    }, [me, stream, userName, sharingVideo]);

    return (
        <RoomContext.Provider
            value={{
                stream,
                peers,
                roomId,
                setRoomId,
                sharingVideo,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

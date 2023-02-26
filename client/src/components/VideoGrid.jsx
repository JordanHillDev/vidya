import { useRef, useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";
import useGridResize from "../hooks/useGridResize";
import Video from "./Video";

const VideoGrid = ({ toggleChat }) => {
    const { stream, peers, screenSharingId } = useContext(RoomContext);
    const { sharingVideo } = useContext(UserContext);
    const gridRef = useRef(null);
    const { [screenSharingId]: sharing, ...peersToShow } = peers;
    const [videoDimensions, setVideoDimensions] = useGridResize(
        gridRef,
        toggleChat,
        peers
    );

    useEffect(() => {
        setVideoDimensions("");
    }, []);

    return (
        <div
            ref={gridRef}
            className="col-start-1 col-end-2 min-h-full flex flex-wrap justify-center content-start bg-stone-800"
        >
            <Video
                stream={stream}
                videoDimensions={videoDimensions}
                sharingVideo={sharingVideo}
            />
            {Object.values(peers)
                .filter((peer) => !!peer.stream)
                .map((peer) => (
                    <Video
                        key={peer.peerId}
                        stream={peer.stream}
                        videoDimensions={videoDimensions}
                        userName={peer.userName || "Anonymous"}
                        sharingVideo={peer.sharingVideo}
                    />
                ))}
        </div>
    );
};

export default VideoGrid;

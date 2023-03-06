import { useRef, useContext, useEffect } from "react";
// Context
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
// Hooks
import useGridResize from "../../hooks/useGridResize";
// Components
import Video from "./Video";

const VideoGrid = ({ toggleChat }) => {
    const { stream, peers } = useContext(RoomContext);
    const { sharingVideo } = useContext(UserContext);
    const gridRef = useRef(null);
    const [videoDimensions, setVideoDimensions] = useGridResize(
        gridRef,
        toggleChat,
        peers
    );

    console.log(peers)

    useEffect(() => {
        setVideoDimensions("");
    }, [setVideoDimensions]);

    return (
        <div
            ref={gridRef}
            className="col-start-1 col-end-2 min-h-full flex flex-wrap justify-center content-start bg-stone-800"
        >
            <Video
                key={'me'}
                stream={stream}
                videoDimensions={videoDimensions}
                sharingVideo={sharingVideo}
                isMe={true}
            />
            {Object.values(peers)
                .filter((peer) => !!peer.stream)
                .map((peer) => (
                    <Video
                        key={peer.stream.id}
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

import { useRef, useContext, useEffect } from "react";
import { RoomContext } from "../context/RoomContext";
import useGridResize from "../hooks/useGridResize";
import Video from "./Video";

const VideoGrid = ({ toggleChat }) => {
    const { stream, screenStream, peers, shareScreen, screenSharingId } =
        useContext(RoomContext);
    const gridRef = useRef(null);
    const { [screenSharingId]: sharing, ...peersToShow } = peers;
    const [videoDimensions, setVideoDimensions] = useGridResize(
        gridRef,
        toggleChat,
        peersToShow
    );

    useEffect(() => {
        setVideoDimensions("");
    }, []);

    return (
        <div
            ref={gridRef}
            className="col-start-1 col-end-2 min-h-full flex flex-wrap justify-center content-start bg-stone-800"
        >
            <Video stream={stream} videoDimensions={videoDimensions} />
            {Object.values(peersToShow)
                .filter((peer) => !!peer.stream)
                .map((peer) => (
                    <Video
                        key={peer.peerId}
                        stream={peer.stream}
                        videoDimensions={videoDimensions}
                        userName={peer.userName || "Anonymous"}
                    />
                ))}
        </div>
    );
};

export default VideoGrid;

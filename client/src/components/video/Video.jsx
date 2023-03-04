import { useEffect, useRef } from "react";
// Components
import NameInput from "../common/NameInput";
import { NoStreamPoster } from "./NoStreamPoster";

const Video = ({ stream, videoDimensions, userName, sharingVideo, isMe }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div
            className="grid"
            style={{
                position: "relative",
                // outline: '2px solid white'
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={true}
                style={{
                    height: videoDimensions.height,
                    width: videoDimensions.width,
                    objectFit: "cover",
                    gridColumn: "1 / 2",
                    gridRow: "1 / 2",
                    transition: 'height 1s, width 1s'
                }}
            />
            {!sharingVideo && <NoStreamPoster videoDimensions={videoDimensions} />}
            <div className="flex col-start-1 col-end-2 row-start-1 row-end-2 self-end">
                {userName && (
                    <div className="bg-stone-800 px-2 py-1 rounded-tr text-sm sm:text-xs text-white z-10">
                        {userName}
                    </div>
                )}
                {isMe && (
                    <NameInput  style={{width: "200px", zIndex: '10'}}/>
                )}
            </div>
        </div>
    );
};

export default Video;

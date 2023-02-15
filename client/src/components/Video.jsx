import { useEffect, useRef } from "react";
// Components
import NameInput from "./NameInput";
import { NoStreamVideo } from "./NoStreamVideo";

const Video = ({ stream, videoDimensions, userName }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    console.log(stream);
    return (
        <div className="grid">
            {stream && <video
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
                }}
            />}
            {!stream && <NoStreamVideo videoDimensions={videoDimensions} />}

            <div className="flex col-start-1 col-end-2 row-start-1 row-end-2 self-end">
                {userName && (
                    <div className="bg-cyan-200 px-2 py-1 rounded-tr text-sm sm:text-xs">
                        {userName}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Video;

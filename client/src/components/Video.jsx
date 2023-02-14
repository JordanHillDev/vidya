import { useEffect, useRef } from "react";
import classNames from "classnames";

const Video = ({ className, stream, videoDimensions}) => {
    const videoRef = useRef();
    
    useEffect(() => {
        // videoRef.current.offsetHeight = videoDimensions.height;
        // videoRef.current.offsetWidth = videoDimensions.width;

        console.log(videoDimensions)
    }, [videoDimensions])
    

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (
        <video ref={videoRef} autoPlay muted={true} style={{height: videoDimensions.height, width: videoDimensions.width}} />
    );
};

export default Video;

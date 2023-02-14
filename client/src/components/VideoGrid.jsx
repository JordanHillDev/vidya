import { useState, useEffect, useRef, useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import Video from "./Video";

const VideoGrid = ({ children }) => {
    const {
        stream,
        screenStream,
        peers,
        shareScreen,
        screenSharingId,
        setRoomId,
    } = useContext(RoomContext);
    const ref = useRef(null);
    const [gridDimensions, setGridDimensions] = useState({
        height: "100%",
        width: "100%",
    });
    const [videoDimensions, setVideoDimensions] = useState({
        height: "300px",
        width: "400px",
    });

    const { [screenSharingId]: sharing, ...peersToShow } = peers;

    let margin = 0;

    useEffect(() => {
        function handleResize() {
            setGridDimensions({
                height: ref.current.offsetHeight,
                width: ref.current.offsetWidth,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        let max = 0;
        let i = 0;
        while (i < 5000) {
            let area = calcArea(i);
            if (area === false) {
                max = i - 1;
                break;
            }
            i++;
        }

        max = max - margin * 2;

        setVideoDimensions({
            height: max * (3 / 4) + "px",
            width: max + "px",
        });

        function calcArea(incr) {
            let j = 0;
            let w = 0;
            let h = incr * (3 / 4) + margin * 2;
            while (j < ref.current.childElementCount) {
                if (w + incr > gridDimensions.width) {
                    w = 0;
                    h = h + incr * (3 / 4) + margin * 2;
                }
                w = w + incr + margin * 2;
                j++;
            }
            if (h > gridDimensions.height || incr > gridDimensions.width)
                return false;
            else return incr;
        }
    }, [gridDimensions, margin]);

    return (
        <div
            ref={ref}
            className="col-start-1 col-end-2 h-full flex flex-wrap justify-center content-start bg-stone-800"
        >
            <Video stream={stream} videoDimensions={videoDimensions} />
            <Video stream={stream} videoDimensions={videoDimensions} />
            <Video stream={stream} videoDimensions={videoDimensions} />
            <Video stream={stream} videoDimensions={videoDimensions} />
        </div>
    );
};

export default VideoGrid;

import { useState, useEffect } from "react";

export default function useGridResize(gridRef, toggleChat, peers) {
    const [gridDimensions, setGridDimensions] = useState({});
    const [videoDimensions, setVideoDimensions] = useState({});

    let margin = 10;

    useEffect(() => {
        function handleResize() {
            setGridDimensions({
                height: gridRef.current.offsetHeight,
                width: gridRef.current.offsetWidth,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [gridRef, toggleChat, peers]);

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
            height: max * (9 / 16) + "px",
            width: max + "px",
        });

        function calcArea(incr) {
            let j = 0;
            let w = 0;
            let h = incr * (9 / 16) + margin * 2;
            while (j < gridRef.current.childElementCount) {
                if (w + incr > gridDimensions.width) {
                    w = 0;
                    h = h + incr * (9 / 16) + margin * 2;
                }
                w = w + incr + margin * 2;
                j++;
            }
            if (h > gridDimensions.height || incr > gridDimensions.width)
                return false;
            else return incr;
        }
    }, [gridDimensions, margin, gridRef]);

    return [videoDimensions, setVideoDimensions];
}

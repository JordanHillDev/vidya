import { useContext } from "react";
import { Tooltip } from "react-tooltip";
// Context
import { RoomContext } from "../../context/RoomContext";
// Icons
import { sharingVideoIcon, notSharingVideoIcon } from "../../assets/icons";

export const ToggleStreamButton = ({ toggleStream }) => {
    const { sharingVideo } = useContext(RoomContext);

    return (
        <button
            onClick={toggleStream}
            className="text-white rounded-full p-4 bg-orange-600 hover:bg-orange-500 mx-2"
            id="toggleStreamTip"
        >
            {sharingVideo ? sharingVideoIcon : notSharingVideoIcon}
            <Tooltip
                anchorSelect="#toggleStreamTip"
                content={sharingVideo ? "Stop Sharing Video" : "Share Video"}
                style={{ color: "black", backgroundColor: "white" }}
            />
        </button>
    );
};

import { useContext } from "react";
import { Tooltip } from "react-tooltip";
// Context
import { RoomContext } from "../../context/RoomContext";
// Icons
import { shareScreenIcon } from "../../assets/icons";

export const ToggleShareScreenButton = ({ toggleShareScreen }) => {
    const { sharingScreen } = useContext(RoomContext);

    return (
        <button
            onClick={toggleShareScreen}
            className="text-white rounded-full p-4 bg-blue-600 hover:bg-blue-500 mx-2"
            id="toggleShareScreenTip"
        >
            {shareScreenIcon}
            <Tooltip
                anchorSelect="#toggleShareScreenTip"
                content={sharingScreen ? "Stop Sharing Screen" : "Share Screen"}
                style={{ color: "black", backgroundColor: "white" }}
            />
        </button>
    );
};

import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { sharingVideoIcon, notSharingVideoIcon } from "../assets/icons";

export const ToggleStreamButton = ({ toggleStream }) => {
    const { sharingVideo } = useContext(RoomContext);

    return (
        <button
            onClick={toggleStream}
            className="text-white rounded-full p-4 bg-orange-600 hover:bg-orange-500 mx-2"
        >
            {sharingVideo ? sharingVideoIcon : notSharingVideoIcon}
        </button>
    );
};

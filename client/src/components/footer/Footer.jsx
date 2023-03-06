import { useContext } from "react";
// Context
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { RoomContext } from "../../context/RoomContext";
// Components
import { ToggleChatButton } from "./ToggleChatButton";
import { ToggleStreamButton } from "./ToggleStreamButton";
import { ToggleShareScreenButton } from "./ToggleShareScreenButton";

const Footer = () => {
    const { toggleChat, unread } = useContext(ChatContext);
    const { toggleSharingVideo } = useContext(UserContext);
    const { sharingScreen, setSharingScreen, shareScreen } = useContext(RoomContext)

    function toggleSharingScreen() {
        setSharingScreen((curr) => !curr)
    }

    return (
        <div className="col-start-1 col-end-3 bg-stone-800 h-[100px] flex justify-center z-10">
            <div className="flex items-center">
                <ToggleStreamButton toggleStream={toggleSharingVideo} />
                <ToggleShareScreenButton toggleShareScreen={shareScreen} />
                <ToggleChatButton toggleChat={toggleChat} unread={unread} />
            </div>
        </div>
    );
};

export default Footer;

import { useContext } from "react";
// Context
import { ChatContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { RoomContext } from "../../context/RoomContext";
// Components
import { ToggleChatButton } from "./ToggleChatButton";
import { ToggleStreamButton } from "./ToggleStreamButton";
import { ToggleShareScreenButton } from "./ToggleShareScreenButton";
import { ToggleCMicButton } from "./ToggleMicButton";

const Footer = () => {
    const { toggleChat, unread } = useContext(ChatContext);
    const { toggleSharingVideo, toggleSharingMic } = useContext(UserContext);
    const { shareScreen } = useContext(RoomContext);

    return (
        <div className="col-start-1 col-end-3 bg-stone-800 h-[100px] flex justify-center z-10">
            <div className="flex items-center">
                <ToggleStreamButton toggleStream={toggleSharingVideo} />
                <ToggleCMicButton toggleSharingMic={toggleSharingMic}/>
                <ToggleShareScreenButton toggleShareScreen={shareScreen} />
                <ToggleChatButton toggleChat={toggleChat} unread={unread} />
            </div>
        </div>
    );
};

export default Footer;

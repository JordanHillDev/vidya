import { useContext } from "react";
// Context
import { ChatContext } from "../context/ChatContext";
import { UserContext } from "../context/UserContext";
// Components
import { ToggleChatButton } from "./ToggleChatButton";
import { ToggleStreamButton } from "./ToggleStreamButton";

const Footer = () => {
    const { toggleChat, unread } = useContext(ChatContext);
    const { toggleSharingVideo } = useContext(UserContext)

    return (
        <div className="col-start-1 col-end-3 bg-stone-800 h-[100px] flex justify-center z-10">
            <div className="flex items-center">
                <ToggleStreamButton toggleStream={toggleSharingVideo}/>
                <ToggleChatButton toggleChat={toggleChat} unread={unread}/>
            </div>
        </div>
    );
};

export default Footer;

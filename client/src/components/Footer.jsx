import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { ToggleChatButton } from "./ToggleChatButton";
import { ToggleStreamButton } from "./ToggleStreamButton";

const Footer = () => {
    const { toggleChat } = useContext(ChatContext);

    return (
        <div className="col-start-1 col-end-3 bg-stone-800 h-[100px] flex justify-center">
            <div className="flex items-center">
                <ToggleStreamButton />
                <ToggleChatButton toggleChat={toggleChat} />
            </div>
        </div>
    );
};

export default Footer;

import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import ChatButton from "./ChatButton";

const Footer = () => {
    const { toggleChat } = useContext(ChatContext);

    return (
        <div className="col-start-1 col-end-3 bg-stone-800 h-[100px] flex justify-center">
            <div>
                <ChatButton toggleChat={toggleChat} />
            </div>
        </div>
    );
};

export default Footer;

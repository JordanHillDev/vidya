import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

const Chat = () => {
    const { chat } = useContext(ChatContext);

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                {chat.messages.map((message) => (
                    <ChatBubble
                        message={message}
                        key={
                            message.timeStamp + (message?.author || "anonymous")
                        }
                    />
                ))}
            </div>
            <ChatInput />
        </div>
    );
};

export default Chat;

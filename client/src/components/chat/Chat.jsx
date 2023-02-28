import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

const Chat = () => {
    const { chat } = useContext(ChatContext);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    return (
        <div
            className="flex flex-col h-full justify-between bg-stone-800 border-l-4 border-b-4 border-orange-600 rounded-bl-md py-1 px-1"
            style={{
                maxHeight: "calc(100vh - 200px)",
            }}
        >
            <div className="overflow-y-scroll scrollbar-hide">
                {chat.messages.map((message) => (
                    <ChatBubble
                        message={message}
                        key={
                            message.timeStamp + (message?.author || "anonymous")
                        }
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            <ChatInput />
        </div>
    );
};

export default Chat;

import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
import { Button } from "../../common/Button";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useContext(ChatContext);
    const { userId } = useContext(UserContext);
    const { roomId } = useContext(RoomContext);

    return (
        <div className="border-zinc-700">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(message, roomId, userId);
                    setMessage("");
                }}
            >
                <div className="flex">
                    <textarea
                        className="border"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <Button type="submit" className="py-2 px-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;
import { useContext, useState } from "react";
// Context
import { ChatContext } from "../../context/ChatContext";
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
// Icons
import { sendMessageIcon } from "../../assets/icons";
// Components
import { Button } from "../../common/Button";


const ChatInput = () => {
    const [message, setMessage] = useState("");
    const { sendMessage } = useContext(ChatContext);
    const { userId } = useContext(UserContext);
    const { roomId } = useContext(RoomContext);

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(message, roomId, userId);
        setMessage("");
    }

    return (
        <div className="border-zinc-700">
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                    <textarea
                        className="border rounded-md p-1 resize-none"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <Button type="submit" className="py-1 px-6">
                        {sendMessageIcon}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;

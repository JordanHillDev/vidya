import { useContext } from "react";
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
import classNames from "classnames";

const ChatBubble = ({ message }) => {
    const { peers } = useContext(RoomContext);
    const { userId } = useContext(UserContext);
    const author = message.author && peers[message.author].userName;
    const userName = author || "Anonymous";
    const isSelf = message.author === userId;
    const time = new Date(message.timeStamp).toLocaleTimeString();

    return (
        <div
            className={classNames("m-2 flex", {
                "pl-10 justify-end": isSelf,
                "p5-10 justify-start": !isSelf,
            })}
        >
            <div className="flex flex-col">
                <div
                    className={classNames("inline-block py-2 px-4 rounded", {
                        "bg-red-200": isSelf,
                        "bg-red-300": !isSelf,
                    })}
                >
                    {message.content}
                    <div
                        className={classNames("text-xs text-white opacity-50", {
                            "text-right": isSelf,
                            "text-left": !isSelf,
                        })}
                    >
                        {time}
                    </div>
                </div>
                <div
                    className={classNames("text-md text-black", {
                        "text-right": isSelf,
                        "text-left": !isSelf,
                    })}
                >
                    {isSelf ? "You" : userName}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble
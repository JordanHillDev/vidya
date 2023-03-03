import { toggleChatIcon } from "../assets/icons";

const unreadDot = (
    <div
        style={{
            width: "20px",
            height: "20px",
            borderRadius: "100%",
            position: "absolute",
            backgroundColor: "white",
            top: "0",
            right: "0px",
            border: "5px solid red",
        }}
    ></div>
);

export const ToggleChatButton = ({ toggleChat, unread }) => {
    return (
        <div style={{ position: "relative" }}>
            <button onClick={toggleChat} className="text-white rounded-full p-4 bg-purple-700 hover:bg-purple-600 mx-2">
                {toggleChatIcon}
            </button>
            {unread && unreadDot}
        </div>
    );
};

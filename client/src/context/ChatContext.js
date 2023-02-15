import { createContext, useEffect, useReducer } from "react";
import { chatReducer } from "../reducers/chatReducer";
import { addMessageAction, addHistoryAction, toggleChatAction, } from "../reducers/chatActions";
import { ws } from "../ws";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chat, chatDispatch] = useReducer(chatReducer, {
        messages: [],
        isChatOpen: false,
    });
    const sendMessage = (message, roomId, author) => {
        const messageData = {
            content: message,
            timeStamp: new Date().getTime(),
            author,
        };
        chatDispatch(addMessageAction(messageData));

        ws.emit("send-message", roomId, messageData);
    };

    const addMessage = (message) => {
        chatDispatch(addMessageAction(message));
    };

    const addHistory = (messages) => {
        chatDispatch(addHistoryAction(messages));
    };

    const toggleChat = () => {
        chatDispatch(toggleChatAction(!chat.isChatOpen));
    };

    useEffect(() => {
        ws.on("add-message", addMessage);
        ws.on("get-messages", addHistory);
        return () => {
            ws.off("add-message", addMessage);
            ws.off("get-messages", addHistory);
        };
    }, []);
    return (
        <ChatContext.Provider
            value={{
                chat,
                toggleChat,
                sendMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

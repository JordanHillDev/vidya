import { createContext, useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId] = useState(localStorage.getItem("userId") || uuidV4());
    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || ""
    );
    const [sharingVideo, setSharingVideo] = useState(false);
    const [sharingMic, setSharingMic] = useState(false);
    const [isPresent, setIsPresent] = useState(false)

    const toggleSharingVideo = () => {
        setSharingVideo((curr) => !curr)
    };

    const toggleSharingMic = () => {
        setSharingMic((curr) => !curr)
    }

    useEffect(() => {
        localStorage.setItem("userName", userName);
    }, [userName]);

    useEffect(() => {
        localStorage.setItem("userId", userId);
    }, [userId]);

    return (
        <UserContext.Provider
            value={{
                userId,
                userName,
                setUserName,
                sharingVideo,
                setSharingVideo,
                toggleSharingVideo,
                sharingMic,
                setSharingMic,
                toggleSharingMic,
                isPresent,
                setIsPresent
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

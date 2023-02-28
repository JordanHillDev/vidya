import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NameInput = ({style}) => {
    const { userName, setUserName } = useContext(UserContext);

    return (
        <input
            className="border rounded-md p-2 h-10 my-2 w-full"
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            style={style}
        />
    );
};

export default NameInput;

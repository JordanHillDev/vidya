import { Button } from "../common/Button";
import NameInput from "./NameInput";
import { ws } from "../ws";

const CreateRoom = () => {
    const createRoom = () => {
        ws.emit("create-room");
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter") createRoom()
    }

    return (
        <div className="flex flex-col mt-8">
            <NameInput handleKeyDown={handleKeyDown}/>
            <Button onClick={createRoom}>Create A Room</Button>
        </div>
    );
};

export default CreateRoom;

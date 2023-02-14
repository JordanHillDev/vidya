import { Button } from "../common/Button";

import { ws } from "../ws";

const CreateRoom = () => {
    const createRoom = () => {
        ws.emit("create-room");
    };

    return (
        <div className="flex flex-col mt-8">
            <Button onClick={createRoom}>Create A Room</Button>
        </div>
    );
};

export default CreateRoom;

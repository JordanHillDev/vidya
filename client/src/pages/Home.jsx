import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../components/common/Logo";
import { Spinner } from "../components/common/Spinner";
import CreateRoom from "../components/CreateRoom";
import { RoomContext } from "../context/RoomContext";

const Home = () => {
    const [roomId, setRoomId] = useState('')
    const { connectedToSocket } = useContext(RoomContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(id)  navigate(`/room/${id}`)
    }, [])
    
    return (
        <div className="App flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-t from-orange-600 to-amber-500">
            <Logo className="mb-20" />
            {connectedToSocket && <CreateRoom />}
            {!connectedToSocket && (
                <div className="flex flex-col items-center">
                    <Spinner />
                    <h2 className="py-8 text-white">Please allow a few seconds to connect to the server...</h2>
                </div>
            )}
            <div>
                <input type='text' onChange={(e) => setRoomId(e.target.value)} value={roomId}/>
                <button onClick={() =>  navigate(`/room/${roomId}`)}>Join Room</button>
            </div>
        </div>
    );
};

export default Home;

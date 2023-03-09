import { useContext } from "react";
import { Logo } from "../components/common/Logo";
import { Spinner } from "../components/common/Spinner";
import CreateRoom from "../components/CreateRoom";
import { RoomContext } from "../context/RoomContext";

const Home = () => {
    const { connectedToSocket } = useContext(RoomContext);

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
        </div>
    );
};

export default Home;

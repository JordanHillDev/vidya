import { Logo } from "../components/Logo";
import CreateRoom from "../components/CreateRoom";

const Home = () => {
    return (
        <div className="App flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-t from-orange-600 to-amber-500">
            <Logo className="mb-20" />
            <CreateRoom />
        </div>
    );
};

export default Home;

import { Logo } from "./Logo";
import CopyRoomId from "./CopyRoomId";

const Header = ({ roomId }) => {
    return (
        <div className=" col-start-1 col-end-4 bg-gradient-to-t from-orange-600 to-amber-500 flex items-center h-[100px] justify-between px-2">
            <Logo className="text-[50px]" />
            <CopyRoomId />
        </div>
    );
};

export default Header;

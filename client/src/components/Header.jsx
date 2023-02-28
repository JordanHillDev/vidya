import { Logo } from "./Logo";

const Header = ({roomId}) => {

    return (
        <div className=" col-start-1 col-end-4 bg-gradient-to-t from-orange-600 to-amber-500 flex items-center h-[100px]">
            <Logo className="text-[50px]"/>
            <div className="text-xl ml-8 text-white">Room: {roomId}</div>
        </div>
    )
}

export default Header;
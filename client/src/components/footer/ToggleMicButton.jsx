import { useContext } from 'react';
import { Tooltip } from 'react-tooltip';
// Icons
import { microphoneIcon, noIcon } from "../../assets/icons";
//Context
import { UserContext } from '../../context/UserContext';


export const ToggleCMicButton = ({ toggleSharingMic }) => {
    const { sharingMic } = useContext(UserContext)

    return (
        <div
            style={{ position: "relative" }}
            id="toggleMicTip"
        >
            <button
                onClick={toggleSharingMic}
                className="text-white rounded-full p-4 bg-emerald-600 hover:bg-emerald-500 mx-2"
            >
                {microphoneIcon}
                <div style={{position: 'absolute',top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white'}}>
                {!sharingMic && noIcon}
                </div>
                
            </button>
            <Tooltip anchorSelect="#toggleMicTip" content={sharingMic ? "Stop Sharing Audio" : "Share Audio"} style={{color: 'black', backgroundColor: 'white'}}/>
        </div>
    );
};
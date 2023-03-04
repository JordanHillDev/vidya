import { useState, useMemo } from "react";
import { Tooltip } from 'react-tooltip';
import { CopyToClipboard } from "react-copy-to-clipboard";
// Styles
import classNames from "classnames";
// Icons
import { clipboardIcon, checkedClipboardIcon } from "../assets/icons";

const CopyRoomId = () => {
    const url = useMemo(() => window.location.href, []);
    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    const clipboard = (
        <div className="flex text-white justify-between w-full">
            <div>Copy Link</div>
            {clipboardIcon}
        </div>
    );

    const checkedClipboard = (
        <div className="flex text-white justify-between w-full">
            <div>Copied!</div>
            {checkedClipboardIcon}
        </div>
    );

    return (
        <CopyToClipboard text={url} onCopy={onCopyText}>
            <button className={classNames("flex w-[120px] justify-center p-2 rounded", {
                "bg-emerald-600": isCopied,
                "bg-purple-600": !isCopied
            })} id='copyLinkTip'>
                {isCopied ? checkedClipboard : clipboard}
                <Tooltip anchorSelect="#copyLinkTip" content={'Copy Room Link'} style={{color: 'black', backgroundColor: 'white'}}/>
            </button>
        </CopyToClipboard>
    );
};

export default CopyRoomId;

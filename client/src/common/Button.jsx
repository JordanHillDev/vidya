import classNames from "classnames";

export const Button = ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                "bg-purple-700 text-white font-bold text-xl rounded-full hover:bg-purple-600 px-6 py-2",
                className
            )}
        >
            {children}
        </button>
    );
};

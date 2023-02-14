import classNames from "classnames";

export const Logo = ({className}) => {
    return (
        <h1 className={classNames("text-8xl text-white p-4 font-bold tracking-wide", className)}>
            vidya
        </h1>
    );
};

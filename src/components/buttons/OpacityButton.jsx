import React from "react";
import { Button } from "@material-tailwind/react";

const OpacityButton = ({
    children,
    className = "",
    update = false,
    onClick = () => { },
    onMouseEnter = () => { },
    onMouseLeave = () => { },
}) => {
    return <>
        <div className="w-auto h-auto relative">
            { update ? <div className="bg-red-800 w-2 top-0 z-20 right-1 h-2 absolute rounded-full"></div>: null }
            <Button
                className={`bg-[#ffffff00] shadow-none hover:shadow-none main-text p-2 ${className}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >{children}</Button>
        </div>
    </>
}

export default OpacityButton;
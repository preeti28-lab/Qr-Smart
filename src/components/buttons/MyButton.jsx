import React from "react";
import { Button } from "@material-tailwind/react";
import { Tooltip } from "antd";

/**
 * 
 * @param {Object} props
 * @param {'button' | 'submit' | 'reset'} props.type
 * @param {String} props.title
 * @param {String} props.className
 * @param {Function} props.onClick
 * @param {Function} props.onMouseEnter
 * @param {Function} props.onMouseLeave
 * @param {Object} props.children
 * @param {'bottom' | 'bottomLeft' | 'bottomRight' | 'top' | 'topLeft' | 'topRight' | 'left' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'} props.placement default bottom
 * @param {boolean} props.disabled default false
 */
const MyButton = ({
    title = null,
    children,
    placement = "bottom",
    onClick = () => { },
    className = "",
    type = "button",
    disabled = false,
    onMouseEnter = () => { },
    onMouseLeave = () => { },
}) => {
    return <>
        <Tooltip title={title} placement={placement}>
            <Button
                type={type}
                className={`main-text py-2 px-3 md:px-4  normal-case font-medium shadow-sm hover:shadow-sm rounded-md ${className} ${disabled && "cursor-not-allowed relative"}`}
                onClick={!disabled && onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
                {disabled && <div className="top-0 left-0 bg-white/30 w-full h-full absolute"></div>}
            </Button>
        </Tooltip>
    </>
}

export default MyButton;
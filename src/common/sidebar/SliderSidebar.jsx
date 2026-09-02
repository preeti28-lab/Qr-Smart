import { Drawer } from "antd";
import React from "react";

const SliderSidebar = ({
    isOpen = false,
    setIsOpen = () => { },
    children,
    className = "",
}) => {
    // functions
    const handleClose = () => setIsOpen(false);

    return <>
        <Drawer
            open={isOpen}
            onClose={handleClose}
            styles={{
                body: {
                    padding: "0px",
                    margin: "0px",
                }
            }}
            closable={false}
            placement="left"
        >
            <div className={`w-full h-full flex justify-center items-center flex-col ${className}`}>
                {children}
            </div>
        </Drawer>
    </>
}

export default SliderSidebar;
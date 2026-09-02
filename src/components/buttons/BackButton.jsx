import React from "react";

// button
import MyButton from "./MyButton";

// icons
import { BsArrowLeftShort } from "react-icons/bs";

// hooks
import usePath from "../../hooks/usePath";

const BackButton = ({
    placement = "rightBottom"
}) => {
    // hooks
    const path = usePath();

    // functions
    const handleBack = () => path.back();

    return <>
        <div>
            <MyButton className="py-0.5 px-2.5 main-bg" title="Back" placement={placement} onClick={handleBack}>
                <BsArrowLeftShort size={25} />
            </MyButton>
        </div>
    </>
}

export default BackButton;
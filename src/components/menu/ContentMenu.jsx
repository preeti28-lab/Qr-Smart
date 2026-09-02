import React, { useState } from 'react';
import { MdArrowRight } from 'react-icons/md';


/**
 * 
 * @param maxHeight default max-h-[200px] 
 * @returns 
 */
const ContentMenu = ({
    children,
    title = "",
    defualt: defaultValue = false,
    maxHeight = 'max-h-[200px]',
}) => {
    const [isOpen, setIsOpen] = useState(defaultValue);
    const handleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={`w-full bg-white py-5 px-2 flex-col border-b border-solid border-gray-500 flex justify-start items-start ${isOpen ? "" : "hover:bg-gray-200"}`}>
            <div
                className="flex justify-between items-center w-full cursor-pointer"
                onClick={handleOpen}
            >
                <div className="flex justify-start items-start flex-col">
                    <h2 className="font-medium text-[17px]">{title}</h2>
                </div>
                <MdArrowRight
                    size={28}
                    className={`${isOpen ? 'rotate-90' : 'rotate-0'} transition-all text-slate-700 duration-300`}
                />
            </div>

            <div
                className={`w-full overflow-hidden transition-[max-height] duration-300 ${isOpen ? maxHeight : 'max-h-0'
                    }`}
            >
                <div className="mt-4"></div>
                {children}
            </div>
        </div>
    );
};

export default ContentMenu;

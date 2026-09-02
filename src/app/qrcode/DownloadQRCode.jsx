import { Dialog } from "@material-tailwind/react";
import React from "react";

// icons
import { RxCross2 } from "react-icons/rx";
import { IoImageOutline } from "react-icons/io5"; // image
import { BsFiletypeSvg } from "react-icons/bs"; // svg
import { FaRegFilePdf } from "react-icons/fa6"; // pdf

const DownloadQRCode = ({
    isOpen = false,
    setIsOpen = () => { },
}) => {
    const handleClose = () => setIsOpen(false);

    const TypeButton = ({
        icon,
        text = ''
    }) => {
        return (
            <div className="rounded-md py-3 cursor-pointer hover:bg-slate-100 active:bg-slate-200 transition-all duration-200 flex border border-solid border-slate-700 justify-start px-4 text-center gap-x-4 group">
                <div className="text-slate-700 group-hover:text-blue-800 transition-colors duration-200">
                    {icon}
                </div>
                <h3 className="font-semibold text-slate-600">{text}</h3>
            </div>
        );
    };

    return <>
        <Dialog
            open={isOpen}
            handler={setIsOpen}
        >
            <div className="py-3 px-5 border-b border-solid border-b-slate-300 font-semibold flex justify-between items-center">
                <h2 className="text-slate-700">Save as...</h2>
                <button
                    className="hover:text-red-500 transition-all active:text-red-800"
                    onClick={handleClose}
                >
                    <RxCross2 size={22} />
                </button>
            </div>
            <div className="p-3 flex-col flex justify-center items-center gap-y-3">
                <h3 className="text-slate-700 font-medium">Select a QR download type.</h3>

                <div className="w-full grid grid-cols-2 gap-x-4 gap-y-6">
                    <TypeButton
                        icon={<IoImageOutline size={25} />}
                        text="JPEG"
                    />
                    <TypeButton
                        icon={<IoImageOutline size={25} />}
                        text="PNG"
                    />
                    <TypeButton
                        icon={<BsFiletypeSvg size={25} />}
                        text="SVG"
                    />
                    <TypeButton
                        icon={<FaRegFilePdf size={25} />}
                        text="PDF"
                    />
                </div>
            </div>
        </Dialog>
    </>
}

export default DownloadQRCode;
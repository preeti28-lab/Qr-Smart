import { Dialog } from "@material-tailwind/react";
import React from "react";
import TouchableOpacity from "../buttons/TouchableOpacity";
import { RxCross2 } from "react-icons/rx";

const MyModal = ({
  isOpen = false,
  setIsOpen = () => {},
  children,
  title = "",
  className = "",
  animate = null,
  isClosable = true,
}) => {
  const handleClose = () => {
    if (isClosable) {
      setIsOpen(false); // Close the modal only if isClosable is true
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        handler={handleClose}
        className="rounded-md overflow-hidden"
        animate={animate}
      >
        <div className="main-bg py-3 w-full flex justify-between items-center px-4 text-white">
          <h2 className="text-[16px] font-medium">{title}</h2>
          <TouchableOpacity
            className="rounded-full w-7 p-0 hover:bg-white/25 transition-all duration-200 h-7 flex justify-center items-center"
            onClick={handleClose}
          >
            <RxCross2 size={18} />
          </TouchableOpacity>
        </div>
        <div className={`p-3 w-full ${className}`}>{children}</div>
      </Dialog>
    </>
  );
};

export default MyModal;

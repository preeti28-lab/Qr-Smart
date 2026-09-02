import React from "react";
import MyModal from "../components/modals/MyModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import MyButton from "../components/buttons/MyButton";
import QRShow from "./QRShow";
import { useSelector } from "react-redux";

const QRModal = ({ isOpen = false, setIsOpen = () => {}, children }) => {
  const handleClose = () => setIsOpen(false);

  const handleDelete = () => {
    handleClose();
    const payload = {
      id: idsToDelete[0],
    };
    dispatch(deleteQRCode(payload));
  };

  const { mobileFrame } = useSelector((state) => state.action);

  return (
    <>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="QRSmart">
        <div className="py-2">{children}</div>
      </MyModal>
    </>
  );
};

export default QRModal;

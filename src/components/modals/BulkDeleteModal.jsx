import React from "react";
import MyModal from "./MyModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import MyButton from "../buttons/MyButton";
import { useDispatch } from "react-redux";
import { deleteQRBulkFolder } from "../../redux/features/qrcodes";

const BulkDeletModal = ({
  isOpen = false,
  setIsOpen = () => {},
  onDelete = () => {},
  idToDelete,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => setIsOpen(false);

  const handleDelete = () => {
    // const payload = {
    //   id: idsToDelete[0],
    // };
    // console.log(id);
    const payload = {
      id: idToDelete,
    };
    dispatch(deleteQRBulkFolder(payload));
    handleClose();
  };

  return (
    <>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="w-full flex flex-col py-4 gap-y-6 justify-center items-center">
          <RiDeleteBin6Line size={100} className="text-slate-700" />
          <p className="font-medium text-gray-800">
            All the QR will be deleted inside this folder. Are you sure?
          </p>

          <div className="flex justify-center items-center gap-x-4">
            <MyButton
              className="bg-blue-700 rounded-full py-3 px-6 font-semibold text-[15px]"
              onClick={handleClose}
            >
              Cancel
            </MyButton>
            <MyButton
              className="bg-red-700 text-white rounded-full py-3 px-6 font-semibold text-[15px]"
              onClick={handleDelete}
            >
              Delete
            </MyButton>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default BulkDeletModal;

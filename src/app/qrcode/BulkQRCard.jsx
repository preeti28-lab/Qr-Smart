import { Tooltip } from "antd";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import BulkDeletModal from "../../components/modals/BulkDeleteModal";
import usePath from "../../hooks/usePath";

const BulkQRCard = ({ jobName, status, totalRecords, _id }) => {
  const path = usePath();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = () => {
    path.push(`folder/${jobName}`);
  };

  return (
    <>
      <div className="border-2 rounded-md px-3 py-5 w-full shadow-md relative flex flex-row-reverse justify-between">
        <div className="">
          <Tooltip title="Delete">
            <div
              className="border-2 w-max border-solid text-blue-700 hover:border-blue-800 active:bg-slate-100 transition-all duration-200 bg-white cursor-pointer border-gray-400 rounded-full p-1.5"
              onClick={() => {
                setIsDeleteOpen(true);
                setSelectedId(_id);
              }}
            >
              <MdOutlineDelete size={24} />
            </div>
          </Tooltip>
        </div>
        <div className="cursor-pointer w-full" onClick={handleClick}>
          <p>
            {" "}
            <span className="font-semibold"> Folder -</span> {jobName}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Status -</span> {status}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Total QR - </span>
            {totalRecords}
          </p>
        </div>
      </div>

      <BulkDeletModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        idToDelete={selectedId}
      />
    </>
  );
};

export default BulkQRCard;

import React, { useEffect, useState } from "react";
import MyQRNav from "./MyQRNav";
import AppViewer from "../../layouts/AppViewer";
import { useDispatch, useSelector } from "react-redux";
import { getAllBulkQRCodes } from "../../redux/features/qrcodes";
import { Tooltip } from "antd";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import MyButton from "../../components/buttons/MyButton";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TbExchange } from "react-icons/tb";
import BulkQRCard from "./BulkQRCard";

const BulkQRCode = () => {
  const dispatch = useDispatch();
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    dispatch(getAllBulkQRCodes());
  }, []);

  const { allBulkQR } = useSelector((state) => state.qr);
  return (
    <AppViewer>
      <div className="w-full relative py-4 px-5">
        <MyQRNav
        // selected={selectedItemIds.length > 0}
        // selectedNumber={selectedItemIds.length}
        // selectedCancel={() => setSelectedItemIds([])}
        // allSelected={selectedItemIds.length === items.length}
        // setAllSelected={handleSelectAll}
        // idsToDelete={selectedItemIds}
        />
        <div className="w-full my-4 flex flex-col justify-start items-start gap-y-4">
          {/* {items.map((item) => (
            <MyQRListItem
              key={item._id}
              {...item}
              selected={selectedItemIds.includes(item._id)}
              setSelected={() => handleSelect(item._id)}
            />
          ))} */}

          {/* {allQrData?.length > 0 ? (
            <>
              {allQrData?.map((item) => (
                <MyQRListItem
                  key={item._id}
                  {...item}
                  selected={selectedItemIds.includes(item._id)}
                  setSelected={() => handleSelect(item._id)}
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-y-4 py-20 w-full">
              <RiQrCodeLine size={60} className="text-slate-600" />
              <p className="font-semibold text-gray-800 text-[14px]">
                You haven't created QR Codes yet
              </p>
            </div>
          )} */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {allBulkQR?.map((item, index) => {
              return (
                <BulkQRCard
                  jobName={item.jobName}
                  status={item.status}
                  totalRecords={item.totalRecords}
                  _id={item._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </AppViewer>
  );
};

export default BulkQRCode;

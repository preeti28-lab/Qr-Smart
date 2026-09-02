import React, { useEffect } from "react";
import AppViewer from "../../layouts/AppViewer";
import MyQRListItem from "./MyQRListItem";
import { RiQrCodeLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllQrCodes, getSingleFolderQR } from "../../redux/features/qrcodes";
import MyQRNav from "./MyQRNav";

const AllBulkQRCode = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extracting the 'id' from the URL
  console.log("Folder ID:", id); // Debugging

  useEffect(() => {
    dispatch(getSingleFolderQR(id));
  }, []);

  const { allQrData } = useSelector((state) => state.qr);
  useEffect(() => {
    dispatch(getAllQrCodes());
  }, [dispatch]);

  return (
    <>
      <AppViewer>
        {/* <div className="w-full my-4 flex flex-col justify-start items-start gap-y-4">
          {allQrData?.length > 0 ? (
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
          )}
        </div> */}
        <div className="w-full relative py-4 px-5">
          <p className="mb-2">
            <span className="font-semibold">Folder Name : </span>
            <span className="capitalize">{id}</span>
          </p>
          <MyQRNav
          // selected={selectedItemIds.length > 0}
          // selectedNumber={selectedItemIds.length}
          // selectedCancel={() => setSelectedItemIds([])}
          // allSelected={selectedItemIds.length === items.length}
          // setAllSelected={handleSelectAll}
          // idsToDelete={selectedItemIds}
          />
          <div className="w-full my-4 flex flex-col justify-start items-start gap-y-4">
            {allQrData?.length > 0 ? (
              <>
                {allQrData?.map((item) => (
                  <MyQRListItem
                    key={item._id}
                    {...item}
                    // selected={selectedItemIds.includes(item._id)}
                    // setSelected={() => handleSelect(item._id)}
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
            )}
          </div>
        </div>
      </AppViewer>
    </>
  );
};

export default AllBulkQRCode;

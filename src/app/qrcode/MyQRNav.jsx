import { Tooltip } from "antd";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import {
  MdOutlineDelete,
  MdOutlineFileDownload,
  MdOutlinePauseCircle,
} from "react-icons/md";
import DeleteModal from "../../components/modals/DeleteModal";
import DownloadQRCode from "./DownloadQRCode";
import PausedResumedModal from "../../components/modals/PausedResumedModal";
import MultiSelect from "../../components/fields/MultiSelect";

const MyQRNav = ({
  selected = false,
  selectedNumber = 0,
  selectedCancel = () => {},
  allSelected = false,
  setAllSelected = () => {},
  idsToDelete,
  onStatusChange,
  onTypeChange,
  statusValue = [],
  typeValue = [],
  searchValue = "",
  onSearchChange = () => {},
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenPausedResumed, setIsOpenPausedResumed] = useState(false);

  return (
    <>
      <DeleteModal
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        idsToDelete={idsToDelete}
      />

      <DownloadQRCode isOpen={isOpenDownload} setIsOpen={setIsOpenDownload} />

      <PausedResumedModal
        isOpen={isOpenPausedResumed}
        setIsOpen={setIsOpenPausedResumed}
      />

      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-x-5">
          <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center gap-4">
            <div className="bg-white rounded-full py-1 px-4 flex justify-center items-center gap-x-2 border-2 border-solid border-gray-400 hover:border-gray-700 transition-all duration-300">
              <IoSearch size={18} />
              <input
                type="text"
                className="outline-none bg-transparent placeholder:font-medium placeholder:text-slate-600"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {/* <div className="w-[160px] lg:w-[200px]">
                <MultiSelect
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Paused", value: "paused" },
                  ]}
                  placeholder="QR code status"
                  value={statusValue}
                  onChange={onStatusChange}
                />
              </div> */}

              <div className="w-[160px] lg:w-[200px]">
                <MultiSelect
                  options={[
                    { label: "Website", value: "website" },
                    { label: "PDF", value: "pdf" },
                    { label: "vCard Plus", value: "vCardPlus" },
                    { label: "Video", value: "video" },
                    // { label: "Images", value: "images" },
                    { label: "SMS", value: "staticSMS" },
                    { label: "Email", value: "staticEmail" },
                    { label: "WhatsApp", value: "staticWhatsApp" },
                    { label: "WiFi", value: "staticWifi" },
                    { label: "vCard", value: "staticVcard" },

                    { label: "App", value: "app" },
                    { label: "Business", value: "business" },
                    { label: "Coupon", value: "coupon" },
                    { label: "Event", value: "event" },
                    { label: "Image", value: "image" },
                    { label: "List Of Links", value: "listOfLinks" },
                    { label: "Menu", value: "menu" },
                    { label: "MP3", value: "mp3" },
                    { label: "Audio", value: "audio" },
                    { label: "Playlist", value: "playlist" },
                    { label: "Product", value: "product" },
                    { label: "Social Media", value: "socialMedia" },
                  ]}
                  placeholder="QR code type"
                  value={typeValue}
                  onChange={onTypeChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="flex justify-end items-center w-full gap-x-3">
          <h2
            className="text-gray-600 hover:text-gray-800 active:text-[#000000] select-none mx-2 transition-all duration-200 cursor-pointer font-semibold"
            onClick={selectedCancel}
          >
            Cancel
          </h2>

          <Tooltip title="Delete" placement="bottomRight">
            <div
              className="border-2 border-solid text-blue-700 hover:border-blue-800 active:bg-slate-100 transition-all duration-200 bg-white cursor-pointer border-gray-400 rounded-full p-1.5"
              onClick={() => setIsDeleteOpen(true)}
            >
              <MdOutlineDelete size={24} />
            </div>
          </Tooltip>

          <Tooltip title="Download" placement="bottomRight">
            <div
              className="border-2 border-solid text-blue-700 hover:border-blue-800 active:bg-slate-100 transition-all duration-200 bg-white cursor-pointer border-gray-400 rounded-full p-1.5"
              onClick={() => setIsOpenDownload(true)}
            >
              <MdOutlineFileDownload size={24} />
            </div>
          </Tooltip>

          <Tooltip title="Pause" placement="bottomRight">
            <div
              className="border-2 border-solid text-blue-700 hover:border-blue-800 active:bg-slate-100 transition-all duration-200 bg-white cursor-pointer border-gray-400 rounded-full p-1.5"
              onClick={() => setIsOpenPausedResumed(true)}
            >
              <MdOutlinePauseCircle size={24} />
            </div>
          </Tooltip>
        </div>
      ) : null}
    </>
  );
};

export default MyQRNav;

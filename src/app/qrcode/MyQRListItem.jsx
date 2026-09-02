import { Checkbox, Tooltip } from "antd";
import React, { useState } from "react";
import { BsQrCode } from "react-icons/bs";
import { FaRegFile } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { format } from "date-fns";
import {
  MdContentCopy,
  MdOutlineEdit,
  MdOutlineModeEdit,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import MyButton from "../../components/buttons/MyButton";
import { RxDownload } from "react-icons/rx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import QRPopUp from "./QRPopUp";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { GrDuplicate } from "react-icons/gr";
import { TbExchange } from "react-icons/tb";
import DownloadQRCode from "./DownloadQRCode";
import usePath from "../../hooks/usePath";
import toastify from "../../constants/toastify";
import Status from "../../components/status/Status";
import { useDispatch } from "react-redux";
import { changeQrStatus } from "../../redux/features/qrcodes";

const MyQRListItem = ({
  status = "",
  setSelected = () => {},
  selected = false,
  name = "Untitled",
  type = "",
  scans = 0,
  url = "",
  href = "",
  date = "-",
  _id = "",
  createdAt = "",
  shortLink = "",
  content = "",
  style = "",
}) => {
  const [isOpenQR, setIsOpenQR] = useState(false);
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState(status);
  const path = usePath();
  const dispatch = useDispatch();

  const copyEvent = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toastify({
        msg: "URL copied successfully!",
        type: "info",
        autoClose: 700,
      });
    } catch (err) {
      toastify({ msg: "Failed to copy URL", type: "error", autoClose: 700 });
    }
  };

  const handleStatusChange = (event) => {
    const clickedText = event.target.textContent; // Get clicked text
    console.log(clickedText);
    setNewStatus((prevStatus) =>
      prevStatus === "active" ? "paused" : "active",
    );
    const payload = {
      status: clickedText === "active" ? "paused" : "active",
      shortLink: shortLink,
    };
    dispatch(changeQrStatus(payload));
  };

  return (
    <>
      <QRPopUp
        isOpen={isOpenQR}
        setIsOpen={setIsOpenQR}
        qrStyle={style}
        shortLink={shortLink}
      />

      <DownloadQRCode isOpen={isOpenDownload} setIsOpen={setIsOpenDownload} />

      <div className="w-full rounded-md flex relative flex-col-reverse justify-between lg:items-center gap-x-6 bg-white border border-solid border-gray-300 p-4 shadow-[0px_1px_6px_-1px_#bdbdbd]">
        <div className="flex justify-start gap-x-3 lg:gap-x-6 items-start lg:items-start w-full">
          <Checkbox
            className="scale-150 pt-1"
            checked={selected}
            onChange={(e) => {
              setSelected(_id);
              setSelectedIds(_id);
            }}
          />

          <div className="flex flex-row gap-x-3 lg:items-center justify-between lg:w-full">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex  gap-2 lg:w-[24rem]">
                <Tooltip title="Click to scan">
                  <div
                    className="border-2 w-max h-max border-solid cursor-pointer hover:border-blue-700 transition-all duration-200 border-gray-500 text-[#000000] rounded-md p-2"
                    onClick={() => setIsOpenQR(true)}
                  >
                    <BsQrCode size={50} />
                  </div>
                </Tooltip>
                <div className="flex flex-col justify-start items-start">
                  <h2 className="font-semibold text-orange-700 text-[14px]">
                    {type}
                  </h2>
                  <div className="flex justify-start text-[16px] font-medium items-center gap-x-2">
                    <p className="text-slate-800">{name}</p>
                    <MdOutlineEdit size={18} />
                  </div>
                  <p className="text-slate-800 font-medium text-[14px]">
                    {format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}
                  </p>
                </div>
              </div>
              <div className="h-[80px] w-[2px] bg-slate-200 hidden lg:block"></div>

              <div className="w-full">
                <div className="flex justify-start items-center gap-x-2 flex-wrap">
                  <RiGlobalLine size={15} />
                  <a
                    href={`${shortLink}`}
                    className="text-[13px] text-slate-700"
                  >
                    {shortLink}
                  </a>
                  <Tooltip title="Copy">
                    <button
                      className="text-blue-800 hover:text-blue-900"
                      onClick={() => copyEvent(shortLink)}
                    >
                      <MdContentCopy size={15} />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex flex-row justify-start items-center gap-x-2 w-full flex-wrap">
                  <IoIosLink size={15} />
                  <a href={content} className="text-[13px] text-slate-700">
                    {content}
                  </a>

                  {/* <Tooltip title="Edit">
                    <button className="text-blue-800 hover:text-blue-900">
                      <MdOutlineModeEdit size={15} />
                    </button>
                  </Tooltip> */}
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col items-center hidden lg:block">
              <p className="font-semibold text-[30px]">{scans}</p>
              <p className="text-orange-700 font-medium">Scans</p>
            </div> */}
          </div>
        </div>

        <div className="flex justify-between lg:justify-end items-center gap-4 w-full">
          <div className="flex flex-row items-center gap-2 ">
            <p className="font-semibold text-[30px]">{scans}</p>
            <p className="text-orange-700 font-medium">Scans</p>
          </div>

          <div className="flex items-center gap-2">
            <p
              className={`rounded-full py-1 px-2 text-[10px] font-semibold text-white cursor-pointer ${
                status === "active" ? "bg-green-700" : "bg-red-500"
              }`}
              onClick={handleStatusChange}
            >
              {newStatus}
            </p>
            <div className="flex justify-center items-center">
              <MyButton
                className="text-blue-700 border-2 border-blue-700 flex justify-center items-center gap-x-2  rounded-full bg-white font-bold py-1"
                onClick={() => path.push("details")}
              >
                <span>Details</span>
              </MyButton>
            </div>

            {/* <Tooltip title="Download">
            <div className="flex justify-center items-center">
              <MyButton
                className="text-[#000000] border-2 border-slate-200 flex justify-center items-center gap-x-2 p-2 rounded-full bg-white font-bold"
                onClick={() => setIsOpenDownload(true)}
              >
                <RxDownload size={24} />
              </MyButton>
            </div>
          </Tooltip> */}

            <Menu placement="left-start">
              <Tooltip title="Menu">
                <MenuHandler>
                  <div className="flex justify-center items-center">
                    <MyButton className="text-[#000000] shadow-none lg:shadow-sm lg:border-2 lg:border-slate-200 flex justify-center items-center gap-x-2 p-0 lg:p-2 rounded-full bg-white font-bold">
                      <HiOutlineDotsVertical size={24} />
                    </MyButton>
                  </div>
                </MenuHandler>
              </Tooltip>
              <MenuList className="p-2">
                <MenuItem className="py-2 px-3 font-semibold text-blue-700 flex justify-start items-center gap-x-2">
                  <MdOutlineModeEditOutline size={18} />
                  <span>Edit</span>
                </MenuItem>
                <MenuItem className="py-2 px-3 font-semibold text-blue-700 flex justify-start items-center gap-x-2">
                  <TbExchange size={18} />
                  <span>Change QR Type</span>
                </MenuItem>
                {/* <MenuItem className="py-2 px-3 font-semibold text-blue-700 flex justify-start items-center gap-x-2">
                <GrDuplicate size={16} />
                <span>Duplicate</span>
              </MenuItem> */}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyQRListItem;

import React, { useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import { FaArrowLeft } from "react-icons/fa";
import usePath from "../../hooks/usePath";
import MyButton from "../../components/buttons/MyButton";
import {
  MdOutlineDateRange,
  MdOutlineEdit,
  MdOutlineFileDownload,
  MdQrCode2,
} from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import DownloadQRCode from "./DownloadQRCode";
import PausedResumedModal from "../../components/modals/PausedResumedModal";
import { RiGlobalLine } from "react-icons/ri";
import QRMedium from "../../icons/QRMedium";
import QRPrint from "../../icons/QRPrint";
import { Tooltip } from "antd";
import CampaignInfoModal from "../../components/modals/CampaignInfoModal";
import QRPopUp from "./QRPopUp";
import ActivityChart from "../../charts/ActivityChart";
import { Checkbox } from "@material-tailwind/react";
import QRMenu from "../../components/menu/QRMenu";

const QRDetails = () => {
  const path = usePath();
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const [isOpenPausedResumed, setIsOpenPausedResumed] = useState(false);
  const [isOpenCampaignInfo, setIsOpenCampaignInfo] = useState(false);
  const [isOpenScan, setIsOpenScan] = useState(false);

  const EditItem = ({ label = "", value = "", icon }) => {
    return (
      <>
        <div className="flex justify-start items-start gap-x-4">
          <div className="rounded-full bg-slate-200 p-1.5 text-[#000000]">
            {icon}
          </div>
          <div className="flex flex-col justify-start items-start">
            <h2 className="text-[12px] font-medium text-slate-700">{label}</h2>
            <p className="text-[14px] text-[#000000] font-medium">{value}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <DownloadQRCode isOpen={isOpenDownload} setIsOpen={setIsOpenDownload} />

      <PausedResumedModal
        isOpen={isOpenPausedResumed}
        setIsOpen={setIsOpenPausedResumed}
        type="resumed"
      />

      <CampaignInfoModal
        isOpen={isOpenCampaignInfo}
        setIsOpen={setIsOpenCampaignInfo}
      />

      <QRPopUp isOpen={isOpenScan} setIsOpen={setIsOpenScan} />

      <AppViewer>
        <div className="w-full p-3">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-y-3">
            <div className="flex justify-start items-center gap-x-3 w-full">
              <div
                className="flex justify-center font-semibold text-blue-800 cursor-pointer hover:text-blue-900 transition-all duration-300 items-center gap-x-2 text-[15px]"
                onClick={() => path.back()}
              >
                <div className="text-blue-700">
                  <FaArrowLeft size={14} />
                </div>
                <span>Back</span>
              </div>
              <h2 className="text-[#000000] font-semibold text-[18px]">
                Untitled
              </h2>
            </div>

            <div className="flex justify-end items-center gap-x-3">
              <MyButton
                className="flex justify-center rounded-full bg-white hover:bg-slate-100 transition-all text-blue-700 border-2 border-solid border-blue-700 lg:py-2 lg:px-6 items-center gap-x-2 text-[15px] font-semibold"
                onClick={() => setIsOpenPausedResumed(true)}
              >
                <IoPlayCircleOutline size={24} />
                <span>Resume</span>
              </MyButton>
              <MyButton
                className="flex justify-center rounded-full bg-white hover:bg-slate-100 transition-all text-blue-700 border-2 border-solid border-blue-700 lg:py-2 lg:px-6 items-center gap-x-2 text-[15px] font-semibold"
                onClick={() => setIsOpenDownload(true)}
              >
                <MdOutlineFileDownload size={24} />
                <span>Download</span>
              </MyButton>
              <MyButton
                className="flex justify-center rounded-full bg-blue-700 border-2 border-solid border-blue-700 lg:py-2 lg:px-6 items-center gap-x-2 text-[15px] font-semibold"
                onClick={() => {
                  path.navigate(`/${path.role}/builder/content`);
                }}
              >
                <MdOutlineEdit size={20} />
                <span>Edit</span>
              </MyButton>
            </div>
          </div>

          <div className="flex justify-start items-center gap-x-2 text-[14px] font-medium text-slate-700 mt-2">
            <p className="text-[#000000]">website</p>
            <div className="flex justify-center items-center gap-x-2">
              <RiGlobalLine size={16} />
              <a className="cursor-pointer text-[13px]">
                qrsmart.io/r/HxJy5zvqrz
              </a>
            </div>
          </div>

          <div className="my-4 w-full rounded-md relative border p-3 flex flex-col-reverse lg:flex-row justify-between items-center border-solid border-slate-50 bg-white shadow-[0px_1px_6px_-1px_#bdbdbd]">
            <Tooltip title="Edit" placement="right">
              <button
                className="absolute top-2 left-2 rounded-md bg-white hover:bg-slate-50 transition-all duration-300 active:bg-gray-200 active:scale-95 cursor-pointer border-2 border-solid border-gray-400 shadow-[0px_1px_4px_-1px_#bdbdbd] p-2"
                onClick={() => setIsOpenCampaignInfo(true)}
              >
                <MdOutlineEdit size={20} />
              </button>
            </Tooltip>

            <div className="flex flex-col lg:flex-row justify-start items-center gap-x-8">
              <div className="flex flex-col justify-center lg:border-r-2 lg:border-solid lg:border-gray-300  p-2 lg:py-6 lg:px-10 text-[#000000] items-center">
                <h2 className="text-[35px] font-semibold">0</h2>
                <p className="font-medium text-[13px]">Total Scans</p>
              </div>

              <div className="grid grid-cols-2 justify-start items-center gap-y-6 gap-x-10">
                <EditItem
                  label="Medium"
                  value="-"
                  icon={<QRMedium size={20} />}
                />
                <EditItem
                  label="Print run"
                  value="-"
                  icon={<QRPrint size={20} />}
                />
                <EditItem
                  label="Start of Campaign"
                  value="Dec 31, 2024"
                  icon={<MdOutlineDateRange size={20} />}
                />
                <EditItem
                  label="End of Campaign"
                  value="-"
                  icon={<MdOutlineDateRange size={20} />}
                />
              </div>
            </div>

            <Tooltip title="Click to scan">
              <div
                className="flex justify-center cursor-pointer hover:border-blue-700 transition-all duration-300 rounded-md bg-white border-2 border-solid border-gray-300 p-3 items-center"
                onClick={() => setIsOpenScan(true)}
              >
                <MdQrCode2 size={80} />
              </div>
            </Tooltip>
          </div>

          <div className="bg-white p-3 rounded-md w-full shadow-[0px_1px_6px_-1px_#bdbdbd] my-4">
            <h2 className="font-semibold text-[18px]">Activity</h2>

            <div className="my-4 flex flex-col lg:flex-row justify-between items-center">
              <div className="flex justify-start items-center lg:gap-x-4 w-full">
                <div className="flex justify-center items-center">
                  <Checkbox color="blue" defaultChecked={true} />
                  <p className="text-[14px] font-semibold text-gray-800 transition-all duration-200 hover:text-[#000000] cursor-pointer">
                    Total scans
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <Checkbox color="blue" />
                  <p className="text-[14px] font-semibold text-gray-800 transition-all duration-200 hover:text-[#000000] cursor-pointer">
                    Unique scans
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <Checkbox color="blue" />
                  <p className="text-[14px] font-semibold text-gray-800 transition-all duration-200 hover:text-[#000000] cursor-pointer">
                    Link
                  </p>
                </div>
              </div>

              <div className="flex justify-start lg:justify-end items-center gap-x-4 w-full px-3">
                <button className="border border-solid border-blue-700 rounded-md font-medium text-blue-700 transition-all duration-200 text-[14px] py-1 px-3">
                  Day
                </button>
                <button className="border border-solid border-gray-500 transition-all duration-200 hover:text-blue-700 hover:border-blue-700 rounded-md font-medium text-gray-500 text-[14px] py-1 px-3">
                  Month
                </button>
                <button className="border border-solid border-gray-500 rounded-md font-medium text-gray-500 hover:text-blue-700 hover:border-blue-700 text-[14px] py-1 px-3">
                  Year
                </button>
              </div>
            </div>

            <div className="w-full my-4 overflow-hidden">
              <ActivityChart />
            </div>
          </div>

          <div className="w-full flex flex-col gap-y-4">
            <QRMenu title="Scans by operating system" iconShow={false}>
              <div className="w-full border-t py-6 border-solid border-t-gray-500">
                <h2>Not enough data to show statistics</h2>
              </div>
            </QRMenu>

            <QRMenu title="Scans by country" iconShow={false}>
              <div className="w-full border-t py-6 border-solid border-t-gray-500">
                <h2>Not enough data to show statistics</h2>
              </div>
            </QRMenu>

            <QRMenu title="Scans by browser" iconShow={false}>
              <div className="w-full border-t py-6 border-solid border-t-gray-500">
                <h2>Not enough data to show statistics</h2>
              </div>
            </QRMenu>

            <QRMenu title="Scans by user language" iconShow={false}>
              <div className="w-full border-t py-6 border-solid border-t-gray-500">
                <h2>Not enough data to show statistics</h2>
              </div>
            </QRMenu>

            <QRMenu title="Scans by time of day" iconShow={false}>
              <div className="w-full border-t py-6 border-solid border-t-gray-500">
                <h2>Not enough data to show statistics</h2>
              </div>
            </QRMenu>

            {/* <QRMenu
                        title='Events'
                        iconShow={false}
                    >
                        <div className='w-full border-t py-6 border-solid border-t-gray-500'>
                            <h2>Not enough data to show statistics</h2>
                        </div>
                    </QRMenu> */}
          </div>
        </div>
      </AppViewer>
    </>
  );
};

export default QRDetails;

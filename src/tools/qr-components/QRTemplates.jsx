import React, { useState } from "react";
import MyButton from "../../components/buttons/MyButton";
import { MdEditDocument } from "react-icons/md";
import { TbTemplate } from "react-icons/tb";
import { HiQrcode } from "react-icons/hi";
import { useSelector } from "react-redux";

const QRTemplates = ({ hideButtons = false, setTemplateName = () => {} }) => {
  const [isType, setIsType] = useState("custom");

  const { allTemplates } = useSelector((state) => state.template);

  const isQRDesignPage = window.location.pathname.includes("qr-design");
  return (
    <>
      <div className="flex flex-col justify-start items-start gap-y-6 w-full">
        {!hideButtons ? (
          <>
            <div className="flex justify-start items-center gap-x-3">
              <MyButton
                className="rounded-full text-[14px] bg-blue-700 font-medium gap-x-2 flex justify-center items-center"
                onClick={() => setIsType("custom")}
              >
                <MdEditDocument size={18} />
                <span>Personalized design</span>
              </MyButton>

              <MyButton
                className="rounded-full text-[14px] bg-green-700 font-medium gap-x-2 flex justify-center items-center"
                onClick={() => setIsType("templates")}
              >
                <TbTemplate size={18} />
                <span>Templates</span>
              </MyButton>
            </div>
          </>
        ) : null}

        {isType === "custom" ? (
          <>
            {isQRDesignPage ? (
              ""
            ) : (
              <>
                <div className="flex flex-col justify-start w-full items-start gap-y-1">
                  <label className="font-semibold text-gray-700 text-[14px]">
                    Template Name
                  </label>
                  <input
                    type="text"
                    className="outline-none border-2 px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 rounded-full py-1.5 w-full"
                    placeholder="E.g New template name..."
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-start items-center gap-x-2 w-full">
              {/* <div className="border-2 border-solid border-gray-700 cursor-pointer hover:border-blue-700 group transition-all duration-300 flex flex-col py-4 gap-y-4 rounded-md">
                <div className="px-5">
                  <HiQrcode size={80} />
                </div>
                <div className="h-[1px] w-full bg-gray-700 group"></div>
                <div className="w-full flex justify-center items-center">
                  <h3 className="text-[12px] font-semibold">my templates</h3>
                </div>
              </div> */}
              {allTemplates?.map((template, index) => {
                return (
                  <div className="border-2 border-solid border-gray-700 cursor-pointer hover:border-blue-700 group transition-all duration-300 flex flex-col py-4 gap-y-4 rounded-md">
                    <div className="px-5">
                      <HiQrcode size={80} />
                    </div>
                    <div className="h-[1px] w-full bg-gray-700 group"></div>
                    <div className="w-full flex justify-center items-center">
                      <h3 className="text-[12px] font-semibold">
                        {template.templateName}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QRTemplates;

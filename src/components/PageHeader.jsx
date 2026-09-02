import React from "react";
import MyButton from "./buttons/MyButton";
import { MdOutlineFileDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  downlodPrivacyPDF,
  downlodTermsPDF,
} from "../redux/features/dashboard";

const PageHeader = ({ title, date, showBtn = true, btnFor }) => {
  const dispatch = useDispatch();
  const handlePDFDownload = () => {
    if (btnFor === "Privacy") {
      dispatch(downlodPrivacyPDF());
    } else {
      dispatch(downlodTermsPDF());
    }
  };

  return (
    <div className="bg-custom-gradient py-10 md:py-28">
      <div className="flex flex-col items-center">
        <h1 className="text-xl md:text-4xl font-semibold text-center">
          {title}
        </h1>
        <p className="text-center font-medium mt-2 text-[15px] md:text-[17px]">
          Last Updated : {date}
        </p>

        {showBtn && (
          <MyButton
            onClick={handlePDFDownload}
            className="rounded-full py-2 flex items-center px-10 mt-2 md:mt-3 bg-blue-700 border border-solid border-blue-700 text-white"
          >
            <MdOutlineFileDownload size={20} className="mr-1" />
            Download Copy
          </MyButton>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

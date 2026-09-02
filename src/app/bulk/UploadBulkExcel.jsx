import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import QRBulkViewer from "../../layouts/QRBulkViewer";
import MyButton from "../../components/buttons/MyButton";
import { MdOutlineFileDownload } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useDocument from "../../hooks/useDocument";
import { RiFileExcel2Fill } from "react-icons/ri";
import usePath from "../../hooks/usePath";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createBulkQRCode } from "../../redux/features/qrcodes";
import { Spinner } from "@material-tailwind/react";

const UploadBulkExcel = () => {
  const path = usePath();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const bulkStyleData = location.state;
  console.log(bulkStyleData);
  const { type } = useSelector((state) => state.dashboard.qrType);

  const [folderName, setFolderName] = useState();
  const [bulkExcelLoader, setBulkExcelLoader] = useState(false);
  const [templateData, setTemplateData] = useState([]);
  const [templateFileName, setTemplateFileName] = useState();

  const docs = useDocument();

  const webstieTemplateData = [
    {
      qrName: "",
      url: "",
    },
  ];

  const vcardTemplateData = [
    {
      qrName: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      website: "",
      company: "",
      jobTitle: "",
    },
  ];

  const textTemplateData = [
    {
      qrName: "",
      text: "",
    },
  ];

  useEffect(() => {
    if (type === "website") {
      setTemplateData(webstieTemplateData);
      setTemplateFileName("Sample Website Template");
    } else if (type === "vcard") {
      setTemplateData(vcardTemplateData);
      setTemplateFileName("Sample VCard Template");
    } else if (type === "text") {
      setTemplateData(textTemplateData);
      setTemplateFileName("Sample Text Template");
    }
  }, [type]);

  const file = () => {
    if (docs.file) {
      setBulkExcelLoader(true);
      let file = docs.file;
      const formData = new FormData();
      formData.append("excel", file);
      formData.append("type", type);
      formData.append("bulkFolderName", folderName);
      const style = JSON.stringify({
        isCenterStyle: bulkStyleData?.selectedCenterStyle,
        isCodeStyle: bulkStyleData?.selectedCodeStyle,
        isCodeStyleBackgroundColor:
          bulkStyleData?.selectedCodeStyleBackgroundColor,
        isCodeStyleBorderColor: bulkStyleData?.selectedCodeStyleBorderColor,
        isCodeStyleCenterColor: bulkStyleData?.selectedCodeStyleCenterColor,
        isCodeStyleDotColor: bulkStyleData?.selectedCodeStyleDotColor,
        isCorner: bulkStyleData?.selectedCorner,
        isFrame: bulkStyleData?.selectedFrame,
        isLevel: bulkStyleData?.selectedLevel,
        isLogo: bulkStyleData?.selectedLogo,
      });

      formData.append("style", style);
      dispatch(
        createBulkQRCode(
          formData,
          (success) => {
            if (success) {
              navigate("/bulk-qr-code-generator");
            }
          },
          setBulkExcelLoader
        )
      );
      setFolderName(null);
    } else {
      toast.error("Upload the file please..");
    }
  };

  return (
    <>
      <AppViewer>
        <QRBulkViewer current={2}>
          <h2 className="font-medium text-[20px]">Upload the full CSV</h2>
          <div className="w-full rounded-md my-7 shadow-[0px_1px_6px_-1px_#bdbdbd] bg-white">
            <div className="py-8 px-6 flex justify-between items-center">
              <h2 className="font-semibold text-[18px]">
                Download the CSV example
              </h2>

              <MyButton
                onClick={() =>
                  docs.downloadXLSX(templateData, templateFileName)
                }
                className="rounded-full border-2 flex justify-center gap-x-2 py-2 items-center border-solid border-blue-700 bg-white text-blue-700 hover:bg-slate-100 transition-all duration-200"
              >
                <MdOutlineFileDownload size={22} />
                <span className="font-semibold text-[16px]">Download</span>
              </MyButton>
            </div>

            <div className="py-8 px-6 flex flex-col  border-t-2 border-solid border-gray-300">
              <h2 className="font-semibold text-[18px]">Create Folder</h2>
              <input
                type="text"
                className="p-2 mt-3"
                style={{
                  border: " 1px solid black",
                  borderRadius: "5px",
                }}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>

            <div className="w-full border-t-2 border-solid flex flex-col justify-start items-start gap-y-6 border-gray-300 py-6 px-6">
              <h2 className="font-semibold text-[18px]">
                Complete the sample CSV and re-upload it
              </h2>

              <div
                className="w-full flex justify-center mt-3 items-center border-2 gap-x-2 active:bg-gray-300 transition-all duration-700 cursor-pointer border-dotted border-gray-800 py-8 rounded-md text-gray-800"
                onClick={() => {
                  docs.upload("single");
                  // file();
                }}
              >
                <RiFileExcel2Fill size={40} />
                <h2 className="font-poppins not-italic leading-normal text-lg font-semibold">
                  {docs.file?.name ? docs.file?.name : "Upload Excel"}
                </h2>
              </div>
              <p className="text-[13px] font-semibold text-center w-full">
                The row limit per file for the trial period is 25, subscribe to
                increase it
              </p>

              {/* <div className="w-full border-2 border-dashed flex justify-center items-center flex-col rounded-md border-gray-500 py-8 cursor-pointer gap-y-4">
                <MyButton className="rounded-full border-2 flex justify-center gap-x-2 py-2 items-center border-solid border-blue-700 bg-blue-700 text-white">
                  <span className="font-semibold text-[16px]">Upload CSV</span>
                </MyButton>

                
              </div> */}
            </div>
          </div>
          <div className="flex justify-center gap-x-3">
            <MyButton
              className="text-slate-700 border border-slate-700 flex justify-center items-center gap-x-2 py-2 rounded-full bg-white font-semibold"
              onClick={() => path.back()}
            >
              <FaArrowLeft size={14} />
              <span>Back</span>
            </MyButton>
            <MyButton
              className="text-slate-50 border border-green-700 hover:bg-green-800 transition-all flex justify-center items-center gap-x-2 py-1.5 rounded-full text-[15px] bg-green-700 font-semibold"
              // onClick={() => path.changeEndPoint(nextPath)}
              //   onClick={() => path.navigate(`/${path.role}/my-qr-codes`)}
              onClick={file}
            >
              {bulkExcelLoader ? (
                <span className="flex gap-3">
                  Creating <Spinner color="white" />
                </span>
              ) : (
                <span>Complete</span>
              )}
            </MyButton>
          </div>
        </QRBulkViewer>
      </AppViewer>
    </>
  );
};

export default UploadBulkExcel;

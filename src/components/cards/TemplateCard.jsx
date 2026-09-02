import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Tooltip } from "antd";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete, MdOutlineModeEditOutline, MdQrCode2 } from "react-icons/md";
import usePath from "../../hooks/usePath";
import QRShow from "../../tools/QRShow";
import { useDispatch } from "react-redux";
import { deleteTemplate } from "../../redux/features/templates";

const TemplateCard = ({
  level,
  frame,
  codeStyle,
  corner,
  centerStyle,
  codeStyleBorderColor,
  codeStyleDotColor,
  codeStyleCenterColor,
  codeStyleBackgroundColor,
  templateName,
  id,
}) => {
  const path = usePath();
  const dispatch = useDispatch();

  const handleDelete = () => {
    const payload = {
      id : id
    }
    dispatch(deleteTemplate(payload))
  }

  return (
    <>
      <div className="rounded-md shadow-[0px_1px_6px_-1px_#bdbdbd] bg-white border border-solid relative border-gray-200  all-temp">
        <Menu placement="left-start">
          <Tooltip title="Menu">
            <div className="absolute top-2 right-2">
              <MenuHandler>
                <div className="bg-white rounded-full border-2  cursor-pointer hover:border-gray-700 transition-all duration-300  p-1 border-solid border-gray-300">
                  <HiOutlineDotsVertical size={25} />
                </div>
              </MenuHandler>
            </div>
          </Tooltip>
          <MenuList className="p-1">
            {/* <MenuItem
              className="flex justify-start items-center gap-x-1 text-slate-800"
              onClick={() => path.push("edit")}
            >
              <MdOutlineModeEditOutline size={18} />
              <span>Edit</span>
            </MenuItem> */}
            <MenuItem className="flex justify-start items-center gap-x-1 text-slate-800"
            onClick={handleDelete}
            >
              <MdDelete size={18} />
              <span>Delete</span>
            </MenuItem>
          </MenuList>
        </Menu>

        {/* <div className="flex justify-center py-4 items-center">
          <MdQrCode2 size={120} />
        </div> */}
        <QRShow
          title=""
          selectedFrame={frame}
          selectedLogo=""
          selectedLevel={level}
          selectedCodeStyle={codeStyle}
          selectedCorner={corner}
          selectedCenterStyle={centerStyle}
          selectedCodeStyleBorderColor={codeStyleBorderColor}
          selectedCodeStyleDotColor={codeStyleDotColor}
          selectedCodeStyleCenterColor={codeStyleCenterColor}
          selectedCodeStyleBackgroundColor={codeStyleBackgroundColor}
          showDownload="false"
        />
        <div className="border-t border-solid flex justify-center items-center border-t-gray-200 py-2 lg:py-6">
          <h3 className="font-medium text-[15px]">{templateName}</h3>
        </div>
      </div>
    </>
  );
};

export default TemplateCard;

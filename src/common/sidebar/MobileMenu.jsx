import { Drawer, Menu } from "antd";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQrType } from "../../redux/features/dashboard";
import "./MobileMenu.css";
import { FaAddressCard } from "react-icons/fa6";
import { MdPersonalVideo } from "react-icons/md";
import { FaFilePdf, FaImage, FaGlobe } from "react-icons/fa"; // Additional icons
import { CiText } from "react-icons/ci";

const MobileMenu = ({
  isOpen = false,
  setIsOpen = () => {},
  children,
  className = "",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    const routesMap = {
      website: "/builder/content",
      text: "/builder/content",
      pdf: "/builder/content",
      images: "/builder/content",
      vcard: "/builder/content",
      video: "/builder/content",
    };

    dispatch(setQrType({ type: key }));
    navigate(routesMap[key]);
    setIsOpen(false); // Close drawer after selection
  };

  const items = [
    {
      key: "products",
      label: (
        <span className="font-semibold flex items-center gap-2 p-0">
          Products
        </span>
      ),
      children: [
        {
          key: "vcard",
          label: (
            <span className="flex items-center gap-2">
              <FaAddressCard size={18} />
              vCard Plus
            </span>
          ),
        },
        {
          key: "video",
          label: (
            <span className="flex items-center gap-2">
              <MdPersonalVideo size={18} />
              Video
            </span>
          ),
        },
        {
          key: "images",
          label: (
            <span className="flex items-center gap-2">
              <FaImage size={18} />
              Images
            </span>
          ),
        },
        {
          key: "pdf",
          label: (
            <span className="flex items-center gap-2">
              <FaFilePdf size={18} />
              PDF
            </span>
          ),
        },
        {
          key: "website",
          label: (
            <span className="flex items-center gap-2">
              <FaGlobe size={18} />
              Website
            </span>
          ),
        },
        {
          key: "text",
          label: (
            <span className="flex items-center gap-2">
              <CiText size={18} />
              Text
            </span>
          ),
        },
      ],
    },
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      styles={{
        body: {
          padding: "0px",
          margin: "0px",
          background: "#FFF",
        },
      }}
      closable={false}
      placement="left"
      width="80vw"
    >
      <div className={`p-4 text-white h-full`}>
        <div className="flex justify-end mb-4">
          <button onClick={handleClose}>
            <RxCross2 color="#000" size={30} />
          </button>
        </div>
        <Menu
          onClick={handleMenuClick}
          mode="inline"
          items={items}
          className="custom-menu"
        />
        <div className="">{children}</div>
      </div>
    </Drawer>
  );
};

export default MobileMenu;

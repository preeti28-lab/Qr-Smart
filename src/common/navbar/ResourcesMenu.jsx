import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom"; // Bas yeh add kiya

const ResourcesMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const lists = [
    // { label: "Types of QR code", path: "/resources/types-of-qr-code" },
    { label: "QR Codes for", path: "/resources/qr-types-bussiness" },
    { label: "QR Codes on", path: "/resources/qr-codes-on" },
    // { label: "QR Code Generator", path: "/resources/qr-code-generator" },
  ];

  const menu = (
    <Menu
      className="w-[200px] border border-slate-300"
      style={{ boxShadow: "0px 2px 6px 2px #e2e8f0 " }}
    >
      {lists.map((item, index) => (
        <Link key={index} to={item.path} className="no-underline block">
          <div className="hover:text-blue-700 font-medium w-full py-2 my-1 transition-all duration-200 active:bg-slate-200 hover:bg-slate-100 cursor-pointer text-[13px] text-slate-800 rounded-md px-3 h-full">
            {item?.label}
          </div>
        </Link>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      onVisibleChange={(visible) => setIsOpen(visible)}
      getPopupContainer={(trigger) => trigger.parentNode}
      overlayStyle={{
        position: "absolute",
        top: "65px",
        width: "auto",
      }}
    >
      <p
        onClick={handleMenuClick}
        className={`font-semibold flex justify-center py-2 px-3 rounded-md text-[13px] cursor-pointer ${
          isOpen ? "text-blue-700 bg-slate-100" : "text-slate-800"
        } hover:bg-slate-100 transition-all duration-300 items-center gap-x-2`}
      >
        {children}
        <IoIosArrowDown size={18} />
      </p>
    </Dropdown>
  );
};

export default ResourcesMenu;

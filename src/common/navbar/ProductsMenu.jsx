import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQrType } from "../../redux/features/dashboard";

const ProductsMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuClick = (type, path) => {
    dispatch(setQrType({ type }));
    navigate(path);
    setIsOpen(false); // Close the dropdown after clicking
  };

  const menu = (
    <Menu
      className="w-[400px] border border-slate-300 grid grid-cols-2 left-16"
      style={{ boxShadow: "0px 2px 6px 2px #e2e8f0 " }}
    >
      <Menu.Item key="1">
        <button className="w-full text-start" onClick={() => handleMenuClick("website", "/builder/content")}>
          Website
        </button>
      </Menu.Item>
      <Menu.Item key="2">
        <button className="w-full text-start" onClick={() => handleMenuClick("text", "/builder/content")}>Text</button>
      </Menu.Item>
      <Menu.Item key="3">
        <button className="w-full text-start" onClick={() => handleMenuClick("pdf", "/builder/content")}>PDF</button>
      </Menu.Item>
      <Menu.Item key="4">
        <button className="w-full text-start" onClick={() => handleMenuClick("images", "/builder/content")}>Images</button>
      </Menu.Item>
      <Menu.Item key="5">
        <button className="w-full text-start" onClick={() => handleMenuClick("vcard", "/builder/content")}>vCard Plus</button>
      </Menu.Item>
      <Menu.Item key="6">
        <button className="w-full text-start" onClick={() => handleMenuClick("video", "/builder/content")}>Video</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["hover"]}
      onVisibleChange={(visible) => setIsOpen(visible)}
      className="mobile-menu"
      getPopupContainer={(trigger) => trigger.parentNode}
      overlayStyle={{
        position: "absolute",
        top: "65px",
        left: "20px",
        width: "auto",
        minWidth: "200px",
      }}
    >
      <p
        onClick={() => setIsOpen(!isOpen)}
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

export default ProductsMenu;

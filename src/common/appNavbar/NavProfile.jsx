import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";

// icons
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

// components
import OpacityButton from "../../components/buttons/OpacityButton";
// import MyLink from "../../components/links/MyLink";
import usePath from "../../hooks/usePath";
import { HiUsers } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/qrlogo.png";
import { CiLogout } from "react-icons/ci";
import { RiLogoutCircleLine } from "react-icons/ri";
import handleLogout from "../../constants/handleLogout";

const NavProfile = ({
  image = "https://cdn-icons-png.flaticon.com/512/9703/9703596.png",
}) => {
  const path = usePath();
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);

  // State for visibility of the dropdown menu
  const [visible, setVisible] = useState(false);

  // State for scroll position
  const [scrollY, setScrollY] = useState(0);

  // Handle menu click
  const handleMenuClick = () => {
    setVisible(!visible);
  };

  // const ProfileButton = ({ icon, text, to = null }) => {
  //   return (
  //     <MyLink to={to}>
  //       <div className="flex justify-center items-center text-[15px] py-2 gap-x-2">
  //         {icon}
  //         <span>{text}</span>
  //       </div>
  //     </MyLink>
  //   );
  // };

  // Define dropdown menu items
  const menu = (
    <ul className="w-[200px] rounded-md main-text bg-gray-100 shadow-[0px_1px_6px_-1px_#bdbdbd] p-1">
      <li
        key="1"
        className="py-2 px-3 flex items-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md"
        onClick={() => path.navigate("/my-account")}
      >
        <div className="rounded-full bg-purple-700 text-white p-2">
          <FaRegUser size={16} />
        </div>
        <span className="font-medium">Profile</span>
      </li>
      <li
        key="1"
        className="py-2 px-3 flex items-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md"
        onClick={() => handleLogout()}
      >
        <div className="rounded-full bg-purple-700 text-white p-2">
          <RiLogoutCircleLine size={16} />
        </div>
        <span className="font-medium">Logout</span>
      </li>
      {role === "superAdmin" && (
        <li
          key="2"
          className="py-2 px-3 flex items-center gap-x-4 cursor-pointer hover:bg-gray-300 rounded-md"
          onClick={() => path.navigate("/allusers")}
        >
          <div className="rounded-full bg-green-700 text-white p-2">
            <HiUsers size={16} />
          </div>
          <span className="font-medium">Users</span>
        </li>
      )}
    </ul>
  );

  // Track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="QR Smart logo" className="h-12 w-auto " />
          <span className="font-black text-[24px] tracking-tight text-white uppercase qr-logo">
            QR<span className="text-white qr-logo pl-1">Smart</span>
          </span>
        </Link>
        {token ? (
          <>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              visible={visible}
              onVisibleChange={(flag) => setVisible(flag)}
              overlayClassName="main-nav-dropdown"
              overlayStyle={{
                top: `${62 + scrollY}px`, // Adjust the top position based on scroll
                right: "10px", // Adjust the left position
                zIndex: 1000, // Optional, to ensure dropdown is above other elements
              }}
            >
              <OpacityButton
                onClick={handleMenuClick}
                className="rounded-full flex justify-center items-center gap-x-1 p-1 px-1.5"
              >
                <img
                  src={image}
                  alt="Profile"
                  className="w-7 h-7 rounded-full"
                />
                <MdOutlineKeyboardArrowDown size={20} />
              </OpacityButton>
            </Dropdown>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default NavProfile;

import React from "react";

// sidebar/components
import SidebarProvider from "./SidebarProvider";

// icons
import { RxDashboard } from "react-icons/rx"; // dashboard
import { FaListUl } from "react-icons/fa"; // leads
import { TbBucket, TbCapture, TbTemplate } from "react-icons/tb"; // bucket
import { RiShareForwardLine } from "react-icons/ri"; // follow ups
import { GiReceiveMoney } from "react-icons/gi"; // revenue
import { FaTasks } from "react-icons/fa"; // tasks
import { FaUsers } from "react-icons/fa"; // users
import { MdHistory, MdOutlineMessage, MdPayment } from "react-icons/md"; // payment

// hooks
import usePath from "../../hooks/usePath";
import { SiVultr } from "react-icons/si";
// import { useSelector } from "react-redux";
import { LuTarget } from "react-icons/lu";
import { IoQrCode } from "react-icons/io5";
import { BiStats } from "react-icons/bi";
import { useSelector } from "react-redux";
import { CgFileDocument } from "react-icons/cg";
import { BsKey } from "react-icons/bs";
// import useAbility from "../../hooks/useAbility";

const Sidebar = ({ collapse = false, onCollapse = () => {} }) => {
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);
  // redux
  // const { user } = useSelector(state => state.user);
  // const ability = useAbility();
  // console.log(user);

  const path = usePath();
  const links = [
    {
      text: "New QR",
      path: `builder`,
      icon: <RxDashboard size={"18px"} />,
      active: path.endPoint === "builder",
    },
    {
      text: "Bulk QR generation",
      path: `bulk-qr-code-generator`,
      icon: <LuTarget size={"18px"} />,
      active: path.endPoint === "bulk-qr-code-generator",
      requiresToken: true, // Add a condition flag
    },
    {
      text: "My QR Codes",
      path: `my-qr-codes`,
      icon: <IoQrCode size={"18px"} />,
      active: path.endPoint === "my-qr-codes",
      requiresToken: true,
    },
    {
      text: "Bulk QR Codes",
      path: `bulk-qr-codes`,
      icon: <IoQrCode size={"18px"} />,
      active: path.endPoint === "bulk-qr-codes",
      requiresToken: true,
    },
    {
      text: "Stats",
      path: `stats`,
      icon: <BiStats size={"18px"} />,
      active: path.endPoint === "stats",
      requiresToken: true,
    },
    {
      text: "Templates",
      path: `templates`,
      icon: <TbTemplate size={"18px"} />,
      active: path.endPoint === "templates",
      requiresToken: true,
    },
    {
      text: "Plans and payments",
      path: `plans-and-payments`,
      icon: <MdPayment size={"18px"} />,
      active: path.endPoint === "plans-and-payments",
    },
    {
      text: "API Keys",
      path: "api-keys",
      icon: <BsKey size={"18px"} />,
      active: path.endPoint === "api-keys",
      requiresToken: true,
    },
    // Conditional rendering of the link
    ...(role === "superAdmin"
      ? [
          {
            text: "All Payments",
            path: "allpayments",
            icon: <MdPayment size={"18px"} />,
            active: path.endPoint === "allpayments",
          },
        ]
      : []),

    ...(role === "superAdmin"
      ? [
          {
            text: "Blogs",
            path: "allblogs",
            icon: <CgFileDocument size={"18px"} />,
            active: path.endPoint === "allblogs",
          },
        ]
      : []),

    ...(role === "superAdmin"
      ? [
          {
            text: "Contact Queries",
            path: "contact-query",
            icon: <MdOutlineMessage size={"18px"} />,
            active: path.endPoint === "contact-query",
          },
        ]
      : []),

    // Conditional rendering of the link
    ...(role !== "superAdmin" && isAuthenticated
      ? [
          {
            text: "Payment History",
            path: "paymenthistory",
            icon: <MdPayment size={"18px"} />,
            active: path.endPoint === "paymenthistory",
          },
        ]
      : []),

    {
      text: "Contact",
      path: `query`,
      icon: <LuTarget size={"18px"} />,
      active: path.endPoint === "query",
      requiresToken: true, // Add a condition flag
    },
  ];

  // Filter the links based on the token availability
  const filteredLinks = links.filter((link) => !link.requiresToken || token);

  return (
    <>
      <SidebarProvider
        collapse={collapse}
        onCollapse={onCollapse}
        links={filteredLinks}
        // username={user?.name || ''}
        username="Deepak Dhiman"
      />
    </>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import MyButton from "../../components/buttons/MyButton";
import { FaPlus } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Status from "../../components/status/Status";
import AddUser from "./AddUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/features/contact";

const AllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const { allMembers } = useSelector((state) => state.contact);

  const columns = [
    // {
    //   name: "Users",
    //   // selector: row => row?.user || '-',
    //   cell: () => (
    //     <div className="flex flex-col justify-start my-4 items-start gap-y-2">
    //       <h2 className="text-[15px] font-semibold">
    //         dhimandeepak957@gmail.com
    //       </h2>
    //       <div className="flex flex-col justify-start items-start">
    //         <p className="text-[12px] font-medium text-gray-800">
    //           Creation date: December 31, 2024
    //         </p>
    //         <p className="text-[12px] font-medium text-gray-800">
    //           Last access: January 1, 2025
    //         </p>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      name: "Name",
      // selector: row => row?.role || '-',
      cell: (row) => <h2 className="font-semibold text-[15px]">{row?.name}</h2>,
    },
    {
      name: "Mobile",
      // selector: row => row?.state || '-',
      width: "130px",
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.mobile}</h2>
      ),
    },
    {
      name: "Email",
      // selector: row => row?.state || '-',
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.email}</h2>
      ),
    },
    {
      name: "Profile",
      // selector: row => row?.state || '-',
      width: "130px",
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.profile}</h2>
      ),
    },
    {
      name: "Paid Plan",
      // selector: row => row?.state || '-',
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">
          {row?.paidPlan === false ? "Inactive" : "Active"}
        </h2>
      ),
    },
    {
      name: "Trial Plan",
      // selector: row => row?.state || '-',
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">
          {row?.trialPlan === false ? "Inactive" : "Active"}
        </h2>
      ),
    },
  ];

  const data = [
    {
      user: "Deepak Dhiman",
      role: "Admin",
      state: "active",
    },
  ];

  return (
    <>
      <AddUser isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} />

      <AppViewer>
        <div className="py-3 px-4 w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-semibold text-[22px]">User management</h2>
            {/* <MyButton
                        className='flex justify-center items-center rounded-full px-6 bg-blue-700 gap-x-2 text-[15px] py-2'
                        onClick={() => setIsOpenAdd(true)}
                    >
                        <FaPlus size={15} />
                        <span>Add User</span>
                    </MyButton> */}
          </div>

          <div className="w-full my-4">
            <DataTable
              columns={columns}
              data={allMembers ? allMembers : []}
              customStyles={{
                headCells: {
                  style: {
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#424242",
                  },
                },
              }}
              pagination
            />
          </div>
        </div>
      </AppViewer>
    </>
  );
};

export default AllUsers;

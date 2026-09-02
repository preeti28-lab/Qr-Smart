import React, { useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import MyButton from "../../components/buttons/MyButton";
import { FaPlus } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Status from "../../components/status/Status";
// import AddUser from './AddUser';

const AllPayments = () => {
  const columns = [
    {
      name: "Users",
      // selector: row => row?.user || '-',
      cell: (row) => (
        <div className="flex flex-col justify-start my-4 items-start gap-y-2">
          <h2 className="text-[15px] font-semibold">
            dhimandeepak957@gmail.com
          </h2>
          <div className="flex flex-col justify-start items-start">
            <p className="text-[12px] font-medium text-gray-800">
              Name : {row?.user}
            </p>
            {/* <p className="text-[12px] font-medium text-gray-800">
              Last access: January 1, 2025
            </p> */}
          </div>
        </div>
      ),
    },
    {
      name: "QR Type",
      // selector: row => row?.role || '-',
      cell: (row) => <h2 className="font-semibold text-[15px]">{row?.role}</h2>,
    },
    {
      name: "Payment",
      // selector: row => row?.amount || '-',
      // cell: (row) => (
      //     <Status
      //         status={row?.state}
      //         className='text-[13px]'
      //     />
      // )
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.amount}</h2>
      ),
    },
    {
      name: "Payment Status",
      // selector: row => row?.role || '-',
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.status}</h2>
      ),
    },
  ];

  const data = [
    {
      user: "Deepak Dhiman",
      role: "PDF",
      amount: "3000",
      status: "paid",
    },
    {
      user: "Anjali Verma",
      role: "Website",
      amount: "4500",
      status: "unpaid",
    },
    {
      user: "Rohit Sharma",
      role: "Text",
      amount: "2500",
      status: "paid",
    },
    {
      user: "Priya Singh",
      role: "Video",
      amount: "1500",
      status: "pending",
    },
    {
      user: "Amit Chauhan",
      role: "Images",
      amount: "5000",
      status: "paid",
    },
    {
      user: "Sneha Kapoor",
      role: "Website",
      amount: "3500",
      status: "unpaid",
    },
    {
      user: "Vikram Mehra",
      role: "PDF",
      amount: "2000",
      status: "paid",
    },
    {
      user: "Neha Gupta",
      role: "Video",
      amount: "4000",
      status: "pending",
    },
    {
      user: "Kunal Joshi",
      role: "Text",
      amount: "3200",
      status: "paid",
    },
    {
      user: "Riya Malhotra",
      role: "Text",
      amount: "1800",
      status: "unpaid",
    },
  ];

  return (
    <>
      <AppViewer>
        <div className="py-3 px-4 w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-semibold text-[22px]">All Payments</h2>
          </div>

          <div className="w-full my-4">
            <DataTable
              columns={columns}
              data={data}
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

export default AllPayments;

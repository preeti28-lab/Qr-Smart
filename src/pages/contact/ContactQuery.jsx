import React, { useEffect } from "react";
import AppViewer from "../../layouts/AppViewer";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllContacts } from "../../redux/features/contact";

const ContactQuery = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const { allContacts } = useSelector((state) => state.contact);

  const columns = [
    {
      name: "Name",
      // selector: row => row?.user || '-',
      width: "200px",
      cell: (row) => (
        <div className="flex flex-col justify-start my-4 items-start gap-y-2">
          <h2 className="text-[15px] font-semibold">{row.name}</h2>
        </div>
      ),
    },
    {
      name: "Email",
      // selector: row => row?.role || '-',
      width: "260px",
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.email}</h2>
      ),
    },
    {
      name: "Subject",
      // selector: row => row?.amount || '-',
      // cell: (row) => (
      //     <Status
      //         status={row?.state}
      //         className='text-[13px]'
      //     />
      // )
      width: "160px",
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.subject}</h2>
      ),
    },
    {
      name: "Question/Enquiry",
      // selector: row => row?.role || '-',
      cell: (row) => (
        <h2 className="font-semibold text-[15px]">{row?.message}</h2>
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
    <div>
      <AppViewer>
        <div className="py-3 px-4 w-full flex justify-between">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-semibold text-[22px]">Contact Queries</h2>
          </div>
        </div>
        <div className="px-5">
          <div className="w-full ">
            <DataTable
              columns={columns}
              data={allContacts ? allContacts : []}
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
    </div>
  );
};

export default ContactQuery;

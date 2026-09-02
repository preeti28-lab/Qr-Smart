import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { getPaymentHistory } from "../../redux/features/blogs";
import { customStyles } from "../../constants/tablestyles";
import AdminPageHeading from "../../components/AdminPageHeading";

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getPaymentHistory({}, (success, data) => {
        if (success) setHistory(data || []);
        setLoading(false);
      }),
    );
  }, [dispatch]);

  const columns = [
    {
      name: "Invoice",
      selector: (row) => row.invoiceNo,
      cell: (row) => (
        <span className="text-[13px] font-semibold text-blue-700">
          {row.invoiceNo}
        </span>
      ),
      width: "110px",
    },
    {
      name: "Plan",
      cell: (row) => (
        <div className="flex flex-col gap-0.5 py-3">
          <span className="text-[14px] font-semibold text-gray-800">
            {row.planName}
          </span>
          <span className="text-[11px] text-gray-400">{row.planDuration}</span>
        </div>
      ),
    },
    {
      name: "Purchased On",
      cell: (row) => (
        <span className="text-[13px] text-gray-700">
          {formatDate(row.purchasedOn)}
        </span>
      ),
    },
    {
      name: "Valid Until",
      cell: (row) => (
        <span className="text-[13px] text-gray-700">
          {formatDate(row.endDate)}
        </span>
      ),
    },
    {
      name: "Amount (₹)",
      cell: (row) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[14px] font-semibold text-gray-800">
            ₹{row.finalAmount}
          </span>
          {row.discount > 0 && (
            <span className="text-[11px] text-emerald-600">
              −₹{row.discount} off
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Payment",
      cell: (row) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold w-fit ${
            row.paymentStatus === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.paymentStatus === "paid" ? "✓ Paid" : row.paymentStatus}
        </span>
      ),
      width: "100px",
    },
    {
      name: "Status",
      cell: (row) => {
        const isActive = row.isActive && !row.isExpired;
        const isExpired = row.isExpired;
        return (
          <span
            className={`px-2.5 py-0.5 rounded-full  font-semibold w-fit flex items-center gap-1 ${
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : isExpired
                  ? "bg-gray-100 text-gray-500"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block flex-shrink-0 ${
                isActive
                  ? "bg-emerald-500"
                  : isExpired
                    ? "bg-gray-400"
                    : "bg-yellow-500"
              }`}
            />
            {isActive ? "Active" : isExpired ? "Expired" : "Inactive"}
          </span>
        );
      },
      width: "110px",
    },
    {
      name: "Order ID",
      cell: (row) => (
        <span className=" text-gray-800 font-mono">{row.orderId}</span>
      ),
    },
  ];

  return (
    <AppViewer>
      <div className="py-3 px-4 w-full">
        <AdminPageHeading
          title="Payment History"
          description="All your past and current subscription purchases."
        />

        <div className="w-full bg-white border border-gray-100 shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={history}
            progressPending={loading}
            progressComponent={
              <div className="py-10 text-gray-400 text-[14px]">
                Loading payment history...
              </div>
            }
            noDataComponent={
              <div className="py-10 text-gray-400 text-[14px]">
                No payment records found.
              </div>
            }
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
        </div>
      </div>
    </AppViewer>
  );
};

export default PaymentHistory;

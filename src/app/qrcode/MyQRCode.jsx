import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import MyQRNav from "./MyQRNav";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllQrCodes, deleteQRCode } from "../../redux/features/qrcodes";
import { RiQrCodeLine } from "react-icons/ri";
import DataTable from "react-data-table-component";
import { BsQrCode } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import QRDetailDrawer from "./QRDetailDrawer";
import { customStyles } from "../../constants/tablestyles";
import Swal from "sweetalert2";
import { setQrType } from "../../redux/features/dashboard";

const getColumns = (onQRClick, handleEdit, handleDelete) => [
  {
    name: "QR",
    cell: (row) => (
      <button
        onClick={() => onQRClick(row)}
        className="p-1.5 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
        title="View Details"
      >
        <BsQrCode size={30} />
      </button>
    ),
    width: "70px",
    center: true,
    ignoreRowClick: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    cell: (row) => (
      <span className="capitalize px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
        {row.type}
      </span>
    ),
    sortable: true,
    width: "130px",
  },
  {
    name: "QR Name",
    selector: (row) => row.label || "—",
    sortable: true,
  },
  {
    name: "Short Code",
    selector: (row) => row.shortcode,
    cell: (row) => (
      <span className="font-mono text-sm text-gray-700">{row.shortcode}</span>
    ),
    sortable: true,
  },
  {
    name: "Scans",
    selector: (row) => row.scanCount,
    sortable: true,
    width: "100px",
    cell: (row) => (
      <span className="font-semibold text-gray-800">{row.scanCount}</span>
    ),
  },
  {
    name: "Last Scanned",
    selector: (row) => row.lastScannedAt,
    cell: (row) =>
      row.lastScannedAt
        ? new Date(row.lastScannedAt).toLocaleDateString()
        : "Never",
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => row.createdAt,
    cell: (row) => new Date(row.createdAt).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleEdit(row)}
          className="p-1.5 rounded-md text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          title="Edit"
        >
          <MdOutlineEdit size={20} />
        </button>

        <button
          onClick={() => handleDelete(row._id)}
          className="p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <MdDeleteOutline size={20} />
        </button>
      </div>
    ),
    width: "120px",
    center: true,
    ignoreRowClick: true,
  },
];

const MyQRCode = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [qrRows, setQrRows] = useState([]);
  const [drawerData, setDrawerData] = useState(null);

  const [statusFilter, setStatusFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchQrCodes = (page = currentPage, limit = perPage) => {
    setLoading(true);

    dispatch(
      getAllQrCodes(
        {
          page,
          limit,
          search: searchText || undefined,
          status: statusFilter.length ? statusFilter.join(",") : undefined,
          type: typeFilter.length ? typeFilter.join(",") : undefined,
        },
        (success, data) => {
          if (success) {
            setQrRows(data?.qrCodes || []);
            setCurrentPage(data?.page || 1);
            setTotalRows(data?.total || 0);
          } else {
            setQrRows([]);
            setTotalRows(0);
          }
          setLoading(false);
        },
      ),
    );
  };

  useEffect(() => {
    fetchQrCodes(1, perPage);
  }, [dispatch, statusFilter, typeFilter, searchText, perPage]);

  const handleEdit = (row) => {
    const { type, _id } = row;

    const typeMap = {
      staticSMS: "sms",
      staticText: "text",
      staticURL: "url",
      staticWhatsApp: "whatsapp",
      staticWifi: "wifi",
      staticEmail: "email",
      staticVcard: "vCard",
      // future mappings go here
      // staticEMAIL: "email",
      // staticURL: "url",
    };

    const normalizedType = typeMap[type] || type;

    dispatch(setQrType({ type: normalizedType }));
    navigate(`/builder/content/${_id}`);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete QR Code?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    const success = await dispatch(deleteQRCode(id));

    if (success) {
      setSelectedItemIds((prev) => prev.filter((itemId) => itemId !== id));

      if (drawerData?._id === id) {
        setDrawerData(null);
      }

      fetchQrCodes(currentPage, perPage);
    } else {
      setLoading(false);
    }
  };
  const handleSelectAll = () => {
    if (selectedItemIds.length !== qrRows.length) {
      setSelectedItemIds(qrRows.map((item) => item._id));
    } else {
      setSelectedItemIds([]);
    }
  };

  const columns = getColumns(
    (row) => setDrawerData(row),
    handleEdit,
    handleDelete,
  );

  return (
    <AppViewer>
      <div className="w-full relative py-4 px-5">
        <MyQRNav
          selected={selectedItemIds.length > 0}
          selectedNumber={selectedItemIds.length}
          selectedCancel={() => setSelectedItemIds([])}
          allSelected={
            qrRows.length > 0 && selectedItemIds.length === qrRows.length
          }
          setAllSelected={handleSelectAll}
          idsToDelete={selectedItemIds}
          onStatusChange={(value) => {
            setCurrentPage(1);
            setStatusFilter(value);
          }}
          onTypeChange={(value) => {
            setCurrentPage(1);
            setTypeFilter(value);
          }}
          statusValue={statusFilter}
          typeValue={typeFilter}
          searchValue={searchText}
          onSearchChange={(value) => {
            setCurrentPage(1);
            setSearchText(value);
          }}
        />

        <div className="mt-3">
          <DataTable
            columns={columns}
            data={qrRows}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationPerPage={perPage}
            onChangePage={(page) => {
              setCurrentPage(page);
              fetchQrCodes(page, perPage);
            }}
            onChangeRowsPerPage={(newPerPage, page) => {
              setPerPage(newPerPage);
              setCurrentPage(page);
              fetchQrCodes(page, newPerPage);
            }}
            progressPending={loading}
            highlightOnHover
            responsive
            customStyles={customStyles}
            noDataComponent={
              <div className="flex flex-col justify-center items-center gap-y-4 py-20 w-full">
                <RiQrCodeLine size={60} className="text-slate-600" />
                <p className="font-semibold text-gray-800 text-[14px]">
                  {searchText ||
                  statusFilter.length > 0 ||
                  typeFilter.length > 0
                    ? "No QR codes match your filters"
                    : "You haven't created QR Codes yet"}
                </p>
              </div>
            }
          />
        </div>
      </div>

      <QRDetailDrawer
        data={drawerData}
        open={!!drawerData}
        onClose={() => setDrawerData(null)}
      />
    </AppViewer>
  );
};

export default MyQRCode;

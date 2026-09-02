import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import { RiQrCodeLine } from "react-icons/ri";
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTemplates, deleteTemplate } from "../../redux/features/templates";
import QRShow from "../../tools/QRShow";

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-[18px] font-bold text-gray-800 mb-2">Delete Template?</h3>
            <p className="text-[14px] text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-x-3">
                <button onClick={onCancel}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold text-[14px] py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-[14px] py-2.5 rounded-xl transition-colors">
                    Delete
                </button>
            </div>
        </div>
    </div>
);

// ─── Template Card ────────────────────────────────────────────────────────────
const TemplateCard = ({ template, onEdit, onDelete }) => {
    const s = template?.style || {};
    return (
        <div className="rounded-xl shadow-[0px_1px_8px_-1px_#d1d5db] bg-white border border-gray-100 relative overflow-hidden flex flex-col">
            {/* 3-dot menu */}
            <Menu placement="left-start">
                <Tooltip title="Options">
                    <div className="absolute top-2 right-2 z-10">
                        <MenuHandler>
                            <div className="bg-white rounded-full border-2 cursor-pointer hover:border-gray-600 transition-all duration-200 p-1 border-gray-200 shadow-sm">
                                <HiOutlineDotsVertical size={20} />
                            </div>
                        </MenuHandler>
                    </div>
                </Tooltip>
                <MenuList className="p-1 min-w-[130px]">
                    <MenuItem
                        className="flex items-center gap-x-2 text-[13px] text-gray-700 font-medium"
                        onClick={() => onEdit(template._id)}>
                        <MdOutlineModeEditOutline size={16} />
                        <span>Edit</span>
                    </MenuItem>
                    <MenuItem
                        className="flex items-center gap-x-2 text-[13px] text-red-600 font-medium"
                        onClick={() => onDelete(template._id)}>
                        <MdDelete size={16} />
                        <span>Delete</span>
                    </MenuItem>
                </MenuList>
            </Menu>

            {/* QR Preview */}
            <div className="pt-6 pb-2 flex justify-center items-center bg-gray-50 min-h-[180px]">
                <QRShow
                    title=""
                    selectedFrame={s.selectedFrame || ""}
                    selectedLogo={s.selectedLogo || ""}
                    selectedLevel={s.selectedLevel || "M"}
                    selectedCodeStyle={s.isCodeStyle || "classy"}
                    selectedCorner={s.isCorner || "dot"}
                    selectedCenterStyle={s.isCenterStyle || "dot"}
                    selectedCodeStyleBorderColor={s.isCodeStyleBorderColor || "#000000"}
                    selectedCodeStyleDotColor={s.isCodeStyleDotColor || "#000000"}
                    selectedCodeStyleCenterColor={s.isCodeStyleCenterColor || "#000000"}
                    selectedCodeStyleBackgroundColor={s.isCodeStyleBackgroundColor || "#ffffff"}
                    showDownload="false"
                />
            </div>

            {/* Name + meta */}
            <div className="border-t border-gray-100 px-4 py-3 flex flex-col gap-y-0.5">
                <h3 className="font-bold text-[15px] text-gray-800 truncate">{template.name || "Untitled"}</h3>
                <p className="text-[11px] text-gray-400">
                    Style: <span className="font-semibold text-gray-500">{s.isCodeStyle || "—"}</span>
                    &nbsp;·&nbsp;Level: <span className="font-semibold text-gray-500">{s.selectedLevel || "—"}</span>
                </p>
            </div>
        </div>
    );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ onCreateClick }) => (
    <div className="flex flex-col justify-center items-center gap-y-4 py-24 w-full">
        <RiQrCodeLine size={64} className="text-gray-300" />
        <p className="font-semibold text-gray-500 text-[15px]">No templates yet</p>
        <p className="text-[13px] text-gray-400">Create your first QR design template to reuse it across QR codes.</p>
        <button onClick={onCreateClick}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] px-6 py-2.5 rounded-full transition-colors">
            + Create Template
        </button>
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Templates = () => {
    const dispatch    = useDispatch();
    const navigate    = useNavigate();
    const { allTemplates, isTemplateLoading } = useSelector((state) => state.template);

    const [deleteId,  setDeleteId]  = useState(null);
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => { dispatch(getAllTemplates()); }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteTemplate(deleteId));
        setDeleteId(null);
    };

    const filtered = (allTemplates || []).filter(t =>
        (t.name || "").toLowerCase().includes(searchVal.toLowerCase())
    );

    return (
        <AppViewer>
            <div className="w-full p-3 sm:p-4">

                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
                    <div>
                        <h2 className="font-bold text-[22px] sm:text-[24px] text-gray-800">Templates</h2>
                        <p className="text-[13px] text-gray-400 mt-0.5">Save QR design styles and reuse them instantly</p>
                    </div>
                    <button
                        onClick={() => navigate("/templates/create")}
                        className="shrink-0 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-[14px] px-5 py-2.5 rounded-full transition-colors shadow-sm">
                        + Create Template
                    </button>
                </div>

                {/* ── Search ── */}
                {(allTemplates?.length > 0) && (
                    <div className="mb-5">
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchVal}
                            onChange={e => setSearchVal(e.target.value)}
                            className="w-full sm:w-72 border border-gray-300 rounded-full px-4 py-2 text-[13px] outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                )}

                {/* ── Loading ── */}
                {isTemplateLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map(item => (
                            <TemplateCard
                                key={item._id}
                                template={item}
                                onEdit={id => navigate(`/templates/edit/${id}`)}
                                onDelete={id => setDeleteId(id)}
                            />
                        ))}
                    </div>
                ) : searchVal ? (
                    <div className="flex flex-col items-center py-16 text-gray-400 gap-y-2">
                        <RiQrCodeLine size={48} className="opacity-30" />
                        <p className="text-[14px] font-medium">No templates match "{searchVal}"</p>
                    </div>
                ) : (
                    <EmptyState onCreateClick={() => navigate("/templates/create")} />
                )}

                {/* Count badge */}
                {filtered.length > 0 && (
                    <p className="text-[12px] text-gray-400 mt-4">{filtered.length} template{filtered.length !== 1 ? "s" : ""}</p>
                )}
            </div>

            {/* Delete confirm modal */}
            {deleteId && (
                <DeleteModal
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </AppViewer>
    );
};

export default Templates;
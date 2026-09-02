import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

/**
 * BuilderLayout
 *
 * A reusable layout wrapper for all QR builder pages.
 * Handles the responsive two-column layout:
 *  - Desktop (xl+): left form + right sticky preview sidebar
 *  - Mobile/Tablet (<xl): full-width form + floating "Preview" button + modal
 *
 * Props:
 *  @param {ReactNode} children     — The left-side form content
 *  @param {ReactNode} preview      — The right-side preview content (DemoPreview / QRView etc.)
 *  @param {string}    previewTitle — Optional modal header title (default: "Preview")
 */
const BuilderLayout = ({ children, preview, previewTitle = "Preview" }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Floating Preview Button — only visible below xl */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg xl:hidden"
        onClick={() => setShowModal(true)}
      >
        <FaEye size={18} />
        <span className="text-sm font-medium">{previewTitle}</span>
      </button>

      {/* Preview Modal — only visible below xl */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl p-5 w-[90vw] max-w-sm max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose size={22} />
            </button>

            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              {previewTitle}
            </h3>

            <div className="flex justify-center">{preview}</div>
          </div>
        </div>
      )}

      {/* Main two-column layout */}
      <div className="flex gap-x-5 p-5">
        {/* Left — full width on mobile, 75% on desktop */}
        <div className="w-full xl:w-[75%]">{children}</div>

        {/* Right — hidden on mobile, sticky sidebar on desktop */}
        <div className="hidden xl:flex w-[25%] !flex-col relative">
          <div className="sticky top-20">{preview}</div>
        </div>
      </div>
    </>
  );
};

export default BuilderLayout;
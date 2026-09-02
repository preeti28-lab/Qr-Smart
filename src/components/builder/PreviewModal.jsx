import { IoMdClose } from "react-icons/io";

const PreviewModal = ({
  isOpen,
  onClose,
  title = "Preview",
  children,
  maxWidth = "max-w-sm",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm xl:hidden"
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-2xl p-5 w-[90vw] ${maxWidth} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <IoMdClose size={22} />
        </button>

        {/* Title */}
        {title && (
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            {title}
          </h3>
        )}

        {/* Content */}
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default PreviewModal;
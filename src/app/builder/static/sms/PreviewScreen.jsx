import EmptyPreview from "../../../../components/ui/EmptyPreview";

const PreviewScreen = ({ currentFormData }) => {
  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const { number, message } = currentFormData;

  return (
    <div className="p-4 min-h-full">
      <div className="bg-gray-50 h-[65dvh] border">
        <div className="bg-gray-100 flex gap-1 p-1">
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
        </div>
        <div className="px-2">
          <p className="font-bold text-[11px] text-left  pl-1 pt-2">Address</p>
          <p className="font-semibold text-[11px] text-left mb-4 pl-1">
            {number}
          </p>

          <p className="font-bold text-[11px] text-left  pl-1  border-t pt-2">
            Message
          </p>
          <p className="font-semibold text-[11px] text-left mb-4 pl-1 break-all ">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;

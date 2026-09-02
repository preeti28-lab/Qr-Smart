import EmptyPreview from "../../../../components/ui/EmptyPreview";

const PreviewScreen = ({ currentFormData }) => {
  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const { message } = currentFormData;

  return (
    <div className="p-4 min-h-full">
      <div className="bg-gray-50 h-[65dvh] border">
        <div className="bg-gray-100 flex gap-1 p-1">
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
        </div>
        <p className="font-bold text-[11px] text-left mb-4 pl-1 pt-1">
          {message}
        </p>
      </div>
    </div>
  );
};

export default PreviewScreen;

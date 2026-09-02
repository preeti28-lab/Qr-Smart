import EmptyPreview from "../../../../components/ui/EmptyPreview";

const PreviewScreen = ({ currentFormData }) => {
  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const { message } = currentFormData;

  return (
    <div className="min-h-full bg-gray-100 p-4">
      {/* Dummy URL Bar */}
      <div className="bg-gray-200 h-6 rounded w-full mb-3 flex items-center px-2 text-gray-500 text-xs">
        https://www.dummywebsite.com
      </div>

      {/* Navbar */}
      <div className="bg-white shadow rounded mb-4 flex justify-between items-center p-3">
        {/* Logo */}
        <div className="bg-gray-300 w-24 h-6 rounded"></div>
        {/* Hamburger */}
        <div className="flex flex-col gap-1">
          <div className="bg-gray-300 w-6 h-1 rounded"></div>
          <div className="bg-gray-300 w-6 h-1 rounded"></div>
          <div className="bg-gray-300 w-6 h-1 rounded"></div>
        </div>
      </div>

      {/* Banner / Hero Section */}
      <div className="bg-gray-200 rounded-lg h-48 mb-6 flex items-center justify-center">
        <div className="bg-gray-300 w-full h-48 rounded"></div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            key={card}
            className="bg-white shadow rounded p-3 flex flex-col gap-2"
          >
            <div className="bg-gray-300 w-full h-32 rounded mb-2"></div>
            <div className="bg-gray-300 w-3/4 h-4 rounded"></div>
            <div className="bg-gray-300 w-1/2 h-4 rounded"></div>
            <div className="bg-gray-300 w-full h-6 rounded mt-2"></div>
          </div>
        ))}
      </div>

      {/* Footer */}
    </div>
  );
};

export default PreviewScreen;

import EmptyPreview from "../../../../components/ui/EmptyPreview";

const PreviewScreen = ({ currentFormData }) => {
  console.log(currentFormData)
  // Destructure all vCard fields
  const {
    fullName,
    organization,
    title,
    phone,
    email,
    website,
    address,
    note,
    message,
  } = currentFormData || {};

  return (
    <div className="p-4 min-h-full">
      <div className="bg-gray-50 h-[65dvh] border p-4 rounded-lg flex flex-col gap-2">
        {/* Header mimic (like phone UI) */}
        <div className="bg-gray-100 flex gap-1 p-1 rounded-md">
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
          <div className="p-1 rounded-full bg-gray-300 w-max"></div>
        </div>

        {/* vCard Details */}
        {fullName && <p className="font-bold text-sm">{fullName}</p>}
        {title && <p className="text-xs text-gray-600">{title}</p>}
        {organization && (
          <p className="text-xs text-gray-600">{organization}</p>
        )}
        {phone && <p className="text-xs text-gray-600">📞 {phone}</p>}
        {email && <p className="text-xs text-gray-600">✉️ {email}</p>}
        {website && <p className="text-xs text-gray-600">🌐 {website}</p>}
        {address && <p className="text-xs text-gray-600">🏠 {address}</p>}
        {note && <p className="text-xs text-gray-600">📝 {note}</p>}
        {message && <p className="text-xs mt-2 text-gray-800">{message}</p>}
      </div>
    </div>
  );
};

export default PreviewScreen;

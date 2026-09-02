// components/ui/PageHeader.jsx
const AdminPageHeading = ({ title, description }) => (
  <div className="mb-4">
    <h2 className="font-semibold text-[22px] mb-1">{title}</h2>
    {description && (
      <p className="text-slate-500 text-[14px]">{description}</p>
    )}
  </div>
);

export default AdminPageHeading;
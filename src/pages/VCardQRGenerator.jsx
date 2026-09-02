import React, { useEffect, useRef, useState, useMemo } from "react";
import QRCodeStyling from "qr-code-styling";

const initialState = {
  name: "",
  surname: "",
  companyName: "",
  title: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const VCardQRGenerator = () => {
  const qrRef = useRef(null);
  const qrCode = useRef(null);

  const [formData, setFormData] = useState(initialState);
  const [submittedData, setSubmittedData] = useState(null);

  // ✅ vCard generator
  const vCardData = useMemo(() => {
    if (!submittedData) return "";

    const {
      name,
      surname,
      companyName,
      title,
      phone,
      email,
      street,
      city,
      state,
      postalCode,
      country,
    } = submittedData;

    return `BEGIN:VCARD
VERSION:3.0
N:${surname};${name};;;
FN:${name} ${surname}
ORG:${companyName}
TITLE:${title}
TEL:${phone}
EMAIL:${email}
ADR:;;${street};${city};${state};${postalCode};${country}
END:VCARD`;
  }, [submittedData]);

  // ✅ QR initialize
  useEffect(() => {
    if (!qrRef.current || !submittedData) return;

    qrCode.current = new QRCodeStyling({
      width: 220,
      height: 220,
      data: vCardData,
    });

    qrRef.current.innerHTML = "";
    qrCode.current.append(qrRef.current);
  }, [submittedData]);

  // ✅ Download vCard
  const downloadVCard = () => {
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "contact.vcf";
    a.click();

    URL.revokeObjectURL(url);
  };

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  // ✅ Edit (restore data)
  const handleEdit = () => {
    setFormData(submittedData);
    setSubmittedData(null);
  };

  // ✅ Reset
  const handleReset = () => {
    setFormData(initialState);
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {!submittedData ? (
        // ✅ FORM
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white p-6 rounded-xl shadow space-y-4"
        >
          <h2 className="text-xl font-semibold">Enter Contact Details</h2>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="First Name"
              className={inputClass}
            />
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Last Name"
              className={inputClass}
            />
          </div>

          {/* Company */}
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className={inputClass}
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className={inputClass}
          />

          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={inputClass}
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={inputClass}
            />
          </div>

          {/* Address */}
          <h3 className="font-semibold mt-2">Address</h3>

          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className={inputClass}
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className={inputClass}
            />
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className={inputClass}
            />
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className={inputClass}
            />
          </div>

          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className={inputClass}
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Generate Contact
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        // ✅ PREVIEW
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow space-y-6 text-center">
          <h2 className="text-xl font-semibold">Contact Preview</h2>

          {/* Card */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold">
              {submittedData.name} {submittedData.surname}
            </h3>
            <p className="text-sm text-gray-600">{submittedData.title}</p>
            <p className="text-sm">{submittedData.companyName}</p>

            <div className="mt-2 text-sm text-gray-700">
              <p>{submittedData.phone}</p>
              <p>{submittedData.email}</p>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {submittedData.street}, {submittedData.city},{" "}
              {submittedData.state} - {submittedData.postalCode},{" "}
              {submittedData.country}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={downloadVCard}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Add Contact
            </button>

            <button
              onClick={handleEdit}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VCardQRGenerator;

import React, { useEffect, useMemo, useRef, useState } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useFieldArray, useWatch } from "react-hook-form";
import { Collapse } from "antd";
import { FiTrash2 } from "react-icons/fi";

const { Panel } = Collapse;

const normalizeExistingPdf = (item) => ({
  file: null,
  blobURL: null,
  isExisting: true,
  pdfFileUrl: item?.pdfFileUrl || "",
  pdfFileName: item?.pdfFileName || "",
  name: item?.name || "",
  description: item?.description || "",
  image: item?.imageUrl
    ? [
        {
          file: null,
          imageUrl: item.imageUrl,
          isExisting: true,
        },
      ]
    : Array.isArray(item?.image)
      ? item.image
      : [],
});

const normalizeNewPdf = (item) => ({
  file: item?.file || null,
  blobURL: item?.blobURL || null,
  isExisting: false,
  pdfFileUrl: "",
  pdfFileName: item?.file?.name || item?.name || "",
  name: "",
  description: "",
  image: [],
});

const OfferInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
}) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "pdfs",
  });

  const [activeKey, setActiveKey] = useState(null);

  const watchedPdfs = useWatch({ control, name: "pdfs" }) || [];
  const uploadedPdfs = useWatch({ control, name: "pdf" }) || [];
  const watchedFields = useWatch({
    control,
    name: [
      "company",
      "pdfTitle",
      "description",
      "website",
      "btnTxt",
      "pdfBanner",
      "selectedTemplate",
    ],
  });

  const initializedRef = useRef(false);
  const processedUploadKeysRef = useRef(new Set());

  // Initialize existing PDFs once.
  // If fields already has items (remount after step change), skip replace.
  // Only replace with server-side (isExisting) PDFs - new uploads handled by append effect.
  useEffect(() => {
    if (initializedRef.current) return;

    // On remount, fields already has correct state from useForm - skip
    if (fields.length > 0) {
      initializedRef.current = true;
      return;
    }

    // Only replace with server-side (isExisting) PDFs
    const existingOnly = (currentFormData?.pdfs || []).filter(
      (p) => p?.isExisting === true,
    );

    if (!existingOnly.length) {
      initializedRef.current = true;
      return;
    }

    replace(existingOnly.map(normalizeExistingPdf));
    initializedRef.current = true;
  }, [currentFormData?.pdfs, replace, fields.length]);

  // Append only truly new uploaded PDFs - survive remounts by checking
  // existing fields by pdfFileName (works even when file is {} after remount)
  useEffect(() => {
    if (!uploadedPdfs.length) return;

    // Dedup by pdfFileName - always present, survives remount
    const existingFileNames = new Set(
      fields.map((f) => f?.pdfFileName).filter(Boolean),
    );

    const newItems = uploadedPdfs
      .filter((item) => item?.file instanceof File)
      .filter((item) => {
        const key = `${item.file.name}-${item.file.size}-${item.file.lastModified}`;
        const fileName = item.file.name;
        // Skip if already in fields (prevents duplicate on remount)
        if (existingFileNames.has(fileName)) return false;
        // Skip via processedRef (prevents double-append in same mount)
        if (processedUploadKeysRef.current.has(key)) return false;
        processedUploadKeysRef.current.add(key);
        return true;
      })
      .map(normalizeNewPdf);

    if (!newItems.length) return;

    append(newItems);

    const nextIndex = fields.length + newItems.length - 1;
    setActiveKey(String(nextIndex));
  }, [uploadedPdfs, append, fields]);

  // Sync pdfs to parent
  useEffect(() => {
    onChange({ pdfs: watchedPdfs });
  }, [watchedPdfs, onChange]);

  // Sync other non-pdf fields to parent
  useEffect(() => {
    const [
      company,
      pdfTitle,
      description,
      website,
      btnTxt,
      pdfBanner,
      selectedTemplate,
    ] = watchedFields || [];

    onChange({
      company,
      pdfTitle,
      description,
      website,
      btnTxt,
      pdfBanner,
      selectedTemplate,
    });
  }, [watchedFields, onChange]);

  const handleRemove = (index) => {
    remove(index);

    if (activeKey === String(index)) {
      setActiveKey(null);
    } else if (activeKey && Number(activeKey) > index) {
      setActiveKey(String(Number(activeKey) - 1));
    }
  };

  const panelItems = useMemo(() => {
    return fields.map((item, index) => {
      const pdf = watchedPdfs?.[index] || {};
      const header =
        pdf?.name?.trim() || pdf?.pdfFileName || `PDF ${index + 1}`;

      return { item, index, header };
    });
  }, [fields, watchedPdfs]);

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      <InputField
        control={control}
        errors={errors}
        name="pdf"
        label="Upload PDF"
        type="uploadFiles"
        accept=".pdf"
        maxFiles={5}
      />

      {watchedFields?.[6] !== 0 && panelItems.length > 0 && (
        <Collapse
          accordion
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key || null)}
          bordered={false}
        >
          {panelItems.map(({ item, index, header }) => (
            <Panel
              key={String(index)}
              header={header}
              extra={
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="text-red-500 border border-red-500 p-1 rounded-full"
                >
                  <FiTrash2 />
                </button>
              }
            >
              <div className="space-y-3">
                <ImageField
                  control={control}
                  errors={errors}
                  name={`pdfs.${index}.image`}
                  label="Preview Image"
                  maxFiles={1}
                />

                <InputField
                  control={control}
                  errors={errors}
                  name={`pdfs.${index}.name`}
                  label="Name"
                  type="text"
                />

                <InputField
                  control={control}
                  errors={errors}
                  name={`pdfs.${index}.description`}
                  label="Description"
                  type="desc"
                />
              </div>
            </Panel>
          ))}
        </Collapse>
      )}

      <div className="bg-gray-50 p-3 space-y-3">
        {watchedFields?.[6] !== 0 && watchedFields?.[6] !== 2 && (
          <ImageField
            control={control}
            errors={errors}
            name="pdfBanner"
            label="Upload Top Image"
            maxFiles={1}
          />
        )}

        <InputField
          control={control}
          errors={errors}
          name="company"
          label="Company"
          type="text"
        />

        <InputField
          control={control}
          errors={errors}
          name="pdfTitle"
          label="PDF Title"
          type="text"
        />

        <InputField
          control={control}
          errors={errors}
          name="description"
          label="Description"
          type="desc"
        />

        <InputField
          control={control}
          errors={errors}
          name="website"
          label="Website"
          type="text"
        />

        {watchedFields?.[6] === 0 && (
          <InputField
            control={control}
            errors={errors}
            name="btnTxt"
            label="Button"
            type="text"
          />
        )}
      </div>
    </div>
  );
};

export default OfferInfo;

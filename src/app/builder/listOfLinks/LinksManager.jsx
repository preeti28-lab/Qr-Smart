import React, { useState, useRef, useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import {
  FaLink,
  FaMinus,
  FaTrash,
  FaPlus,
  FaChevronDown,
} from "react-icons/fa";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";

const AccordionBody = ({ isOpen, children }) => {
  const innerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (!innerRef.current) return;
    setMaxHeight(isOpen ? `${innerRef.current.scrollHeight}px` : "0px");
  }, [isOpen, children]);

  return (
    <div
      style={{
        maxHeight,
        overflow: "hidden",
        transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div ref={innerRef}>
        <div className="p-4 space-y-3">{children}</div>
      </div>
    </div>
  );
};

const LinkSeparatorManager = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
}) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "items",
  });


  console.log(fields)

  const watchedItems = useWatch({
    control,
    name: "items",
    defaultValue: [],
  });

  const [openIndex, setOpenIndex] = useState(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const links = currentFormData?.links || [];

    const mappedItems = links.map((item) => ({
      type: item?.type || "link",
      text: item?.text || "",
      url: item?.type === "link" ? item?.url || "" : "",
      image: item?.imageUrl
        ? [
            {
              imageUrl: item.imageUrl,
              imageFileName: item.imageFileName,
              isExisting: true,
            },
          ]
        : [],
    }));

    replace(mappedItems);
    if (mappedItems.length > 0) {
      setOpenIndex(0);
    }

    initializedRef.current = true;
  }, [currentFormData, replace]);

  useEffect(() => {
    if (!initializedRef.current) return;

    const safeItems = watchedItems || [];

    const links = safeItems.map((item) => {
      const firstImage = item?.image?.[0];

      return {
        type: item?.type || "link",
        text: item?.text || "",
        url: item?.type === "link" ? item?.url || "" : "",
        imageUrl: firstImage?.preview || firstImage?.imageUrl || "",
        imageFileName: firstImage?.imageFileName || "",
        image: item?.image || [],
      };
    });

    onChange({
      items: safeItems,
      links,
    });
  }, [watchedItems, onChange]);

  const handleAddLink = () => {
    append({
      type: "link",
      text: "",
      url: "",
      image: [],
    });
    setOpenIndex(fields.length);
  };

  const handleAddSeparator = () => {
    append({
      type: "separator",
      text: "",
      url: "",
      image: [],
    });
    setOpenIndex(fields.length);
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      {fields.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
          <FaPlus className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Add a link or separator to get started</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => {
          const itemType = watchedItems?.[index]?.type || field?.type;
          const isOpen = openIndex === index;

          return (
            <div
              key={field.id}
              className={`relative rounded-md bg-gray-50 border shadow-sm transition-colors duration-200 ${
                itemType === "link" ? "border-blue-100" : "border-amber-200"
              }`}
            >
              <div
                className={`flex items-center justify-between px-4 py-2.5 cursor-pointer select-none transition-colors duration-200 ${
                  isOpen ? "rounded-t-md" : "rounded-md"
                } ${
                  itemType === "link"
                    ? "bg-blue-50/50 hover:bg-blue-50"
                    : "bg-amber-100/50 hover:bg-amber-100"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center gap-2">
                  {itemType === "link" ? (
                    <>
                      <FaLink className="text-blue-600" />
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                        Link
                      </span>
                    </>
                  ) : (
                    <>
                      <FaMinus className="text-amber-700" />
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                        Separator
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-300 ease-in-out ${
                      itemType === "link" ? "text-blue-400" : "text-amber-500"
                    } ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);

                      setOpenIndex((prev) => {
                        if (prev === index) return null;
                        if (prev > index) return prev - 1;
                        return prev;
                      });
                    }}
                    className="w-6 h-6 flex items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition-all"
                    aria-label="Remove item"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <AccordionBody isOpen={isOpen}>
                {itemType === "link" ? (
                  <>
                    <ImageField
                      control={control}
                      errors={errors}
                      name={`items.${index}.image`}
                      label="Upload Image"
                      maxFiles={1}
                    />

                    <div className="flex gap-2">
                      <InputField
                        control={control}
                        errors={errors}
                        name={`items.${index}.text`}
                        label="Link Text"
                        type="text"
                      />
                      <InputField
                        control={control}
                        errors={errors}
                        name={`items.${index}.url`}
                        label="URL"
                        type="text"
                      />
                    </div>
                  </>
                ) : (
                  <InputField
                    control={control}
                    errors={errors}
                    name={`items.${index}.text`}
                    label="Separator Text"
                    type="text"
                  />
                )}
              </AccordionBody>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={handleAddLink}
          className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
        >
          <FaLink className="w-4 h-3" />
          Add Link
        </button>

        <button
          type="button"
          onClick={handleAddSeparator}
          className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
        >
          <FaMinus className="w-4 h-3" />
          Add Separator
        </button>
      </div>
    </div>
  );
};

export default LinkSeparatorManager;
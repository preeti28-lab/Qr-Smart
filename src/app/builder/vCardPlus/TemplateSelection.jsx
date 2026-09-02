import React, { useState, useEffect } from "react";

const TemplateSelector = ({ templates, onSelect = () => {}, selectedTemplateId }) => {
  const [selected, setSelected] = useState(
    selectedTemplateId !== undefined ? selectedTemplateId : templates?.[0]?.id ?? 0
  );

  useEffect(() => {
    if (selectedTemplateId !== undefined) {
      setSelected(selectedTemplateId);
    }
  }, [selectedTemplateId]);

  const handleSelect = (id) => {
    setSelected(id);
    onSelect(id);
  };

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex gap-4 px-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`flex-shrink-0 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              selected === template.id
                ? "border-blue-500 scale-105 shadow-lg"
                : "border-gray-200 hover:scale-105 hover:border-blue-300"
            }`}
            onClick={() => handleSelect(template.id)}
          >
            <img
              src={template.src}
              alt={`Template ${template.id}`}
              className="w-[120px] object-cover rounded-lg p-2 min-h-[180px] max-h-[180px]"
            />
            <p className="text-xs text-center pb-2">{template?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
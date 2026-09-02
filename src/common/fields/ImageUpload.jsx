import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ImageUpload = ({
  control,
  name,
  label = "",
  errors,
  defaultValue = null,
  parentClass = "",
  labelClass = "",
  disabled = false,
  multiple = false,
}) => {
  const [fileList, setFileList] = useState(
    defaultValue
      ? multiple
        ? defaultValue.map((url, index) => ({
            uid: `${index}`,
            name: `image-${index}.png`,
            status: "done",
            thumbUrl: url,
          }))
        : [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              thumbUrl: defaultValue,
            },
          ]
      : [],
  );

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${parentClass}`}>
      {label && (
        <label className={`font-medium text-black ${labelClass}`}>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <Upload
            listType="picture-card"
            fileList={fileList}
            disabled={disabled}
            multiple={multiple}
            beforeUpload={beforeUpload}
            accept="image/*"
            maxCount={multiple ? undefined : 1}
            showUploadList={{
              showPreviewIcon: false,
              showRemoveIcon: true,
            }}
            onPreview={() => {}}
            onChange={({ fileList: newFileList }) => {
              const sanitized = newFileList.map((file) => ({
                ...file,
                url: undefined,
                thumbUrl: file.originFileObj
                  ? URL.createObjectURL(file.originFileObj)
                  : file.thumbUrl,
              }));
              setFileList(sanitized);

              if (multiple) {
                const files = newFileList.map((f) => f.originFileObj);
                onChange(files);
              } else {
                onChange(newFileList[0]?.originFileObj || null);
              }
            }}
          >
            {(multiple || fileList.length < 1) && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  {multiple ? "Upload Images" : "Upload"}
                </div>
              </div>
            )}
          </Upload>
        )}
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default ImageUpload;
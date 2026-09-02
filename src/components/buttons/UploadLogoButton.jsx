// PATH: src/components/buttons/UploadLogoButton.jsx
import React, { useRef } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";

const UploadLogoButton = ({ onChange = () => {} }) => {
  const inputRef = useRef();

  const uploadImage = (e) => {
    let files = e.target.files;
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      let url = URL.createObjectURL(files[i]);
      urls.push(url);
    }
    onChange(urls);
    inputRef.current.value = "";
  };

  return (
    <button
      type="button"
      className="group w-[96px] h-[96px] rounded-xl border-2 border-dashed border-slate-300
        bg-slate-50/60 hover:border-blue-500 hover:bg-blue-50/60 transition-all duration-200
        flex flex-col justify-center items-center gap-1 cursor-pointer text-slate-400 hover:text-blue-600
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      onClick={() => inputRef.current.click()}
    >
      <MdAddPhotoAlternate size={24} />
      <span className="text-[11px] font-semibold leading-tight text-slate-500 group-hover:text-blue-600">
        Upload
      </span>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept="image/*"
        onChange={uploadImage}
      />
    </button>
  );
};

export default UploadLogoButton;
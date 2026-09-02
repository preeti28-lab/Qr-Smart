import React, { useState } from "react";
import AppViewer from "../layouts/AppViewer";
import { useForm } from "react-hook-form";
import MyButton from "../components/buttons/MyButton";
import { useDispatch } from "react-redux";
import { generateQuery } from "../redux/features/qrcodes";

const Query = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      subject: "",
      reason: "",
      query: "",
      file: null,
    },
  });

  const [fileName, setFileName] = useState("");

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("subject", data.subject);
    formData.append("reason", data.reason);
    formData.append("query", data.query);

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    // console.log("Query Submitted:", data);
    dispatch(generateQuery(formData))

    // 👉 Example API call
    // axios.post("/your-api-endpoint", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    reset();
    setFileName("");
  };

  return (
    <AppViewer>
      <div className="py-4 px-6">
        <h2 className="font-semibold text-[22px]">Write us your query</h2>

        <div className="flex w-full my-3 justify-between items-center">
          <p className="font-semibold text-slate-600 text-[15px] md:text-[17px]">
            Send your questions, comments or suggestions through this form and
            we will respond as soon as possible.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white rounded-md shadow-cover p-5 flex flex-col gap-y-5"
        >
          {/* Subject */}
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Subject
            </label>
            <input
              type="text"
              {...register("subject", { required: true })}
              placeholder="Enter subject"
              className="outline-none rounded-md border px-4 py-2 text-[14px] text-slate-800 border-gray-400 focus:border-blue-700 transition-all duration-300"
            />
          </div>

          {/* Reason */}
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Reason
            </label>
            <input
              type="text"
              {...register("reason", { required: true })}
              placeholder="Enter reason"
              className="outline-none rounded-md border px-4 py-2 text-[14px] text-slate-800 border-gray-400 focus:border-blue-700 transition-all duration-300"
            />
          </div>

          {/* Query */}
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Query
            </label>
            <textarea
              rows={5}
              {...register("query", { required: true })}
              placeholder="Write your query..."
              className="outline-none rounded-md border px-4 py-2 text-[14px] text-slate-800 border-gray-400 focus:border-blue-700 transition-all duration-300 resize-none"
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Attach File (optional)
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.png,.doc,.docx"
              {...register("file")}
              onChange={(e) => {
                setFileName(e.target.files[0]?.name || "");
              }}
              className="text-[14px] text-slate-800"
            />

            {fileName && (
              <p className="text-sm text-gray-500">Selected: {fileName}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <MyButton
              type="submit"
              className="px-8 bg-blue-700 rounded-full text-white text-[16px]"
            >
              Submit
            </MyButton>
          </div>
        </form>
      </div>
    </AppViewer>
  );
};

export default Query;

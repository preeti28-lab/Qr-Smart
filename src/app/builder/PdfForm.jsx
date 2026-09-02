import React from "react";
import InputField from "../../common/fields/InputField";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import MyButton from "../../components/buttons/MyButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import usePath from "../../hooks/usePath";
import { setLastPage, setUploadedPdf } from "../../redux/features/dashboard";

const PdfForm = ({ nextPath }) => {
  const dispatch = useDispatch();
  const path = usePath();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setUploadedPdf(data)); // Dispatch to store
    dispatch(setLastPage("content"));
    path.changeEndPoint(nextPath)
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <InputField
          control={control}
          errors={errors}
          name="files"
          label="Upload Files"
          type="file"
        />
        <div className="flex gap-3 justify-center w-full mt-5">
          <MyButton
            className="text-slate-700 border border-slate-700 flex justify-center items-center gap-x-2 py-2 rounded-full bg-white font-semibold"
            onClick={() => path.back()}
          >
            <FaArrowLeft size={14} />
            <span>Back</span>
          </MyButton>
          <MyButton
            className="text-slate-50 border border-blue-700 hover:bg-blue-800 transition-all flex justify-center items-center gap-x-2 py-2 rounded-full bg-blue-700 font-semibold"
            type="submit"
          >
            <span>Next</span>
            <FaArrowRight size={14} />
          </MyButton>
        </div>
      </form>
    </div>
  );
};

export default PdfForm;

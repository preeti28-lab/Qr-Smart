import React, { useEffect } from "react";
import InputField from "../../common/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MyButton from "../../components/buttons/MyButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import usePath from "../../hooks/usePath";
import {
  setDummyTextForQr,
  setLastPage,
  setTextForQR,
} from "../../redux/features/dashboard";

const TextForm = ({ nextPath }) => {
  const dispatch = useDispatch();
  const path = usePath();

  const {textForQR} = useSelector( (state) => state.dashboard )

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setTextForQR(data.text)); // Dispatch to store
    dispatch(setLastPage("content"));
    path.changeEndPoint(nextPath);
  };
  // const handleInputChange = (e) => {
  //   console.log(e.target.value);
  // };
  const enteredText = watch("text");
  useEffect(() => {
    dispatch(setDummyTextForQr(enteredText));
  }, [enteredText]);
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <InputField
          type="desc"
          name="text"
          errors={errors}
          control={control}
          placeholder="Text"
          defaultValue={textForQR}
          
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

export default TextForm;

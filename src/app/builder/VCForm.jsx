import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../common/fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setDummyVCDetails,
  setLastPage,
  setVCardDetails,
} from "../../redux/features/dashboard";
import usePath from "../../hooks/usePath";
import MyButton from "../../components/buttons/MyButton";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters are allowed"),
  // phone: yup
  //   .string()
  //   .required("Phone number is required")
  //   .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  website: yup
    .string()
    .matches(/^(https?:\/\/)/, "Url must start with http:// or https://")
    .url("Enter a valid URL (e.g., https://example.com)"),
});

const VCForm = ({ nextPath }) => {
  const dispatch = useDispatch();
  const path = usePath();

  const {vCardDetails} = useSelector( (state) => state.dashboard )

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema), // ✅ Apply validation
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setVCardDetails(data)); // Dispatch to store
    dispatch(setLastPage("content"));
    path.changeEndPoint(nextPath);
  };

  // Watch all form fields
  const watchedFields = watch();

  // ✅ Fix: Prevent infinite loop by stringifying watchedFields
  useEffect(() => {
    dispatch(setDummyVCDetails(watchedFields));
  }, [JSON.stringify(watchedFields), dispatch]);

  return (
    <>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <InputField
              type="text"
              name="firstName"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.firstName}
              placeholder="First Name"
            />
            <InputField
              type="text"
              name="lastName"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.lastName}
              placeholder="Last Name"
            />
            <InputField
              type="text"
              name="phone"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.phone}
              placeholder="Phone"
            />
            <InputField
              type="email"
              name="email"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.email}
              placeholder="Email"
            />

            <InputField
              type="text"
              name="website"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.website}
              placeholder="Website"
            />
            <InputField
              type="text"
              name="company"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.company}
              placeholder="Company"
            />
            <InputField
              type="text"
              name="jobTitle"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.jobTitle}
              placeholder="Job Title"
            />
            <InputField
              type="desc"
              name="address"
              errors={errors}
              control={control}
              defaultValue={vCardDetails?.address}
              placeholder="Address"
            />
          </div>
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
    </>
  );
};

export default VCForm;

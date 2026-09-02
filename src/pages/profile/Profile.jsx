import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/features/qrcodes";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userData);

  const [isEditable, setIsEditable] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      mobile: "",
      newPassword: "",
    },
  });

  // Set default values from userData
  useEffect(() => {
    if (userData) {
      reset({
        name: userData?.contactInformation?.name || "",
        surname: userData?.contactInformation?.surname || "",
        email: userData?.email || "",
        mobile: userData?.contactInformation?.mobile || "",
        newPassword: "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      mobile: data.mobile,
      id: userData?.id,
    };

    dispatch(updateProfile(payload));
  };

  return (
    <div className="rounded-md bg-white py-3 px-5 flex flex-col justify-start items-start gap-y-4 shadow-cover w-full">
      <div className="flex justify-between w-full">
        <h2 className="font-semibold text-[18px]">Contact information</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full grid lg:grid-cols-2 gap-y-6 gap-x-4 ">
          {/* Name */}
          <div className="flex flex-col justify-start w-full items-start gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="outline-none rounded-md border text-[14px] px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 py-1.5 w-full"
              placeholder="E.g Marry"
              disabled={!isEditable}
            />
          </div>

          {/* Surname */}
          <div className="flex flex-col justify-start w-full items-start gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Surname
            </label>
            <input
              type="text"
              {...register("surname")}
              className="outline-none rounded-md border text-[14px] px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 py-1.5 w-full"
              placeholder="E.g Smith"
              disabled={!isEditable}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col justify-start w-full items-start gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              className="outline-none rounded-md border text-[14px] px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 py-1.5 w-full"
              placeholder="E.g admin@gmail.com"
              disabled={!isEditable}
            />
          </div>

          {/* Mobile */}
          <div className="flex flex-col justify-start w-full items-start gap-y-1">
            <label className="font-semibold text-gray-700 text-[14px]">
              Mobile
            </label>
            <input
              type="text"
              {...register("mobile")}
              className="outline-none rounded-md border text-[14px] px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 py-1.5 w-full"
              placeholder="E.g 992xxxxxx0"
              disabled={!isEditable}
            />
          </div>

          {/* Password */}
          {showPass && (
            <div className="flex flex-col justify-start w-full items-start gap-y-1">
              <label className="font-semibold text-gray-700 text-[14px]">
                Password
              </label>
              <input
                type="password"
                {...register("newPassword")}
                className="outline-none border-2 px-4 text-slate-800 placeholder:text-gray-700 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-solid border-gray-400 py-1.5 w-full"
                disabled={!isEditable}
              />
            </div>
          )}
        </div>

        <div className="my-2 w-full flex justify-end items-center gap-2 mt-5">
          <MyButton
            type="button"
            className="px-8 bg-blue-700 rounded-full text-white text-[16px]"
            onClick={() => setIsEditable(!isEditable)}
          >
            {!isEditable ? "Edit" : "Cancel"}
          </MyButton>

          {isEditable && (
            <MyButton
              type="submit"
              className="px-8 bg-blue-700 rounded-full text-white text-[16px]"
            >
              Save
            </MyButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;

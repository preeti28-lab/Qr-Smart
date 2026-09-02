import React, { useState } from "react";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../redux/features/qrcodes";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import handleLogout from "../../constants/handleLogout";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      id: userData?.id,
      newPassword: data.password,
    };

    try {
      setLoading(true);

      const result = await dispatch(resetPassword(payload));

      if (result?.success) {
        setTimeout(() => {
          handleLogout();
        }, 6000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-md bg-white py-3 px-5 flex flex-col gap-y-4 shadow-cover w-full">
      <h2 className="font-semibold text-[18px]">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full grid grid-cols-2">
          <div className="flex flex-col gap-y-1 w-full">
            <label className="font-semibold text-gray-700 text-[14px]">
              New Password
            </label>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                disabled={loading}
                className="outline-none rounded-md border text-[14px] px-4 pr-10 text-slate-800 hover:border-slate-700 focus:border-blue-700 transition-all duration-300 font-medium border-gray-400 py-1.5 w-full disabled:opacity-50"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-blue-600"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>
        </div>

        <div className="my-2 w-full flex justify-end mt-5">
          <MyButton
            type="submit"
            disabled={loading}
            className="px-8 bg-blue-700 rounded-full text-white text-[16px] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </MyButton>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

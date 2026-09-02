import React from "react";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../../redux/features/qrcodes";
import Swal from "sweetalert2";
import handleLogout from "../../constants/handleLogout";

const AccountStatus = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your account and all data.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await dispatch(deleteAccount(userData?.id));

      if (res?.success) {
        // ✅ Success alert with timer + progress bar

        setTimeout(() => {
          handleLogout();
        }, 4000);
      }
    }
  };

  return (
    <div className="rounded-md bg-white py-4 px-5 flex flex-col gap-y-4 shadow-cover w-full">
      <h2 className="font-semibold text-[18px] text-red-600">Account Status</h2>

      <p className="text-gray-700 text-[14px]">
        Delete my account and all the information it contains.
      </p>

      <div className="w-full flex justify-end">
        <MyButton
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-full text-white text-[14px]"
        >
          Delete Account
        </MyButton>
      </div>
    </div>
  );
};

export default AccountStatus;

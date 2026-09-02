import React, { useEffect } from "react";
import AppViewer from "../../layouts/AppViewer";
import Profile from "./Profile";
import ResetPassword from "./ResetPassword";
import AccountStatus from "./AccountStatus";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/features/qrcodes";

const UserProfile = () => {
  return (
    <AppViewer>
      <div className="p-5">
        <div className="pb-3  flex flex-col justify-start items-start gap-y-5">
          <h2 className="font-semibold text-[22px]">Profile</h2>
        </div>
        <div className="flex flex-col gap-10 ">
          <Profile />
          <ResetPassword />
          <AccountStatus />
        </div>
      </div>
    </AppViewer>
  );
};

export default UserProfile;

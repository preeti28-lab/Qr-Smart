import React from "react";
import HoverButton from "../../../../components/buttons/HoverButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQrType } from "../../../../redux/features/dashboard";

const NotAvailableQR = ({ title, content, builderType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("qrmsart");

  const handleClick = () => {
    if (!token) {
      navigate("/register");
      return;
    }

    if (builderType) {
      // Pre-select the type in Redux (same mechanism QRButton uses on the
      // dashboard picker) and jump straight into that type's builder form,
      // instead of dropping the user back on the generic type-picker.
      dispatch(setQrType({ type: builderType }));
      navigate("/builder/content");
    } else {
      // No matching builder exists yet for this type — fall back to the
      // generic picker rather than sending the user somewhere broken.
      navigate("/builder");
    }
  };

  return (
    <div className="flex flex-col  justify-center p-4 gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-base w-[70%]">{content}</p>
      <HoverButton onClick={handleClick}>
        {token ? "Try Now" : "Register Now"}
      </HoverButton>
    </div>
  );
};

export default NotAvailableQR;
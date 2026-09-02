import React from "react";
import MyButton from "../buttons/MyButton";
import usePath from "../../hooks/usePath";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BestPriceCard = ({
  months = "",
  price = "",
  cancelPrice = "",
  desc = "",
  insideAdminPanel = false,
}) => {
  const path = usePath();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (insideAdminPanel === false && !token) {
      navigate("/login", { state: { monthSelected: months } });
    } else {
      navigate("/checkout", { state: { selectedMonth: months } });
    }
  };

  return (
    <div className="border-2 border-solid border-blue-600 relative flex flex-col shadow-[0px_8px_24px_-6px_rgba(37,99,235,0.28)] justify-between items-center bg-white w-[260px] h-[330px] rounded-2xl p-5 pt-8">
      <div className="bg-blue-600 px-4 py-1.5 absolute -top-4 rounded-full text-white shadow-md shadow-blue-600/30">
        <h2 className="text-[11px] font-semibold whitespace-nowrap">
          Best Value · Save 51%
        </h2>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-full px-3 py-1 mt-2">
        <h2 className="text-blue-700 font-semibold text-[12px] uppercase tracking-wide">
          {months} Months
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-0.5">
        <h3 className="font-medium text-slate-400 text-[15px] line-through">
          {cancelPrice}
        </h3>
        <div className="flex justify-center items-baseline gap-x-1">
          <h3 className="font-bold text-slate-900 text-[26px]">{price}</h3>
          <p className="text-[14px] font-medium text-slate-500">/month</p>
        </div>
        <p className="text-blue-600 font-medium text-[13px] mt-1 text-center">
          {desc}
        </p>
      </div>

      <MyButton
        className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-full text-[14px] py-2.5 px-8 w-full shadow-sm shadow-blue-600/20"
        onClick={handleClick}
      >
        Buy Now
      </MyButton>
    </div>
  );
};

export default BestPriceCard;
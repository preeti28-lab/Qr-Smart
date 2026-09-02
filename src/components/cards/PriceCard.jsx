import React from "react";
import MyButton from "../buttons/MyButton";
import usePath from "../../hooks/usePath";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PriceCard = ({
  months = "",
  price = "",
  desc = "",
  cancelPrice,
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
    <div className="border border-solid border-slate-200 flex flex-col shadow-[0px_2px_10px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0px_4px_16px_-2px_rgba(0,0,0,0.1)] transition-shadow justify-between items-center bg-white w-[250px] h-[290px] rounded-2xl p-5">
      <div className="bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
        <h2 className="text-slate-600 font-semibold text-[12px] uppercase tracking-wide">
          {months} Months
        </h2>
      </div>

      <div className="flex flex-col justify-center items-center gap-y-0.5">
        <h3 className="font-medium text-slate-400 text-[15px] line-through">
          {cancelPrice}
        </h3>
        <div className="flex items-baseline justify-center gap-x-1">
          <h3 className="font-bold text-slate-900 text-[26px]">{price}</h3>
          <p className="text-[14px] font-medium text-slate-500">/month</p>
        </div>
        <p className="text-slate-500 font-medium text-[13px] mt-1 text-center">
          {desc}
        </p>
      </div>

      <MyButton
        className="bg-white text-blue-600 font-semibold rounded-full text-[14px] py-2.5 px-8 border border-solid border-slate-300 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors w-full"
        onClick={handleClick}
      >
        Buy
      </MyButton>
    </div>
  );
};

export default PriceCard;
import React from "react";
import MyButton from "../../components/buttons/MyButton";
import usePath from "../../hooks/usePath";
import { useDispatch } from "react-redux";
import { setQrType } from "../../redux/features/dashboard";

const QRButton = ({
  icon,
  text = "",
  desc = "",
  to = "",
  onHover = () => {},
  type,
}) => {
  const path = usePath();
  const dispatch = useDispatch();

  return (
    <>
      <MyButton
        className="rounded-md bg-transparent flex border border-slate-200 hover:border-blue-700 transition-all py-2 px-3 justify-start items-center gap-x-6"
        onClick={() => {
          path.push(to && to !== "" ? to : "content");
          // path.changeEndPoint("content");
          dispatch(setQrType({ type }));
        }}
        onMouseEnter={() => onHover(text)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="py-2 px-4 rounded-md border border-slate-200 bg-slate-50 text-blue-700">
          {icon}
        </div>
        <div className="flex justify-start items-start flex-col gap-y-1">
          <span className="text-slate-800 text-[15px] font-semibold">
            {text}
          </span>
          <p className="text-slate-700">{desc}</p>
        </div>
      </MyButton>
    </>
  );
};

export default QRButton;

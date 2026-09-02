// PATH: src/components/ui/QRFrames.jsx
import React from "react";
import { MdOutlineBlock, MdCheck } from "react-icons/md";
import { frames } from "../../constants/frames";

const QRFrames = ({
  selectedFrame,
  setSelectedFrame,
  frameData,
  showGrid = false,
}) => {
  const tileClass = (active) =>
    `relative flex flex-col items-center justify-center gap-1.5 border-2 rounded-xl cursor-pointer
     transition-all duration-200 shrink-0 w-[96px] h-[104px] p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
       active
         ? "border-blue-600 bg-blue-50/60 shadow-[0_6px_18px_-12px_rgba(27,87,227,0.8)]"
         : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-[2px]"
     }`;

  const CheckBadge = () => (
    <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full p-0.5 leading-none z-10">
      <MdCheck size={11} />
    </span>
  );

  return (
    <div
      className={`w-full flex gap-3 ${
        showGrid
          ? "flex-wrap max-h-[340px] overflow-y-auto pr-1 pb-1"
          : "flex-nowrap overflow-x-auto pb-1"
      }`}
    >
      {/* "None" option to deselect frame */}
      <button
        type="button"
        className={tileClass(selectedFrame === "none")}
        onClick={() => setSelectedFrame("none")}
      >
        {selectedFrame === "none" && <CheckBadge />}
        <MdOutlineBlock
          size={26}
          className={selectedFrame === "none" ? "text-blue-600" : "text-slate-400"}
        />
        <span
          className={`text-[10.5px] font-semibold ${
            selectedFrame === "none" ? "text-blue-700" : "text-slate-500"
          }`}
        >
          None
        </span>
      </button>

      {frames && frames.length > 0 ? (
        frames.map((frame) => {
          const active = selectedFrame === frame.name;
          const aspect =
            frame.width && frame.height ? frame.width / frame.height : 0.6;
          return (
            <button
              type="button"
              key={frame.id}
              className={tileClass(active)}
              onClick={() => setSelectedFrame(frame.name)}
              title={frame.name}
            >
              {active && <CheckBadge />}
              <span className="flex-1 flex items-center justify-center w-full transition-transform duration-200 group-hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={frame.width}
                  height={frame.height}
                  viewBox={`0 0 ${frame.width} ${frame.height}`}
                  className="select-none"
                  style={{
                    height: aspect >= 1 ? "auto" : "64px",
                    width: aspect >= 1 ? "64px" : "auto",
                    maxHeight: "64px",
                    maxWidth: "64px",
                  }}
                >
                  {frame.rect &&
                    frame.rect.x !== undefined &&
                    frame.rect.y !== undefined && (
                      <rect
                        x={frame.rect.x}
                        y={frame.rect.y}
                        width={frame.rect.width}
                        height={frame.rect.height}
                        rx={frame.rect.rx}
                        ry={frame.rect.ry}
                        fill={frame.rect.fill}
                      />
                    )}

                  {frame.paths &&
                    frame.paths.length > 0 &&
                    frame.paths.map((path, idx) => (
                      <path key={idx} d={path} fill="black" />
                    ))}

                  {frame.text && (
                    <text
                      x={frame.text.x}
                      y={frame.text.y}
                      fill={frame.text.fill}
                      fontFamily="sans-serif"
                      fontSize={frame.text.fontSize}
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {frame.text.value}
                    </text>
                  )}
                </svg>
              </span>
            </button>
          );
        })
      ) : (
        <div className="text-slate-400 text-sm py-6">No frames available</div>
      )}
    </div>
  );
};

export default QRFrames;
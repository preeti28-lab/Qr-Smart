import React from "react";
import phoneFrame from "../../assets/phone-frame.png";

const FRAME_ASPECT_RATIO = 9 / 19.5;

const SCREEN_INSET = {
  top: "8.5%",
  left: "6.5%",
  right: "6.5%",
  bottom: "8%",
};

const DemoPreview = ({
  children,
  height = 680,
  className = "",
  screenClassName = "",
  backgroundColor = "#f1f7fc",
  statusBar = true,
  isScanPage = false, // ✅ NEW PROP
}) => {
  // 🔥 SCAN MODE → NO PHONE FRAME
  if (isScanPage) {
    return (
      <div
        className={`w-full min-h-screen flex items-center justify-center ${className}`}
        style={{
          backgroundColor, // full page background
        }}
      >
        {/* centered “screen” container */}
        <div
          className={`w-full max-w-md ${screenClassName}`}
          style={{
            backgroundColor: "#fff",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // 🔥 NORMAL MODE → PHONE FRAME
  const width = height * FRAME_ASPECT_RATIO;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width,
        height,
        flexShrink: 0,
      }}
    >
      {/* Screen */}
      <div
        style={{
          position: "absolute",
          top: SCREEN_INSET.top,
          left: SCREEN_INSET.left,
          right: SCREEN_INSET.right,
          bottom: SCREEN_INSET.bottom,
          borderRadius: "10%",
          overflow: "hidden",
          backgroundColor,
        }}
      >
        {/* Status bar */}
        {statusBar && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 16px 4px",
              fontSize: 10,
              fontWeight: 600,
              color: "#111",
              backgroundColor,
              letterSpacing: 0.3,
            }}
          >
            <span>9:41</span>
          </div>
        )}

        {/* Scrollable content */}
        <div
          className={screenClassName}
          style={{
            overflowY: "auto",
            height: statusBar ? "calc(100% - 26px)" : "100%",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>

      {/* Frame overlay */}
      <img
        src={phoneFrame}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 20,
          objectFit: "fill",
        }}
      />
    </div>
  );
};

export default DemoPreview;

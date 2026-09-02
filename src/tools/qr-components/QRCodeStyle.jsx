// PATH: src/tools/qr-components/QRCodeStyle.jsx
import React from "react";
import QRMenu from "../../components/menu/QRMenu";
import ColorField from "../../components/fields/ColorField";
import { MdCheck } from "react-icons/md";


/* ── Value normaliser ───────────────────────────────────────────────────────
   These props are hydrated from Redux / the templates API, so they don't always
   arrive as a plain string ("rounded"). Accept the common shapes instead of
   crashing on `.replace is not a function`.                                   */
const toStyleString = (value, fallback) => {
  if (typeof value === "string" && value.trim() !== "") return value;
  if (value && typeof value === "object") {
    const candidate =
      value.value ?? value.id ?? value.type ?? value.name ?? value.dotsStyle ??
      value.style ?? value.shape ?? value.label;
    if (typeof candidate === "string" && candidate.trim() !== "") return candidate;
  }
  return fallback;
};

/* Colours can arrive as { color: "#fff" } / { hex: "#fff" } from saved templates. */
const toColor = (value, fallback = "#000000") => {
  if (typeof value === "string" && value.trim() !== "") return value;
  if (value && typeof value === "object") {
    const candidate = value.color ?? value.hex ?? value.value;
    if (typeof candidate === "string" && candidate.trim() !== "") return candidate;
  }
  return fallback;
};

/* "classy-rounded" -> "classy rounded" (safe on any input) */
const pretty = (value) => String(value ?? "").replace(/-/g, " ");

/* ── Dot shape preview ──────────────────────────────────────────────────── */
const dotShape = (variant, key, x, y, size = 7, fill = "currentColor") => {
  const r = size / 2;
  switch (variant) {
    case "square":
      return <rect key={key} x={x} y={y} width={size} height={size} fill={fill} />;
    case "dots":
      return <circle key={key} cx={x + r} cy={y + r} r={r} fill={fill} />;
    case "rounded":
      return <rect key={key} x={x} y={y} width={size} height={size} rx={size * 0.28} fill={fill} />;
    case "extra-rounded":
      return <rect key={key} x={x} y={y} width={size} height={size} rx={r} fill={fill} />;
    case "classy":
      return (
        <rect key={key} x={x} y={y} width={size} height={size} rx="0"
          transform={`rotate(45 ${x + r} ${y + r})`} fill={fill} />
      );
    case "classy-rounded":
    default:
      return (
        <rect key={key} x={x} y={y} width={size} height={size} rx={size * 0.36}
          transform={`rotate(45 ${x + r} ${y + r})`} fill={fill} />
      );
  }
};

const DotsPreview = ({ variant }) => {
  const positions = [
    [0, 0], [9, 0], [18, 0],
    [0, 9], [18, 9],
    [0, 18], [9, 18], [18, 18],
  ];
  return (
    <svg viewBox="-2 -2 29 29" width="32" height="32" className="shrink-0">
      {positions.map(([x, y], i) => dotShape(variant, i, x, y))}
    </svg>
  );
};

const CornerPreview = ({ corner, center }) => {
  const cornerRadius = { dot: 10, square: 0, "extra-rounded": 4 }[corner] ?? 0;
  const centerRadius = { dot: 10, square: 0 }[center] ?? 0;
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" className="shrink-0">
      <rect x="1" y="1" width="30" height="30" rx={cornerRadius} fill="none"
        stroke="currentColor" strokeWidth="4" />
      <rect x="11" y="11" width="10" height="10" rx={centerRadius} fill="currentColor" />
    </svg>
  );
};

/* ── Combined live preview ───────────────────────────────────────────────────
   Shows the shapes AND the four colours together, so people see the actual
   combination they are building instead of four disconnected pickers.        */
const MiniQRPreview = ({ codeStyle, corner, center, dotColor, cornerColor, centerColor, bg }) => {
  const CELL = 9;
  const OFF = 4;
  // deterministic body pattern (never re-shuffles)
  const body = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const inFinder =
        (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
      if (inFinder) continue;
      if ((r * 7 + c * 3 + r * c) % 3 !== 0) continue;
      body.push([c * CELL + OFF, r * CELL + OFF]);
    }
  }

  const cornerRx = { dot: 11, square: 0, "extra-rounded": 6 }[corner] ?? 0;
  const centerRx = { dot: 7, square: 0 }[center] ?? 0;

  const Finder = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="27" height="27" rx={cornerRx} fill="none"
        stroke={cornerColor} strokeWidth="5" />
      <rect x="9" y="9" width="9" height="9" rx={centerRx} fill={centerColor} />
    </g>
  );

  return (
    <div className="rounded-xl border border-slate-200 p-2.5 shrink-0" style={{ backgroundColor: bg }}>
      <svg viewBox="0 0 89 89" width="86" height="86">
        <Finder x={4} y={4} />
        <Finder x={58} y={4} />
        <Finder x={4} y={58} />
        {body.map(([x, y], i) => dotShape(codeStyle, i, x, y, 7, dotColor))}
      </svg>
    </div>
  );
};

const QRCodeStyle = ({
  isCodeStyle,
  isCorner,
  isCenterStyle,
  isCodeStyleBorderColor = "#000000",
  isCodeStyleDotColor = "#000000",
  isCodeStyleCenterColor = "#000000",
  isCodeStyleBackgroundColor = "#000000",
  setIsCodeStyle = () => {},
  setIsCorner = () => {},
  setIsCenterStyle = () => {},
  setIsCodeStyleBorderColor = () => {},
  setIsCodeStyleDotColor = () => {},
  setIsCodeStyleCenterColor = () => {},
  setIsCodeStyleBackgroundColor = () => {},
  style = "accordion",
}) => {
  const activeCodeStyle = toStyleString(isCodeStyle, "rounded");
  const activeCorner = toStyleString(isCorner, "extra-rounded");
  const activeCenterStyle = toStyleString(isCenterStyle, "dot");

  const dotColor = toColor(isCodeStyleDotColor);
  const cornerColor = toColor(isCodeStyleBorderColor);
  const centerColor = toColor(isCodeStyleCenterColor);
  const bgColor = toColor(isCodeStyleBackgroundColor, "#ffffff");

  const Eyebrow = ({ children, hint }) => (
    <div className="flex items-baseline gap-x-2.5">
      <h3 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em]">
        {children}
      </h3>
      {hint ? (
        <span className="text-[12px] font-medium text-slate-400">{hint}</span>
      ) : null}
    </div>
  );

  const PreviewOption = ({ label, active, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1.5 border-2 rounded-xl cursor-pointer
        transition-all duration-200 py-3 px-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
        ${active
          ? "border-blue-600 bg-blue-50/60 text-blue-700"
          : "border-slate-200 text-slate-600 bg-white hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-[1px]"}`}
    >
      {active && (
        <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full p-0.5 leading-none">
          <MdCheck size={11} />
        </span>
      )}
      <span className={active ? "text-blue-600" : "text-slate-500"}>{children}</span>
      <span className="text-[11.5px] font-semibold leading-tight">{label}</span>
    </button>
  );

  const codeStyleOptions = [
    { value: "classy", label: "Classy" },
    { value: "classy-rounded", label: "Classy rounded" },
    { value: "dots", label: "Dots" },
    { value: "extra-rounded", label: "Extra rounded" },
    { value: "rounded", label: "Rounded" },
    { value: "square", label: "Square" },
  ];

  const cornerOptions = [
    { value: "dot", label: "Dot" },
    { value: "extra-rounded", label: "Extra rounded" },
    { value: "square", label: "Square" },
  ];

  const centerOptions = [
    { value: "dot", label: "Dot" },
    { value: "square", label: "Square" },
  ];

  const content = (
    <div className="flex flex-col justify-start items-start w-full gap-y-6">
      {/* ── Live combination strip ── */}
      <div className="w-full flex items-center gap-x-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
        <MiniQRPreview
          codeStyle={activeCodeStyle}
          corner={activeCorner}
          center={activeCenterStyle}
          dotColor={dotColor}
          cornerColor={cornerColor}
          centerColor={centerColor}
          bg={bgColor}
        />
        <div className="flex flex-col gap-y-1.5 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Your combination
          </span>
          <p className="text-[13.5px] font-semibold text-slate-800 leading-snug capitalize">
            {pretty(activeCodeStyle)} dots ·{" "}
            {pretty(activeCorner)} corners
          </p>
          <div className="flex items-center gap-x-1.5 flex-wrap">
            {[
              ["Dots", dotColor],
              ["Corners", cornerColor],
              ["Centre", centerColor],
              ["Background", bgColor],
            ].map(([label, color]) => (
              <span
                key={label}
                title={`${label} ${color}`}
                className="inline-flex items-center gap-x-1 rounded-full bg-white border border-slate-200 pl-1 pr-2 py-[2px] text-[10.5px] font-semibold text-slate-500"
              >
                <span
                  className="w-3 h-3 rounded-full border border-slate-200"
                  style={{ backgroundColor: color }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 1: dot pattern ── */}
      <div className="w-full flex flex-col gap-y-3">
        <Eyebrow hint="the body of the code">Dot pattern</Eyebrow>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
          {codeStyleOptions.map((opt) => (
            <PreviewOption
              key={opt.value}
              label={opt.label}
              active={activeCodeStyle === opt.value}
              onClick={() => setIsCodeStyle(opt.value)}
            >
              <DotsPreview variant={opt.value} />
            </PreviewOption>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-1">
          <div className="flex flex-col gap-y-1.5">
            <span className="font-semibold text-slate-600 text-[12px]">Background</span>
            <ColorField
              isColor={bgColor}
              setIsColor={setIsCodeStyleBackgroundColor}
            />
          </div>

          <div className="flex flex-col gap-y-1.5">
            <span className="font-semibold text-slate-600 text-[12px]">Dots</span>
            <ColorField
              isColor={dotColor}
              setIsColor={setIsCodeStyleDotColor}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100" />

      {/* ── Section 2: corners ── */}
      <div className="w-full flex flex-col gap-y-4">
        <Eyebrow hint="the three squares scanners look for">Finder corners</Eyebrow>

        <div className="flex flex-col gap-y-2">
          <span className="font-semibold text-slate-600 text-[12px]">Outer shape</span>
          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            {cornerOptions.map((opt) => (
              <PreviewOption
                key={opt.value}
                label={opt.label}
                active={activeCorner === opt.value}
                onClick={() => setIsCorner(opt.value)}
              >
                <CornerPreview corner={opt.value} center={activeCenterStyle} />
              </PreviewOption>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <span className="font-semibold text-slate-600 text-[12px]">Inner shape</span>
          <div className="grid grid-cols-3 gap-3 w-full max-w-md">
            {centerOptions.map((opt) => (
              <PreviewOption
                key={opt.value}
                label={opt.label}
                active={activeCenterStyle === opt.value}
                onClick={() => setIsCenterStyle(opt.value)}
              >
                <CornerPreview corner={activeCorner} center={opt.value} />
              </PreviewOption>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-y-1.5">
            <span className="font-semibold text-slate-600 text-[12px]">Inner colour</span>
            <ColorField
              isColor={centerColor}
              setIsColor={setIsCodeStyleCenterColor}
            />
          </div>
          <div className="flex flex-col gap-y-1.5">
            <span className="font-semibold text-slate-600 text-[12px]">Outer colour</span>
            <ColorField
              isColor={cornerColor}
              setIsColor={setIsCodeStyleBorderColor}
            />
          </div>
        </div>
      </div>

      {/* contrast guard — a light-on-light code will not scan */}
      <p className="text-[12px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 w-full">
        Keep a strong contrast between the dots and the background, otherwise
        phone cameras will struggle to read the code.
      </p>
    </div>
  );

  return style === "accordion" ? (
    <QRMenu
      title="QR code style"
      desc="Shapes and colours for the pattern itself."
      iconShow={true}
      defualt={true}
      glyph="modules"
      summary={pretty(activeCodeStyle)}
      maxHeight="max-h-[1400px]"
    >
      {content}
    </QRMenu>
  ) : (
    <div>{content}</div>
  );
};

export default QRCodeStyle;
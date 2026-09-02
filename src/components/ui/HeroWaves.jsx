import React from "react";

/**
 * Hero/banner background ka shared decorative layer - flowing waves, dot
 * clusters aur diamond outlines. Purely decorative, koi logic nahi.
 * API page aur FAQ page dono isi ko use karte hain taaki theme same rahe.
 */

const WAVES = [0, 1, 2, 3, 4, 5, 6];

const DotGrid = ({ rows = 3, cols = 3, gap = 7, size = 2, className = "" }) => (
  <div className={`pointer-events-none absolute ${className}`}>
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${gap}px)`,
        gridTemplateRows: `repeat(${rows}, ${gap}px)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          className="rounded-full bg-blue-300/50"
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  </div>
);

const Diamond = ({ size = 16, className = "" }) => (
  <span
    className={`pointer-events-none absolute rotate-45 rounded-[3px] border-2 border-blue-200/70 ${className}`}
    style={{ width: size, height: size }}
  />
);

const HeroWaves = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* soft glows */}
    <div className="absolute -right-24 -top-28 h-[430px] w-[430px] rounded-full bg-white/55 blur-3xl" />
    <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />

    {/* flowing waves - right side */}
    <svg
      className="absolute inset-y-0 right-0 h-full w-[62%]"
      viewBox="0 0 620 420"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {WAVES.map((i) => (
        <path
          key={`r-${i}`}
          d={`M ${170 + i * 42} -30
              C ${370 + i * 30} ${70 + i * 8}, ${470 + i * 26} ${180 + i * 4}, ${430 + i * 38} 450`}
          stroke="#9dbcf5"
          strokeWidth="1"
          strokeOpacity={0.34 - i * 0.03}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {WAVES.slice(0, 5).map((i) => (
        <path
          key={`t-${i}`}
          d={`M ${300 + i * 55} -40
              C ${470 + i * 40} ${20 + i * 14}, ${560 + i * 20} ${90 + i * 18}, 680 ${120 + i * 30}`}
          stroke="#a9c5f7"
          strokeWidth="1"
          strokeOpacity={0.3 - i * 0.035}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>

    {/* flowing waves - left side (subtle) */}
    <svg
      className="absolute inset-y-0 left-0 h-full w-[34%]"
      viewBox="0 0 340 420"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <path
          key={`l-${i}`}
          d={`M -40 ${250 + i * 34}
              C ${90 + i * 20} ${200 + i * 26}, ${180 + i * 14} ${320 + i * 18}, ${340 + i * 10} ${290 + i * 30}`}
          stroke="#a9c5f7"
          strokeWidth="1"
          strokeOpacity={0.26 - i * 0.05}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>

    {/* dot clusters */}
    <DotGrid className="left-[15%] top-6" rows={2} cols={3} />
    <DotGrid className="left-[6%] bottom-12" rows={3} cols={4} gap={6} size={1.8} />
    <DotGrid className="right-[10%] top-8" rows={2} cols={4} />
    <DotGrid className="right-[30%] bottom-8" rows={2} cols={2} />

    {/* diamond outlines */}
    <Diamond size={16} className="left-[2.5%] top-[22%]" />
    <Diamond size={11} className="left-[54%] top-[38%] border-blue-200/60" />
    <Diamond size={9} className="right-[6%] bottom-[26%] border-blue-200/50" />
  </div>
);

export default HeroWaves;

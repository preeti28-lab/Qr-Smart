import { useState } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import HoverButton from "../../components/buttons/HoverButton";
import { useNavigate } from "react-router-dom";

import step1img from "../../assets/images/step1.webp";
import step2img from "../../assets/images/step2.webp";
import step3img from "../../assets/images/step3.webp";

const theme = {
  accent: "#3b82f6",
  lightBg: "#eff6ff",
  iconBg: "#dbeafe",
};

const steps = [
  {
    number: "01",
    title: "Choose The Type",
    desc: "Pick from URLs, vCards, WiFi, PDFs, social links, and 20+ more QR types tailored to your goal.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="6"
          y="6"
          width="15"
          height="15"
          rx="3"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <rect
          x="27"
          y="6"
          width="15"
          height="15"
          rx="3"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <rect
          x="6"
          y="27"
          width="15"
          height="15"
          rx="3"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <rect
          x="9"
          y="9"
          width="9"
          height="9"
          rx="1.5"
          fill="#3b82f6"
          fillOpacity="0.25"
        />
        <rect
          x="30"
          y="9"
          width="9"
          height="9"
          rx="1.5"
          fill="#3b82f6"
          fillOpacity="0.25"
        />
        <rect
          x="9"
          y="30"
          width="9"
          height="9"
          rx="1.5"
          fill="#3b82f6"
          fillOpacity="0.25"
        />
        <circle
          cx="36"
          cy="36"
          r="7"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <path
          d="M33 36l2 2 4-4"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    imageLink: step1img,
  },
  {
    number: "02",
    title: "Generate QR Code",
    desc: "Instantly generate a crisp, scannable QR code. Preview it live as you configure your content and settings.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="8"
          y="8"
          width="32"
          height="32"
          rx="5"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <circle
          cx="24"
          cy="24"
          r="4"
          fill="#3b82f6"
          fillOpacity="0.15"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <path
          d="M24 22v2l1.5 1.5"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    imageLink: step2img,
  },
  {
    number: "03",
    title: "Customize & Download",
    desc: "Style it with your brand colors, add a logo, choose a frame — then export in PNG, SVG, or PDF at any size.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect
          x="8"
          y="8"
          width="32"
          height="32"
          rx="5"
          stroke="#3b82f6"
          strokeWidth="2.5"
        />
        <circle cx="24" cy="20" r="5" stroke="#3b82f6" strokeWidth="2.2" />
        <path
          d="M14 36c0-5.523 4.477-10 10-10s10 4.477 10 10"
          stroke="#3b82f6"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M36 32v6M33 35l3 3 3-3"
          stroke="#3b82f6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    imageLink: step3img,
  },
];

function StepCard({ step, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col cursor-pointer group"
    >
      {/* Step Label */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-[11px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isActive ? theme.accent : "#f1f5f9",
            color: isActive ? "#fff" : "#94a3b8",
          }}
        >
          Step {step.number}
        </span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Card */}
      <div
        className="relative rounded-3xl p-3 flex flex-col gap-5 transition-all duration-500 overflow-hidden"
        style={{
          backgroundColor: isActive ? theme.lightBg : "#f8fafc",
          boxShadow: isActive
            ? `0 20px 60px -10px ${theme.accent}25, 0 4px 16px -4px ${theme.accent}15`
            : "none",
          transform: isActive ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full transition-opacity duration-500"
          style={{
            backgroundColor: theme.accent,
            opacity: isActive ? 0.07 : 0,
          }}
        />

        {/* Icon */}
        <div
          className="rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: isActive ? theme.iconBg : "#f1f5f9" }}
        >
          <img src={step.imageLink} className="w-full" />
          {step.icon}
        </div>

        {/* Text */}
        <div>
          <h3
            className="text-lg font-bold mb-2 transition-colors duration-300"
            style={{ color: isActive ? "#0f172a" : "#64748b" }}
          >
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed transition-all duration-300">
            {step.desc}
          </p>
        </div>

        {/* Bottom accent bar */}
        <div
          className="h-1 rounded-full transition-all duration-500"
          style={{
            backgroundColor: theme.accent,
            width: isActive ? "40%" : "0%",
            opacity: isActive ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

export default function CreateQRSteps() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-14">
        <SectionHeading
          title="Create your QR code in 3 steps"
          highlight="3 steps"
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            isActive={active === i}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      {/* Progress Dots */}

      {/* CTA */}

      <div className="flex justify-center mt-10">
        <HoverButton onClick={() => navigate("/builder")}>
          Create QR Code
        </HoverButton>
      </div>
    </section>
  );
}

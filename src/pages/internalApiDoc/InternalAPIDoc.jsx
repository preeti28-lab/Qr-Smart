import React, { useEffect, useState } from "react";
import ScreenView from "../../layouts/ScreenView";
import InternalAPISidebar from "./InternalAPISidebar";
import InternalAPIContentPanel from "./InternalAPIContentPanel";
import HeroWaves from "../../components/ui/HeroWaves";
import apiHeroImg from "../../assets/images/api-hero.png";

const InternalAPIDoc = () => {
  const [activeId, setActiveId] = useState("login");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="w-full bg-[#f7faff]">
        {/* ── Hero Banner ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#e9f0ff] via-[#f1f6ff] to-[#eaf1ff]">
          {/* decorative background - waves, dots, diamonds */}
          <HeroWaves />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 md:flex-row md:justify-between md:gap-4 md:py-14">
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-[26px] font-bold leading-[1.25] tracking-tight text-slate-900 md:text-[38px]">
                Automate the creation of your{" "}
                <span className="text-blue-600">QR Code</span> with our{" "}
                <span className="text-blue-600">API</span>
              </h1>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
                All API endpoints actively used in the QR Smart application,
                grouped by feature module.
              </p>
            </div>

            <img
              src={apiHeroImg}
              alt="QR Smart API"
              className="w-[280px] shrink-0 select-none object-contain md:w-[380px] lg:w-[440px]"
              draggable="false"
            />
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="mx-auto -mt-6 max-w-6xl px-4 pb-16 md:px-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            {/* Sidebar */}
            <InternalAPISidebar activeId={activeId} onSelect={setActiveId} />

            {/* Main Content */}
            <main className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
              <InternalAPIContentPanel activeId={activeId} />
            </main>
          </div>
        </div>
      </div>
    </ScreenView>
  );
};

export default InternalAPIDoc;

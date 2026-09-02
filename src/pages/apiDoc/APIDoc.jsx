import React, { useEffect, useState } from "react";
import ScreenView from "../../layouts/ScreenView";
import APISidebar from "./APISidebar";
import APIContentPanel from "./APIContentPanel";

const APIDoc = () => {
  const [activeId, setActiveId] = useState("qr");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="mx-auto bg-slate-50 min-h-screen">
        {/* Hero Banner */}
        <div className="bg-custom-gradient py-10 md:py-14 border-b border-slate-200">
          <div className="flex flex-col items-center px-4 text-center">
            <h2 className="text-[22px] md:text-[30px] font-bold text-slate-800 max-w-2xl leading-tight">
              Automate the creation of your QR Codes with our API
            </h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-6 md:-mt-8 pb-12">
          <div className="flex bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Sidebar */}
            <APISidebar activeId={activeId} onSelect={setActiveId} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-white min-h-[70vh]">
              <APIContentPanel activeId={activeId} />
            </main>
          </div>
        </div>
      </div>
    </ScreenView>
  );
};

export default APIDoc;
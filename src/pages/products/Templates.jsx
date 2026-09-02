import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/templates/hero.webp";
import how1Img from "../../assets/images/products/templates/how1.webp";
import benefitImg from "../../assets/images/products/templates/benefit.webp";

const HERO_IMG = heroImg;
const HOW_TO_IMG = how1Img;

const steps = [
  "Access the templates section from the vertical menu.",
  'Click on the "Create template" button to get started.',
  "Enter a name for the template and select styles, colors, and a frame.",
  'Click "Save" to save your new template.',
];

const createSteps = [
  'In the last step of creating the QR, you will find a tab with a checkbox next to the text "Save template when finished." Click on it and enter a reference name for your template.',
  "Select colors, styles, a frame, and a logo.",
  'By clicking "Finish", you will not only have created your QR, but you will also have saved the design of that QR as a template to use again whenever you want.',
];

const benefits = [
  {
    title: "Time saving",
    text: "Save time by applying predefined templates to create QR codes quickly.",
    icon: "↻",
  },
  {
    title: "Brand consistency",
    text: "Maintain a consistent appearance across all your QR codes to strengthen your brand.",
    icon: "♢",
  },
  {
    title: "Simplicity",
    text: "Easily save and access your templates, making it easy to manage complex designs.",
    icon: "✦",
  },
  {
    title: "Versatility",
    text: "Use templates for both individual QR code creation and mass generation.",
    icon: "▱",
  },
];

const TemplatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="min-h-screen bg-white overflow-hidden">

        {/* =========================================================
            HERO SECTION
        ========================================================= */}
        <section className="relative">
          {/* Decorative background blobs */}
          <div className="absolute left-[-80px] top-24 w-[190px] h-[300px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-[45%] rotate-[-12deg] opacity-80" />

          <div className="absolute right-[-80px] top-28 w-[190px] h-[220px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-[45%] rotate-[10deg] opacity-80" />

          {/* Left dots */}
          <div className="absolute left-[80px] top-[185px] grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="w-[4px] h-[4px] rounded-full bg-blue-300"
              />
            ))}
          </div>

          {/* Right dots */}
          <div className="absolute right-[80px] top-[190px] grid grid-cols-4 gap-2 opacity-60">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="w-[4px] h-[4px] rounded-full bg-purple-300"
              />
            ))}
          </div>

          <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-16">

            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-[42px] md:text-[46px] font-bold text-[#101828] tracking-tight">
                Templates
              </h1>

              {/* decorative line */}
              <div className="flex justify-center items-center gap-3 mt-4">
                <span className="w-12 h-[1px] bg-blue-200" />

                <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 text-xs">
                  ✦
                </span>

                <span className="w-12 h-[1px] bg-blue-200" />
              </div>

              <p className="mt-5 text-[15px] md:text-[16px] leading-7 text-[#475467]">
                QR code templates are a powerful tool that allows users to save
                and reuse custom QR code designs. This includes colors, frames,
                styles and logos, providing an efficient way to maintain visual
                consistency across multiple QR codes.
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative mt-10 flex justify-center">
              <div className="absolute inset-0 bg-blue-100/30 blur-3xl rounded-full scale-75" />

              <img
                src={HERO_IMG}
                alt="Templates"
                className="relative w-full max-w-[650px] object-contain drop-shadow-[0_20px_40px_rgba(37,99,235,0.08)]"
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            BENEFITS
        ========================================================= */}
        <section className="relative max-w-6xl mx-auto px-6 mb-20">

          {/* background glow */}
          <div className="absolute -top-10 right-10 w-80 h-80 bg-blue-100/30 blur-3xl rounded-full pointer-events-none" />

          <div className="relative rounded-2xl border border-[#e4e7ec] bg-gradient-to-br from-white via-white to-[#f5f8ff] overflow-hidden">

            {/* top wave / glow */}
            <div className="absolute right-[-70px] top-[-100px] w-[400px] h-[260px] rounded-[50%] bg-gradient-to-br from-blue-100/60 to-purple-100/40 blur-[2px]" />

            <div className="absolute right-[80px] top-[70px] w-[280px] h-[220px] rounded-full bg-blue-50/70 blur-xl" />

            <div className="relative p-7 md:p-10">

              <div className="mb-8">
                <h2 className="text-[24px] font-bold text-[#101828]">
                  Benefits
                </h2>

                <div className="mt-3 w-6 h-[3px] rounded-full bg-blue-500" />
              </div>

              <div className="grid lg:grid-cols-[1fr_1fr_1fr] gap-8 items-center">

                {/* Benefits grid */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-10 gap-y-9">

                  {benefits.map((item, index) => (
                    <div key={index} className="flex gap-4">

                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 text-xl shadow-sm">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="text-[14px] font-bold text-[#101828] mb-1">
                          {item.title}
                        </h3>

                        <p className="text-[13px] leading-5 text-[#667085] max-w-[220px]">
                          {item.text}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>

                {/* Illustration */}
                <div className="relative hidden lg:flex items-center justify-center min-h-[280px]">
                  <img
                    src={benefitImg}
                    alt="Templates benefits"
                    className="w-full max-w-[300px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW TO USE HEADING
        ========================================================= */}
        <section className="max-w-6xl mx-auto px-6 mb-8">
          <div className="text-center">
            <h2 className="text-[24px] md:text-[26px] font-bold text-[#101828]">
              How to use
            </h2>

            <div className="w-6 h-[3px] bg-blue-500 rounded-full mx-auto mt-3" />
          </div>
        </section>

        {/* =========================================================
            HOW TO USE
        ========================================================= */}
        <section className="max-w-6xl mx-auto px-6 mb-16">

          <div className="rounded-2xl border border-[#e4e7ec] bg-white shadow-[0_10px_40px_rgba(16,24,40,0.04)] overflow-hidden">

            <div className="grid lg:grid-cols-[1.8fr_1fr]">

              {/* Image */}
              <div className="p-5 md:p-7">
                <div className="rounded-xl bg-[#f8faff] border border-[#e4e7ec] p-4 overflow-hidden">
                  <img
                    src={HOW_TO_IMG}
                    alt="Templates how to"
                    className="w-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="relative p-7 md:p-9 flex items-center">

                {/* vertical line */}
                <div className="absolute left-[45px] top-[70px] bottom-[70px] border-l border-dashed border-blue-200" />

                <div className="space-y-8 relative">

                  {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">

                      <div className="relative z-10 flex-shrink-0 w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shadow-[0_5px_15px_rgba(37,99,235,0.25)]">
                        {index + 1}
                      </div>

                      <div className="pt-0.5">
                        <h3 className="text-[14px] font-bold text-[#101828] mb-1">
                          {[
                            "Access templates",
                            "Create template",
                            "Design your template",
                            "Save template",
                          ][index]}
                        </h3>

                        <p className="text-[13px] leading-5 text-[#667085]">
                          {step}
                        </p>
                      </div>

                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CREATE TEMPLATE
        ========================================================= */}
        <section className="max-w-6xl mx-auto px-6 mb-16">

          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f8fbff] to-[#f3f7ff] p-7 md:p-9">

            <h2 className="text-[19px] font-bold text-[#101828] mb-8">
              Create a template during the QR creation process
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {createSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex gap-4 md:pr-7"
                >

                  {/* divider */}
                  {index !== createSteps.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-2 bottom-2 border-r border-dashed border-blue-200" />
                  )}

                  <div className="flex-shrink-0">

                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                      {index + 1}
                    </div>

                  </div>

                  <p className="text-[13px] leading-6 text-[#667085] pt-1">
                    {step}
                  </p>

                </div>
              ))}

            </div>
          </div>
        </section>

        {/* =========================================================
            APPLICATION
        ========================================================= */}
        <section className="max-w-6xl mx-auto px-6 pb-16">

          <div className="relative rounded-2xl border border-[#e4e7ec] bg-white overflow-hidden shadow-[0_10px_35px_rgba(16,24,40,0.04)]">

            {/* Decorative waves */}
            <div className="absolute left-[-70px] bottom-[-100px] w-[240px] h-[240px] rounded-full bg-blue-50" />

            <div className="absolute right-[-80px] top-[-100px] w-[280px] h-[230px] rounded-full bg-purple-50/60" />

            <div className="relative grid lg:grid-cols-[1fr_280px] gap-8 p-8 md:p-10">

              <div>

                <h2 className="text-[19px] md:text-[21px] font-bold text-[#101828]">
                  Application of templates in the creation and editing of QR
                  codes
                </h2>

                <div className="w-6 h-[3px] rounded-full bg-blue-500 mt-3 mb-5" />

                <p className="text-[14px] text-[#667085] leading-7 mb-4">
                  When creating or editing a QR code, you can always select one
                  of your templates in the last step, in the QR Design section.
                  Simply click on "Templates" and choose the one you prefer.
                  You will see the design applied on the right margin.
                </p>

                <p className="text-[14px] text-[#667085] leading-7">
                  Using QR code templates makes it much easier to manage and
                  maintain a consistent visual identity. This allows you to
                  focus on the content of your QRs, ensuring consistency and
                  quality without having to redesign each time.
                </p>

              </div>

              {/* Right illustration */}
              <div className="relative hidden lg:flex items-center justify-center">

                <div className="absolute w-52 h-52 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100/60" />

                <div className="relative w-[145px] h-[190px] rounded-2xl bg-white border border-blue-100 shadow-[0_15px_35px_rgba(37,99,235,0.14)] p-3">

                  <div className="h-4 rounded bg-blue-50 mb-4" />

                  <div className="flex items-center justify-center h-[105px] rounded-xl bg-gray-50">
                    <div className="w-[75px] h-[75px] border-4 border-black flex items-center justify-center">
                      <span className="text-4xl">▦</span>
                    </div>
                  </div>

                  <div className="mt-4 h-2 w-16 bg-blue-100 rounded-full" />
                  <div className="mt-2 h-2 w-24 bg-gray-100 rounded-full" />

                </div>

                <div className="absolute bottom-[-5px] right-[25px] text-2xl">
                  ⭐
                </div>

              </div>

            </div>
          </div>
        </section>

      </div>
    </ScreenView>
  );
};

export default TemplatesPage;
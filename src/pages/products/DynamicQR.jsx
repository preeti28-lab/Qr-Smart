import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";

import mobileImg from "../../assets/images/products/dynamic/how-to-use (2).webp";

const MOBILE_IMG = mobileImg;

const qrTypes = [
  { name: "Video", type: "video" },
  { name: "Business", type: "business" },
  { name: "Coupon", type: "coupon" },
  { name: "PDF", type: "pdf", active: true },
  { name: "URL", type: "url" },
  { name: "MP3", type: "mp3" },
  { name: "Events", type: "events" },
];

const benefits = [
  {
    title: "Tracking and Analytics",
    desc: "Get valuable insights into the performance of your QR codes, including scans, locations, devices used, and user behavior to optimize campaigns.",
    tone: "blue",
    icon: "analytics",
  },
  {
    title: "Real-Time Update",
    desc: "Update your QR content anytime without reprinting codes. Modify URLs, text, or media instantly based on your needs.",
    tone: "purple",
    icon: "update",
  },
  {
    title: "Bug Fixes",
    desc: "Made a mistake? No need to create a new QR. Simply update the content quickly and ensure users always see correct data.",
    tone: "green",
    icon: "bug",
  },
  {
    title: "Cost Savings",
    desc: "Avoid reprinting costs by updating existing QR codes. Save resources and improve ROI with centralized management.",
    tone: "orange",
    icon: "cost",
  },
  {
    title: "Using Short URLs",
    desc: "Short URLs improve usability, save space, and make accessing information easier and faster.",
    tone: "blue",
    icon: "link",
  },
  {
    title: "Adaptation to Marketing Campaigns",
    desc: "Update campaigns anytime to keep them fresh and test different strategies to see what performs best.",
    tone: "pink",
    icon: "campaign",
  },
  {
    title: "Security and Management",
    desc: "Protect QR codes with passwords, expiry settings, and control access for better security and reliability.",
    tone: "blue",
    icon: "security",
  },
];

const steps = [
  {
    num: 1,
    title: "Choice of dynamic QR type:",
    desc: "Choose the type of QR based on the content you want to share such as URL, PDF, video, or business info.",
    icon: "qr",
  },
  {
    num: 2,
    title: "Added required information:",
    desc: "Fill in all necessary details clearly so users can easily understand and interact with your content.",
    icon: "document",
  },
  {
    num: 3,
    title: "QR code customization:",
    desc: "Customize your QR code design, colors, and branding to match your business identity.",
    icon: "palette",
  },
  {
    num: 4,
    title: "QR code download:",
    desc: "Download your QR code in formats like PNG, JPG, SVG, or PDF for use in marketing materials.",
    icon: "download",
  },
];

function SvgIcon({ name, size = 24 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    analytics: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 16v-4" />
        <path d="M12 16V8" />
        <path d="M16 16v-6" />
      </>
    ),
    update: (
      <>
        <path d="M20 11a8 8 0 0 0-14.7-4L4 9" />
        <path d="M4 4v5h5" />
        <path d="M4 13a8 8 0 0 0 14.7 4L20 15" />
        <path d="M20 20v-5h-5" />
      </>
    ),
    bug: (
      <>
        <rect x="8" y="7" width="8" height="11" rx="4" />
        <path d="M10 4v3M14 4v3M5 10h3M16 10h3M5 15h3M16 15h3M7 20l2-2M17 20l-2-2" />
        <path d="M10 11h4" />
      </>
    ),
    cost: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M14.7 9.3c-.6-.7-1.5-1.1-2.7-1.1-1.5 0-2.5.7-2.5 1.7 0 2.7 5.2 1.2 5.2 4 0 1-.9 1.9-2.7 1.9-1.2 0-2.3-.4-3-1.2M12 6.8v10.4" />
      </>
    ),
    link: (
      <>
        <path d="M10 13.5 14 9.5" />
        <path d="M7.5 16a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 0" />
        <path d="M16.5 8a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5 0" />
      </>
    ),
    campaign: (
      <>
        <path d="M4 11v2a2 2 0 0 0 2 2h2l3 4h2l-1.7-4H17l3 2V7l-3 2H8a4 4 0 0 0-4 4Z" />
        <path d="M7 15V9" />
      </>
    ),
    security: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    video: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),
    business: (
      <>
        <path d="M3 20h18M5 20V9h14v11M8 9V6h8v3M9 13h2M13 13h2M9 16h2M13 16h2" />
      </>
    ),
    coupon: (
      <>
        <path d="m5 7 11-3 3 11-11 3-3-11Z" />
        <path d="M14 5.5a1.5 1.5 0 1 0 0 3" />
        <path d="M8 12h.01M11 11h.01M14 10h.01" />
      </>
    ),
    pdf: (
      <>
        <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M15 3v5h5M8 12h8M8 16h6" />
      </>
    ),
    url: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.8 9h16.4M3.8 15h16.4M12 3.5c2.2 2.3 3.2 5 3.2 8.5s-1 6.2-3.2 8.5c-2.2-2.3-3.2-5-3.2-8.5S9.8 5.8 12 3.5Z" />
        <path d="m17 16 3-3m0 0-3-3m3 3h-5" />
      </>
    ),
    mp3: (
      <>
        <path d="M5 12v0M9 9v6M13 7v10M17 9v6M21 11v2" />
      </>
    ),
    events: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 9h16M8 13h.01M12 13h.01M16 13h.01M8 16h.01M12 16h.01M16 16h.01" />
      </>
    ),
    qr: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <path d="M14 14h2v2h-2zM18 14h2M18 18h2v2M14 18h2v2" />
      </>
    ),
    document: (
      <>
        <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M15 3v5h5M8 12h8M8 16h6" />
      </>
    ),
    palette: (
      <>
        <path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6h-.8a1.7 1.7 0 0 1 0-3.4h2.4A6.2 6.2 0 0 0 21 7.8 8.9 8.9 0 0 0 12 3Z" />
        <path d="M7.5 9h.01M10 6.8h.01M14 6.8h.01M17 9h.01" />
      </>
    ),
    download: (
      <>
        <path d="M12 4v11" />
        <path d="m8 11 4 4 4-4M5 20h14" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function QrTypeCard({ item }) {
  return (
    <div
      className={[
        "group relative flex h-[114px] min-w-0 flex-col items-center justify-center",
        "rounded-[12px] border bg-white",
        "shadow-[0_5px_18px_rgba(38,57,108,0.08)]",
        "transition-all duration-200",
        item.active
          ? "border-[#ff9a3d] shadow-[0_6px_22px_rgba(255,145,49,0.12)]"
          : "border-[#e8ecf5]",
      ].join(" ")}
    >
      <div
        className={[
          "mb-2 flex h-[54px] w-[54px] items-center justify-center rounded-full",
          item.active ? "bg-[#fff4e9] text-[#ff8d2d]" : "bg-[#f1f5ff] text-[#2768f4]",
        ].join(" ")}
      >
        <SvgIcon name={item.type} size={30} />
      </div>

      <span className="text-[13px] font-semibold text-[#111633]">{item.name}</span>

      {item.active && (
        <span className="absolute bottom-[-1px] left-1/2 h-[3px] w-9 -translate-x-1/2 rounded-full bg-[#ff8b27]" />
      )}
    </div>
  );
}

const DynamicQR = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="relative min-h-screen overflow-hidden bg-white text-[#111633]">
        {/* =========================================================
            PAGE DECORATIONS — deliberately kept as CSS/SVG shapes
            so the background stays crisp and responsive.
        ========================================================== */}

        {/* Top-left flowing blue wave */}
        <svg
          className="pointer-events-none absolute left-[-120px] top-[42px] z-0 h-[220px] w-[520px] opacity-90"
          viewBox="0 0 520 220"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 155C75 120 108 70 188 72C273 74 319 126 393 102C451 83 484 39 520 0V220H0V155Z"
            fill="url(#blueWave)"
          />
          <defs>
            <linearGradient id="blueWave" x1="65" y1="82" x2="470" y2="180" gradientUnits="userSpaceOnUse">
              <stop stopColor="#dce9ff" />
              <stop offset="1" stopColor="#eef4ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Top-right orange orbit */}
        <div className="pointer-events-none absolute right-[-68px] top-[-105px] z-0 h-[280px] w-[280px] rounded-full border border-[#ff9c40] opacity-75" />

        {/* Top-right purple glow */}
        <div className="pointer-events-none absolute right-[-48px] top-[74px] z-0 h-[132px] w-[132px] rounded-full bg-[#e9d9ff] opacity-70" />

        {/* Top-left dotted pattern */}
        <div
          className="pointer-events-none absolute left-[128px] top-[118px] z-0 h-[78px] w-[78px] opacity-60"
          style={{
            backgroundImage: "radial-gradient(#a9c9ff 1.7px, transparent 1.7px)",
            backgroundSize: "14px 14px",
          }}
        />

        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 pb-0 pt-12">
            <div className="mx-auto max-w-[700px] text-center">
              <h1 className="text-[38px] font-bold leading-tight tracking-[-1.6px] text-[#111633] md:text-[44px]">
                Dynamic QR
              </h1>

              <div className="mt-3 flex justify-center">
                <div className="relative h-[4px] w-8 rounded-full bg-[#2868f4]">
                  <span className="absolute -right-2 -top-[2px] h-2 w-2 rounded-full bg-[#2868f4]" />
                </div>
              </div>

              <p className="mx-auto mt-4 max-w-[520px] text-[13px] leading-6 text-[#687187] md:text-[14px]">
                Update anytime, track performance, and stay ahead
                <br className="hidden md:block" />
                with powerful, flexible QR codes.
              </p>
            </div>

            {/* QR type selector */}
            <div className="mx-auto mt-7 grid max-w-[1180px] grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {qrTypes.map((item) => (
                <QrTypeCard key={item.name} item={item} />
              ))}
            </div>

            {/* Intro copy */}
            <div className="mx-auto mt-7 max-w-[900px] text-center text-[12px] leading-[1.9] text-[#606a80] md:text-[13px]">
              <p>
                Dynamic QR codes are an incredibly convenient tool that allows you to update content without needing to
                change the physical code. This makes it much easier to keep information up to date and relevant, which is
                crucial to quickly adapt to the changing needs of your business and always offer the best experience to
                your users. Compared to static QR codes, dynamic QR codes provide greater flexibility and functionality.
                Here are the reasons why choosing dynamic QR codes is an excellent decision.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            BENEFITS
        ========================================================== */}
        <section className="relative z-10 mx-auto mt-7 max-w-7xl px-6">
          <div className="rounded-[18px] border border-[#e7eaf2] bg-white p-6 shadow-[0_8px_35px_rgba(35,55,110,0.055)] md:p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-7 w-[3px] rounded-full bg-[#2d6cf4]" />
              <h2 className="text-[21px] font-bold tracking-[-0.4px] text-[#111633]">Benefits</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const isFirstRow = index < 4;
                const isLastInRow = index === 3 || index === 6;

                return (
                  <div
                    key={benefit.title}
                    className={[
                      "relative px-4 pb-7",
                      isFirstRow ? "pt-0" : "border-t border-[#edf0f6] pt-6",
                      !isLastInRow ? "lg:border-r lg:border-[#edf0f6]" : "",
                      index === 4 ? "sm:border-r sm:border-[#edf0f6] lg:border-r" : "",
                      index === 5 ? "sm:border-r sm:border-[#edf0f6] lg:border-r" : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "mb-3 flex h-11 w-11 items-center justify-center rounded-full",
                        benefit.tone === "purple" && "bg-[#f1eaff] text-[#6337d7]",
                        benefit.tone === "green" && "bg-[#eff8ee] text-[#65a34a]",
                        benefit.tone === "orange" && "bg-[#fff1e4] text-[#ff8b26]",
                        benefit.tone === "pink" && "bg-[#fff0f5] text-[#f04b74]",
                        benefit.tone === "blue" && "bg-[#eef4ff] text-[#2768f4]",
                      ].filter(Boolean).join(" ")}
                    >
                      <SvgIcon name={benefit.icon} size={24} />
                    </div>

                    <h3 className="text-[12px] font-bold leading-5 text-[#15182d] md:text-[13px]">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 max-w-[215px] text-[10px] leading-[1.75] text-[#697288] md:text-[11px]">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            HOW TO USE
        ========================================================== */}
        <section className="relative z-10 mx-auto mt-4 max-w-7xl px-6 pb-10">
          <div className="relative overflow-hidden rounded-[20px] border border-[#e5e8f4] bg-gradient-to-br from-[#fafaff] via-[#f5f5ff] to-[#edf4ff] p-6 md:p-7">
            {/* Dots */}
            <div
              className="pointer-events-none absolute bottom-[118px] right-[-2px] h-[80px] w-[80px] opacity-55"
              style={{
                backgroundImage: "radial-gradient(#a9c9ff 2px, transparent 2px)",
                backgroundSize: "15px 15px",
              }}
            />

            {/* Orange orbit */}
            <div className="pointer-events-none absolute right-[-82px] top-[70px] h-[190px] w-[170px] rounded-[50%] border border-[#ffb064] opacity-65" />

            {/* Bottom-left blue glow */}
            <div className="pointer-events-none absolute bottom-[-75px] left-[-70px] h-[180px] w-[180px] rounded-full bg-[#dceaff] opacity-55 blur-[2px]" />

            <div className="relative">
              <h2 className="text-[23px] font-bold tracking-[-0.5px] text-[#111633] md:text-[25px]">How to use</h2>

              <div className="mt-2 flex items-center">
                <div className="h-[3px] w-9 rounded-full bg-[#316df4]" />
                <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#316df4]" />
              </div>
            </div>

            {/* Existing designed how-to visual — keep the source artwork intact */}
            <div className="relative mx-auto mt-4 max-w-[920px]">
              <img
                src={MOBILE_IMG}
                alt="Dynamic QR how to use"
                className="block w-full object-contain"
              />
            </div>

            <p className="relative mx-auto mt-2 max-w-[760px] text-center text-[11px] leading-6 text-[#687187] md:text-[12px]">
              Creating dynamic QR codes is simple and powerful. Follow these steps to get the most out of your QR experience.
            </p>

            <div className="relative mx-auto mt-4 max-w-[930px] space-y-1.5">
              {steps.map((step, index) => (
                <div
                  key={step.num}
                  className="flex items-center gap-2 rounded-[9px] border border-[#e7eaf2] bg-white px-2 py-1.5 shadow-[0_2px_8px_rgba(30,45,90,0.035)]"
                >
                  <div
                    className={[
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white",
                      index === 2 ? "bg-[#ff851c]" : index === 3 ? "bg-[#63aa48]" : "bg-[#2868f4]",
                    ].join(" ")}
                  >
                    {step.num}
                  </div>

                  <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f5ff] text-[#2868f3] sm:flex">
                    <SvgIcon name={step.icon} size={18} />
                  </div>

                  <p className="py-0.5 pr-2 text-[10px] leading-[1.65] text-[#657087] md:text-[11px]">
                    <span className="font-bold text-[#16192e]">{step.title}</span>{" "}
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom decoration */}
        <div className="pointer-events-none absolute bottom-0 left-[-100px] h-40 w-72 rounded-full bg-gradient-to-tr from-[#e3edff] to-transparent opacity-60" />
      </div>
    </ScreenView>
  );
};

export default DynamicQR;

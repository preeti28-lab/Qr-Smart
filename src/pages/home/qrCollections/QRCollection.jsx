import { useState } from "react";
import SectionHeading from "../../../components/ui/SectionHeading";
import { useNavigate } from "react-router-dom";
import { FaRing, FaHandHoldingHeart, FaCamera } from "react-icons/fa6";

import weddingImg from "../../../assets/images/collection/wedding.webp";
import photographersImg from "../../../assets/images/collection/photographers.webp";
import ngoImg from "../../../assets/images/collection/ngo.webp";

const tabs = [
  {
    label: "QR Codes for Wedding",
    heading: "Make Every Moment Memorable",
    description:
      "Create beautiful QR codes for your wedding invites, menus, photo galleries, and more. Let your guests connect instantly to your special day.",
    image: weddingImg,
    alt: "QR Codes for Wedding",
    link: "/resources/industry/event-management",
    icon: <FaRing />,
  },
  {
    label: "QR Codes for NGO",
    heading: "Amplify Your Impact",
    description:
      "Empower your cause with QR codes that link donors to campaigns, volunteers to sign-up forms, and communities to your mission.",
    image: ngoImg,
    alt: "QR Codes for NGO",
    link: "/resources/industry/nonprofit-organizations",
    icon: <FaHandHoldingHeart />,
  },
  {
    label: "QR Codes for Photographers",
    heading: "Share Your Vision Instantly",
    description:
      "Link your portfolio, galleries, and booking pages with a single scan. Let your work speak for itself — anywhere, anytime.",
    image: photographersImg,
    alt: "QR Codes for Photographers",
    link: "/resources/industry/photographers-and-videographers",
    icon: <FaCamera />,
  },
];

export default function QRCollection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <section className="w-full max-w-6xl mx-auto px-4 py-16">
        <SectionHeading
          smallHead="QR Codes for"
          smallHeadLines
          title="Explore our extensive collection of QR codes"
          subHeading="QR codes can contain a wide range of content and at QRFY we offer them all."
        />

        {/* Main Card */}
        <div className="relative w-full rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[420px] mt-10 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
          {/* LEFT — Text Content */}
          <div className="relative z-10 flex flex-col justify-center px-10 py-12 md:w-[45%] flex-shrink-0">
            {/* Icon tile — swaps with the active tab */}
            <div className="relative w-12 h-12 mb-6">
              {tabs.map((tab, i) => (
                <span
                  key={i}
                  className={`absolute inset-0 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-600 text-xl transition-all duration-500
                  ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                >
                  {tab.icon}
                </span>
              ))}
            </div>

            {/* Heading with fade transition */}
            <div className="relative h-24 mb-4 overflow-hidden">
              {tabs.map((tab, i) => (
                <h2
                  key={i}
                  className={`absolute inset-0 text-2xl md:text-3xl font-bold text-slate-900 leading-tight transition-all duration-500
                  ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                >
                  {tab.heading}
                </h2>
              ))}
            </div>

            {/* Description with fade transition */}
            <div className="relative h-24 mb-6">
              {tabs.map((tab, i) => (
                <p
                  key={i}
                  className={`absolute inset-0 text-sm text-slate-500 leading-relaxed transition-all duration-500 delay-75
                  ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
                >
                  {tab.description}
                </p>
              ))}
            </div>

            {/* CTA Button — navigates to the active tab's link */}
            <button
              onClick={() => navigate(tabs[active].link)}
              className="self-start px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
            >
              Get Started Free
            </button>
          </div>

          {/* Fade gradient overlay */}
          <div className="absolute inset-0 z-[5] pointer-events-none">
            <div className="h-full w-full bg-gradient-to-r from-[#eaf1fe] via-[#eaf1fe]/85 to-transparent" />
          </div>

          {/* RIGHT — Image */}
          <div className="relative flex-1 min-h-[280px] md:min-h-0">
            {tabs.map((tab, i) => (
              <img
                key={i}
                src={tab.image}
                alt={tab.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out
                ${i === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              />
            ))}
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center mt-6">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-7 py-4 text-sm font-medium tracking-wide border-b-2 transition-all duration-300 -mb-px
              ${
                i === active
                  ? "border-blue-600 bg-blue-50/70 text-blue-600 font-semibold"
                  : "border-transparent text-slate-400 hover:text-blue-500 hover:border-blue-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/resources/qr-types-bussiness")}
            className="px-7 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
          >
            See More
          </button>
        </div>
      </section>
    </div>
  );
}
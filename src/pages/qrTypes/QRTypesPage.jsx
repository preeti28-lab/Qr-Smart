import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  BarChart2,
  Palette,
  Download,
  Users,
  Globe,
  Lock,
  Settings,
  Layers,
} from "lucide-react";
import { qrTypes } from "../../constants/qrTypes";
import ScreenView from "../../layouts/ScreenView";
import HoverButton from "../../components/buttons/HoverButton";
import { useSelector } from "react-redux";

const STATIC_PLANS = [
  {
    title: "Unlimited dynamic QR",
    line: "Create unlimited QRs and update them whenever you want in real time.",
    Icon: RefreshCw,
  },
  {
    title: "Variety of QR types",
    line: "Choose from multiple QR types, such as URL, PDF, Menu, and more.",
    Icon: Layers,
  },
  {
    title: "Variety of download formats",
    line: "Download your QR in PNG, SVG, PDF, among others.",
    Icon: Download,
  },
  {
    title: "Unlimited Members",
    line: "Invite the users you want to collaborate in the creation and management of your QR.",
    Icon: Users,
  },
  {
    title: "Complete QR Analytics",
    line: "Get statistics with the number of scans, locations and user devices.",
    Icon: BarChart2,
  },
  {
    title: "QR editing and management",
    line: "Customize your QRs with colors, fonts, and the logo you choose, among other options.",
    Icon: Settings,
  },
  {
    title: "Unlimited scans",
    line: "Your QRs can be scanned unlimitedly.",
    Icon: Globe,
  },
  {
    title: "Bulk creation and download",
    line: "Generate multiple QRs with CSV or REST API and obtain them in a single download.",
    Icon: RefreshCw,
  },
  {
    title: "Integrate Google and Facebook pixel",
    line: "Track interaction with your QRs.",
    Icon: Globe,
  },
  {
    title: "Premium Support",
    line: "Receive priority and personalized technical assistance to solve any problem.",
    Icon: Users,
  },
  {
    title: "Cancel whenever you want",
    line: "Cancel your subscription at any time, without restrictions.",
    Icon: Lock,
  },
  {
    title: "Custom Domain",
    line: "Use your own domain to customize the URL of your QR.",
    Icon: Settings,
  },
];

export default function QRTypePage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, token, role } = useSelector((state) => state.auth);


  const currentItem = qrTypes.find((q) => q.type === type) ?? qrTypes[0];
  const [activeTab, setActiveTab] = useState(currentItem.tabs?.[0]?.name ?? "");
  const activeTabData =
    currentItem.tabs?.find((t) => t.name === activeTab) ??
    currentItem.tabs?.[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleCreate = () => {
    if (role) {
      navigate("/builder");
    } else {
      navigate("/login");
    }
  };

  return (
    <ScreenView>
      <div className="min-h-screen bg-white">
        {/* ── HERO ── */}
        <section
          className="relative text-center px-6 pt-10 pb-0 overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 100%, #f87171 0%, #fca5a5 25%, #fff1f1 55%, #ffffff 100%)",
          }}
        >
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-[14px] font-semibold tracking-[0.3em] text-blue-600 uppercase mb-5">
              {currentItem.name} QR Code
            </p>
            <h1 className="text-4xl md:text-[52px] font-bold text-gray-900 mb-5 leading-[1.1] tracking-tight">
              {currentItem.heroTitle}
            </h1>
            <p className="text-gray-500 text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
              {currentItem.heroSubtitle}
            </p>
            <div className="flex items-center justify-center">
              <HoverButton onClick={() => navigate("/")}>
                Try it for free →
              </HoverButton>
            </div>
          </motion.div>

          <motion.div
            key={`mockup-${type}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 55,
              damping: 14,
            }}
            className="max-w-[340px] h-[600px] mx-auto mt-14"
          >
            <img
              src={currentItem.mockupImg}
              alt="mockup"
              className="w-full h-auto object-fit"
            />
          </motion.div>
        </section>

        {/* ── TABS SECTION ── */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
                {currentItem.tabsHeading.title}
              </h2>
              <p className="text-gray-500 text-base max-w-4xl mx-auto leading-relaxed">
                {currentItem.tabsHeading.description}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-end justify-center border-b border-slate-100 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden gap-1">
              {currentItem.tabs?.map((tab) => {
                const isActive = activeTab === tab.name;
                const Icon = tab.iconSecond;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`relative flex flex-col items-center gap-2.5 px-5 py-4 min-w-[90px] transition-all duration-200 border-b-2 ${
                      isActive
                        ? "bg-gray-100 border-blue-600"
                        : "border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <span className="w-14 h-14 rounded-2xl flex items-center justify-center">
                      {Icon &&
                        React.cloneElement(Icon, {
                          size: 36,
                          strokeWidth: 1.5,
                          className: isActive
                            ? "text-blue-500"
                            : "text-slate-400",
                        })}
                    </span>
                    <span
                      className={`text-[12px] font-semibold text-center leading-tight whitespace-nowrap transition-colors duration-200 ${
                        isActive ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      {tab.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tab Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(120deg, #12002a 0%, #1e0545 40%, #3b0f7a 70%, #5b2d9e 100%)",
                }}
              >
                <div className="grid md:grid-cols-2 items-center min-h-[340px]">
                  <div className="p-10 md:p-14">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
                      {activeTabData?.name}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed mb-10">
                      {activeTabData?.card?.description}
                    </p>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={handleCreate}
                        className="inline-flex items-center border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200"
                      >
                        Create QR code
                      </button>
                      {/* <button className="text-white/60 hover:text-white font-semibold text-sm transition-colors duration-200">
                        More Info
                      </button> */}
                    </div>
                  </div>
                  <div className="h-[340px] overflow-hidden">
                    <img
                      src={activeTabData?.card?.img ?? currentItem.mockupImg}
                      alt={activeTabData?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── BRING YOUR IDEAS ── */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-100">
          <div className="grid md:grid-cols-2 gap-24 items-start">
            <div className="md:sticky top-24 self-start">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-snug">
                {currentItem.useCasesLeft?.[0]?.title}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                {currentItem.content}
              </p>
            </div>

            <div className="flex flex-col gap-20">
              {currentItem.useCases?.map((uc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="rounded-2xl overflow-hidden mb-6 bg-red-50 shadow-sm">
                    <img
                      src={uc.img}
                      alt={uc.title}
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[13px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-2">
                    {uc.tag}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">
                    {uc.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-6">
                    {uc.description}
                  </p>
                  <HoverButton onClick={handleCreate}>
                    Generate QR code
                  </HoverButton>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ALL PLANS — STATIC ── */}
        <section
          className="py-24 px-6"
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-14">
              All plans include:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STATIC_PLANS.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <plan.Icon
                      size={18}
                      className="text-blue-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">
                      {plan.title}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {plan.line}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ScreenView>
  );
}

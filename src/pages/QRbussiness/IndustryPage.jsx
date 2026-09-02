import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RefreshCw,
  BarChart2,
  Palette,
  FolderOpen,
  Globe,
  Link2,
  Lock,
  MapPin,
  CalendarDays,
  Users,
  Plug,
  Headphones,
  QrCode,
  ArrowRight,
  Store,
  CheckCircle2,
} from "lucide-react";
import ScreenView from "../../layouts/ScreenView";
import { arr1 } from "../../constants/qrTypes";
import { useEffect, useState } from "react";
import HoverButton from "../../components/buttons/HoverButton";
import { useSelector } from "react-redux";

// ─── Data ─────────────────────────────────────────────────────────────────────

const industryMeta = {
  restaurants: { brand: "Los Burgueses" },
  gym: { brand: "FitZone" },
  consumer: { brand: "NaturePack" },
  nonprofit: { brand: "GreenHope" },
  retailers: { brand: "ShopLocal" },
  software: { brand: "SpaceHeroes" },
};

const ICON_MAP = [
  RefreshCw,
  BarChart2,
  Palette,
  FolderOpen,
  Globe,
  Link2,
  Lock,
  MapPin,
  CalendarDays,
  Users,
  Plug,
  Headphones,
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IndustryPage() {
  const { industry } = useParams();
  const navigate = useNavigate();
  const meta = industryMeta[industry] || industryMeta.retailers;
  const [categoryData, setCategoryData] = useState(null);

  const { isAuthenticated, token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const filtered = arr1?.filter((item) => item.category === industry);
    setCategoryData(filtered?.[0] ?? null);
  }, [industry]);

  // Reset scroll position whenever this page is opened or the industry
  // changes — React Router doesn't reset scroll on client-side navigation,
  // so without this the page opens still scrolled to wherever the previous
  // page left off.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [industry]);

  const handleCreate = () => {
    if(role){
      navigate('/builder')
    } else {
      navigate('/login')
    }
  }

  return (
    <ScreenView>
      <div className="min-h-screen bg-white">
        {/* ── HERO (as-is) ───────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden text-center pt-16 pb-0"
          style={{
            background:
              "linear-gradient(180deg,#ffffff 0%,#eff6ff 55%,#bfdbfe 85%,#93c5fd 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto px-6"
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
              {categoryData?.heading}
            </h1>
            <p className="text-gray-500 text-base mb-8 max-w-xl mx-auto leading-relaxed">
              {categoryData?.description}
            </p>
            <div className="flex items-center justify-center">
              <HoverButton onClick={() => navigate("/")}>
                Try it for free →
              </HoverButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 55 }}
            className="max-w-[350px] h-[600px] mx-auto mt-12"
          >
            <div className="bg-white rounded-t-[14px] overflow-hidden">
              <img
                src={categoryData?.bannerImg}
                alt="app preview"
                className="w-full h-auto object-fit"
              />
              <div className="p-4 border-t border-gray-100">
                <p className="font-bold text-gray-900 text-sm mb-0.5">
                  {meta.brand}
                </p>
                <p className="text-gray-400 text-xs mb-3">
                  Premium Collection · New Arrivals
                </p>
                <div className="bg-blue-600 text-white text-center py-2 rounded-md text-sm font-semibold">
                  Shop collection
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── STICKY LEFT + USE CASES RIGHT ─────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-[400px_1fr] gap-20 items-start">
            {/* LEFT — sticky card */}
            <div className="md:sticky top-20 self-start space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl p-7 bg-blue-600 shadow-[0_12px_40px_rgba(37,99,235,0.30)]"
              >
                {/* bg rings */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[24px] border-white/10 pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-[18px] border-white/10 pointer-events-none" />

                {/* icon */}
                <div className="relative w-16 h-16 bg-white/15 rounded-xl flex items-center justify-center mb-5">
                  <Store size={40} className="text-white" />
                </div>

                <h3
                  className="relative text-white text-2xl mb-3 leading-snug"
                  style={{ fontWeight: 600 }}
                >
                  {categoryData?.sideBoxHeading}
                </h3>
                <p className="relative text-blue-100/80 text-lg leading-relaxed mb-6">
                  {categoryData?.sideBoxContent}
                </p>
              </motion.div>
            </div>

            {/* RIGHT — use case items */}
            <div className="flex flex-col gap-14">
              {categoryData?.rightSideContent?.map((uc, i) => {
                const { imgLink, iconLink, smallTitle, title, description } =
                  uc;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="rounded-2xl overflow-hidden mb-5 border border-gray-100 bg-gray-50">
                      <img
                        src={imgLink}
                        alt={title}
                        className="w-full h-auto object-fit hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {iconLink ? (
                        <img src={iconLink} className="w-4 h-4" />
                      ) : (
                        <QrCode size={14} className="text-blue-500" />
                      )}
                      <span className="text-xs font-black tracking-[0.16em] text-blue-500 uppercase">
                        {smallTitle}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-snug">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">
                      {description}
                    </p>

                    <div className="flex items-center gap-3">
                      <HoverButton onClick={handleCreate}>
                        Create QR Code
                      </HoverButton>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── COMPLETE SOLUTION ──────────────────────────────────────── */}
        <section className="bg-[#f4f8ff] py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                    <QrCode size={14} className="text-white" />
                  </div>
                  <span className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase">
                    QR Smart
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-5 leading-snug">
                  Complete Solution for Marketing with QR Codes
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Adapt your QR codes to your brand image, incorporating
                  corporate colors and your logo. Monitor performance and modify
                  your content even after printing.
                </p>
                <HoverButton onClick={() => navigate("/")}>
                  Try it now
                </HoverButton>
              </motion.div>

              {/* right — checklist */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-4"
              >
                {[
                  {
                    Icon: Palette,
                    title: "Custom Branding",
                    desc: "Your logo, colors & style",
                  },
                  {
                    Icon: BarChart2,
                    title: "Real-time Analytics",
                    desc: "Track scans, devices, location",
                  },
                  {
                    Icon: RefreshCw,
                    title: "Edit After Printing",
                    desc: "Change content anytime",
                  },
                  {
                    Icon: Globe,
                    title: "Multi-language Support",
                    desc: "Reach a global audience",
                  },
                ].map(({ Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 bg-white border border-blue-100 rounded-xl px-5 py-4 shadow-sm"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ALL PLANS ──────────────────────────────────────────────── */}
        <section className="bg-[#f7f9ff] py-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
            >
              <div>
                <span className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase mb-3 block">
                  What's included
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                  All plans include
                </h2>
              </div>
              <p className="text-gray-600 text-base md:text-right md:max-w-md leading-relaxed">
                Every feature you need to run, track, and grow — no hidden
                limits.
              </p>
            </motion.div>

            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryData?.plans?.map((f, i) => {
                const { title, line } = f;
                const Icon = ICON_MAP[i % ICON_MAP.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.045 }}
                    className="group flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border border-blue-50 hover:border-blue-300 hover:shadow-[0_6px_24px_rgba(59,130,246,0.12)] transition-all duration-300"
                  >
                    {/* icon */}
                    <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_4px_12px_rgba(37,99,235,0.30)]">
                      <Icon size={18} className="text-white" />
                    </div>

                    {/* text */}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 leading-tight">
                        {title}
                      </p>
                      {line && (
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                          {line}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BOOST YOUR BUSINESS ────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 px-6 text-center"
          style={{
            background:
              "linear-gradient(135deg,#1d4ed8 0%,#2563eb 60%,#1e40af 100%)",
          }}
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
              Boost your business
            </h2>
            <p className="text-blue-100/80 text-base mb-10 max-w-sm mx-auto leading-relaxed">
              Join 500,000+ businesses using QRFY to grow their reach and
              revenue.
            </p>
            <div className="flex items-center justify-center">
              <HoverButton onClick={() => navigate("/")}>
                Get started now
              </HoverButton>
            </div>
          </motion.div>
        </section>
      </div>
    </ScreenView>
  );
}
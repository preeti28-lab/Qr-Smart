// PATH: src/app/builder/Builder.jsx
import React, { useEffect, useMemo, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import QRViewer from "../../layouts/QRViewer";
import QRButton from "../../components/buttons/QRButton";

import { MdOutlineVideoLibrary, MdSearch, MdClose } from "react-icons/md";
import { AiOutlineGlobal, AiOutlineMail, AiOutlineMobile } from "react-icons/ai";
import {
  FaRegAddressCard,
  FaRegFileImage,
  FaRegFilePdf,
  FaThumbsUp,
  FaWhatsapp,
} from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { TfiWorld } from "react-icons/tfi";
import { VscListUnordered } from "react-icons/vsc";
import { IoIosBusiness } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { IoCalendar, IoWifiSharp } from "react-icons/io5";
import { GiWineBottle } from "react-icons/gi";
import { LiaComment, LiaSmsSolid } from "react-icons/lia";
import { BsFiletypeMp3 } from "react-icons/bs";
import { BiSolidPlaylist } from "react-icons/bi";
import { HiOutlineRefresh, HiOutlineLockClosed } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { setAction } from "../../redux/features/action";
import { jwtDecode } from "jwt-decode";
import { setToken } from "../../redux/features/auth";
import { toast } from "react-toastify";
import {
  setDummyTextForQr,
  setDummyVCDetails,
  setQrType,
} from "../../redux/features/dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import createAxiosInstance from "../../config/axiosConfig";
import { setUser } from "../../redux/features/user";
import usePath from "../../hooks/usePath";

const ICON = 22;

/**
 * Single source of truth for the type picker.
 * `type` strings are IDENTICAL to the previous hard-coded QRButtons — do not rename,
 * the whole builder + backend switch on these values.
 */
const QR_TYPES = [
  // ── Dynamic ─────────────────────────────────────────────────────────────
  { family: "dynamic", type: "pdf", text: "PDF", desc: "Show a PDF", tint: "#E11D48", icon: <FaRegFilePdf size={ICON} />, keywords: "document brochure catalogue file" },
  { family: "dynamic", type: "image", text: "Images", desc: "Show an image gallery", tint: "#7C3AED", icon: <FaRegFileImage size={ICON} />, keywords: "photo gallery picture" },
  { family: "dynamic", type: "video", text: "Video", desc: "Show a video", tint: "#2563EB", icon: <MdOutlineVideoLibrary size={ICON} />, keywords: "mp4 youtube clip reel" },
  { family: "dynamic", type: "app", text: "App", desc: "Redirect to an app store", tint: "#0EA5E9", icon: <AiOutlineMobile size={ICON} />, keywords: "play store ios android download" },
  { family: "dynamic", type: "coupon", text: "Coupon", desc: "Share a coupon", tint: "#F59E0B", icon: <AiOutlineGlobal size={ICON} />, keywords: "discount offer voucher promo" },
  { family: "dynamic", type: "vCardPlus", text: "vCard Plus", desc: "Share contact details", tint: "#0D9488", icon: <FaRegAddressCard size={ICON} />, keywords: "contact business card profile" },
  { family: "dynamic", type: "socialMedia", text: "Social Media", desc: "Share your social profiles", tint: "#DB2777", icon: <FaThumbsUp size={ICON} />, keywords: "instagram facebook linkedin x" },
  { family: "dynamic", type: "business", text: "Business", desc: "Share information about your business", tint: "#1D4ED8", icon: <IoIosBusiness size={ICON} />, keywords: "company store shop hours" },
  { family: "dynamic", type: "listOfLinks", text: "List of links", desc: "Group links in one page", tint: "#6366F1", icon: <CiCircleList size={ICON} />, keywords: "linktree bio page group" },
  { family: "dynamic", type: "event", text: "Event", desc: "Promote and share an event", tint: "#EA580C", icon: <IoCalendar size={ICON} />, keywords: "calendar invite rsvp ticket" },
  { family: "dynamic", type: "product", text: "Product", desc: "Group information about your product", tint: "#16A34A", icon: <GiWineBottle size={ICON} />, keywords: "packaging label sku" },
  { family: "dynamic", type: "feedback", text: "Feedback", desc: "Collect feedback and get rated", tint: "#9333EA", icon: <LiaComment size={ICON} />, keywords: "review rating survey stars" },
  { family: "dynamic", type: "menu", text: "Menu", desc: "Display the menu of a restaurant or bar", tint: "#C2410C", icon: <VscListUnordered size={ICON} />, keywords: "restaurant cafe food dishes" },
  { family: "dynamic", type: "mp3", text: "MP3", desc: "Play an audio file", tint: "#4F46E5", icon: <BsFiletypeMp3 size={ICON} />, keywords: "audio sound song podcast" },
  { family: "dynamic", type: "playlist", text: "Playlist", desc: "Share your own music", tint: "#059669", icon: <BiSolidPlaylist size={ICON} />, keywords: "spotify music tracks album" },

  // ── Static ──────────────────────────────────────────────────────────────
  { family: "static", type: "text", text: "Text", desc: "Display plain text", tint: "#475569", icon: <TiDocumentText size={ICON} />, keywords: "note message plain" },
  { family: "static", type: "vCard", text: "vCard", desc: "Share and store your contact details", tint: "#0D9488", icon: <FaRegAddressCard size={ICON} />, keywords: "contact phonebook card" },
  { family: "static", type: "url", text: "URL", desc: "Open a URL", tint: "#2563EB", icon: <TfiWorld size={ICON} />, keywords: "link website web address" },
  { family: "static", type: "whatsapp", text: "WhatsApp", desc: "Send a WhatsApp message", tint: "#16A34A", icon: <FaWhatsapp size={ICON} />, keywords: "chat message wa" },
  { family: "static", type: "wifi", text: "Wi-Fi", desc: "Connect to a Wi-Fi network", tint: "#0EA5E9", icon: <IoWifiSharp size={ICON} />, keywords: "network password ssid guest" },
  { family: "static", type: "email", text: "Email", desc: "Send an email with a predefined text", tint: "#E11D48", icon: <AiOutlineMail size={ICON} />, keywords: "mail inbox message" },
  { family: "static", type: "sms", text: "SMS", desc: "Send a text message", tint: "#7C3AED", icon: <LiaSmsSolid size={ICON} />, keywords: "text message mobile" },
];

/* Quiet-zone module texture — the same dot grid a QR code is built from. */
const MODULE_TEXTURE = {
  backgroundImage:
    "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

const SectionHeading = ({ label, caption, count, tone, icon }) => (
  <div className="w-full flex flex-wrap items-center gap-x-3 gap-y-2">
    <div className="flex items-center gap-x-2.5">
      <span
        className="grid place-items-center w-7 h-7 rounded-lg"
        style={{ backgroundColor: `${tone}14`, color: tone }}
      >
        {icon}
      </span>
      <h2 className="text-[17px] font-bold text-slate-900 tracking-[-0.02em]">
        {label}
      </h2>
      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 rounded-full px-2 py-[3px] leading-none">
        {count}
      </span>
    </div>
    <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
    <p className="text-[12.5px] font-medium text-slate-500 w-full sm:w-auto">
      {caption}
    </p>
  </div>
);

const Builder = () => {
  const dispatch = useDispatch();
  const path = usePath();
  const axiosInstance = createAxiosInstance();
  const { user } = useAuth0();

  const [qrType, setQRType] = useState();
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all"); // all | dynamic | static

  const onHover = (hover) => {
    dispatch(setAction({ mobileFrame: hover }));
  };

  useEffect(() => {
    dispatch(setQrType(qrType));
  }, [qrType]);

  useEffect(() => {
    dispatch(setDummyTextForQr(null));
    dispatch(setDummyVCDetails(null));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      loginHandler({ name: user?.name, email: user?.email });
    }
  }, [user]);

  const loginHandler = async (payload) => {
    try {
      const response = await axiosInstance.post("/user/loginViaOauth", payload);
      const token = response.data.token;

      if (token) {
        const decoded = jwtDecode(token);
        const abilityUser = decoded.foundUser;
        const userData = decoded.foundUser;

        dispatch(
          setToken({
            token,
            isAuthenticated: true,
            role: abilityUser?.profile ? abilityUser.profile : null,
            ability: {
              departments: abilityUser?.userDepartment,
              profile: abilityUser?.profile,
            },
            paidPlan: abilityUser?.paidPlan,
            trialPlanUsed: abilityUser?.trialPlanUsed,
            userId: abilityUser?._id,
          })
        );
        dispatch(setUser({ userData }));
      }
    } catch (error) {
      let message = "ERROR";
      if (Object.prototype.hasOwnProperty.call(error, "response")) {
        message = error.response.data.message;
      }
      toast.warning(message, { position: "top-right", autoClose: 7000 });
    }
  };

  /** One place that owns "a type was picked". */
  const handleSelect = (type) => {
    setQRType({ type });
    dispatch(setQrType({ type }));
    path.push("content");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QR_TYPES.filter((item) => {
      const familyOk = family === "all" || item.family === family;
      if (!familyOk) return false;
      if (!q) return true;
      return `${item.text} ${item.desc} ${item.keywords}`.toLowerCase().includes(q);
    });
  }, [query, family]);

  const dynamicList = filtered.filter((i) => i.family === "dynamic");
  const staticList = filtered.filter((i) => i.family === "static");

  const TabButton = ({ value, label, count }) => {
    const active = family === value;
    return (
      <button
        type="button"
        onClick={() => setFamily(value)}
        className={`relative px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-200
          ${active
            ? "bg-white text-slate-900 shadow-[0_1px_3px_rgba(15,23,42,0.12)]"
            : "text-slate-500 hover:text-slate-800"}`}
      >
        {label}
        <span className={`ml-1.5 text-[11px] font-bold ${active ? "text-blue-600" : "text-slate-400"}`}>
          {count}
        </span>
      </button>
    );
  };

  const Grid = ({ items }) => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 w-full">
      {items.map((item) => (
        <QRButton
          key={item.type}
          icon={item.icon}
          text={item.text}
          desc={item.desc}
          tint={item.tint}
          type={item.type}
          onHover={onHover}
          onSelect={handleSelect}
          active={qrType?.type === item.type}
        />
      ))}
    </div>
  );

  return (
    <AppViewer>
      <QRViewer
        className="flex flex-col gap-y-7"
        title=""
        showNavigate={false}
        qrType={qrType}
      >
        {/* ── Hero band ───────────────────────────────────────────────── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl px-5 py-6 sm:px-7 sm:py-7"
          style={{
            background:
              "linear-gradient(135deg, #0B1E3F 0%, #12336E 55%, #1B57E3 140%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={MODULE_TEXTURE} />
          {/* finder-pattern watermark */}
          <svg
            className="absolute -right-6 -bottom-10 opacity-[0.10] hidden sm:block"
            width="190" height="190" viewBox="0 0 48 48" fill="none"
          >
            <rect x="3" y="3" width="17" height="17" rx="3" stroke="#fff" strokeWidth="3.5" />
            <rect x="9" y="9" width="5" height="5" fill="#fff" />
            <rect x="28" y="3" width="17" height="17" rx="3" stroke="#fff" strokeWidth="3.5" />
            <rect x="34" y="9" width="5" height="5" fill="#fff" />
            <rect x="3" y="28" width="17" height="17" rx="3" stroke="#fff" strokeWidth="3.5" />
            <rect x="9" y="34" width="5" height="5" fill="#fff" />
            <rect x="28" y="28" width="6" height="6" fill="#fff" />
            <rect x="39" y="28" width="6" height="6" fill="#fff" />
            <rect x="28" y="39" width="6" height="6" fill="#fff" />
          </svg>

          <div className="relative flex flex-col gap-y-4">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-200/90">
              Step 1 of 3
            </span>
            <div className="flex flex-col gap-y-1.5 max-w-xl">
              <h1 className="text-white text-[24px] sm:text-[27px] font-bold leading-[1.15] tracking-[-0.025em]">
                What should your QR code do?
              </h1>
              <p className="text-[13.5px] font-medium text-blue-100/80 leading-snug">
                Pick a type to start. Dynamic codes stay editable after you print them,
                static codes lock their content into the pattern itself.
              </p>
            </div>

            {/* search */}
            <div className="w-full max-w-md relative">
              <MdSearch
                size={19}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a type — menu, wifi, vCard…"
                className="w-full rounded-xl bg-white/95 backdrop-blur border border-white/20 py-2.5 pl-11 pr-10
                  text-[14px] font-medium text-slate-800 placeholder:text-slate-400 placeholder:font-normal
                  outline-none focus:bg-white focus:ring-2 focus:ring-white/40 transition-all duration-200"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <MdClose size={17} />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* ── Filter tabs ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3 flex-wrap -mt-1">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100/90 border border-slate-200/70">
            <TabButton value="all" label="All types" count={QR_TYPES.length} />
            <TabButton value="dynamic" label="Dynamic" count={15} />
            <TabButton value="static" label="Static" count={7} />
          </div>
          {query ? (
            <p className="text-[12.5px] font-medium text-slate-500">
              {filtered.length} {filtered.length === 1 ? "match" : "matches"} for “{query}”
            </p>
          ) : null}
        </div>

        {/* ── Results ─────────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="w-full rounded-2xl border border-dashed border-slate-300 bg-white py-14 px-6 flex flex-col items-center gap-y-2 text-center">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-slate-100 text-slate-400">
              <MdSearch size={22} />
            </span>
            <h3 className="text-[15px] font-semibold text-slate-800">
              No type matches “{query}”
            </h3>
            <p className="text-[13px] text-slate-500 max-w-sm">
              Try a shorter word, or browse all 22 types.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFamily("all");
              }}
              className="mt-2 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-y-7 w-full">
            {dynamicList.length > 0 && (
              <section className="flex flex-col gap-y-4 w-full">
                <SectionHeading
                  label="Dynamic QR"
                  caption="Edit the content anytime — the printed code never changes"
                  count={dynamicList.length}
                  tone="#1B57E3"
                  icon={<HiOutlineRefresh size={15} />}
                />
                <Grid items={dynamicList} />
              </section>
            )}

            {staticList.length > 0 && (
              <section className="flex flex-col gap-y-4 w-full">
                <SectionHeading
                  label="Static QR"
                  caption="Content is baked into the pattern and can't be changed later"
                  count={staticList.length}
                  tone="#0F766E"
                  icon={<HiOutlineLockClosed size={15} />}
                />
                <Grid items={staticList} />
              </section>
            )}
          </div>
        )}
      </QRViewer>
    </AppViewer>
  );
};

export default Builder;
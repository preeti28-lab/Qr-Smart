import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import handleLogout from "../../constants/handleLogout";
import logo from "../../assets/qrlogo.png";

import {
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX,
  FiCode,
  FiUser,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import apiPromoImg from "../../assets/images/api-promo.png";
import {
  HiOutlineBookOpen,
  HiOutlineQuestionMarkCircle,
  HiOutlineOfficeBuilding,
  HiOutlineBriefcase,
  HiOutlineTag,
  HiOutlineDocumentText,
} from "react-icons/hi";
import {
  MdQrCode2,
  MdBarChart,
  MdLink,
  MdContentCopy,
  MdDownload,
  MdTrackChanges,
  MdDomain,
  MdGridView,
  MdEventNote,
  MdLock,
  MdGroup,
  MdEdit,
  MdOutlineCategory,
} from "react-icons/md";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    icon: MdQrCode2,
    label: "Static QR",
    desc: "Permanent and unalterable QR codes.",
    to: "/products/static-qrs",
    accent: "blue",
  },
  {
    icon: MdContentCopy,
    label: "Bulk creation and download",
    desc: "Generate and download QRs in bulk.",
    to: "/products/bulk-creation",
    accent: "blue",
  },
  {
    icon: MdLink,
    label: "Dynamic QR",
    desc: "QR codes updateable in real time.",
    to: "/products/dynamic-qr",
    accent: "indigo",
  },
  {
    icon: MdTrackChanges,
    label: "Google pixel integration",
    desc: "Improve the analysis of your digital campaigns.",
    to: "/products/integrations",
    accent: "green",
  },
  {
    icon: MdDownload,
    label: "Variety of download formats",
    desc: "Export QR codes in multiple formats.",
    to: "/products/download-variety",
    accent: "green",
  },
  {
    icon: MdDomain,
    label: "Custom Domain",
    desc: "Strengthen your brand with your own domain.",
    to: "/products/custom-domains",
    accent: "violet",
  },
  {
    icon: MdGroup,
    label: "Limited contributing users",
    desc: "Manage your QRs as a team.",
    to: "/products/collaborators",
    accent: "orange",
  },
  {
    icon: MdGridView,
    label: "Templates",
    desc: "Save and reuse your own designs.",
    to: "/products/templates",
    accent: "orange",
  },
  {
    icon: MdBarChart,
    label: "Complete analytics",
    desc: "Understand performance with insights.",
    to: "/products/analytics",
    accent: "indigo",
  },
  {
    icon: MdEventNote,
    label: "Event tracking",
    desc: "Track scans and user interactions.",
    to: "/products/event-tracking",
    accent: "blue",
  },
  {
    icon: MdEdit,
    label: "Editing and management of QRs",
    desc: "Customize and organize your QRs.",
    to: "/products/edit-and-management",
    accent: "pink",
  },
  {
    icon: MdLock,
    label: "Password access protection",
    desc: "Secure your codes with password.",
    to: "/products/access-protection",
    accent: "green",
  },
];

const RESOURCES = [
  {
    icon: HiOutlineBookOpen,
    label: "Types of QR Code",
    desc: "Guides, APIs & integration docs",
    to: "/qr-types",
    accent: "blue",
  },
  {
    icon: HiOutlineOfficeBuilding,
    label: "QR Codes for",
    desc: "Guides, APIs & integration docs",
    to: "/resources/qr-types-bussiness",
    accent: "violet",
  },
  {
    icon: HiOutlineBriefcase,
    label: "QR Codes On",
    desc: "QR codes across industries",
    to: "/resources/qr-codes-on",
    accent: "orange",
  },
  {
    icon: MdQrCode2,
    label: "QR Code Generator",
    desc: "Generate your qr code now",
    to: "/builder",
    accent: "green",
  },
];

// Pastel icon tiles - har item ka apna accent
const ACCENTS = {
  blue: "bg-blue-50 text-blue-600",
  indigo: "bg-indigo-50 text-indigo-600",
  violet: "bg-violet-50 text-violet-600",
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-500",
  pink: "bg-pink-50 text-pink-500",
};

const PRODUCTS_HEADING = {
  title: "Everything you need to create, manage",
  subtitle: "and analyze QR codes effortlessly.",
  badge: "Powerful • Secure • Scalable",
};

const RESOURCES_HEADING = {
  title: "Learn, explore and build",
  subtitle: "Guides and tools for every QR use case.",
  badge: "Guides • Docs • Tools",
};

// Simple top-level links, each with its own leading icon (matches reference)
const SIMPLE_LINKS = [
  { icon: HiOutlineTag, label: "Pricing", to: "/pricing" },
  { icon: HiOutlineQuestionMarkCircle, label: "FAQ", to: "/faq" },
  { icon: HiOutlineDocumentText, label: "Blog", to: "/blogs" },
  { icon: FiCode, label: "API", to: "/docs/QR" },
];

// ─── Dropdown decoration (waves + dots, hero jaisa) ──────────────────────────
const PanelDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl" />
    <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

    <svg
      className="absolute inset-y-0 right-0 h-full w-1/2"
      viewBox="0 0 400 400"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M ${90 + i * 48} -20 C ${230 + i * 34} ${70 + i * 8}, ${300 + i * 28} ${180 + i * 5}, ${260 + i * 42} 430`}
          stroke="#a9bdf0"
          strokeWidth="1"
          strokeOpacity={0.3 - i * 0.045}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>

    {/* dot grids */}
    {[
      "left-6 bottom-6",
      "right-8 top-5",
      "left-1/3 -bottom-1",
    ].map((pos) => (
      <div key={pos} className={`absolute ${pos}`}>
        <div className="grid grid-cols-4 grid-rows-3 gap-[6px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-[2px] w-[2px] rounded-full bg-blue-300/45" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

// ─── Dropdown Item Card ───────────────────────────────────────────────────────
const DropdownItem = ({ item, onSelect }) => {
  const Icon = item.icon;

  const handleClick = () => {
    // Menu turant band karo - warna same page par click karne par pathname
    // nahi badalta aur panel khula reh jaata hai.
    onSelect?.();
    // Router scroll reset nahi karta, isliye naya page top se dikhe.
    window.scrollTo({ top: 0 });
  };

  return (
    <Link
      to={item.to}
      onClick={handleClick}
      className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3 transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-[0_10px_24px_-16px_rgba(15,23,42,0.5)]"
    >
      <span
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${
          ACCENTS[item.accent] || ACCENTS.blue
        }`}
      >
        <Icon size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold leading-tight text-slate-900 transition-colors group-hover:text-blue-600">
            {item.label}
          </span>
          {item.badge && (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                item.badge === "New"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[12.5px] leading-snug text-slate-500">
          {item.desc}
        </p>
      </div>

      <FiChevronRight
        size={16}
        className="flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500"
      />
    </Link>
  );
};

// ─── Promo Card ───────────────────────────────────────────────────────────────
const PromoCard = ({ onSelect }) => (
  <div className="relative hidden flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#4f46e5] via-[#5b3fdd] to-[#7c3aed] p-6 lg:flex">
    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

    <h4 className="relative text-[20px] font-bold leading-tight text-white">
      Integrate. Automate.
      <br />
      <span className="text-[#f0a6ff]">Supercharge.</span>
    </h4>
    <p className="relative mt-3 text-[13px] leading-relaxed text-indigo-100/90">
      Seamless API integration to build powerful QR experiences.
    </p>

    <Link
      to="/docs/QR"
      onClick={() => {
        onSelect?.();
        window.scrollTo({ top: 0 });
      }}
      className="relative mt-5 inline-flex w-max items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-slate-800"
    >
      Explore API Docs
      <FiArrowRight size={14} />
    </Link>

    <img
      src={apiPromoImg}
      alt=""
      aria-hidden="true"
      className="relative mt-auto w-full select-none object-contain pt-5"
      draggable="false"
    />
  </div>
);

// ─── Dropdown Panel ───────────────────────────────────────────────────────────
const DropdownPanel = ({
  items,
  isOpen,
  columns = 1,
  heading,
  promo,
  onSelect,
}) => (
  <div
    className={`fixed left-1/2 top-[76px] -translate-x-1/2 w-[calc(100vw-2rem)] origin-top overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-[#fbfbff] to-[#f3f2ff] shadow-[0_28px_70px_-24px_rgba(15,23,42,0.4)] transition-all duration-200 ${
      promo ? "max-w-[1140px]" : "max-w-[760px]"
    } ${
      isOpen
        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
        : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
    }`}
    style={{ zIndex: 100 }}
  >
    <PanelDecor />

    <div className="relative max-h-[calc(100vh-100px)] overflow-y-auto p-5 md:p-6">
      {/* Header */}
      {heading && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white shadow-lg shadow-indigo-500/25">
              <HiSparkles size={22} />
            </span>
            <div>
              <p className="text-[16px] font-bold leading-tight text-slate-900">
                {heading.title}
              </p>
              <p className="text-[13.5px] text-slate-500">{heading.subtitle}</p>
            </div>
          </div>

          {heading.badge && (
            <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12.5px] font-medium text-slate-600 shadow-sm">
              <FiShield size={14} className="text-blue-600" />
              {heading.badge}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div
        className={`grid gap-3 ${promo ? "lg:grid-cols-[minmax(0,1fr)_320px]" : ""}`}
      >
        <div
          className={`grid gap-2.5 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}
        >
          {items.map((item) => (
            <DropdownItem key={item.to} item={item} onSelect={onSelect} />
          ))}
        </div>

        {promo && <PromoCard onSelect={onSelect} />}
      </div>
    </div>
  </div>
);

// ─── Nav Dropdown Trigger ─────────────────────────────────────────────────────
// Controlled - open state Navbar me rehta hai taaki ek waqt me sirf ek hi
// nav item highlighted ho.
const NavDropdown = ({
  label,
  icon: Icon,
  items,
  columns,
  heading,
  promo,
  isOpen,
  onToggle,
  onClose,
}) => {
  const ref = useRef(null);

  // Sirf khula hua dropdown hi outside-click sunta hai.
  // Warna doosre (band) dropdown ka listener bhi chalta tha: uske ref ke bahar
  // click hone par wo shared openMenu ko mousedown par hi null kar deta tha,
  // panel pointer-events-none ho jaata tha aur click kabhi <Link> tak
  // pahunchta hi nahi tha - isliye koi page open nahi hota tha.
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 text-[15px] font-medium px-3.5 py-2 rounded-full transition-colors duration-150 ${
          isOpen
            ? "text-blue-600 bg-blue-50"
            : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
        }`}
      >
        {Icon && <Icon size={17} className="text-blue-600" />}
        {label}
        <FiChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <DropdownPanel
        items={items}
        isOpen={isOpen}
        columns={columns}
        heading={heading}
        promo={promo}
        onSelect={onClose}
      />
    </div>
  );
};

// ─── Nav Link (with leading icon, pill style) ─────────────────────────────────
const NavLink = ({ to, icon: Icon, children, menuOpen, onSelect }) => {
  const { pathname } = useLocation();
  // Koi dropdown khula ho to highlight usi ka - links normal rehte hain
  const active = !menuOpen && pathname === to;
  return (
    <Link
      to={to}
      onClick={onSelect}
      className={`flex items-center gap-1.5 text-[15px] font-medium px-3.5 py-2 rounded-full transition-colors duration-150 ${
        active
          ? "text-blue-600 bg-blue-50"
          : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
      }`}
    >
      {Icon && <Icon size={17} className="text-blue-600" />}
      {children}
    </Link>
  );
};

// ─── Mobile Accordion ─────────────────────────────────────────────────────────
const MobileSection = ({ label, icon: SectionIcon, items, onSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-semibold text-slate-800"
      >
        <span className="flex items-center gap-2">
          {SectionIcon && <SectionIcon size={17} className="text-blue-600" />}
          {label}
        </span>
        <FiChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-[500px]" : "max-h-0"}`}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => {
                onSelect?.();
                window.scrollTo({ top: 0 });
              }}
              className="flex items-center gap-3 px-6 py-2.5 hover:bg-blue-50 transition-colors"
            >
              <span className="text-blue-600">
                <Icon size={17} />
              </span>
              <span className="text-[14px] font-medium text-slate-700">
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto ${
                    item.badge === "New"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { logout } = useAuth0();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Ek waqt me sirf ek dropdown khula - aur khula hone par wahi highlighted
  const [openMenu, setOpenMenu] = useState(null);

  const closeMenu = useCallback(() => setOpenMenu(null), []);
  const toggleMenu = useCallback(
    (label) => setOpenMenu((v) => (v === label ? null : label)),
    [],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { pathname } = useLocation();
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const doLogout = useCallback(() => {
    handleLogout();
    logout();
  }, [logout]);

  return (
    <>
      {/* Full-width solid navbar - scroll par content iske peeche chhup jaata hai */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-shadow duration-300 ${
          scrolled
            ? "border-blue-100 shadow-[0_10px_30px_-16px_rgba(37,99,235,0.35)]"
            : "border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[68px] px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="QR Smart logo" className="h-11 w-auto" />
            <span className="font-black text-[22px] tracking-tight text-slate-900 qr-logo">
              QR<span className="text-[#1578bc] qr-logo pl-1">Smart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavDropdown
              label="Products"
              icon={MdOutlineCategory}
              items={PRODUCTS}
              columns={2}
              heading={PRODUCTS_HEADING}
              promo
              isOpen={openMenu === "Products"}
              onToggle={() => toggleMenu("Products")}
              onClose={closeMenu}
            />
            <NavDropdown
              label="Resources"
              icon={HiOutlineBookOpen}
              items={RESOURCES}
              columns={2}
              heading={RESOURCES_HEADING}
              isOpen={openMenu === "Resources"}
              onToggle={() => toggleMenu("Resources")}
              onClose={closeMenu}
            />
            {SIMPLE_LINKS.map(({ icon, label, to }) => (
              <NavLink
                key={to}
                to={to}
                icon={icon}
                menuOpen={!!openMenu}
                onSelect={closeMenu}
              >
                {label}
              </NavLink>
            ))}
            {token && (
              <NavLink
                to="/builder"
                icon={MdQrCode2}
                menuOpen={!!openMenu}
                onSelect={closeMenu}
              >
                Builder
              </NavLink>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {token ? (
              <button
                onClick={doLogout}
                className="text-[15px] font-semibold px-5 py-2.5 rounded-full border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-[15px] font-semibold px-5 py-2.5 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-all"
                >
                  <FiUser size={16} />
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 text-[15px] font-semibold px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-[0_6px_18px_-6px_rgba(37,99,235,0.6)]"
                >
                  Start free
                  <FiArrowRight size={16} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors text-slate-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[80vw] max-w-[320px] md:hidden bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <img src={logo} alt="QR Smart logo" className="h-8 w-auto" />
            <span className="font-black text-[16px] tracking-tight text-slate-900 uppercase">
              QR<span className="text-[#1578bc]">Smart</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
          <MobileSection
            label="Products"
            icon={MdOutlineCategory}
            items={PRODUCTS}
            onSelect={() => setMobileOpen(false)}
          />
          <MobileSection
            label="Resources"
            icon={HiOutlineBookOpen}
            items={RESOURCES}
            onSelect={() => setMobileOpen(false)}
          />

          <div className="py-2">
            {SIMPLE_LINKS.map(({ icon: Icon, label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => {
                  setMobileOpen(false);
                  window.scrollTo({ top: 0 });
                }}
                className="flex items-center gap-3 px-4 py-3 text-[15px] font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Icon size={17} className="text-blue-600" />
                {label}
              </Link>
            ))}
          </div>

          <div className="p-4">
            {token ? (
              <button
                onClick={doLogout}
                className="w-full text-[15px] font-semibold py-3 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <div className="flex flex-col gap-2.5">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center gap-1.5 text-[15px] font-semibold py-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all"
                >
                  <FiUser size={16} />
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center gap-1.5 text-[15px] font-semibold py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-[0_6px_18px_-6px_rgba(37,99,235,0.6)]"
                >
                  Start free
                  <FiArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer so page content isn't hidden behind the fixed navbar */}
      <div className="h-[68px]" />
    </>
  );
};

export default Navbar;

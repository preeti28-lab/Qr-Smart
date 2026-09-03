import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import { useSelector } from "react-redux";

const features = [
  {
    id: 0,
    title: "Editing & Management",
    short: "Customize and organize your QRs",
    desc: "Full control over every QR code you create. Update colors, logos, shapes, and redirect URLs at any time. Group codes into folders and manage hundreds in one workspace.",
    href: "/products/edit-and-management",
    tag: "Core",
    tagColor: "bg-blue-100 text-blue-600",
    accent: "#3b82f6",
    lightBg: "#eff6ff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    id: 1,
    title: "Dynamic QR Codes",
    short: "Update destinations in real time",
    desc: "Change what your QR code points to without reprinting. Perfect for menus, campaigns, and time-sensitive content. Track every version with full scan history.",
    href: "/products/dynamic-qr",
    tag: "Popular",
    tagColor: "bg-violet-100 text-violet-600",
    accent: "#8b5cf6",
    lightBg: "#f5f3ff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Complete Analytics",
    short: "Understand performance with detailed data",
    desc: "Real-time dashboards showing scan counts, locations, devices, and time patterns. Export reports as CSV or connect to your BI tools for deeper analysis.",
    href: "/products/analytics",
    tag: "Insights",
    tagColor: "bg-emerald-100 text-emerald-600",
    accent: "#10b981",
    lightBg: "#ecfdf5",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Unlimited Contributors",
    short: "Manage QR codes as a team",
    desc: "Invite teammates with role-based permissions. Assign editors, viewers, or admins. Perfect for agencies managing multiple client accounts from one dashboard.",
    href: "/products/collaborators",
    tag: "Teams",
    tagColor: "bg-amber-100 text-amber-600",
    accent: "#f59e0b",
    lightBg: "#fffbeb",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Download Formats",
    short: "Expand the possibilities of use",
    desc: "Export in PNG, SVG, PDF, EPS, and more. Choose resolution for print or screen. Embed your QR anywhere — from business cards to billboards.",
    href: "/products/download-variety",
    tag: "Export",
    tagColor: "bg-rose-100 text-rose-600",
    accent: "#f43f5e",
    lightBg: "#fff1f2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Google & Meta Pixel",
    short: "Improve digital campaign analysis",
    desc: "Add retargeting pixels to your QR codes. Build custom audiences, track conversions, and run remarketing campaigns to everyone who scanned your code.",
    href: "/products/integrations",
    tag: "Integrations",
    tagColor: "bg-sky-100 text-sky-600",
    accent: "#0ea5e9",
    lightBg: "#f0f9ff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Bulk Creation",
    short: "Generate QRs on a large scale",
    desc: "Upload a spreadsheet and generate thousands of unique QR codes in seconds. Download them all as a ZIP with consistent styling. Ideal for events, retail, and logistics.",
    href: "/products/bulk-creation",
    tag: "Scale",
    tagColor: "bg-teal-100 text-teal-600",
    accent: "#14b8a6",
    lightBg: "#f0fdfa",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Custom Domain",
    short: "Strengthen your brand identity",
    desc: "Replace generic short links with your own branded domain. Every scan sees your domain — not ours. Build trust and brand recognition at every touchpoint.",
    href: "/products/custom-domains",
    tag: "Branding",
    tagColor: "bg-indigo-100 text-indigo-600",
    accent: "#6366f1",
    lightBg: "#eef2ff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Password Protection",
    short: "Secure access to your QR destinations",
    desc: "Lock sensitive content behind a password. Only people with the code can access the destination. Great for internal docs, private galleries, and VIP content.",
    href: "/products/access-protection",
    tag: "Security",
    tagColor: "bg-pink-100 text-pink-600",
    accent: "#ec4899",
    lightBg: "#fdf2f8",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 9,
    title: "Event Tracking",
    short: "Track custom conversions from every scan",
    desc: "Define custom events and track them from QR scans. Understand the full journey from scan to conversion — see which codes drive real results.",
    href: "/products/event-tracking",
    tag: "Analytics",
    tagColor: "bg-cyan-100 text-cyan-600",
    accent: "#06b6d4",
    lightBg: "#ecfeff",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    id: 10,
    title: "Templates",
    short: "Save and reuse your own designs",
    desc: "Create a QR design you love, save it as a template, and apply it to new codes instantly. Maintain brand consistency across every campaign without repetitive work.",
    href: "/products/templates",
    tag: "Design",
    tagColor: "bg-orange-100 text-orange-600",
    accent: "#f97316",
    lightBg: "#fff7ed",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    id: 11,
    title: "Static QR Codes",
    short: "Permanent QR codes, no account needed",
    desc: "Generate free static QR codes that never expire. Encode a URL, text, vCard, or WiFi credentials permanently into a QR code — no login required.",
    href: "/products/static-qrs",
    tag: "Free",
    tagColor: "bg-lime-100 text-lime-700",
    accent: "#84cc16",
    lightBg: "#f7fee7",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="w-5 h-5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function DetailVisual({ feature }) {
  return (
    <div
      className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-10 relative overflow-hidden"
      style={{ backgroundColor: feature.lightBg }}
    >
      {/* Background circles */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10"
        style={{ backgroundColor: feature.accent }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full opacity-10"
        style={{ backgroundColor: feature.accent }}
      />

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg"
        style={{ backgroundColor: feature.accent }}
      >
        <div className="text-white scale-[2]">{feature.icon}</div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-slate-500 text-center leading-relaxed max-w-xs">
        {feature.desc}
      </p>

      {/* CTA */}
      <Link
        to={feature.href}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
        style={{ backgroundColor: feature.accent }}
      >
        Explore feature
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-3.5 h-3.5"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </Link>
    </div>
  );
}

export default function FeaturesAccordion() {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();
  const { isAuthenticated, token, role } = useSelector((state) => state.auth);

  const handleCreate = () => {
    if (role) {
      navigate("/builder");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#f7faff] to-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="mb-14">
        <SectionHeading title="Your all-in-one marketing platform" />
      </div>

      {/* Main layout: list left + panel right */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* LEFT — Accordion list */}
        <div className="w-full md:w-[52%] flex flex-col divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.3)] overflow-hidden">
          {features.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`w-full text-left flex items-start gap-4 px-4 py-4 transition-all duration-200 group
                  ${isActive ? "bg-blue-50/40" : "hover:bg-slate-50"}`}
              >
                {/* Icon */}
                <div
                  className="mt-0.5 w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? f.accent : f.lightBg,
                    color: isActive ? "#fff" : f.accent,
                  }}
                >
                  {f.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-[15px] font-bold transition-colors duration-200 ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {f.title}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${f.tagColor}`}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-400 leading-relaxed">
                    {f.short}
                  </p>

                  {/* Expanded desc on mobile */}
                  <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${
                      isActive
                        ? "max-h-32 mt-2 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {f.desc}
                    </p>
                    <Link
                      to={f.href}
                      className="inline-flex items-center gap-1 mt-2 text-xs font-semibold"
                      style={{ color: f.accent }}
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {/* Right arrow */}
                <div
                  className="mt-1.5 flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: isActive ? f.accent : "#d4d4d4",
                    transform: isActive ? "translateX(2px)" : "",
                  }}
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT — Sticky detail panel (desktop only) */}
        <div className="hidden md:block w-[48%] sticky top-20">
          <div className="relative h-[480px] w-full">
            {features.map((f) => (
              <div
                key={f.id}
                className="absolute inset-0 transition-all duration-500"
                style={{
                  opacity: active === f.id ? 1 : 0,
                  transform:
                    active === f.id
                      ? "translateY(0) scale(1)"
                      : "translateY(12px) scale(0.98)",
                  pointerEvents: active === f.id ? "auto" : "none",
                }}
              >
                <DetailVisual feature={f} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={handleCreate}
          className="px-7 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
        >
          Create QR Code
        </button>
      </div>
      </div>
    </section>
  );
}

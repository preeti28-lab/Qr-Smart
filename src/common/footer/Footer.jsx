import React from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import FooterLink from "./FooterLink";

import footerImg from "../../assets/images/footerimg.webp";

import {
  FaGlobe,
  FaFont,
  FaWifi,
  FaAddressCard,
  FaEnvelope,
  FaWhatsapp,
  FaSms,
  FaFilePdf,
  FaBox,
  FaImages,
  FaVideo,
  FaLink,
  FaBuilding,
  FaUtensils,
  FaTicketAlt,
  FaMusic,
  FaMobileAlt,
  FaFileAlt,
  FaCalendarAlt,
  FaCommentDots,
  FaList,
  FaShareAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const token = localStorage.getItem("qrmsart");

  const qrTypes = [
    {
      title: "Web page",
      description: "Open a url",
      href: "/qr-type/website",
      icon: <FaGlobe />,
    },
    {
      title: "Text",
      description: "Displays plain text",
      href: "/qr-types",
      icon: <FaFont />,
    },
    {
      title: "Wifi",
      description: "Connect to a WiFi network",
      href: "/qr-types",
      icon: <FaWifi />,
    },
    {
      title: "VCard",
      description: "Share your contact information",
      href: "/qr-type/vcard",
      icon: <FaAddressCard />,
    },
    {
      title: "Email",
      description: "Send an email",
      href: "/qr-types",
      icon: <FaEnvelope />,
    },
    {
      title: "Whatsapp",
      description: "Send WhatsApp message",
      href: "/qr-types",
      icon: <FaWhatsapp />,
    },
    {
      title: "Sms",
      description: "Send a text message",
      href: "/qr-types",
      icon: <FaSms />,
    },
    {
      title: "Pdf",
      description: "Show a PDF",
      href: "/qr-type/pdf",
      icon: <FaFilePdf />,
    },
    {
      title: "Product",
      description: "Group product information",
      href: "/qr-type/product",
      icon: <FaBox />,
    },
    {
      title: "Images",
      description: "Show image gallery",
      href: "/qr-type/images",
      icon: <FaImages />,
    },
    {
      title: "Video",
      description: "Show a video",
      href: "/qr-type/video",
      icon: <FaVideo />,
    },
    {
      title: "Links",
      description: "Group multiple links",
      href: "/qr-type/links",
      icon: <FaLink />,
    },
    {
      title: "Business",
      description: "Share business data",
      href: "/qr-type/business",
      icon: <FaBuilding />,
    },
    {
      title: "Menu",
      description: "Display restaurant menu",
      href: "/qr-type/menu",
      icon: <FaUtensils />,
    },
    {
      title: "Coupon",
      description: "Share a coupon",
      href: "/qr-type/coupon",
      icon: <FaTicketAlt />,
    },
    {
      title: "MP3",
      description: "Play audio file",
      href: "/qr-type/mp3",
      icon: <FaMusic />,
    },
    {
      title: "Apps",
      description: "Redirect to app store",
      href: "/qr-type/app",
      icon: <FaMobileAlt />,
    },
    {
      title: "Landing Page",
      description: "Create custom page",
      href: "/qr-type/landing",
      icon: <FaFileAlt />,
    },
    {
      title: "Event",
      description: "Promote event",
      href: "/qr-type/event",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Feedback",
      description: "Collect feedback",
      href: "/qr-type/feedback",
      icon: <FaCommentDots />,
    },
    {
      title: "Playlist",
      description: "Share music playlist",
      href: "/qr-type/playlist",
      icon: <FaList />,
    },
    {
      title: "Social",
      description: "Share social profiles",
      href: "/qr-types",
      icon: <FaShareAlt />,
    },
  ];

  const socials = [
    { icon: <FaLinkedin size={15} />, label: "LinkedIn" },
    { icon: <FaSquareXTwitter size={15} />, label: "X" },
    { icon: <FaFacebookSquare size={15} />, label: "Facebook" },
  ];

  return (
    <>
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

        `}
      </style>

      <footer className="relative w-full overflow-hidden bg-[#05142c]">
        {/* ── Background: deep navy gradient + faint arcs ── */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 85% at 50% 0%, #123f7d 0%, #0b2a56 32%, #071b3a 65%, #04101f 100%)",
            }}
          />
          <svg
            className="absolute -left-40 top-0 h-[560px] w-[900px] opacity-[0.18]"
            viewBox="0 0 900 560"
            fill="none"
            aria-hidden="true"
          >
            {[140, 200, 260, 320, 380, 440].map((r) => (
              <circle
                key={r}
                cx="180"
                cy="180"
                r={r}
                stroke="#8fb4ff"
                strokeWidth="1"
              />
            ))}
          </svg>
          <svg
            className="absolute -right-52 bottom-10 h-[520px] w-[820px] opacity-[0.14]"
            viewBox="0 0 820 520"
            fill="none"
            aria-hidden="true"
          >
            {[150, 220, 290, 360].map((r) => (
              <circle
                key={r}
                cx="620"
                cy="330"
                r={r}
                stroke="#8fb4ff"
                strokeWidth="1"
              />
            ))}
          </svg>
          <div className="absolute -top-24 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-blue-600/25 blur-3xl" />
        </div>

        <div className="relative z-10 w-full">
          {/* ── CTA SECTION ── */}
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:gap-8 md:py-16 lg:gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-[26px] font-semibold leading-[1.25] text-white md:text-[34px] lg:text-[38px]">
                Try our QR code generator for 7 days free.
              </h3>
              <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-slate-300/80 md:mx-0">
                Experience powerful QR solutions with all premium features.
              </p>

              <button
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-[14px] font-semibold text-white shadow-lg shadow-blue-950/50 transition-colors hover:bg-blue-700"
                onClick={() => navigate(token ? "/builder" : "/register")}
              >
                {token ? "Try Now" : "Register Now"}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2.5 8h11M9.5 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <img
              src={footerImg}
              className="w-full rounded-xl md:justify-self-end"
              alt="qr preview"
            />
          </div>

          {/* ── QR TYPES ── */}
          <div className="scrollbar-hide my-10 w-full overflow-x-auto px-5">
            <section
              className="
                mx-auto grid min-w-max grid-flow-col grid-rows-2
                gap-x-6 gap-y-7 md:min-w-0
                md:grid-flow-row md:grid-cols-4
                lg:max-w-5xl lg:grid-cols-5
              "
            >
              {qrTypes.map((item, index) => {
                const isWhatsapp = item.title === "Whatsapp";

                return (
                  <div
                    key={index}
                    className="group flex min-w-[150px] cursor-pointer items-start gap-3"
                    onClick={() => navigate(item.href)}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[15px] shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg bg-white text-blue-600`}
                    >
                      {item.icon}
                    </span>

                    <div className="min-w-0">
                      <p className="text-[13.5px] font-semibold text-white transition-colors group-hover:text-blue-300">
                        {item.title}
                      </p>
                      <p className="text-[11.5px] leading-snug text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* ── MAIN FOOTER ── */}
          <div className="mx-auto max-w-6xl px-5">
            <section className="grid grid-cols-1 gap-x-8 gap-y-10 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-5">
              {/* BRAND */}
              <div className="flex flex-col gap-y-4">
                <div>
                  <h2 className="qr-logo text-3xl font-bold uppercase text-white">
                    qr smart
                  </h2>
                  <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-slate-400">
                    Create your own QR codes and boost your business or ideas
                  </p>
                </div>

                <div className="flex gap-2.5">
                  {socials.map((social) => (
                    <span
                      key={social.label}
                      aria-label={social.label}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      {social.icon}
                    </span>
                  ))}
                </div>
              </div>

              {/* SERVICE */}
              <div className="flex flex-col gap-y-3.5">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                  Service
                </h2>
                <FooterLink linkTo={"/builder"}>QR Code Generator</FooterLink>
                <FooterLink linkTo={"/pricing"}>Plans and prices</FooterLink>
              </div>

              {/* COMPANY */}
              <div className="flex flex-col gap-y-3.5">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                  Company
                </h2>
                <FooterLink linkTo={"/terms-and-conditions"}>
                  Terms of Use and Contract
                </FooterLink>
                <FooterLink linkTo={"/privacy-policy"}>
                  Privacy Policy
                </FooterLink>
                <FooterLink linkTo={"/blogs"}>Blog</FooterLink>
              </div>

              {/* RESOURCES */}
              <div className="flex flex-col gap-y-3.5">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                  Resources
                </h2>
                <FooterLink linkTo={"/resources/qr-types-bussiness"}>
                  QR Codes for
                </FooterLink>
                <FooterLink linkTo={"/resources/qr-codes-on"}>
                  QR Codes on
                </FooterLink>
              </div>

              {/* HELP */}
              <div className="flex flex-col gap-y-3.5">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-white">
                  Help
                </h2>
                <FooterLink linkTo={"/contact"}>Contact us</FooterLink>
                <FooterLink linkTo={"/faq"}>FAQ</FooterLink>
                <FooterLink linkTo={"/report-abuse"}>Report abuse</FooterLink>
                <FooterLink linkTo={"/docs/QR"}>API Doc</FooterLink>
              </div>
            </section>

            {/* COPYRIGHT */}
            <section className="border-t border-white/10 py-6 text-center text-[13px] text-slate-400">
              {currentYear} © QRSMART
            </section>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

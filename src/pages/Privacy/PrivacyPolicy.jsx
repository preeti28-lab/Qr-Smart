import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScreenView from "../../layouts/ScreenView";
import HeroWaves from "../../components/ui/HeroWaves";
import { PRIVACY_SECTIONS } from "./privacyContent";
import { downlodPrivacyPDF } from "../../redux/features/dashboard";
import {
  FiShield,
  FiCalendar,
  FiDownload,
  FiChevronDown,
  FiArrowRight,
  FiMail,
} from "react-icons/fi";

import privacyHeroImg from "../../assets/images/privacy-hero.png";
import privacySupportImg from "../../assets/images/privacy-support.png";
import privacyTrustImg from "../../assets/images/privacy-trust.png";

const LAST_UPDATED = "15 February 2026";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const [openId, setOpenId] = useState(PRIVACY_SECTIONS[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePDFDownload = () => dispatch(downlodPrivacyPDF());

  const toggleSection = (id) => setOpenId((prev) => (prev === id ? null : id));

  const jumpToSection = (id) => {
    setOpenId(id);
    const node = sectionRefs.current[id];
    if (node) {
      const top = node.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <ScreenView>
      <div className="w-full bg-[#f7faff]">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#e9f0ff] via-[#f1f6ff] to-[#eaf1ff]">
          <HeroWaves />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between md:gap-6 md:py-14">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 text-[12.5px] font-semibold text-blue-600 shadow-sm backdrop-blur">
                <FiShield size={14} />
                Your Privacy, Our Priority
              </span>

              <h1 className="mt-5 text-[32px] font-bold leading-[1.15] tracking-tight text-slate-900 md:text-[46px]">
                Privacy <span className="text-blue-600">Policy</span>
              </h1>

              <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-[15px]">
                At QR Smart, we are committed to protecting your privacy and
                ensuring transparency in how we collect, use, and safeguard your
                information.
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-[13.5px] font-medium text-slate-500 md:justify-start">
                <FiCalendar size={15} className="text-slate-400" />
                Last Updated: {LAST_UPDATED}
              </div>

              <button
                onClick={handlePDFDownload}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700"
              >
                <FiDownload size={16} />
                Download Copy
              </button>
            </div>

            <div className="relative shrink-0">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/80 to-violet-100/70 blur-2xl md:h-[340px] md:w-[340px]" />
              <img
                src={privacyHeroImg}
                alt=""
                aria-hidden="true"
                className="relative w-[300px] select-none object-contain md:w-[400px] lg:w-[450px]"
                draggable="false"
              />
            </div>
          </div>
        </div>

        {/* ── Nav + Sections ── */}
        <div className="mx-auto mt-6 max-w-6xl px-4 pb-12 md:px-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] md:p-6">
            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              {/* Sidebar */}
              <aside className="lg:sticky lg:top-[84px] lg:self-start">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <h2 className="mb-3 px-1 text-[16px] font-bold text-slate-900">
                    On This Page
                  </h2>

                  <nav className="flex flex-col gap-0.5">
                    {PRIVACY_SECTIONS.map((section, index) => {
                      const Icon = section.icon;
                      const isActive = openId === section.id;

                      return (
                        <button
                          key={section.id}
                          onClick={() => jumpToSection(section.id)}
                          className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-blue-600" />
                          )}
                          <Icon
                            size={17}
                            className={`shrink-0 ${
                              isActive ? "text-blue-600" : "text-slate-400"
                            }`}
                          />
                          <span className="flex-1 text-[13.5px] font-medium leading-snug">
                            {index + 1}. {section.navLabel}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Support card */}
                <div className="mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/80 to-violet-50/60 p-5">
                  <img
                    src={privacySupportImg}
                    alt=""
                    aria-hidden="true"
                    className="w-[120px] select-none object-contain"
                    draggable="false"
                  />
                  <p className="mt-3 text-[15px] font-bold leading-snug text-slate-900">
                    Questions about Privacy?
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
                    Our support team is here to help you.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Contact Support
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </aside>

              {/* Sections */}
              <div className="flex min-w-0 flex-col gap-3">
                {PRIVACY_SECTIONS.map((section, index) => {
                  const isOpen = openId === section.id;

                  return (
                    <div
                      key={section.id}
                      ref={(node) => (sectionRefs.current[section.id] = node)}
                      className={`scroll-mt-24 rounded-xl border transition-colors ${
                        isOpen
                          ? "border-blue-200 bg-blue-50/40 shadow-[0_10px_28px_-22px_rgba(37,99,235,0.7)]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggleSection(section.id)}
                        className="flex w-full items-start gap-4 p-5 text-left"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[15px] font-bold text-white ${section.accent}`}
                        >
                          {index + 1}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-[15.5px] font-bold leading-snug text-slate-900">
                            {section.title}
                          </span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">
                            {section.summary}
                          </span>
                        </span>

                        <FiChevronDown
                          size={18}
                          className={`mt-1 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pl-[72px]">
                          <div className="border-t border-slate-200/80 pt-4 text-[14px] leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-[14.5px] [&_h3]:font-semibold [&_h3]:text-slate-800 [&_h3:first-child]:mt-0 [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-slate-700 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5">
                            {section.content}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust CTA ── */}
        <div className="mx-auto max-w-6xl px-4 pb-16 md:px-5">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] md:flex-row md:gap-8 md:p-8">
            <img
              src={privacyTrustImg}
              alt=""
              aria-hidden="true"
              className="w-[140px] shrink-0 select-none object-contain md:w-[175px]"
              draggable="false"
            />

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-[19px] font-bold text-slate-900 md:text-[21px]">
                Your Trust Matters
              </h3>
              <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-slate-500">
                QR Smart is dedicated to providing cutting-edge solutions while
                prioritizing user privacy and security.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700"
              >
                <FiMail size={16} />
                Contact Support
              </Link>
              <span className="text-[12px] text-slate-400">
                We typically reply within 24 hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScreenView>
  );
};

export default PrivacyPolicy;

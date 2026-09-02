import React, { useEffect } from "react";
import {
  CheckCircle2,
  Diamond,
  Globe2,
  Settings,
  ShieldCheck,
} from "lucide-react";

import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/custom/hero.webp";
import how1Img from "../../assets/images/products/custom/how.webp";

const HERO_IMG = heroImg;
const HOW_TO_IMG = how1Img;

const steps = [
  "Go to your hosting/domain page.",
  'Create a subdomain like "qr.yourdomain.com"',
  "Go to the domain settings and find the DNS settings for the subdomain.",
  "To point your subdomain (e.g.:qr.yourdomain.com) to our server, we provide you with a CNAME (custom.qrfy.com) that you must add in your domain control panel.",
  "Clarification: This CNAME record must not be deleted after validation, otherwise, the QRs that use the custom domain will stop working.",
  "We also provide you with some TXT records to validate the SSL certificate.",
  "Once you have completed these steps, we will validate these records.",
  "By obtaining validation of your subdomains you will be able to use them on the platform. Please note that the validation process can take from a few minutes to several hours. We recommend waiting until the domain and SSL certificate are successfully activated in your account before creating and printing QR codes for your marketing campaigns.",
];

const StepNumber = ({ number }) => (
  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1683e8] text-sm font-bold text-white shadow-[0_6px_16px_rgba(22,131,232,0.28)]">
    {number}
  </div>
);

const SectionTitle = ({ children }) => (
  <div>
    <h2 className="text-[27px] font-extrabold tracking-[-0.5px] text-[#111d49] md:text-[31px]">
      {children}
    </h2>

    <div className="mt-3 flex items-center gap-1.5">
      <span className="h-[4px] w-10 rounded-full bg-[#1683e8]" />
      <span className="h-[4px] w-2 rounded-full bg-[#1683e8]" />
    </div>
  </div>
);

const CustomDomain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <main className="relative overflow-hidden bg-white text-[#17213f]">
        {/* =====================================================
            BACKGROUND DECORATIONS
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Left blue blob */}
          <div className="absolute -left-28 top-24 h-60 w-80 rounded-br-[150px] rounded-tr-[120px] bg-[#edf3ff]" />

          {/* Right purple blob */}
          <div className="absolute -right-24 top-36 h-44 w-64 rounded-l-[120px] bg-[#f0eaff]" />

          {/* Orange circular line */}
          <div className="absolute right-[-25px] top-12 h-36 w-36 rounded-full border-2 border-[#ff8c2b]" />

          {/* Decorative dots */}
          <div className="absolute left-8 top-32 grid grid-cols-4 gap-3 opacity-90">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-[#3878ec]"
              />
            ))}
          </div>

          {/* bottom glow */}
          <div className="absolute -left-40 top-[1500px] h-[420px] w-[420px] rounded-full bg-[#f5f9ff] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
          {/* =====================================================
              HERO
          ====================================================== */}

          <section className="pt-12 sm:pt-16">
            <div className="text-center">
              <h1 className="mx-auto max-w-4xl text-[30px] font-extrabold leading-[1.15] tracking-[-0.8px] text-[#111d49] sm:text-[40px] lg:text-[46px]">
                Custom Domain
              </h1>

              <div className="mt-5 flex justify-center">
                <div className="flex items-center gap-2">
                  <span className="h-[5px] w-12 rounded-full bg-[#1683e8]" />
                  <span className="h-[5px] w-5 rounded-full bg-[#1683e8]" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[#1683e8]" />
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="mt-8 flex justify-center sm:mt-10">
              <img
                src={HERO_IMG}
                alt="Custom Domain"
                className="w-full max-w-[780px] object-contain"
              />
            </div>

            {/* Intro */}
            <div className="mx-auto mt-3 max-w-[900px] text-center">
              <p className="text-[13px] font-semibold leading-6 text-[#18244b] sm:text-[14px] sm:leading-7">
                Imagine you have a local business and are looking for ways to
                stand out in the digital market. Have you wondered how you could
                make your promotions and services easier for your potential
                customers to find? The answer may lie in using custom QR codes
                with your own domain.
              </p>

              <p className="mt-3 text-[13px] font-semibold leading-6 text-[#18244b] sm:text-[14px] sm:leading-7">
                With this tool, like &quot;tunegocio.com&quot;, you not only
                simplify access to your information, but you also project a more
                professional and trustworthy image to your clients. Discover how
                this simple but powerful feature can raise the visibility of
                your business online, providing a more seamless experience for
                your customers and thus boosting your digital presence.
              </p>
            </div>
          </section>

          {/* =====================================================
              BENEFITS
          ====================================================== */}

          <section className="mt-10 pb-8 sm:mt-12">
            <div className="relative overflow-hidden rounded-[24px] border border-[#e4edf9] bg-white p-6 shadow-[0_12px_45px_rgba(31,73,125,0.08)] sm:p-8 md:p-10">
              {/* top accent */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#1683e8] via-[#5c9cf2] to-transparent" />

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d9e9ff] bg-[#f3f8ff] shadow-[0_8px_20px_rgba(22,131,232,0.10)]">
                  <Diamond
                    className="h-7 w-7 text-[#1683e8]"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <SectionTitle>Benefits</SectionTitle>
                </div>
              </div>

              <div className="mt-8 space-y-5 text-[14px] leading-7 text-[#59657e] md:text-[15px]">
                <p>
                  Before we dive into the details of how to use our tool, it is
                  crucial to understand how it can benefit your brand in the
                  vast digital world.
                </p>

                <p>
                  Have you ever wondered how having your own domain can
                  influence the perception of your brand online? By having your
                  own domain, your brand will project a more solid and
                  professional image, which will generate trust among your
                  clients and business partners. This professionalism will also
                  make it easier for your customers to remember and return to
                  your website in the future, increasing opportunities for
                  engagement and conversion.
                </p>

                <p>
                  In addition, your own domain allows you to create a unique and
                  coherent identity for your brand on the web, helping you stand
                  out in an increasingly saturated market. In short, setting up
                  QRFY domains not only gives you a more robust online presence,
                  but also gives you the tools necessary to boost your brand's
                  success and credibility in the digital world.
                </p>
              </div>

              {/* subtle benefit footer */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[#e5eefb] bg-[#f8fbff] px-4 py-3">
                  <ShieldCheck className="h-5 w-5 text-[#1683e8]" />
                  <span className="text-xs font-semibold text-[#40516f]">
                    Professional brand presence
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#e5eefb] bg-[#f8fbff] px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-[#1683e8]" />
                  <span className="text-xs font-semibold text-[#40516f]">
                    Better customer experience
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#e5eefb] bg-[#f8fbff] px-4 py-3">
                  <Globe2 className="h-5 w-5 text-[#1683e8]" />
                  <span className="text-xs font-semibold text-[#40516f]">
                    Stronger digital presence
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              HOW TO USE
          ====================================================== */}

          <section className="py-10 md:py-14">
            <div className="mb-7 px-1">
              <SectionTitle>How to use</SectionTitle>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#e2ebf8] bg-[#f7faff] p-4 shadow-[0_12px_45px_rgba(31,73,125,0.06)] sm:p-6 md:p-7">
              <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-[20px] border border-[#dfe9f7] bg-white p-2 shadow-[0_15px_35px_rgba(33,71,125,0.10)]">
                  <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#263452] shadow-sm backdrop-blur">
                    <Settings className="h-3.5 w-3.5 text-[#1683e8]" />
                    Domain settings
                  </div>

                  <img
                    src={HOW_TO_IMG}
                    alt="Custom domain setup"
                    className="w-full rounded-[15px] object-contain"
                  />
                </div>

                {/* TIMELINE */}
                <div className="relative">
                  {/* connecting line */}
                  <div className="absolute left-[18px] top-5 bottom-5 w-px bg-[#cbdff8]" />

                  <div className="space-y-6">
                    {steps.map((text, index) => (
                      <div
                        key={index}
                        className="relative flex items-start gap-4"
                      >
                        <StepNumber number={index + 1} />

                        <p className="pt-1 text-[12px] font-medium leading-[1.7] text-[#52617d] sm:text-[13px]">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              QUICK PROCESS
          ====================================================== */}

          <section className="pb-14">
            <div className="rounded-[24px] border border-[#e1ebf8] bg-white p-5 shadow-[0_10px_35px_rgba(31,73,125,0.07)] sm:p-7">
              <div className="flex flex-col gap-7 xl:flex-row xl:items-center">
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#1683e8] shadow-[0_8px_20px_rgba(22,131,232,0.25)]">
                  <Settings
                    className="h-7 w-7 text-white"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Steps strip */}
                <div className="grid flex-1 grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-8">
                  {steps.map((text, index) => (
                    <div
                      key={index}
                      className="relative min-w-0"
                    >
                      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#edf5ff] text-[10px] font-bold text-[#1683e8]">
                        {index + 1}
                      </div>

                      <p className="text-[10px] font-medium leading-[1.55] text-[#58657e]">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </ScreenView>
  );
};

export default CustomDomain;
import React, { useEffect } from "react";
import {
  BarChart3,
  BookOpen,
  Box,
  CircleHelp,
  Code2,
  Download,
  Facebook,
  Gift,
  Gauge,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wifi,
} from "lucide-react";

import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/google/hero.webp";
import mobileImg from "../../assets/images/products/google/how-to-use.webp";

const HERO_IMG = heroImg;

const benefits = [
  {
    icon: Rocket,
    title: "Simplified organization:",
    text: "Facilitates the organization and distribution of QR codes on materials printed or digital. Having all the codes ready to download in a single file optimizes logistics.",
    color: "blue",
  },
  {
    icon: Target,
    title: "Convenience and accessibility:",
    text: "Allows you to have all QR codes available in a downloadable file, ready to be used anytime, anywhere.",
    color: "purple",
  },
  {
    icon: Wifi,
    title: "Flexibility and adaptability:",
    text: "Facilitates rapid response to changes or unforeseen needs, as all QR codes can be easily archived. This is especially useful for dynamic marketing campaigns or events with multiple activities.",
    color: "orange",
  },
  {
    icon: BarChart3,
    title: "Distribution efficiency:",
    text: "Simplifies the process of integrating QR codes into various platforms and materials, improving operational efficiency. For example, once you have all the QR codes downloaded, you can quickly integrate them into presentations, brochures, or promotional materials.",
    color: "green",
  },
];

const steps = [
  {
    num: 1,
    text: "Select the option to create or edit a QR on our platform.",
  },
  {
    num: 2,
    text: "In the advanced settings section of the QR, enter the Google Analytics 4 Tracking ID, Facebook Pixel ID, or Google Tag Manager ID depending on your needs. You can copy and paste the IDs provided by Google and Facebook into the corresponding fields.",
  },
  {
    num: 3,
    text: "Once the necessary IDs have been entered, the QR creation or editing process ends as usual.",
  },
  {
    num: 4,
    text: "Access the Google Analytics 4 platform, Facebook Business Manager or other platforms where you have configured pixels. From there you can monitor and analyze the events recorded by the pixel in your QR.",
  },
  {
    num: 5,
    text: "Use the data collected on external platforms to adjust your digital marketing strategies. Analyze QR performance and make improvements based on insights obtained from Google and Facebook.",
  },
];

const stepColors = [
  "bg-[#3678e8]",
  "bg-[#3678e8]",
  "bg-[#3678e8]",
  "bg-[#3678e8]",
  "bg-[#3678e8]",
];

const IconCircle = ({
  icon: Icon,
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-14 h-14",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-white border border-[#dbe7ff] shadow-[0_8px_25px_rgba(43,92,180,0.12)] flex items-center justify-center flex-shrink-0 ${className}`}
    >
      <Icon className="w-6 h-6 text-[#276bea]" strokeWidth={2} />
    </div>
  );
};

const GooglePixel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="relative overflow-hidden bg-white text-[#101c46]">
        {/* =========================================================
            BACKGROUND DECORATIONS
        ========================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Left blue blob */}
          <div className="absolute -left-28 top-24 h-60 w-80 rounded-br-[150px] rounded-tr-[120px] bg-[#edf3ff]" />

          {/* Right purple blob */}
          <div className="absolute -right-24 top-36 h-44 w-64 rounded-l-[120px] bg-[#f0eaff]" />

          {/* Orange circular line */}
          <div className="absolute right-[-25px] top-12 h-36 w-36 rounded-full border-2 border-[#ff8c2b]" />

          {/* Decorative dots */}
          <div className="absolute left-8 top-32 grid grid-cols-4 gap-3 opacity-90">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-[#3878ec]"
              />
            ))}
          </div>
        </div>

        {/* =========================================================
            PAGE CONTENT
        ========================================================== */}

        <div className="relative mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-10">
          {/* =======================================================
              HERO
          ======================================================== */}

          <section className="pt-12 sm:pt-16">
            <div className="text-center">
              <h1 className="mx-auto max-w-4xl text-[30px] font-extrabold leading-[1.15] tracking-[-0.8px] text-[#111d49] sm:text-[40px] lg:text-[46px]">
                Google and Facebook pixel integration
              </h1>

              <div className="mt-5 flex justify-center">
                <div className="flex items-center gap-2">
                  <span className="h-[5px] w-12 rounded-full bg-[#276bea]" />
                  <span className="h-[5px] w-5 rounded-full bg-[#276bea]" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[#276bea]" />
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="mt-8 flex justify-center sm:mt-10">
              <img
                src={HERO_IMG}
                alt="Google and Facebook pixel integration"
                className="w-full max-w-[780px] object-contain"
              />
            </div>

            {/* Intro */}
            <div className="mx-auto mt-3 max-w-[900px] text-center">
              <p className="text-[13px] font-semibold leading-6 text-[#18244b] sm:text-[14px] sm:leading-7">
                Imagine having the ability to follow every step your customers
                take when they interact with your QR codes. With our platform,
                you can now easily integrate Google and Facebook pixels into
                your QRs, allowing you to gain valuable insights into how your
                audience interacts with your digital content.
              </p>

              <p className="mt-3 text-[13px] font-semibold leading-6 text-[#18244b] sm:text-[14px] sm:leading-7">
                From knowing which links are the most visited to understanding
                your users&apos; browsing patterns, this functionality provides
                you with a detailed and strategic view of each click and action
                performed through your QR.
              </p>
            </div>
          </section>

          {/* =======================================================
              BENEFITS CARD
          ======================================================== */}

          <section className="mt-10 sm:mt-12">
            <div className="relative rounded-[18px] border border-[#e6ebf5] bg-white p-6 shadow-[0_8px_35px_rgba(25,54,108,0.08)] sm:p-8 lg:p-9">
              {/* Decorative icon */}
              <div className="absolute -left-1 top-5 sm:-left-3 sm:top-7">
                <IconCircle icon={Gift} size="lg" />
              </div>

              <div className="pl-12 sm:pl-14">
                <h2 className="text-[23px] font-extrabold tracking-[-0.3px] text-[#111d49] sm:text-[27px]">
                  Benefits
                </h2>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-[4px] w-9 rounded-full bg-[#276bea]" />
                  <span className="h-[4px] w-4 rounded-full bg-[#276bea]" />
                </div>
              </div>

              {/* Benefit paragraphs */}
              <div className="mt-6 space-y-4 text-[12px] font-medium leading-[1.7] text-[#4d5976] sm:text-[13px]">
                <p>
                  The central benefit of integrating Google and Facebook
                  pixels into your QR codes is conversion tracking
                  optimization. This allows you to track detailed conversions
                  from QR scanning to actions taken on your website. This way,
                  you can accurately measure the performance of your QR
                  campaigns, identify which strategies generate results, and
                  optimize your digital marketing efforts based on concrete
                  data.
                </p>

                <p>
                  For example, imagine that you are promoting a new menu in
                  your restaurant using a QR. By integrating Google and
                  Facebook pixels, you will not only be able to count how many
                  people scan the QR, but also which dishes or sections of the
                  menu are most popular with your customers. This information
                  helps you adjust your marketing strategy and offer more
                  effective promotions based on your audience&apos;s specific
                  interests.
                </p>
              </div>

              {/* Benefits grid */}
              <div className="mt-7 grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  const iconStyles = {
                    blue: "bg-[#f2f6ff] border-[#d8e5ff]",
                    purple: "bg-[#f7f2ff] border-[#e8dcff]",
                    orange: "bg-[#fff8f0] border-[#ffe5c8]",
                    green: "bg-[#effbf7] border-[#d2f3e8]",
                  };

                  const iconColors = {
                    blue: "text-[#2874eb]",
                    purple: "text-[#7951ed]",
                    orange: "text-[#ff862c]",
                    green: "text-[#35b99a]",
                  };

                  return (
                    <div
                      key={benefit.title}
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border ${iconStyles[benefit.color]} shadow-[0_5px_18px_rgba(44,81,145,0.06)]`}
                      >
                        <Icon
                          className={`h-6 w-6 ${iconColors[benefit.color]}`}
                          strokeWidth={2}
                        />
                      </div>

                      <div>
                        <h3 className="text-[12px] font-extrabold text-[#19264d] sm:text-[13px]">
                          {benefit.title}
                        </h3>

                        <p className="mt-1 text-[11px] font-medium leading-[1.65] text-[#59647e] sm:text-[12px]">
                          {benefit.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =======================================================
              HOW TO USE
          ======================================================== */}

          <section className="mt-6 sm:mt-7">
            <div className="rounded-[18px] bg-[#f4f8ff] px-6 py-7 sm:px-8 sm:py-9">
              <div className="mb-6">
                <h2 className="text-[23px] font-extrabold tracking-[-0.3px] text-[#111d49] sm:text-[27px]">
                  How to use
                </h2>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-[4px] w-9 rounded-full bg-[#276bea]" />
                  <span className="h-[4px] w-4 rounded-full bg-[#276bea]" />
                </div>
              </div>

              <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    src={mobileImg}
                    alt="How to integrate Google and Facebook pixel"
                    className="w-full max-w-[520px] object-contain"
                  />
                </div>

                {/* Steps */}
                <div className="space-y-5">
                  {steps.map((step, index) => (
                    <div
                      key={step.num}
                      className="flex items-start gap-3.5"
                    >
                      <div
                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${stepColors[index]} text-[11px] font-bold text-white shadow-sm`}
                      >
                        {step.num}
                      </div>

                      <p className="pt-0.5 text-[11px] font-medium leading-[1.65] text-[#53617d] sm:text-[12px]">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =======================================================
              DETAILED INSTRUCTIONS
          ======================================================== */}

          <section className="mb-10 mt-5 sm:mb-14">
            <div className="relative rounded-[18px] border border-[#e7ebf3] bg-white px-6 py-7 shadow-[0_8px_30px_rgba(25,54,108,0.06)] sm:px-8 sm:py-8">
              {/* Settings icon */}
              <div className="absolute -left-1 top-5 sm:-left-3 sm:top-7">
                <IconCircle icon={Settings} size="lg" />
              </div>

              <div className="pl-12 sm:pl-14">
                <p className="text-[11px] font-medium leading-6 text-[#53617d] sm:text-[12px]">
                  To integrate the Google and/or Facebook pixel into your QR
                  and start tracking key events, follow these steps:
                </p>
              </div>

              <div className="mt-6 space-y-4 pl-0 sm:pl-14">
                {steps.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3678e8] text-[10px] font-bold text-white">
                      {step.num}
                    </div>

                    <p className="text-[11px] font-medium leading-[1.7] text-[#53617d] sm:text-[12px]">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom highlighted note */}
              <div className="mt-7 flex items-start gap-3 rounded-lg bg-[#edf4ff] px-4 py-3 sm:ml-14">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#7aa7ff] bg-white">
                  <Sparkles className="h-3.5 w-3.5 text-[#3678e8]" />
                </div>

                <p className="text-[10px] font-semibold leading-[1.7] text-[#53617d] sm:text-[11px]">
                  With these simple steps, you will be able to integrate and
                  make the most of the Google and Facebook pixel in your QRs,
                  optimizing your campaigns and improving the effectiveness of
                  your digital marketing strategies.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ScreenView>
  );
};

export default GooglePixel;
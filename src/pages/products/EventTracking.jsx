import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/event/hero.webp";
import how1Img from "../../assets/images/products/event/how.webp";

const HERO_IMG = heroImg;
const HOW_TO_IMG = how1Img;

const benefits = [
  {
    title: "Understanding and personalizing user behavior",
    desc: "By knowing which links or buttons users click on, you gain valuable information about their interests and preferences, allowing you to create detailed profiles and segment your audience more effectively.",
    icon: "♧",
  },
  {
    title: "Optimizing campaign effectiveness",
    desc: "With accurate user engagement data, you can identify which elements of your campaigns are getting the most attention and adjust strategies accordingly.",
    icon: "✦",
  },
  {
    title: "Performance measurement",
    desc: "Measure the performance of your campaigns in real time and track key metrics like click-through rate and interaction time.",
    icon: "▥",
  },
  {
    title: "Saving time and resources",
    desc: "Focus your efforts on what works best, improving efficiency and reducing unnecessary costs.",
    icon: "◷",
  },
];

const steps1 = [
  "Select the type of QR you want to create or edit.",
  'In the second step of creating the QR, in the "Content" section, click on the "Statistics" tab.',
  'Within the "Statistics" tab, select "Tracking Analysis" and activate this function by clicking on the "Event Tracking" toggle.',
  "Finish the QR creation process as usual.",
];

const steps2 = [
  'From the "My QRs" section, locate the QR for which you want to see the recorded events.',
  'Click on the right button of the QR, where it says "Details".',
  'Scroll to the bottom and you will find the "Events" tab.',
  "When you click on it, you will be able to find the buttons and links that have been clicked listed.",
];

const steps3 = [
  'Access the "Statistics" section and select from the "QR Code" selector the QR(s) you want to see the events.',
  'Scroll to the bottom and you will find the "Events" tab.',
  "When you click on it, you will be able to find the buttons and links that have been clicked listed.",
];

const StepList = ({ steps }) => (
  <div className="space-y-4">
    {steps.map((step, i) => (
      <div key={i} className="flex items-start gap-4">
        <div
          className="
            flex-shrink-0
            w-8 h-8
            rounded-full
            bg-[#1686d9]
            text-white
            flex items-center justify-center
            text-sm font-bold
            shadow-[0_5px_12px_rgba(22,134,217,0.18)]
          "
        >
          {i + 1}
        </div>

        <p className="pt-1 text-[14px] md:text-[15px] leading-7 text-[#53657d]">
          {step}
        </p>
      </div>
    ))}
  </div>
);

const EventTracking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <main className="bg-white overflow-hidden">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative bg-[#f7fbff] overflow-hidden">

          {/* Decorative top wave */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none">
            <svg
              viewBox="0 0 1440 180"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0 70C260 150 390 5 670 65C940 125 1110 160 1440 50V0H0Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          {/* Soft blue blobs */}
          <div className="absolute -left-40 top-40 w-[420px] h-[420px] rounded-full bg-[#eaf5ff] blur-3xl opacity-70" />
          <div className="absolute -right-40 top-32 w-[500px] h-[500px] rounded-full bg-[#eef8ff] blur-3xl opacity-80" />

          <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-16">

            {/* CENTER HEADING */}
            <div className="text-center max-w-3xl mx-auto">

              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-[58px]
                  leading-[1.05]
                  font-bold
                  tracking-[-2px]
                  text-[#102752]
                "
              >
                Event tracking
              </h1>

              <p
                className="
                  mt-6
                  text-[15px]
                  sm:text-base
                  leading-7
                  text-[#65758d]
                  max-w-2xl
                  mx-auto
                "
              >
                Understand every interaction. Track clicks, scans and
                engagement to optimize your QR code performance like never
                before.
              </p>
            </div>

            {/* Hero image */}
            <div className="relative flex justify-center mt-10 sm:mt-12">
              <div className="absolute inset-x-10 top-10 bottom-0 rounded-full bg-[#e8f3ff] blur-3xl opacity-70" />

              <img
                src={HERO_IMG}
                alt="Event tracking"
                className="
                  relative
                  w-full
                  max-w-[900px]
                  object-contain
                  drop-shadow-[0_20px_40px_rgba(44,126,208,0.10)]
                "
              />
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-[-1px] left-0 right-0 pointer-events-none">
            <svg
              viewBox="0 0 1440 100"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0 70C300 10 420 105 720 55C1030 5 1160 25 1440 65V100H0Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

        {/* =====================================================
            INTRO
        ====================================================== */}
        <section className="relative bg-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-6">

            <div
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border border-[#dcecff]
                bg-gradient-to-br
                from-[#f4faff]
                via-white
                to-[#f5faff]
                px-6 py-8
                sm:px-10 sm:py-10
              "
            >
              {/* Decorative dots */}
              <div
                className="
                  absolute
                  left-0 bottom-0
                  w-40 h-40
                  opacity-30
                  pointer-events-none
                "
                style={{
                  backgroundImage:
                    "radial-gradient(#78b9ef 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />

              <div className="relative grid md:grid-cols-[130px_1fr] gap-7 items-center">

                {/* Icon */}
                <div className="flex justify-center md:justify-start">
                  {/* <div
                    className="
                      w-20 h-20
                      rounded-[22px]
                      bg-gradient-to-br
                      from-[#208ce5]
                      to-[#0872c7]
                      flex items-center justify-center
                      text-white
                      text-4xl
                      shadow-[0_15px_30px_rgba(21,132,215,0.25)]
                    "
                  >
                    ↗
                  </div> */}
                </div>

                {/* Content */}
                <div className="space-y-5 text-[14px] sm:text-[15px] leading-7 text-[#53657d]">
                  <p>
                    Event tracking in QR codes is a very useful tool that
                    allows you to see{" "}
                    <strong className="text-[#172b4d]">
                      how users interact with the
                    </strong>{" "}
                    links or buttons that you have put in your QR code.
                  </p>

                  <p>
                    Imagine a university uses QR codes to link to
                    bibliographies, instructional videos, and workshop{" "}
                    <strong className="text-[#172b4d]">
                      registration forms.
                    </strong>{" "}
                    With event tracking, the university can see which of these
                    resources are most used by students and adjust their
                    programs accordingly.
                  </p>

                  <p>
                    In addition to knowing how many times your QR has been
                    scanned, you can get a clear picture of{" "}
                    <strong className="text-[#172b4d]">
                      how users interact with the content you offer.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ====================================================== */}
        <section className="relative bg-white py-12 sm:py-16">

          <div className="max-w-6xl mx-auto px-6">

            {/* Section badge */}
            <div className="flex justify-center mb-4">
              <span
                className="
                  px-4 py-2
                  rounded-full
                  bg-[#eef7ff]
                  text-[#1681d6]
                  text-xs
                  font-bold
                  tracking-wide
                "
              >
                ✧ &nbsp; BENEFITS
              </span>
            </div>

            <h2
              className="
                text-center
                text-3xl
                sm:text-4xl
                font-bold
                tracking-[-1px]
                text-[#102752]
                mb-4
              "
            >
              Why event tracking matters
            </h2>

            <p className="text-center text-[#718096] max-w-2xl mx-auto mb-10">
              Get a deeper understanding of how your audience interacts with
              your QR code content.
            </p>

            {/* Benefit cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="
                    group
                    relative
                    bg-white
                    rounded-[20px]
                    border border-[#e3ebf5]
                    p-6
                    text-center
                    shadow-[0_8px_30px_rgba(26,70,110,0.06)]
                    hover:-translate-y-1
                    hover:shadow-[0_15px_40px_rgba(26,110,180,0.12)]
                    transition-all duration-300
                  "
                >

                  {/* Number */}
                  <div
                    className="
                      absolute
                      top-4 right-4
                      w-7 h-7
                      rounded-lg
                      bg-[#edf6ff]
                      text-[#167bd0]
                      text-xs font-bold
                      flex items-center justify-center
                    "
                  >
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    <div
                      className="
                        w-16 h-16
                        rounded-full
                        bg-[#eef6ff]
                        flex items-center justify-center
                      "
                    >
                      <div
                        className="
                          w-11 h-11
                          rounded-full
                          bg-[#197ed5]
                          text-white
                          flex items-center justify-center
                          text-xl
                          shadow-[0_7px_15px_rgba(25,126,213,0.25)]
                        "
                      >
                        {benefit.icon}
                      </div>
                    </div>
                  </div>

                  <h3
                    className="
                      text-[16px]
                      leading-6
                      font-bold
                      text-[#172b4d]
                      min-h-[48px]
                    "
                  >
                    {benefit.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-[13px]
                      leading-6
                      text-[#6d7d92]
                    "
                  >
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight */}
            <div
              className="
                mt-7
                rounded-[18px]
                border border-[#d9eaff]
                bg-[#f4f9ff]
                px-6 py-5
                flex items-center gap-4
                text-[#526982]
                text-sm
              "
            >
              <div
                className="
                  w-10 h-10
                  rounded-full
                  bg-white
                  border border-[#d9eaff]
                  flex-shrink-0
                  flex items-center justify-center
                  text-[#1681d6]
                  text-xl
                "
              >
                ☆
              </div>

              <p>
                Get a detailed picture of how users interact with your
                content — not just how many times your QR code is scanned.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TO USE
        ====================================================== */}
        <section className="relative bg-[#f8fbff] py-16 sm:py-20 overflow-hidden">

          {/* Decorative waves */}
          <div className="absolute top-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 130"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 35C280 100 420 0 700 45C980 90 1160 105 1440 30V0H0Z"
                fill="#ffffff"
              />
            </svg>
          </div>

          <div className="relative max-w-6xl mx-auto px-6 pt-8">

            {/* Badge */}
            <div className="flex justify-center mb-4">
              <span
                className="
                  px-4 py-2
                  rounded-full
                  bg-white
                  border border-[#dcecff]
                  text-[#1681d6]
                  text-xs font-bold
                  tracking-wide
                "
              >
                ♢ &nbsp; HOW TO USE
              </span>
            </div>

            <h2
              className="
                text-center
                text-3xl sm:text-4xl
                font-bold
                tracking-[-1px]
                text-[#102752]
              "
            >
              Set up event tracking in minutes
            </h2>

            <p className="text-center text-[#718096] mt-4 mb-10">
              Follow these simple steps to start collecting and analyzing
              interactions.
            </p>

            {/* Main setup image */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border border-[#dcecff]
                bg-white
                p-3 sm:p-6
                shadow-[0_15px_50px_rgba(38,93,140,0.07)]
              "
            >
              <div className="rounded-[18px] bg-[#eef6ff] p-3 sm:p-6">
                <img
                  src={HOW_TO_IMG}
                  alt="Event tracking setup"
                  className="
                    w-full
                    rounded-[14px]
                    object-contain
                    shadow-[0_10px_30px_rgba(38,93,140,0.08)]
                  "
                />
              </div>
            </div>

            {/* =================================================
                STEP GROUP 1
            ================================================== */}
            <div className="mt-10">

              <p className="text-[14px] sm:text-[15px] leading-7 text-[#596d84] mb-6">
                For your QR to start collecting information about the clicks
                that users make on the QR links and buttons, you must activate
                this functionality as follows:
              </p>

              <div
                className="
                  bg-white
                  border border-[#e2ebf5]
                  rounded-[20px]
                  p-6 sm:p-8
                  shadow-[0_8px_30px_rgba(35,77,115,0.05)]
                "
              >
                <StepList steps={steps1} />
              </div>
            </div>

            {/* =================================================
                STEP GROUP 2
            ================================================== */}
            <div className="mt-10">

              <p className="text-[14px] sm:text-[15px] leading-7 text-[#596d84] mb-6">
                If you want to see how many clicks have been made so far and
                on which buttons, follow these steps:
              </p>

              <div
                className="
                  bg-white
                  border border-[#e2ebf5]
                  rounded-[20px]
                  p-6 sm:p-8
                  shadow-[0_8px_30px_rgba(35,77,115,0.05)]
                "
              >
                <StepList steps={steps2} />
              </div>
            </div>

            {/* =================================================
                STEP GROUP 3
            ================================================== */}
            <div className="mt-10">

              <p className="text-[14px] sm:text-[15px] leading-7 text-[#596d84] mb-6">
                You can also access the visualization of the events from the
                "Statistics" section:
              </p>

              <div
                className="
                  bg-white
                  border border-[#e2ebf5]
                  rounded-[20px]
                  p-6 sm:p-8
                  shadow-[0_8px_30px_rgba(35,77,115,0.05)]
                "
              >
                <StepList steps={steps3} />
              </div>
            </div>

            {/* =================================================
                FINAL NOTE
            ================================================== */}
            <div
              className="
                mt-10
                rounded-[20px]
                border border-[#d5eaff]
                bg-gradient-to-r from-[#edf7ff] to-white
                p-6
                flex items-start gap-4
              "
            >
              <div
                className="
                  flex-shrink-0
                  w-11 h-11
                  rounded-full
                  bg-white
                  border border-[#d5eaff]
                  flex items-center justify-center
                  text-[#1681d6]
                  text-xl
                "
              >
                ◷
              </div>

              <p className="text-[14px] sm:text-[15px] leading-7 text-[#536980]">
                Remember that there may be a delay of a few minutes until the
                latest events are reflected. With this functionality
                activated, you will be in control of how your QRs interact
                with your audience.
              </p>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg
              viewBox="0 0 1440 100"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 55C260 0 470 95 750 45C1030 0 1200 25 1440 65V100H0Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </section>

      </main>
    </ScreenView>
  );
};

export default EventTracking;
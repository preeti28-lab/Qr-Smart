import React, { useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/analytics/hero.webp";
import how1Img from "../../assets/images/products/analytics/how1.webp";
import how2Img from "../../assets/images/products/analytics/how2.webp";
import how3Img from "../../assets/images/products/analytics/how3.webp";
import how4Img from "../../assets/images/products/analytics/how4.webp";
import how5Img from "../../assets/images/products/analytics/how5.webp";
import how6Img from "../../assets/images/products/analytics/how6.webp";
import how7Img from "../../assets/images/products/analytics/how7.webp";
import how8Img from "../../assets/images/products/analytics/how8.webp";

const benefits = [
  {
    title: "Identify your target audience",
    text: "Detail the user's demographic data, browsing preferences, operating system and language to personalize your marketing strategy.",
    icon: "👥",
    color: "blue",
  },
  {
    title: "Evaluate the effectiveness of marketing strategies",
    text: "Discover which channels generate the most traffic and conversions to allocate resources more efficiently.",
    icon: "🎯",
    color: "orange",
  },
  {
    title: "Optimize the user experience",
    text: "Adjust the location and design of QR codes to improve the user experience after analyzing behavior patterns.",
    icon: "📈",
    color: "green",
  },
  {
    title: "Get a clear view of performance",
    text: "Make informed decisions by understanding which aspects of your strategy are working and which need improvement.",
    icon: "⚡",
    color: "purple",
  },
  {
    title: "Improve personalization and segmentation",
    text: "Obtain demographic and geographic information about your users through QR code scanning data to improve personalization and segmentation.",
    icon: "♙",
    color: "purple",
  },
  {
    title: "Measure the impact of specific changes",
    text: "Determine whether design or content modifications have improved traffic or conversions on your digital platform.",
    icon: "✎",
    color: "orange",
  },
  {
    title: "Set realistic expectations and goals",
    text: "Adjust your strategy with historical data to achieve achievable goals.",
    icon: "⚑",
    color: "green",
  },
];

const analyticsSections = [
  {
    image: how1Img,
    title: "Obtaining metrics in real time",
    description:
      "Metric data is provided in real time, giving you an up-to-date overview of your QR campaigns.",
    layout: "image-left",
    icon: "▥",
    color: "blue",
  },
  {
    image: how2Img,
    title: "Track total and unique scans",
    description:
      "These metrics allow you to track total scans and unique scans to better understand user interaction.",
    layout: "image-right",
    icon: "⌁",
    color: "orange",
  },
  {
    image: how3Img,
    title: "Analysis according to cities and countries",
    description:
      "Tracking metrics by location helps expand your reach and understand your audience better.",
    layout: "image-left",
    icon: "⌖",
    color: "purple",
  },
  {
    image: how4Img,
    title: "Temporal analysis of scans",
    description:
      "Identify the best times for campaigns and optimize performance.",
    layout: "image-right",
    icon: "◷",
    color: "orange",
  },
  {
    image: how5Img,
    title: "Analysis of scans by operating system",
    description: "Understand which devices your users prefer.",
    layout: "image-left",
    icon: "▣",
    color: "purple",
  },
  {
    image: how6Img,
    title: "Export reports in CSV or XLS format",
    description: "Export data to spreadsheet programs easily.",
    layout: "image-right",
    icon: "⇩",
    color: "green",
  },
  {
    image: how7Img,
    title: "Reset your scans and start again",
    description: "Reset scan counters anytime to optimize campaigns.",
    layout: "image-left",
    icon: "↻",
    color: "blue",
  },
  {
    image: how8Img,
    title: "All data in one place",
    description:
      "Access all your QR analytics in one dashboard with filtering and export options.",
    layout: "image-right",
    icon: "▤",
    color: "green",
  },
];

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    glow: "shadow-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    glow: "shadow-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-500",
    glow: "shadow-orange-100",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-500",
    glow: "shadow-emerald-100",
  },
};

const CheckIcon = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2463eb] text-[11px] font-bold text-white">
    ✓
  </span>
);

const DecorativeDots = ({ className = "" }) => (
  <div
    className={`absolute grid grid-cols-5 gap-[7px] opacity-70 ${className}`}
  >
    {Array.from({ length: 25 }).map((_, i) => (
      <span
        key={i}
        className="h-[3px] w-[3px] rounded-full bg-[#3675f5]"
      />
    ))}
  </div>
);

const WaveDecoration = () => (
  <>
    <div className="pointer-events-none absolute -left-32 -top-20 h-[300px] w-[390px] rounded-[45%] bg-gradient-to-br from-[#dce9ff] via-[#eaf1ff] to-transparent blur-[1px]" />

    <div className="pointer-events-none absolute -right-28 -top-16 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-transparent via-[#fff4e9] to-[#eadfff]" />

    <div className="pointer-events-none absolute -right-20 top-[-100px] h-[280px] w-[280px] rounded-full border border-orange-300/80" />

    <div className="pointer-events-none absolute -left-16 top-[180px] h-[180px] w-[250px] rounded-[50%] bg-[#edf4ff] opacity-80 blur-2xl" />
  </>
);

const CompleteAnalytics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <main className="relative overflow-hidden bg-white text-[#101a3d]">

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden">
          <WaveDecoration />

          <DecorativeDots className="left-10 top-40" />

          <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12">
            <SectionHeading title="Complete analytics" />

            <div className="mx-auto mt-5 flex max-w-[900px] justify-center">
              <img
                src={heroImg}
                alt="Complete analytics"
                className="
                  w-full
                  object-contain
                  drop-shadow-[0_20px_45px_rgba(47,91,190,0.10)]
                "
              />
            </div>

            <div className="mx-auto mt-4 max-w-[980px] space-y-5 text-center text-[15px] font-medium leading-7 text-[#162044]">
              <p>
                Would you like to know if your marketing efforts are really
                reaching your audience? With QR codes and their tracking
                function, you have a powerful tool to give traditional
                marketing an innovative boost.
              </p>

              <p>
                These codes not only enrich your printed material, but also
                give you the ability to understand the real impact of your ads,
                from the first contact to the final conversion.
              </p>

              <p>
                If you're ready to take your marketing strategies to the next
                level, dynamic QR codes are your solution, offering editing and
                tracking features to optimize your campaigns over time.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ====================================================== */}
        <section className="relative px-6 pb-20">
          <DecorativeDots className="right-16 top-5" />

          <div
            className="
              relative mx-auto max-w-[1180px]
              overflow-hidden rounded-[22px]
              border border-[#e7ebf5]
              bg-white
              px-7 py-9
              shadow-[0_15px_50px_rgba(39,79,160,0.08)]
              md:px-10 md:py-10
            "
          >
            {/* subtle gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30" />

            <div className="relative">
              <div className="mb-7">
                <h2 className="text-[25px] font-bold tracking-tight text-[#101a3d]">
                  Why is it key to track your marketing metrics?
                </h2>

                <div className="mt-2 flex items-center gap-1">
                  <span className="h-[3px] w-9 rounded-full bg-[#2463eb]" />
                  <span className="h-[3px] w-[3px] rounded-full bg-[#2463eb]" />
                </div>

                <p className="mt-5 max-w-5xl text-[14px] leading-6 text-[#5d6780]">
                  Tracking metrics is essential to optimizing your QR code
                  campaigns. It gives you a clear view of who is interacting
                  with your codes and how.
                </p>
              </div>

              <div className="grid gap-x-12 gap-y-5 md:grid-cols-2">
                {benefits.map((item, index) => {
                  const colors =
                    colorClasses[item.color] || colorClasses.blue;

                  return (
                    <div
                      key={index}
                      className="
                        group flex gap-3
                        rounded-2xl p-3
                        transition-all duration-300
                        hover:bg-white
                        hover:shadow-[0_10px_30px_rgba(30,70,140,0.07)]
                      "
                    >
                      <CheckIcon />

                      <div
                        className={`
                          flex h-11 w-11 shrink-0 items-center
                          justify-center rounded-full
                          ${colors.bg}
                          ${colors.icon}
                          text-xl
                          shadow-[0_8px_20px_rgba(50,90,160,0.08)]
                        `}
                      >
                        {item.icon}
                      </div>

                      <p className="pt-1 text-[13px] leading-6 text-[#56617a]">
                        <strong className="font-bold text-[#101a3d]">
                          {item.title}:
                        </strong>{" "}
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TO ACCESS
        ====================================================== */}
        <section className="relative px-6 pb-10">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-6">
              <h2 className="text-[25px] font-bold tracking-tight text-[#101a3d]">
                How to access your QR code metrics tracking tool
              </h2>

              <div className="mt-2 flex items-center gap-1">
                <span className="h-[3px] w-9 rounded-full bg-[#2463eb]" />
                <span className="h-[3px] w-[3px] rounded-full bg-[#2463eb]" />
              </div>

              <p className="mt-4 text-[14px] text-[#69738a]">
                Once you have generated your QR code, you can access it through
                the "My QRs" section.
              </p>
            </div>

            {/* First dashboard card */}
            <div
              className="
                relative overflow-hidden rounded-[22px]
                border border-[#e4eaf5]
                bg-gradient-to-br from-[#f5f8ff] via-[#f9fbff] to-[#f3f6ff]
                p-5
                shadow-[0_12px_35px_rgba(55,93,170,0.06)]
              "
            >
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-blue-200/20 blur-2xl" />

              <img
                src={how1Img}
                alt="QR metrics"
                className="
                  relative z-10
                  w-full rounded-2xl
                  object-contain
                  shadow-[0_15px_35px_rgba(38,76,145,0.08)]
                "
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            ANALYTICS FEATURE CARDS
        ====================================================== */}
        <section className="relative px-6 pb-20">
          <div className="mx-auto max-w-[1180px] space-y-8">
            {analyticsSections.map((section, index) => {
              const colors =
                colorClasses[section.color] || colorClasses.blue;

              const reverse = section.layout === "image-right";

              return (
                <article
                  key={index}
                  className="
                    relative overflow-hidden
                    rounded-[22px]
                    border border-[#e4e9f3]
                    bg-white
                    shadow-[0_12px_35px_rgba(40,80,150,0.06)]
                  "
                >
                  <div
                    className={`
                      grid items-center
                      gap-5 p-5 md:p-7
                      ${reverse ? "md:grid-cols-[0.85fr_1.15fr]" : "md:grid-cols-[1.15fr_0.85fr]"}
                    `}
                  >
                    {/* Image */}
                    <div
                      className={`
                        relative overflow-hidden
                        rounded-[18px]
                        bg-gradient-to-br
                        from-[#f4f7ff] to-[#f9faff]
                        p-4
                        ${reverse ? "md:order-2" : ""}
                      `}
                    >
                      <div className="absolute left-6 top-6 h-20 w-20 rounded-full bg-blue-200/20 blur-2xl" />

                      <img
                        src={section.image}
                        alt={section.title}
                        className="
                          relative z-10
                          w-full rounded-xl
                          object-contain
                        "
                      />
                    </div>

                    {/* Content */}
                    <div
                      className={`
                        px-2 py-5 md:px-5
                        ${reverse ? "md:order-1" : ""}
                      `}
                    >
                      <div
                        className={`
                          mb-5 flex h-14 w-14
                          items-center justify-center
                          rounded-full
                          ${colors.bg}
                          ${colors.icon}
                          text-2xl
                          shadow-[0_10px_25px_rgba(50,90,150,0.08)]
                        `}
                      >
                        {section.icon}
                      </div>

                      <h3 className="text-[21px] font-bold leading-tight text-[#111a3c]">
                        {section.title}
                      </h3>

                      <div className="mt-3 h-[3px] w-10 rounded-full bg-[#2463eb]" />

                      <p className="mt-5 max-w-md text-[14px] leading-7 text-[#657088]">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            FINAL CTA / DASHBOARD
        ====================================================== */}
        <section className="relative px-6 pb-20">
          <DecorativeDots className="bottom-20 left-12" />

          <div
            className="
              relative mx-auto max-w-[1180px]
              overflow-hidden rounded-[24px]
              border border-[#e4eaf6]
              bg-gradient-to-br
              from-[#f5f8ff]
              via-white
              to-[#f7f4ff]
              p-6
              shadow-[0_18px_55px_rgba(46,82,155,0.09)]
              md:p-10
            "
          >
            <div className="relative z-10 grid items-center gap-10 md:grid-cols-[0.75fr_1.25fr]">
              <div>
                <div
                  className="
                    mb-5 flex h-14 w-14
                    items-center justify-center
                    rounded-full bg-emerald-50
                    text-2xl text-emerald-500
                    shadow-[0_10px_25px_rgba(40,150,100,0.08)]
                  "
                >
                  ▤
                </div>

                <h2 className="text-[25px] font-bold text-[#101a3d]">
                  All data in one place
                </h2>

                <div className="mt-2 h-[3px] w-10 rounded-full bg-[#2463eb]" />

                <p className="mt-5 max-w-md text-[14px] leading-7 text-[#657088]">
                  Access all your QR analytics in one dashboard with filtering
                  and export options.
                </p>
              </div>

              <div className="overflow-hidden rounded-[18px] border border-[#e3e8f2] bg-white p-3 shadow-[0_15px_40px_rgba(40,70,130,0.10)]">
                <img
                  src={how8Img}
                  alt="Analytics dashboard"
                  className="w-full rounded-xl object-contain"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-100/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-blue-100/40 blur-3xl" />
          </div>
        </section>
      </main>
    </ScreenView>
  );
};

export default CompleteAnalytics;
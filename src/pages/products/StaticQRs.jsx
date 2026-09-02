import React, { useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/staticqrhero.webp";
import mobileImg from "../../assets/images/products/howtouse (2).webp";

const HERO_IMG = heroImg;
const MOBILE_IMG = mobileImg;

const benefits = [
  {
    title: "Content stability",
    desc: "Once created, the content of the static QR code remains constant, ensuring that information is always available and accessible consistently.",
    icon: "◈",
    color: "blue",
  },
  {
    title: "Simplicity of creation",
    desc: "Static QR codes are quick and easy to generate, making them ideal for situations where quick access to specific information is needed.",
    icon: "ϟ",
    color: "purple",
  },
  {
    title: "Universal Compatibility",
    desc: "Static QR Codes are compatible with a wide range of scanning devices and apps, ensuring that anyone with a compatible device can access the content.",
    icon: "▣",
    color: "green",
  },
  {
    title: "No internet required",
    desc: "Once the static QR code has been generated, an internet connection is not required to access the linked content, making it ideal for areas where connectivity is limited or non-existent.",
    icon: "⌁",
    color: "blue",
  },
  {
    title: "Lower complexity",
    desc: "By not requiring a management system to update content, static QR codes are simpler to manage and maintain, making them a practical and cost-effective option for various applications.",
    icon: "⚙",
    color: "orange",
  },
  {
    title: "Reliability",
    desc: "Since the content remains unchanged, static QR codes offer greater reliability and consistency in the delivery of information, avoiding possible errors or misunderstandings caused by frequent updates.",
    icon: "✦",
    color: "pink",
  },
  {
    title: "Information security",
    desc: "By not allowing changes to the content, static QR codes ensure the integrity and security of the linked information, protecting it from possible unauthorized manipulation or alteration.",
    icon: "▣",
    color: "blue",
  },
];

const steps = [
  {
    num: 1,
    title: "Choosing the type of static QR:",
    desc: "Before creating your static QR code, decide what type of information you want to share. You can opt for a URL that points to your website, a simple text, or even a contact card. Choose the type of QR that best suits your needs and the experience you want to provide to your users.",
    icon: "▦",
  },
  {
    num: 2,
    title: "Adding Required Information:",
    desc: "Once you have selected the type of static QR code, it is time to add the necessary information. It is crucial that the content is short, clear and relevant to your users.",
    icon: "▤",
  },
  {
    num: 3,
    title: "QR Code Customization:",
    desc: "Customize your static QR code so that it reflects your brand and is easily recognizable. You can choose colors, add a frame, and adjust the design based on your brand identity.",
    icon: "◉",
  },
  {
    num: 4,
    title: "QR Code Download:",
    desc: "Once you have created and customized your static QR code, download it in the format that best suits your needs. You can choose between formats such as PNG, JPG or SVG.",
    icon: "↓",
  },
];

const iconStyles = {
  blue: "bg-blue-50 text-blue-500",
  purple: "bg-purple-50 text-purple-500",
  green: "bg-green-50 text-green-500",
  orange: "bg-orange-50 text-orange-500",
  pink: "bg-pink-50 text-pink-500",
};

const StaticQRPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <main className="relative overflow-hidden bg-white">

        {/* =====================================================
            HERO BACKGROUND DECORATIONS
        ====================================================== */}

        {/* Left blue wave */}
        <div
          className="
            absolute
            top-0
            left-[-170px]
            w-[420px]
            h-[260px]
            bg-gradient-to-br
            from-blue-100
            via-blue-50
            to-transparent
            rounded-[45%]
            rotate-[-12deg]
            opacity-80
            pointer-events-none
          "
        />

        {/* Top right orange circle */}
        <div
          className="
            absolute
            top-[-100px]
            right-[-70px]
            w-[260px]
            h-[260px]
            border
            border-orange-200
            rounded-full
            pointer-events-none
          "
        />

        {/* Right purple blob */}
        <div
          className="
            absolute
            top-[110px]
            right-[-80px]
            w-[180px]
            h-[180px]
            bg-purple-100
            rounded-full
            blur-[1px]
            opacity-60
            pointer-events-none
          "
        />

        {/* Left dotted decoration */}
        <div
          className="
            absolute
            top-[110px]
            left-[105px]
            w-[70px]
            h-[70px]
            opacity-50
            pointer-events-none
          "
          style={{
            backgroundImage:
              "radial-gradient(#9fc8ff 1.6px, transparent 1.6px)",
            backgroundSize: "14px 14px",
          }}
        />

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative z-10">

          <div className="max-w-7xl mx-auto px-6 pt-12">

            <div className="text-center max-w-[700px] mx-auto">
              <h1
                className="
                  text-[44px]
                  md:text-[48px]
                  font-bold
                  tracking-[-1.5px]
                  text-[#101633]
                  leading-tight
                "
              >
                Static QRs
              </h1>

              <p
                className="
                  mt-4
                  text-[15px]
                  leading-6
                  text-[#626a80]
                  max-w-[480px]
                  mx-auto
                "
              >
                Create once, scan forever. Share information that remains
                constant and always accessible.
              </p>
            </div>

            {/* =================================================
                QR TYPES
            ================================================== */}

            <div
              className="
                mt-10
                grid
                grid-cols-2
                sm:grid-cols-4
                lg:grid-cols-7
                gap-4
                max-w-[1180px]
                mx-auto
              "
            >
              {[
                { name: "SMS", icon: "💬" },
                { name: "Text", icon: "📑" },
                { name: "Phone", icon: "☎️" },
                { name: "Email", icon: "📧", active: true },
                { name: "Vcard", icon: "🗃️" },
                { name: "Wi-Fi", icon: "🛜" },
                { name: "URL", icon: "🔗" },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`
                    group
                    relative
                    h-[145px]
                    rounded-[18px]
                    bg-white
                    border
                    ${
                      item.active
                        ? "border-orange-400 shadow-[0_8px_30px_rgba(255,145,60,0.12)]"
                        : "border-[#e8ebf2]"
                    }
                    flex
                    flex-col
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_12px_35px_rgba(30,50,100,0.10)]
                  `}
                >
                  <div
                    className={`
                      w-[58px]
                      h-[58px]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[29px]
                      ${
                        item.active
                          ? "bg-orange-50 text-orange-500"
                          : "bg-gradient-to-br from-blue-50 to-purple-50 text-[#5266d9]"
                      }
                    `}
                  >
                    {item.icon}
                  </div>

                  <span
                    className="
                      mt-4
                      text-[15px]
                      font-semibold
                      text-[#171a2e]
                    "
                  >
                    {item.name}
                  </span>

                  {item.active && (
                    <span
                      className="
                        absolute
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        w-12
                        h-[3px]
                        bg-orange-400
                        rounded-full
                      "
                    />
                  )}
                </div>
              ))}
            </div>

            {/* =================================================
                INTRO
            ================================================== */}

            <div
              className="
                max-w-[900px]
                mx-auto
                mt-8
                text-center
                text-[14px]
                md:text-[15px]
                leading-7
                text-[#555d72]
              "
            >
              <p>
                Static QR codes are an efficient and versatile tool for sharing
                information digitally. Unlike dynamic QR codes, which allow
                linked content to be updated without changing the physical
                code, static QR codes keep information constant over time,
                making them valuable in various situations.
              </p>

              <p className="mt-3">
                For example, imagine a coffee shop that offers free Wi-Fi to
                its customers. By using a static QR code, the coffee shop can
                generate a unique code that allows customers to easily connect
                to the Wi-Fi network. This code remains constant over time,
                ensuring that clients can always access the Wi-Fi network
                without needing to change the code.
              </p>

              <p className="mt-3">
                In short, static QR codes offer a practical and reliable
                solution for sharing information in a constant and accessible
                way. Below, we present an overview of its most notable
                benefits.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            BENEFITS
        ====================================================== */}

        <section className="relative z-10 max-w-7xl mx-auto px-6 mt-10">

          <div
            className="
              relative
              rounded-[20px]
              bg-white
              border
              border-[#e7eaf1]
              shadow-[0_8px_35px_rgba(30,45,90,0.05)]
              p-7
              md:p-8
            "
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="w-[3px] h-7 bg-[#3567ee] rounded-full" />

              <h2
                className="
                  text-[23px]
                  font-bold
                  text-[#101633]
                "
              >
                Benefits
              </h2>
            </div>

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-x-8
                gap-y-9
              "
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`
                    ${
                      index === 4
                        ? "lg:col-span-1"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-start gap-3">

                    <div
                      className={`
                        shrink-0
                        w-[38px]
                        h-[38px]
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-[18px]
                        font-bold
                        ${iconStyles[benefit.color]}
                      `}
                    >
                      {benefit.icon}
                    </div>

                    <div>
                      <h3
                        className="
                          text-[13px]
                          font-bold
                          text-[#171a2e]
                          leading-5
                        "
                      >
                        {benefit.title}
                      </h3>

                      <p
                        className="
                          mt-2
                          text-[11px]
                          leading-[1.75]
                          text-[#687084]
                        "
                      >
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TO USE SECTION
        ====================================================== */}

        <section
          className="
            relative
            z-10
            max-w-7xl
            mx-auto
            px-6
            mt-5
            pb-12
          "
        >

          {/* Main lavender background */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[22px]
              bg-gradient-to-br
              from-[#f7f8ff]
              via-[#f4f4ff]
              to-[#eef4ff]
              border
              border-[#e5e8f6]
              p-7
              md:p-8
            "
          >

            {/* decorative bottom-right dots */}
            <div
              className="
                absolute
                right-[-5px]
                bottom-[130px]
                w-[95px]
                h-[95px]
                opacity-50
              "
              style={{
                backgroundImage:
                  "radial-gradient(#b5caff 2px, transparent 2px)",
                backgroundSize: "15px 15px",
              }}
            />

            {/* orange curved decoration */}
            <div
              className="
                absolute
                right-[-70px]
                top-[190px]
                w-[180px]
                h-[180px]
                border
                border-orange-300
                rounded-full
                opacity-70
              "
            />

            <h2
              className="
                relative
                text-[27px]
                font-bold
                text-[#101633]
                mb-5
              "
            >
              How to use

              <span
                className="
                  block
                  mt-2
                  w-10
                  h-[3px]
                  bg-[#3567ee]
                  rounded-full
                "
              />
            </h2>

            {/* =================================================
                IMAGE / FORM PREVIEW
            ================================================== */}

            <div
              className="
                relative
                rounded-[17px]
                overflow-hidden
                bg-white
                border
                border-[#e4e7ef]
                shadow-[0_6px_25px_rgba(30,45,90,0.06)]
              "
            >
              <img
                src={MOBILE_IMG}
                alt="How to use"
                className="
                  block
                  w-full
                  h-auto
                  object-contain
                "
              />
            </div>

            {/* Description */}

            <p
              className="
                relative
                max-w-[720px]
                mx-auto
                mt-7
                mb-6
                text-center
                text-[12px]
                md:text-[13px]
                leading-6
                text-[#667087]
              "
            >
              Static QR codes are a quick and easy way to share information
              digitally. Here's how to create and customize your own static QR
              codes to get the most out of them:
            </p>

            {/* =================================================
                STEPS
            ================================================== */}

            <div className="relative space-y-2">

              {steps.map((step, index) => (
                <div
                  key={step.num}
                  className="
                    group
                    flex
                    items-start
                    gap-4
                    bg-white
                    border
                    border-[#e8eaf2]
                    rounded-[10px]
                    px-4
                    py-3
                    shadow-[0_3px_12px_rgba(30,45,90,0.035)]
                    transition-all
                    duration-200
                    hover:-translate-y-[1px]
                    hover:shadow-[0_6px_18px_rgba(30,45,90,0.07)]
                  "
                >

                  {/* Number */}

                  <div
                    className={`
                      shrink-0
                      w-[34px]
                      h-[34px]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                      text-[13px]
                      ${
                        index === 2
                          ? "bg-orange-500"
                          : index === 3
                          ? "bg-green-500"
                          : "bg-[#3567ee]"
                      }
                    `}
                  >
                    {step.num}
                  </div>

                  {/* Step icon */}

                  <div
                    className="
                      hidden
                      sm:flex
                      shrink-0
                      w-[34px]
                      h-[34px]
                      rounded-full
                      bg-[#f7f8ff]
                      items-center
                      justify-center
                      text-[#5369dc]
                      text-[18px]
                    "
                  >
                    {step.icon}
                  </div>

                  {/* Text */}

                  <p
                    className="
                      text-[11px]
                      md:text-[12px]
                      leading-[1.7]
                      text-[#626b80]
                      pt-1
                    "
                  >
                    <span
                      className="
                        font-bold
                        text-[#171a2e]
                      "
                    >
                      {step.title}
                    </span>{" "}
                    {step.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* =====================================================
            BOTTOM SOFT DECORATION
        ====================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-[-100px]
            w-[250px]
            h-[150px]
            bg-gradient-to-tr
            from-blue-100
            to-transparent
            rounded-full
            opacity-50
            pointer-events-none
          "
        />

      </main>
    </ScreenView>
  );
};

export default StaticQRPage;
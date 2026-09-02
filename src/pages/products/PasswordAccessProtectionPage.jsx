import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/pass/hero.webp";
import how1Img from "../../assets/images/products/pass/how1.webp";

const HERO = heroImg;
const CONFIG_IMG = how1Img;

const steps = [
  "Select the type of QR you want to create or edit.",
  'In the QR Settings tab, find the "Password" option.',
  "Activate this functionality by checking the corresponding box.",
  "Select a secure password that users must enter to access the QR content.",
  "Finish the QR creation or editing process as usual.",
];

const Step = ({ index, text }) => {
  return (
    <div
      className="
        group
        relative
        flex items-center gap-4
        rounded-2xl
        border border-[#e5edf6]
        bg-white
        px-5 py-4
        shadow-[0_5px_22px_rgba(32,76,120,0.04)]
        transition-all duration-300
        hover:-translate-y-[2px]
        hover:border-[#cfe4fa]
        hover:shadow-[0_10px_28px_rgba(32,126,210,0.09)]
      "
    >
      {/* Number */}
      <div
        className="
          relative
          flex-shrink-0
          w-9 h-9
          rounded-full
          bg-gradient-to-br
          from-[#238ee5]
          to-[#0872c9]
          text-white
          flex items-center justify-center
          text-sm font-bold
          shadow-[0_7px_15px_rgba(20,126,211,0.22)]
        "
      >
        {index}
      </div>

      {/* Text */}
      <p
        className="
          text-[14px]
          sm:text-[15px]
          leading-6
          text-[#53677f]
        "
      >
        {text}
      </p>
    </div>
  );
};

const PasswordAccessProtectionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <main className="bg-white overflow-hidden">

        {/* =====================================================
            HERO SECTION
        ====================================================== */}
        <section
          className="
            relative
            overflow-hidden
            bg-gradient-to-b
            from-white
            via-[#f9fcff]
            to-white
          "
        >
          {/* Left decorative wave */}
          <div
            className="
              absolute
              -left-[230px]
              top-[150px]
              w-[520px]
              h-[520px]
              rounded-full
              bg-[#edf7ff]
              opacity-90
              blur-[1px]
            "
          />

          {/* Right decorative wave */}
          <div
            className="
              absolute
              -right-[260px]
              top-[210px]
              w-[540px]
              h-[540px]
              rounded-full
              bg-[#f0f8ff]
            "
          />

          {/* Top blue glow */}
          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              top-[180px]
              w-[650px]
              h-[300px]
              rounded-full
              bg-[#eaf5ff]
              blur-[70px]
              opacity-70
            "
          />

          {/* Decorative dots - right */}
          <div
            className="
              absolute
              right-[8%]
              top-[90px]
              w-[130px]
              h-[180px]
              opacity-40
            "
            style={{
              backgroundImage:
                "radial-gradient(#7db9ed 1.2px, transparent 1.2px)",
              backgroundSize: "10px 10px",
            }}
          />

          {/* Decorative dots - left */}
          <div
            className="
              absolute
              left-[4%]
              top-[310px]
              w-[100px]
              h-[150px]
              opacity-25
            "
            style={{
              backgroundImage:
                "radial-gradient(#72b5ec 1px, transparent 1px)",
              backgroundSize: "9px 9px",
            }}
          />

          {/* Top curved white wave */}
          <div className="absolute top-0 left-0 right-0 h-[90px] bg-white">
            <div
              className="
                absolute
                -bottom-[70px]
                left-1/2
                -translate-x-1/2
                w-[115%]
                h-[110px]
                rounded-[50%]
                bg-white
              "
            />
          </div>

          <div
            className="
              relative
              max-w-6xl
              mx-auto
              px-5 sm:px-6
              pt-[115px]
              pb-[75px]
            "
          > 

            {/* Heading */}
            <div className="text-center">
              <h1
                className="
                  text-[#102752]
                  font-bold
                  tracking-[-1.8px]
                  text-[38px]
                  sm:text-[46px]
                  lg:text-[52px]
                  leading-[1.08]
                "
              >
                Password access protection
              </h1>
            </div>

            {/* Hero Image */}
            <div
              className="
                relative
                flex
                justify-center
                mt-9
                sm:mt-10
              "
            >
              {/* Image glow */}
              <div
                className="
                  absolute
                  top-[25%]
                  left-1/2
                  -translate-x-1/2
                  w-[430px]
                  h-[230px]
                  rounded-full
                  bg-[#dcefff]
                  blur-[45px]
                  opacity-80
                "
              />

              <img
                src={HERO}
                alt="Password access protection"
                className="
                  relative
                  w-full
                  max-w-[760px]
                  object-contain
                  drop-shadow-[0_20px_35px_rgba(35,117,190,0.08)]
                "
              />
            </div>

            {/* Intro */}
            <div
              className="
                max-w-[900px]
                mx-auto
                text-center
                mt-8
                sm:mt-10
                space-y-4
              "
            >
              <p
                className="
                  text-[14px]
                  sm:text-[15px]
                  leading-7
                  text-[#52677f]
                "
              >
                Imagine having the ability to add an extra layer of security
                to your QR codes to control who can access the information
                once scanned.
              </p>

              <p
                className="
                  text-[14px]
                  sm:text-[15px]
                  leading-7
                  text-[#52677f]
                "
              >
                With the password access protection feature, you can do just
                that. It's an effective way to keep your data confidential and
                ensure that only authorized people can see what's behind the QR.
              </p>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="relative h-[50px]">
            <div
              className="
                absolute
                left-1/2
                -translate-x-1/2
                -bottom-[35px]
                w-[115%]
                h-[90px]
                rounded-[50%]
                bg-white
              "
            />
          </div>
        </section>

        {/* =====================================================
            BENEFITS SECTION
        ====================================================== */}
        <section className="relative bg-white py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">

            <div
              className="
                relative
                overflow-hidden
                rounded-[24px]
                border border-[#dcecff]
                bg-gradient-to-br
                from-[#f3f9ff]
                via-[#f8fbff]
                to-white
                px-6 py-8
                sm:px-10
                sm:py-9
              "
            >
              {/* Decorative dots */}
              <div
                className="
                  absolute
                  left-[45px]
                  top-[40px]
                  w-[130px]
                  h-[170px]
                  opacity-35
                "
                style={{
                  backgroundImage:
                    "radial-gradient(#72b5ed 1px, transparent 1px)",
                  backgroundSize: "9px 9px",
                }}
              />

              {/* Shield / Lock Icon */}
              <div
                className="
                  absolute
                  left-[65px]
                  top-1/2
                  -translate-y-1/2
                  hidden
                  md:flex
                  w-[120px]
                  h-[120px]
                  rounded-full
                  bg-[#e9f4ff]
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    w-[78px]
                    h-[92px]
                    rounded-[24px]
                    bg-white
                    border border-[#cfe5fc]
                    flex items-center justify-center
                    shadow-[0_15px_35px_rgba(25,121,203,0.12)]
                  "
                >
                  <span
                    className="
                      text-[42px]
                      text-[#167ed7]
                    "
                  >
                    🔒
                  </span>
                </div>
              </div>

              {/* Benefits Content */}
              <div className="relative md:ml-[205px]">

                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="
                      w-9 h-9
                      rounded-xl
                      bg-[#e5f2ff]
                      flex items-center justify-center
                      text-[#167ed7]
                      text-lg
                    "
                  >
                    ✦
                  </div>

                  <h2
                    className="
                      text-2xl
                      sm:text-[27px]
                      font-bold
                      tracking-[-0.5px]
                      text-[#102752]
                    "
                  >
                    Benefits
                  </h2>
                </div>

                <div className="space-y-5">

                  <p
                    className="
                      text-[14px]
                      sm:text-[15px]
                      leading-7
                      text-[#53677f]
                    "
                  >
                    Integrating password access protection into your QR codes
                    offers several significant benefits. First, it gives you
                    complete control over who can access the content of the QR
                    by requiring a password to open it. This provides an
                    additional layer of security, ensuring that only authorized
                    people can view the information.
                  </p>

                  <p
                    className="
                      text-[14px]
                      sm:text-[15px]
                      leading-7
                      text-[#53677f]
                    "
                  >
                    Imagine a promotional campaign where you place QRs in
                    print or digital ads that take users to exclusive offers
                    in your online store. By adding password protection, you
                    limit access to these offers only to subscribers on your
                    mailing list who know the password, increasing exclusivity
                    and interest in the offer.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            HOW TO USE
        ====================================================== */}
        <section
          className="
            relative
            overflow-hidden
            bg-[#f8fbff]
            pt-16
            pb-20
            mt-4
          "
        >
          {/* Top wave */}
          <div
            className="
              absolute
              top-[-55px]
              left-1/2
              -translate-x-1/2
              w-[115%]
              h-[100px]
              rounded-[50%]
              bg-white
            "
          />

          {/* Background glow */}
          <div
            className="
              absolute
              left-[-220px]
              top-[300px]
              w-[450px]
              h-[450px]
              rounded-full
              bg-[#eaf5ff]
              blur-[40px]
              opacity-70
            "
          />

          <div
            className="
              absolute
              right-[-220px]
              top-[500px]
              w-[450px]
              h-[450px]
              rounded-full
              bg-[#eef7ff]
              blur-[35px]
            "
          />

          <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
            
            {/* Heading */}
            <h2
              className="
                text-center
                text-[32px]
                sm:text-[40px]
                font-bold
                tracking-[-1px]
                text-[#102752]
              "
            >
              How to use
            </h2>

            {/* Small blue line */}
            <div className="flex justify-center mt-3 mb-9">
              <div
                className="
                  w-12
                  h-[4px]
                  rounded-full
                  bg-[#2188df]
                "
              />
            </div>

            {/* =================================================
                CONFIGURATION IMAGE
            ================================================== */}
            <div
              className="
                relative
                rounded-[24px]
                border border-[#dcecff]
                bg-white
                p-3 sm:p-5
                shadow-[0_12px_40px_rgba(31,86,130,0.06)]
              "
            >
              <div
                className="
                  rounded-[18px]
                  bg-[#eef6ff]
                  p-4
                  sm:p-7
                  overflow-hidden
                "
              >
                <img
                  src={CONFIG_IMG}
                  alt="Password configuration"
                  className="
                    relative
                    w-full
                    rounded-[14px]
                    object-contain
                    shadow-[0_10px_30px_rgba(30,90,140,0.06)]
                  "
                />
              </div>
            </div>

            {/* =================================================
                STEPS INTRO
            ================================================== */}
            <div className="max-w-5xl mx-auto mt-8">
              <p
                className="
                  text-[14px]
                  sm:text-[15px]
                  leading-7
                  text-[#596d84]
                  mb-5
                "
              >
                To use password access protection on your QR codes, follow
                these steps:
              </p>

              {/* Steps */}
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    index={index + 1}
                    text={step}
                  />
                ))}
              </div>
            </div>

            {/* =================================================
                FINAL NOTE
            ================================================== */}
            <div
              className="
                max-w-5xl
                mx-auto
                mt-7
                rounded-[20px]
                border border-[#d3e8fc]
                bg-gradient-to-r
                from-[#edf7ff]
                to-white
                px-5 py-5
                sm:px-6
                flex
                items-start
                gap-4
              "
            >
              {/* Info icon */}
              <div
                className="
                  flex-shrink-0
                  w-10 h-10
                  rounded-full
                  bg-[#e5f3ff]
                  text-[#147bd3]
                  flex items-center justify-center
                  font-bold
                  text-lg
                "
              >
                i
              </div>

              <p
                className="
                  text-[14px]
                  sm:text-[15px]
                  leading-7
                  text-[#536980]
                "
              >
                Once set, the password will be applied to the QR, ensuring
                that only those who know the password can access the protected
                content.
              </p>
            </div>
          </div>

          {/* Bottom wave */}
          <div
            className="
              absolute
              bottom-[-55px]
              left-1/2
              -translate-x-1/2
              w-[115%]
              h-[100px]
              rounded-[50%]
              bg-white
            "
          />
        </section>

      </main>
    </ScreenView>
  );
};

export default PasswordAccessProtectionPage;
import React, { useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/bulk/hero.webp";
import mobileImg from "../../assets/images/products/bulk/how-to-use.webp";

const HERO_IMG = heroImg;
const MOBILE_IMG = mobileImg;

const massCreationBenefits = [
  {
    title: "Operational efficiency",
    desc: "With just one click, you can generate all the necessary codes, saving you hours of manual work. This efficiency is crucial for large-scale projects.",
    icon: "🚀",
  },
  {
    title: "Speed",
    desc: "Bulk creation allows large volumes of data to be processed quickly, which is essential in tight deadline situations.",
    icon: "⏱",
  },
  {
    title: "Uniformity and consistency",
    desc: "Ensures that all codes maintain a consistent layout and format, which is vital to maintaining a professional and consistent image.",
    icon: "🛡",
  },
  {
    title: "Large-scale customization",
    desc: "You can create custom QR codes for each member of a team or product in an inventory. For example, if your company is participating in a conference, you can generate vCards for all team members by simply uploading a CSV file with their data.",
    icon: "⚙",
  },
];

const bulkDownloadBenefits = [
  {
    title: "Simplified organization",
    desc: "Facilitates the organization and distribution of QR codes on materials printed or digital. Having all the codes ready to download in a single file optimizes logistics.",
    icon: "⇩",
  },
  {
    title: "Convenience and accessibility",
    desc: "Allows you to have all QR codes available in a downloadable file, ready to be used anytime, anywhere.",
    icon: "◎",
  },
  {
    title: "Flexibility and adaptability",
    desc: "Facilitates rapid response to changes or unforeseen needs, as all QR codes can be easily accessed. This is especially useful for dynamic marketing campaigns or events with multiple activities.",
    icon: "⌁",
  },
  {
    title: "Distribution efficiency",
    desc: "Simplifies the process of integrating QR codes into various platforms and materials, improving operational efficiency. For example, once you have all the QR codes downloaded, you can quickly integrate them into presentations, brochures, or promotional materials.",
    icon: "▥",
  },
];

const massCreationSteps = [
  {
    num: 1,
    desc: 'Access the "Create massive QRs" section in the left side menu.',
  },
  {
    num: 2,
    desc: "Select the type of QR you want to generate in quantity and customize the design, including colors and frames that will be applied uniformly to all QRs.",
  },
  {
    num: 3,
    desc: "Download the example CSV file and replace the example data with the information required for your QRs.",
  },
  {
    num: 4,
    desc: 'Load the updated CSV with the data for each QR and you will find all the codes listed in the "My QRs" section.',
  },
];

const bulkDownloadSteps = [
  {
    num: 1,
    desc: 'From the "My QRs" section, select all the QR codes you want to download by clicking on the selection box located at the far left of each one.',
  },
  {
    num: 2,
    desc: 'Click on the "Download" button that will appear in the lower menu.',
  },
  {
    num: 3,
    desc: "Select in which format you want to download your QRs: PNG, SVG, EPS, PDF. You can also customize the download by choosing the size of your QRs.",
  },
  {
    num: 4,
    desc: "Once downloaded, save the file to your device and use it as needed.",
  },
];

const BenefitCard = ({ title, desc, icon }) => (
  <div className="flex gap-4 group">
    <div
      className="
        flex-shrink-0
        w-12 h-12
        rounded-2xl
        bg-[#f1f6ff]
        border border-[#e4ecff]
        flex items-center justify-center
        text-xl
        text-[#1769ff]
        shadow-sm
        transition-all
        duration-300
        group-hover:-translate-y-1
        group-hover:shadow-md
      "
    >
      {icon}
    </div>

    <div>
      <h3 className="font-bold text-[#101b4d] text-[15px] mb-1">
        {title}
      </h3>

      <p className="text-[13px] leading-6 text-[#58627a]">
        {desc}
      </p>
    </div>
  </div>
);

const StepItem = ({ num, desc }) => (
  <div className="flex items-start gap-4">
    <div
      className="
        w-8 h-8
        flex-shrink-0
        rounded-full
        bg-[#1675ff]
        text-white
        text-sm
        font-bold
        flex items-center justify-center
        shadow-[0_5px_14px_rgba(22,117,255,0.25)]
      "
    >
      {num}
    </div>

    <p className="text-[13px] leading-6 text-[#59637a] pt-0.5">
      {desc}
    </p>
  </div>
);

const CardHeading = ({ children }) => (
  <div className="mb-6">
    <h2 className="text-[22px] md:text-[24px] font-extrabold text-[#101b4d]">
      {children}
    </h2>

    <div className="mt-3 flex items-center gap-2">
      <span className="w-10 h-[3px] rounded-full bg-[#1769ff]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#1769ff]" />
    </div>
  </div>
);

const BulkCreation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <div className="relative overflow-hidden bg-white">

        {/* =====================================================
            DECORATIVE BACKGROUND
        ====================================================== */}

        {/* Left blue wave */}
        <div
          className="
            absolute
            -top-28
            -left-32
            w-[360px]
            h-[420px]
            bg-[#edf3ff]
            rounded-[45%_55%_65%_35%]
            blur-[1px]
            pointer-events-none
          "
        />

        {/* Right purple wave */}
        <div
          className="
            absolute
            top-[-100px]
            -right-28
            w-[320px]
            h-[350px]
            bg-[#f3eaff]
            rounded-[50%_40%_60%_45%]
            pointer-events-none
          "
        />

        {/* Orange curved decoration */}
        <div
          className="
            absolute
            top-[-120px]
            right-[80px]
            w-[230px]
            h-[230px]
            rounded-full
            border-[2px]
            border-orange-300
            opacity-80
            pointer-events-none
          "
        />

        {/* Left dots */}
        <div
          className="
            absolute
            top-[110px]
            left-[35px]
            w-[55px]
            h-[55px]
            opacity-80
            pointer-events-none
          "
          style={{
            backgroundImage:
              "radial-gradient(#1769ff 2px, transparent 2px)",
            backgroundSize: "14px 14px",
          }}
        />

        {/* Right dots */}
        <div
          className="
            absolute
            top-[300px]
            right-[35px]
            w-[55px]
            h-[55px]
            opacity-70
            pointer-events-none
          "
          style={{
            backgroundImage:
              "radial-gradient(#8b5cf6 2px, transparent 2px)",
            backgroundSize: "14px 14px",
          }}
        />

        <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 pb-20">

          {/* =====================================================
              HERO
          ====================================================== */}

          <section className="pt-12 md:pt-16 text-center">

            <h1
              className="
                text-[34px]
                md:text-[46px]
                lg:text-[50px]
                leading-tight
                font-extrabold
                text-[#101b4d]
              "
            >
              Bulk creation and download
            </h1>

            <div className="flex justify-center items-center gap-2 mt-5">
              <span className="w-10 h-[4px] rounded-full bg-[#1769ff]" />
              <span className="w-2 h-2 rounded-full bg-[#1769ff]" />
            </div>

            {/* Hero image */}
            <div className="mt-8 md:mt-10 flex justify-center">
              <img
                src={HERO_IMG}
                alt="Bulk creation hero"
                className="
                  w-full
                  max-w-[760px]
                  object-contain
                  drop-shadow-[0_15px_35px_rgba(38,84,160,0.08)]
                "
              />
            </div>

            {/* Intro */}
            <div
              className="
                max-w-[930px]
                mx-auto
                mt-6
                md:mt-8
                text-[13px]
                md:text-[14px]
                leading-6
                text-[#202b4c]
                font-medium
              "
            >
              <p>
                Managing and generating large quantities of QR codes can be an
                arduous task, but our bulk creation and download tools make this
                process fast and efficient. Imagine a company hosting an event that
                needs to create dynamic vCard QRs for all of its employees, or a
                retailer that needs to generate static QR codes with product
                information to organize inventory. These tools allow you to save
                time and effort, making it easier to manage your projects.
                Furthermore, you don't need to worry about having advanced technical
                knowledge; With QRFY, mass QR code creation is intuitive and
                accessible.
              </p>
            </div>
          </section>

          {/* =====================================================
              MASS CREATION BENEFITS
          ====================================================== */}

          <section
            className="
              relative
              mt-12
              md:mt-16
              rounded-[22px]
              border
              border-[#e7ebf3]
              bg-white
              p-6
              md:p-9
              shadow-[0_10px_40px_rgba(31,74,145,0.07)]
              overflow-hidden
            "
          >
            {/* card decoration */}
            <div
              className="absolute top-4 right-5 w-12 h-12 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(#4b83ff 1.5px, transparent 1.5px)",
                backgroundSize: "9px 9px",
              }}
            />

            <CardHeading>Benefits of mass creation</CardHeading>

            <p className="text-[13px] md:text-[14px] text-[#59637a] leading-6 max-w-[900px] mb-8">
              Mass creation of QR codes not only simplifies the management of
              large volumes of information, but also offers a number of crucial
              advantages for various business and organizational applications:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {massCreationBenefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </section>

          {/* =====================================================
              BULK DOWNLOAD BENEFITS
          ====================================================== */}

          <section
            className="
              relative
              mt-5
              rounded-[22px]
              border
              border-[#e7ebf3]
              bg-white
              p-6
              md:p-9
              shadow-[0_10px_40px_rgba(31,74,145,0.07)]
              overflow-hidden
            "
          >
            <CardHeading>Benefits of Bulk Download</CardHeading>

            <p className="text-[13px] md:text-[14px] text-[#59637a] leading-6 mb-8">
              The mass download of QR codes offers multiple advantages that
              simplify the management and distribution of digital information in
              an efficient and organized manner:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {bulkDownloadBenefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>

            <p className="text-[13px] md:text-[14px] text-[#59637a] leading-6 mt-8">
              These tools allow for more efficient and organized management of QR
              codes, ensuring you can focus on what really matters: delivering
              great content and service to your customers.
            </p>
          </section>

          {/* =====================================================
              HOW TO USE
          ====================================================== */}

          <section className="mt-12 md:mt-16">

            <CardHeading>How to use</CardHeading>

            <div
              className="
                relative
                rounded-[22px]
                overflow-hidden
                border
                border-[#e6ebf5]
                bg-[#f3f7ff]
                p-5
                md:p-8
              "
            >
              {/* background wave */}
              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  w-64
                  h-64
                  bg-[#e7efff]
                  rounded-full
                  opacity-80
                "
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">

                {/* Image */}
                <div
                  className="
                    bg-white
                    rounded-2xl
                    border
                    border-[#e4e9f2]
                    p-4
                    md:p-5
                    shadow-[0_12px_30px_rgba(31,74,145,0.10)]
                  "
                >
                  <img
                    src={MOBILE_IMG}
                    alt="How to use bulk creation"
                    className="w-full object-contain rounded-xl"
                  />
                </div>

                {/* Right content */}
                <div className="hidden lg:flex flex-col items-center justify-center">

                  <div className="w-24 h-24 rounded-[25px] bg-white shadow-lg flex items-center justify-center text-5xl">
                    📄
                  </div>

                  <div className="mt-5 text-center">
                    <h3 className="text-xl font-extrabold text-[#101b4d]">
                      Create & upload
                    </h3>

                    <p className="text-sm text-[#657089] mt-2 leading-6">
                      Upload your CSV and generate multiple QR codes quickly.
                    </p>
                  </div>

                  <div className="mt-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#1769ff] text-2xl">
                    ↓
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[13px] md:text-[14px] text-[#59637a] leading-6 mt-6">
              Now that you know the benefits of creating and downloading QR codes
              in bulk, we show you how to use this tool with a simple step by
              step:
            </p>
          </section>

          {/* =====================================================
              STEP GUIDES
          ====================================================== */}

          <section className="mt-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Mass creation */}
              <div
                className="
                  rounded-[20px]
                  border
                  border-[#e7ebf3]
                  bg-white
                  p-6
                  md:p-7
                  shadow-[0_8px_30px_rgba(31,74,145,0.06)]
                "
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#eef8f0] flex items-center justify-center text-xl">
                    ⚙️
                  </div>

                  <div>
                    <h3 className="text-[18px] font-extrabold text-[#101b4d]">
                      Mass creation of QR Codes
                    </h3>

                    <div className="w-7 h-[3px] bg-green-500 rounded-full mt-2" />
                  </div>
                </div>

                <div className="space-y-5">
                  {massCreationSteps.map((step) => (
                    <StepItem key={step.num} {...step} />
                  ))}
                </div>
              </div>

              {/* Bulk download */}
              <div
                className="
                  rounded-[20px]
                  border
                  border-[#e7ebf3]
                  bg-white
                  p-6
                  md:p-7
                  shadow-[0_8px_30px_rgba(31,74,145,0.06)]
                "
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#f4edff] flex items-center justify-center text-xl">
                    ☁️
                  </div>

                  <div>
                    <h3 className="text-[18px] font-extrabold text-[#101b4d]">
                      Bulk download of QR Codes
                    </h3>

                    <div className="w-7 h-[3px] bg-purple-500 rounded-full mt-2" />
                  </div>
                </div>

                <div className="space-y-5">
                  {bulkDownloadSteps.map((step) => (
                    <StepItem key={step.num} {...step} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              FINAL NOTE
          ====================================================== */}

          <section
            className="
              relative
              mt-5
              rounded-[20px]
              border
              border-[#e4eafa]
              bg-[#f5f8ff]
              px-6
              py-5
              overflow-hidden
            "
          >
            <div className="flex gap-4 items-start">

              <div
                className="
                  w-12 h-12
                  flex-shrink-0
                  rounded-full
                  bg-white
                  shadow-md
                  flex items-center
                  justify-center
                  text-xl
                  text-[#1769ff]
                "
              >
                ★
              </div>

              <div className="text-[13px] md:text-[14px] text-[#59637a] leading-6">
                <p>
                  The CSV files generated are compatible with spreadsheet programs
                  such as Excel and OpenOffice Calc, making it easy to import and
                  export data, allowing you to manage and manipulate your QR codes
                  quickly and efficiently.
                </p>

                <p className="mt-2">
                  With the creation and mass download of QR codes, you will be able
                  to manage your QR codes more efficiently and organizedly, ensuring
                  that you can focus on what really matters: offering excellent
                  content and service to your customers.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </ScreenView>
  );
};

export default BulkCreation;
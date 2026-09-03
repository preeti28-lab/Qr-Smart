import React from "react";
import HoverButton from "./components/buttons/HoverButton";
import { AiOutlineSafety } from "react-icons/ai";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { SlSpeedometer } from "react-icons/sl";
import { IoCubeSharp } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { BsGraphUpArrow } from "react-icons/bs";
import qranimation from "./assets/qranimation.json";
import selectAnimation from "./assets/select-animation.json";
import generateAnimation from "./assets/generate-animation.json";
import customizeAnimation from "./assets/download-animation.json";
import Lottie from "lottie-react";
import { CgQr } from "react-icons/cg";
import CreateQRSteps from "./pages/home/StepsToQR";
import QRGenerate from "./pages/home/qrGenerate/QRGenerate";
import { useNavigate } from "react-router-dom";
import SectionHeading from "./components/ui/SectionHeading";

const Introduction = () => {
  const navigate = useNavigate();

  const IntroLink = ({ to = null, children }) => {
    return (
      <a href={to} className="text-blue-700 underline underline-offset-2">
        {children}
      </a>
    );
  };

  const whyData = [
    {
      heading: "Instant & Seamless Redirection",
      subheading: "Connect users with a single scan",
    },
    {
      heading: "Real-Time Analytics",
      subheading: "Track scans and optimize performance",
    },
    {
      heading: "Customizable & Dynamic",
      subheading: "Edit destinations without changing the QR code",
    },
    {
      heading: "Secure & Reliable",
      subheading: "Industry-leading security and uptime",
    },
  ];

  return (
    <>
      <div className="">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f7faff] to-white">
          {/* ── Decorative background ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* soft blobs */}
            <div className="absolute -left-32 -top-16 w-[460px] h-[460px] rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute -right-28 top-0 w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-3xl" />
            <div className="absolute left-10 top-1/3 w-[280px] h-[280px] rounded-full bg-indigo-100/40 blur-3xl" />

            {/* dot grids */}
            <div
              className="hidden md:block absolute left-6 top-24 w-28 h-28 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(#93c5fd 1.6px, transparent 1.6px)",
                backgroundSize: "13px 13px",
              }}
            />
            <div
              className="hidden md:block absolute right-8 top-20 w-32 h-28 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(#93c5fd 1.6px, transparent 1.6px)",
                backgroundSize: "13px 13px",
              }}
            />
          </div>

          <div className="relative flex flex-col  w-full container mx-auto pt-12 pb-12 md:pt-16 md:pb-14 gap-y-8">
            {/* <div className="flex flex-col justify-center w-full md:w-[50%] items-start align-middle gap-y-5 px-5">
              

              <div className="flex flex-col justify-start items-start gap-y-4">
                <h2 className="text-[25px] md:text-[35px] text-slate-800 font-semibold">
                  What is qrsmart.us?
                </h2>
                <p className="font-medium text-slate-700 text-[15px] md:text-[17px]">
                  Welcome to QR Smart – The Future of Smart Connectivity At QR
                  Smart, we specialize in providing cutting-edge dynamic QR code
                  solutions designed to streamline digital interactions and
                  enhance user engagement. If you've encountered a QR code
                  similar to the one on the right, chances are it was powered by{" "}
                  <IntroLink to="https://qrsmart.us"> qrsmart.us</IntroLink>{" "}
                  your gateway to seamless digital experiences.
                </p>
                <p className="font-medium text-slate-700 text-[15px] md:text-[17px]">
                  Our dynamic QR codes go beyond simple redirection. They offer
                  businesses an efficient, trackable, and versatile way to
                  connect with their audience, leading them to websites, landing
                  pages, mobile apps, and more—all while collecting valuable
                  analytics on scan activity. Whether you're a business looking
                  to enhance customer engagement or an individual seeking smart,
                  shareable QR solutions, QR Smart has you covered.
                </p>
                
              </div>

              <HoverButton>Create QR Code</HoverButton>
            </div>

            <div className="flex justify-center">
              <Lottie
                animationData={qranimation}
                className="w-60 h-60 md:w-full md:h-full"
              />
            </div> */}
            <SectionHeading
              // smallHead="QR Codes for"
              title="QR Code Generator: Create your Dynamic QR Code"
              highlight="Dynamic QR Code"
              titleClassName="text-3xl md:text-5xl lg:text-[52px] leading-[1.15] max-w-3xl"
              subHeading="Customize it with your color, shape and logo in 3 simple steps."
              subHeadingClassName="md:text-[15px]"
            />
            <QRGenerate />
          </div>
        </div>

        {/* <div className="mt-20">
        </div> */}

        {/* steps */}
        {/* <div className="flex flex-col flex-wrap container mx-auto my-10">
          <div className="flex flex-col mt-10 px-5">
            <h2 className="text-[25px] md:text-[35px] text-slate-800 font-semibold text-center">
              Create QR Code in 3 steps
            </h2>
            <div className="grid  gird-cols-1 md:grid-cols-3 gap-5 container mx-auto mt-10 ">
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center justify-between duration-300 ease-in-out hover:shadow-xl">
                <div className="test flex justify-center p-10 relative ">
                  <Lottie
                    animationData={selectAnimation}
                    className="max-h-[20rem] w-[40%] md:w-[80%] "
                  />
                </div>
                <div>
                  <p className="text-center font-medium pt-1 text-blue-700 bg-[#1976d218] w-max mx-auto px-2 pb-1 rounded-md">
                    Step - 1
                  </p>
                  <p className="text-center pt-2 text-2xl text-blue-700 font-semibold">
                    Choose The Type
                  </p>
                </div>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center justify-between duration-300 ease-in-out hover:shadow-xl">
                <div className="test flex justify-center p-10">
                  <Lottie
                    animationData={generateAnimation}
                    className="max-h-[18rem] w-[40%] md:w-[60%]"
                  />
                </div>
                <div>
                  <p className="text-center font-medium pt-1 text-blue-700 bg-[#1976d218] w-max mx-auto px-2 pb-1 rounded-md">
                    Step - 2
                  </p>
                  <p className="text-center pt-2 text-2xl text-blue-700 font-semibold">
                    Generate QR Code
                  </p>
                </div>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center justify-between duration-300 ease-in-out hover:shadow-xl">
                <div className="test flex justify-center ">
                  <Lottie
                    animationData={customizeAnimation}
                    className="max-h-[18rem] w-[40%]  md:w-[60%]"
                  />
                </div>
                <div>
                  <p className="text-center font-medium mt-7 md:mt-0 text-blue-700 bg-[#1976d218] w-max mx-auto px-2 pb-1 rounded-md">
                    Step - 3
                  </p>
                  <p className="text-center pt-2 text-2xl text-blue-700 font-semibold">
                    Customize & Download
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <CreateQRSteps />

        {/* <div className="bg-[#1976d218] mt-20">
          <div className="container mx-auto py-10 px-5">
            <p className="text-[25px] md:text-[35px] text-slate-800 font-semibold text-center">
              Why Choose Us
            </p>
            <div className="grid  md:grid-cols-2  gap-y-6 py-5 ">
              {whyData.map((item, index) => {
                return (
                  <div>
                    <p className="font-semibold text-blue-700 text-[18px] text-center">
                      ✔ {item.heading}
                    </p>
                    <p className="text-center">{item.subheading}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
        {/* <div className="flex flex-col container mx-auto my-10">
          <div className="flex flex-col mt-10 px-5">
            <h2 className="text-[25px] md:text-[35px] text-slate-800 font-semibold text-center">
              Future Proof Technology
            </h2>
            <div className="grid md:grid-cols-3 gap-5 container mx-auto mt-10">
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center hover:bg-[#1976d218] duration-300 ease-in-out hover:shadow-xl">
                <AiOutlineSafety
                  size={50}
                  className="text-blue-700 bg-[#1976d22b] rounded-full p-3"
                />
                <p className="text-center pt-2 text-3xl text-blue-700 font-semibold">
                  Safe
                </p>
                <p className="text-center font-medium pt-1">
                  Protected around the clock with 24/7 monitoring by human and
                  artificial intelligence.
                </p>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center hover:bg-[#1976d218] duration-300 ease-in-out hover:shadow-xl">
                <IoCheckmarkDoneCircleOutline
                  size={50}
                  className="text-blue-700 bg-[#1976d22b] rounded-full p-3"
                />
                <p className="text-center pt-2 text-3xl text-blue-700 font-semibold">
                  GDPR and CCPA Compilant{" "}
                </p>
                <p className="text-center font-medium pt-1">
                  Data is anonymized before being stored in the database.
                </p>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center hover:bg-[#1976d218] duration-300 ease-in-out hover:shadow-xl">
                <IoCubeSharp
                  size={50}
                  className="text-blue-700 bg-[#1976d22b] rounded-full p-3"
                />
                <p className="text-center pt-2 text-3xl text-blue-700 font-semibold">
                  Flexible
                </p>
                <p className="text-center font-medium pt-1">
                  Thousands of tailored projects to meet your needs.
                </p>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center hover:bg-[#1976d218] duration-300 ease-in-out hover:shadow-xl">
                <IoCloudDownloadOutline
                  size={50}
                  className="text-blue-700 bg-[#1976d22b] rounded-full p-3"
                />
                <p className="text-center pt-2 text-3xl text-blue-700 font-semibold">
                  Reliable
                </p>
                <p className="text-center font-medium pt-1">
                  99.9% service uptime guaranteed.
                </p>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center hover:bg-[#1976d218] duration-300 ease-in-out hover:shadow-xl">
                <BsGraphUpArrow
                  size={50}
                  className="text-blue-700 bg-[#1976d22b] rounded-full p-3"
                />
                <p className="text-center pt-2 text-3xl text-blue-700 font-semibold">
                  Scalable
                </p>
                <p className="text-center font-medium pt-1">
                  An infrastructure designed to grow alongside your needs.
                </p>
              </div>
              <div className="border border-blue-700 rounded-3xl p-4 flex flex-col items-center hover:bg-[#1976d218] duration-300 ease-in-out hover:shadow-xl">
                <SlSpeedometer
                  size={50}
                  className="text-blue-700 bg-[#1976d22b] rounded-full p-3"
                />
                <p className="text-center pt-2 text-3xl text-blue-700 font-semibold">
                  Fast
                </p>
                <p className="text-center font-medium pt-1">
                  Create as many as 1,000 branded links per second.
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#e8f0ff] via-[#eff5ff] to-[#e6f0fe] py-10 mb-10">
          {/* ── Decorative background ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] rounded-full bg-blue-200/40 blur-3xl" />
            <div className="absolute -right-20 -top-20 w-[360px] h-[360px] rounded-full bg-sky-200/40 blur-3xl" />
          </div>

          {/* ── Floating glass icon cards ── */}
          <div className="pointer-events-none hidden lg:flex absolute left-[6%] top-[22%] w-16 h-16 rounded-2xl bg-white/70 backdrop-blur-sm border border-white shadow-lg shadow-blue-100 items-center justify-center">
            <CgQr className="text-blue-600" size={30} />
          </div>
          <div className="pointer-events-none hidden lg:flex absolute right-[7%] top-[38%] w-20 h-20 rounded-2xl bg-white/70 backdrop-blur-sm border border-white shadow-lg shadow-blue-100 items-center justify-center">
            <BsGraphUpArrow className="text-blue-600" size={30} />
          </div>
          <div className="pointer-events-none hidden lg:flex absolute right-[13%] bottom-[10%] w-12 h-12 rounded-xl bg-white/70 backdrop-blur-sm border border-white shadow-lg shadow-blue-100 items-center justify-center">
            <CgQr className="text-blue-500" size={22} />
          </div>

          <div className="relative container mx-auto py-10 px-5">
            <p className="text-center text-sm md:text-base font-semibold text-slate-600">
              Its not just a qr
            </p>
            <p className="text-[26px] md:text-[38px] lg:text-[44px] leading-tight text-slate-900 text-center font-bold my-5 tracking-tight">
              Make, Personalize, and Monitor Your<br></br> QR Codes with Ease.
            </p>
            <p className="text-center text-slate-500 max-w-3xl mx-auto">
              Create original QR codes, alter them to match your brand, and use
              real-time analytics to obtain insightful data. One-stop platform
              with<br className="hidden md:block"></br> AI capabilities that
              eliminates the need for coding.
            </p>
            <div className="flex justify-center mt-7">
              <button
                onClick={() => navigate("/builder")}
                className="px-7 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;

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
        <div className=" bg-custom-gradient " style={{}}>
          <div className="flex flex-col  w-full container mx-auto pt-10 md:py-12 gap-y-5">
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
              subHeading="Customize it with your color, shape and logo in 3 simple steps."
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
        <div className="bg-[#1976d218] py-10 mb-10">
          <div className="container mx-auto py-10 px-5">
            <p className="text-center md:text-2xl font-semibold ">
              Its not just a qr
            </p>
            <p className="text-[25px] md:text-[35px] text-slate-800  text-center lg:text-5xl font-bold my-6">
              Make, Personalize, and Monitor Your<br></br> QR Codes with Ease.
            </p>
            <p className="text-center font-medium">
              Create original QR codes, alter them to match your brand, and use
              real-time analytics to obtain insightful data. One-stop platform
              with<br></br> AI capabilities that eliminates the need for coding.
            </p>
            <div className="flex justify-center mt-4">
              <HoverButton onClick={() => navigate("/builder")}>
                Get Started Now
              </HoverButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;

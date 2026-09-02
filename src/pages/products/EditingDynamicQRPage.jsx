import React, { useEffect, useState } from "react";
import ScreenView from "../../layouts/ScreenView";

import heroImg from "../../assets/images/products/editing/hero.webp";
import how1Img from "../../assets/images/products/editing/how1.webp";
import how2Img from "../../assets/images/products/editing/how2.webp";
import how3Img from "../../assets/images/products/editing/how3.webp";
import how4Img from "../../assets/images/products/editing/how4.webp";
import how5Img from "../../assets/images/products/editing/how5.webp";
import how6Img from "../../assets/images/products/editing/how6.webp";
import how7Img from "../../assets/images/products/editing/how7.webp";
import how8Img from "../../assets/images/products/editing/how8.webp";
import how9Img from "../../assets/images/products/editing/how9.webp";

const Step = ({ n, children }) => (
  <div className="flex items-start gap-4">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1769ff] text-sm font-bold text-white shadow-[0_6px_15px_rgba(23,105,255,.2)]">
      {n}
    </span>
    <p className="pt-1 text-[14px] leading-6 text-[#303a5e]">{children}</p>
  </div>
);

const Title = ({ children }) => (
  <div>
    <h2 className="text-[24px] font-extrabold tracking-[-.03em] text-[#111c4d] sm:text-[27px]">
      {children}
    </h2>
    <div className="mt-3 flex items-center gap-2">
      <span className="h-1 w-9 rounded-full bg-[#1769ff]" />
      <span className="h-[5px] w-[5px] rounded-full bg-[#1769ff]" />
    </div>
  </div>
);

const Dots = ({ className = "" }) => (
  <div className={`absolute grid grid-cols-5 gap-2 opacity-60 ${className}`}>
    {Array.from({ length: 25 }).map((_, i) => (
      <i key={i} className="h-[4px] w-[4px] rounded-full bg-[#2875ff]" />
    ))}
  </div>
);

const Feature = ({ id, title, desc, image, open, setOpen, children }) => (
  <div className="overflow-hidden rounded-[17px] border border-[#e8ebf3] bg-white shadow-[0_8px_28px_rgba(35,55,110,.055)]">
    <button
      type="button"
      onClick={() => setOpen(open === id ? null : id)}
      className="flex w-full items-center gap-4 px-5 py-4 text-left"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#1769ff]">
        {open === id ? "−" : "+"}
      </span>
      <span className="min-w-0 flex-1">
        <strong className="block text-[14px] font-bold text-[#17204b]">
          {title}
        </strong>
        <small className="mt-1 block truncate text-[11px] text-[#7d869e]">
          {desc}
        </small>
      </span>
      <span className={`text-[#64708e] transition ${open === id ? "rotate-180" : ""}`}>
        ⌄
      </span>
    </button>

    {open === id && (
      <div className="border-t border-[#edf0f5] bg-[#fbfcff] p-5">
        {image && (
          <div className="mb-5 overflow-hidden rounded-2xl border border-[#e8ebf3] bg-white">
            <img src={image} alt="" className="w-full object-contain" />
          </div>
        )}
        {children}
      </div>
    )}
  </div>
);

const EditingDynamicQRPage = () => {
  const [open, setOpen] = useState(null);

  // Block body zaroori hai: concise arrow window.scrollTo ka return value
  // React ko cleanup function ki tarah de deta tha -> "destroy is not a
  // function" -> poora tree unmount -> blank page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenView>
      <main className="relative min-h-screen overflow-hidden bg-white">
        {/* Background waves / blobs */}
        <div className="pointer-events-none absolute left-[-150px] top-0 h-[260px] w-[380px] rounded-[25%_65%_60%_40%] bg-gradient-to-br from-[#eaf2ff] to-[#f8faff]" />
        <div className="pointer-events-none absolute right-[-100px] top-0 h-[250px] w-[330px] rounded-[50%_30%_55%_45%] bg-gradient-to-br from-[#fff0e7] via-[#fff9f4] to-[#f1e8ff]" />
        <div className="pointer-events-none absolute right-[-95px] top-[105px] h-[180px] w-[240px] rounded-full bg-[#eee5ff]/75" />
        <Dots className="left-10 top-[105px]" />
        <Dots className="right-10 top-[620px] opacity-35" />

        <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-20 pt-9 sm:px-8">
          {/* HERO */}
          <section className="pb-9 text-center">
            <div className="flex justify-center">
              <div>
                <Title>Editing dynamic QR codes</Title>
              </div>
            </div>

            <div className="mx-auto mt-9 max-w-[560px]">
              <img
                src={heroImg}
                alt="Editing dynamic QR codes"
                className="w-full object-contain drop-shadow-[0_18px_30px_rgba(30,60,130,.08)]"
              />
            </div>
          </section>

          {/* INTRO */}
          <section className="mx-auto max-w-[1010px] text-center">
            <div className="space-y-5 text-[14px] font-semibold leading-6 text-[#27335a] sm:text-[15px]">
              <p>
                Static QR codes are an efficient and versatile tool for sharing
                information digitally. Unlike dynamic QR codes, which allow
                linked content to be updated without changing the physical code,
                static QR codes keep information constant over time, making them
                valuable in various situations.
              </p>
              <p>
                For example, imagine a coffee shop that offers free Wi-Fi to its
                customers. By using a static QR code, the coffee shop can
                generate a unique code that allows customers to easily connect to
                the Wi-Fi network. This code remains constant over time, ensuring
                that clients can always access the Wi-Fi network without needing
                to change the code.
              </p>
              <p>
                In short, static QR codes offer a practical and reliable solution
                for sharing information in a constant and accessible way. Below,
                we present an overview of its most notable benefits.
              </p>
            </div>
          </section>

          {/* 1. UPDATE */}
          <section className="relative mt-10 overflow-hidden rounded-[20px] border border-[#e7eaf3] bg-white p-5 shadow-[0_12px_38px_rgba(40,60,120,.07)] sm:p-7">
            <Dots className="right-5 top-4 scale-75 opacity-45" />
            <Title>Updating elements in QR Codes</Title>

            <div className="mt-7 overflow-hidden rounded-[17px] border border-[#edf0f5] bg-[#fbfcff]">
              <img src={how1Img} alt="" className="w-full object-contain" />
            </div>

            <div className="mt-6 space-y-4 text-[14px] leading-6 text-[#344064]">
              <p>
                The flexibility of dynamic QR codes allows you to modify a
                variety of elements to adapt your QR to the changing needs of
                your business. From colors and fonts to contact details, dates,
                descriptions, headlines and any type of file you want to add or
                remove, everything can be changed at any time.
              </p>
              <p>
                Updating your QR codes is essential whenever you need to reflect
                changes to your products or services, contact information, hours,
                special promotions, or content corrections. With QRFY, making
                these changes is quick and easy.
              </p>
            </div>
          </section>

          {/* 2. EDIT GUIDE */}
          <section className="relative mt-6 overflow-hidden rounded-[20px] border border-[#e7eaf4] bg-gradient-to-br from-[#f7faff] via-white to-[#fbf8ff] p-5 shadow-[0_12px_38px_rgba(40,60,120,.06)] sm:p-7">
            <div className="grid items-center gap-8 lg:grid-cols-[.72fr_1.45fr]">
              <div>
                <Title>How to edit your QR code</Title>
                <div className="relative mt-7 space-y-4">
                  <div className="absolute left-[15px] top-5 bottom-5 w-px bg-[#c9d9ff]" />
                  <Step n={1}>Find the QR code you want to update in the "My QRs" section of our platform.</Step>
                  <Step n={2}>Select the icon with the 3 vertical dots located at the far right of the QR.</Step>
                  <Step n={3}>In the drop-down menu, click the option that says "Edit."</Step>
                  <Step n={4}>You will access the view where the QR content is displayed, allowing you to make the necessary edits.</Step>
                  <Step n={5}>Once you've finished making your edits, click the save icon at the top right.</Step>
                </div>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-[#e6eaf4] bg-white shadow-[0_10px_28px_rgba(30,55,120,.06)]">
                <img src={how3Img} alt="" className="w-full object-contain" />
              </div>
            </div>
          </section>

          {/* 3. CHANGE TYPE */}
          <section className="relative mt-6 overflow-hidden rounded-[20px] border border-[#eee9fb] bg-gradient-to-r from-[#faf8ff] via-white to-[#f7fbff] p-5 shadow-[0_12px_38px_rgba(60,55,130,.06)] sm:p-7">
            <div className="grid items-center gap-7 lg:grid-cols-[.7fr_1.5fr]">
              <div>
                <Title>Change a QR code type</Title>
                <p className="mt-6 text-[14px] leading-6 text-[#344064]">
                  Do you need to change the type of QR to adapt to needs or last
                  minute changes without having to reprint it? We've got you
                  covered. With our dynamic QR codes, changing the QR type is
                  easier than ever.
                </p>
                <p className="mt-4 text-[14px] leading-6 text-[#344064]">
                  Imagine that you have a restaurant and you have printed QR
                  codes to display your menu. However, you decide to expand your
                  online presence and prefer that customers be able to access
                  your website to see the latest promotions and special events.
                  With QRFY, you can easily change the QR type from "Menu" to
                  "Webpage" simply and quickly.
                </p>
              </div>
              <div className="overflow-hidden rounded-[18px] border border-[#eceaf4] bg-white">
                <img src={how2Img} alt="" className="w-full object-contain" />
              </div>
            </div>
          </section>

          {/* 4. COMPACT FEATURES */}
          <section className="mt-8">
            <div className="mb-5">
              <Title>More dynamic QR code tools</Title>
            </div>

            <div className="space-y-3">
              <Feature
                id="design"
                title="Edit the external design of a QR code"
                desc="Customize colors, logos, border styles, patterns and frames."
                image={how3Img}
                open={open}
                setOpen={setOpen}
              >
                <p className="text-sm leading-6 text-[#344064]">
                  To edit the external design of your QR codes, both dynamic and
                  static, our platform gives you the flexibility to customize
                  them with unique colors, logos, border styles, patterns and
                  frames, all with an editable call to action (CTA).
                </p>
                <div className="mt-5 space-y-3">
                  <Step n={1}>Look for the QR code you want to update in the "My QRs" section.</Step>
                  <Step n={2}>Select the icon with the 3 vertical dots located at the far right of the QR.</Step>
                  <Step n={3}>In the drop-down menu, click the option that says "Edit."</Step>
                  <Step n={4}>You will access the view where the content of the QR is displayed.</Step>
                  <Step n={5}>Click "QR Design" to modify appearance.</Step>
                  <Step n={6}>Click "Finish" at the top right.</Step>
                </div>
              </Feature>

              <Feature
                id="reset"
                title="Scan Tracking Reset"
                desc="Reset scan counters anytime to start a new tracking period."
                image={how7Img}
                open={open}
                setOpen={setOpen}
              >
                <p className="text-sm leading-6 text-[#344064]">
                  By creating QR codes with QRFY, you can access detailed
                  scanning information in real time. This data includes the
                  location of the scan, the exact time of the scan, the operating
                  system of the device used, and the difference between single
                  and total scans.
                </p>
                <div className="mt-5 space-y-3">
                  <Step n={1}>Open QR details.</Step>
                  <Step n={2}>Click Options.</Step>
                  <Step n={3}>Select Reset Scans.</Step>
                </div>
              </Feature>

              <Feature
                id="folder"
                title="Organization in folders"
                desc="Organize and manage your QR codes into folders for better control."
                image={how8Img}
                open={open}
                setOpen={setOpen}
              >
                <p className="text-sm leading-6 text-[#344064]">
                  Organizing your QR codes into different folders can make your
                  projects more manageable and easier to find. This functionality
                  improves efficiency when managing multiple QR codes and keeps
                  campaigns, promotions and events well structured.
                </p>
                <div className="mt-5 space-y-3">
                  <Step n={1}>From the "My QRs" section, click the "+" button on the far right.</Step>
                  <Step n={2}>From the drop-down menu, select "Create Folder."</Step>
                  <Step n={3}>Enter a name for your new folder and click 'Create.'</Step>
                </div>
              </Feature>

              <Feature
                id="url"
                title="Short URL Update"
                desc="Customize and update your short URL anytime."
                image={how6Img}
                open={open}
                setOpen={setOpen}
              >
                <p className="text-sm leading-6 text-[#344064]">
                  Dynamic QR codes automatically generate a short URL upon
                  creation for use on digital platforms. These short URLs are
                  convenient because they are easy to remember and allow tracking
                  of scan data.
                </p>
                <div className="mt-5 space-y-3">
                  <Step n={1}>Click "+" and create QR.</Step>
                  <Step n={2}>Go to Content section.</Step>
                  <Step n={3}>Open "Statistics" tab.</Step>
                  <Step n={4}>Disable automatic URL.</Step>
                  <Step n={5}>Enter custom URL.</Step>
                </div>
              </Feature>

              <Feature
                id="management"
                title="Dynamic QR code management"
                desc="Pause, manage and control your dynamic QR codes."
                image={how4Img}
                open={open}
                setOpen={setOpen}
              >
                <div className="overflow-hidden rounded-2xl border border-[#e8ebf3] bg-white">
                  <img src={how5Img} alt="" className="w-full object-contain" />
                </div>
                <p className="mt-5 text-sm leading-6 text-[#344064]">
                  Only dynamic QR codes can be temporarily disabled. The pause
                  option allows you to disable the QR code temporarily, while
                  deleting it will disable it permanently.
                </p>
                <div className="mt-5 space-y-3">
                  <Step n={1}>Find the QR code you want to pause in the "My QRs" section.</Step>
                  <Step n={2}>Select the checkbox at the far left of the QR.</Step>
                  <Step n={3}>Click "Pause".</Step>
                </div>
              </Feature>

              <Feature
                id="final"
                title="Dynamic QR Codes: The flexibility that makes the difference"
                desc="Update content, keep tracking and adapt to any situation."
                image={how9Img}
                open={open}
                setOpen={setOpen}
              >
                <p className="text-sm leading-6 text-[#344064]">
                  The edits detailed in this section can only be applied to
                  dynamic QR codes. These codes offer the advantage of updating
                  and modifying content later, making them a versatile and
                  adaptable tool for any project or campaign.
                </p>
                <p className="mt-4 text-sm leading-6 text-[#344064]">
                  To identify if your QR code is dynamic or static, go to the
                  user panel in the "My QRs" section. Dynamic codes will have the
                  total scans next to them, while static codes will be identified
                  with a yellow label that says "Static QR" on the right.
                </p>
              </Feature>
            </div>
          </section>

          {/* CTA */}
          <section className="relative mt-7 overflow-hidden rounded-[20px] border border-[#dcefe8] bg-gradient-to-r from-[#f2fffa] via-white to-[#f2f8ff] px-6 py-7 shadow-[0_12px_35px_rgba(35,85,85,.06)]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ddf8ed] text-xl text-[#20aa7f]">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#132149]">
                    Dynamic QR Codes: The flexibility that makes the difference
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#56617a]">
                    Update content, keep tracking and adapt to any situation
                    without creating a new QR code.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full bg-[#2ab58b] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(42,181,139,.22)]"
              >
                Get started free →
              </button>
            </div>
          </section>
        </div>
      </main>
    </ScreenView>
  );
};

export default EditingDynamicQRPage;

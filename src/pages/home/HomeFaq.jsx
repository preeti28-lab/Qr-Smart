import React, { useState } from "react";
import AccordionItem from "../../components/ui/AccordianItem";
import faqImg from "../../assets/images/qrfolder.webp";

const faqData = [
  {
    question: "What is the QR Code",
    answer:
      "The term 'QR' stands for 'quick response' and refers to instant access to the information contained in the Code. It is the evolution of the barcode, made up of patterns of black and white pixels. Denso Wave, a Japanese subsidiary of Toyota Denso, developed them to mark car components and speed up logistics. Today, QR codes are widely used due to their versatility and accessibility through smartphones.",
  },
  {
    question: "Know the benefits of using QR?",
    answer:
      "More companies are using QR codes as a fundamental marketing and commercial tool. Their popularity comes from the many uses they provide: receiving payments, sharing website links, catalogs, collecting feedback, inviting users to share images or videos, promoting events, and much more with just a scan.",
  },
  {
    question: "How to start using QR?",
    answer:
      "Many devices already have a built-in QR reader. Simply open your phone camera and point it at the code for a few seconds until a notification appears. If it doesn't work, check your settings to ensure QR scanning is enabled, or download a QR code scanner from your app store.",
  },
];

const HomeFaq = () => {
  const [active, setActive] = useState(0);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-[#f3f7ff] via-[#f8fbff] to-white">
      {/* ── Decorative background ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="hidden md:block absolute left-6 top-16 w-24 h-32 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#bfdbfe 1.6px, transparent 1.6px)",
            backgroundSize: "13px 13px",
          }}
        />
        <div
          className="hidden md:block absolute right-6 top-1/3 w-24 h-32 opacity-40"
          style={{
            backgroundImage: "radial-gradient(#bfdbfe 1.6px, transparent 1.6px)",
            backgroundSize: "13px 13px",
          }}
        />
        <div className="absolute -left-24 bottom-0 w-[380px] h-[380px] rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img src={faqImg} alt="QR Code concept" className="w-[75%] mx-auto" />
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.25)] divide-y divide-slate-100 overflow-hidden">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isActive={active === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;

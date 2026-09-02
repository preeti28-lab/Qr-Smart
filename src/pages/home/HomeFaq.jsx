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
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src={faqImg}
            alt="QR Code concept"
            className="w-[75%] mx-auto"
          />
        </div>

        {/* FAQ */}
        <div className="space-y-4">
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

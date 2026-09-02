import React, { useEffect, useState } from "react";
import ScreenView from "../../layouts/ScreenView";
import PlanCard, { getPlanMeta } from "../../components/cards/PlanCard";

// images
import visaSvg from "../../assets/visa.svg";
import paypalSvg from "../../assets/paypal.svg";
import googlePaySvg from "../../assets/googlepay.svg";
import dinersSvg from "../../assets/diners.svg";
import unionSvg from "../../assets/union.svg";
import discoverSvg from "../../assets/discover.svg";
import HandWithHeart from "../../icons/HandWithHeart";
import { Helmet } from "react-helmet-async";
import PlanFaq from "./PlanFaq";
import { useDispatch } from "react-redux";
import { getAllPlans } from "../../redux/features/blogs";



const Pricing = () => {
  const items = [
    {
      title: "What are the available plans for the QR generator?",
      values: [
        "We offer Free, Standard, and Premium plans. Each plan comes with different features and customization options.",
      ],
    },
    {
      title: "What is included in the Free plan?",
      values: [
        "The Free plan includes all features, allowing you to generate fully customizable QR codes with design options and tracking capabilities.",
      ],
    },
    {
      title: "How is the Standard plan different from the Free plan?",
      values: [
        "The Standard plan includes more customization options, such as colors and logos, and provides analytics for tracking QR scans.",
      ],
    },
    {
      title: "What benefits does the Premium plan offer?",
      values: [
        "The Premium plan includes all features of the Standard plan plus high-resolution downloads, dynamic QR codes, and advanced analytics.",
      ],
    },
    {
      title: "Can I upgrade or downgrade my plan anytime?",
      values: [
        "Yes, you can upgrade or downgrade your plan anytime from your account settings.",
      ],
    },
    {
      title: "Is there a refund policy if I am not satisfied with a paid plan?",
      values: [
        "Yes, we offer a refund within the first 7 days if you are not satisfied with our service.",
      ],
    },
    {
      title: "Do you offer a trial for paid plans?",
      values: [
        "Yes, we offer a 7-day free trial for our Standard and Premium plans.",
      ],
    },
    {
      title: "Can I create unlimited QR codes with a paid plan?",
      values: [
        "Yes, our paid plans allow you to create unlimited QR codes with various customization options.",
      ],
    },
    {
      title: "How do I make a payment?",
      values: [
        "We accept various payment methods, including credit/debit cards, PayPal, and UPI.",
      ],
    },
    {
      title: "Will my QR codes expire after my plan ends?",
      values: [
        "Static QR codes never expire, but dynamic QR codes may stop working if your subscription is not renewed.",
      ],
    },
    {
      title: "Can i change my plans?",
      values: [
        <>
          <p>
            At QR Smart (
            <a href="https://qrsmart.us" target="_blank" rel="noopener noreferrer">
              <strong>qrsmart.us </strong>
            </a>
            ), we are committed to providing an unparalleled experience in smart
            QR code solutions, ensuring efficiency, innovation, and seamless
            accessibility.
          </p>
          <p>
            Once you subscribe to a plan, modifications can be made one month
            before your current subscription ends. However, you have the
            flexibility to cancel your plan at any time.
          </p>
          <p>
            Should you have any questions or require assistance, our team is
            always ready to help. Feel free to reach out to us at{" "}
            <strong>
              {" "}
              <a href="mailto:support@qrsmart.us">support@qrsmart.us</a>.
            </strong>
          </p>
          <p>
            Experience the future of smart QR technology with QR Smart—where
            innovation meets excellence!
          </p>
        </>,
      ],
    },
    {
      title: "Do you offer refunds for unused subscription periods?",
      values: [
        <>
          <p>
            At QR Smart (
            <a href="https://qrsmart.us" target="_blank" rel="noopener noreferrer">
              <strong>qrsmart.us </strong>
            </a>
            ), we take pride in offering cutting-edge QR code solutions that
            redefine convenience, efficiency, and innovation. Our platform is
            designed to empower businesses and individuals with seamless,
            dynamic, and intelligent QR technology, ensuring an unmatched user
            experience.
          </p>
          <p>
            Please note that{" "}
            <strong>
              no refunds are provided for unused subscription periods. However,
              we value your flexibility, and you can{" "}
              <strong>cancel your subscription at any time</strong>
            </strong>{" "}
            to prevent automatic renewal.
          </p>
          <p>
            At <strong>QR Smart</strong>, we are dedicated to excellence,
            customer satisfaction, and continuous innovation. If you have any
            questions or require assistance, our team is always here to help.
            Experience the future of QR technology with{" "}
            <strong>QR Smart—where innovation meets intelligence!</strong>
          </p>
        </>,
      ],
    },
    {
      title: "Do i have full access with any plan?",
      values: [
        <>
          <p>
            At <strong>QR Smart</strong> (
            <a href="https://qrsmart.us" target="_blank" rel="noopener noreferrer">
              qrsmart.us
            </a>
            ), we are proud to offer an <em>industry-leading</em> platform that
            empowers businesses and individuals with{" "}
            <em>state-of-the-art QR code solutions</em>. Our commitment to{" "}
            <strong>innovation, precision, and user-friendly technology</strong>{" "}
            ensures that you always have access to the most advanced QR tools
            available.
          </p>
          <p>
            Yes! With{" "}
            <em>
              any plan, you will enjoy <strong>complete access</strong>
            </em>{" "}
            to all our powerful features, including{" "}
            <em>
              QR code creation, in-depth analytics, and multiple download
              formats
            </em>
            . We believe in providing you with everything you need to enhance
            your brand's digital presence effortlessly.
          </p>
          <p>
            At <strong>QR Smart</strong>, we are dedicated to delivering{" "}
            <strong>excellence, reliability, and top-tier support</strong>. Join
            us today and experience the{" "}
            <strong>
              future of smart QR technology—where innovation meets convenience!
            </strong>
          </p>
        </>,
      ],
    },
    {
      title: "Can i try it for free?",
      values: [
        <>
          <p>
            At QR Smart (
            <a href="https://qrsmart.us" target="_blank" rel="noopener noreferrer">
              <strong>qrsmart.us </strong>
            </a>
            ), we are committed to delivering the{" "}
            <em>
              most advanced, reliable, and user-friendly QR code solutions
            </em>{" "}
            available today. Our platform is designed to provide{" "}
            <em>seamless, intelligent, and highly efficient QR technology</em>{" "}
            that empowers businesses and individuals alike.
          </p>
          <p>
            Of course! We believe in giving you the confidence to explore our
            exceptional features before making a commitment. That's why we offer
            a{" "}
            <em>
              7-day free trial, allowing you to experience the{" "}
              <strong>full power of our platform</strong>
            </em>{" "}
            before choosing a paid plan.
          </p>
          <p>
            At <strong>QR Smart</strong>, we prioritize{" "}
            <strong>innovation, customer satisfaction, and excellence</strong>.
            Join us today and discover why we are the{" "}
            <strong>trusted choice for smart QR technology worldwide!</strong>
          </p>
        </>,
      ],
    },
    {
      title: "What payment methods do you accept?",
      values: [
        <>
          <p>
            At QR Smart (
            <a href="https://qrsmart.us" target="_blank" rel="noopener noreferrer">
              <strong> qrsmart.us </strong>
            </a>
            ), we are dedicated to delivering a{" "}
            <em>seamless, innovative, and world-class QR code experience</em>{" "}
            that enhances convenience and efficiency for businesses and
            individuals alike. Our platform is designed with{" "}
            <em>cutting-edge technology</em>, ensuring that you always have
            access to the best QR solutions available.
          </p>
          <p>
            To provide <em>hassle-free and secure transactions</em>, we accept{" "}
            <strong>
              all major credit and debit cards, including Visa, Mastercard,
              American Express, and Discover
            </strong>
            . Payments are processed in the selected currency, and prices do not
            include value-added tax (VAT). If you're paying via{" "}
            <strong>PayPal</strong>, please ensure that your card is enabled for
            international transactions.
          </p>
          <p>
            Additionally, our trusted{" "}
            <em>
              banking partner, Razorpay, supports over 100 payment methods
            </em>
            , giving businesses the flexibility to accept payments through
            multiple channels. These include{" "}
            <strong>
              major debit and credit cards, more than 50 net banking options,
              UPI, and popular digital wallets
            </strong>{" "}
            such as{" "}
            <strong>
              MobiKwik, PayUmoney, FreeCharge, Airtel Money, Ola Money, and
              PayZapp
            </strong>
            .
          </p>
          <p>
            At <strong>QR Smart</strong>, we are committed to{" "}
            <strong>innovation, security, and customer satisfaction</strong>.
            Join us today and experience the{" "}
            <strong>
              future of smart QR technology—where excellence meets convenience!
            </strong>
          </p>
        </>,
      ],
    },
    {
      title: "How can i cancel my subscription?",
      values: [
        <>
          <p>
            At QR Smart (
            <a href="https://qrsmart.us" target="_blank" rel="noopener noreferrer">
              <strong>qrsmart.us </strong>
            </a>
            ), we take pride in offering a{" "}
            <em>world-class, innovative, and user-friendly QR code platform</em>{" "}
            that empowers businesses and individuals with{" "}
            <em>seamless, intelligent, and highly efficient solutions</em>. Our
            commitment to{" "}
            <strong>excellence, security, and customer satisfaction</strong>{" "}
            sets us apart as a leader in smart QR technology.
          </p>
          <p>
            We believe in providing you with{" "}
            <em>complete flexibility and control</em> over your subscription.
            You can{" "}
            <em>
              cancel your subscription at any time, without any commitment,
              directly from the <strong>Billing section</strong>
            </em>{" "}
            in your account. Our goal is to offer a{" "}
            <em>hassle-free and transparent experience</em>, ensuring that you
            have total peace of mind.
          </p>
          <p>
            Join <strong>QR Smart</strong> today and experience the{" "}
            <em>future of QR technology—where innovation meets convenience!</em>
          </p>
        </>,
      ],
    },
  ];

  const dispatch = useDispatch();
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    dispatch(
      getAllPlans({}, (success, data) => {
        if (success) {
          setPlans(data || []);
        }
      }),
    );
  }, [dispatch]);

  const filteredPlans = plans.filter(
    (plan) => !plan.name.toLowerCase().includes("test"),
  );

  const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

  // popular plan beech me dikhe - sirf display order
  const orderedPlans = [...filteredPlans].sort(
    (a, b) =>
      getPlanMeta(a.name.split(" ")[0]).order -
      getPlanMeta(b.name.split(" ")[0]).order,
  );

  const paymentLogos = [
    { src: visaSvg, alt: "visa", className: "h-6" },
    { src: unionSvg, alt: "unionpay", className: "h-7" },
    { src: discoverSvg, alt: "discover", className: "h-5" },
    { src: dinersSvg, alt: "diners", className: "h-7" },
    { src: paypalSvg, alt: "paypal", className: "h-6" },
    { src: googlePaySvg, alt: "googlepay", className: "h-6" },
  ];

  // reusable bubble component so hero + footer promo dono jagah use ho sake
  const Bubble = ({ className, size }) => (
    <div
      className={`pointer-events-none absolute rounded-full blur-[1px] ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 32% 28%, #ffffff 0%, #eaf1ff 45%, #cddcfb 80%, #bcccf5 100%)",
        boxShadow: "0 12px 30px -10px rgba(99,140,255,0.35), inset 0 2px 6px rgba(255,255,255,0.9)",
      }}
    />
  );

  return (
    <>
      <Helmet>
        <title>Plans and prices</title>
      </Helmet>
      <ScreenView>
        <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#e7f0ff] via-[#f3f7ff] to-white">
          {/* ── soft background bubbles (hero) ── */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Bubble className="left-[4%] top-[70px]" size="150px" />
            <Bubble className="left-[13%] top-[230px]" size="54px" />
            <Bubble className="right-[6%] top-[40px]" size="170px" />
            <Bubble className="right-[16%] top-[210px]" size="46px" />
            <Bubble className="left-[46%] top-[10px]" size="22px" />
          </div>

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-16 pt-10">
            {/* ── Hero ── */}
            <div className="flex flex-col items-center text-center">
              <span className="rounded-full border border-blue-100 bg-white/80 px-4 py-1.5 text-[12px] font-semibold text-blue-600 shadow-sm backdrop-blur">
                Simple pricing. No hidden fees.
              </span>
              <h1 className="mt-6 text-[34px] font-bold leading-tight tracking-tight text-slate-900 md:text-[52px]">
                Plans <span className="text-blue-600">&amp; Pricing</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[14px] font-medium text-slate-500 md:text-[15px]">
                Try it for 7 days for free before subscribing to the plan that
                best suits your needs.
              </p>
            </div>

            {/* ── Plan cards ── */}
            <div className="mt-14 flex w-full flex-wrap items-stretch justify-center gap-6 md:mb-6 md:mt-16">
              {orderedPlans.map((plan) => {
                const months = plan.name.split(" ")[0];

                return (
                  <PlanCard
                    key={plan._id}
                    months={months}
                    price={formatPrice(plan.price)}
                    desc={plan.description}
                    cancelPrice={formatPrice(Math.round(plan.price * 1.2))}
                  />
                );
              })}
            </div>

            {/* ── Payment methods ── */}
            <div className="mt-16 flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6">
              <span className="text-[13px] font-semibold text-slate-500">
                We accept
              </span>
              {paymentLogos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.className} w-auto object-contain`}
                />
              ))}
            </div>

            {/* ── Non-profit info box ── */}
            <div className="mt-12 flex w-full max-w-4xl flex-col items-center gap-x-6 gap-y-4 rounded-2xl border border-slate-200 bg-white/70 px-6 py-5 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.45)] backdrop-blur sm:flex-row">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <HandWithHeart />
              </div>
              <p className="flex-1 text-center text-[13.5px] font-medium leading-relaxed text-slate-600 sm:text-left">
                If you represent a non-profit organization, university, school
                or other similar entity, we invite you to contact our support
                team to offer you a solution that suits your needs.
              </p>
              <span className="shrink-0 cursor-pointer rounded-full border border-blue-200 px-6 py-2 text-[13.5px] font-semibold text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50">
                Contact us
              </span>
            </div>

            {/* ── FAQ ── */}
            <div className="mt-20 flex w-full flex-col items-center gap-y-8">
              <div className="flex flex-col items-center">
                <h2 className="text-center text-[24px] font-bold text-slate-800 md:text-[30px]">
                  Questions about plans
                </h2>
                <div className="mt-3 flex items-center gap-x-2">
                  <span className="h-px w-10 bg-slate-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="h-px w-10 bg-slate-300" />
                </div>
              </div>

              <PlanFaq items={items} />
            </div>

          </div>
        </div>
      </ScreenView>
    </>
  );
};

export default Pricing;
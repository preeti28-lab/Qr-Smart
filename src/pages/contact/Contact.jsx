import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenView from "../../layouts/ScreenView";
import HeroWaves from "../../components/ui/HeroWaves";
import { useForm, Controller } from "react-hook-form";
import { Spinner } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { postContactEnquiry } from "../../redux/features/dashboard";
import {
  FiHeadphones,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiUser,
  FiEdit2,
  FiChevronDown,
  FiInfo,
  FiSend,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

import contactHeroImg from "../../assets/images/contact-hero.png";
import contactSupportImg from "../../assets/images/contact-support.png";

const MESSAGE_LIMIT = 1000;

const CONTACT_INFO = [
  {
    icon: FiMail,
    tone: "bg-violet-50 text-violet-500",
    title: "Email Us",
    lines: [
      <a
        key="mail"
        href="mailto:support@qrsmart.us"
        className="text-blue-600 hover:underline"
      >
        support@qrsmart.us
      </a>,
      "We typically reply within 24 hours",
    ],
  },
  {
    icon: FiPhone,
    tone: "bg-emerald-50 text-emerald-500",
    title: "Call Us",
    lines: ["+1 (555) 123-4567", "Mon - Fri, 9:00 AM - 6:00 PM (UTC)"],
  },
  {
    icon: FiMapPin,
    tone: "bg-orange-50 text-orange-500",
    title: "Our Location",
    lines: ["123 QR Smart Street,", "Suite 100, New York, NY 10001, USA"],
  },
  {
    icon: FiClock,
    tone: "bg-blue-50 text-blue-600",
    title: "Working Hours",
    lines: ["Monday - Friday", "9:00 AM - 6:00 PM (UTC)"],
  },
];

const SUBJECT_OPTIONS = [
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
  { value: "corporate", label: "Corporate" },
];

const FieldLabel = ({ children }) => (
  <label className="block text-[13.5px] font-semibold text-slate-700">
    {children} <span className="text-rose-500">*</span>
  </label>
);

const Contact = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm();

  const messageValue = watch("questionEnquiry") || "";

  const submitHandler = (payload) => {
    dispatch(
      postContactEnquiry(payload, (success) => {
        if (success) {
          reset({
            nameAndSurname: "",
            email: "",
            subject: "",
            questionEnquiry: "",
          });
        }
      }),
    );
  };

  const shell = (hasError) =>
    `flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${
      hasError ? "border-rose-300" : "border-slate-200"
    }`;

  return (
    <ScreenView>
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#eef3ff] via-[#f7faff] to-[#f3f1ff]">
        <HeroWaves />

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 md:px-5 md:py-14 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-10">
          {/* ── Left: intro + info ── */}
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-[13px] font-semibold text-blue-600">
              <FiHeadphones size={15} />
              We're here to help
            </span>

            <h1 className="mt-5 text-[34px] font-bold leading-[1.1] tracking-tight text-slate-900 md:text-[46px]">
              Contact <span className="text-blue-600">Us</span>
            </h1>

            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate-500 md:text-[15px]">
              Have a question, suggestion, or need support? Fill out the form
              and our team will get back to you as soon as possible.
            </p>

            {/* Info cards - lg par left column sirf 400px ka hai, isliye wahan
                wapas single column (2 cols sirf tab jab column full-width ho) */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_12px_30px_-26px_rgba(15,23,42,0.5)]"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.tone}`}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[14.5px] font-bold text-slate-900">
                        {item.title}
                      </p>
                      {item.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className="mt-0.5 text-[13px] leading-relaxed text-slate-500"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Need help card */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/80 to-violet-50/60 p-4">
              <div className="flex items-start gap-3">
                <img
                  src={contactSupportImg}
                  alt=""
                  aria-hidden="true"
                  className="w-[86px] shrink-0 select-none object-contain"
                  draggable="false"
                />
                <div className="min-w-0">
                  <p className="text-[14.5px] font-bold text-slate-900">
                    Need immediate help?
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                    Check out our FAQ section for quick answers.
                  </p>
                  <Link
                    to="/faq"
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[13px] font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    Visit FAQ
                    <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: form card ── */}
          <div className="relative min-w-0 flex flex-col lg:items-end">
            {/* Image normal flow me hi hai. lg par negative margin se card
                thoda neeche tuck hota hai aur z-10 se image aage rehti hai -
                absolute positioning ki zaroorat nahi. */}
            <img
              src={contactHeroImg}
              alt=""
              aria-hidden="true"
              className="relative z-10 mx-auto mb-4 w-[260px] select-none object-contain sm:w-[320px] lg:mx-0 lg:-mb-14 lg:w-[360px]"
              draggable="false"
            />

            <div className="relative z-0 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] md:p-7">
              {/* Card header */}
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                  <FiEdit2 size={20} />
                </span>
                <div>
                  <h2 className="text-[19px] font-bold text-slate-900">
                    Send us a message
                  </h2>
                  <p className="mt-1 text-[13.5px] text-slate-500">
                    Please fill in the details below and we'll be in touch.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(submitHandler)}
                className="mt-6 rounded-2xl border border-slate-200 p-5 md:p-6"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <FieldLabel>Name and surname</FieldLabel>
                    <Controller
                      name="nameAndSurname"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <div
                          className={`mt-2 ${shell(errors?.nameAndSurname)}`}
                        >
                          <FiUser
                            size={17}
                            className="shrink-0 text-slate-400"
                          />
                          <input
                            {...field}
                            type="text"
                            placeholder="Eg. Paul John"
                            className="w-full bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
                          />
                        </div>
                      )}
                    />
                    {errors?.nameAndSurname?.message && (
                      <p className="mt-1 text-[12.5px] text-rose-600">
                        {errors.nameAndSurname.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <FieldLabel>Email address</FieldLabel>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <div className={`mt-2 ${shell(errors?.email)}`}>
                          <FiMail
                            size={17}
                            className="shrink-0 text-slate-400"
                          />
                          <input
                            {...field}
                            type="email"
                            placeholder="Eg. abc@gmail.com"
                            className="w-full bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
                          />
                        </div>
                      )}
                    />
                    {errors?.email?.message && (
                      <p className="mt-1 text-[12.5px] text-rose-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="mt-5">
                  <FieldLabel>Subject</FieldLabel>
                  <Controller
                    name="subject"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div
                        className={`relative mt-2 rounded-xl border bg-white transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${
                          errors?.subject
                            ? "border-rose-300"
                            : "border-slate-200"
                        }`}
                      >
                        <select
                          {...field}
                          className="w-full cursor-pointer appearance-none bg-transparent px-4 py-3 text-[14px] text-slate-800 outline-none"
                        >
                          <option value="">Select an option</option>
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <FiChevronDown
                          size={17}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.subject?.message && (
                    <p className="mt-1 text-[12.5px] text-rose-600">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mt-5">
                  <FieldLabel>Question / Enquiry</FieldLabel>
                  <Controller
                    name="questionEnquiry"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div
                        className={`relative mt-2 rounded-xl border bg-white p-4 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${
                          errors?.questionEnquiry
                            ? "border-rose-300"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <FiEdit2
                            size={17}
                            className="mt-0.5 shrink-0 text-slate-400"
                          />
                          <textarea
                            {...field}
                            rows={5}
                            maxLength={MESSAGE_LIMIT}
                            placeholder="Eg. I need to talk to the customer support."
                            className="w-full resize-none bg-transparent pb-4 text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
                          />
                        </div>
                        <span className="absolute bottom-3 right-4 text-[12px] text-slate-400">
                          {messageValue.length}/{MESSAGE_LIMIT}
                        </span>
                      </div>
                    )}
                  />
                  {errors?.questionEnquiry?.message && (
                    <p className="mt-1 text-[12.5px] text-rose-600">
                      {errors.questionEnquiry.message}
                    </p>
                  )}
                </div>

                {/* Notice */}
                <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
                  <FiInfo size={16} className="shrink-0 text-blue-600" />
                  <p className="text-[13px] text-blue-700">
                    Please provide as much detail as possible so we can assist
                    you better.
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700"
                  >
                    {loader ? (
                      <>
                        <Spinner color="white" className="h-4 w-4" />
                        Submitting ...
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </button>

                  <div className="flex items-start gap-2.5">
                    <FiShield
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <div>
                      <p className="text-[13px] font-medium text-slate-600">
                        Your information is safe with us.
                      </p>
                      <p className="text-[13px] text-slate-400">
                        We respect your privacy.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ScreenView>
  );
};

export default Contact;

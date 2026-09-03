import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScreenView from "../../layouts/ScreenView";
import SectionHeading from "../../components/ui/SectionHeading";

import airlines from "../../assets/images/qrbusiness/airlines.webp";
import beverage from "../../assets/images/qrbusiness/beverage.webp";
import business from "../../assets/images/qrbusiness/business.webp";
import cities from "../../assets/images/qrbusiness/cities.webp";
import consultants from "../../assets/images/qrbusiness/consultants.webp";
import consumers from "../../assets/images/qrbusiness/consumers.webp";
import developers from "../../assets/images/qrbusiness/developers.webp";
import editors from "../../assets/images/qrbusiness/editors.webp";
import education from "../../assets/images/qrbusiness/education.webp";
import eventmanage from "../../assets/images/qrbusiness/eventmanage.webp";
import financial from "../../assets/images/qrbusiness/financial.webp";
import goods from "../../assets/images/qrbusiness/goods.webp";
import government from "../../assets/images/qrbusiness/government.webp";
import graphicdesign from "../../assets/images/qrbusiness/graphicdesign.webp";
import gym from "../../assets/images/qrbusiness/gym.webp";
import home from "../../assets/images/qrbusiness/home.webp";
import hotels from "../../assets/images/qrbusiness/hotels.webp";
import media from "../../assets/images/qrbusiness/media.webp";
import medical from "../../assets/images/qrbusiness/medical.webp";
import museums from "../../assets/images/qrbusiness/museums.webp";
import musicians from "../../assets/images/qrbusiness/musicians.webp";
import ngo from "../../assets/images/qrbusiness/ngo.webp";
import personal from "../../assets/images/qrbusiness/personal.webp";
import photographers from "../../assets/images/qrbusiness/photographers.webp";
import publictransport from "../../assets/images/qrbusiness/publictransport.webp";
import realestate from "../../assets/images/qrbusiness/realestate.webp";
import reatilers from "../../assets/images/qrbusiness/reatilers.webp";
import restaurants from "../../assets/images/qrbusiness/restaurants.webp";
import stadiums from "../../assets/images/qrbusiness/stadiums.webp";
import tourism from "../../assets/images/qrbusiness/tourism.webp";

const categories = [
  {
    id: "restaurants",
    category: "restaurants",
    label: "Restaurants",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#restaurants-hovered",
    img: restaurants,
  },
  {
    id: "wellness",
    category: "gym-and-wellness",
    label: "Gym and wellness",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#wellness-hovered",
    img: gym,
  },
  {
    id: "consumer",
    category: "consumer-goods-packaged",
    label: "Consumer goods packaged",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#consumer-hovered",
    img: consumers,
  },
  {
    id: "nonprofits",
    category: "nonprofit-organizations",
    label: "Nonprofit organizations",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#nonprofits-hovered",
    img: ngo,
  },
  {
    id: "retailers",
    category: "retailers",
    label: "Retailers",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#retailers-hovered",
    img: reatilers,
  },
  {
    id: "software",
    category: "software-and-game-developers",
    label: "Software and game developers",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#software-hovered",
    img: developers,
  },
  {
    id: "publishers",
    category: "editors",
    label: "Editors",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#publishers-hovered",
    img: editors,
  },
  {
    id: "services",
    category: "business-services",
    label: "Business services",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#services-hovered",
    img: business,
  },
  {
    id: "hotels",
    category: "hotels-and-resorts",
    label: "Hotels and Resorts",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#hotels-hovered",
    img: hotels,
  },
  {
    id: "government",
    category: "government",
    label: "Government",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#government-hovered",
    img: government,
  },
  {
    id: "educational",
    category: "educational-institutions",
    label: "Educational institutions",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#educational-hovered",
    img: education,
  },
  {
    id: "realEstate",
    category: "real-estate-agencies",
    label: "Real estate agencies",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#realEstate-hovered",
    img: realestate,
  },
  {
    id: "health",
    category: "medical-care-and-doctors",
    label: "Medical care and doctors",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#health-hovered",
    img: medical,
  },
  {
    id: "tourism",
    category: "tourism",
    label: "Tourism",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#tourism-hovered",
    img: tourism,
  },
  {
    id: "personal",
    category: "personal-use",
    label: "Personal Use",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#personal-hovered",
    img: personal,
  },
  {
    id: "cities",
    category: "cities-and-cultures",
    label: "Cities and Cultures",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#cities-hovered",
    img: cities,
  },
  {
    id: "musicians",
    category: "musicians-and-artists",
    label: "Musicians and artists",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#musicians-hovered",
    img: musicians,
  },
  {
    id: "photographers",
    category: "photographers-and-videographers",
    label: "Photographers and videographers",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#photographers-hovered",
    img: photographers,
  },
  {
    id: "maintenance",
    category: "repairs-and-home-maintenance",
    label: "Repairs and home maintenance",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#maintenance-hovered",
    img: home,
  },
  {
    id: "finances",
    category: "financial-and-insurance-companies",
    label: "Financial and insurance companies",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#finances-hovered",
    img: financial,
  },
  {
    id: "events",
    category: "event-management",
    label: "Event Management",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#events-hovered",
    img: eventmanage,
  },
  {
    id: "consultants",
    category: "business-consultants",
    label: "Business Consultants",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#consultants-hovered",
    img: consultants,
  },
  {
    id: "museums",
    category: "museums-and-galleries",
    label: "Museums and galeries",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#museums-hovered",
    img: museums,
  },
  {
    id: "design",
    category: "graphic-design-studio",
    label: "Graphic Design Studio",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#design-hovered",
    img: graphicdesign,
  },
  {
    id: "electronics",
    category: "consumer-electronics",
    label: "Consumer electronics",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#electronics-hovered",
    img: consumers,
  },
  {
    id: "transportation",
    category: "public-transport",
    label: "Public transport",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#transportation-hovered",
    img: publictransport,
  },
  {
    id: "stadiums",
    category: "stadiums-and-convention-centers",
    label: "Stadiums and convention centers",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#stadiums-hovered",
    img: stadiums,
  },
  {
    id: "entertainment",
    category: "media-and-entertainment",
    label: "Media and entertainment",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#entertainment-hovered",
    img: media,
  },
  {
    id: "beverage",
    category: "beverage-industry",
    label: "Beverage Industry",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#beverage-hovered",
    img: beverage,
  },
  {
    id: "airlines",
    category: "airlines",
    label: "Airlines",
    Icon: "https://qrfy.com/assets/icons-DfaIYiE2.svg#airlines-hovered",
    img: airlines,
  },
];

export default function BusinessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScreenView>
        <div className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f7faff] to-white">
          {/* ── Decorative background (same language as the home hero) ── */}
          <div className="pointer-events-none absolute inset-0 h-[480px] overflow-hidden">
            <div className="absolute -left-32 -top-16 w-[460px] h-[460px] rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute -right-28 top-0 w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-3xl" />
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

          <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
            {/* ── Heading ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading
                title="QR Codes for your Business"
                highlight="your Business"
                subHeading="Discover how companies similar to yours use QR codes strategically."
                titleClassName="text-3xl md:text-[42px] leading-[1.15] max-w-4xl"
              />
            </motion.div>

            {/* ── Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
              {categories.map((cat, i) => {
                const { Icon } = cat;
                return (
                  <motion.div
                    key={cat.id}
                    // Per-card scroll reveal, staggered across each row of 3 —
                    // keeps long grids animating as you scroll instead of
                    // queueing one huge delay chain up front.
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      delay: (i % 3) * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -6 }}
                    onClick={() =>
                      navigate(`/resources/industry/${cat.category}`)
                    }
                    className="group bg-white overflow-hidden cursor-pointer border border-slate-200 rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-blue-200 hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.45)] transition-[box-shadow,border-color] duration-300"
                  >
                    {/* Image */}
                    <div
                      className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] to-[#f8fbff]"
                      style={{ aspectRatio: "4/3" }}
                    >
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />
                      {/* subtle tint on hover */}
                      <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
                    </div>

                    {/* Label row */}
                    <div className="px-4 py-3.5 flex items-center gap-3 border-t border-slate-100">
                      <span className="w-11 h-11 shrink-0 rounded-xl border border-slate-200 bg-white flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors duration-300">
                        <img
                          src={Icon}
                          alt=""
                          className="w-7 h-7 object-contain"
                        />
                      </span>
                      <span className="text-slate-800 font-semibold text-sm group-hover:text-blue-600 transition-colors duration-200">
                        {cat.label}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="ml-auto shrink-0 text-blue-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </ScreenView>
    </>
  );
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Utensils,
  Dumbbell,
  Package,
  Heart,
  ShoppingCart,
  Gamepad2,
} from "lucide-react";
import ScreenView from "../../layouts/ScreenView";
import PageHeader from "../../components/PageHeader";
import Footer from "../../common/footer/Footer";

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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <PageHeader
            title="QR Codes for your Business"
            date="Discover how companies similar to yours use QR codes strategically"
            showBtn={false}
          />
        </motion.div>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto px-6 py-16">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, i) => {
                const { Icon } = cat;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -3 }}
                    onClick={() =>
                      navigate(`/resources/industry/${cat.category}`)
                    }
                    className="bg-white overflow-hidden cursor-pointer border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl"
                  >
                    {/* Image */}
                    <div className="h-auto overflow-hidden">
                      <img
                        src={cat.img}
                        alt={cat.label}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Label row */}
                    <div className="px-4 py-3.5 flex items-center gap-3 border-t border-gray-100">
                      {/* <Icon size={18} className="text-gray-400 shrink-0" /> */}
                      <img src={Icon} className="w-[50px] h-[50px]" />
                      <span className="text-gray-800 font-semibold text-sm">
                        {cat.label}
                      </span>
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
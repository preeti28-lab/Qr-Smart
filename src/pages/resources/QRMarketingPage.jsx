import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScreenView from "../../layouts/ScreenView";

import businessImg from "../../assets/images/qrcodeson/businesscard.webp";
import pamphlates from "../../assets/images/qrcodeson/pamphlates.webp";
import brouchersImg from "../../assets/images/qrcodeson/brouchers.webp";
import bottlescansImg from "../../assets/images/qrcodeson/bottlescans.webp";
import productpackagingImg from "../../assets/images/qrcodeson/productpackaging.webp";
import menuImg from "../../assets/images/qrcodeson/menu.webp";
import flyersImg from "../../assets/images/qrcodeson/flyers.webp";
import stickersImg from "../../assets/images/qrcodeson/stickers.webp";
import foodImg from "../../assets/images/qrcodeson/food.webp";
import bannersImg from "../../assets/images/qrcodeson/banners.webp";
import clothesImg from "../../assets/images/qrcodeson/clothes.webp";
import displaysImg from "../../assets/images/qrcodeson/displays.webp";
import magazineImg from "../../assets/images/qrcodeson/magazine.webp";
import postersImg from "../../assets/images/qrcodeson/posters.webp";
import stationaryImg from "../../assets/images/qrcodeson/stationary.webp";
import tabletentsImg from "../../assets/images/qrcodeson/tabletents.webp";
import ticketsImg from "../../assets/images/qrcodeson/tickets.webp";
import storefrontImg from "../../assets/images/qrcodeson/storefront.webp";
import giveawaysImg from "../../assets/images/qrcodeson/giveaways.webp";
import socialnetworkImg from "../../assets/images/qrcodeson/socail-network.webp";
import billboardsImg from "../../assets/images/qrcodeson/billboards.webp";
import catalogsImg from "../../assets/images/qrcodeson/catalogs.webp";
import booksImg from "../../assets/images/qrcodeson/books.webp";
import infoImg from "../../assets/images/qrcodeson/info.webp";
import tvImg from "../../assets/images/qrcodeson/tv.webp";
import videogameImg from "../../assets/images/qrcodeson/videogame.webp";
import cinemaImg from "../../assets/images/qrcodeson/cinema.webp";
import webImg from "../../assets/images/qrcodeson/web.webp";
import artImg from "../../assets/images/qrcodeson/art.webp";
import badgeImg from "../../assets/images/qrcodeson/badge.webp";
import booksnewImg from "../../assets/images/qrcodeson/booksnew.webp";
import vehiclesImg from "../../assets/images/qrcodeson/vehicles.webp";
import websiteImg from "../../assets/images/qrcodeson/website.webp";
import emailsImg from "../../assets/images/qrcodeson/emails.webp";
import digitalImg from "../../assets/images/qrcodeson/digital.webp";
import streetsignsImg from "../../assets/images/qrcodeson/streetsigns.webp";
import eventImg from "../../assets/images/qrcodeson/event.webp";

// ─── Exact labels from screenshot ────────────────────────────────────────────
const categories = [
  {
    id: "business-cards",
    label: "Business cards",
    img: businessImg,
    iconLink:
      "https://cdn.jsdelivr.net/npm/lucide-static/icons/credit-card.svg",
  },
  {
    id: "flyers",
    label: "Flyers",
    img: flyersImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/file-text.svg",
  },
  {
    id: "brochures",
    label: "Brochures",
    img: brouchersImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/book-open.svg",
  },
  {
    id: "stickers-and-labels",
    label: "Stickers and labels",
    img: stickersImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/tag.svg",
  },
  {
    id: "product-packaging",
    label: "Product packaging",
    img: productpackagingImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/package.svg",
  },
  {
    id: "food-packaging",
    label: "Food packaging",
    img: foodImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/utensils.svg",
  },
  {
    id: "banners",
    label: "Banners",
    img: bannersImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/flag.svg",
  },
  {
    id: "clothes",
    label: "Clothes",
    img: clothesImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/shirt.svg",
  },
  {
    id: "displays",
    label: "Displays",
    img: displaysImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/monitor.svg",
  },
  {
    id: "magazines-and-journals",
    label: "Magazines and journals",
    img: magazineImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/newspaper.svg",
  },
  {
    id: "posters",
    label: "Posters",
    img: postersImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/filter.svg",
  },
  {
    id: "stationery",
    label: "Stationery",
    img: stationaryImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/pen-line.svg",
  },
  {
    id: "table-tents",
    label: "Table tents",
    img: tabletentsImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/layout.svg",
  },
  {
    id: "tickets",
    label: "Tickets",
    img: ticketsImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/car.svg",
  },
  {
    id: "storefronts",
    label: "Storefronts",
    img: storefrontImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/store.svg",
  },
  {
    id: "giveaways",
    label: "Giveaways",
    img: giveawaysImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/gift.svg",
  },
  {
    id: "social-networks",
    label: "Social networks",
    img: socialnetworkImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/share-2.svg",
  },
  {
    id: "billboards",
    label: "Billboards",
    img: billboardsImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/megaphone.svg",
  },
  {
    id: "catalogs",
    label: "Catalogs",
    img: catalogsImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/package-2.svg",
  },
  {
    id: "books-and-electronic-magazines",
    label: "Books and electronic magazines",
    img: booksImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/book.svg",
  },
  {
    id: "infographics",
    label: "Infographics",
    img: infoImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/bar-chart.svg",
  },
  {
    id: "tv-commercial",
    label: "Tv commercial",
    img: tvImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/tv.svg",
  },
  {
    id: "menus",
    label: "Menus",
    img: menuImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/menu.svg",
  },
  {
    id: "video-games",
    label: "Video games",
    img: videogameImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/gamepad-2.svg",
  },
  {
    id: "cinema-advertisement",
    label: "Cinema advertisement",
    img: cinemaImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/film.svg",
  },
  {
    id: "web-content",
    label: "Web content",
    img: webImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/globe.svg",
  },
  {
    id: "art",
    label: "Art",
    img: artImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/droplets.svg",
  },
  {
    id: "badges",
    label: "Badges",
    img: badgeImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/badge.svg",
  },
  {
    id: "books",
    label: "Books",
    img: booksnewImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/book-open.svg",
  },
  {
    id: "bottle-and-cans",
    label: "Bottle and cans",
    img: bottlescansImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/wine.svg",
  },
  {
    id: "vehicles",
    label: "Vehicles",
    img: vehiclesImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/truck.svg",
  },
  {
    id: "website",
    label: "Website",
    img: websiteImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/globe.svg",
  },
  {
    id: "emails",
    label: "Emails",
    img: emailsImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/mail.svg",
  },
  {
    id: "digital-signage",
    label: "Digital signage",
    img: digitalImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/building-2.svg",
  },
  {
    id: "td-images",
    label: "Street Signs",
    img: streetsignsImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/signpost.svg",
  },
  {
    id: "event-program",
    label: "Event program",
    img: eventImg,
    iconLink: "https://cdn.jsdelivr.net/npm/lucide-static/icons/dices.svg",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ cat, index }) {
  const navigate = useNavigate();

  return (
    <motion.div
      // Per-card scroll reveal, staggered across each row of 3.
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: (index % 3) * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/resources/qr-on/${cat.id}`)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-blue-200 hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.45)] transition-[box-shadow,border-color] duration-300"
    >
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] to-[#f8fbff]"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={cat.img}
          alt={cat.label}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* hover overlay */}
        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-300" />

        {/* explore pill — appears on hover */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-[11px] font-bold text-slate-700">Explore</span>
          <ArrowUpRight size={12} className="text-blue-600" />
        </div>
      </div>

      {/* ── Label row ── */}
      <div className="flex items-center gap-3 bg-white px-4 py-4 border-t border-slate-100">
        <span className="w-11 h-11 p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-center shrink-0 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors duration-300">
          <img
            src={cat.iconLink}
            alt=""
            className="w-full h-auto object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300"
            style={{ filter: "grayscale(1)" }}
          />
        </span>

        {/* label text */}
        <span className="text-slate-800 font-bold text-[15px] leading-snug group-hover:text-blue-600 transition-colors duration-200">
          {cat.label}
        </span>

        <ArrowUpRight
          size={16}
          className="ml-auto shrink-0 text-blue-600 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
        />
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function QRMarketingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ScreenView>
        <div className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f7faff] to-white">
          {/* ── Decorative background (same language as the home hero) ── */}
          <div className="pointer-events-none absolute inset-0 h-[440px] overflow-hidden">
            <div className="absolute -left-32 -top-16 w-[460px] h-[460px] rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute -right-28 top-0 w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-3xl" />
            <div
              className="hidden md:block absolute left-6 top-20 w-28 h-28 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(#93c5fd 1.6px, transparent 1.6px)",
                backgroundSize: "13px 13px",
              }}
            />
            <div
              className="hidden md:block absolute right-8 top-16 w-32 h-28 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(#93c5fd 1.6px, transparent 1.6px)",
                backgroundSize: "13px 13px",
              }}
            />
          </div>

          {/* ── HEADER ────────────────────────────────────────────── */}
          <div className="relative text-center pt-16 pb-4 px-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 mb-4 text-blue-600 font-semibold text-sm"
            >
              <span className="h-px w-8 bg-blue-300" />
              QR Codes on
              <span className="h-px w-8 bg-blue-300" />
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl md:text-[42px] font-bold text-slate-900 mb-3 leading-[1.15] tracking-tight"
            >
              Uses of QR codes{" "}
              <span className="text-blue-600">Marketing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed"
            >
              Discover how to use QR codes to boost your marketing strategy.
            </motion.p>
          </div>

          {/* ── GRID ──────────────────────────────────────────────── */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
            <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {categories.map((cat, i) => (
                <Card key={cat.id} cat={cat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </ScreenView>
    </>
  );
}
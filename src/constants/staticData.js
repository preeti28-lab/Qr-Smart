import {
    FaWifi,
    FaChair,
    FaWheelchair,
    FaToilet,
    FaChild,
    FaDog,
    FaParking,
    FaTrain,
    FaTaxi,
    FaBed,
    FaCoffee,
    FaGlassMartiniAlt,
    FaUtensils,
} from "react-icons/fa";


export const pricingPlans = [
    {
        durationLabel: "12 Months",
        billingText: "Billed annually",
        originalPrice: 20,
        discountedPrice: 18,
        priceUnit: "month",
        months: '12'
    },
    {
        durationLabel: "6 Months",
        billingText: "Billed every semester",
        price: 26,
        priceUnit: "month",
        months: '6'
    },
    {
        durationLabel: "3 Months",
        billingText: "Billed quarterly",
        price: 34,
        priceUnit: "month",
        months: '3'
    },
];




export const facilitiesList = [
    { name: "Wi-Fi", icon: FaWifi },
    { name: "Seat", icon: FaChair },
    { name: "Accessible", icon: FaWheelchair },
    { name: "Toilet", icon: FaToilet },
    { name: "Child", icon: FaChild },
    { name: "Pet", icon: FaDog },
    { name: "Parking", icon: FaParking },
    { name: "Train", icon: FaTrain },
    { name: "Taxi", icon: FaTaxi },
    { name: "Bed", icon: FaBed },
    { name: "Cafe", icon: FaCoffee },
    { name: "Bar", icon: FaGlassMartiniAlt },
    { name: "Restaurant", icon: FaUtensils },
];
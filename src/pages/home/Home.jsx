import React from "react";
import Navbar from "../../common/navbar/Navbar";
import QRGenerator from "../../tools/QRGenerator";
import ScreenView from "../../layouts/ScreenView";
import { Helmet } from "react-helmet-async";
import Introduction from "../../Introduction";
import Footer from "../../common/footer/Footer";
import DifferentQRTypes from "./DifferentQRTypes";
import HowToUse from "./howToUse/HowToUse";
import HomeFaq from "./HomeFaq";
import FAQPage from "./FAQPage";
import QRCollection from "./qrCollections/QRCollection";
import FeaturesAccordion from "./Features";
import CreateQRSteps from "./StepsToQR";
import QRGenerate from "./qrGenerate/QRGenerate";

const Home = () => {
  return (
    <>
      <ScreenView>
        {/* <div className='w-full flex my-6 justify-center items-center'> */}
        <div className="">
          {/* <QRGenerator /> */}
          <Introduction />
          <HowToUse />
          <DifferentQRTypes />
          <HomeFaq />
          <QRCollection />
          <FeaturesAccordion />
          <FAQPage />
        </div>
      </ScreenView>
    </>
  );
};

export default Home;

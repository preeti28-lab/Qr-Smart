import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";

import "../../styles/datefield.scss";
import {
  setWebsiteUrl,
  setVCardDetails,
  setQrName,
  setTime,
  setQrType,
  getShortLink,
  setLastPage,
  setImageQrName,
  setPdfQrName,
  setVCQrName,
  setTextQrName,
  setVideoQrName,
} from "../../redux/features/dashboard";
import { useDispatch, useSelector } from "react-redux";
import VCForm from "./VCForm";
import usePath from "../../hooks/usePath";
import { useNavigate } from "react-router-dom";
import ImageBuilder from "./images/ImageBuilder";
import AppBuilder from "./app/AppBuilder";
import CouponBuilder from "./coupon/CouponBuilder";
import VCardPlusBuilder from "./vCardPlus/VCardPlusBuilder";
import SocialMediaBuilder from "./socialMedia/SocialMediaBuilder";
import BusinessBuilder from "./business/BusinessBuilder";
import ListOfLinksBuilder from "./listOfLinks/ListOfLinksBuilder";
import VideoBuilder from "./video/VideoBuilder";
import EventBuilder from "./event/EventBuilder";
import ProductBuilder from "./product/ProductBuilder";
import TextBuilder from "./static/text/TextBuilder";
import URLBuilder from "./static/url/URLBuilder";
import WhatsappBuilder from "./static/whatsapp/WhatsappBuilder";
import WifiBuilder from "./static/wifi/WifiBuilder";
import EmailBuilder from "./static/email/EmailBuilder";
import SMSBuilder from "./static/sms/SMSBuilder";
import PdfBuilder from "./pdf/PdfBuilder";
import FeedbackBuilder from "./feedback/FeedbackBuilder";
import MenuBuilder from "./menu/MenuBuilder";
import MP3Builder from "./mp3/MP3Builder";
import PlaylistBuilder from "./playlist/PlaylistBuilder";
import NormalVCardBuilder from "./static/vcard/NormalVCardBuilder";

const Content = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = usePath();
  const {
    qrType,
    websiteUrl,
    qrName,
    textQrName,
    videoQrName,
    imageQrName,
    pdfQrName,
    vcQrName,
  } = useSelector((state) => state.dashboard);

  const [timeRange, setTimeRange] = useState(null);
  const [uploadedImages, setUploadedImages] = useState();

  const [imageFormData, setImageFormData] = useState(null);
  const [couponFormData, setCouponFormData] = useState(null);
  const [vCardPlusData, setvCardPlusData] = useState({
    selectedTemplate: 0,
  });

  const [businessData, setBusinessData] = useState();
  const [listOfLinksData, setListOfLinksData] = useState();
  const [videoData, setVideoData] = useState();
  const [eventData, setEventData] = useState();
  const [productData, setProductData] = useState();
  const [textData, setTextData] = useState();
  const [urlData, setUrlData] = useState();
  const [whatsappData, setWhatsappData] = useState();
  const [emailData, setEmailData] = useState();
  const [smsData, setSmsData] = useState();
  const [menuData, setMenuData] = useState();
  const [pdfData, setPdfData] = useState();
  const [staticVCardDetails, setStaticVCardDetails] = useState();

  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name } = e.target;
    if (name === "website") {
      const value = e.target.value;
      setWebsite(value);

      // Validation: Must start with http:// or https://
      if (!/^https?:\/\//.test(value) && value !== "") {
        setError("Url must start with http:// or https://");
      } else {
        setError("");
      }
      const website = e.target.value;
      dispatch(setWebsiteUrl(website));
    } else if (name === "qrName") {
      const name = e.target.value;
      dispatch(setQrName(name));
    }

    if (name === "qrName" && qrType.type === "video") {
      const name = e.target.value;
      dispatch(setVideoQrName(name));
    }
    if (name === "qrName" && qrType.type === "image") {
      const name = e.target.value;
      dispatch(setImageQrName(name));
    }
    if (name === "qrName" && qrType.type === "pdf") {
      const name = e.target.value;
      dispatch(setPdfQrName(name));
    }
    if (name === "qrName" && qrType.type === "vcard") {
      const name = e.target.value;
      dispatch(setVCQrName(name));
    }
    if (name === "qrName" && qrType.type === "text") {
      const name = e.target.value;
      dispatch(setTextQrName(name));
    }
  };

  const handleTimeChange = (time, timeString) => {
    console.log("Selected Time Range:", time); // Moment object
    console.log("Formatted Time Range:", timeString); // String format (e.g., ["12:00", "14:00"])
    setTimeRange(timeString);
  };

  useEffect(() => {
    dispatch(setTime(timeRange));
  }, [timeRange]);

  const handleOptionChange = (e) => {
    console.log(e.target.value);

    dispatch(setQrType({ type: e.target.value }));
  };

  // useEffect(() => {
  //   dispatch(getShortLink());
  // }, [dispatch]);

  return (
    <>
      <AppViewer>
        <div>
          {qrType?.type === "vCard" && (
            <NormalVCardBuilder
              nextPath="qr-design"
              currentFormData={staticVCardDetails}
              setCurrentFormData={setStaticVCardDetails}
            />
          )}
          {/* {qrType?.type === "text" && <TextForm nextPath="qr-design" />} */}
          {qrType?.type === "pdf" && (
            <PdfBuilder
              nextPath="qr-design"
              currentFormData={pdfData}
              setCurrentFormData={setPdfData}
            />
          )}
          {qrType?.type === "image" && (
            <ImageBuilder
              nextPath="qr-design"
              currentFormData={imageFormData}
              setCurrentFormData={setImageFormData}
            />
          )}
          {qrType?.type === "coupon" && (
            <CouponBuilder
              nextPath="qr-design"
              currentFormData={couponFormData}
              setCurrentFormData={setCouponFormData}
            />
          )}
          {qrType?.type === "vCardPlus" && (
            <VCardPlusBuilder
              nextPath="qr-design"
              currentFormData={vCardPlusData}
              setCurrentFormData={setvCardPlusData}
            />
          )}
          {qrType?.type === "socialMedia" && (
            <SocialMediaBuilder
              nextPath="qr-design"
              currentFormData={vCardPlusData}
              setCurrentFormData={setvCardPlusData}
            />
          )}
          {qrType?.type === "business" && (
            <BusinessBuilder
              nextPath="qr-design"
              currentFormData={businessData}
              setCurrentFormData={setBusinessData}
            />
          )}
          {qrType?.type === "listOfLinks" && (
            <ListOfLinksBuilder
              nextPath="qr-design"
              currentFormData={listOfLinksData}
              setCurrentFormData={setListOfLinksData}
            />
          )}
          {qrType?.type === "video" && (
            <VideoBuilder
              nextPath="qr-design"
              currentFormData={videoData}
              setCurrentFormData={setVideoData}
            />
          )}
          {qrType?.type === "event" && (
            <EventBuilder
              nextPath="qr-design"
              currentFormData={eventData}
              setCurrentFormData={setEventData}
            />
          )}
          {qrType?.type === "product" && (
            <ProductBuilder
              nextPath="qr-design"
              currentFormData={productData}
              setCurrentFormData={setProductData}
            />
          )}
          {qrType?.type === "text" && (
            <TextBuilder
              nextPath="qr-design"
              currentFormData={textData}
              setCurrentFormData={setTextData}
            />
          )}
          {qrType?.type === "url" && (
            <URLBuilder
              nextPath="qr-design"
              currentFormData={urlData}
              setCurrentFormData={setUrlData}
            />
          )}
          {qrType?.type === "whatsapp" && (
            <WhatsappBuilder
              nextPath="qr-design"
              currentFormData={whatsappData}
              setCurrentFormData={setWhatsappData}
            />
          )}

          {qrType?.type === "wifi" && (
            <WifiBuilder
              nextPath="qr-design"
              currentFormData={whatsappData}
              setCurrentFormData={setWhatsappData}
            />
          )}

          {qrType?.type === "email" && (
            <EmailBuilder
              nextPath="qr-design"
              currentFormData={emailData}
              setCurrentFormData={setEmailData}
            />
          )}

          {qrType?.type === "sms" && (
            <SMSBuilder
              nextPath="qr-design"
              currentFormData={smsData}
              setCurrentFormData={setSmsData}
            />
          )}

          {qrType?.type === "feedback" && (
            <FeedbackBuilder
              nextPath="qr-design"
              currentFormData={smsData}
              setCurrentFormData={setSmsData}
            />
          )}

          {qrType?.type === "menu" && (
            <MenuBuilder
              nextPath="qr-design"
              currentFormData={menuData}
              setCurrentFormData={setMenuData}
            />
          )}

          {qrType?.type === "mp3" && (
            <MP3Builder
              nextPath="qr-design"
              currentFormData={menuData}
              setCurrentFormData={setMenuData}
            />
          )}

          {qrType?.type === "playlist" && (
            <PlaylistBuilder
              nextPath="qr-design"
              currentFormData={menuData}
              setCurrentFormData={setMenuData}
            />
          )}

          {qrType?.type === "app" && <AppBuilder nextPath="qr-design" />}
        </div>
      </AppViewer>
    </>
  );
};

export default Content;

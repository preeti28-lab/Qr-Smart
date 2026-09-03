import React, { useEffect, useState } from "react";
import QRTypesBar from "./QRTypesBar";
import WebsiteForm from "./forms/WebsiteForm";
import QRView from "./QRView";
import NotAvailableQR from "./forms/NotAvailableQR";
import WifiForm from "./forms/WifiForm";
import EmailForm from "./forms/EmailForm";
import WhatsAppForm from "./forms/WhatsAppForm";
import SMSForm from "./forms/SMSForm";
import MP3Form from "./forms/MP3Form";
import VCardForm from "./forms/VCardForm";
import TextForm from "./forms/TextForm";
import QRDesignTabs from "../../../components/ui/QRDesignTabs";
import StepHeading from "../../../components/ui/StepHeading";

const blockedArr = [
  "mp3",
  "social-media",
  "vcard",
  "images",
  "product",
  "video",
  "business",
  "event",
  "coupon",
  "feedback",
  "socialMedia",
  "menu",
  "apps",
  "landingPage",
  "playlist",
  "barcode",
  "pdf",
  "links",
];
// A reusable QRForm component to handle shared props
const QRForm = ({ selectedType, sharedProps }) => {
  const formComponents = {
    website: <WebsiteForm {...sharedProps} />,
    text: <TextForm {...sharedProps} />,
    email: <EmailForm {...sharedProps} />,
    whatsapp: <WhatsAppForm {...sharedProps} />,
    wifi: <WifiForm {...sharedProps} />,
    sms: <SMSForm {...sharedProps} />,
    vCard: <VCardForm {...sharedProps} />,

    mp3: (
      <NotAvailableQR
        title="QR MP3"
        content="Share audiobook, music, and podcast clips instantly. Make it easy for your audience to enjoy your content."
        builderType="mp3"
      />
    ),
    "social-media": (
      <NotAvailableQR
        title="QR Social Media"
        content="Increase your social media presence by easily sharing your profiles; with just one scan, you allow more people to discover all your content."
        builderType="socialMedia"
      />
    ),
    vcard: (
      <NotAvailableQR
        title="QR Vcard Plus"
        content="Transform your business card into an interactive digital experience, where your contacts can access all your information and social networks with just a scan."
        builderType="vCardPlus"
      />
    ),
    images: (
      <NotAvailableQR
        title="QR Images"
        content="Share memories and special moments like never before through a QR code, where each image tells a story and is accessible to everyone."
        builderType="image"
      />
    ),
    product: (
      <NotAvailableQR
        title="Product"
        content="Display key information about your products in a single QR code: nutritional data, certifications, allergens and more. Make it easy for your customers to access everything they need to make informed decisions and make your products stand out!"
        builderType="product"
      />
    ),
    links: (
      <NotAvailableQR
        title="QR Links"
        content="Make it easy to access tutorials, trailers, or educational content. Increase the visibility of your content by sharing videos easily."
        builderType="listOfLinks"
      />
    ),
    video: (
      <NotAvailableQR
        title="QR Video"
        content="Make it easy to access tutorials, trailers, or educational content. Increase the visibility of your content by sharing videos easily."
        builderType="video"
      />
    ),
    business: (
      <NotAvailableQR
        title="QR Business"
        content="Say goodbye to manual updates to your store. With a QR code, you ensure a fluid connection between your business and those who search for you, always keeping relevant information within reach of your customers."
        builderType="business"
      />
    ),
    event: (
      <NotAvailableQR
        title="QR Event"
        content="Wow your guests with a dynamic invitation. Include images that will leave them excited and don't forget to add the date, time and location so that no one misses your party."
        builderType="event"
      />
    ),
    coupon: (
      <NotAvailableQR
        title="QR Coupon"
        content="Turn every scan into a sales opportunity by offering discounts that your customers can instantly claim."
        builderType="coupon"
      />
    ),
    feedback: (
      <NotAvailableQR
        title="QR Feedback"
        content="Capture your customers' experiences instantly, with insights that help you improve your business."
        builderType="feedback"
      />
    ),
    socialMedia: (
      <NotAvailableQR
        title="QR Social Media"
        content="Increase your social media presence by easily sharing your profiles; with just one scan, you allow more people to discover all your content."
        builderType="socialMedia"
      />
    ),
    menu: (
      <NotAvailableQR
        title="QR Menu"
        content="Transform your diners' dining experience with an instantly accessible digital menu, creating an interactive and engaging experience."
        builderType="menu"
      />
    ),
    apps: (
      <NotAvailableQR
        title="QR Apps"
        content="Simplify the installation of your applications: allow your customers to access the download link with just one scan, without complications."
        builderType="app"
      />
    ),
    landingPage: (
      <NotAvailableQR
        title="QR Landing Page"
        content="Take your visitors to a custom-designed landing page where they can find all the information they need, whether about your business or a personal project, with a simple scan."
        // No dedicated builder exists for this type yet — falls back to the
        // generic /builder picker inside NotAvailableQR.
      />
    ),
    playlist: (
      <NotAvailableQR
        title="QR Playlist"
        content="Share your music and playlists with ease, allowing your friends and followers to access your best tracks with a simple scan."
        builderType="playlist"
      />
    ),
    barcode: (
      <NotAvailableQR
        title="QR 2D Barcode"
        content="Provide key information about your products and logistics details efficiently with a 2D barcode, tailored to your business needs."
        // No dedicated builder exists for this type yet — falls back to the
        // generic /builder picker inside NotAvailableQR.
      />
    ),
    pdf: (
      <NotAvailableQR
        title="QR PDF"
        content="From menus to user guides to creative portfolios, give your clients access to PDF documents quickly and efficiently."
        builderType="pdf"
      />
    ),
  };

  return (
    formComponents[selectedType] || (
      <NotAvailableQR title="QR Not Available" content="Coming soon..." />
    )
  );
};

const QRGenerate = () => {
  const [selectedType, setSelectedType] = useState("website");

  const [selectedFrame, setSelectedFrame] = useState("none");
  const [selectedShape, setSelectedShape] = useState("classy");
  const [selectedLogo, setSelectedLogo] = useState();
  const [selectedLevel, setSelectedLevel] = useState();

  const [isCodeStyle, setIsCodeStyle] = useState(false);
  const [isCorner, setIsCorner] = useState(false);
  const [isCenterStyle, setIsCenterStyle] = useState(false);
  const [isCodeStyleBorderColor, setIsCodeStyleBorderColor] =
    useState("#000000");
  const [isCodeStyleDotColor, setIsCodeStyleDotColor] = useState("#000000");
  const [isCodeStyleCenterColor, setIsCodeStyleCenterColor] =
    useState("#000000");
  const [isCodeStyleBackgroundColor, setIsCodeStyleBackgroundColor] =
    useState("#FFFFFF");

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [enteredText, setEnteredText] = useState("");
  const [emailData, setEmailData] = useState({
    emai: "",
    subject: "",
    message: "",
  });

  const [smsData, setSmsData] = useState({
    number: "",
    message: "",
  });

  const [whatsAppData, setWhatsAppData] = useState({
    number: "",
    message: "",
  });

  const [wifiData, setWifiData] = useState({
    networkName: "",
    networkPassword: "",
    encryptionType: "",
    isHiddenNetwork: "",
  });

  const [vCardData, setVCardData] = useState({
    name: "",
    surname: "",
    street: "",
    number: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    companyName: "",
    title: "",
  });

  // Reset states when selectedType changes
  useEffect(() => {
    setWebsiteUrl(""); // Reset website URL
    setEnteredText(""); // Reset entered text
    setSelectedFrame("none"); // Reset frame type
    setSelectedShape("classy"); // Reset shape to default
    setSelectedLogo(undefined); // Reset logo selection
    setSelectedLevel(undefined); // Reset level
    setIsCodeStyle(false); // Reset code style
    setIsCorner(false); // Reset corner style
    setIsCenterStyle(false); // Reset center style
    setIsCodeStyleBorderColor("#000000"); // Reset border color
    setIsCodeStyleDotColor("#000000"); // Reset dot color
    setIsCodeStyleCenterColor("#000000"); // Reset center color
    setIsCodeStyleBackgroundColor("#FFFFFF"); // Reset background color
  }, [selectedType]); // Dependency on selectedType to trigger reset

  // Shared props to pass to the form components
  const sharedProps = {
    selectedFrame,
    setSelectedFrame,
    selectedShape,
    setSelectedShape,
    selectedLogo,
    setSelectedLogo,
    selectedLevel,
    setSelectedLevel,
    isCodeStyle,
    setIsCodeStyle,
    isCorner,
    setIsCorner,
    isCenterStyle,
    setIsCenterStyle,
    isCodeStyleBorderColor,
    setIsCodeStyleBorderColor,
    isCodeStyleDotColor,
    setIsCodeStyleDotColor,
    isCodeStyleCenterColor,
    setIsCodeStyleCenterColor,
    isCodeStyleBackgroundColor,
    setIsCodeStyleBackgroundColor,
    websiteUrl,
    setWebsiteUrl,
    enteredText,
    setEnteredText,
    emailData,
    setEmailData,
    whatsAppData,
    setWhatsAppData,
    wifiData,
    setWifiData,
    smsData,
    setSmsData,
    vCardData,
    setVCardData,
  };

  return (
    <div className="w-full p-3 md:p-4 max-w-[92%] xl:max-w-6xl mx-5 md:mx-auto bg-white border border-slate-200/80 rounded-3xl shadow-[0_20px_60px_-20px_rgba(37,99,235,0.18)] flex flex-col">
      <QRTypesBar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[34rem_290px] xl:grid-cols-[68%_30%] gap-3 mt-3 bg-white p-0 rounded-lg">
        <div className="p-1 md:p-6">
          <QRForm selectedType={selectedType} sharedProps={sharedProps} />
          {!blockedArr.includes(selectedType) && (
            <>
              <div className="my-6 ">
                <StepHeading number="2" text="Design your QR" />
              </div>
              <QRDesignTabs
                selectedFrame={selectedFrame}
                setSelectedFrame={setSelectedFrame}
                selectedShape={selectedShape}
                setSelectedShape={setSelectedShape}
                selectedLogo={selectedLogo}
                setSelectedLogo={setSelectedLogo}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                isCodeStyle={isCodeStyle}
                setIsCodeStyle={setIsCodeStyle}
                isCorner={isCorner}
                setIsCorner={setIsCorner}
                isCenterStyle={isCenterStyle}
                setIsCenterStyle={setIsCenterStyle}
                isCodeStyleBorderColor={isCodeStyleBorderColor}
                setIsCodeStyleBorderColor={setIsCodeStyleBorderColor}
                isCodeStyleDotColor={isCodeStyleDotColor}
                setIsCodeStyleDotColor={setIsCodeStyleDotColor}
                isCodeStyleCenterColor={isCodeStyleCenterColor}
                setIsCodeStyleCenterColor={setIsCodeStyleCenterColor}
                isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
                setIsCodeStyleBackgroundColor={setIsCodeStyleBackgroundColor}
              />
            </>
          )}
        </div>
        <QRView
          selectedType={selectedType}
          websiteUrl={websiteUrl}
          enteredText={enteredText}
          emailData={emailData}
          whatsAppData={whatsAppData}
          selectedFrame={selectedFrame}
          selectedLevel={selectedLevel}
          isCodeStyle={isCodeStyle}
          isCorner={isCorner}
          isCenterStyle={isCenterStyle}
          isCodeStyleBorderColor={isCodeStyleBorderColor}
          isCodeStyleDotColor={isCodeStyleDotColor}
          isCodeStyleCenterColor={isCodeStyleCenterColor}
          isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
          selectedLogo={selectedLogo}
          wifiData={wifiData}
          smsData={smsData}
          vCardData={vCardData}
          // Blocked types (no real form/content behind them) still show the
          // preview panel — keeps the layout width consistent across tabs —
          // but hide the Download button since there's nothing real to
          // download yet.
          showBtn={!blockedArr.includes(selectedType)}
        />
      </div>
    </div>
  );
};

export default QRGenerate;
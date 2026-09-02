import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getQRDataByShortUrl } from "../../redux/features/qrcodes";

import DemoPreview from "../../components/ui/DemoPreview";

import PreviewScreen from "../../app/builder/pdf/PreviewScreen";
import ImagePreviewScreen from "../../app/builder/images/PreviewScreen";
import VideoPreviewScreen from "../../app/builder/video/PreviewScreen";
import AppPreviewScreen from "../../app/builder/app/AppPreviewScreen";
import CouponPreview from "../../app/builder/coupon/PreviewScreen";
import VCardPlusPreview from "../../app/builder/vCardPlus/PreviewScreen";
import SocialMediaPreview from "../../app/builder/socialMedia/PreviewScreen";
import BusinessPreview from "../../app/builder/business/PreviewScreen";
import ListOfLinksPreview from "../../app/builder/listOfLinks/PreviewScreen";
import EventPreview from "../../app/builder/event/PreviewScreen";
import ProductPreview from "../../app/builder/product/PreviewScreen";
import Mp3Preview from "../../app/builder/mp3/PreviewScreen";
import MenuPreview from "../../app/builder/menu/PreviewScreen";
import PlaylistPreview from "../../app/builder/playlist/PreviewScreen";
import FeedBackPreview from "../../app/builder/feedback/PreviewScreen";

const QRScanPage = () => {
  const { shortUrl } = useParams();
  const dispatch = useDispatch();
  const [qrData, setQRData] = useState(null);

  useEffect(() => {
    if (!shortUrl) return;

    dispatch(
      getQRDataByShortUrl(shortUrl, (success, data) => {
        if (success) setQRData(data);
      }),
    );
  }, [shortUrl, dispatch]);

  if (!qrData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        Loading...
      </div>
    );
  }

  const content = qrData?.content;

  // 🔥 Central renderer
  const renderPreview = () => {
    const commonProps = {
      currentFormData: content,
      isScanPage: true,
    };

    switch (qrData?.type) {
      case "pdf":
        return <PreviewScreen {...commonProps} />;

      case "image":
        return <ImagePreviewScreen {...commonProps} />;

      case "video":
        return <VideoPreviewScreen {...commonProps} />;

      case "app":
        return <AppPreviewScreen {...commonProps} />;

      case "coupon":
        return <CouponPreview {...commonProps} />;

      case "vCardPlus":
        return <VCardPlusPreview {...commonProps} />;

      case "socialMedia":
        return <SocialMediaPreview {...commonProps} />;

      case "business":
        return <BusinessPreview {...commonProps} />;

      case "listOfLinks":
        return <ListOfLinksPreview {...commonProps} />;

      case "event":
        return <EventPreview {...commonProps} />;

      case "product":
        return <ProductPreview {...commonProps} />;

      case "mp3":
        return <Mp3Preview {...commonProps} />;

      case "menu":
        return <MenuPreview {...commonProps} />;
      case "playlist":
        return <PlaylistPreview {...commonProps} />;

      case "feedback":
        return <FeedBackPreview {...commonProps} />;

      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            Unsupported QR type
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <DemoPreview isScanPage={true}>{renderPreview()}</DemoPreview>
    </div>
  );
};

export default QRScanPage;

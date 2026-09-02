import React from "react";
import { Drawer } from "antd";
import { BsQrCode } from "react-icons/bs";
import QRView from "../../pages/home/qrGenerate/QRView";

const QRDetailDrawer = ({ data, open, onClose }) => {
  const {
    isCenterStyle,
    isCodeStyle,
    isCodeStyleBackgroundColor,
    isCodeStyleBorderColor,
    isCodeStyleCenterColor,
    isCodeStyleDotColor,
    isCorner,
    selectedFrame,
    selectedLevel,
    selectedLogo,
  } = data?.qrStyling || {};

  const buildStaticQRData = (qrData) => {
    const type = qrData?.type;

    switch (type) {
      case "staticURL": {
        const url = qrData?.staticURLContent?.url || qrData?.content?.url || "";
        if (!url) return null;
        return {
          qrType: "website",
          qrValue: url.startsWith("http") ? url : `https://${url}`,
        };
      }

      case "staticText": {
        const text =
          qrData?.staticTextContent?.text ??
          qrData?.content?.text ??
          qrData?.staticTextContent ??
          qrData?.content ??
          "";
        if (!text) return null;
        return {
          qrType: "text",
          qrValue: text,
        };
      }

      case "staticEmail": {
        const emailContent = qrData?.staticEmailContent || qrData?.content || {};
        return {
          qrType: "email",
          qrValue: {
            email: emailContent?.email || "",
            subject: emailContent?.subject || "",
            message: emailContent?.message || "",
          },
        };
      }

      case "staticSMS": {
        const smsContent = qrData?.staticSMSContent || qrData?.content || {};
        return {
          qrType: "sms",
          qrValue: {
            number: smsContent?.number || "",
            message: smsContent?.message || "",
          },
        };
      }

      case "staticWhatsApp": {
        const waContent = qrData?.staticWhatsAppContent || qrData?.content || {};
        return {
          qrType: "whatsapp",
          qrValue: {
            number: waContent?.number || "",
            message: waContent?.message || "",
          },
        };
      }

      case "staticWifi": {
        const wifiContent = qrData?.staticWifiContent || qrData?.content || {};
        return {
          qrType: "wifi",
          qrValue: {
            networkName: wifiContent?.networkName || "",
            networkPassword: wifiContent?.networkPassword || "",
            encryptionType: wifiContent?.encryptionType || "WPA",
            isHiddenNetwork: wifiContent?.isHiddenNetwork || false,
          },
        };
      }

      case "staticVcard": {
        const vCardContent = qrData?.staticVcardContent || qrData?.content || {};
        return {
          qrType: "vCard",
          qrValue: {
            name: vCardContent?.name || "",
            surname: vCardContent?.surname || "",
            street: vCardContent?.street || "",
            number: vCardContent?.number || "",
            postalCode: vCardContent?.postalCode || "",
            city: vCardContent?.city || "",
            state: vCardContent?.state || "",
            country: vCardContent?.country || "",
            companyName: vCardContent?.companyName || "",
            title: vCardContent?.title || "",
          },
        };
      }

      default:
        return {
          qrType: "link",
          qrValue: `${window.location.origin}/scan/${qrData?.shortcode}`,
        };
    }
  };

  const qrPayload = buildStaticQRData(data);

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <BsQrCode size={18} className="text-blue-600" />
          <span className="text-base font-semibold">Scan your QR Code</span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={420}
      styles={{
        body: { padding: "16px", backgroundColor: "#f9fafb" },
        header: { borderBottom: "1px solid #e5e7eb" },
      }}
    >
      {data && qrPayload && (
        <div className="space-y-5">
          <QRView
            link={typeof qrPayload.qrValue === "string" ? qrPayload.qrValue : undefined}
            selectedType={qrPayload.qrType}
            websiteUrl={qrPayload.qrType === "website" ? qrPayload.qrValue : undefined}
            enteredText={qrPayload.qrType === "text" ? qrPayload.qrValue : undefined}
            emailData={qrPayload.qrType === "email" ? qrPayload.qrValue : undefined}
            whatsAppData={qrPayload.qrType === "whatsapp" ? qrPayload.qrValue : undefined}
            wifiData={qrPayload.qrType === "wifi" ? qrPayload.qrValue : undefined}
            smsData={qrPayload.qrType === "sms" ? qrPayload.qrValue : undefined}
            vCardData={qrPayload.qrType === "vCard" ? qrPayload.qrValue : undefined}
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
            showHeading={false}
            showBtn={true}
          />
        </div>
      )}
    </Drawer>
  );
};

export default QRDetailDrawer;
import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import QRCodeStyling from "qr-code-styling";

const Frame = forwardRef(
  (
    {
      frame,
      websiteUrl,
      enteredText,
      emailData,
      whatsAppData,
      selectedType,
      selectedLevel,
      isCodeStyle,
      isCorner,
      isCenterStyle,
      isCodeStyleBorderColor,
      isCodeStyleDotColor,
      isCodeStyleCenterColor,
      isCodeStyleBackgroundColor,
      selectedLogo,
      wifiData,
      smsData,
      vCardData,
      currentFormData,
      link,
    },
    ref,
  ) => {
    const qrRef = useRef(null);
    const qrCode = useRef(null);

    console.log(selectedType,
      selectedLevel,
      isCodeStyle,
      isCorner,
      isCenterStyle,
      isCodeStyleBorderColor,
      isCodeStyleDotColor,
      isCodeStyleCenterColor,
      isCodeStyleBackgroundColor,
      selectedLogo,)

    // ✅ Expose QR access to parent for download.
    // NOTE: qr-code-styling paints the QR pattern onto its internal <canvas>
    // asynchronously (it round-trips through an <img> load internally), so a
    // <canvas> element can already exist in the DOM while still being blank.
    // getRawCanvas() (sync, DOM-based) is kept for callers that just need a
    // reference to the live canvas element (e.g. it's already been drawn).
    // getQrImage() is async and safe to call at any time — it awaits the
    // library's own internal drawing promise before resolving, so it never
    // returns a blank canvas.
    useImperativeHandle(ref, () => ({
      getRawCanvas: () => {
        const canvas = qrRef.current?.querySelector("canvas");
        return canvas || null;
      },
      getQrContainer: () => qrRef.current,
      getQrImage: async () => {
        if (!qrCode.current) return null;
        try {
          const blob = await qrCode.current.getRawData("png");
          return blob || null;
        } catch (err) {
          console.error("Frame: failed to get QR raw data", err);
          return null;
        }
      },
    }));

    const dotStyleMap = {
      rounded: "rounded",
      square: "square",
      dots: "dots",
      classy: "classy",
      "classy-rounded": "classy-rounded",
      "extra-rounded": "extra-rounded",
    };

    const cornerSquareStyleMap = {
      rounded: "extra-rounded",
      square: "square",
      dot: "dot",
    };

    const cornerDotStyleMap = {
      rounded: "dot",
      square: "square",
      dot: "dot",
    };

    const qrSize = frame ? frame.rect?.width : 200;

    const getQRCodeData = () => {
      if (selectedType === "link" && link) return link;

      switch (selectedType) {
        case "website":
          if (!websiteUrl) return "https://example.com";
          return websiteUrl.startsWith("http")
            ? websiteUrl
            : `https://${websiteUrl}`;

        case "text":
          return enteredText || "abc";

        case "email":
          if (emailData?.email) {
            const subject = emailData?.subject
              ? `?subject=${encodeURIComponent(emailData.subject)}`
              : "";
            const body = emailData?.message
              ? `${subject ? "&" : "?"}body=${encodeURIComponent(emailData.message)}`
              : "";
            return `mailto:${emailData.email}${subject}${body}`;
          }
          return "mailto:example@example.com";

        case "whatsapp":
          if (whatsAppData?.number) {
            const cleanNumber = whatsAppData.number.replace(/\D/g, "");
            const message = whatsAppData?.message
              ? `?text=${encodeURIComponent(whatsAppData.message)}`
              : "";
            return `https://wa.me/${cleanNumber}${message}`;
          }
          return "https://wa.me/";

        case "wifi":
          if (wifiData?.networkName) {
            return `WIFI:T:${wifiData.encryptionType || "WPA"};S:${wifiData.networkName};P:${wifiData.networkPassword || ""};H:${wifiData.isHiddenNetwork ? "true" : "false"};;`;
          }
          return "WIFI:T:nopass;S:;P:;;";

        case "sms":
          if (smsData?.number) {
            const cleanNumber = smsData.number.replace(/\D/g, "");
            const message = smsData?.message
              ? `?body=${encodeURIComponent(smsData.message)}`
              : "";
            return `sms:${cleanNumber}${message}`;
          }
          return "sms:";

        case "vCard":
          if (vCardData?.name || vCardData?.surname) {
            const {
              name = "",
              surname = "",
              street = "",
              number = "",
              postalCode = "",
              city = "",
              state = "",
              country = "",
              companyName = "",
              title = "",
            } = vCardData;

            return `BEGIN:VCARD
VERSION:3.0
N:${surname};${name};;;
FN:${name} ${surname}
ORG:${companyName}
TITLE:${title}
ADR:;;${street} ${number};${city};${state};${postalCode};${country}
END:VCARD`;
          }
          return "BEGIN:VCARD\nVERSION:3.0\nFN:No Name\nEND:VCARD";

        default:
          return "abc";
      }
    };

    const getQROptions = () => ({
      width: qrSize,
      height: qrSize,
      data: getQRCodeData(),
      qrOptions: {
        errorCorrectionLevel: selectedLevel || (selectedLogo ? "H" : "M"),
      },
      image: selectedLogo || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
        margin: 4,
        crossOrigin: "anonymous",
      },
      dotsOptions: {
        type: dotStyleMap[isCodeStyle] || "square",
        color: isCodeStyleDotColor || "#000000",
      },
      cornersSquareOptions: {
        type: cornerSquareStyleMap[isCorner] || "square",
        color: isCodeStyleBorderColor || "#000000",
      },
      cornersDotOptions: {
        type: cornerDotStyleMap[isCenterStyle] || "square",
        color: isCodeStyleCenterColor || "#000000",
      },
      backgroundOptions: { color: isCodeStyleBackgroundColor || "#FFFFFF" },
    });

    const setQrRef = useCallback((node) => {
      qrRef.current = node;
      if (!node) return;
      qrCode.current = new QRCodeStyling(getQROptions());
      node.innerHTML = "";
      qrCode.current.append(node);
    }, []);

    useEffect(() => {
      if (!qrRef.current) return;
      qrCode.current = new QRCodeStyling(getQROptions());
      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }, [frame, selectedType]);

    useEffect(() => {
      if (!qrCode.current) return;
      qrCode.current.update(getQROptions());
    }, [
      link,
      websiteUrl,
      enteredText,
      emailData?.email,
      emailData?.subject,
      emailData?.message,
      whatsAppData?.number,
      whatsAppData?.message,
      wifiData?.networkName,
      wifiData?.networkPassword,
      wifiData?.encryptionType,
      wifiData?.isHiddenNetwork,
      smsData?.number,
      smsData?.message,
      vCardData?.name,
      vCardData?.surname,
      vCardData?.companyName,
      vCardData?.title,
      selectedLevel,
      isCodeStyle,
      isCorner,
      isCenterStyle,
      isCodeStyleBorderColor,
      isCodeStyleDotColor,
      isCodeStyleCenterColor,
      isCodeStyleBackgroundColor,
      selectedLogo,
    ]);

    const availableTypes = [
      "website",
      "text",
      "email",
      "whatsapp",
      "wifi",
      "sms",
      "vCard",
    ];

    if (!frame) {
      return (
        <div className="flex justify-center items-center">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: qrSize,
              height: qrSize,
            }}
          >
            <div ref={setQrRef} />
          </div>
        </div>
      );
    }

    const { rect, paths, text } = frame;
    const shouldShowQR = link || availableTypes.includes(selectedType);

    return (
      <svg
        viewBox={`0 0 ${frame.width} ${frame.height}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full absolute top-0 left-0"
      >
        <rect {...rect} />
        {paths?.map((d, i) => (
          <path key={i} d={d} fill="black" />
        ))}
        {shouldShowQR && (
          <foreignObject
            x={rect?.x}
            y={rect?.y}
            width={rect?.width}
            height={rect?.height}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                ref={setQrRef}
                style={{
                  width: rect?.width,
                  height: rect?.width,
                  flexShrink: 0,
                }}
              />
            </div>
          </foreignObject>
        )}
        {text && (
          <text
            x={text.x}
            y={text.y}
            fill={text.fill}
            fontFamily="sans-serif"
            fontSize={text.fontSize}
            fontWeight="600"
            textAnchor="middle"
          >
            {text.value}
          </text>
        )}
      </svg>
    );
  },
);

export default Frame;
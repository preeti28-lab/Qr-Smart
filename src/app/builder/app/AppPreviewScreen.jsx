import React from "react";
import appleIcon from "../../../assets/builder-icons/appleicon.png";
import amazonIcon from "../../../assets/builder-icons/amazonicon.png";
import gplayIcon from "../../../assets/builder-icons/gplayicon.png";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import PreviewLogo from "./PreviewLogo";

const AppPreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const {
    amazonLink,
    amazonBtn,
    appName,
    appleLink,
    appleBtn,
    bannerColor,
    description,
    developer,
    googlePlayLink,
    googlePlayBtn,
    image,
    website,
    logoUrl,
  } = currentFormData || {};

  const getDomain = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  if (!appName) {
    return <EmptyPreview />;
  }

  const StoreButton = ({ icon, text, link }) => (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-max items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
    >
      <img src={icon} alt="store" className="w-5 h-5" />
      <span className="text-xs leading-tight">{text}</span>
    </a>
  );

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: isScanPage ? bannerColor : "transparent",
      }}
    >
      <div
        className={`max-w-3xl mx-auto ${
          isScanPage && "border shadow-lg min-h-screen"
        }`}
      >
        <div
          className="py-8 min-h-[160px]"
          style={{ backgroundColor: bannerColor || "#A0522D" }}
        />

        <div
          className={`bg-white p-6 -mt-12 rounded-tl-2xl rounded-tr-2xl ${
            isScanPage ? "min-h-[100dvh]" : "min-h-[400px]"
          } flex flex-col items-center space-y-4`}
        >
          <PreviewLogo
            image={image}
            logoUrl={logoUrl}
            isScanPage={isScanPage}
            isEditMode={isEditMode}
          />

          {developer && <p className="text-xs">{developer}</p>}
          {appName && (
            <h2 className="text-lg font-semibold text-center">{appName}</h2>
          )}
          {description && (
            <p className="text-center text-gray-600 text-sm">{description}</p>
          )}

          <div className="flex flex-col gap-3 justify-center items-center mt-4">
            {googlePlayLink && googlePlayBtn && (
              <StoreButton
                icon={gplayIcon}
                text={googlePlayBtn}
                link={googlePlayLink}
              />
            )}
            {appleLink && appleBtn && (
              <StoreButton icon={appleIcon} text={appleBtn} link={appleLink} />
            )}
            {amazonLink && amazonBtn && (
              <StoreButton
                icon={amazonIcon}
                text={amazonBtn}
                link={amazonLink}
              />
            )}
          </div>

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs text-gray-500 mt-2"
            >
              {getDomain(website)}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPreviewScreen;
